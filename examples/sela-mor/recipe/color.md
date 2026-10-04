## Color System — Black Box

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#000000` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#141414` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 18.42:1 — AAA |
| text | `#FFFFFF` | Primary reading color | Headlines and body copy | On background: 21.00:1 — AAA |
| muted | `#A3A3A3` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 8.33:1 — AAA |
| primary | `#FFFFFF` | Brand ink | Primary buttons, key links, logo | On background: 21.00:1 — AAA |
| secondary | `#262626` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#FFFFFF` | The one signal | Accent equals ink — emphasis comes from scale and weight, not colour | On background: 21.00:1 — AAA |
| border | `#333333` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #000000;
  --color-surface: #141414;
  --color-text: #FFFFFF;
  --color-muted: #A3A3A3;
  --color-primary: #FFFFFF;
  --color-secondary: #262626;
  --color-accent: #FFFFFF;
  --color-border: #333333;
}
```
