## Color System — Graphite & Sand

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#303030` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#3A3A3A` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 10.18:1 — AAA |
| text | `#F5F2EC` | Primary reading color | Warm white, never pure white | On background: 11.81:1 — AAA |
| muted | `#B5B0A8` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.12:1 — AA |
| primary | `#F5F2EC` | Brand ink | Primary buttons, key links, logo | On background: 11.81:1 — AAA |
| secondary | `#444444` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#F6CEA0` | The one signal | Sand for the active chapter, time-codes and one word — never fills | On background: 8.96:1 — AAA |
| border | `#4A4A4A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #303030;
  --color-surface: #3A3A3A;
  --color-text: #F5F2EC;
  --color-muted: #B5B0A8;
  --color-primary: #F5F2EC;
  --color-secondary: #444444;
  --color-accent: #F6CEA0;
  --color-border: #4A4A4A;
}
```
