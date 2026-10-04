# Handoff — where the work is and how to continue

Last updated 2026-10-02. Read this first in a new session, on any computer. Then read, in order:
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
| C. Engine vibe | ✓ (below) |
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

### C — award-site vibe (done 2026-10-01)
- **Big idea** (Design, after Movement): `concepts` in `src/data/patterns.ts` — one-guide, giant-chapters, live-console,
  guided-walk, playful-way-in, loud-and-quiet. Engine: `resolveConcept` / `conceptChoices` (`engine.ts`), recommended until
  picked; `spec.concept` / `plan.concept` ('off' = none). Its first two signatures are placed on the recipe's sections.
- **9 new signatures** (`viaConcept: true`, end of `signaturePatterns`): giant-word chapters, pinned proof, travelling
  motif, entry gate, live status, scramble labels, guided stops, theme per variant, footer moment. Demos in `OptionDemo`.
- **Site pieces:** `curtain-transition` (PageCurtain), `preloader`, `smooth-scroll` (Lenis), `ambient-sound` (+ an
  `audio` asset row). New behaviour `transitions` ("Between pages") holds curtain + blob.
- **Build Package:** `recipe/design.md` = summary → Big Idea → direction → **award checklist** → why; CLAUDE.md names the
  big idea; `recipe/media.md` + performance skill get the **WebGL checklist** when a shader piece or 3D hero is used;
  visual QA checks the big idea. Recipe page shows it (tile + "Big idea" block).
- Page types Press / Integrations / Newsletter now start with their own new section.

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

0. **Next: new example sites #11–#15** (docs/plan-for-fit.md §11). The user supplies every video; Claude finds photos.
   State on 2026-10-03: all 10 examples have clips in the kit (site, section, effect, big-idea), section clips re-cut
   standing still (§2 decisions), the user's full recordings kept in `examples/{slug}/media-src/recording/`. Many
   section clips are a held frame — the "Re-recordings wanted" list in plan-for-fit says which. Kit changes that day:
   Pages right column rebuilt (Add a part | Edit tabs, whole card adds, changes scroll to the part and glow, effects
   tab first, "+ Effect" chip, real site ↔ your style `DualShot`), drawn `MenuDemo` / `LinkDemo`, each film/image part
   keeps its own pick (`setPartHero`, `heroBands`), Timeline section, Soft fade transition, footer links follow the
   Links behaviour (7 examples' footers + live exports updated). Uncommitted until the user asks.
   **#11 Inkwell & Moth** (2026-10-03): built (Prompt 1 by a subagent, no fix round) and registered (`/live/inkwell-moth`);
   clips open (the user records). Kit growth from it: `EntryGate`, `ChapterColours`, `Lightbox` pieces (a big-idea moment
   with a ready piece now ships it — `SignaturePattern.piece`).
   **#12 Kür Delta Watch** (2026-10-03/04): built (Prompt 1 by a subagent, no fix round) and registered
   (`/live/kur-delta-watch`); clips open. Kit fixes from it: a film band mid-page asks for its own film and ships
   prepare-video.sh; a seed's shop voice no longer reaches other kinds of site (`seedVoice`); UnderlineFill and SwapButton
   take the site's `link`; SplitFlap lint. Kit growth from it: the Donate section + Donate page type (nonprofits start with it).
   **#15 Sela Mor** (2026-10-04): built (Prompt 1 by a subagent, no fix round) and registered (`/live/sela-mor`); clips
   open. Film the user's (made black and white; a tiny blurred amp maker's name shows briefly); sound + six Listen tracks
   from Pixabay picked by Claude. Kit fixes: a scroll-scrubbed film band gets the scrub encode; AmbientSound/PageFade lint.
   Kit growth: the Listen section + page type. The user: Sela Mor is the bar for every site. Screen recordings for all new
   sites come at the very end.
   **#13 Night Shift** (2026-10-04): recipe approved, 8 Unsplash photos in, Build Package written and installed in
   `examples/night-shift/`; built (subagent, no fix round) and registered (`/live/night-shift`); clips open. Kit fix: asset
   keys never start with a digit (`asset3dModelOrScene`). Fix round 1: palette → Grading Suite (new in the kit; the user disliked Wet Slate). Kit growth: Curriculum section.
   The user: pick palettes by fit, previewed on a real page. 
   **#14 Aster House** (2026-10-04): recipe approved (palette Limestone, chosen by comparison), 15 Pexels photos in, Build
   Package in `examples/aster-house/`; built (subagent, no fix round) and registered (`/live/aster-house`); clips open.
   All five §11 sites are built. Open: Availability list (kit growth question); screen recordings of #11–#15 (the user,
   at the very end), then their clips.
   **Research round (2026-10-04, the user's ask):** the kit repeats itself (forms and everything else), palettes can feel
   dated, and the engine needs more variety and beauty — not more weight. Five research agents running, reports into
   `docs/research/2026-10-04-*.md`: repetition audit (every layer + the 15 built sites), Awwwards collections map,
   colour (palette audit + refreshed set), typography, use cases (per-kind anatomy + section variants). All five reports are in;
   the plan is `docs/plan-variety.md` (phases A–G). The user approved A–C ("Gettik A-B-C ilə"); **A, B and C are done**
   (2026-10-04, see the Progress table in plan-variety.md). Then the user asked for D–E–F before any new example
   ("yeni nümunələr hazırlamamışdan əvvəl"): **D, E and F are done** too, then G ("G-ni et və v2 versiya çıxaraq") —
   **all of A–G is done**. A Brasshand `-v2` rebuild showed the difference and was then deleted at the user's word.

1. **Example #2 Brasshand** — built and registered 2026-10-01 (`examples/brasshand/`, live at
   `/live/brasshand`). Open: clips (the user records them). (`cheeky911` and its kit photos were removed 2026-10-03.)
   (plan-for-fit §9 — needs the user's OK).
2. **Example #3 Hexmint** — built and registered 2026-10-02 (`/live/hexmint`); clips open. Fix round 1 (doubled 3D:
   the poster stayed under the transparent canvas) done, live export regenerated.
   Builds since Brasshand also fixed OpusKit itself: rules name roles not fonts/hex; ready sections ship no "→",
   middle dots or 01/02 markers; TextScramble/TextEffect accessibility + hydration.
