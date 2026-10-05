# Handoff — where the work is and how to continue

Last updated 2026-10-05. Read this first in a new session, on any computer. Then `AGENTS.md` → `docs/plan-library.md`.
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Now (2026-10-05)

- **New direction: OpusKit Library** (`docs/plan-library.md`). Instead of the kit's form-first road, a place full of
  sites, sections and effects; the person collects what they like into a **Collection** and builds from it.
  Built (`docs/plan-library.md` §2a): browse Discover (`/library`), collect into the Collection (a cart in the header),
  then **Build my site** → Pages → Style → Recipe (it downloads), with a steps bar; the kit is off the way.
- **Sixteen example sites** are built, registered and live (`/examples`, `/live/{slug}`); clips for #11–#16 wait for the
  user's screen recordings, and ten older sites have section clips to re-record (`docs/plan-examples.md` §4). New
  examples are on hold.
- The variety round (phases A–G) is done and committed (`8d63496`); QUM (#16) in `064ccfb`.
- Removed 2026-10-05 as out of date (in git history): `docs/opuskit-master-prompt.md` (the original questionnaire-era
  spec) and `docs/strategy-2026-10-04.md` (the discussion that led to the Library; its conclusions are in
  `docs/plan-library.md` §1).

## Next

1. The open points in `docs/plan-library.md` §5 — first retiring the kit (two questions there wait for the user).
2. Persona files and test tasks for the agent tests (§3).
3. Clips for #11–#16 when the user's recordings arrive; re-recordings (`docs/plan-examples.md` §4).

## Working agreements (from the user)

- **Videos and sound in a site:** the user picks them. Claude writes the shot list and waits. Photos: Claude.
- **Recordings for clips:** the user screen-records the live export into `examples/{slug}/media-src/recording/` (kept on
  disk for re-cuts, not committed — large, and they can show private screens). Claude cuts with ffmpeg: the site clip's
  frame is never cropped; section clips stand still, framed on the section; small effects zoomed in; no pasted frames.
  No automated browser video (it dropped frames).
- **Example builds:** kit → Build Package → Claude Code (a fresh subagent, the prompt logged in `BUILD-LOG.md` first).
  No hand-written code in examples. Ask before adding anything a build made by hand to the kit.
- **Palettes by fit**, previewed on a real page — never "because it's unused". Sela Mor is the quality bar.
- Commit and push only when the user asks.
- Connectors (Unsplash, Figma, higgsfield) drop now and then — the user re-authorises them in claude.ai connector settings.

## Environment notes

- OpusKit's dev server runs on `:3001`; an example's own dev server on another port (3011, 3012, …).
- Playwright: `npx -y playwright install chromium` once, then require `playwright` from a scratch folder. Pexels needs a
  headed browser (`headless: false`).
- Before the first `npm install`/build inside any example, check its `next.config.ts` has the `turbopack.root` pin
  (AGENTS.md) — without it a build can wipe OpusKit's own `node_modules`.
- Raw footage and recordings in `examples/*/media-src/` are git-ignored (`.gitignore`); processed media lives in
  `public/media/`.
- Live export steps: AGENTS.md "Showing one on the site".
