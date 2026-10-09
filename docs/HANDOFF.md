# Handoff — where the work is and how to continue

Last updated 2026-10-08. Read this first in a new session, on any computer. Then `AGENTS.md` → `docs/plan-library.md`.
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Night run (2026-10-09 — `night/2026-10-09`, merged; its open items were finished the same day, see Today)

- **#23 Kelp Line built** by the night run — Nonprofit / cause · Coastal Calm · Bottle Green · Letterpress Modern ·
  subtle, through the flow, isolated `claude -p`, live at `/live/kelp-line` **with temporary pictures**: the cloud
  blocks Unsplash downloads, so the 21 photos are picked (`examples/kelp-line/media-src/`) and `fetch.sh` + Prompt 3
  wait for the morning. Recipe not approved yet (link in its BUILD-LOG). Engine lessons fixed: one picture per page for
  a story told on several pages, the favicon is a file (not a generated route), the UI table lists a page once.
  Open: a taken Schedule lands on Contact on a cause (judgement).
- **#24 Pip & Kiln built** by the same night run — E-commerce · Playful Pop · Butter Yellow · Bubble Pop · dynamic, a
  whole shop (grid, six product pages, bag, cart, checkout, sold out) plus a Workshops page from the sentence; live at
  `/live/pip-kiln` with temporary pictures (photos picked, `fetch.sh`). Engine lessons fixed before it was built: a
  workshops page from the sentence can be booked (Schedule, Pricing, Reservation); a taken effect no part can carry
  brings its part instead of vanishing. Per-product photo sets are the owner's shoot.
- **Queue:** #25 Ninth Row was built on 2026-10-09 with the user's film (see Today); the night run proposed #26–#29 (`docs/plan-examples.md` §5c) —
  approve or change them before the next night run.

## Today (2026-10-09, on the user's machine — committed and pushed)

- **Kelp Line and Pip & Kiln finished**: their picked photos fetched here (the cloud could not), fitted with Python PIL,
  Pip & Kiln's six plate photos re-picked (no clean 2:3); each site's photo prompt sent to a **new** isolated session
  (the night run's cloud session cannot be resumed here) with two added fixes; live exports, cards and posters rebuilt.
- **Whole letters and the pointer on every button** (decision 53): tokens.css, the craft guide, the definition of done,
  the line-reveal pattern and the pieces; a hover never reveals a placeholder over a real picture.
- **#25 Ninth Row built** — the user's own film (Google Flow) on a scroll-controlled first screen, Film-inspired ·
  Grading Suite · Tall Order, live at `/live/ninth-row`. Engine lessons: a cinema is an event venue with its own start
  and "Book tickets" (decision 54); a taken menu/footer survives a new look, verification's footer matches the layout,
  shot wording by kind, invented content never real films or people (decision 55).
- Port 3000 is often taken by the user's other project; run OpusKit's dev server on 3001 when it is.

## Before (2026-10-08 — committed and pushed; 2026-10-07's flow is in `e7e0220`)

- **#22 Raster School built** — the first still site (Swiss Modern · Klein Field), the first package with Interaction
  craft and Seasoning, isolated `claude -p`, 5 Unsplash photos, live at `/live/raster-school`. Its Engine lessons (7, all
  fixed or answered) are in `examples/raster-school/BUILD-LOG.md`: still reachable through the flow, the sentence
  reader's "online", parts gathering on Home (decision 52), tabular figures, no pill menu on square sites, and the
  `-p` session waiting on its dev server. Open: a course is drawn in the software sample world (`worldFor`).
- **Interaction craft** (decision 50, not committed): Emil Kowalski's skills (MIT) adapted into every Build Package —
  motion tokens in tokens.css, an `interaction-craft` skill / Cursor rule (press, popovers, curves and times, reduced
  motion, phones, worst-case content), craft lines in verification; `src/features/build-packages/craft.ts`. Next: see
  it in the next example build; OpusKit's own UI could follow the same rules (ask first).
- **Signature parts only** (decision 52): a site's + offers only parts that carry its design (`SIGNATURE_PARTS`); FAQ,
  pricing, booking, address… come from the kind of site, and a taken part never replaces them (check.ts).
- **Brand poster and no /examples** (2026-10-08): Your brand is a poster (`BrandCard`, `BrandSheetMini` — Direction,
  recipe page, Saved, the landing; `docs/design.md`); the `/examples` pages are gone — every built site's page is
  `/library/sites/example/{slug}` (redirects in `next.config.ts`); the header's theme switch moves into the phone menu.
- **Seasoning** (decision 51, not committed): smooth loaders, micro-interactions (a small set per look family) and
  parallax by motion-level dose — "salt, not sauce" — in every recipe; all five tools now get the craft guide.
- **Direction reworked, Pages retired** (decision 39): Make it yours on top, three small ready packs under it (taken-by-name
  qualities in all three; looks differ in family and layout); no pages list (the user: not needed, keep packs plain). `/studio/pages` is gone (redirects to
  Direction); pages come from the kind of site and the sentence (`pagesFromWords`). Previews use the owner's sentence,
  menu and main action. You lost its A/B/C letters and "Read from your sentence"; inputs got side padding.
- **Direction shows the brand, not the site** (decision 40): Your brand card (exact type and colours) beside the
  picker (Inspired by was dropped, decision 43); no full-size site mock. You's offer pick now sticks (`Collection.offer`).
- **Ready packs removed from Direction** (decision 42); the start is `directionsFor`'s first mix. Hover on a look
  plays a clip of a site built in it (8 looks have one).
- **Looks shown by mood photos** (decision 41): 41 Unsplash photos in `src/data/look-images.ts` (check.ts asserts one
  per look); a grid icon with a count opens `LookSites` (sites made in that look). Steps bar redesigned (ruled cells,
  fixed widths, any step open except one with nothing yet; `docs/design.md`).
- **#19 Low Hum built** — the first example made through the new flow (Library → You → Direction → Recipe), built by an
  isolated `claude -p` session, 11 Unsplash photos, registered and live at `/live/low-hum` (`examples/low-hum/BUILD-LOG.md`).
  The walk-through fixed: stale "three directions / three ways" copy everywhere; Direction's "From …" line names every
  taken part (`takenFrom`); a taken part that replaced one never lands below the page's booking (`CLOSING` + move,
  check.ts); the recipe preview speaks in the owner's words (`previewFromRecipe` reads the brief).
