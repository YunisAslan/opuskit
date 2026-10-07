# Maison Vey — Refined Luxury Editorial Store

Maison Vey: A small perfume house making five scents by hand, each one a single place at a single hour. A store in the Luxury Editorial look: the Gala Night lettering (Bodoni Moda with Jost), the Oxblood Room palette, product leading and subtle motion. Primary goal: buy something.

This project is built from an OpusKit Universal Recipe. The recipe is the source of truth for design decisions — do not invent new colors, fonts, spacing or sections.

## Where things are
- `recipe/` — the design recipe, split by topic (read the relevant file before working on that topic)
- `assets/manifest.json` — every asset, its status (have / temporary / create / find) and usage
- `build/implementation-plan.md` — build order
- `build/verification.md` — definition of done
- `.claude/skills/` — visual-direction, responsive-design, visual-qa, motion-system, media-experience, ui-components

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion

## Non-negotiables
- Use tokens from `src/styles/tokens.css`; never raw hex in components.
- Fonts: Bodoni Moda (display), Jost (body), Jost (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Reference code: `src/components/sections/` (one component per content section) and `src/components/pieces/` (your kit) show each part's design and do the hard work. Start from them, then make them this site's own: real copy and media through props, sizes, spacing, type and alignment taken from the site, the code edited wherever it disagrees — tokens only. The site must read as one design, never parts pasted side by side.
- Avoid: Discount-style badges; Gold gradients; Crowded product grids.

## How to work
- Build the complete site in one pass: every page, section and step in `build/implementation-plan.md`, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (5–8 lines: visual direction, hero, motion, how desktop and mobile differ), then implement immediately — do not wait for approval.
- The code in `src/components/sections/` and `src/components/pieces/` is a reference, not a part to paste: it shows each part's design and does the hard work (layout, animation, shaders, reduced motion). Build every part as this site's own — keep its idea and behaviour, take its sizes, spacing, type and alignment from the site, and edit its code wherever its defaults disagree with what sits around it.
- After each step, check it against the `visual-qa` skill yourself and fix what fails before moving on.
- Before calling it done, look at every page at 1440px and 390px as a stranger would: whatever sits off the line its neighbours share, differs in size or width from things of its kind, or looks pasted in from another site is a defect — fix it where it comes from.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL and any temporary assets still to replace.

## Core direction
@recipe/design.md
