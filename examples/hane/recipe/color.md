## Color System — Pink Plaster

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#EACDC3` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#F4DFD8` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 10.85:1 — AAA |
| text | `#1D2B4F` | Primary reading color | Headlines and body copy | On background: 9.28:1 — AAA |
| muted | `#5A4A55` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 5.51:1 — AA |
| primary | `#1D2B4F` | Brand ink | Primary buttons, key links, logo | On background: 9.28:1 — AAA |
| secondary | `#E5BDAF` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#A3123A` | The one signal | Claret, used almost never — a seal, not a highlight | On background: 5.18:1 — AA |
| border | `#D8B5A8` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #EACDC3;
  --color-surface: #F4DFD8;
  --color-text: #1D2B4F;
  --color-muted: #5A4A55;
  --color-primary: #1D2B4F;
  --color-secondary: #E5BDAF;
  --color-accent: #A3123A;
  --color-border: #D8B5A8;
}
```
