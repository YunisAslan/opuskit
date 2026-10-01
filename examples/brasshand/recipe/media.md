## Media Direction — Typography-led

Type is the image. Media is optional and used sparingly as punctuation.

### Treatment
- Set headlines manually — control every line break
- Limit to one display family
- Use scale contrast (at least 4:1 display/body)
- Images, if any, small and captioned

**Formats:** WOFF2 via next/font with display: swap; subset to used characters for display faces

### Hero — Kinetic type hero
- **Composition:** Oversized words that move with scroll: horizontal drift, weight or width shifts on a variable font, line-by-line masking.
- **Behavior:** Scroll-linked transforms (translateX, font-variation-settings) via ScrollTrigger scrub; one idea per screen.
- **Responsive:** Mobile: reduce to vertical line reveals; avoid horizontal scroll overflow.
- **Requires:** Variable display font (weight/width axis); Short headline copy
- **Fallback:** Static typographic statement.

## Asset Checklist — What you'll need

| Status | Asset | Quantity | Level | Usage | Specs |
|---|---|---|---|---|---|
| ✎ Create it | Logo | 1 set | required | Navigation, footer, favicon | SVG; dark and light versions; square symbol for favicon |
| ⌕ Find it | Typefaces | 2 families | required | All text | Bayon, Reddit Sans (Google Fonts) |
| ✎ Create it | Final copy | All sections | required | Headlines, body, CTAs | Written in the recipe voice before layout; headlines ≤ 8 words |
| ✎ Create it | Final headline copy | 5–8 statements | required | Hero and section statements | Short: 3–8 words each; written before layout |
| ○ Optional | Punctuation images | 2–4 images | optional | Between type sections | High contrast, simple subjects |
