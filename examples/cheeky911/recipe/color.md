## Color System — Oxblood Room

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#4A1119` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#5A1A23` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 11.30:1 — AAA |
| text | `#F8ECE8` | Primary reading color | Headlines and body copy | On background: 13.10:1 — AAA |
| muted | `#D7B5B0` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 8.03:1 — AAA |
| primary | `#F8ECE8` | Brand ink | Primary buttons, key links, logo | On background: 13.10:1 — AAA |
| secondary | `#6B2530` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#A9D6FF` | The one signal | Powder blue for time-codes, active chapter and play states | On background: 9.92:1 — AAA |
| border | `#6E2A34` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #4A1119;
  --color-surface: #5A1A23;
  --color-text: #F8ECE8;
  --color-muted: #D7B5B0;
  --color-primary: #F8ECE8;
  --color-secondary: #6B2530;
  --color-accent: #A9D6FF;
  --color-border: #6E2A34;
}
```
