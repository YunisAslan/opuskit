# Hane — Japanese Minimal Practice

Hane: A small physiotherapy and slow-movement studio — hands-on treatment, then exercises you can keep doing at home. A practice with a japanese minimal direction: private collection typography, a pink plaster palette, photography leading the experience and subtle motion. Primary goal: book or reserve.

This project is built from an OpusKit Universal Recipe. The recipe is the source of truth for design decisions — do not invent new colors, fonts, spacing or sections.

## Where things are
- `recipe/` — the design recipe, split by topic (read the relevant file before working on that topic)
- `assets/manifest.json` — every asset, its status (have / temporary / create / find) and usage
- `build/implementation-plan.md` — build order
- `build/verification.md` — definition of done
- `.claude/skills/` — visual-direction, responsive-design, visual-qa, motion-system, media-experience, ui-components

## The big idea — A walk through named stops
Scrolling moves visitors from place to place, each with a small card. Read it in `recipe/design.md` (“The Big Idea”) before building anything: every page serves it, and `recipe/design.md` ends with the award checklist every page must pass.

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion

## Non-negotiables
- Use tokens from `src/styles/tokens.css`; never raw hex in components.
- Fonts: Bellefair (display), Red Hat Text (body), Red Hat Display (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Ready code: `src/components/sections/` (one component per content section) and `src/components/pieces/` (your kit) are the starting structure. Pass real copy and media through props; change proportions and spacing to fit the recipe; never restyle them outside the tokens.
- Avoid: Card grids and boxed UI; Saturated accents or more than one accent; Motion that loops or bounces; Stock "zen" clichés (stones, bamboo, enso brush strokes).

## How to work
- Build the complete site in one pass: every page, section and step in `build/implementation-plan.md`, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (5–8 lines: visual direction, hero, motion, how desktop and mobile differ), then implement immediately — do not wait for approval.
- After each step, check it against the `visual-qa` skill yourself and fix what fails before moving on.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL and any temporary assets still to replace.

## Core direction
@recipe/design.md
