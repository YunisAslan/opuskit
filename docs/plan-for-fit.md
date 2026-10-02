# Plan for fit — "nə əldə edəcəyimi göstər"

Started 2026-10-01. A shared plan, kept up to date: for the user and for every future session.
Before starting work, read this file and update the **Progress** table at the bottom.

## 1. Goal

While picking options in the kit, a person must understand **what kind of site they will get**.
An exact combination is not needed: there are ~6×10⁸ combinations at the Design step alone, so that is impossible.
Instead:

- **What defines the style** (overall feel, kind of first screen, movement): a short video clip from a real site.
- **Details** (colours, typefaces, shape, menu, footer): the kit's live preview already shows these
  (`SitePreview`, `SectionPreview`, `OptionDemo`). The clip's typefaces and colours do not have to match the user's.
- Under the clip, an honest note: *"A site like this. Colours and typefaces will follow your choices."*

## 2. Decisions made

- **2026-10-01:** The current 6 examples do not count toward coverage. Reason: they are all `scroll-video` + immersive,
  and their media/brands are not clean (see §9).
- **2026-10-01:** Every new example is a **full, multi-page Claude Code build** (option A).
- **2026-10-01:** We work together. Claude writes the recipe and the media brief; the user finds the media and drops it in.
- **2026-10-01:** Media source, for now, is the internet. Pinterest is for references only; files come from free-licence sites (§7).
- **2026-10-01:** The user tests as we go. **Any one site can be taken through every step of §6, end to end** — including
  capture, registration, the live site and the kit connection (§8) — without waiting for the other sites. A step can be
  done early as a test (e.g. registration before the fix round) and is then redone when the site changes; the Progress
  table says which steps are "test" and which are final.
- **2026-10-01:** Examples #2–#10 are built **after** docs/plan-vibe.md lands (A–D), so every new site shows the fresh
  OpusKit: the research-based page anatomy (each kind's real length and sections — feature rows, newsletter, categories,
  press, CTA band, trust, schedule, integrations), a fresh palette/pairing where the look has one (§5 "Fresh picks"),
  the recipe's concept + signature moments, and a WebGL piece where it fits. Slow Atlas (#1) was built before this; it
  may be rebuilt later from its own recipe once C lands (user, 2026-10-01).
- **2026-10-01:** The Claude Code build runs in the user's own terminal (`claude` in `examples/{slug}/`): a headless
  session started from Claude's side was blocked by its safety check. Claude writes each prompt into `BUILD-LOG.md`
  first; the user pastes it.

## 3. Core rule: no fake examples

Every example comes about the way a normal user would make it: **kit → Build Package → Claude Code**.

- Allowed: providing media, and asking for fixes in plain language (the way a user would).
- Not allowed: writing code by hand, hiding a change that went outside the recipe.
- Every prompt given to Claude Code is written to `examples/{slug}/BUILD-LOG.md`, in order.
  That way, "this site came out of the kit" can be checked.
- No real brands, logos, celebrities or film/TV footage. Brand names are made up.

## 4. Tags (what matching runs on)

Every example gets 3 tags. Look → family is **always read from the code** (`directions[id].families[0]`, `src/data/taxonomy.ts`),
not from a hard-coded list. A look added later fits in automatically.

**First-screen group** (`heroes`, `src/data/patterns.ts`, 11 → 5):

| Group | Heroes |
|---|---|
| Film | `ambient-video`, `scroll-video`, `scroll-video-page` |
| Photo | `editorial-image`, `parallax-photo` |
| Type | `type-statement`, `kinetic-type` |
| Product/3D | `product-stage`, `webgl-scene` |
| Illustration | `illustrated`, `orbit-stickers` |

**Movement** (4 → 3): calm = `still` + `subtle` · lively = `dynamic` · immersive = `immersive`.

**Feel:** 9 families. Every look as of 2026-10-01 (41; ★ = added 2026-10-01):

