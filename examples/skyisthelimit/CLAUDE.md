# Future Art Direction Experiment

A experiment with a art direction direction: experimental typography, a high contrast palette, 3d leading the experience and dynamic motion.

This project is built from an OpusKit Universal Recipe. The recipe is the source of truth for design decisions — do not invent new colors, fonts, spacing or sections.

## Where things are
- `recipe/` — the design recipe, split by topic (read the relevant file before working on that topic)
- `assets/manifest.json` — every asset, its status (have / temporary / create / find) and usage
- `build/implementation-plan.md` — build order; work through it step by step
- `build/verification.md` — definition of done
- `.claude/skills/` — visual-direction, responsive-design, visual-qa, motion-system, media-experience, performance

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion
- React Three Fiber + drei

## Non-negotiables
- Use tokens from `src/styles/tokens.css`; never raw hex in components.
- Fonts: Syne (display), DM Sans (body), DM Mono (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Avoid: Random effects without a concept; Unreadable text over images; Custom cursors that hide the real cursor; Scroll hijacking.

## Core direction
@recipe/design.md
