## Color System — Studio Aqua

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#B6DADA` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#F4F4F4` | Raised or contained areas | Paper-white cards and the nav pill — the calm layer stickers sit on | Text on surface: 17.30:1 — AAA |
| text | `#101010` | Primary reading color | Headlines and body copy | On background: 12.71:1 — AAA |
| muted | `#324545` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.77:1 — AA |
| primary | `#101010` | Brand ink | Primary buttons, key links, logo | On background: 12.71:1 — AAA |
| secondary | `#9CCACA` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#0038FF` | The one signal | Klein blue for links and the active state; chapter colours do the rest | On background: 4.66:1 — AA |
| border | `#8DBABA` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #B6DADA;
  --color-surface: #F4F4F4;
  --color-text: #101010;
  --color-muted: #324545;
  --color-primary: #101010;
  --color-secondary: #9CCACA;
  --color-accent: #0038FF;
  --color-border: #8DBABA;
}
```
