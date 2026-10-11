---
name: visual-direction
description: "Applies the \"Ines Varga — Raw Conceptual Sketch Portfolio\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Ines Varga — Raw Conceptual Sketch Portfolio

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Caveat Brush (400, clamp(3rem, 9vw, 7.5rem), lh 0.95, ls 0); heading = Caveat; body = Winky Sans 1.1875rem/1.55; utility = Winky Sans 0.02em.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.
6. Shape — Hairline: rounded-button / rounded-card / rounded-media and shadow-card tokens only. Buttons and cards are outlined, not filled (except the one primary action); 1px borders in the border token.
7. Menu — Full-screen menu: Minimal bar: logo and a “Menu” label only. The menu is a full-viewport panel with display-size links, one per line, plus contact details.

## Principles
- Show the thinking
- Hand lines, clean page
- Annotations guide the eye

## Never
- Sketch texture under body text
- Clip-art doodles
- Too many annotation colours
- A cream or beige page ground with a clay/terracotta accent
- A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black
- Small uppercase, letter-spaced monospace labels above every heading
- Numbered markers (01 / 02) on content that is not a real sequence
- Meta strings joined with middle dots or spaced em dashes, and "→" appended to links
- One italic or coloured accent word inside an otherwise plain headline
- Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts
- Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block
- Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit
- A small label in tracked capitals, or a chip, above the hero headline (an eyebrow); the headline stands alone
- A coloured stripe down one side of a card, alert or list item (a pull quote's rule is fine); a card in a card; a grid of same-size icon tiles as the page's structure
- A hairline border under a wide soft shadow (a ghost card), a zero-offset coloured glow, gradient-filled text
- A pulsing dot or blinking caret pretending something is live, and a strip that scrolls forever when nobody picked one
- Copy in a manufactured cadence: "Not a X. A Y.", "X. No Y.", "X. Just Y." — more than one on a site — or an em dash in every other sentence

## Self-check before finishing a component
- Does it use tokens only?
- Is there exactly one visual priority?
- Would it still look intentional in grayscale?