3. **Example #4 Sticky Weather** — built and registered 2026-10-02 (`examples/sticky-weather/`, live at
   `/live/sticky-weather`); clips open. Kit fixes from it: no doubled word in composed titles ("Studio Studio Site"),
   Lenis in the stack when SmoothScroll ships, Sticker Studio's "serif" rule made pairing-neutral, TextEffect spaces.
   Open question for the user: Sticker Studio says "neutral page" but offers Bubblegum (a saturated pink ground).
4. **Example #5 Halvik** — built (Prompt 1 + two fix rounds: hero framed beside the headline on desktop, buy bar off
   Contact) and registered 2026-10-02 (`/live/halvik`); clips open. `keepers` removed; the kit's product world now uses
   Halvik's photos and copy, its founders two Unsplash portraits in `public/kit/people/` (credits `public/kit/SOURCES.md`).
5. **Example #6 Hane** (clinic) — built (Prompt 1, no fix round) and registered 2026-10-02 (`/live/hane`); clips open.
6. **Example #7 Fennwood** (restaurant) and **#8 Saint Ashe** (fashion) — built (Prompt 1 + one fix round each) and
   registered 2026-10-03 (`/live/fennwood`, `/live/saint-ashe`); clips open. `kofii` and `buytolose` removed; the kit's
   food and shop worlds now use their photos and copy. Kit fixes from them: `prepare-video.sh` steps the CRF up until the
   desktop film is ≤ 6 MB and the phone one ≤ 3 MB (it had shipped 8.6 MB); the headline behaviour's placement now says
   "the h1 plus at most two section headings", matching the pieces' own rules. Saint Ashe's film came from Pexels: its
   download link (`https://www.pexels.com/download/video/{id}/`) works from here, so Claude can fetch Pexels videos.
