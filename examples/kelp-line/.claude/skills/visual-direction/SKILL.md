---
name: visual-direction
description: "Applies the \"Kelp Line — Warm Coastal Calm Foundation\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Kelp Line — Warm Coastal Calm Foundation

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Hedvig Letters Serif (400, clamp(2.75rem, 6.5vw, 5.75rem), lh 1.02, ls -0.02em); heading = Hedvig Letters Serif; body = Hedvig Letters Sans 1.0625rem/1.6; utility = Hedvig Letters Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Soft: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Small, consistent radii; never mix sharp and rounded.
7. Menu — Floating pill: A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.

## Principles
- Light and air before content
- Cool colours, warm words
- Wide images, small type

## Never
- Dark heavy sections
- Crowded grids
- Loud colours
- A cream or beige page ground with a clay/terracotta accent
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
