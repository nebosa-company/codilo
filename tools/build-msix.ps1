# Builds the Microsoft Store MSIX for Codilo.
#
#   .\tools\build-msix.ps1
#
# For Partner Center, pass the identity it assigned to the product:
#
#   .\tools\build-msix.ps1 -IdentityName "12345Nebosa.Codilo" -Publisher "CN=..." `
#       -PublisherDisplayName "Nebosa"
#
# The Store re-signs the submitted MSIX, so no certificate is needed for the
# upload. Add -DevSign only to produce a locally installable package; it makes a
# self-signed certificate whose subject matches -Publisher.

param(
    [string]$Publisher = "CN=Nebosa",
    [string]$IdentityName = "Nebosa.Codilo",
    [string]$PublisherDisplayName = "Nebosa",
    [string]$DisplayName = "Codilo",
    [switch]$DevSign,
    [switch]$SkipBuild,
    [string]$PfxPath = "",
    [string]$PfxPassword = "codilo-dev"
)

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
Set-Location $Root

function Find-WindowsTool([string]$Name) {
    $fromPath = Get-Command $Name -ErrorAction SilentlyContinue
    if ($fromPath) { return $fromPath.Source }
    $kits = Join-Path ${env:ProgramFiles(x86)} "Windows Kits\10\bin"
    if (Test-Path $kits) {
        $found = Get-ChildItem $kits -Recurse -Filter $Name -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -match '\\x64\\' } |
            Sort-Object FullName -Descending |
            Select-Object -First 1
        if ($found) { return $found.FullName }
    }
    throw "$Name was not found. Install the Windows SDK (makeappx/signtool)."
}

# MSIX versions are four numeric fields; app versions are three.
$package = Get-Content "package.json" -Raw | ConvertFrom-Json
$version = $package.version -replace '-.*$', ''
$bits = @($version.Split('.')) + @('0', '0', '0')
$msixVersion = ($bits[0..3] -join '.')

Write-Host "Building Codilo $version as MSIX $msixVersion (x64, store feature)"
if (-not $SkipBuild) {
    & npx tauri build --features store --no-bundle
    if ($LASTEXITCODE -ne 0) { throw "tauri build failed" }
}

$metadata = cargo metadata --manifest-path src-tauri/Cargo.toml --format-version 1 --no-deps 2>$null | ConvertFrom-Json
$targetDir = $metadata.target_directory
$exe = Join-Path $targetDir "release\codilo.exe"
if (-not (Test-Path $exe)) { throw "release executable not found at $exe" }

$outDir = Join-Path $Root "src-tauri\target\msix"
$stage = Join-Path $outDir "stage"
Remove-Item $stage -Recurse -Force -ErrorAction SilentlyContinue
New-Item -ItemType Directory -Force (Join-Path $stage "Assets") | Out-Null

Copy-Item $exe (Join-Path $stage "codilo.exe")
foreach ($asset in "Square44x44Logo.png", "Square150x150Logo.png", "Square310x310Logo.png", "StoreLogo.png") {
    $from = Join-Path $Root "src-tauri\icons\$asset"
    if (-not (Test-Path $from)) { throw "missing icon $from" }
    Copy-Item $from (Join-Path $stage "Assets\$asset")
}

$config = Get-Content "src-tauri\tauri.conf.json" -Raw | ConvertFrom-Json
$extensions = foreach ($association in $config.bundle.fileAssociations) {
    foreach ($extension in @($association.ext)) { $extension }
}
# Windows refuses to let a packaged app own these shell-executable types.
$blocked = @("bat", "cmd", "com", "cpl", "dll", "exe", "lnk", "msi", "pif", "scr", "sys")
$extensions = $extensions | Where-Object { $blocked -notcontains $_ }
$fileTypes = (($extensions | Sort-Object -Unique) | ForEach-Object {
    "              <uap:FileType>.$_</uap:FileType>"
}) -join "`r`n"

$manifest = Get-Content "packaging\msix\Package.appxmanifest" -Raw
$manifest = $manifest.Replace("{{IDENTITY_NAME}}", $IdentityName)
$manifest = $manifest.Replace("{{PUBLISHER}}", $Publisher)
$manifest = $manifest.Replace("{{VERSION}}", $msixVersion)
$manifest = $manifest.Replace("{{DISPLAY_NAME}}", $DisplayName)
$manifest = $manifest.Replace("{{PUBLISHER_DISPLAY_NAME}}", $PublisherDisplayName)
$manifest = $manifest.Replace("{{FILE_TYPES}}", $fileTypes)
[System.IO.File]::WriteAllText((Join-Path $stage "AppxManifest.xml"), $manifest, [System.Text.UTF8Encoding]::new($false))

$makeappx = Find-WindowsTool "makeappx.exe"
$msix = Join-Path $outDir "Codilo_${msixVersion}_x64.msix"
& $makeappx pack /d $stage /p $msix /o
if ($LASTEXITCODE -ne 0) { throw "makeappx failed" }

if ($DevSign) {
    $secure = ConvertTo-SecureString $PfxPassword -AsPlainText -Force
    if (-not $PfxPath) {
        $PfxPath = Join-Path $outDir "codilo-dev.pfx"
        $cert = New-SelfSignedCertificate -Type CodeSigningCert -Subject $Publisher `
            -CertStoreLocation "Cert:\CurrentUser\My" -KeyUsage DigitalSignature `
            -FriendlyName "Codilo MSIX development" -NotAfter (Get-Date).AddYears(2)
        Export-PfxCertificate -Cert $cert -FilePath $PfxPath -Password $secure | Out-Null
        Write-Host "Created development certificate: $PfxPath"
    }
    $signtool = Find-WindowsTool "signtool.exe"
    & $signtool sign /fd SHA256 /f $PfxPath /p $PfxPassword $msix
    if ($LASTEXITCODE -ne 0) { throw "signtool failed" }
    Write-Host "Trust the certificate in Cert:\LocalMachine\Root before installing locally."
}

Write-Host ""
Write-Host "MSIX: $msix"
if (-not $DevSign) {
    Write-Host "Unsigned for Store upload. Partner Center re-signs it."
}
