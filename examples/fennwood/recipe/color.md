## Color System — Apricot Hall

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#FECD8C` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#FFE0B5` | Raised or contained areas | Cards and long captions | Text on surface: 15.00:1 — AAA |
| text | `#001317` | Primary reading color | Headlines and body copy | On background: 12.96:1 — AAA |
| muted | `#4A3A22` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 7.46:1 — AAA |
| primary | `#001317` | Brand ink | Primary buttons, key links, logo | On background: 12.96:1 — AAA |
| secondary | `#F5BC6E` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#4F5E12` | The one signal | Dark olive for links and the active state — the museum-label green | On background: 4.87:1 — AA |
| border | `#E5B06A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #FECD8C;
  --color-surface: #FFE0B5;
  --color-text: #001317;
  --color-muted: #4A3A22;
  --color-primary: #001317;
  --color-secondary: #F5BC6E;
  --color-accent: #4F5E12;
  --color-border: #E5B06A;
}
```
