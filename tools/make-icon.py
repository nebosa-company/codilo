"""Renders the Codilo app icon set (desktop + Android + iOS) and the copy the
About box embeds, from one vector source.

The source (`assets/branding/codilo.svg`) is a full-bleed rounded tile: the
mark carries its own blue ground, so the desktop, Store and iOS icons can use
it as-is. Android adaptive icons need the ground and the glyph as separate
layers, so this script derives the white C foreground (padded into the safe
zone) and a solid blue background from the same file and writes the manifest.

    python tools/make-icon.py

Requires the Tauri CLI (`npx tauri`); no Pillow.
"""
import base64
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TOOLS = Path(__file__).resolve().parent
BRAND = ROOT / "assets" / "branding" / "codilo.svg"
ICONS = ROOT / "src-tauri" / "icons"
ICONS_JS = ROOT / "src" / "icons.js"
MANIFEST = TOOLS / "icon-manifest.json"
ANDROID_FG = TOOLS / "codilo-mark-android-fg.svg"
ANDROID_BG = TOOLS / "android-bg-blue.svg"

# Android adaptive icons guarantee only a 66dp circle is visible inside the
# 108dp canvas across every launcher mask. The padding is baked into the
# foreground because `android_fg_scale` had no effect in tauri-cli 2.11.4.
PAD = 206


def svg_layers():
    """Write the two Android layers derived from the brand tile."""
    brand = BRAND.read_text(encoding="utf-8")
    mark = re.search(r"<path[^>]*/>", brand)
    if not mark:
        raise RuntimeError(f"no <path> element found in {BRAND}")
    size = 512
    side = size + PAD * 2
    ANDROID_FG.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{-PAD} {-PAD} {side} {side}" '
        f'width="{side}" height="{side}">{mark.group(0)}</svg>\n',
        encoding="utf-8",
    )
    ANDROID_BG.write_text(
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" '
        f'width="{size}" height="{size}">'
        f'<rect width="{size}" height="{size}" fill="#1B3A6B"/></svg>\n',
        encoding="utf-8",
    )


def write_manifest():
    MANIFEST.write_text(
        """{
  "default": "../assets/branding/codilo.svg",
  "bg_color": "#1B3A6B",
  "android_bg": "android-bg-blue.svg",
  "android_fg": "codilo-mark-android-fg.svg"
}
""",
        encoding="utf-8",
    )


def patch_icons_js(uri):
    text = ICONS_JS.read_text(encoding="utf-8")
    new_text, n = re.subn(r'const APP_LOGO =\n  "[^"]*";', f'const APP_LOGO =\n  "{uri}";', text)
    if n != 1:
        raise RuntimeError("could not find APP_LOGO constant to patch in src/icons.js")
    ICONS_JS.write_text(new_text, encoding="utf-8")


def main():
    brand = BRAND.read_text(encoding="utf-8")
    svg_layers()
    write_manifest()

    subprocess.run(
        ["npx", "tauri", "icon", str(MANIFEST.relative_to(ROOT))],
        cwd=ROOT,
        check=True,
        shell=True,
    )

    # Files from the old composition pipeline. They are not regenerated, so
    # remove them rather than leaving a stale jc build beside the new icons.
    for legacy in (ICONS / "codilo-source.png", ICONS / "codilo-logo.txt"):
        legacy.unlink(missing_ok=True)

    uri = "data:image/svg+xml;base64," + base64.b64encode(brand.encode("utf-8")).decode("ascii")
    patch_icons_js(uri)
    print("patched APP_LOGO in src/icons.js")


if __name__ == "__main__":
    main()
