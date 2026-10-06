## Color System — Warm Black

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#231F1B` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#2E2925` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 12.57:1 — AAA |
| text | `#F4EFE8` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 14.31:1 — AAA |
| muted | `#B8AFA4` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 7.56:1 — AAA |
| primary | `#F4EFE8` | Brand ink | Primary buttons, key links, logo | On background: 14.31:1 — AAA |
| secondary | `#3F3933` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#D2AE6E` | The one signal | Brass for links, small caps labels and one rule per view | On background: 7.81:1 — AAA |
| border | `#4A433C` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #231F1B;
  --color-surface: #2E2925;
  --color-text: #F4EFE8;
  --color-muted: #B8AFA4;
  --color-primary: #F4EFE8;
  --color-secondary: #3F3933;
  --color-accent: #D2AE6E;
  --color-border: #4A433C;
}
```
