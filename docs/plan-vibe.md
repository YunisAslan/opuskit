# Plan — real page anatomy, fresh style, award-site vibe

Started 2026-10-01. Comes before the next example site (docs/plan-for-fit.md #2). Everything here is used by examples #2–#10 (docs/plan-for-fit.md §2, §5 "Fresh picks"). Read this before touching section
defaults, the style library, signatures, pieces or the Build Package's creative direction; keep **Progress** current.

Research behind it (summaries, with sources): `docs/research/2026-10-*.md` —
home anatomy (~150 live home pages), the user's 12 Awwwards sites, WebGL, palettes & fonts (+ ready candidates).

## 1. What the research says

- **Home pages are not uniformly too short.** Real length depends on the kind of site. OpusKit gives every kind 5–8.
  - Longer in reality (7–12): SaaS, product, e-commerce, clinic, nonprofit, real estate, course; magazines 10–15.
  - Shorter in reality: portfolio (median 2), experiment (0–3), restaurant / studio / fashion (2–6).
  - Testimonials are on 13 of 18 defaults but on 0 of 42 portfolio/agency/studio/restaurant/hotel/fashion/blog/
    real-estate home pages. SaaS home pages rarely show pricing (1/14) or FAQ (2/14).
- **Section types that real sites use and OpusKit lacks**, by share of home pages: newsletter ~33%, categories ~29%,
  feature rows ~23% (21 of 22 SaaS/product), press & awards ~20%, mid-page CTA band ~18%, trust strip ~10%,
  featured story ~7%, schedule ~6%, integrations ~6%, offers ~5%, ways to help ~4%, curriculum ~3%.
- **Award sites** (the 12): ~10 sections on long-scroll pages, built around one idea — a hero object that guides the
  scroll, giant-word chapter openers, a pinned proof sequence, a playful gate, a footer that is a moment. They use
  preloaders (7/12), pinned scrubbed sequences (8/12), split-text reveals (7/12), sound (5/12), WebGL (7/12, but only
  2 are full 3D worlds). GSAP is on 10/12 — OpusKit can't use it (licence); Motion covers the same effects.
- **WebGL:** most of the look is reachable **without new dependencies** — Paper Shaders (installed, 30 shaders, 2 used)
  and OpusKit-written raw WebGL2. Only a real 3D model stage needs three.js + react-three-fiber (MIT): a rule change.
- **Style:** 11 palettes + 11 pairings, all passing `check.ts` together with the library, Google Fonts OFL and in
  `next/font` (`docs/research/2026-10-style-candidates.ts.txt`).

## 2. The work, in order

### A. Style library (small, ready)
1. Add the 11 palettes and 10 pairings from the candidates file (drop or rework `newsprint-1918` — Instrument Sans is the
   sister of a banned font) to `ingredients.ts`, their ids to `domain.ts`, and each to the looks the research lists.
2. `npm run check` — must stay green.

### B. Real page anatomy
1. **New sections** (each a ready component in `src/sections/` with a sample per world, a plain look + best-when, a job
   group — the AGENTS.md checklist), most used first:
   `feature-rows`, `newsletter`, `categories`, `press`, `cta-band`, `trust`, `schedule`, `integrations`.
   Better as looks of existing sections: featured story (journal), offers (pricing), curriculum (process),
   ways to help (services), multi-location (location), model comparison (pricing), booking bar (reservation).
2. **Defaults per kind** (`purposes[].pages` home): the research's recommended lists — longer where reality is longer,
   shorter where it is shorter, testimonials only where real sites use them.
3. Later: inner page types that are thin (case study, article, donate, specs, curriculum, schedule).

### C. Award-site vibe in the engine
1. **A concept per recipe.** The engine writes one big idea into the recipe and the Build Package's creative direction:
   the guiding motif (hero object or line that travels down the page), how chapters open (giant word), the one
   unforgettable moment, and how the site ends (footer as a moment). Chosen from the look, kind of site and brief.
2. **New signatures** from the award patterns: giant-word chapter opener, pinned proof sequence (one item at a time),
   travelling motif, playful entry gate, live status line, scramble text (console chrome), guided stops with info
   cards, theme per variant, giant-logotype / game footer. (Stacking cards, reveal footer, curtain already exist.)
3. **Site-wide behaviours:** designed preloader, page transitions, smooth scroll (Lenis, MIT), optional ambient sound
   with a clear mute.
4. **Build Package guidance:** an "award checklist" (one idea, one moment per page, type scale contrast, motion
   choreography, mobile as its own composition) and the WebGL checklist from the research.

### D. WebGL pieces
1. No rule change (Paper Shaders): living gradient field, logo as material (liquid metal / heat / smoke),
   photo filter that moves (water, fluted glass, lens, halftone).
2. No rule change (OpusKit-written raw WebGL2): image hover distortion, liquid image transition, particles forming a
   logo or word, ASCII/dither over video.
3. **Needs a rule change (user decision):** 3D model stage on three.js + @react-three/fiber + drei (MIT); ink/fluid
   cursor adapted from WebGL-Fluid-Simulation (MIT). Never: Spline/Unicorn runtimes, LYGIA, Theatre Studio.

## 3. Decisions

- **2026-10-01:** Research first, then changes "only where something is really missing" (user).
- **2026-10-01:** Each kind of site gets its real-world length — longer *and* shorter (portfolio 3, restaurant 5…); testimonials only where real sites use them (user).
- **2026-10-01:** No three.js / R3F rule change for now: WebGL without new dependencies first (D1–D2); D3 later (user).
- **2026-10-01:** Order A → B → C → D, check + browser after each (user).

## 4. Progress

| Part | State |
|---|---|
| Research (4 reports) | ✓ 2026-10-01 — `docs/research/` |
| A. Style library | ✓ 2026-10-01: 11 palettes + 10 pairings (newsprint-1918 dropped), added to their looks; check ✓ |
| B1. New sections | ✓ 2026-10-01: 8 sections, fully wired (AGENTS.md checklist) |
| B2. Defaults per kind | ✓ 2026-10-01: all 18 kinds (docs/HANDOFF.md table); check asserts filled + 6+ for long kinds |
| C. Engine vibe | – |
| D1–D2. WebGL pieces (no rule change) | – |
| D3. 3D stage (rule change) | deferred (user, 2026-10-01) |
