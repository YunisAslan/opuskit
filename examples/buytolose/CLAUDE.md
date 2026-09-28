# BUYTOLOSE — Gothic Modern Store

BUYTOLOSE: This is a site that sells various products. A store with a gothic modern direction: round future typography, a pool tile palette, video leading the experience and immersive motion. Primary goal: buy something.

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
- Lenis
- GSAP + ScrollTrigger

## Non-negotiables
- Use tokens from `src/styles/tokens.css`; never raw hex in components.
- Fonts: Unbounded (display), Onest (body), Onest (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Avoid: Blackletter for paragraphs; Bright pastel accents; Cute illustrations.

## Core direction
@recipe/design.md
