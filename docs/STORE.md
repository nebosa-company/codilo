# Publishing Codilo on the Microsoft Store

The Store distribution is an MSIX package built with the `store` Cargo feature.
That feature hides Codilo's own updater and file-association screen because the
Store owns both. Ordinary installers and portable builds do not enable it, so
their behavior is unchanged.

## 1. Account and product identity

Create a free developer account at <https://storedeveloper.microsoft.com>.
A Company account publishes as Nebosa and needs business verification; an
Individual account publishes under your own name.

In Partner Center, reserve the product name, then copy the assignment into the
package:

- `Identity Name` — the package identity name Partner Center assigns.
- `Publisher` — the publisher identity (usually `CN=...`).
- `Publisher Display Name` — `Nebosa`.

The Store package must use those values. The defaults in the build script
(`Nebosa.Codilo`, `CN=Nebosa`) are only for local development.

## 2. Build the MSIX

Requirements: Windows 10/11, Node.js, a Rust toolchain, and the Windows SDK
(`makeappx.exe` and `signtool.exe`).

```powershell
npm ci
npm run build:msix -- -IdentityName "..." -Publisher "CN=..." -PublisherDisplayName "Nebosa"
```

On PowerShell the arguments after `--` reach the script:

```powershell
.\tools\build-msix.ps1 -IdentityName "..." -Publisher "CN=..." -PublisherDisplayName "Nebosa"
```

The result is:

```
src-tauri\target\msix\Codilo_0.4.7.0_x64.msix
```

The MSIX contains `codilo.exe`, the tile logos, and an `AppxManifest.xml` with
the same file types as `tauri.conf.json`. Windows does not allow a packaged app
to own shell-executable types such as `.bat` and `.cmd`, so the build omits
those; every other supported type is declared. The Store re-signs submitted
MSIX packages, so an unsigned package is what you upload.

For a local-only test package, add `-DevSign`. It creates a self-signed
certificate and signs the MSIX:

```powershell
.\tools\build-msix.ps1 -DevSign
```

Trust the generated certificate in `Cert:\LocalMachine\Root` (as administrator)
before installing locally, then:

```powershell
Add-AppxPackage .\src-tauri\target\msix\Codilo_0.4.7.0_x64.msix
```

A loose `Add-AppxPackage -Register` registration is useful while iterating, but
it is not a substitute for a signed install. Validate the final signed package
on a normal Windows account before submitting.

## 3. What differs in the Store build

- **Updates** — `Help ▸ New Version` is hidden and the Rust update commands
  refuse. The Store delivers updates.
- **File associations** — the File menu entry and the Help Center paragraph are
  hidden. Associations are declared in `AppxManifest.xml` and managed by
  Windows/Store.
- **Everything else** — editor, explorer, terminal, harness panel, settings and
  languages are the same code. Non-Store builds keep their own updater and
  association UI unchanged.

After installing locally, test:

1. Launch from the Start menu.
2. Open a file from the app's Open dialog.
3. Double-click an associated file in Explorer, and check that it opens in the
   existing window.
4. Open a terminal and run a command.
5. Close all windows and confirm the process exits.
6. Uninstall and confirm no stray processes remain.

## 4. Store submission

In Partner Center create the submission and provide:

- Pricing and markets (free is fine).
- Category and description.
- At least one screenshot (four or more recommended), Store logos.
- Age-rating questionnaire.
- Privacy policy URL if the app collects/transmits personal information.
  Codilo has no telemetry; the Store build has no GitHub update check.
- Company support/contact details.
- Upload the `.msix` from `src-tauri\target\msix`.
- Add certification notes: it is a local editor; the terminal runs commands the
  user asks for; updates and file associations are Store-managed.

Submit for certification and fix any certification report. Store review is
usually a few business days.

## 5. Automation

`.github/workflows/store.yml` builds the MSIX on demand. Run it from the Actions
tab with the identity values from Partner Center, then download the artifact.
It does not upload to the Store; that remains a Partner Center or Store API
step.
