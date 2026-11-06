# ØMENS Site — Editing Guide (V1.1 motion preview)

V1.1 is a separate copy — the original V1 in `site/` is untouched.
All V1.1 changes are additive motion only: the hero entrance sequence,
clip reveals on images, sequential detail/spec reveals, hover effects
and a capped parallax on the DROP/01 outline live at the bottom of
`css/style.css` (marked "V1.1 MOTION LAYER") and in `js/main.js`.
To dial motion back, reduce the animation-delays or the parallax
`data-parallax` value on `.hero__outline`.

## 1. Structure

```
site/
├── index.html      ← all text content lives here
├── css/style.css   ← colors, type, spacing
├── js/main.js      ← scroll reveals (rarely needs editing)
└── assets/img/
    ├── logo.png             ← ØMENS logo (steel, transparent)
    ├── sheet-drop01.png     ← SHEET mode: development sheet
    └── frame-campaign.png   ← FRAME mode: campaign photo
```

## 2. Editing text

Open `index.html`. Every editable block is marked with `EDIT:` comments.

- Hero line: search `hero__line`
- Philosophy statement + three tenets: section `01 / PHILOSOPHY`
- Spec table rows (ITEM/STATUS/FIT…): section `02 / DROP` — add a row by copying a `<tr>` pair
- Detail entries D.01–D.04: section `03 / DETAILS` — copy an `<article class="detail">` block to add one
- Instagram URL + email: section `04 / CONTACT` and the top bar

## 3. Editing imagery

Replace files in `assets/img/` keeping the same filenames:

- `sheet-drop01.png` — portrait, ~1000×1900px, white/paper ground
- `frame-campaign.png` — portrait, ~1000×1900px, dark cinematic
- `logo.png` — square, transparent background, steel color

New images: add an `<img src="assets/img/yourfile.png">` inside the matching
`<figure class="sheet">` or `<figure class="frame">`.

## 4. Typography / fonts

- Satoshi loads from Fontshare CDN (free, no account needed for web embedding).
- PP Neue Montreal is a paid Pangram Pangram font. The site tries it first
  (`local("PP Neue Montreal")`) and falls back to General Sans (free, similar
  grotesque). If you buy the license, drop the woff2 files into
  `assets/fonts/` and add at the top of `style.css`:

```css
@font-face {
  font-family: "PP Neue Montreal";
  src: url("../assets/fonts/PPNeueMontreal-Book.woff2") format("woff2");
  font-weight: 400;
}
```

## 5. Colors

All colors are CSS variables at the top of `style.css`:

```css
--black: #172020;  --teal: #153131;  --steel: #95B2B8;  --orange: #C44900;
```

Orange is an accent only: section numbers, status dot, piping references,
hover states. Do not expand its role without creative approval.

## 6. Previewing locally

```bash
cd site
python3 -m http.server 8899
# open http://localhost:8899
```

Append `?static` to the URL to disable scroll animations (useful for
screenshots/print previews).

## 7. Expanding to the full sitemap later

The page is already sectioned (`#index #philosophy #drop #details #contact`).
To grow into the approved sitemap:

- Split each `<section>` into its own HTML file (drop.html, system.html, log.html…)
- Move shared topbar/colophon into a small include or duplicate the markup
- Add nav links in `.topbar__meta`
- `#details` becomes the seed of the SYSTEM pages; the `.detail` article block
  is the reusable card for future entries.

## 8. Production rules reminder

- Zero spend: no domain, hosting, paid fonts, or services without approval.
- Nothing published publicly without founder sign-off.
- No checkout, cart, stock claims, or invented availability dates.
- AI/concept imagery must never be captioned as physical testing.
