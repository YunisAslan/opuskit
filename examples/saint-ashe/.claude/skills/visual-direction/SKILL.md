---
name: visual-direction
description: "Applies the \"Saint Ashe — Gothic Modern Fashion House\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Saint Ashe — Gothic Modern Fashion House

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Grenze Gotisch (700, clamp(3rem, 9vw, 8rem), lh 0.9, ls 0); heading = Grenze Gotisch; body = Work Sans 1rem/1.6; utility = Work Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Sharp: rounded-button / rounded-card / rounded-media and shadow-card tokens only. No rounded corners anywhere; structure comes from lines and space.
7. Menu — Centered logo: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.

## Principles
- Contrast is the whole design
- Headlines as artwork
- Dark space frames everything

## Never
- Blackletter for paragraphs
- Bright pastel accents
- Cute illustrations
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
