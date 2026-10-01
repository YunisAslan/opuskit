## Color System — Cherry Red

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#8C0F1E` | The page ground | The whole page is cherry — confidence is the point | — |
| surface | `#9E1A2A` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 7.25:1 — AAA |
| text | `#FFF1F2` | Primary reading color | Headlines and body copy | On background: 8.68:1 — AAA |
| muted | `#F5C2C8` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.10:1 — AA |
| primary | `#FFF1F2` | Brand ink | Primary buttons, key links, logo | On background: 8.68:1 — AAA |
| secondary | `#A8283A` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#FFD8E0` | The one signal | Use in fewer than 5% of pixels: active states, a single highlight per view | On background: 7.33:1 — AAA |
| border | `#B23A4A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #8C0F1E;
  --color-surface: #9E1A2A;
  --color-text: #FFF1F2;
  --color-muted: #F5C2C8;
  --color-primary: #FFF1F2;
  --color-secondary: #A8283A;
  --color-accent: #FFD8E0;
  --color-border: #B23A4A;
}
```
