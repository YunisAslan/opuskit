---
name: visual-direction
description: "Applies the \"Hexmint — Digital Futurism Software Site\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Hexmint — Digital Futurism Software Site

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Funnel Display (700, clamp(3rem, 8vw, 7rem), lh 0.92, ls -0.035em); heading = Funnel Display; body = Funnel Sans 1.0625rem/1.55; utility = Funnel Sans 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Round: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Large radii on cards and media; nested elements use radius − padding.
7. Menu — Floating pill: A centred, rounded capsule (max 720px) floating 16px from the top: logo, links, one action; translucent surface with backdrop blur.

## Principles
- Technical, not sci-fi costume
- Depth through lighting, not glow effects
- Data and specs are design material
- One luminous accent, used as a signal

## Never
- Purple-blue AI gradients
- Neon glow and lens flares
- Fake terminal typing animations
- Vague "the future of…" copy
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
