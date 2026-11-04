# tools/

## Icons

`make-icon.py` regenerates every app icon (desktop, Windows Store tiles,
Android, iOS, and the About box) from `../assets/branding/codilo.svg`, the
single vector source. Run `python tools/make-icon.py`; see the script's
docstring for details.

The other files here are generated inputs for `tauri icon` and aren't meant
to be edited directly:

- `codilo-mark-android-fg.svg` — the white C padded into Android's
  adaptive-icon safe zone
- `android-bg-blue.svg` — solid `#1B3A6B` Android adaptive-icon background
- `icon-manifest.json` — tells `tauri icon` how to combine the above with the
  brand tile (rewritten by `make-icon.py` on every run)
