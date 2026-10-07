# Maison Vey — Refined Luxury Editorial Store

Maison Vey: A small perfume house making five scents by hand, each one a single place at a single hour. A store in the Luxury Editorial look: the Gala Night lettering (Bodoni Moda with Jost), the Oxblood Room palette, product leading and subtle motion. Primary goal: buy something.

Built from an OpusKit Universal Recipe (docs/recipe.md). Follow the rules in .cursor/rules. Build order: docs/implementation-plan.md.

Stack: Next.js (App Router), TypeScript, Tailwind CSS, Motion.

## How to work
- Build the complete site in one pass: every page, section and step in docs/implementation-plan.md, in order. Do not stop between steps to ask for review, confirmation or permission to continue.
- Start by writing a short plan (5–8 lines: visual direction, hero, motion, how desktop and mobile differ), then implement immediately — do not wait for approval.
- The code in `src/components/sections/` and `src/components/pieces/` is a reference, not a part to paste: it shows each part's design and does the hard work (layout, animation, shaders, reduced motion). Build every part as this site's own — keep its idea and behaviour, take its sizes, spacing, type and alignment from the site, and edit its code wherever its defaults disagree with what sits around it.
- After each step, check it against @visual-qa yourself and fix what fails before moving on.
- Before calling it done, look at every page at 1440px and 390px as a stranger would: whatever sits off the line its neighbours share, differs in size or width from things of its kind, or looks pasted in from another site is a defect — fix it where it comes from.
- Only stop to ask when truly blocked: a required file is missing and the recipe gives no temporary option, or two recipe rules contradict each other.
- When finished: run the production build, fix every build and runtime error, check desktop (1440px) and mobile (390px) in a real browser, start the dev server and reply with the localhost URL and any temporary assets still to replace.
