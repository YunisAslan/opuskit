# Ninth Row — Nocturne Film-inspired Event Site

Ninth Row: A 120-seat arthouse cinema: new and old films every night, a late-night series on Fridays, tickets for every screening. An event site in the Film-inspired look: the Tall Order lettering (Sofia Sans Extra Condensed with Sofia Sans), the Grading Suite palette, video leading and immersive motion. Primary goal: book or reserve.

This project is built from an OpusKit Universal Recipe. The recipe fixes what the owner chose — colours, lettering, pages and their parts, each part's design, the facts in the copy, the media — and keep those exactly. Everything between and around them is yours to design, and expected: read `recipe/design.md` → Room to invent and What this style is known for before you plan. A safe, literal build is not the goal; a site the owner recognises and is surprised by is.

## Where things are
- `recipe/` — the design recipe, split by topic (read the relevant file before working on that topic)
- `assets/manifest.json` — every asset, its status (have / temporary / create / find) and usage
- `build/implementation-plan.md` — build order
- `build/verification.md` — definition of done
- `.claude/skills/` — visual-direction, responsive-design, visual-qa, motion-system, media-experience, interaction-craft, ui-components, performance

## Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Motion
- Lenis

## Non-negotiables
- Use tokens from `src/styles/tokens.css`; never raw hex in components.
- Fonts: Sofia Sans Extra Condensed (display), Sofia Sans (body), Sofia Sans Condensed (utility). Load with next/font.
- All media goes through `src/config/assets.ts`. Temporary assets stay replaceable.
- Every animation has a reduced-motion alternative.
- Every control answers the press, every hover waits for a pointer that can hover, and nothing moves without a purpose (the `interaction-craft` skill).
- Reference code: `src/components/sections/` (one component per content section) and \`src/components/pieces/\` (your kit) show each part's design and do the hard work. Start from them, then make them this site's own: real copy and media through props, sizes, spacing, type and alignment taken from the site, the code edited wherever it disagrees — tokens only. The site must read as one design, never parts pasted side by side.
- Avoid: Heavy vintage filters; Fake film UI (sprocket holes); Cold, clinical palettes.
- Video files must be prepared with `bash scripts/prepare-video.sh` before you touch any code. Never serve the raw upload — it is unoptimised, wrong shape, and missing the mobile and scroll variants. It sharpens a small source automatically (never pass `--no-upscale`); for people and real scenes use `--upscale footage`. Read its "Result:" line: desktop must be ≥ 1920 px wide and phone ≥ 1080 px tall. If it prints ⚠ instead, do not hide it — name it in your final reply as the one thing still to fix.

## How to work
- Build the complete site in one pass: every page, section and step in `build/implementation-plan.md`, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (6–10 lines: visual direction, hero, the scroll-film scene map, motion, how desktop and mobile differ, and the moment you will design for each page — Room to invent), then implement immediately — do not wait for approval.
- The code in `src/components/sections/` and \`src/components/pieces/\` is a reference, not a part to paste: it shows each part's design and does the hard work (layout, animation, shaders, reduced motion). Build every part as this site's own — keep its idea and behaviour, take its sizes, spacing, type and alignment from the site, and edit its code wherever its defaults disagree with what sits around it.
- After each step, check it against the `visual-qa` skill yourself and fix what fails before moving on.
- Before calling it done, look at every page at 1440px and 390px as a stranger would: whatever sits off the line its neighbours share, differs in size or width from things of its kind, or looks pasted in from another site is a defect — fix it where it comes from.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL, the moments and details you invented (one line each, with the page), and any temporary assets still to replace.

## Core direction
@recipe/design.md
