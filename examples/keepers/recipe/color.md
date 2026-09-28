## Color System — Electric Lime

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#D6FF3D` | The page ground | Lime is the ground, never a small accent | — |
| surface | `#E4FF7A` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 17.80:1 — AAA |
| text | `#0A0A0A` | Primary reading color | Headlines and body copy | On background: 17.19:1 — AAA |
| muted | `#3A4200` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 9.31:1 — AAA |
| primary | `#0A0A0A` | Brand ink | Primary buttons, key links, logo | On background: 17.19:1 — AAA |
| secondary | `#C2EB20` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#6A11E8` | The one signal | Violet for one mark | On background: 6.38:1 — AA |
| border | `#0A0A0A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #D6FF3D;
  --color-surface: #E4FF7A;
  --color-text: #0A0A0A;
  --color-muted: #3A4200;
  --color-primary: #0A0A0A;
  --color-secondary: #C2EB20;
  --color-accent: #6A11E8;
  --color-border: #0A0A0A;
}
```
