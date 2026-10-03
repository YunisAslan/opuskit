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

**6. Clinic — Hane.** Recipe approved 2026-10-02 (`examples/hane/`); all 8 files in (picked by Claude with the Unsplash connector).
A small physiotherapy and slow-movement studio (made-up name). Kit choices, made with the kit's own functions:
- Kind of site: Health & wellness (clinic) · name "Hane" · about "A small physiotherapy and slow-movement studio — hands-on
  treatment, then exercises you can keep doing at home." · goal: Book or reserve
- Look: Japanese Minimal · colours Pink Plaster (the look's own) · lettering **Private Collection** (fresh pick) · shape Soft
- First screen: One big photo (`editorial-image`) · movement: Subtle
- Big idea: A walk through named stops (the kit's recommendation; no earlier example uses it) → guided stops on Home —
  Location, a live status line in the menu
- Menu: Classic bar · footer: **Say hello** (the new contact footer) · behaviour: links — Filling underline; the rest plain
- Pages (the clinic defaults): Home (hero → services → how it works → team → testimonials → pricing → location →
  reservation), Treatments (services → process → pricing → FAQ), Practitioners (team → testimonials), Book an appointment
  (reservation → location → FAQ), FAQ (FAQ → closing CTA)
- Not used: "photo filter that moves" (plan-vibe D1, put aside).

Files: `examples/hane/media-src/` · sources: `SOURCES.md`. Every file: Unsplash, download **Original**. Natural light,
low saturation, one calm grade. No readable brand names or logos, no clinic signage, no medical equipment brands.

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `hero.jpg` | Unsplash | `physiotherapy treatment natural light` | Portrait | 2400 px tall | Hands treating a shoulder or back in soft daylight, lots of calm space |
| `step-1.jpg` | Unsplash | `minimal treatment room window light` | Landscape | 2400 px wide | A quiet room: treatment table, linen, window — the first visit |
| `step-2.jpg` | Unsplash | `massage therapy hands close up` | Landscape | 2400 px wide | Hands-on treatment, close up — the treatment step |
| `step-3.jpg` | Unsplash | `stretching on mat at home` | Landscape | 2400 px wide | One person stretching on a mat at home, daylight — exercises to keep |
| `team-1.jpg` | Unsplash | `portrait natural light plain wall` | Portrait | 1600 px wide | A calm portrait against a plain light wall |
| `team-2.jpg` | Unsplash | `portrait natural light plain wall` | Portrait | 1600 px wide | A different person, same light and wall |
| `team-3.jpg` | Unsplash | `portrait natural light plain wall` | Portrait | 1600 px wide | A third person, same feel |
| `location.jpg` | Unsplash | `minimal building entrance plants` | Landscape | 2400 px wide | A quiet entrance or doorway with plants, no signage |

Prompt 1 (first draft; the final wording, matched to the photos that arrived, is in `examples/hane/BUILD-LOG.md`):

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My photos are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- hero.jpg — hands treating a shoulder in soft daylight. This is the first screen.
- step-1.jpg — our quiet treatment room, for the first step of How it works (the first visit: we listen and assess).
- step-2.jpg — hands-on treatment close up, for the second step (the treatment).
- step-3.jpg — stretching on a mat at home, for the third step (exercises you keep doing at home).
- team-1.jpg, team-2.jpg, team-3.jpg — our three practitioners, for the team on Home and on Practitioners.
- location.jpg — our entrance, for the Location section.

I don't have a logo yet — make a simple one for Hane.

Booking has no backend yet: the booking form can open the visitor's mail app with the details filled in.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

**7. Restaurant — Fennwood.** Recipe approved 2026-10-03 (`examples/fennwood/`); built and registered 2026-10-03. A forty-seat wood-fire kitchen (made-up name). Kit choices, made with the kit's own functions:
- Kind of site: Restaurant · name "Fennwood" · about "A wood-fire kitchen with forty seats: vegetables from two farms,
  bread baked in the same oven, a menu that changes with the week." · goal: Book or reserve
- Look: Organic Modern · colours **Apricot Hall** · lettering **Gallery Hours** (both the row's fresh picks) · shape Soft ·
  layout Balanced
- First screen: Full-bleed photo with depth (`parallax-photo`) · movement: Dynamic (the first screen needs it)
- Big idea: One thing guides the scroll (the kit's recommendation; Halvik uses it too, but no other idea fits a
  restaurant — the "live status line" of §5 belongs to A live console, made for tech sites) → a travelling shape from the
  first screen, a footer worth reaching
- Menu: Centered logo · footer: Signature columns · behaviour: headlines — Cut-out headline; links — Hand-drawn underline
- Pages (the restaurant defaults): Home (hero → intro → menu → reservation → location), Menu (menu → gallery →
  reservation), Reservations (reservation → location → FAQ)

Files: `examples/fennwood/media-src/` · sources: `SOURCES.md`. Every file: Unsplash, download **Original**. Warm natural
light, one grade; no readable brand names, logos, menus with real restaurant names, or signage.

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `hero.jpg` | Unsplash | `wood fired oven restaurant` | Portrait | 3000 px tall | Flames or a wood oven with a cook at work, warm and deep — the full-bleed first screen (parallax needs a tall frame) |
| `dish-1.jpg` | Unsplash | `roasted vegetables plate` | Landscape | 2400 px wide | One plated dish of charred vegetables, overhead or 45° |
| `dish-2.jpg` | Unsplash | `sourdough bread table linen` | Landscape | 2400 px wide | Bread on linen on a wooden table |
| `dish-3.jpg` | Unsplash | `grilled fish lemon plate` | Landscape | 2400 px wide | A grilled main on a plain plate |
| `room-1.jpg` | Unsplash | `restaurant interior warm wood` | Landscape | 2400 px wide | The dining room: wood tables, warm light, empty or soft people |
| `room-2.jpg` | Unsplash | `chef hands herbs` | Landscape | 2400 px wide | Hands at work with herbs or vegetables |
| `farm.jpg` | Unsplash | `vegetable farm harvest crate` | Landscape | 2400 px wide | A crate of just-picked vegetables — the farms |
| `location.jpg` | Unsplash | `restaurant entrance street evening` | Landscape | 2400 px wide | A warm-lit doorway or window from the street, no sign |

**8. Fashion shop — Saint Ashe.** Recipe approved 2026-10-03 (`examples/saint-ashe/`). The hero video was found and
downloaded by Claude (Pexels allows a direct download link). Black clothing in small runs (made-up name). Kit choices, made with the kit's own functions:
- Kind of site: Fashion · name "Saint Ashe" · about "Black clothing cut in small runs in Tbilisi: heavy cotton, waxed wool
  and leather that ages with you." · goal: Buy something
- Look: Gothic Modern · colours **Mulberry** (the row's fresh pick) · lettering New Gothic (the look's own) · shape Sharp ·
  layout Full-bleed
- First screen: Ambient video hero · movement: Dynamic
- Big idea: Loud covers, quiet reading (the kit's recommendation) → chapters that open with a giant word (Home — Journal),
  photos revealed like a curtain (Collections — Lookbook)
- Menu: Centered logo · footer: Signature columns · behaviour: links — Rolling links; main button — Hopping arrow button
- Pages (the fashion defaults): Home (hero → collection → product grid → journal → newsletter), Collections (collection →
  lookbook → product grid), About (about → editorial story → team), Contact (closing CTA → location → FAQ)
- Not used: "image hover distortion" (plan-vibe D2, put aside by the user).

Files: `examples/saint-ashe/media-src/` · sources: `SOURCES.md`. One dark, low-key grade; no readable brand names, logos,
labels or prints with words; no recognisable famous people. Photos: Unsplash, download **Original**. Video: Pexels
(free licence), download the largest MP4.

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `hero.mp4` | Pexels Videos | `black fabric wind slow motion` | Landscape | 1920×1080, 8–15 s | Dark fabric or a coat moving slowly in the dark, one shot, no cuts — the first screen loop |
| `product-1.jpg` … `product-8.jpg` | Unsplash | `black clothing studio` / `black jacket plain background` / `black boots studio` | Portrait | 1600 px wide | One garment or item each on a plain light or grey ground: coat, jacket, tee, trousers, boots, bag, knit, cap |
| `look-1.jpg`, `look-2.jpg`, `look-3.jpg` | Unsplash | `streetwear model concrete` | Portrait | 2000 px tall | One person in black clothes against concrete or a plain wall, face not the point |
| `detail.jpg` | Unsplash | `leather jacket detail` | Landscape | 2400 px wide | Close-up of leather, stitching or a zip — the editorial story |
| `studio.jpg` | Unsplash | `sewing workshop dark` | Landscape | 2400 px wide | A cutting table or sewing machine in a dim workshop — About |
| `team-1.jpg` … `team-3.jpg` | Unsplash | `portrait black clothes dark background` | Portrait | 1600 px wide | Three people in black, dark plain background |
| `shop.jpg` | Unsplash | `minimal clothing store interior dark` | Landscape | 2400 px wide | A dim, bare shop interior with a rail, no sign — Location |

Prompt 1 (draft — final once the files are in; it goes into `examples/saint-ashe/BUILD-LOG.md` before it is run):

```
Read CLAUDE.md and build the whole site following build/implementation-plan.md.

My files are already in public/media/ (where each one comes from is in media-src/SOURCES.md):
- heroVideo.mp4 and mobileVideoEncode.mp4 — dark fabric moving slowly, made by prepare-video.sh; the first screen loop. posterImage.jpg is its first frame.
- product-1.jpg … product-8.jpg — our eight pieces (coat, jacket, tee, trousers, boots, bag, knit, cap), for the product grids.
- look-1.jpg, look-2.jpg, look-3.jpg — the season's looks, for the collection strip and the lookbook.
- detail.jpg — leather and stitching up close, for the editorial story.
- studio.jpg — our workshop, for About.
- team-1.jpg, team-2.jpg, team-3.jpg — the three of us, for the team on About.
- shop.jpg — our shop, for Location.

I don't have a logo yet — make a simple one for Saint Ashe.

There is no checkout yet: "Add to bag" can keep a simple bag in the browser, and checking out can open an email order.

I want to publish this as a static site (next build with output: 'export'), so every page has to be static.
```

**9. Hotel / spa — Velmira.** Recipe approved 2026-10-03 (`examples/velmira/`); built and registered 2026-10-03. Film and sound found and downloaded by
Claude (Pexels, Pixabay); photos from Pexels because the Unsplash connector needed a new sign-in. Nine rooms and a bathhouse on a lake (made-up name). Kit choices, made with the kit's own functions:
- Kind of site: Hotel & travel · name "Velmira" · about "Nine rooms and a bathhouse on a lake in the Gabala hills: warm
  water, cold air, long quiet mornings." · goal: Book or reserve
- Look: Ethereal · colours **Midnight Chapters** · lettering **Kalnia Couture** (both the row's fresh picks) · shape
  Frosted glass · layout Full-bleed
- First screen: Ambient video hero · movement: Subtle
- Big idea: One thing guides the scroll (the kit's recommendation — Halvik and Fennwood use it too)
- Menu: Centered logo · footer: Signature columns · whole site: **Sound, with a mute** (the row's C3 pick)
- Pages (the hotel defaults): Home (hero → intro → collection → feature rows → journal → reservation), Rooms
  (collection → lookbook → reservation), Gallery, Book a stay (reservation → location → FAQ), Getting here (location → FAQ)

Files: `examples/velmira/media-src/` · sources: `SOURCES.md`. One soft, misty, low-contrast grade; no brands, no signs,
no recognisable people. Video and sound: Claude fetches them (Pexels allows a direct download; sound from Pixabay if it
can, else the user downloads it).

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `hero.mp4` | Pexels Videos | `fog lake morning` | Landscape | 1920×1080, 8–15 s | Mist moving slowly over still water, one shot — the first screen loop |
| `ambient.mp3` | Pixabay Sound Effects | `lake water ambience` | — | 30–60 s, loops | Soft water and birds, no voices or music — the sound visitors can turn on |
| `room-1.jpg` … `room-3.jpg` | Unsplash | `minimal hotel room light` / `white linen bed` | Portrait | 1600 px wide | Three calm rooms in soft light |
| `bath.jpg`, `lake.jpg`, `sauna.jpg` | Unsplash | `spa stone water` / `misty lake dock` / `wooden sauna` | Landscape | 2400 px wide | The bathhouse, the lake, the sauna — feature rows |
| `gallery-1.jpg` … `gallery-4.jpg` | Unsplash | `bathtub natural light`, `forest fog`, `tea cup window`, `towels stone` | Mixed | 1600 px | Details for the gallery wall and journal |
| `arrival.jpg` | Unsplash | `wooden house lake forest` | Landscape | 2400 px wide | The house from the path — Getting here |

**10. Event — Lowfield Nights.** Recipe made 2026-10-03 at the user's request, built in parallel with #9; registered 2026-10-03
(`examples/lowfield-nights/`). Three nights of films and live scores in a disused hangar (made-up name).
- Look: Cinematic Editorial · colours **Graphite & Sand** (fresh pick) · lettering High and Low · first screen:
  Whole-page scroll video · movement: Immersive · big idea: A walk through named stops (the row's "guided stops") ·
  footer: Big name · behaviour: Words that arrive, Curtain between pages
- Pages (the event defaults): Home (hero → intro → schedule → team → location → FAQ → reservation), RSVP, Venue & travel,
  FAQ
- Film: "Silhouette Walking Through Tunnel to Light" by Dominik Zítka, Pexels (found and downloaded by Claude). Photos:
  9 from Pexels (4 performers, 4 venue/atmosphere, the hangar), `media-src/SOURCES.md`.

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
| ~~keepers~~ | removed 2026-10-02, when Halvik was registered | `SectionPreview` product world → Halvik's photos and copy; founders → two Unsplash portraits in `public/kit/people/` |
| ~~kofii~~ | removed 2026-10-03, when Fennwood was registered | `SectionPreview` food world → Fennwood's photos and copy (founders from `public/kit/people/`) |
| ~~buytolose~~ | removed 2026-10-03, when Saint Ashe was registered | `SectionPreview` shop world → Saint Ashe's photos and copy (real magazine names in its press/clients replaced) |
| ~~swiss-modern-event-site-claude-code~~ | removed 2026-10-03, when Lowfield Nights was registered | `SectionPreview` event world → Lowfield's photos and copy (players as people) |
| ~~cheeky911~~ | removed 2026-10-03 with the user's OK | `SectionPreview` studio world → Brasshand (photos + copy), software world → Hexmint renders, sticker orbit → Sticky Weather; `PieceDemo` photos → Brasshand/Sticky Weather, film → Velmira |

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
| 5 | Product — Halvik | ✓ (`examples/halvik/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 6/6 (`media-src/SOURCES.md`, Unsplash connector; fox keycap mark retouched in 4) | ✓ Prompt 1 (subagent, resumed twice) + Prompt 2 (fix round 1: hero crop, buy bar off Contact) + Prompt 3 (fix round 2: framed hero beside the headline on desktop); all routes static; reviewed 1440 + 390 | card ✓ (from the live export); clips: waiting for the user's recordings | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/halvik` (click-through checked), `npm run check` ✓; `keepers` removed, kit product world → Halvik | – (no clips yet) |
| 6 | Clinic — Hane | ✓ (`examples/hane/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 8/8 (`media-src/SOURCES.md`, Unsplash connector) | ✓ Prompt 1 (subagent); no fix round; all routes static; reviewed 1440 + 390 | card ✓ (from the live export); clips: waiting for the user's recordings | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/hane` (click-through checked), `npm run check` ✓ | – (no clips yet) |
| 7 | Restaurant — Fennwood | ✓ (`examples/fennwood/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ 8/8 (`media-src/SOURCES.md`, Unsplash connector; 3 cropped) | ✓ Prompt 1 + Prompt 2 (fix round 1: travelling mark kept in the margin, phone bar off the footer); all routes static; reviewed 1440 + 390 | card ✓ (from the live export); clips: waiting for the user's recordings | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/fennwood` (click-through checked), `npm run check` ✓; `kofii` removed, kit food world → Fennwood | – (no clips yet) |
| 8 | Fashion shop — Saint Ashe | ✓ (`examples/saint-ashe/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ video (Pexels, found and downloaded by Claude) + 17 photos (`media-src/SOURCES.md`, Unsplash connector; 7 cropped) | ✓ Prompt 1 + Prompt 2 (fix round 1: giant words whole, phone collection layout); video re-encoded within budget; all routes static; reviewed 1440 + 390 | card ✓ (from the live export, video frames); clips: waiting for the user's recordings | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/saint-ashe` (click-through checked), `npm run check` ✓; `buytolose` removed, kit shop world → Saint Ashe | – (no clips yet) |
| 9 | Hotel / spa — Velmira | ✓ (`examples/velmira/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ film (Pexels) + sound (Pixabay) + 11 photos (Pexels, `media-src/SOURCES.md`; 2 graded) | ✓ Prompt 1 + Prompt 2 (fix round 1: sound switch into the menu bar); all routes static; reviewed 1440 + 390 | card ✓ (from the live export, film frames); clips: waiting for the user's recordings | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/velmira` (click-through checked), `npm run check` ✓ | – (no clips yet) |
| 10 | Event — Lowfield Nights | ✓ (`examples/lowfield-nights/opuskit.json`, 2026-10-03) | ✓ (§7) | ✓ film + 9 photos (Pexels, `media-src/SOURCES.md`; 4 cropped/graded) | ✓ Prompt 1 (resumed once after an API limit) + Prompt 2 (fix round 1: footer name fits, phone stop label clears controls); scrub film re-encoded within budget; all routes static; reviewed 1440 + 390 | card ✓ (from the live export, film frames); clips: waiting for the user's recordings | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/lowfield-nights` (click-through checked), `npm run check` ✓; `swiss-modern-event-site-claude-code` removed, kit event world → Lowfield | – (no clips yet) |

**Rebuild of #1 (2026-10-01, after plan-vibe C):** new recipe approved (Big idea "Loud covers, quiet reading", new blog
defaults, curtain transition, preloader, smooth scroll); built beside the first build, then swapped into `examples/slow-atlas/`
with the user's OK (BUILD-LOG.md §5–§8: Prompt 1 + fix round 1 for the curtain under basePath). Redone: card + poster,
zip, live export (click-through checked), `npm run check` ✓. **Waiting for the user's screen recordings** for the site clip
and section clips (the old ones showed the old site and were removed with it; `examples.ts` has no `clip` until then).

**#5 Halvik:** done except clips (the user records them later).

Other:
- [x] Root cleaned (2026-10-01): QA screenshots, `not-used-videos/`, `.DS_Store` (added to `.gitignore`).
- [x] Old examples: decided (b), replace one by one (§9)
- [x] Kit integration (§8) — built 2026-10-01; each new site only adds its clips
