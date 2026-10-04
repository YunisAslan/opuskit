## Color System — Legal Pad

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#F7EEC0` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#FBF6DB` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 14.41:1 — AAA |
| text | `#16204A` | Primary reading color | Headlines and body copy | On background: 13.40:1 — AAA |
| muted | `#5A5A52` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 5.94:1 — AA |
| primary | `#2336A8` | Brand ink | Ballpoint blue for links and buttons | On background: 8.29:1 — AAA |
| secondary | `#EADFAA` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#C8323C` | The one signal | Margin-line red for a single mark per view | On background: 4.51:1 — AA |
| border | `#E4D9A0` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #F7EEC0;
  --color-surface: #FBF6DB;
  --color-text: #16204A;
  --color-muted: #5A5A52;
  --color-primary: #2336A8;
  --color-secondary: #EADFAA;
  --color-accent: #C8323C;
  --color-border: #E4D9A0;
}
```
