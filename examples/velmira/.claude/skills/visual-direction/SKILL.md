---
name: visual-direction
description: "Applies the \"Velmira — Ethereal Hotel Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Velmira — Ethereal Hotel Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Kalnia (300, clamp(3rem, 8.5vw, 7.75rem), lh 0.95, ls -0.02em); heading = Kalnia; body = SUSE 1.0625rem/1.6; utility = SUSE 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Frosted glass: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Cards, menu and dialogs are frosted glass: background at 15–30% opacity of the surface token, backdrop-filter: blur(16px), a 1px border at 20% white. Only over a vivid colour or photo — on a flat page it reads as grey. Body text stays on solid surfaces (4.5:1).
7. Menu — Centered logo: Symmetric bar: links left, logo centred, secondary links and the action right; generous height at the top that shrinks after scrolling.

## Principles
- Light over colour
- Nothing heavy, nothing hard
- Slow, floating motion

## Never
- Low-contrast text on pale glows
- Hard shadows
- Busy imagery
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
