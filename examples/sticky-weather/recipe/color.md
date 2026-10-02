## Color System — Bubblegum

| Role | Hex | Purpose | Usage | Contrast |
|---|---|---|---|---|
| background | `#FF8FC7` | The page ground | Body background and full-width sections — commit to it, full-bleed | — |
| surface | `#FFB0D7` | Raised or contained areas | Long copy sits on surface | Text on surface: 10.71:1 — AAA |
| text | `#2A0A1F` | Primary reading color | Headlines and body copy | On background: 8.61:1 — AAA |
| muted | `#5A1A40` | Secondary information | Captions, metadata, helper text, input outlines — never long paragraphs | On background: 6.04:1 — AA |
| primary | `#2A0A1F` | Brand ink | Primary buttons, key links, logo | On background: 8.61:1 — AAA |
| secondary | `#F27AB6` | Supporting tone | Secondary buttons, tags, subtle section backgrounds | — |
| accent | `#0038FF` | The one signal | Klein blue for links and one sticker (3.3:1 — marks and large type only) | On background: 3.32:1 — AA large text only |
| border | `#EE76B3` | Structure lines | Hairlines and dividers only (≈1.5:1) — input outlines use muted to meet WCAG 1.4.11 | — |

```css
:root {
  --color-background: #FF8FC7;
  --color-surface: #FFB0D7;
  --color-text: #2A0A1F;
  --color-muted: #5A1A40;
  --color-primary: #2A0A1F;
  --color-secondary: #F27AB6;
  --color-accent: #0038FF;
  --color-border: #EE76B3;
}
```

### Colour chapters — Sticker Pop

Klein blue, bubblegum pink, safety orange. Three loud primaries-with-a-twist, each owning a chapter, so colour tells visitors where they are. The page stays on the palette above; each chapter section (Colour Chapters, and any section you mark as a chapter) takes the next colour in turn as a full field — `--color-chapter-1` #0038FF, `--color-chapter-2` #FF77CD, `--color-chapter-3` #FF5F04. Never two chapter colours in one view; never a thin stripe of one.
