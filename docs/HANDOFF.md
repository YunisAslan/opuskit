# Handoff — where the work is and how to continue

Last updated 2026-10-06. Read this first in a new session, on any computer. Then `AGENTS.md` → `docs/plan-library.md`.
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Now (2026-10-06)

- **OpusKit Library is the front door** (`docs/plan-library.md`, decisions 1–29). Discover (`/library`) shows built
  sites; the Collection is a cart in the header; **Build my site** → Brand → Pages → Recipe (it downloads), with a steps
  bar. **Or start blank** starts from a kind of site with nothing collected (decision 27).
  - **Brand** (decisions 16, 28, 29): a plain form (name, one sentence); tabs **Look** (only for a blank start or
    several collected sites in different looks — a look OpusKit built a site in plays that site's recording) |
    **Colours** | **Lettering**; a sample marked "A sample, not your site", with four of your parts under it.
  - **Pages** (decisions 23, 24): left the toolbox (Parts | Effects with On every page), middle the page, right the
    pages; anything on the page is changed in one **Chooser** that opens from what is clicked.
  - The kit (`/kit`) still exists until the Library has proven itself (§5.1). Big idea is **not** in the Library: the
    user decided it does not make a site strong — colours, type, words, photos and films do.
- **Engine, 2026-10-06** (decisions 22, 26): Build Package code is a reference the builder fits into one site
  (`ONE_SYSTEM` QA checks); every recipe carries a **copy deck**, a **shot list** and do/avoid rules fitted to the
  owner's picks; a mixed page never gets one part twice; a gallery never hides its photos.
- **Examples #17–#20** (`docs/plan-examples.md` §5): new looks only, made the Library + Build way. #17 **Fieldhouse**
  (architecture studio restoring barns · Modern Heritage · Warm Black · Moonlit Italic) — recipe approved, Build
  Package written; the build (a fresh subagent, temporary pictures) was **stopped early** on purpose — shadcn/ui set up,
  no pages yet; how to resume is at the end of `examples/fieldhouse/BUILD-LOG.md`. Also waiting for **photos**: the user wants them from **Unsplash** — use the Unsplash connector (Pexels and the Unsplash
  website block automated browsers; never try to get past their checks). Then review, register, live export.
- **Sixteen example sites** are built, registered and live; clips for #11–#16 wait for the user's screen recordings
  (`docs/plan-examples.md` §4).
- `yunisaslanov/` (the first site through the Library, `docs/review-yunisaslanov.md`) was committed in `4fcda78`
  including `public/media/yourPhotos.jpeg`, the owner's own photo — ask the user whether to take it out of the repo.

## Next

1. Resume the Fieldhouse build (BUILD-LOG.md, Prompt 2); its photos from Unsplash (connector) by its shot list → `public/media/` (≤ 2400 px, JPEG q82, sources in
   `media-src/SOURCES.md`) → review at 1440 + 390 → register (`docs/plan-examples.md` §3 step 7) → live export.
2. #18 Maison Vey, #19 Low Hum, #20 Halden (the user's film) — same loop.
3. The open points in `docs/plan-library.md` §5 — retiring the kit once #17–#20 pass the Sela Mor bar; persona tests.

## Working agreements (from the user)

- **Videos and sound in a site:** the user picks them. Claude writes the shot list and waits. Photos: Claude.
- **Recordings for clips:** the user screen-records the live export into `examples/{slug}/media-src/recording/` (kept on
  disk for re-cuts, not committed — large, and they can show private screens). Claude cuts with ffmpeg: the site clip's
  frame is never cropped; section clips stand still, framed on the section; small effects zoomed in; no pasted frames.
  No automated browser video (it dropped frames).
- **Example builds:** Library + Build (from #17; #1–#16 in the kit) → Build Package → Claude Code: a fresh subagent that
  sees only the project (built outside the repo, moved back after), the prompt logged in `BUILD-LOG.md` first.
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
- Live export steps: AGENTS.md "Showing one on the site".
