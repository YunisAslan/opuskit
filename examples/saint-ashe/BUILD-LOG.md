# Build log — Saint Ashe

How this site was made, step by step, so "it came out of the kit" can be checked (see docs/plan-for-fit.md §3).
Example #8 of docs/plan-for-fit.md §5: raw / gothic-modern, ambient-video first screen, lively movement, fashion shop.

## 1. Recipe (2026-10-03)

Made with the kit's own functions (`start`, `setStyle`, `setHero`, `setBehaviour`), the same calls the kit UI makes.
Approved by the user.
- Kind of site: Fashion · name "Saint Ashe" · about "Black clothing cut in small runs in Tbilisi: heavy cotton, waxed wool
  and leather that ages with you." · goal: Buy something
- Look: Gothic Modern · colours Mulberry (the row's fresh pick, §5) · lettering New Gothic · shape Sharp · layout Full-bleed
- First screen: Ambient video hero · movement: Dynamic
- Big idea: Loud covers, quiet reading (the kit's recommendation) → chapters that open with a giant word (Home — Journal),
  photos revealed like a curtain (Collections — Lookbook)
- Menu: Centered logo · footer: Signature columns · behaviour: links — Rolling links; main button — Hopping arrow button;
  headlines, between pages and whole site — none
- Pages (the fashion defaults): Home (hero → collection → product grid → journal → newsletter), Collections (collection →
  lookbook → product grid), About (about → editorial story → team), Contact (closing CTA → location → FAQ)
- Not used: "image hover distortion" (plan-vibe D2, put aside by the user).
- The exact spec: `opuskit.json`

## 2. Build Package

Claude Code package written by `scripts/build-package.ts` (the same files the result page's Download zips, no uploads)
into a fresh `create-next-app@16.3.8` project (TypeScript, Tailwind, ESLint, App Router, src/, `--skip-install`).
`next.config.ts` got the `turbopack.root` pin before the first install; `.gitignore` keeps the recipe's `build/` folder;
the create-next-app placeholder SVGs in `public/` were removed. Then `npm install` and, as the package README says,
`npm i motion`.

## 3. Media

Video: "Close-up video of a black silk cloth" by Mikhail Nilov on Pexels (1920×1080, 11.4 s), found by Claude and
downloaded from Pexels at the user's request, then run through the package's own `bash scripts/prepare-video.sh
media-src/hero.mp4 --no-upscale` (already full HD): `heroVideo.mp4` 1920×1080, `mobileVideoEncode.mp4` 608×1080,
`posterImage.jpg`, `posterMobile.jpg`.

Photos: 17 from Unsplash, picked by Claude with the Unsplash connector (sources and rejects in `media-src/SOURCES.md`).
Originals in `media-src/`; resized to at most 2400 px on the long side (JPEG q82) into `public/media/`. Cropped before
resizing, to leave out things that aren't ours: `product-1` (a light switch), `product-2` (boots in the corner),
`product-4` (waist to hem — the top and sneakers out), `product-7` (the sweater only — a book, shoes with a logo and a
watch out), `product-8` (tighter on the cap), `shop` (a poster on the left; also darkened and desaturated to match),
`detail` (bottom edge).

## 4. Prompts to Claude Code

(each prompt, in order, word for word)

### Prompt 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), as for the earlier examples.
It was given only: "work inside `examples/saint-ashe/` as the project root; read its CLAUDE.md and AGENTS.md first; port
3000 is taken, use port 3013 for its dev server" — then the prompt below, word for word.

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My files are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- heroVideo.mp4 (1920×1080) and mobileVideoEncode.mp4 (608×1080) — black silk moving slowly in the dark, made by scripts/prepare-video.sh; the first screen loop. posterImage.jpg and posterMobile.jpg are their first frames.
- product-1.jpg … product-8.jpg — our eight pieces: coat, leather jacket, heavy tee, wide trousers, slouch boots, round leather bag, rib turtleneck, cap. For the product grids.
- look-1.jpg, look-2.jpg, look-3.jpg — the season's looks, for the collection strip and the lookbook.
- detail.jpg — leather boots and stitching up close, for the editorial story.
- studio.jpg — our workshop, for About.
- team-1.jpg, team-2.jpg, team-3.jpg — the three of us, for the team on About.
- shop.jpg — our shop, for Location.

I don't have a logo yet — make a simple one for Saint Ashe.

There is no checkout yet: "Add to bag" can keep a simple bag in the browser, and checking out can open an email order.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

Result: the whole site built — Home, Collections, About, Contact and a 404, from the ready sections and kit pieces. Its own
additions: a gothic-arch logo with an ember (`Logo.tsx`, `icon.svg`); a bag kept in the browser (side panel with sizes,
"Check out by email"); product filters and sort; a sideways collection strip; giant drifting chapter words ("Journal",
"Workshop"); journal rows with a photo that follows the cursor; contact and newsletter forms that open the visitor's mail
app. It invented the collection ("Ember", AW 2026), product names and prices, the team, the shop at 14 Kote Afkhazi
Street, Tbilisi, `hello@`/`orders@saintashe.ge`, delivery and return terms. It reported: the shadcn `form` component is no
longer offered by the shadcn CLI, so forms validate with a small function; and the desktop hero video (8.6 MB) is over
the recipe's 6 MB budget. `next build` with `output: 'export'` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests. Seen:
the giant "Journal" word is cut off at the left edge (its first letter missing) on desktop and phone; on phones the Home
collection shows three key pieces in a two-column grid, leaving one alone on its row.

Video budget: the package's own `prepare-video.sh` encoded at a fixed CRF 20 with no size check, which is how the
desktop video came out at 8.6 MB. Fixed in OpusKit (the script now steps the CRF up until desktop ≤ 6 MB and phone
≤ 3 MB); the new script replaced `scripts/prepare-video.sh` here and was re-run on the same source:
`heroVideo.mp4` 4.9 MB, `mobileVideoEncode.mp4` 2.5 MB (CRF 22).

### Prompt 2 — fix round 1 (2026-10-03)

Run by a fresh Claude Code subagent started from the OpusKit session (no OpusKit context), given only: "work inside
`examples/saint-ashe/` as the project root; read its CLAUDE.md and AGENTS.md first; port 3000 is taken, use port 3013 for
its dev server" — then the prompt below, word for word.

```
A few fixes, please:

1. The giant "Journal" word on Home is cut off at the left edge — its first letter is missing, on desktop and on phones. The same may happen to "Workshop" on About. The word can drift, but it should always be readable as a whole word.

2. On phones, the Home collection shows its three key pieces in a two-column grid, so the third one sits alone on its own row. Make them look intentional on phones (for example one row you can swipe, or one large and two small).

3. I re-made the hero videos smaller with scripts/prepare-video.sh (heroVideo.mp4 is now 4.9 MB, mobileVideoEncode.mp4 2.5 MB, same sizes in pixels) — check nothing else needs to change for them.

Keep everything else as it is. When you're done, run the static build again and make sure it still passes.
```

Result: the giant chapter words start at the page margin, are sized by their letter count and drift only inside the
margins, so "Journal", "Workshop" and "Burnt out" stay whole; on phones an odd number of collection pieces shows one large
and two small; the smaller videos needed no code change. `next build` passes, every route static.

Reviewed by Claude on the static export at 1440 px and 390 px: no overflow, no console errors, no failed requests;
"Journal" reads whole, the Home collection is one large coat over two pieces.