| Family | Looks (first family) |
|---|---|
| quiet | japanese-minimal, scandinavian-minimal, coastal-calm, soft-pastel, warm-hospitality, ethereal ★ |
| editorial | art-editorial, fashion-editorial, luxury-editorial, modern-heritage, news-grid, swiss-editorial, victorian ★ |
| cinematic | cinematic-editorial, dark-cinematic, film-inspired, immersive-portfolio |
| minimal | architectural-minimal, bento-product, monochrome-minimal |
| bold | swiss-modern, typography-first, neo-brutalist, playful-pop, maximalism ★ |
| raw | gothic-modern, raw-editorial, scrapbook ★, conceptual-sketch ★ |
| organic | organic-modern, retro-seventies, bohemian ★ |
| experimental | art-direction, sticker-studio, pixel-art ★, surrealism ★ |
| futuristic | digital-futurism, technical-minimal, y2k-chrome, synthwave ★, cyberpunk ★ |

New surface treatments, also added 2026-10-01: `glass`, `relief`, `clay`. They are detail (Shape), so they need no clip:
the live preview shows them.

> If new looks are added, update this table: `npx tsx` prints `directions` grouped by `families[0]`.

## 5. Matrix: 10 sites

Together these cover all 9 families, all 5 first-screen groups and all 3 movement levels.
"Alternative" = another look in the same family, if we want to swap.

| # | Feel | Look | Alternative | First screen | Movement | Kind of site |
|---|---|---|---|---|---|---|
| 1 | editorial | news-grid | victorian ★, swiss-editorial | type-statement | calm | blog |
| 2 | bold | typography-first | maximalism ★, swiss-modern | kinetic-type | lively | agency |
| 3 | futuristic | digital-futurism | y2k-chrome, cyberpunk ★ | webgl-scene | immersive | SaaS |
| 4 | experimental | sticker-studio | pixel-art ★, surrealism ★ | orbit-stickers | lively | studio |
| 5 | minimal | bento-product | monochrome-minimal | product-stage | calm | product |
| 6 | quiet | japanese-minimal | scandinavian-minimal, coastal-calm | editorial-image | calm | clinic |
| 7 | organic | organic-modern | bohemian ★, retro-seventies | parallax-photo | lively | restaurant |
| 8 | raw | gothic-modern | raw-editorial, scrapbook ★ | ambient-video | lively | fashion shop |
| 9 | quiet | ethereal ★ | warm-hospitality | ambient-video | calm | hotel / spa |
| 10 | cinematic | cinematic-editorial | dark-cinematic, film-inspired | scroll-video-page | immersive | event |

Every row was checked against hero constraints (`heroes[id].leads`, `.motion`). In #8 the look's default lead is
photography: picking the hero turns it into video. The kit does this, and `npm run check` confirms it.

