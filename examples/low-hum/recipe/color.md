## Color System — Espresso

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#2A1A14` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#3A2820` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 11.80:1 — AAA |
| text | `#F5EAE2` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 14.13:1 — AAA |
| muted | `#C9B2A4` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 8.27:1 — AAA |
| primary | `#F5EAE2` | Brand ink | Primary buttons, key links, logo | On background: 14.13:1 — AAA |
| secondary | `#4A342A` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#A8E0CF` | The one signal | Pale mint for one highlight — the fresh note against the roast | On background: 11.33:1 — AAA |
| border | `#54403A` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |
| error | `#FF7A6B` | Form errors and failed states | Only for an error message, an invalid field’s border and a failed state — never decoration, never the accent’s job | AA on background |

```css
:root {
  --color-background: #2A1A14;
  --color-surface: #3A2820;
  --color-text: #F5EAE2;
  --color-muted: #C9B2A4;
  --color-primary: #F5EAE2;
  --color-secondary: #4A342A;
  --color-accent: #A8E0CF;
  --color-border: #54403A;
  --color-error: #FF7A6B;
}
```
