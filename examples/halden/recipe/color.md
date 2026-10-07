## Color System — Charcoal Signal

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#181D21` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#22282D` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 14.90:1 — AAA |
| text | `#FFFFFF` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 16.98:1 — AAA |
| muted | `#A3ABB2` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 7.30:1 — AAA |
| primary | `#FFFFFF` | Brand ink | Primary buttons, key links, logo | On background: 16.98:1 — AAA |
| secondary | `#2B3238` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#FF4421` | The one signal | Red-orange for one band or the CTA (Boc Studio, SWSH) — never body text | On background: 4.93:1 — AA |
| border | `#363E45` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #181D21;
  --color-surface: #22282D;
  --color-text: #FFFFFF;
  --color-muted: #A3ABB2;
  --color-primary: #FFFFFF;
  --color-secondary: #2B3238;
  --color-accent: #FF4421;
  --color-border: #363E45;
}
```
