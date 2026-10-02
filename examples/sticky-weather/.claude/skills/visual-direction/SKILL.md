---
name: visual-direction
description: "Applies the \"Sticky Weather — Cheeky Sticker Studio Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Sticky Weather — Cheeky Sticker Studio Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Stack Sans Headline (600, clamp(2.75rem, 7.5vw, 6.5rem), lh 0.95, ls -0.035em); heading = Stack Sans Headline; body = Stack Sans Text 1.0625rem/1.6; utility = Stack Sans Text 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Sharp: rounded-button / rounded-card / rounded-media and shadow-card tokens only. No rounded corners anywhere; structure comes from lines and space.
7. Menu — Split pill: Three separate pieces at the top edge: signature logo left, a compact white pill of 3–4 uppercase links centred, and one boxed action with a status dot (● Contact) right. No bar behind them.

## Principles
- A neutral page so stickers and chapter colours can shout
- Split big headlines between two whole voices
- Every interaction has a small wink

## Never
- Gradients and glass
- More than one accent in the same view
- Stickers made by AI — use the brand’s own marks
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
