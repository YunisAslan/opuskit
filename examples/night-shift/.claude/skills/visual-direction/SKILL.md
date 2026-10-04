---
name: visual-direction
description: "Applies the \"Night Shift — Technical Minimal Course Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Night Shift — Technical Minimal Course Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Science Gothic (600, clamp(2.5rem, 7vw, 6rem), lh 0.95, ls -0.01em); heading = Science Gothic; body = Atkinson Hyperlegible Next 1rem/1.6; utility = Atkinson Hyperlegible Next 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Hairline: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.
7. Menu — Floating dock: A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.

## Principles
- Information density done calmly
- Labels and numbers are design
- Hairlines over boxes

## Never
- Illustrative fluff
- Rounded card soup
- Marketing superlatives
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
