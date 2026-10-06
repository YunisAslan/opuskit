## Color System — Grading Suite

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#040404` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#141518` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 15.21:1 — AAA |
| text | `#EDEAE4` | Primary reading color | Warm white, never pure white | On background: 17.08:1 — AAA |
| muted | `#9C9890` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 7.13:1 — AAA |
| primary | `#EDEAE4` | Brand ink | Primary buttons, key links, logo | On background: 17.08:1 — AAA |
| secondary | `#1F2226` | Supporting tone | Secondary buttons, tags, subtle section backgrounds — a small step from the ground, never a darker mid-tone of it | — |
| accent | `#E8A98C` | The one signal | The peach of the vectorscope skin-tone line: the live dot, the active step, one word — never fills or buttons | On background: 10.24:1 — AAA |
| border | `#26282C` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #040404;
  --color-surface: #141518;
  --color-text: #EDEAE4;
  --color-muted: #9C9890;
  --color-primary: #EDEAE4;
  --color-secondary: #1F2226;
  --color-accent: #E8A98C;
  --color-border: #26282C;
}
```
