## Color System — Signal White

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#FFFFFF` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#F1F1EF` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 18.57:1 — AAA |
| text | `#000000` | Primary reading color | Headlines and body copy | On background: 21.00:1 — AAA |
| muted | `#5E5E5E` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.48:1 — AA |
| primary | `#000000` | Brand ink | Primary buttons, key links, logo | On background: 21.00:1 — AAA |
| secondary | `#E6E6E4` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#D7261E` | The one signal | Signal red for one word, one number or the active state per view | On background: 5.02:1 — AA |
| border | `#DCDCDA` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #FFFFFF;
  --color-surface: #F1F1EF;
  --color-text: #000000;
  --color-muted: #5E5E5E;
  --color-primary: #000000;
  --color-secondary: #E6E6E4;
  --color-accent: #D7261E;
  --color-border: #DCDCDA;
}
```