- **Brand screen removed** (decision 44): `/studio/open`, Saved's Continue and the recipe's "Change the look" open
  Direction with the recipe kept as built ("Opened from Low Hum"); `/studio/brand` redirects.
- **#21 Pale Hour built** — a photography gallery and bookshop (Art Editorial), through the flow, isolated `claude -p`,
  23 Unsplash photos, live at `/live/pale-hour` (`examples/pale-hour/BUILD-LOG.md`). Making it fixed galleries
  (decision 46) and taught the package a rule: never a hand-written `/_next/image` address (static export).
  Never start the isolated session from inside the repo — move the project out first.
- **Your site = brand + Look/Colours/Lettering + What you took** (decision 49): picks in one filtered grid.
- **Pages never shown, made well** (decision 48): no page list/count in the UI; `pagesFromWords` adds Shop / Menu
  from the sentence and `reachable` a Contact page when a site has no way to reach its owner.
- **Recipe page: three tabs** (decision 47) — Your site, Your files (no logo), Build; Design/Pages/Motion gone.
- **Recipe page redone** (decision 45): the owner's name on top, ruled tabs, Overview = Your brand + What you took
  (`spec.taken`, kept on the recipe) + Your choices; Pages/Effects say "from Fennwood". Saved: brands only, no Recently
  viewed or Compare.
