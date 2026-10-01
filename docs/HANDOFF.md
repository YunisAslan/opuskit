# Handoff — where the work is and how to continue

Last updated 2026-10-01 (work computer). Read this first in a new session, on any computer. Then read, in order:
`AGENTS.md` → `docs/plan-vibe.md` (current work) → `docs/plan-for-fit.md` (example sites, waits for plan-vibe).
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Now (2026-10-01)

**Current plan: `docs/plan-vibe.md`** — real page anatomy, fresh style, award-site vibe, WebGL. Order A → B → C → D.

| Part | State |
|---|---|
| Research (4 reports) | ✓ `docs/research/2026-10-*.md` (home anatomy of ~150 sites, the user's 12 Awwwards sites, WebGL, palettes & fonts) |
| A. Style library | ✓ 11 palettes + 10 pairings in `src/data/ingredients.ts`, ids in `domain.ts`, added to looks in `taxonomy.ts`; `npm run check` ✓ |
| B1. 8 new sections | ✓ feature-rows, newsletter, categories, press, cta-band, trust, schedule, integrations — fully wired, in the kit's Add-to-page |
| B2. Each kind's home defaults | ✓ applied (table below); `check.ts` now asserts "filled, 6+ for long kinds" instead of "4+ everywhere" |
| C. Engine vibe | **next** |
| D1–D2. WebGL pieces (no new deps) | after C |
| D3. three.js / R3F 3D stage | deferred by the user |

### B1 — 8 new ready sections (done 2026-10-01)
`feature-rows`, `newsletter`, `categories`, `press`, `cta-band`, `trust`, `schedule`, `integrations`.
Each needs everything in AGENTS.md "Ready sections": `SectionId` (domain.ts), `sections` entry (patterns.ts), component
in `src/sections/` (tokens only, props, React only), `blocks.ts` entry, a sample per world in
`src/components/SectionPreview.tsx` (studio, food, shop, product, software, event), `section-guide.ts` look +
best-when, a job group in `sectionGroups` + page suggestions (`src/features/kit/plan.ts`), then `npm run pieces`.
Follow-ups noted by the agent that built them: page types Press / Integrations / Newsletter list the new section at
position 3+ of their suggestions (new pages of that type start with the first two) — consider moving it first; short
sections (trust, CTA band) look sparse in 16:10 thumbnails; some world photos don't fit their sample names.

### B2 — default home sections per kind (applied 2026-10-01 in `purposes[kind].pages`, `src/data/taxonomy.ts`)
Source: `docs/research/2026-10-home-anatomy.md`. The user agreed: real-world length, longer *and* shorter;
testimonials only where real sites use them. Seed recipes and the kit's starting pages both read these lists.

| Kind | Home sections |
|---|---|
| portfolio | hero, featured-work, contact-cta |
| agency | hero, manifesto, featured-work, services, clients, journal, contact-cta |
| studio | hero, featured-work, manifesto, journal, contact-cta |
| fashion | hero, collection, product-grid, journal, newsletter |
| restaurant | hero, intro, menu, reservation, location |
| ecommerce | hero, categories, product-grid, collection, editorial-story, testimonials, trust, newsletter |
| product | hero, product-highlight, feature-rows, press, testimonials, pricing, trust, contact-cta |
| saas | hero, clients, feature-rows, feature-grid, integrations, testimonials, contact-cta |
| personal-brand | hero, about, services, journal, clients, newsletter |
| experiment | hero, intro |
| other | hero, services, how-it-works, testimonials, trust, contact-cta |
| blog | hero, editorial-story, journal, categories, newsletter |
| event | hero, intro, schedule, team, location, faq, reservation |
| nonprofit | hero, manifesto, stats, services, editorial-story, cta-band, journal, newsletter |
| real-estate | hero, product-grid, categories, cta-band, journal, contact-cta |
| hotel | hero, intro, collection, feature-rows, journal, reservation |
| course | hero, intro, process, about, testimonials, pricing, faq, contact-cta |
| clinic | hero, services, how-it-works, team, testimonials, pricing, location, reservation |

Then `npm run check` (seed recipes are composed from these) and open a few kinds in `/kit` to see them.

## Next

1. **C — award-site vibe in the engine** (`docs/plan-vibe.md` C): a concept per recipe written into the Build Package's
   creative direction; new signatures from `docs/research/2026-10-awwwards.md` (giant-word chapter opener, pinned proof
   sequence, travelling motif, playful gate, live status line, scramble text, guided stops, theme per variant, footer as
   a moment); site-wide behaviours (preloader, page transitions, Lenis smooth scroll, optional sound + mute); an award
   checklist and the WebGL checklist (`docs/research/2026-10-webgl.md`) in the Build Package. No GSAP (licence).
2. **D1–D2 — WebGL pieces without new dependencies**: Paper Shaders (installed; 30 shaders, 2 used) — living gradient
   field, logo as material, moving photo filter; OpusKit-written raw WebGL2 — image hover distortion, liquid image
   transition, particles forming a word. Rules for pieces in AGENTS.md (tokens, reduced motion, react/motion/paper only).
3. Then **example #2 Agency** (`docs/plan-for-fit.md` §5–§6), using the new defaults and the row's "Fresh picks".

## Done so far (2026-10-01)

- **Example #1 Slow Atlas** (`examples/slow-atlas/`): built from the kit by Claude Code (prompts in its `BUILD-LOG.md`),
  photos from Unsplash (`media-src/SOURCES.md`), registered on `/examples`, live at `/live/slow-atlas/index.html`,
  old `ulooklonely` removed. Built before plan-vibe; may be rebuilt from its recipe after C.
- **Kit connection (plan-for-fit §8)**: `src/features/kit/closest.ts` picks the closest real site / section / menu /
  footer clip; `src/components/RealSiteClip.tsx` shows it in Design and Pages and on `/examples/{slug}`. Old examples
  carry `legacy: true` and are never offered. Clips from the user's own screen recording.
- Kit fixes: "Customise in kit" keeps the movement (`specToPlan` passes `motion`); `check.ts` covers both.

## Working agreements (from the user — they also live in Claude's local memory on the work computer only)

- **Videos:** the user screen-records sites (optionally framed with Screen Studio / Cap) and drops them in
  `examples/{slug}/media-src/recordings/` (git-ignored). Claude cuts clips with ffmpeg, removes anything private
  (autofill popups, other windows), never crops to a fixed box (show at the clip's own aspect). Kit panels unframed;
  framed versions for `/examples/{slug}` and the home page. No automated browser video (it dropped frames).
- **Example builds:** kit → Build Package → Claude Code, run in the user's terminal (`claude` in `examples/{slug}/`);
  a headless `claude -p --permission-mode bypassPermissions` from Claude's session is blocked by the safety check.
  Claude writes each prompt into `BUILD-LOG.md` first. With the user's OK, a fresh subagent may run a fix prompt.
  No hand-written code in examples.
- **Media:** Unsplash connector works (the account email had to be confirmed). Download "Original", resize for
  `public/media/` (≤ 2400 px long side), originals stay in `media-src/`, sources in `SOURCES.md`.
- Use the design skills (gsap/threejs/motion-design/design-dna) only when relevant; animejs.com is a reference.

## Environment notes

- Dev servers used here: OpusKit on `:3001`, an example's own dev server on `:3000`.
- Playwright was used from an npx cache path that exists only on the work computer. Elsewhere:
  `npx -y playwright install chromium` once, then require `playwright` from a scratch folder.
- Before the first `npm install`/build inside any example, check its `next.config.ts` has the `turbopack.root` pin
  (AGENTS.md) — without it a build can wipe OpusKit's own `node_modules`.
- Live export steps: AGENTS.md "Showing one on the site".

## Open questions for the user

- Rebuild Slow Atlas after C so it shows the new vibe?
- Kit sample photos for some worlds are still old-example photos (`SectionPreview.tsx`): Porsches (cheeky911) in the
  studio/software worlds and the real **Keepers** can (a real drink brand) in the product world — now also in the new
  feature-rows sample. §9 of plan-for-fit replaces them as examples #4/#5/#7/#8/#10 land; the blog/editorial world could
  use Slow Atlas photos now.
- Clips total ~10 MB; offered to re-encode ~40 % smaller.
