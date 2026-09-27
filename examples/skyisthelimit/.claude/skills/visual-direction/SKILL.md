---
name: visual-direction
description: "Applies the \"Future Art Direction Experiment\" visual direction: palette tokens, typography roles, spacing scale and hierarchy rules. Use when creating or restyling any page, section or component."
---

# Visual direction — Future Art Direction Experiment

Read `recipe/design.md`, `recipe/color.md` and `recipe/typography.md` before writing UI.

## How to apply
1. Use only the CSS variables in `src/styles/tokens.css` — never raw hex values in components.
2. Typography roles: display = Syne (700, clamp(3rem, 9vw, 9rem), lh 0.9, ls -0.03em); heading = Syne; body = DM Sans 1rem/1.6; utility = DM Mono uppercase 0.04em.
3. Spacing: only values from the 8px scale in `recipe/layout.md`. Space between sections > space within sections.
4. One focal point per viewport. If two elements compete, reduce one.
5. Accent color is a signal: active state, one highlight per view.

## Principles
- Every section is composed, never templated
- Break the grid on purpose, keep one anchor per section
- Transitions are part of the concept
- One surprising interaction per page, not ten

## Never
- Random effects without a concept
- Unreadable text over images
- Custom cursors that hide the real cursor
- Scroll hijacking

## Self-check before finishing a component
- Does it use tokens only?
- Is there exactly one visual priority?
- Would it still look intentional in grayscale?
