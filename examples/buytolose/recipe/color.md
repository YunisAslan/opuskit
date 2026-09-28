## Color System — Pool Tile

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#86C9C4` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#A3D8D3` | Raised or contained areas | Long body copy sits on surface — the mid-tone ground is for display type and large fields | Text on surface: 9.20:1 — AAA |
| text | `#0B2E30` | Primary reading color | Headlines and body copy | On background: 7.71:1 — AAA |
| muted | `#1F4D4F` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 5.00:1 — AA |
| primary | `#0B2E30` | Brand ink | Primary buttons, key links, logo | On background: 7.71:1 — AAA |
| secondary | `#6FB5B0` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#B3123F` | The one signal | Raspberry for UI marks and large type only (3.6:1) | On background: 3.63:1 — AA large text only |
| border | `#5FA8A3` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #86C9C4;
  --color-surface: #A3D8D3;
  --color-text: #0B2E30;
  --color-muted: #1F4D4F;
  --color-primary: #0B2E30;
  --color-secondary: #6FB5B0;
  --color-accent: #B3123F;
  --color-border: #5FA8A3;
}
```