**Fresh picks (docs/plan-vibe.md A, all available on the row's look):** what each site tries first in the kit; the
user still approves the recipe at step 1. "—" = the look's own.

| # | Palette | Pairing | Also from plan-vibe |
|---|---|---|---|
| 2 | Lido Blue | Poster Caps | giant-word chapter openers, pinned proof |
| 3 | — | Funnel | living gradient hero (Paper shader field, D1), integrations, feature rows |
| 4 | Bubblegum | Stack | playful entry gate, travelling motif |
| 5 | Console Lilac | Wide Spec | feature rows, press, trust; logo as material (D1) |
| 6 | — | Private Collection | photo filter that moves (D1), schedule-free calm page |
| 7 | Apricot Hall | Gallery Hours | menu → reservation → location, live status line |
| 8 | Mulberry | — | image hover distortion (D2), newsletter |
| 9 | Midnight Chapters | Kalnia Couture | ambient sound with mute (C3) |
| 10 | Graphite Sand | — | schedule, guided stops |

**Order:** least media first, so the process is tried out cheaply: **1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10.**

## 6. The loop for each site

| Step | Who | What |
|---|---|---|
| 1 | Claude | Builds the recipe **in the kit** (pages, sections, choices) and shows it to the user. Starts from the kit's research-based defaults and the row's fresh picks (§5); the recipe carries a concept and signature moments (docs/plan-vibe.md C). The user approves. |
| 2 | Claude | Writes the media brief into §7: file names, sizes, ratio, length, shot list, mood, what to avoid. |
| 3 | User | Finds the media and drops it into `examples/{slug}/media-src/`, with each file's source link in `media-src/SOURCES.md`. |
| 4 | Claude | Exports the Build Package. **Before any `npm install`/build**, adds `turbopack: { root: new URL('.', import.meta.url).pathname }` to `next.config.ts` (otherwise OpusKit's own `node_modules` is at risk). Video goes through `bash scripts/prepare-video.sh`. Builds with Claude Code; every prompt goes into `BUILD-LOG.md`. |
| 5 | Together | Review: Claude checks the build (production build, 1440 px + 390 px in a real browser, overflow, console errors, failed requests) and writes fix prompts; 1–2 rounds, only through prompts. |
| 6 | Claude | Capture: 1440×900 screenshot (after the video has real frames), poster, a **10–15 s clip** (first screen + some scroll, so the movement shows), and a **4–5 s clip per section** (`public/media/clips/{sectionId}.mp4`: the part scrolling into view, so its reveal shows). **The user screen-records** the live export (no dev overlay), moving around and using it; Claude cuts the clips with ffmpeg. Browser-automation video dropped frames (~17 fps) and missed things (decided 2026-10-01); automation is used only for the poster and card stills. |
| 7 | Claude | Registration: `src/data/examples.ts` (with tags, `choices` using exact option names), `public/examples/{slug}` symlink, `npm run examples`, live export (AGENTS.md → "Showing one on the site"), `npm run check`. The old example it replaces is removed in the same step (§9). |
| 8 | Claude | Kit connection (§8): the site's tags, and its clip shown in the kit where it matches. Built with the first site; each later site only adds its tags and clip. |

Steps can be run out of order for testing. Anything that depends on how the site looks (capture, live export, zip)
is redone after every fix round; Claude says which steps went stale.

## 7. Media

### Where it comes from (licence rule)

- **Pinterest = references and mood only.** Images there belong to other people: do not put them on the site or in the zip.
  Use Pinterest to find "what we want", then find the file on the sites below.
- **Files:** Pexels, Unsplash, Pixabay (photo + video), Mixkit, Coverr (video). Free for commercial use.
- For every file, write its source link in `media-src/SOURCES.md`.
- Do not use: logos/brands in shot, recognisable famous people, film/TV/advert footage, watermarked or captioned material.

### General specs

- **Photo:** at least 2000 px on the long side, original download (largest size).
- **Ambient video (loop):** 8–15 s, one shot, slow movement, ideally with the same start and end frame.
  16:9, ≥ 1920 px wide (4K is better). The subject should sit in the middle 60%, so the phone's 9:16 crop works.
- **Scroll video:** 15–30 s, **one continuous shot, no cuts**, slow forward/sideways camera move
  (it plays as the visitor scrolls). Same size rules.
- `prepare-video.sh` sharpens small sources, but a good original is always better.

### Brief format (rule, from 2026-10-01)

The user downloads exactly one file for every search term, so the brief is **a list to search, not an idea list**:
- **One row = one file**: file name · site · search term · orientation filter · minimum size · what it should show.
- Only terms that are actually to be downloaded. Pinterest/mood terms do not go in the brief (the user takes them literally
  and downloads from them; Pinterest images are thumbnails of ~736 px and their licence is unknown).
- No "optional" files: if it is not needed, it is not listed.
- On the site, filter by size: Unsplash/Pexels "Landscape"/"Portrait", download **Original / Largest**.
- When a file arrives, Claude checks it (size, content, source) and updates the status in `SOURCES.md`.

### Briefs for each site

**1. Blog — Slow Atlas.** Approved 2026-10-01. No video; Claude Code makes the logo.
Files: `examples/slow-atlas/media-src/` · sources: `media-src/SOURCES.md`.

First round (2026-10-01): 11 files arrived. 2 kept (`story.avif` lone house 2670×1780, `article-6.avif` train window
3432×1931). The rest dropped: Pinterest 736 px thumbnails, one Condé Nast magazine page, one line-art illustration
(not a photo). The story image is now landscape (lone house): the Editorial Story section suits it.

Second round (2026-10-01): the 8 missing files were found with the Unsplash connector (the search terms and filters from
the brief), picked by Claude at the user's request, and downloaded at Original size. `story.avif`'s source was found
(Cassie Boca). `article-6.avif`'s source was not found, so it was replaced by an Unsplash `article-6.jpg` and moved to
`media-src/dropped/`. **All 10 files are in, each with its page link and author in `SOURCES.md`.**

> **Sites 2–10 below are drafts.** Their real brief is written at step 2 of the loop, in the format above.

**2. Agency — Brasshand.** Brief written and approved 2026-10-01; all 10 files in (picked by Claude with the Unsplash connector). No video; Claude Code makes
the logo. A small branding agency for food, music and culture, so the six projects are its (made-up) clients' work.
Files: `examples/brasshand/media-src/` · sources: `media-src/SOURCES.md`. Every file: Unsplash, filter **Landscape** (team:
**Portrait**), download **Original**. No readable real brand names or logos in any shot.

| File | Site | Search term | Orientation | Min size | What it should show |
|---|---|---|---|---|---|
| work-1.jpg | Unsplash | `restaurant menu card table` | Landscape | 3000 px wide | A printed menu or card on a restaurant table — a restaurant identity |
| work-2.jpg | Unsplash | `poster wall street` | Landscape | 3000 px wide | Posters pasted on a city wall — a festival campaign |
| work-3.jpg | Unsplash | `coffee bag packaging` | Landscape | 3000 px wide | Plain or unbranded coffee bags — a packaging project |
| work-4.jpg | Unsplash | `vinyl record sleeve` | Landscape | 3000 px wide | Record sleeves, graphic covers — a record-label identity |
| work-5.jpg | Unsplash | `museum wayfinding sign` | Landscape | 3000 px wide | Signage or wayfinding in a gallery — a culture project |
| work-6.jpg | Unsplash | `bakery shop window` | Landscape | 3000 px wide | A shopfront or window with painted lettering — a bakery identity |
| studio.jpg | Unsplash | `design studio desk sketches` | Landscape | 3000 px wide | A worktable with sketches and printouts — the About page |
| team-1.jpg | Unsplash | `portrait plain background` | Portrait | 2000 px tall | One person, plain background, looking at the camera |
| team-2.jpg | Unsplash | `portrait plain background man` | Portrait | 2000 px tall | Same style as team-1 |
| team-3.jpg | Unsplash | `portrait plain background woman` | Portrait | 2000 px tall | Same style as team-1 |

**3. SaaS — Hexmint.** Brief written and approved 2026-10-01. **No files to download:** the first
screen is a 3D scene built in code (procedural, no model file), its poster is rendered from the scene by Claude Code, and
Claude Code makes the logo. The site has no team or photo sections.

**4. Studio — Sticky Weather.** Recipe approved 2026-10-02 (`examples/sticky-weather/`). The hero stickers are drawn by
Claude Code as SVG (illustration lead) — no files. Files: `examples/sticky-weather/media-src/` · sources: `SOURCES.md`.
No brand names or logos readable in any shot (blank or invented labels only).

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `work-1.jpg` | Unsplash | `colorful packaging design` | Portrait | 1600 px wide | Bright boxes/bags, no readable brand |
| `work-2.jpg` | Unsplash | `sticker sheet` | Portrait | 1600 px wide | A sheet of colourful stickers |
| `work-3.jpg` | Unsplash | `risograph print` | Portrait | 1600 px wide | Colourful printed poster/zine |
| `work-4.jpg` | Unsplash | `colorful business cards` | Portrait | 1600 px wide | Stationery / identity cards |
| `work-5.jpg` | Unsplash | `laptop stickers` | Portrait | 1600 px wide | A laptop lid covered in stickers, no device logo |
| `work-6.jpg` | Unsplash | `colorful product packaging minimal` | Portrait | 1600 px wide | One product on a flat colour |
| `studio-1.jpg` | Unsplash | `design studio desk colorful` | Landscape | 2400 px wide | A bright studio desk with work in progress |
| `studio-2.jpg` | Unsplash | `paper swatches colorful` | Landscape | 2400 px wide | Colour swatches / paper samples |
| `studio-3.jpg` | Unsplash | `screen printing studio` | Landscape | 2400 px wide | Printing in progress, hands OK |
| `studio-4.jpg` | Unsplash | `cutting mat craft` | Landscape | 2400 px wide | Cutting stickers / craft tools |
| `studio-5.jpg` | Unsplash | `pantone color cards` | Landscape | 2400 px wide | Colour cards fanned out (no readable brand) |
| `team-1.jpg` | Unsplash | `portrait colorful background` | Portrait | 1600 px wide | Real person, bright flat background |
| `team-2.jpg` | Unsplash | `portrait colorful background` | Portrait | 1600 px wide | A different person, same feel |
| `team-3.jpg` | Unsplash | `portrait colorful background` | Portrait | 1600 px wide | A third person, same feel |

**5. Product — Halvik.** Recipe approved 2026-10-02. The product is a compact mechanical keyboard (Halvik 65) with a
matching dial pad: headphones were tried first, but every Unsplash series of one pair showed a real brand. One
photographer's series (Alex de Koning) shows the same green-case, cream-key keyboard from several angles, so five of the six
files come from it. Claude Code makes the logo. Files: `examples/halvik/media-src/` · sources: `SOURCES.md`. Every file:
Unsplash, download **Original**. No brand names or logos readable in any shot (the small fox mark some keycap sets carry on
Esc is retouched out before the build).

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `hero.jpg` | Unsplash | `keyboard` (user `dekoningalex`) | Landscape | 3000 px wide | The keyboard side-on, cream keys over the green case, plain blurred ground — the product stage |
| `product.jpg` | Unsplash | `keyboard` (user `dekoningalex`) | Portrait | 3000 px tall | The same keyboard from above at three-quarters, whole left half in view — Product Highlight (square crop) |
| `product-2.jpg` | Unsplash | `keyboard` (user `dekoningalex`) | Portrait | 3000 px tall | A corner of the same keyboard tilted up close — the Features page's highlight |
| `row-1.jpg` | Unsplash | `keyboard` (user `dekoningalex`) | Portrait | 3000 px tall | The case's curved side profile, low angle — feature row "the typing angle" |
| `row-2.jpg` | Unsplash | `keyboard` (user `dekoningalex`) | Landscape | 3000 px wide | A small silver pad with cream keys and three knobs — feature row "the dial pad" |
| `row-3.jpg` | Unsplash | `mechanical keyboard switches close up` | Landscape | 3000 px wide | One switch bare between cream keycaps — feature row "hot-swap switches" |

**6. Clinic — quiet / editorial-image.** 6–8 calm photos, natural light.
- Pinterest: `japanese minimal interior`, `calm clinic website`, `wabi sabi natural light`
- Stock: `minimal clinic interior`, `hands close up care`, `linen natural light`, `tea ceremony minimal`, `stone garden`

**7. Restaurant — organic / parallax-photo.** 1 tall hero photo (for parallax, portrait, ≥ 3000 px tall) + 8 photos.
- Pinterest: `organic restaurant website`, `farm to table aesthetic`, `parallax food website`
- Stock: `plated food overhead natural light`, `restaurant interior warm wood`, `chef hands herbs`, `bread table linen`, `vegetables market`

**8. Fashion shop — raw / ambient-video.** 1 loop video + 8 product photos (4:5, plain background).
- Pinterest: `gothic fashion editorial`, `dark streetwear website`, `raw fashion lookbook`
- Video: `fashion model walking dark slow motion`, `black fabric wind slow motion`, `smoke dark studio`
- Photo: `black clothing studio`, `streetwear model concrete`, `leather jacket detail`

**9. Hotel / spa — quiet (ethereal) / ambient-video.** 1 calm loop video + 6 room/space photos.
- Pinterest: `ethereal website design`, `dreamy spa website`, `soft light hotel aesthetic`
- Video: `curtain wind slow motion`, `water ripple light`, `fog lake morning`, `sunlight through window`
- Photo: `minimal hotel room light`, `spa stone water`, `bathtub natural light`, `white linen bed`

**10. Event — cinematic / scroll-video-page.** 1 continuous scroll video (no cuts) + 8 photos.
- Pinterest: `cinematic event website`, `film festival website`, `scroll video storytelling website`
- Video: `drone flying forward slow`, `tunnel walk forward`, `crowd concert lights slow motion`, `forest path gimbal`
- Photo: `festival crowd night`, `stage lights`, `audience silhouette`, `venue empty`

## 8. Connecting to the kit (built with the first site, grows with each)

Changed 2026-10-01: this no longer waits for 3–4 sites. It is built as soon as one site is ready to test end to end;
with few sites, most picks simply have no match yet and show only the live preview (the threshold below).

**Built 2026-10-01 (with Slow Atlas):**
- Tags are not stored: `src/features/kit/closest.ts` reads them from each example's recipe (`example-specs.generated.json`):
  first-screen group from `resolveHero`, movement group, feel = `directions[look].families[0]`.
- `closestSite(spec)`: first-screen group 3 + movement 2 + feel 1; shown only at **5 or more** (first screen and
  movement both alike). `closestSection(spec, sectionId)`: the same ready section on a real site, movement 2 + feel 1,
  shown at 2 or more. Old examples carry `legacy: true` in `examples.ts` and are never offered. Tested in `check.ts`.
- Shown by `src/components/RealSiteClip.tsx` (muted loop; reduced motion → tap to play), always with the honest note:
  - **Design step**, right column under the live preview: "A site like this".
  - **Pages step**, the picked part's panel: the first screen → "A first screen like this" (changes with the hero);
    any other part → "This part on a real site" (its section clip).
  - **`/examples/{slug}`**: a non-film first screen plays its clip (poster = the still); "Section by section" lists every
    section clip with its job and look.

- On every example in `src/data/examples.ts`, add `tags: { family, heroGroup, motion }`.
- **Closest example:** a pure function, tested in `scripts/check.ts`. Score = first-screen group 3 + movement 2 + feel 1.
  Family: the plan's look `families[0]`.
- **Design step:** a clip on the right, matched to look + movement. Details stay in the live preview.
- **Pages step:** when the first screen is picked, the clip changes.
- **No good match** (score below a threshold): no weak clip is shown, only the live preview.
- The honest note sits under the clip (§1).

## 9. The old 6 examples (assessed 2026-10-01)

| Slug | Look / first screen | Problem |
|---|---|---|
| ulooklonely | film-inspired / scroll-video | Footage is from *Blade Runner 2049*: a famous actor, film copyright |
| swiss-modern-event-site-claude-code | swiss-modern / scroll-video | "RALPH&LAUREN": real brand name; blurry, low-quality video |
| cheeky911 | film-inspired / scroll-video | Porsche logo and brand |
| buytolose | gothic-modern / scroll-video | Blurry video, old Build Package version |
| keepers | news-grid / scroll-video-page | "Keepers" is a real drink brand, footage is probably from its advert |
| kofii | scandinavian-minimal / scroll-video-page | Hero video looks black/blurred, old version |

**Verdict:** none passes the §3 rule. They are all in git history: anything technical can be brought back.

**Dependencies (removing them breaks these):** the kit's "world" sample photos, `src/components/SectionPreview.tsx:39-43`
(swiss-modern, cheeky911, kofii, keepers, buytolose); `src/components/PieceDemo.tsx:48-53` (cheeky911);
`HeroPreview` `CLIP`; the home page `TwoWays` (`examples.slice(0, 4)`); `/examples`; the Builder's "one of N real sites" link;
`public/live/*`, `public/downloads/*.zip`, `public/examples/*`.

**Decision (2026-10-01): option (b).** The old examples stay until new ones replace them. There is never a moment
with no examples on the site. When a new site is registered (step 7), the old one it replaces is removed **in the same
step**, along with everything it touches:

| Old | Removed when | What changes at the same time |
|---|---|---|
| ~~ulooklonely~~ | removed 2026-10-01, when Slow Atlas was registered | `examples.ts` only (no kit dependencies) |
| keepers | #5 Product | `SectionPreview` `can` (product world) → #5's photos |
| kofii | #7 Restaurant | `SectionPreview` `cafe` (food world) → #7's photos |
| buytolose | #8 Fashion shop | `SectionPreview` `shop` (shop world) → #8's photos |
| swiss-modern-event-site-claude-code | #10 Event | `SectionPreview` `ph` (event world) → #10's photos |
| cheeky911 | #4 Studio (or #2 Agency, if it comes first) | `SectionPreview` `car` + `PieceDemo` `P`/`POSTER`/`FILM` → the new site's photos/clip |

Removing one example = `examples/{slug}/`, the `public/examples/{slug}` symlink + `{slug}.jpg`, `public/live/{slug}/`,
`public/downloads/{slug}.zip`, its entry in `src/data/examples.ts`, then `npm run examples` and `npm run check`.
Before removing, grep for `/examples/{slug}`: no references must remain.

## 10. Progress

| # | Site | Recipe | Media brief | Media | Build | Capture | Registered | Kit (§8) |
|---|---|---|---|---|---|---|---|---|
| 1 | Blog — Slow Atlas | ✓ (`examples/slow-atlas/opuskit.json`) | ✓ (§7) | ✓ 10/10 (`media-src/SOURCES.md`) | ✓ Prompt 1 + Prompt 2 (fix round 1, run by a subagent); `next build` passes, all routes static | ✓ poster + 13 s clip (from the live export, hero reveal included) | ✓ 2026-10-01: `examples.ts`, symlink, zip, live at `/live/slow-atlas` (click-through checked), `npm run check` ✓; `ulooklonely` removed | ✓ 2026-10-01: site clip + 6 section clips; shown in Design, Pages and `/examples/slow-atlas` |
| 2 | Agency — Brasshand | ✓ (`examples/brasshand/opuskit.json`, approved) | ✓ (§7) | ✓ 10/10 (`media-src/SOURCES.md`, Unsplash connector; work-4 replaced after the build — real label logo) | ✓ Prompt 1 + Prompt 2 (fix round 1), both by a subagent; 17 static routes | poster + card ✓; clips: waiting for the user's recordings | ✓ 2026-10-01: `examples.ts`, symlink, zip, live at `/live/brasshand` (click-through checked), `npm run check` ✓; cheeky911 not yet removed (needs the user's OK) | – (no clips yet) |
| 3 | SaaS — Hexmint | ✓ (`examples/hexmint/opuskit.json`, approved) | ✓ (§7: no files) | ✓ none needed | ✓ Prompt 1 (subagent; resumed once after an API limit); no fix round | card ✓ (poster rendered from the scene); clips: waiting for the user's recordings | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/hexmint` (click-through checked), `npm run check` ✓ | – (no clips yet) |
| 4 | Studio — Sticky Weather | ✓ (`examples/sticky-weather/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 14/14 (`media-src/SOURCES.md`, Unsplash connector) | ✓ Prompt 1 (subagent, resumed once after an interrupted session) + Prompt 2 (fix round 1: mobile stickers over the hero text); all routes static | poster + card ✓; clips: waiting for the user's recordings | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/sticky-weather` (click-through checked), `npm run check` ✓; cheeky911 not yet removed (needs the user's OK) | – (no clips yet) |
| 5 | Product — Halvik | ✓ (`examples/halvik/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 6/6 (`media-src/SOURCES.md`, Unsplash connector; fox keycap mark retouched in 4) | ✓ Prompt 1 (subagent, resumed twice); export passes, all routes static; reviewed 1440 + 390 | – | – | – |
| 6 | Clinic | – | – | – | – | – | – | – |
| 7 | Restaurant | – | – | – | – | – | – | – |
| 8 | Fashion shop | – | – | – | – | – | – | – |
| 9 | Hotel / spa | – | – | – | – | – | – | – |
| 10 | Event | – | – | – | – | – | – | – |

**Rebuild of #1 (2026-10-01, after plan-vibe C):** new recipe approved (Big idea "Loud covers, quiet reading", new blog
defaults, curtain transition, preloader, smooth scroll); built beside the first build, then swapped into `examples/slow-atlas/`
with the user's OK (BUILD-LOG.md §5–§8: Prompt 1 + fix round 1 for the curtain under basePath). Redone: card + poster,
zip, live export (click-through checked), `npm run check` ✓. **Waiting for the user's screen recordings** for the site clip
and section clips (the old ones showed the old site and were removed with it; `examples.ts` has no `clip` until then).

**#5 Halvik — what's left (paused by the user 2026-10-02, after the build and Claude's review; `examples/halvik/BUILD-LOG.md`):**
1. **Fix round 1 — waits for the user's choice.** (a) The first-screen photo is soft (shot wide open). Options: keep it;
   a prompt to frame the hero on the photo's sharpest part (the top key row) and zoom less on phones — Claude's
   recommendation; or find a sharper side-on shot. (b) The phone's pinned "Add to bag" bar also shows on Contact, over the
   form — a prompt to hide it there. Claude Code's own note: "Words that arrive" delays Contact's first paint on slow 4G
   (6.8 s); proposed to keep (the kit places it site-wide). Write the prompt into BUILD-LOG.md first, then send it to a
   subagent; redo the 1440 + 390 review after it.
2. Card + poster: 1440×900 JPEG of the live homepage → `public/examples/halvik.jpg` (then clear `.next/dev/cache/images`).
3. Registration: `src/data/examples.ts` (title/summary from the site's own `<title>`/meta, tags, `choices` with exact option
   names, `hero: { kind: 'image', src }`), symlink `public/examples/halvik` → `../../examples/halvik/public`, `npm run examples`.
4. Live export `public/live/halvik/` (AGENTS.md "Showing one on the site"). The site ships `.webp` `srcset`s: rewrite
   `, /media/` inside `srcset` as well as `"/media/`, `` `/media/ `` and `url(/media/`. Browser click-through from the nav.
5. §9: remove `keepers` in the same step (`examples/keepers/`, symlink + `keepers.jpg`, `public/live/keepers/`,
   `public/downloads/keepers.zip`, its `examples.ts` entry; grep `/examples/keepers` → none left). Replace the kit's
   product world in `SectionPreview.tsx` (`can`) with Halvik's 6 photos **and its sample copy** (now a canned drink; its
   "Stocked at" list names real shops — Whole Foods, Selfridges…). Open: the product world's team/founder sample used two
   Keepers portraits; Halvik has no people — decide with the user.
6. `npm run check`; update this row and HANDOFF.md. Commit/push only after telling the user (`git status` + `git pull`
   first; shared files: `examples.ts`, this file, `public/live/`, `example-specs.generated.json`, the zips).
7. Clips: the user records them later.

Other:
- [x] Root cleaned (2026-10-01): QA screenshots, `not-used-videos/`, `.DS_Store` (added to `.gitignore`).
- [x] Old examples: decided (b), replace one by one (§9)
- [x] Kit integration (§8) — built 2026-10-01; each new site only adds its clips
