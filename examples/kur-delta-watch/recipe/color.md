## Color System — Hazard Yellow

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#F5C518` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#FFD84D` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 15.18:1 — AAA |
| text | `#000000` | Primary reading color | Headlines and body copy | On background: 12.88:1 — AAA |
| muted | `#4A3B00` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.72:1 — AA |
| primary | `#000000` | Brand ink | Primary buttons, key links, logo | On background: 12.88:1 — AAA |
| secondary | `#E0AE00` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#1A3BD4` | The one signal | Ultramarine for sale/new markers only | On background: 4.92:1 — AA |
| border | `#000000` | Structure lines | Borders are full black — structure is the aesthetic | — |

```css
:root {
  --color-background: #F5C518;
  --color-surface: #FFD84D;
  --color-text: #000000;
  --color-muted: #4A3B00;
  --color-primary: #000000;
  --color-secondary: #E0AE00;
  --color-accent: #1A3BD4;
  --color-border: #000000;
}
```
