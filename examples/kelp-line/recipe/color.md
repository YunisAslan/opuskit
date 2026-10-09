## Color System — Bottle Green

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#0F3F2E` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#1E4C3A` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 8.68:1 — AAA |
| text | `#EEF3EC` | Primary reading color | Pale green-white, never pure white | On background: 10.54:1 — AAA |
| muted | `#A9C2B5` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.25:1 — AA |
| primary | `#EEF3EC` | Brand ink | Primary buttons, key links, logo | On background: 10.54:1 — AAA |
| secondary | `#2A5A47` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#F4A6C1` | The one signal | Pale pink as the single complementary note | On background: 6.25:1 — AA |
| border | `#386652` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |
| error | `#FF7A6B` | Form errors and failed states | Only for an error message, an invalid field’s border and a failed state — never decoration, never the accent’s job | AA on background |

```css
:root {
  --color-background: #0F3F2E;
  --color-surface: #1E4C3A;
  --color-text: #EEF3EC;
  --color-muted: #A9C2B5;
  --color-primary: #EEF3EC;
  --color-secondary: #2A5A47;
  --color-accent: #F4A6C1;
  --color-border: #386652;
  --color-error: #FF7A6B;
}
```
