## Color System — Sage White

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#DDEBD8` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#F0F6EE` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 17.30:1 — AAA |
| text | `#0E110E` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 15.34:1 — AAA |
| muted | `#4B5649` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.22:1 — AA |
| primary | `#0E110E` | Brand ink | Primary buttons, key links, logo | On background: 15.34:1 — AAA |
| secondary | `#D5DFD1` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#0B7A4B` | The one signal | Pitch green for links and the donate/book button only | On background: 4.35:1 — AA large text only |
| border | `#C5D0C1` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #DDEBD8;
  --color-surface: #F0F6EE;
  --color-text: #0E110E;
  --color-muted: #4B5649;
  --color-primary: #0E110E;
  --color-secondary: #D5DFD1;
  --color-accent: #0B7A4B;
  --color-border: #C5D0C1;
}
```
