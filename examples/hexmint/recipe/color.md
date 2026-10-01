## Color System — Night Ink

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#11254B` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#1B315B` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 11.56:1 — AAA |
| text | `#F1F3F8` | Primary reading color | Headlines and body copy | On background: 13.61:1 — AAA |
| muted | `#A7B2C8` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 7.08:1 — AAA |
| primary | `#F1F3F8` | Brand ink | Primary buttons, key links, logo | On background: 13.61:1 — AAA |
| secondary | `#253C67` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#F2E14C` | The one signal | Lemon for live states and data highlights — never large fills | On background: 11.26:1 — AAA |
| border | `#34497A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #11254B;
  --color-surface: #1B315B;
  --color-text: #F1F3F8;
  --color-muted: #A7B2C8;
  --color-primary: #F1F3F8;
  --color-secondary: #253C67;
  --color-accent: #F2E14C;
  --color-border: #34497A;
}
```
