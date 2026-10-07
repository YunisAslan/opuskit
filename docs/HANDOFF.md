# Handoff — where the work is and how to continue

Last updated 2026-10-07. Read this first in a new session, on any computer. Then `AGENTS.md` → `docs/plan-library.md`.
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Now (2026-10-07)

- **OpusKit Library is the front door** (`docs/plan-library.md`, decisions 1–29). Discover (`/library`) shows built
  sites; the Collection is a cart in the header; **Build my site** → Brand → Pages → Recipe (it downloads), with a steps
  bar. **Or start blank** starts from a kind of site with nothing collected (decision 27).
  - **Brand** (decisions 16, 28, 29): a plain form (name, one sentence); tabs **Look** (only for a blank start or
    several collected sites in different looks — a look OpusKit built a site in plays that site's recording) |
    **Colours** | **Lettering**; a sample marked "A sample, not your site", with four of your parts under it.
  - **Pages** (decisions 23, 24): left the toolbox (Parts | Effects with On every page), middle the page, right the
    pages; anything on the page is changed in one **Chooser** that opens from what is clicked.
  - Big idea is **not** in the Library: the user decided it does not make a site strong — colours, type, words,
    photos and films do.
- **Redesign, 2026-10-07** (decision 31): the kit, accounts, pricing/paywall, explore, resources and `/recipe/{slug}`
  are gone; every recipe opens in Brand / Pages via `/studio/open`. OpusKit's own look follows getartcraft.com and
  mux.com: stone ground, ink, hairline frame, signal orange, Archivo wide + Geist + Geist Mono, no pills (tokens in
  `globals.css`, summary in `AGENTS.md`). The home page is new: Library → Brand → Pages → Recipe, the Build Package,
  examples, tools. Then made less artcraft-like but kept simple (the user
  dropped a "score" theme with Bodoni): framed and ruled again, a centred promise over a four-station flow — all of it in `docs/design.md`; dark
  mode follows the system with a header toggle. Not committed yet.
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
  including `public/media/yourPhotos.jpeg`, the owner's own photo — ask the user whether to take it out of the repo.

## Next

1. #19 Low Hum (Retro Seventies; photos by Claude): recipe in the Library → the user approves → Build Package in an
   isolated `claude -p` session (outside the repo, `--setting-sources project,local`) → photos → review → register →
   live export.
2. The open points in `docs/plan-library.md` §5 — persona tests, "your own colours" in Brand.
3. Engine gaps found in #17, #18, #20 are fixed (decision 30, `docs/review-engine-2026-10-07.md`); the next build (#19
   Low Hum) is the first test of it — compare its builder's report with that review.

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
