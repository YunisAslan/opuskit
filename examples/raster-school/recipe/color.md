## Color System — Klein Field

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#1F35D6` | The page ground | The whole page is the colour — do not retreat to white sections | — |
| surface | `#2A43E6` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 6.90:1 — AA |
| text | `#FFFFFF` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 8.27:1 — AAA |
| muted | `#C9D0FF` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 5.50:1 — AA |
| primary | `#FFFFFF` | Brand ink | Primary buttons, key links, logo | On background: 8.27:1 — AAA |
| secondary | `#1428A8` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#FF9ED8` | The one signal | Pink for one hover or one mark | On background: 4.39:1 — AA large text only |
| border | `#4B5DEB` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |
| error | `#FFB4A9` | Form errors and failed states | Only for an error message, an invalid field’s border and a failed state — never decoration, never the accent’s job | AA on background |

```css
:root {
  --color-background: #1F35D6;
  --color-surface: #2A43E6;
  --color-text: #FFFFFF;
  --color-muted: #C9D0FF;
  --color-primary: #FFFFFF;
  --color-secondary: #1428A8;
  --color-accent: #FF9ED8;
  --color-border: #4B5DEB;
  --color-error: #FFB4A9;
}
```
