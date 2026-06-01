# My Mate in Real Estate — Brand Kit

Production-ready logo files, brand colours, and typography for
**mymateinrealestate.com.au**.

```
assets/
├── README.md              ← you are here
├── svg/                   ← vector logo files (text converted to paths, fully portable)
│   ├── mark-coral.svg              · the "mm." bubble mark, coral on transparent
│   ├── mark-navy.svg               · navy on transparent
│   ├── mark-swell.svg              · swell blue on transparent
│   ├── mark-sand-on-navy.svg       · sand bubble with navy backdrop
│   ├── mark-mono-light.svg         · navy + cream (no accent), single-colour use
│   ├── mark-mono-dark.svg          · cream on navy (no accent), single-colour use
│   ├── lockup-horizontal.svg       · primary lockup, bubble + wordmark
│   ├── lockup-horizontal-on-navy.svg
│   ├── lockup-horizontal-mono.svg  · single-colour navy, for stamps / faxes / engraving
│   ├── lockup-stacked.svg          · centred, bubble above wordmark
│   ├── lockup-stacked-on-navy.svg
│   ├── wordmark.svg                · text only, no bubble
│   └── wordmark-on-navy.svg
├── png/                   ← raster renders at common production sizes (generated from SVG)
│   ├── mark-*-512.png              · 512px square, transparent background
│   ├── mark-*-1024.png             · 1024px square, transparent
│   ├── lockup-horizontal-1024.png  · 1024px wide, transparent
│   ├── lockup-horizontal-2048.png  · 2048px wide, transparent
│   ├── lockup-stacked-1024.png
│   ├── favicon-16.png, 32.png, 48.png, 192.png, 512.png
│   └── …
└── brand/
    ├── colors.css         · CSS custom properties (--mmre-*)
    ├── colors.json        · machine-readable palette with roles
    └── typography.md      · font usage, weights, and ratios
```

## Which file should I use?

| Use case                                | File                                   |
|-----------------------------------------|----------------------------------------|
| Website header / inline SVG             | `svg/lockup-horizontal.svg`            |
| Social avatar, app icon                 | `png/mark-coral-512.png`               |
| Email signature                         | `png/lockup-horizontal-1024.png`       |
| For-sale board / business card (print)  | `svg/lockup-horizontal.svg` (vector)   |
| Favicon                                 | `png/favicon-*.png` set                |
| Dark-mode use                           | any `*-on-navy.svg` / `*-on-navy.png`  |
| Single-colour stamp / engraving         | `svg/mark-mono-light.svg` or `mono-dark` |

## SVG files

All wordmark and "mm." text has been **converted to paths** — the SVGs do
not depend on any external font being installed. They will render
identically in every browser, design tool, and print pipeline.

## PNG files

PNG renders are pixel-perfect raster exports of each SVG variant at
common sizes. Transparent backgrounds where appropriate. Use these
anywhere SVG isn't accepted (most social platforms, email clients,
older print pipelines).

## Colours

See `brand/colors.css` and `brand/colors.json`. The six-colour palette:

| Name         | Hex     | Role                                   |
|--------------|---------|----------------------------------------|
| Ocean Navy   | #0E2A44 | Primary text, dark surfaces            |
| Coral        | #E07856 | Accent — the "mate" colour             |
| Swell Blue   | #2A6EA8 | Secondary brand accent                 |
| Sand         | #E8D9BE | Warm neutral surface                   |
| Paper        | #F4EEE2 | Page background                        |
| Cream        | #FAF6EC | Primary surface                        |

## Typography

See `brand/typography.md`. The brand uses **Plus Jakarta Sans** (sans) and
**Instrument Serif** (italic only) — both available free from Google Fonts.

## Clear space and minimum sizes

- **Clear space**: leave at least the height of the bubble's tail dot on
  every side of any lockup.
- **Minimum sizes**:
  - Mark: **24px** wide on screen / **8mm** in print
  - Horizontal lockup: **120px** wide on screen / **30mm** in print
  - Stacked lockup: **80px** wide on screen / **22mm** in print

## What not to do

- Do not place the lockup over busy photography without a backing
  surface (use one of the `on-navy` variants instead).
- Do not recolour the mark outside the brand palette.
- Do not replace the italic "Mate" with an upright weight — the italic
  is the brand's character.
- Do not separate the bubble's tail dot from the bubble.

— v1 · 2026
