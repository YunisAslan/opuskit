# KOFİİ — Scandinavian Minimal Restaurant Site

KOFİİ: Promotion of a beautiful and charming coffee shop, showcasing its menus and products. A restaurant site with a scandinavian minimal direction: grid discipline typography, a celery room palette, video leading the experience and immersive motion. Primary goal: explore the work.

This project is built from an OpusKit Universal Recipe. The recipe is the source of truth for design decisions — do not invent new colors, fonts, spacing or sections.

## Where things are
- `recipe/` — the design recipe, split by topic (read the relevant file before working on that topic)
- `assets/manifest.json` — every asset, its status (have / temporary / create / find) and usage
- `build/implementation-plan.md` — build order
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
- Fonts: Zalando Sans (display), Zalando Sans (body), Zalando Sans (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Avoid: Pure white + pure black; Dramatic dark sections; Ornamental type.

## How to work
- Build the complete site in one pass: every page, section and step in `build/implementation-plan.md`, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (5–8 lines: visual direction, hero, the scroll-film scene map, motion, how desktop and mobile differ), then implement immediately — do not wait for approval.
- After each step, check it against the `visual-qa` skill yourself and fix what fails before moving on.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL and any temporary assets still to replace.

## Core direction
@recipe/design.md
