# Handoff — where the work is and how to continue

Last updated 2026-10-07 (evening). Read this first in a new session, on any computer. Then `AGENTS.md` → `docs/plan-library.md`.
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Now (2026-10-07, end of day — all of today's flow work is NOT committed yet)

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
     "your pick"); then "What your site will have" (pages) and **Adjust pages** (the old Pages screen).
  6. Brand (`/studio/brand`) is now only for a recipe opened from an example or a saved recipe (same `LookPicker`).
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
- **Nineteen example sites** are built, registered and live; clips for #11–#18 and #20 wait for the user's screen recordings
  (`docs/plan-examples.md` §4).
- `examples/yunisaslanov/` (the first site through the Library, `docs/review-yunisaslanov.md`; moved from the repo root 2026-10-07, not registered as an example) was committed in `4fcda78`
  including `public/media/yourPhotos.jpeg`, the owner's own photo. It stays (the user, 2026-10-07) — don't ask again.

## Next

1. **Continue the flow review with the user** (they said "we continue tomorrow"): start from where they left it — You is
   final for now; next likely Direction and the Recipe page. Commit only when they ask.
2. Rerun the Mara persona bot on the new flow (browser helper pattern: a persistent Playwright context driven over HTTP
   from the scratchpad; the bot never reads the repo) and compare with the first run.
3. Known gaps: sample content in previews is another site's (a shop shows clothes, a stand-in room photo); the
   recipe page itself has not been reviewed in the new flow; Direction's previews use stand-in photos.
4. #19 Low Hum (Retro Seventies; photos by Claude) — on hold while the flow changes; first test of decisions 30 and 32.
5. Open points in `docs/plan-library.md` §5.

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

- OpusKit's dev server runs on `:3001`; an example's own dev server on another port (3011, 3012, …).
- Playwright: `npx -y playwright install chromium` once, then require `playwright` from a scratch folder. Pexels and the
  Unsplash website now block automated browsers (a human check): use the Unsplash connector for photos.
- Before the first `npm install`/build inside any example, check its `next.config.ts` has the `turbopack.root` pin
  (AGENTS.md) — without it a build can wipe OpusKit's own `node_modules`.
- Raw footage and recordings in `examples/*/media-src/` are git-ignored (`.gitignore`); processed media lives in
  `public/media/`.
- Live export steps: AGENTS.md "Showing one on the site". When excluding the export's media folder, exclude only the
  top-level `/media` — `_next/static/media` holds the fonts.
- Never `cat dir/*.x > dir/all.x`: the output matches the glob and grows until the disk is full (2026-10-07, 250 GB).
