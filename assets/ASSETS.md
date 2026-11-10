# ØMENS — Asset Replacement Manifest

All media are drop-in replaceable. Swap the file and reload — no CSS or
HTML structure changes are required. Layout scales any image/video to the
figure width with proportional height.

## Current status
The product/campaign images below are TEMPORARY PLACEHOLDERS for layout
evaluation. They are not final product photography. Replace them with the
founder-supplied V2 imagery and campaign video when ready.

## Replaceable files (keep the same filename to swap in place)

| File | Role on site | Mode | Replace with |
|------|--------------|------|--------------|
| `img/logo.png` | Topbar, hero, colophon | identity | keep (custom brand asset — do not redraw) |
| `img/sheet-drop01.png` | 02 DROP development sheet | SHEET | final product development sheet |
| `img/frame-campaign.png` | 03 Details campaign frame | FRAME | final campaign still |
| `media/model-movement.mp4` | Hero background TEST clip — DESKTOP (evaluation only) | FRAME | final hero loop, same filename |
| `media/model-movement-mobile.mp4` | Hero background TEST clip — MOBILE (540, ~126 KB) | FRAME | re-encode from final loop (see below) |
| `img/hero-poster.jpg` | Hero video poster (first frame of the test clip) | identity | re-extract from final clip |

## Hero video test slot (temporary — founder evaluation)

- `index.html`: `<div class="hero__media">` layer, absolutely behind the
  hero composition. Zero layout impact; logo/outline/type unchanged.
- The clip is NOT autoplayed in markup: `preload="none"` + `data-src` /
  `data-src-mobile`. JS claims it when motion is allowed and not `?static`,
  then picks the source by input type — desktop (fine pointer) loads the
  full 960 clip, mobile/touch loads the 540 clip — sets src, plays, and
  fades the layer in. Reduced-motion and `?static` never fetch it — the
  static hero is the fallback. The layer also pauses off-view.
- To remove the test: delete the `.hero__media` block (and optionally the
  "HERO VIDEO TEST LAYER" CSS section and the "hero video TEST slot" JS
  block). To swap clips: replace `media/model-movement.mp4` (desktop) and
  `media/model-movement-mobile.mp4` (mobile), same names.
- To regenerate the mobile clip from a new desktop file:
  `ffmpeg -i model-movement.mp4 -vf scale=540:540 -c:v libx264 -profile:v baseline -pix_fmt yuv420p -crf 30 -preset veryslow -movflags +faststart -an model-movement-mobile.mp4`
- Recommended final specs: silent loop, H.264 MP4, ~4–8s, square or
  portrait. Desktop under ~4 MB (current: 960×960, 24fps, 5s, 3.7 MB);
  mobile under ~250 KB (current: 540×540, 5s, 126 KB).

## Optional future slots (not yet in markup)

- Campaign video: add inside `<figure class="frame">` as
  `<video src="media/drop01.mp4" muted loop playsinline autoplay></video>`
  replacing or alongside the image. The reduced-motion guard in `js/main.js`
  pauses autoplay automatically.
- Additional SHEET/FRAME pairs: copy an existing `<figure>` block in
  `index.html` and point `src` at a new file in `img/` or `media/`.

## Recommended specs (match current to avoid re-layout)

- SHEET image: portrait, ~1000×1900px (1001×1921 current), paper/white ground
- FRAME image: portrait, ~1000×1900px, dark cinematic ground
- Logo: square, transparent ground, cool-steel mark
- Video: portrait 9:16 or match the frame aspect; muted, no audio track

## If a replacement has a different aspect ratio

The layout already handles it (proportional height). If you prefer a fixed
crop instead, uncomment the `aspect-ratio` line in `css/style.css` under
"V1.2 MEDIA REPLACEMENT".

## Placeholder honesty

Do not caption the current sheet/frame as physical product tests. They are
pre-production visuals. Final imagery supersedes them.
