# Codilo Store trailer

**Title:** Codilo — A small, fast code editor

| Asset | File |
| --- | --- |
| Video | `codilo-trailer.mp4` |
| Thumbnail | `trailer-thumbnail.png` |
| 16:9 hero art | `hero-art.png` |
| End card (video source) | `end-card.png` |
| Title | `trailer-title.txt` |

## Technical details

- **Video:** 1920×1080, 16:9, 30 seconds, 30 fps
- **Codec:** H.264 High, yuv420p, AAC stereo (silent) — 2.7 MB
- **Thumbnail and hero art:** 1920×1080 PNG
- **Captions:** no IARC age-rating information anywhere in the video
- **Audio:** no third-party music or sound effects

## Store checklist

- [x] 16:9 hero art supplied above the trailer (`hero-art.png`)
- [x] One trailer only, well under the 15-trailer limit
- [x] One video, one title and one thumbnail
- [x] No IARC age-rating information
- [x] Ready for a Retail submission (dev sandbox submissions do not support
  videos)
- [x] Windows 10 version 1607 or later / Xbox compatible

## Trailer beats

1. Codilo hero card — 0–4s
2. Editor and Explorer — 4–8s
3. Split panes — 8–12s
4. Integrated terminal — 12–16s
5. 35 language modes — 16–20s
6. Command palette — 20–24s
7. Light and dark themes — 24–28s
8. Codilo end card — 28–30s

## Rebuild

Run `make-trailer.ps1` with ffmpeg on `PATH`, or set
`D:\tools\ffmpeg\bin\ffmpeg.exe`. The screenshots referenced by the script live
one directory up in `docs/gtm/ms-store`.