7. **Example #9 Velmira** (hotel) and **#10 Lowfield Nights** (event) — built in parallel (Prompt 1 + one fix round each)
   and registered 2026-10-03 (`/live/velmira`, `/live/lowfield-nights`); clips open. `swiss-modern-event-site-claude-code`
   removed (its untracked Pinterest source video went with the folder); the kit's event world now uses Lowfield's photos
   and copy. All ten plan sites are built. `cheeky911`, the last old example, was removed with the user's OK: the kit's studio world
   now uses Brasshand's photos and copy (a branding studio), the software world Hexmint's renders, the sticker orbit and
   piece demos Brasshand/Sticky Weather photos and Velmira's film. No old example is left.
   The Unsplash connector needed a new sign-in midway, so #9 and #10 use Pexels photos: plain curl gets a Cloudflare
   challenge, a headed Chrome (Playwright `headless: false`, a fresh browser per search) passes; originals download from
   `images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg`. Sound from Pixabay (its page HTML carries the mp3 link).
   Kit fixes from them: `prepare-video.sh` budget-fits every encode (desktop + scrub ≤ 6 MB, phone ≤ 3 MB, CRF up to 32;
   its helper no longer trips `set -e`); AmbientSound takes a `placement` (e.g. the menu bar) and clamps its fade volume;
   example zips leave sound files out like videos.
   Kit fix from it: ready sections can only import `react`, so FAQ's list and Reservation's form are now slots
   (`children` / `form`) the project fills with its own shadcn/ui Accordion and Calendar/Select form; check.ts fails if a
   ready section ships a native select, date/time/number input, checkbox, radio or `<details>`.
8. Put aside by the user (2026-10-01): D1–D2 WebGL pieces; Slow Atlas clips (recorded later by the user).

## Done so far (2026-10-01)

- Engine fixes after Brasshand (2026-10-01): **no GSAP guidance anywhere** — pinned/scrubbed patterns are Motion
  (`useScroll` + `useTransform`, `position: sticky`) or CSS; check.ts asserts no adapter output mentions GSAP. Seed rules
  and notes name colour roles, not hues; seed section notes (which name fonts) apply only with the seed's own lettering.
  Kit pieces fixed from the builds: PageCurtain (click replay, aria-label for TextRoll links), Magnetic, CutReveal,
  Preloader (hydration under reduced motion).

- **Example #1 Slow Atlas** (`examples/slow-atlas/`): built from the kit by Claude Code (prompts in its `BUILD-LOG.md`),
  photos from Unsplash (`media-src/SOURCES.md`), registered on `/examples`, live at `/live/slow-atlas`,
  old `ulooklonely` removed. Built before plan-vibe; may be rebuilt from its recipe after C.
- **Kit connection (plan-for-fit §8)**: `src/features/kit/closest.ts` picks the closest real site / section / menu /
  footer clip; `src/components/RealSiteClip.tsx` shows it in Design and Pages and on `/examples/{slug}`. Old examples
  carry `legacy: true` and are never offered. Clips from the user's own screen recording.
- Kit fixes: "Customise in kit" keeps the movement (`specToPlan` passes `motion`); `check.ts` covers both.

## Working agreements (from the user — they also live in Claude's local memory on the work computer only)

- **Site videos (films in a site):** the user picks them, from 2026-10-03 on. Claude writes what each film should show
  and waits for the files.
- **Recordings for clips:** the user screen-records the live site and drops it in `examples/{slug}/media-src/recording/`
  (committed, kept for re-cuts). Claude cuts with ffmpeg: never crops the site clip's frame; section clips stand still,
  framed on the section; small effects zoomed in (a still 16:9 crop, 2–4×); no pasted or patched frames.
  `still.py`-style analysis (frame-to-frame vertical shift) finds where the page stands still. No automated browser
  video (it dropped frames).
- **Example builds:** kit → Build Package → Claude Code, run in the user's terminal (`claude` in `examples/{slug}/`);
  a headless `claude -p --permission-mode bypassPermissions` from Claude's session is blocked by the safety check.
  Claude writes each prompt into `BUILD-LOG.md` first. With the user's OK, a fresh subagent may run a fix prompt.
  No hand-written code in examples.
- **Rebuilds** go in a fresh `examples/{slug}-v2/` beside the old build (deleting the old folder in place was blocked by
  the safety check); the swap into `examples/{slug}/` happens only with the user's OK. `scripts/build-package.ts` writes
  a spec's Claude Code package into a folder (the same files as the result page's Download).
- **Photos:** Unsplash connector (re-authorise in claude.ai connector settings when it drops; the account email had to be confirmed once), or Pexels. Download "Original", resize for
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

- Kit sample photos now all come from the ten plan sites (old examples removed 2026-10-03).
- Clips total ~10 MB; offered to re-encode ~40 % smaller.
