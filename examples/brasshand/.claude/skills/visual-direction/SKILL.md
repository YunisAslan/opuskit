---
name: visual-direction
description: "Applies the \"Brasshand — Typography First Agency Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Brasshand — Typography First Agency Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Bayon (400, clamp(4rem, 13vw, 12rem), lh 0.85, ls 0); heading = Bayon; body = Reddit Sans 1.0625rem/1.55; utility = Reddit Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Sharp: rounded-button / rounded-card / rounded-media and shadow-card tokens only. No rounded corners anywhere; structure comes from lines and space.
7. Menu — Full-screen menu: Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.

## Principles
- The words are the image
- Scale contrast of at least 8:1 between display and body
- Every line break is designed by hand
- Media is punctuation, not wallpaper

## Never
- Filling space with stock photos
- More than two families
- Auto-wrapped display text
- Low contrast "aesthetic" greys
- A cream or beige page ground with a clay/terracotta accent
- A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black
- Small uppercase, letter-spaced monospace labels above every heading
- Numbered markers (01 / 02) on content that is not a real sequence
- Meta strings joined with middle dots or spaced em dashes, and "→" appended to links
- One italic or coloured accent word inside an otherwise plain headline
- Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts

## Self-check before finishing a component
- Does it use tokens only?
- Is there exactly one visual priority?
- Would it still look intentional in grayscale?
