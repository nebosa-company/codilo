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

### Where to find the identity values

These values are assigned by Microsoft; they are not created by the build
script or by a certificate.

1. Sign in to Partner Center and open **Apps and games**.
2. Select the Codilo product (reserve the name first with **New product →
   MSIX or PWA app** if it is not there yet).
3. Expand **Product management** in the left navigation and open
   **Product identity**.
4. Copy these three values exactly:
   - **Package/Identity/Name** → `-IdentityName`
   - **Package/Identity/Publisher** → `-Publisher`
   - **Package/Properties/PublisherDisplayName** → `-PublisherDisplayName`

Microsoft's reference: [View product identity details](https://learn.microsoft.com/en-us/windows/apps/publish/view-app-identity-details).

A **Company** developer account publishes under the verified Nebosa legal
entity; an **Individual** account publishes under your own name. Partner Center
does not allow converting an Individual account to a Company account later, so
choose Company up front if Nebosa is the publisher.

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

## Store listing copy (English)

These fit the Partner Center limits: short description 1000 characters (only
the first ~270 are shown), What's new 1500 characters, up to 20 features at 200
characters each, up to 7 keywords at 40 characters each and 21 words total.

### Short description

A small, fast code editor for Windows. Open files and folders instantly, edit
with syntax highlighting, split panes, a built-in terminal, and 36 interface
languages — no account, telemetry, or plugin marketplace.

### What's new in this version

Leave this blank on the first submission; Microsoft recommends that for a new
product. For later releases, use:

Initial Microsoft Store release: Codilo 0.4.7 brings the full editor, Explorer,
terminal, split panes, session restore, and 36 interface languages to Windows.

### Product features

Opens instantly: one native window, no splash screen, no background indexer.

Syntax highlighting and editing for 35 languages, with automatic detection and
per-file language overrides.

Explorer with Open Folder, create, rename, delete to the Recycle Bin, and drag
to move or copy.

Split panes: drag a tab to any edge to edit two or more files side by side.

Built-in terminal with real PowerShell and Command Prompt sessions, opened in
the current file's folder.

Find and replace, Go to Symbol, a Problems panel, and optional spell check.

Session restore reopens saved files in the same panes and at the same caret
positions.

Light, dark, and low-sensory themes, adjustable zoom, and show/hide toolbar and
status bar.

36 interface languages, including right-to-left layouts.

No account, telemetry, or plugin marketplace. A small editor that stays out of
the way.

### Supported languages

The full list belongs in the long **Description** field; Product features are
capped at 200 characters each. If you want a languages entry in Product
features, this one is 174 characters:

Syntax highlighting for 35 languages and text formats, including JavaScript,
TypeScript, Python, Rust, Go, C/C++, C#, Java, Kotlin, Swift, SQL, HTML, CSS,
JSON, YAML and XML.

Full list for the Description:

Supported languages: HTML, CSS, JavaScript, TypeScript, JSX, TSX, Markdown,
Python, C/C++, Java, C#, Kotlin, Swift, R, TOML, Protocol Buffers, Go, Rust,
GNU assembly, Intel/NASM assembly, Neper, JSON, YAML, XML, SQL (standard,
SQLite, MySQL, PostgreSQL), Dart, Object Pascal, PowerShell, Shell
(sh/bash/zsh/ksh), Terraform/HCL, Batch, and plain text (txt/log/csv).

### Keywords

code editor, text editor, source code editor, syntax highlighting,
lightweight editor, developer tools, plain text editor

### Additional license terms

Use this single URL so the Store renders it as a clickable license link:

https://github.com/nebosa-company/codilo/blob/main/LICENSE

Leaving this field blank would apply Microsoft's Standard Application License
Terms, which do not match Codilo's MIT license.

## 5. Automation

`.github/workflows/store.yml` builds the MSIX on demand. Run it from the Actions
tab with the identity values from Partner Center, then download the artifact.
It does not upload to the Store; that remains a Partner Center or Store API
step.
