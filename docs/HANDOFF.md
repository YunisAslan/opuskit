# Handoff — where the work is and how to continue

Last updated 2026-10-04. Read this first in a new session, on any computer. Then `AGENTS.md` → `docs/plan-examples.md`.
Keep this file current: update "Now" and "Next" whenever a step finishes.

Talk to the user in Azerbaijani; code, docs and commits in English.

## Now (2026-10-04)

- **Fifteen example sites** are built, registered and live (`/examples`, `/live/{slug}`); clips for #11–#15 wait for the
  user's screen recordings, and ten older sites have section clips to re-record (`docs/plan-examples.md` §4).
- **The variety round is done** (phases A–G, from five research reports in `docs/research/2026-10-04-*.md`):
  - A. Page frame tokens per layout (`src/lib/frame.ts`), a tone per section (ground / surface / inverse / chapter), media
    placement (side / full / over) — the engine gives every page a rhythm (`pageRhythm`).
  - B. A voice per look; footer by family and big idea; a section entrance per family (`ENTRANCE` in engine.ts); each big
    idea its own ending; pages end on their own part (contact only on Home / Contact / a listing).
  - C. Merged components (Steps, NameWall, Statement) and section designs (`variant`, `src/data/section-variants.ts`),
    picked per family, pickable in Pages → Other designs.
  - D. Palettes: 7 dusty ones retired (`LEGACY_PALETTE`), 11 tuned, 7 added; `rankPalettes` picks by fit; check.ts rejects
    greyed mid-tone grounds and tinted ink. Built examples keep their colours (`customPalette` pinned by `npm run examples`).
  - E. Type: 11 new pairings (incl. Plain Giant, the light huge grotesk), 4 replaced, 4 tuned.
  - F. Pieces: `DrawnLink`, `TextEffect preset="cut"`, `PinnedStage` (pinned moments build on it).
  - G. Sections `product-buy`, `specs`, `article`; pages `project`, `article`; starters "New development" and "Festival or
    conference" (`Purpose.starters`); `status-bar` menu; `index` footer.
- A Brasshand v2 (same recipe, today's engine) showed the difference and was deleted at the user's word.
- Everything up to here is committed and pushed (`8d63496`, 2026-10-04).

## Strategy (2026-10-04)

After #16 QUM the user paused to ask where OpusKit is going. The discussion and four research reports are in
`docs/strategy-2026-10-04.md` (who the user is, OpusKit as an engine for developers and platforms, "procedural oatmeal"
and how to stay unique, the store/library idea). The user leans towards **OpusKit Library**: designs with interesting
layouts and good filters, taken by copying one by one or through a cart. Three questions there are open; when answered,
write `docs/plan-library.md`. Examples #17–#20 are on hold until then.

## Next

1. **Five new example sites #16–#20** — revised in `docs/plan-examples.md` §5 for premium, realistic, modern sites (QUM,
   Volna, Khazri — kept by the user —, Long Shadow, Kərpic), waiting for the user's OK; then one by one through the loop in §3.
2. Clips for #11–#15 when the user's recordings arrive; re-recordings (§4).

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
