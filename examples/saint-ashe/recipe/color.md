## Color System — Mulberry

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#6E1E4A` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#7C2A57` | Raised or contained areas | Cards, form fields, media placeholders; on mid-tone grounds, long body copy sits here | Text on surface: 8.19:1 — AAA |
| text | `#FFF0F6` | Primary reading color | Headlines and body copy | On background: 9.78:1 — AAA |
| muted | `#E3B9CD` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.21:1 — AA |
| primary | `#FFF0F6` | Brand ink | Primary buttons, key links, logo | On background: 9.78:1 — AAA |
| secondary | `#852F5F` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#9FE6C4` | The one signal | Mint for one highlight — the cool complement to the wine | On background: 7.49:1 — AAA |
| border | `#8A3A66` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #6E1E4A;
  --color-surface: #7C2A57;
  --color-text: #FFF0F6;
  --color-muted: #E3B9CD;
  --color-primary: #FFF0F6;
  --color-secondary: #852F5F;
  --color-accent: #9FE6C4;
  --color-border: #8A3A66;
}
```
