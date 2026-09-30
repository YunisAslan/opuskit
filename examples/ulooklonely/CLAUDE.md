# ulooklonely — Film-inspired Portfolio

ulooklonely: Its presentation of loneliness. A portfolio with a film-inspired direction: loud and clear typography, a studio aqua palette, video leading the experience and immersive motion. Primary goal: explore the work.

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
- Ready code: `src/components/sections/` (one component per content section) and `src/components/pieces/` (your kit) are the starting structure. Pass real copy and media through props; change proportions and spacing to fit the recipe; never restyle them outside the tokens.
- Avoid: Heavy vintage filters; Fake film UI (sprocket holes); Cold, clinical palettes.
- Video files must be prepared with `bash scripts/prepare-video.sh` before you touch any code. Never serve the raw upload — it is unoptimised, wrong shape, and missing the mobile and scroll variants. It sharpens a small source automatically (never pass `--no-upscale`); for people and real scenes use `--upscale footage`. Read its "Result:" line: desktop must be ≥ 1920 px wide and phone ≥ 1080 px tall. If it prints ⚠ instead, do not hide it — name it in your final reply as the one thing still to fix.

## How to work
- Build the complete site in one pass: every page, section and step in `build/implementation-plan.md`, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (5–8 lines: visual direction, hero, the scroll-film scene map, motion, how desktop and mobile differ), then implement immediately — do not wait for approval.
- After each step, check it against the `visual-qa` skill yourself and fix what fails before moving on.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL and any temporary assets still to replace.

## Core direction
@recipe/design.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
