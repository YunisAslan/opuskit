## Color System — Console Lilac

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#9D91E3` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#B2A8EA` | Raised or contained areas | Cards and long copy | Text on surface: 9.68:1 — AAA |
| text | `#000000` | Primary reading color | Headlines and body copy | On background: 7.59:1 — AAA |
| muted | `#1E1640` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.10:1 — AA |
| primary | `#000000` | Brand ink | Primary buttons, key links, logo | On background: 7.59:1 — AAA |
| secondary | `#8A7DD8` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#000000` | The one signal | Accent equals ink — black pills and black panels are the signal; a lime (#C0FB50) mark may live only inside black | On background: 7.59:1 — AAA |
| border | `#7D70CC` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #9D91E3;
  --color-surface: #B2A8EA;
  --color-text: #000000;
  --color-muted: #1E1640;
  --color-primary: #000000;
  --color-secondary: #8A7DD8;
  --color-accent: #000000;
  --color-border: #7D70CC;
}
```
