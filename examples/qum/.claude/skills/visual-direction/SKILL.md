---
name: visual-direction
description: "Applies the \"QUM — Warm Scandinavian Minimal Store\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — QUM — Warm Scandinavian Minimal Store

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Petrona (300, clamp(3rem, 7.5vw, 6.75rem), lh 0.98, ls -0.03em); heading = Petrona; body = Public Sans 1.0625rem/1.6; utility = Public Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Soft: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Small, consistent radii; never mix sharp and rounded.
7. Menu — Centered logo: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.

## Principles
- Function first, softness second
- Light backgrounds, tactile details
- Clear, generous hierarchy

## Never
- Pure white + pure black
- Dramatic dark sections
- Ornamental type
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
