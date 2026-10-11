## Color System — Gallery Grey

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#DAD8DB` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#E9E8EA` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 15.90:1 — AAA |
| text | `#0D0D0F` | Primary reading color | Headlines and body copy — ink is ink: keep it neutral, never recolour it to another hue | On background: 13.71:1 — AAA |
| muted | `#4A484D` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.38:1 — AA |
| primary | `#0D0D0F` | Brand ink | Primary buttons, key links, logo | On background: 13.71:1 — AAA |
| secondary | `#CDCBCF` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#D93208` | The one signal | Vermilion for one band, tag or active state per view (Boc Studio’s orange strip) | On background: 3.36:1 — AA large text only |
| border | `#C0BEC3` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |
| error | `#B42318` | Form errors and failed states | Only for an error message, an invalid field’s border and a failed state — never decoration, never the accent’s job | AA on background |

```css
:root {
  --color-background: #DAD8DB;
  --color-surface: #E9E8EA;
  --color-text: #0D0D0F;
  --color-muted: #4A484D;
  --color-primary: #0D0D0F;
  --color-secondary: #CDCBCF;
  --color-accent: #D93208;
  --color-border: #C0BEC3;
  --color-error: #B42318;
}
```
