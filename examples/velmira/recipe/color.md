## Color System — Midnight Chapters

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#271A70` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#33246F` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 12.94:1 — AAA |
| text | `#FFFFFF` | Primary reading color | Headlines and body copy | On background: 14.31:1 — AAA |
| muted | `#C8C3E8` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 8.47:1 — AAA |
| primary | `#FFFFFF` | Brand ink | Primary buttons, key links, logo | On background: 14.31:1 — AAA |
| secondary | `#33267E` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#FDA1A2` | The one signal | Coral for the active chapter and one highlight | On background: 7.35:1 — AAA |
| border | `#40338A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #271A70;
  --color-surface: #33246F;
  --color-text: #FFFFFF;
  --color-muted: #C8C3E8;
  --color-primary: #FFFFFF;
  --color-secondary: #33267E;
  --color-accent: #FDA1A2;
  --color-border: #40338A;
}
```
