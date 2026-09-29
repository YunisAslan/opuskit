## Color System — Celery Room

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#CEDE91` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#E0ECB7` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 13.28:1 — AAA |
| text | `#24173F` | Primary reading color | Headlines and body copy | On background: 11.41:1 — AAA |
| muted | `#4A4A3A` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.21:1 — AA |
| primary | `#3A1F6E` | Brand ink | Deep violet for actions | On background: 9.05:1 — AAA |
| secondary | `#B7C86B` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#6A2FD9` | The one signal | Bright violet for a single highlight | On background: 4.79:1 — AA |
| border | `#B7C86B` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #CEDE91;
  --color-surface: #E0ECB7;
  --color-text: #24173F;
  --color-muted: #4A4A3A;
  --color-primary: #3A1F6E;
  --color-secondary: #B7C86B;
  --color-accent: #6A2FD9;
  --color-border: #B7C86B;
}
```
