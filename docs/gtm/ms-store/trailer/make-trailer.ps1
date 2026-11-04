# Builds the Codilo Microsoft Store trailer from the captured screenshots.
# Requires ffmpeg. Produces 1920x1080 H.264/AAC, ~30 seconds, 16:9.

$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if ($ffmpeg) {
    $ffmpeg = $ffmpeg.Source
} elseif (Test-Path "D:\tools\ffmpeg\bin\ffmpeg.exe") {
    $ffmpeg = "D:\tools\ffmpeg\bin\ffmpeg.exe"
} else {
    throw "ffmpeg was not found"
}

$segments = @(
    @{ file = "hero-art.png";                 duration = 4.5; caption = $null },
    @{ file = "../01-editor-explorer-dark.png"; duration = 4;   caption = "Everything in one window." },
    @{ file = "../02-split-panes-dark.png";   duration = 4;     caption = "Edit side by side." },
    @{ file = "../03-integrated-terminal.png";duration = 4;     caption = "A real terminal, built in." },
    @{ file = "../06-language-modes.png";     duration = 4;     caption = "35 language modes." },
    @{ file = "../05-command-palette.png";    duration = 4;     caption = "Every command, one search away." },
    @{ file = "../04-light-theme.png";        duration = 4;     caption = "Light or dark. Your choice." },
    @{ file = "end-card.png";                 duration = 5;     caption = $null }
)

$ffargs = @("-y")
foreach ($segment in $segments) {
    $ffargs += @("-loop", "1", "-framerate", "30", "-t", "$($segment.duration)", "-i", (Join-Path $PSScriptRoot $segment.file))
}

$font = "C\:/Windows/Fonts/seguisb.ttf"
$filter = ""
for ($i = 0; $i -lt $segments.Count; $i++) {
    $segment = $segments[$i]
    $chain = "[$($i):v]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080," +
        "zoompan=z='min(zoom+0.00055,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=1920x1080:fps=30," +
        "setsar=1,format=yuv420p"

    if ($segment.caption) {
        $chain += ",drawbox=x=0:y=0:w=800:h=138:color=black@0.78:t=fill" +
            ",drawbox=x=0:y=0:w=7:h=138:color=0x4d9cf5@1:t=fill" +
            ",drawtext=fontfile='$font':text='CODILO':fontcolor=0x7dd3fc:fontsize=19:x=38:y=22" +
            ",drawtext=fontfile='$font':text='$($segment.caption)':fontcolor=white:fontsize=38:x=38:y=52"
    }
    if ($i -eq 0) {
        $chain += ",fade=t=in:st=0:d=0.6"
    }
    if ($i -eq $segments.Count - 1) {
        $chain += ",fade=t=out:st=4.2:d=0.8"
    }
    $filter += "$chain[v$i];"
}

$previous = "v0"
$cumulative = $segments[0].duration
for ($i = 1; $i -lt $segments.Count; $i++) {
    $offset = $cumulative - 0.5
    $filter += "[$previous][v$i]xfade=transition=fade:duration=0.5:offset=$offset[x$i];"
    $cumulative = $cumulative + $segments[$i].duration - 0.5
    $previous = "x$i"
}
$filter += "[$previous]format=yuv420p[vout]"

$ffargs += @(
    "-f", "lavfi", "-i", "anullsrc=channel_layout=stereo:sample_rate=48000",
    "-filter_complex", $filter,
    "-map", "[vout]", "-map", "8:a",
    "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "128k",
    "-r", "30", "-t", "30", "-movflags", "+faststart",
    (Join-Path $PSScriptRoot "codilo-trailer.mp4")
)

& $ffmpeg @ffargs
if ($LASTEXITCODE -ne 0) { throw "ffmpeg failed" }
Write-Host "Wrote $PSScriptRoot\codilo-trailer.mp4"
