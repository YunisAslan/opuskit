## Color System — Limestone

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#CDB58F` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#DCC8A6` | Raised or contained areas | Cards and long copy | Text on surface: 10.60:1 — AAA |
| text | `#1E1A14` | Primary reading color | Headlines and body copy | On background: 8.74:1 — AAA |
| muted | `#4A3F2E` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 5.19:1 — AA |
| primary | `#1E1A14` | Brand ink | Primary buttons, key links, logo | On background: 8.74:1 — AAA |
| secondary | `#C0A57A` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#1E3A8A` | The one signal | Lapis blue for links and the one highlight — the colour of the stone inlay | On background: 5.23:1 — AA |
| border | `#B39A70` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #CDB58F;
  --color-surface: #DCC8A6;
  --color-text: #1E1A14;
  --color-muted: #4A3F2E;
  --color-primary: #1E1A14;
  --color-secondary: #C0A57A;
  --color-accent: #1E3A8A;
  --color-border: #B39A70;
}
```
