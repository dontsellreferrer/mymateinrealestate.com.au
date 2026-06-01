# Typography

The brand uses two Google Fonts. Both are free, open-source, and available
via Google Fonts CDN or self-hosting through [Fontsource](https://fontsource.org).

## Plus Jakarta Sans

Used for the "My" word, the "IN REAL ESTATE" tag, and the "mm." inside
the bubble mark. Also use for UI, body copy, and headings throughout
the brand.

Weights used:
- **500** — small uppercase tag ("IN REAL ESTATE"), UI labels
- **600** — "My" in the wordmark, navigation links, body emphasis
- **700** — section headings
- **800** — the "mm." inside the bubble, display headings

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
```

```css
font-family: 'Plus Jakarta Sans', 'Helvetica Neue', Arial, sans-serif;
```

## Instrument Serif

Used **italic only**, for the "Mate" word in the lockup and for pull
quotes / accents. Never use upright Instrument Serif — the italic is
the brand's character.

Weight: **400 italic**

```html
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
```

```css
font-family: 'Instrument Serif', 'Times New Roman', Georgia, serif;
font-style: italic;
```

## Type ratios (display sizes)

| Element          | Font                       | Weight   | Letter-spacing | Notes                       |
|------------------|----------------------------|----------|----------------|-----------------------------|
| Wordmark "My"    | Plus Jakarta Sans          | 600      | -0.02em        |                             |
| Wordmark "Mate"  | Instrument Serif Italic    | 400      | -0.01em        | 1.22× the "My" font-size    |
| Wordmark tag     | Plus Jakarta Sans          | 500      | 0.24em         | uppercase, 0.36× "My" size  |
| Mark "mm."       | Plus Jakarta Sans          | 800      | -0.05em        | period in accent colour     |

## Combined import

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
```
