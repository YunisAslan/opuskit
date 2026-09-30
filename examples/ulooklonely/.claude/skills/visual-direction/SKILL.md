---
name: visual-direction
description: "Applies the \"ulooklonely — Film-inspired Portfolio\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — ulooklonely — Film-inspired Portfolio

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Special Gothic Expanded One (400, clamp(2.5rem, 7vw, 6rem), lh 0.95, ls -0.02em); heading = Special Gothic; body = Special Gothic 1.0625rem/1.55; utility = Special Gothic 0.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Bold outline: rounded-button / rounded-card / rounded-media and shadow-card tokens only. 2px ink borders on every module; hard offset shadow that collapses on press; no blur shadows.
7. Menu — Floating dock: A floating dock centred 20px from the bottom: 4–6 labelled icons for the main pages plus the action; the logo sits alone at the top-left.

## Principles
- Frame media like film
- Title cards between chapters
- Texture adds warmth

## Never
- Heavy vintage filters
- Fake film UI (sprocket holes)
- Cold, clinical palettes
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
