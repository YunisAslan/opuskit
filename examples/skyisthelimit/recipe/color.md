## Color System — High Contrast

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#F2F0E6` | The page ground | Body background and full-width sections | — |
| surface | `#FFFFFF` | Raised or contained areas | Cards, form fields, media placeholders, alternate sections | Text on surface: 19.80:1 — AAA |
| text | `#0A0A0A` | Primary reading color | Headlines and body copy | On background: 17.33:1 — AAA |
| muted | `#4A4A45` | Secondary information | Captions, metadata, helper text — never long paragraphs | On background: 7.80:1 — AAA |
| primary | `#0A0A0A` | Brand ink | Primary buttons, key links, logo | On background: 17.33:1 — AAA |
| secondary | `#E4FF3A` | Supporting tone | Acid yellow as flat block color for tags and hover fills | — |
| accent | `#FF4F1F` | The one signal | Signal orange for sale/new markers | On background: 2.88:1 — Decorative only |
| border | `#0A0A0A` | Structure lines | Borders are full ink — structure is visible | — |

```css
:root {
  --color-background: #F2F0E6;
  --color-surface: #FFFFFF;
  --color-text: #0A0A0A;
  --color-muted: #4A4A45;
  --color-primary: #0A0A0A;
  --color-secondary: #E4FF3A;
  --color-accent: #FF4F1F;
  --color-border: #0A0A0A;
}
```
