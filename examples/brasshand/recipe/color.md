## Color System — Lido Blue

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#5AA9FF` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#7FBDFF` | Raised or contained areas | Long copy sits on surface | Text on surface: 9.83:1 — AAA |
| text | `#0A0A23` | Primary reading color | Headlines and body copy | On background: 7.92:1 — AAA |
| muted | `#14204A` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.41:1 — AA |
| primary | `#0A0A23` | Brand ink | Primary buttons, key links, logo | On background: 7.92:1 — AAA |
| secondary | `#4A98EE` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#8E0D3C` | The one signal | Burgundy for one word or the active state (3.8:1 — UI marks and large type) | On background: 3.76:1 — AA large text only |
| border | `#3F8DE6` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #5AA9FF;
  --color-surface: #7FBDFF;
  --color-text: #0A0A23;
  --color-muted: #14204A;
  --color-primary: #0A0A23;
  --color-secondary: #4A98EE;
  --color-accent: #8E0D3C;
  --color-border: #3F8DE6;
}
```
