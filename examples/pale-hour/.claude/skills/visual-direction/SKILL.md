---
name: visual-direction
description: "Applies the \"Pale Hour — Atelier Art Editorial Event Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Pale Hour — Atelier Art Editorial Event Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Prata (400, clamp(3rem, 8.5vw, 8rem), lh 0.95, ls -0.025em); heading = Prata; body = Public Sans 1rem/1.6; utility = Public Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Sharp: rounded-button / rounded-card / rounded-media and shadow-card tokens only. No rounded corners anywhere; structure comes from lines and space.
7. Menu — Centered logo: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.

## Principles
- The work is the interface
- Captions carry context
- Sequence matters more than grid

## Never
- Hover effects that distort artwork
- Heavy UI chrome
- Autoplaying carousels
- A cream or beige page ground with a clay/terracotta accent
- A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black
- Small uppercase, letter-spaced monospace labels above every heading
- Numbered markers (01 / 02) on content that is not a real sequence
- Meta strings joined with middle dots or spaced em dashes, and "→" appended to links
- One italic or coloured accent word inside an otherwise plain headline
- Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts
- Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block
- Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit

## Self-check before finishing a component
- Does it use tokens only?
- Is there exactly one visual priority?
- Would it still look intentional in grayscale?
