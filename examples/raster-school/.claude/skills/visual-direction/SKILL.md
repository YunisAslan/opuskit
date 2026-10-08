---
name: visual-direction
description: "Applies the \"Raster School — Precise Swiss Modern Course Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Raster School — Precise Swiss Modern Course Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Zalando Sans (800, clamp(3rem, 9vw, 8.5rem), lh 0.9, ls -0.045em); heading = Zalando Sans; body = Zalando Sans 1rem/1.5; utility = Zalando Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Sharp: rounded-button / rounded-card / rounded-media and shadow-card tokens only. No rounded corners anywhere; structure comes from lines and space.
7. Menu — Floating pill: A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.

## Principles
- Objective structure
- Hierarchy through size and position
- Motion only to clarify

## Never
- Soft shadows
- Ornament
- Script or decorative fonts
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
