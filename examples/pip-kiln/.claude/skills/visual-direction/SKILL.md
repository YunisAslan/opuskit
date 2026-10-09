---
name: visual-direction
description: "Applies the \"Pip & Kiln — Cheeky Playful Pop Store\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Pip & Kiln — Cheeky Playful Pop Store

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Bagel Fat One (400, clamp(3rem, 10vw, 9rem), lh 0.9, ls -0.01em); heading = Epilogue; body = Epilogue 1.0625rem/1.6; utility = Epilogue 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Pill: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Buttons, tags and inputs are full pills; cards and media are very round.
7. Menu — Classic bar: Full-width bar: logo left, 4–6 links and the primary action right, on the page ground with a hairline bottom border.

## Principles
- Colour and type do the shouting
- Playful shapes and stickers
- Big, simple messages

## Never
- Serious corporate tone
- Muted colours
- Long paragraphs
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