- **Click spark** on OpusKit itself (`components/ClickSpark.tsx`, own code — the user asked for React Bits' effect, not its code).
- The user on the logic (2026-10-08): the flow stays (Library → You → Direction → Recipe); now it is about making it
  stronger, not changing it again. You is final.


- **The flow, as it stands** (`docs/plan-library.md` decisions 33–38; the user: "leave it like this for now"):
  1. **Library** (`/library`) — pure browsing, no steps bar. Title "Take what you like." and one line; Kind / Feel
     filters. The **+** on a site opens a large dialog (`LikeButton` → `TakeDialog`, `src/app/library/SiteTake.tsx`):
     the site on the left with **Take its whole look**; on the right **Just one thing** (colours, lettering, first
     screen, movement — `like` items), **Its parts** (navigation, every section, footer) and **Its effects**. One
     picture per thing (the site's recording, else drawn in its own look) — no Real/Your-style switch.
  2. Taken things look the same everywhere (`TakenPicture` in `library/parts.tsx`: dialog, Collection sheet, header,
     Pages toolbox) and are keyed by where they came from (Fennwood's gallery ≠ Halden's; a page still gets a part once).
  3. **Build my site** → three steps (`STEPS` in `library/parts.tsx`): **You → Direction → Recipe**.
  4. **You** (`/studio/you`): name, one sentence, **What are you making?** — six plain answers with icons (`OFFERS` in
     `features/library/inspire.ts`), read from the sentence (`purposeFrom`, `kindFor`). Nothing else (no pictures, no
     pages line, no goal question — the user cut them as too much).
  5. **Direction** (`/studio/direction`): the site three ways (`directionsFor`: no direction takes more than two of
     look, colours, lettering, first screen from one site — check.ts), each saying what it took from where; then
     **Make it yours** (every look, colour, lettering — `studio/LookPicker.tsx` — with a live preview; changes marked
     "your pick"); then "What your site will have" (pages). *Superseded 2026-10-08 by decision 39.*
  6. Brand is gone (decision 44): a recipe opened from an example or a saved one opens in Direction, kept as built.
- **Pages as a plan** (decision 34, prototype): parts drawn as storyboard frames (body text as bars, photos as crossed
  blocks, `.sketch`), Says / Shows under each, proof clips in the chooser, Plan | Sample. Pages is now the optional
  "Adjust pages"; its toolbox still shows source colours.
- **Persona test** (Mara, a ceramicist, run on the old flow): the findings drove decisions 35–38 — restaurant pages
  from a site taken for its colours, Pages too much, labels unclear. Not yet rerun on the new flow.
- **Sections policy** (decision 33): shown in a site, shipped as clean components; a build's better sections come back
  to `src/sections/` after the user approves (`docs/plan-examples.md` §3 step 7).
- Research added: `docs/research/2026-10-07-part-representation.md` (how others show a part without promising pixels).
- The user's taste, seen all day: as few questions and as little text as possible; nothing that looks like a promise
  of someone else's site; framed and simple over clever.
- **Redesign, 2026-10-07** (decision 31): the kit, accounts, pricing/paywall, explore, resources and `/recipe/{slug}`
  are gone; every recipe opens in Brand / Pages via `/studio/open`. OpusKit's own look follows getartcraft.com and
  mux.com: stone ground, ink, hairline frame, signal orange, Archivo wide + Geist + Geist Mono, no pills (tokens in
  `globals.css`, summary in `AGENTS.md`). The home page is new: Library → Brand → Pages → Recipe, the Build Package,
  examples, tools. Then made less artcraft-like but kept simple (the user
  dropped a "score" theme with Bodoni): framed and ruled again, a centred promise over a four-station flow — all of it in `docs/design.md`; dark
  mode follows the system with a header toggle. Committed in `eba70aa`.
- **New flow, 2026-10-07** (decisions 35–37, not committed): the Library (browsing, the + opens a site to take from)
  → Build my site → You → Direction (three mixes + Make it yours) → Recipe. The owner's sentence
  decides the kind of site; liked sites only lend qualities (whole look, colours, lettering, first screen, movement);
  Direction shows three mixes, none a copy. Brand and Pages became optional "Adjust" screens. Next: a persona rerun
  (Mara, the ceramicist) on the new flow, and the user's review.
- **Pages is a plan, 2026-10-07** (decision 34, prototype, not committed): parts drawn as storyboard frames in your
  colours (body text as bars, photos as crossed blocks), with Says / Shows under each, proof clips in the chooser, and
  Plan | Sample. Waiting for the user's verdict; open: toolbox tiles still in source colours.
- Sections are shown in a site and shipped as clean components; a build's better sections come back to `src/sections/`
  after the user approves (decision 33, `docs/plan-examples.md` §3 step 7).
- **Room to invent, 2026-10-07** (decision 32): packages keep the owner's picks (Locked) and ask the builder to design
  the rest and one remembered moment per page; every look carries `lookKnowledge` (moves, craft, sparks, traps, seen —
  from the award study and our builds). #19 Low Hum is its first test: compare the builder's named moments with it.
- **Engine, 2026-10-06** (decisions 22, 26): Build Package code is a reference the builder fits into one site
  (`ONE_SYSTEM` QA checks); every recipe carries a **copy deck**, a **shot list** and do/avoid rules fitted to the
  owner's picks; a mixed page never gets one part twice; a gallery never hides its photos.
- **Examples #17–#20** (`docs/plan-examples.md` §5): new looks only, made the Library + Build way. #17 **Fieldhouse**
  (Modern Heritage) and #18 **Maison Vey** (Luxury Editorial, built in an isolated `claude -p` session) are built,
  registered and live (2026-10-07), and so is #20 **Halden** (Dark Cinematic; the user's film, scroll-scrubbed). Next:
  #19 **Low Hum**.
- **Twenty-one example sites** are built, registered and live; clips for #11–#21 wait for the user's screen recordings
  (`docs/plan-examples.md` §4).
- `examples/yunisaslanov/` (the first site through the Library, `docs/review-yunisaslanov.md`; moved from the repo root 2026-10-07, not registered as an example) was committed in `4fcda78`
  including `public/media/yourPhotos.jpeg`, the owner's own photo. It stays (the user, 2026-10-07) — don't ask again.

## Next

1. **The next batch** (#26–#29, `docs/plan-examples.md` §5c — Tidewell Physio, Hollis & Daughters, Ines Varga, Tally
   House): waiting for the user's approval. Each: recipe through the flow → link to the user → isolated build (outside
   the repo, `claude -p`) → photos (Unsplash connector) → register; Engine lessons fixed before the next site.
2. **Clips** for #11–#25: the user's screen recordings of the live exports (Low Hum, Pale Hour, Kelp Line, Pip & Kiln
   and Ninth Row are new).
