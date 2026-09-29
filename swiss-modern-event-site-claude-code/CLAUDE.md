# RALPH&LAUREN — Swiss Modern Event Site

A event site with a swiss modern direction: loud and clear typography, a signal white palette, video leading the experience and immersive motion. Primary goal: book or reserve.

This project is built from an OpusKit Universal Recipe. The recipe is the source of truth for design decisions — do not invent new colors, fonts, spacing or sections.

## Where things are
- `recipe/` — the design recipe, split by topic (read the relevant file before working on that topic)
- `assets/manifest.json` — every asset, its status (have / temporary / create / find) and usage
- `build/implementation-plan.md` — build order
- `build/verification.md` — definition of done
- `.claude/skills/` — visual-direction, responsive-design, visual-qa, motion-system, media-experience, ui-components, performance

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion
- Lenis
- GSAP + ScrollTrigger

## Non-negotiables
- Use tokens from `src/styles/tokens.css`; never raw hex in components.
- Fonts: Special Gothic Expanded One (display), Special Gothic (body), Special Gothic (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Avoid: Rounded corners and soft shadows; Centred text; Decorative imagery; Motion that doesn't explain anything.
- Video files must be prepared with `bash scripts/prepare-video.sh` before you touch any code. Never serve the raw upload — it is unoptimised, wrong shape, and missing the mobile and scroll variants. Add `--upscale footage` (people, real scenes) or `--upscale cgi` (product, 3D) if the source is under 1920 px wide.

## How to work
- Build the complete site in one pass: every page, section and step in `build/implementation-plan.md`, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (5–8 lines: visual direction, hero, the scroll-film scene map, motion, how desktop and mobile differ), then implement immediately — do not wait for approval.
- After each step, check it against the `visual-qa` skill yourself and fix what fails before moving on.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL and any temporary assets still to replace.

## Core direction
@recipe/design.md
