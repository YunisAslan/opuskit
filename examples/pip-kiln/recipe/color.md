## Color System — Butter Yellow

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#FFDE47` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#FFEB8F` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 15.13:1 — AAA |
| text | `#1A1600` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 13.63:1 — AAA |
| muted | `#4A4010` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 7.77:1 — AAA |
| primary | `#1A1600` | Brand ink | Primary buttons, key links, logo | On background: 13.63:1 — AAA |
| secondary | `#F2CF2E` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#C2185B` | The one signal | Raspberry on one link state; the yellow is the statement | On background: 4.42:1 — AA large text only |
| border | `#E0C230` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |
| error | `#B42318` | Form errors and failed states | Only for an error message, an invalid field’s border and a failed state — never decoration, never the accent’s job | AA on background |

```css
:root {
  --color-background: #FFDE47;
  --color-surface: #FFEB8F;
  --color-text: #1A1600;
  --color-muted: #4A4010;
  --color-primary: #1A1600;
  --color-secondary: #F2CF2E;
  --color-accent: #C2185B;
  --color-border: #E0C230;
  --color-error: #B42318;
}
```
