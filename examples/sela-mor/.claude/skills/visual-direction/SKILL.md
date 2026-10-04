---
name: visual-direction
description: "Applies the \"Sela Mor — Monochrome Minimal Personal Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Sela Mor — Monochrome Minimal Personal Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Mona Sans (800, clamp(2.75rem, 7vw, 6.5rem), lh 0.95, ls -0.03em); heading = Mona Sans; body = Mona Sans 1rem/1.55; utility = Martian Mono 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Hairline: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.
7. Menu — Split pill: Three separate pieces at the top edge: signature logo left, a compact white pill of 3–4 uppercase links centred, and one boxed action with a status dot (● Contact) right. No bar behind them.

## Principles
- Contrast and scale carry all hierarchy
- Color only inside media
- Rhythm through repetition

## Never
- Accent colors on UI
- Gradients
- Too many type sizes
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
