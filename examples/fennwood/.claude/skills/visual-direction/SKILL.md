---
name: visual-direction
description: "Applies the \"Fennwood — Organic Modern Restaurant Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Fennwood — Organic Modern Restaurant Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Rubik (600, clamp(2.75rem, 7vw, 6rem), lh 0.98, ls -0.03em); heading = Rubik; body = Rubik 1.0625rem/1.6; utility = Rubik 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Soft: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Small, consistent radii; never mix sharp and rounded.
7. Menu — Centered logo: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.

## Principles
- Materials over graphics
- Soft geometry — arches and gentle radii, never bubbly
- Calm, editorial pacing between product moments
- Colors taken from the products themselves

## Never
- Pure black text
- Neon or cool blue accents
- Clinical, dense grids
- Stock lifestyle photos with fake smiles
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