3. **Pip & Kiln's copy vs its photos**: the builder listed where the product photos show other glazes and shapes than
   the copy says — ask the user whether to fit the copy to the photos.
4. **Feed back from the builds** (decision 33, ask first): Low Hum's wavy edges and sticky mobile button, Pale Hour's
   floor-plan index, Ninth Row's seat plan and doors countdown.
5. Known gaps: "Event / wedding" is the kind's name for galleries and cinemas too (renaming breaks older examples'
   `choices`); older recipes have no `taken`.

## Night runs

A scheduled cloud session builds the next example sites unattended, one after another, learning from each:
`docs/NIGHT-RUN.md`. It works on a `night/YYYY-MM-DD` branch and reports in a pull request; the user approves recipes,
media and section feedback there.

## Working agreements (from the user)

- **Videos and sound in a site:** the user picks them. Claude writes the shot list and waits. Photos: Claude.
- **Recordings for clips:** the user screen-records the live export into `examples/{slug}/media-src/recording/` (kept on
  disk for re-cuts, not committed — large, and they can show private screens). Claude cuts with ffmpeg: the site clip's
  frame is never cropped; section clips stand still, framed on the section; small effects zoomed in; no pasted frames.
  No automated browser video (it dropped frames).
- **Example builds:** Library + Build (from #17; #1–#16 in the retired kit) → Build Package → Claude Code: a fresh, isolated session
  (`claude -p` inside the project, outside the repo, `--setting-sources project,local`, so it sees only the project;
  moved back after — from #18; a subagent sees OpusKit's own CLAUDE.md), the prompt logged in `BUILD-LOG.md` first.
  No hand-written code in examples. Ask before adding anything a build made by hand to the kit.
- **Palettes by fit**, previewed on a real page — never "because it's unused". Sela Mor is the quality bar.
- **Every site Claude makes is premium** (2026-10-06): at least as strong as the earlier examples, and stronger — they
  are shown in demos. A modest concept (a small bakery) is not enough: pick a concept, a big idea and media that can
  carry a showcase.
- **No Azerbaijan theming** (2026-10-06): sites Claude invents (test runs, examples, sample briefs) are not set in
  Azerbaijan and do not draw on its culture, language, places or names (no Baku, Sheki, Caspian, Azerbaijani words).
  An invented brand in an international or unnamed setting, English copy. Talking to the user in Azerbaijani stays.
- Commit and push only when the user asks.
- Connectors (Unsplash, Figma, higgsfield) drop now and then — the user re-authorises them in claude.ai connector settings.

## Environment notes

- OpusKit's dev server runs on `:3000` (the user's); an example's own dev server on another port (3020, 3021, …).
- Playwright: `npx -y playwright install chromium` once, then require `playwright` from a scratch folder. Pexels and the
  Unsplash website now block automated browsers (a human check): use the Unsplash connector for photos.
- Before the first `npm install`/build inside any example, check its `next.config.ts` has the `turbopack.root` pin
  (AGENTS.md) — without it a build can wipe OpusKit's own `node_modules`.
- Raw footage and recordings in `examples/*/media-src/` are git-ignored (`.gitignore`); processed media lives in
  `public/media/`.
- Live export steps: AGENTS.md "Showing one on the site". When excluding the export's media folder, exclude only the
  top-level `/media` — `_next/static/media` holds the fonts.
- Never `cat dir/*.x > dir/all.x`: the output matches the glob and grows until the disk is full (2026-10-07, 250 GB).
