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

- **2026-10-03:** **The user picks every video** for new sites (films, loops, scroll footage) — Claude's picks for the
  first ten were not liked. Claude still finds the photos (they were fine), writes the shot list for the films, and
  waits for the user's files before building. Photos: Unsplash connector (needs re-authorising in claude.ai connector
  settings when it drops) or Pexels.
- **2026-10-03:** Section clips show the section **standing still**, framed on it (never the page scrolling past);
  small effects (link hovers, menus, status lines) are cut zoomed in; menus and link behaviours are shown in the kit as
  drawn demos (`MenuDemo`, `LinkDemo` on the real Footer), not recordings. Never paste or patch a frame — a clip is
  real footage or a real held frame.
- **2026-10-03:** The kit is the foundation of a site, not every detail of it (user): add to the library only what a
  user would look for and not find. Added then: the Timeline section and the Soft fade page transition.

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
| 6 | Claude | Capture: 1440×900 screenshot (after the video has real frames), poster, a **10–15 s clip** (first screen + some scroll, so the movement shows), and a **3–5 s clip per section** (`public/media/clips/{sectionId}.mp4`: the part **standing still**, framed on it — never the page scrolling past it; the user, 2026-10-03: "a footer clip shows the footer, it doesn't come in from above"). Only the site clip and scroll-driven effects may scroll. Where a recording never stops on a section, its sharpest full frame is held instead, and the user re-records it standing still. **The user screen-records** the live export (no dev overlay), moving around and using it; Claude cuts the clips with ffmpeg. Browser-automation video dropped frames (~17 fps) and missed things (decided 2026-10-01); automation is used only for the poster and card stills. |
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

**11. Portfolio — Inkwell & Moth.** Recipe approved 2026-10-03 (`examples/inkwell-moth/`, BUILD-LOG §1). The picture-book
studio of illustrator Nell Arden in an old bakery in Sheki (made-up).
- Look: Scrapbook · colours Legal Pad · lettering Cut and Paste · first screen: Illustrated hero · movement: Dynamic ·
  big idea: A playful way in (entry gate on the hero = the tracing-paper sheet visitors lift away; each book brings its
  own colours) · menu: Side index · footer: One quiet line · links: Hand-drawn underline
- Pages: Home (hero → featured work → gallery + Prints on a desk → closing CTA), Books (featured work → case study →
  gallery + Tilted scroll grid → clients → closing CTA), About (about → process → stats → testimonials → closing CTA),
  Commissions (closing CTA → FAQ)
- Media: no film (the user did not ask for the optional time-lapse); the hero illustration, spot drawings and logo are
  drawn by Claude Code. 25 photos from Pexels picked by Claude (4 books, 1 reference plate, 5 desk sketches, 8 spreads,
  4 process steps, portrait, studio, Sheki street), `media-src/SOURCES.md`.

**12. Nonprofit — Kür Delta Watch.** Recipe approved 2026-10-03 (`examples/kur-delta-watch/`). A volunteer river watch on
the lower Kür (made-up): rubbish out of the river, monthly water tests, published results.
- Look: Neo-Brutalist · colours Hazard Yellow · lettering Workshop Manual · shape Bold outline (the look's own) · first
  screen: Words in motion (kinetic-type) + Departure board (split-flap) · movement: Dynamic · big idea: Loud covers, quiet
  reading (giant word on Home's manifesto; Field notes' gallery opens like a curtain) · menu: Menu with cards · footer:
  Big name · links: Filling underline
- Pages: Home (hero → stats → film band (ambient video) → manifesto → timeline → services → CTA band → journal →
  newsletter), The river (about → editorial story → team), What we do (services → process → closing CTA), Field notes
  (testimonials → editorial story → gallery → closing CTA), Donate (custom: pricing → trust → FAQ), Contact (closing CTA →
  location)
- Photos: 19 from Pexels picked by Claude (`media-src/SOURCES.md`). **Film: the user picks it** — one file:

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `media-src/river.mp4` | Pexels / Coverr / Mixkit | `river reeds calm` (or `wetland morning mist`, `delta water slow aerial`) | Landscape | 1920 px wide (4K better), 8–15 s usable | One continuous, slow shot of a calm lower river or delta wetland: still or gently drifting water, reeds, soft morning or evening light (mist is good); tripod-still or a very slow glide; natural greens and silver water; the subject in the middle 60 % so the phone's 9:16 crop works; ideally the same first and last frame for a seamless loop. **Avoid:** people, boats with names or flags, rubbish (the numbers above it carry that), fast drone moves or hyperlapse, cuts, shaky handheld, heavy orange "sunset" grades, text or watermarks. |

It plays muted and looping as a quiet full-width band between Home's loud numbers and the manifesto — the "quiet" half
of loud-and-quiet. No sound needed.

**15. Personal brand — Sela Mor.** Recipe approved 2026-10-04 (`examples/sela-mor/`). A sound artist and composer from Baku
(made-up): field recordings of wind, water and machines, turned into music for rooms, films and long nights.
- Look: Monochrome Minimal · colours Black Box · lettering Data Sheet (Mona Sans) · shape Hairline (the look's own) ·
  first screen: Words in motion (her name breathing with the sound) · movement: Immersive · big idea: Chapters in giant
  words (Home's works list held still, one work at a time; Listen opens on a giant word) · menu: Split pill · footer:
  Signature columns · links: Rolling links · main button: Magnetic · between pages: Soft fade · whole site: Sound, with a
  mute
- Pages: Home (hero → works + Photos follow the cursor → **scroll-scrubbed film band** (the user asked for scroll, not a
  loop) → about → schedule → clients → newsletter), Works (featured work → case study → gallery (Gallery wall + Lightbox)
  → clients), Listen (custom: intro → closing CTA; six tracks with players), Live (custom: schedule → newsletter), About
  (about → press → closing CTA), Contact
- Photos: 16 from Pexels picked by Claude (`media-src/SOURCES.md`; one headphone mark retouched). **The film and the
  sound are the user's picks** — two files:

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `media-src/film.mp4` | Pexels / Coverr / Mixkit | `musician dark stage smoke` (or `sound artist performance`, `hands mixer dark`) | Landscape | 1920 px wide (4K better), **15–30 s, one continuous shot, no cuts** | A live sound performance in the dark: hands on knobs and cables, or a lone performer on a smoky stage, lit by hard white or neutral light; the camera moves **slowly and steadily** (a push-in or a slow slide) the whole time, because scrolling plays it forwards and back; works in black and white (or desaturates well); the subject in the middle 60 % for the phone's 9:16 crop. **Avoid:** readable brand names or logos on gear, famous faces, cuts, handheld shake, fast moves, coloured disco light, a crowd as the subject, text or watermarks. |
| `media-src/sound.mp3` | Pixabay (music or sound effects) | `ambient drone field recording` (or `dark ambient texture`, `wind drone`) | — | 30–90 s, MP3 or WAV | One calm, seamless loop that sounds like her work: wind, water or a low machine hum turned into a slow drone; no vocals, no beat, no sudden peaks; the end flows back into the start. It is off until a visitor turns it on (the mute switch is always in view). |

**13. Course — Night Shift.** Recipe approved 2026-10-04 (`examples/night-shift/`). An eight-week online course in film
colour grading, taught live by a working colourist (made-up).
- Look: Technical Minimal · colours Wet Slate (a neutral grading-room grey, so the film is the only colour) · lettering
  Control Room · shape Hairline · first screen: 3D / WebGL scene (a live grading console built in code: colour wheel and
  scopes that move with the pointer and scroll, a graded shot on its monitor) · movement: Immersive · big idea: A live
  console (decoding // labels on Curriculum, a live status line in the menu: next cohort, seats left) · menu: Floating
  dock · footer: Say hello · links: Scrambled labels
- Pages: Home (hero → intro → case study + Before / after (log ↔ graded) → process → about → testimonials → pricing →
  FAQ → closing CTA), Curriculum (feature grid → process → case study + Before / after → FAQ), Enrol (pricing → FAQ →
  testimonials), Instructor (about → stats → testimonials), FAQ (FAQ → closing CTA)
- Photos: 8 from Unsplash picked by Claude (`media-src/SOURCES.md`; one bezel logo retouched). **The film clips are the
  user's picks** — three files; Claude makes the graded stills from them and flattens the same frames into "log":

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `media-src/clip-1.mp4` | Pexels / Coverr / Mixkit | `night street neon cinematic` | Landscape | 1920 px wide, 8–20 s, one shot | A night street with strong mixed light (sodium orange and cool teal), a person walking or a car passing slowly; graded, contrasty, cinematic. Also plays on the console's monitor in the first screen, so it should loop calmly. |
| `media-src/clip-2.mp4` | same | `golden hour portrait cinematic` | Landscape | 1920 px wide, 5–15 s, one shot | A close portrait in warm low sun: skin tones, soft backlight, a shallow background — the shot that shows how a grade handles skin. |
| `media-src/clip-3.mp4` | same | `moody interior tungsten window light` | Landscape | 1920 px wide, 5–15 s, one shot | An interior at dusk or night: warm tungsten lamps against blue window light, one person or an empty room — the mixed-colour shot. |

**Avoid in all three:** readable shop signs, brand names or logos (cars, clothes, screens), famous faces, text or
subtitles burned in, cuts, black-and-white or flat ungraded footage (Claude makes the flat version).

**14. Real estate — Aster House.** Recipe approved 2026-10-04 (`examples/aster-house/`). Twelve houses cut into the cliff
above the Caspian at Shikhov (made-up), each built around the light of one hour; one release, spring 2027.
- Look: Architectural Minimal · colours **Limestone** (chosen by fit: the warm stone of the Absheron cliffs, under a
  dawn-to-dusk film; compared with Signal White, Wet Concrete and Black Box in the kit preview) · lettering Quiet Page ·
  shape Hairline · layout Full-bleed · first screen: Scroll-controlled video · movement: Immersive · big idea: One thing
  guides the scroll (a line of light from Home's intro; the footer name) · menu: Classic bar · footer: Signature columns ·
  links: Filling underline · between pages: Soft fade
- Pages: Home (hero → intro → feature rows (the hours) → product grid (the houses) → gallery → location → closing CTA),
  Residences (product grid → feature grid → FAQ; brief: all twelve houses with hour, area, bedrooms, terrace, price,
  free/reserved/sold), A house (product highlight → gallery → feature rows → closing CTA), Book a viewing (closing CTA →
  location)
- Photos: 15 from Pexels picked by Claude (`media-src/SOURCES.md`). **The film is the user's pick** — one file:

| File | Site | Search term | Filter | Minimum | Should show |
|---|---|---|---|---|---|
| `media-src/film.mp4` | Pexels / Coverr / Mixkit | `modern house interior walkthrough` (or `minimalist villa tour`, `architecture interior gimbal`) | Landscape | 1920 px wide (4K better), **15–30 s, one continuous shot, no cuts** | A slow, steady walk (gimbal or dolly) through a calm modern house: stone, plaster, concrete or wood, big windows, ideally out to sea or open landscape; warm natural light, best if it moves from bright to golden; few objects, no people or one at a distance. Scroll plays it forwards and back, so the move must be smooth and in one direction. **Avoid:** cuts, drone exteriors only, fast moves or whip pans, shaky handheld, people facing the camera, TV screens or branded products, text or watermarks, heavy teal-orange grades. |

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

### Effects, menus and big ideas (added 2026-10-03)

Beyond `clip` and `sectionClips`, an example carries `pieceClips` (a kit piece doing its thing) and `signatureClips`
(a big-idea moment). The kit shows them where that thing is picked: the Design step's right column follows the open tab
(Look → a site in that look; Big idea → that idea; Menu & footer → that menu and that footer style; Behaviour → each
picked behaviour), Pages shows a part's moments under its clip, and `/examples/{slug}` lists them under "Effects".
Not only on the right (user, 2026-10-03): every option tile with a real site plays that site as its picture
(`TileClip`, no label; a corner button opens it large) — Design's looks, movement, big ideas, menus, footers and behaviours, and in Pages the
parts to add, first screens, other looks, effects, menus and footers (`anySection`/`heroSite`: any site with that very
thing). The part as it is now and the page rows stay drawn in the user's own colours. Small effects (link hovers,
menus, status lines, travelling marks) are cut zoomed in: a still 16:9 crop of the recording around the effect, 2–4×. `npm run check` asserts each clip exists and that the site really
uses that piece or moment. A clip is left out when it would mislead: a site clip that isn't the home first screen,
smooth scroll (looks like any scroll), sound (silent), a footer still showing the old wavy hover.

**Kit coverage (2026-10-03)** — what no real site shows yet, so the next sites can be picked to fill it:
looks 8/41 · first screens 8/11 (missing scroll-video, scroll-video-page as a site clip, illustrated) · menus 5/8 (card-menu,
bottom-dock, side-index) · footers 3/4 (line) · big ideas 3/6 (live-console, playful-way-in, loud-and-quiet) · pieces 10/45
· signature moments 9/33 · sections 32/37 (process, stats, chapters, cta-band, schedule). Re-recordings that would fill
gaps cheaply: Lowfield and Velmira home first screens (site clips, schedule), Brasshand About/Services (process, stats),
any curtain/blob page change, a magnetic button hover, a swap-button hover.

## 11. Next sites (#11–#15, redesigned 2026-10-03)

The user (2026-10-03): the new sites must be **more realistic and more striking** — they are filmed for the kit, so each
needs a moment worth watching. And every good thing a build makes by hand feeds the kit back, so the engine grows.

**Bar for every site:** a believable made-up brand with real copy (no lorem, no "Your headline"), real photos, the user's
own films, one **showcase moment** that is visible in the first 10 seconds of a recording, and nothing that looks like a
template. Each still covers kit options no real site shows yet (§8 "Kit coverage").

| # | Site | Kind · Look (family) · Movement | First screen | Menu · Footer | Big idea | Showcase moment |
|---|---|---|---|---|---|---|
| 11 | **Inkwell & Moth** — a picture-book illustrator | portfolio · scrapbook (raw) · dynamic | illustrated | side-index · line | playful-way-in | The site opens under a sheet of tracing paper you lift away; sketches lie on a desk and can be dragged (drag photos), spreads tilt as you scroll |
| 12 | **Kür Delta Watch** — a river restoration charity | nonprofit · neo-brutalist (bold) · dynamic | kinetic-type | card-menu · wordmark | loud-and-quiet | Giant ticking numbers on flat colour ("2,140 tonnes out of the river") cut hard to quiet full-bleed river film; the new Timeline tells the river's story |
| 13 | **Night Shift** — an online course in film colour grading | course · technical-minimal (futuristic) · immersive | webgl-scene | bottom-dock · contact | live-console | A live grading console: scopes and a colour wheel that move, and a before/after slider over the user's log vs graded film stills |
| 14 | **Aster House** — twelve homes on a cliff, one launch | real-estate · architectural-minimal (minimal) · immersive | scroll-video (the user's film) | classic-bar · signature | one-guide (the light) | Scroll drives a dawn-to-dusk walk through the house; pages soften into each other (Soft fade); residences list with what is still free |
| 15 | **Sela Mor** — a sound artist and composer | personal-brand · monochrome-minimal (minimal) · dynamic | kinetic-type | split-pill · signature | giant-chapters | Her name breathes with the sound; works list trails photos under the pointer; ambient sound of her own track, with a mute |

**Media.** Claude finds the photos (Unsplash connector or Pexels). **The user picks every video** and the audio:
#11 an optional ink-drawing time-lapse; #12 a river or wetland film for the quiet band; #13 a few film shots in log and
graded (stills come from them); #14 the walk-through film for the scroll (one continuous shot, dawn to dusk if possible);
#15 a short performance loop and a track for the ambient sound. Claude writes each film's shot list and waits.

**Kit growth (the loop).** After each build, list what Claude Code had to build by hand that a user would want too, and
ask the user before adding it to the kit (section or piece, the full AGENTS.md wiring, `npm run pieces`, `npm run check`).
Likely candidates: #11 a page-turn transition and torn-paper edges; #12 a Donate section (amount, monthly/once);
#13 a Curriculum section (modules and lessons) and a two-film compare; #14 an Availability list (residences, size,
status) ; #15 a Listen section (tracks with a waveform). Not every candidate goes in — the kit is the foundation (§2).
**Added from #11 (2026-10-03, the user picked 3 of 4):** `EntryGate`, `ChapterColours`, `Lightbox` pieces — the first
two also ship whenever their big-idea moment lands (`SignaturePattern.piece`); not added: the cut-out footer wordmark.
**Added from #12 (2026-10-04, the user's OK):** the Donate section (gifts that say what they pay for, the project's own
pledge form as a slot, where the money goes) and a Donate page type; nonprofits now start with a Donate page.
**Added from #15 (2026-10-04, the user's OK):** the Listen section (tracks with one shared player; starting one turns the
site's sound off) and a Listen page type. The user, 2026-10-04: Sela Mor is the bar — "the kit must make sites like this".
**Added from #13 (2026-10-04, the user's OK):** the Curriculum section (modules with their lessons and outcome; course
sites' Curriculum page now starts with it) and the Grading Suite palette (grading-room black, warm white, skin-tone
peach) — the user disliked Night Shift's Wet Slate; palettes are now picked by fit and previewed on a real page.

**Order:** 11 (photos only) → 12 → 15 → 13 → 14 (the heaviest film last). Any row can be swapped by the user.

## Re-recordings wanted (2026-10-03)

The section clips below are a held still frame, because the recording never stopped on them. A re-recording that rests
~4 s on each (page still, no scrolling; hover inside the part is good) turns them into live clips. Drop new recordings
in `examples/{slug}/media-src/recording/`.

| Site | Sections |
|---|---|
| Fennwood | intro, menu, gallery, reservation, location, faq, footer |
| Sticky Weather | featured-work, manifesto, journal, contact-cta, about |
| Hexmint | clients, feature-rows, feature-grid, integrations, testimonials, contact-cta, how-it-works (let the text scramble finish) |
| Lowfield Nights | the home first screen (for its site clip), intro, schedule, team, location, reservation, menu, faq, footer |
| Velmira | the home first screen (for its site clip), intro, feature-rows, journal, reservation, lookbook, gallery, location, faq, footer (no footer hovers) |
| Slow Atlas | editorial-story, journal, categories |
| Halvik | product-highlight, feature-rows, press, testimonials, pricing, trust, contact-cta, footer (no hovers), feature-grid, how-it-works |
| Hane | services, how-it-works, testimonials, pricing, reservation |
| Brasshand | manifesto, case-study, clients, services, journal |
| Saint Ashe | journal, newsletter, lookbook, editorial-story, team, product-grid, contact-cta, footer, about (faq, collection, location: longer still moments) |

## 10. Progress

| # | Site | Recipe | Media brief | Media | Build | Capture | Registered | Kit (§8) |
|---|---|---|---|---|---|---|---|---|
| 1 | Blog — Slow Atlas | ✓ (`examples/slow-atlas/opuskit.json`) | ✓ (§7) | ✓ 10/10 (`media-src/SOURCES.md`) | ✓ Prompt 1 + Prompt 2 (fix round 1, run by a subagent); `next build` passes, all routes static | ✓ poster + 13 s clip (from the live export, hero reveal included) | ✓ 2026-10-01: `examples.ts`, symlink, zip, live at `/live/slow-atlas` (click-through checked), `npm run check` ✓; `ulooklonely` removed | ✓ 2026-10-01: site clip + 6 section clips; shown in Design, Pages and `/examples/slow-atlas` |
| 2 | Agency — Brasshand | ✓ (`examples/brasshand/opuskit.json`, approved) | ✓ (§7) | ✓ 10/10 (`media-src/SOURCES.md`, Unsplash connector; work-4 replaced after the build — real label logo) | ✓ Prompt 1 + Prompt 2 (fix round 1), both by a subagent; 17 static routes | poster + card ✓; clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-01: `examples.ts`, symlink, zip, live at `/live/brasshand` (click-through checked), `npm run check` ✓; cheeky911 not yet removed (needs the user's OK) | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 3 | SaaS — Hexmint | ✓ (`examples/hexmint/opuskit.json`, approved) | ✓ (§7: no files) | ✓ none needed | ✓ Prompt 1 (subagent; resumed once after an API limit); no fix round | card ✓ (poster rendered from the scene); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/hexmint` (click-through checked), `npm run check` ✓ | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 4 | Studio — Sticky Weather | ✓ (`examples/sticky-weather/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 14/14 (`media-src/SOURCES.md`, Unsplash connector) | ✓ Prompt 1 (subagent, resumed once after an interrupted session) + Prompt 2 (fix round 1: mobile stickers over the hero text); all routes static | poster + card ✓; clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/sticky-weather` (click-through checked), `npm run check` ✓; cheeky911 not yet removed (needs the user's OK) | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 5 | Product — Halvik | ✓ (`examples/halvik/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 6/6 (`media-src/SOURCES.md`, Unsplash connector; fox keycap mark retouched in 4) | ✓ Prompt 1 (subagent, resumed twice) + Prompt 2 (fix round 1: hero crop, buy bar off Contact) + Prompt 3 (fix round 2: framed hero beside the headline on desktop); all routes static; reviewed 1440 + 390 | card ✓ (from the live export); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/halvik` (click-through checked), `npm run check` ✓; `keepers` removed, kit product world → Halvik | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 6 | Clinic — Hane | ✓ (`examples/hane/opuskit.json`, approved 2026-10-02) | ✓ (§7) | ✓ 8/8 (`media-src/SOURCES.md`, Unsplash connector) | ✓ Prompt 1 (subagent); no fix round; all routes static; reviewed 1440 + 390 | card ✓ (from the live export); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-02: `examples.ts`, symlink, zip, live at `/live/hane` (click-through checked), `npm run check` ✓ | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 7 | Restaurant — Fennwood | ✓ (`examples/fennwood/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ 8/8 (`media-src/SOURCES.md`, Unsplash connector; 3 cropped) | ✓ Prompt 1 + Prompt 2 (fix round 1: travelling mark kept in the margin, phone bar off the footer); all routes static; reviewed 1440 + 390 | card ✓ (from the live export); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/fennwood` (click-through checked), `npm run check` ✓; `kofii` removed, kit food world → Fennwood | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 8 | Fashion shop — Saint Ashe | ✓ (`examples/saint-ashe/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ video (Pexels, found and downloaded by Claude) + 17 photos (`media-src/SOURCES.md`, Unsplash connector; 7 cropped) | ✓ Prompt 1 + Prompt 2 (fix round 1: giant words whole, phone collection layout); video re-encoded within budget; all routes static; reviewed 1440 + 390 | card ✓ (from the live export, video frames); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/saint-ashe` (click-through checked), `npm run check` ✓; `buytolose` removed, kit shop world → Saint Ashe | ✓ 2026-10-03: site, section, effect and big-idea clips |
| 9 | Hotel / spa — Velmira | ✓ (`examples/velmira/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ film (Pexels) + sound (Pixabay) + 11 photos (Pexels, `media-src/SOURCES.md`; 2 graded) | ✓ Prompt 1 + Prompt 2 (fix round 1: sound switch into the menu bar); all routes static; reviewed 1440 + 390 | card ✓ (from the live export, film frames); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/velmira` (click-through checked), `npm run check` ✓ | ✓ 2026-10-03: section, effect and big-idea clips; **no site clip** — the recording misses the film first screen |
| 10 | Event — Lowfield Nights | ✓ (`examples/lowfield-nights/opuskit.json`, 2026-10-03) | ✓ (§7) | ✓ film + 9 photos (Pexels, `media-src/SOURCES.md`; 4 cropped/graded) | ✓ Prompt 1 (resumed once after an API limit) + Prompt 2 (fix round 1: footer name fits, phone stop label clears controls); scrub film re-encoded within budget; all routes static; reviewed 1440 + 390 | card ✓ (from the live export, film frames); clips ✓ 2026-10-03 (cut from the user's recording) | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/lowfield-nights` (click-through checked), `npm run check` ✓; `swiss-modern-event-site-claude-code` removed, kit event world → Lowfield | ✓ 2026-10-03: section, effect and big-idea clips; **no site clip** — the recording misses the film first screen |
| 11 | Portfolio — Inkwell & Moth | ✓ (`examples/inkwell-moth/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ 25 photos (Pexels, `media-src/SOURCES.md`; 1 cropped) | ✓ Prompt 1 (subagent, resumed once after an API limit); all routes static; reviewed 1440 + 390 | card + poster ✓ (from the live export, after the gate); clips: waiting for the user's recording | ✓ 2026-10-03: `examples.ts`, symlink, zip, live at `/live/inkwell-moth` (click-through checked), `npm run check` ✓ | clips open |
| 12 | Nonprofit — Kür Delta Watch | ✓ (`examples/kur-delta-watch/opuskit.json`, approved 2026-10-03) | ✓ (§7) | ✓ film (the user's pick) + 19 photos (Pexels, `media-src/SOURCES.md`; 1 cropped) | ✓ Prompt 1 (subagent); all routes static; reviewed 1440 + 390; no fix round | card ✓ (from the live export); clips: waiting for the user's recording | ✓ 2026-10-04: `examples.ts`, symlink, zip, live at `/live/kur-delta-watch` (click-through checked), `npm run check` ✓ | clips open |
| 13 | Course — Night Shift | ✓ (`examples/night-shift/opuskit.json`, approved 2026-10-04) | ✓ (§7) | ✓ 3 clips (the user's; clip-1 used only as one cropped still — brand signs) → 3 log/graded pairs + monitor loop; 8 photos (Unsplash; 1 retouched), `media-src/SOURCES.md` | ✓ Prompt 1 (subagent; stopped once on a permission check, once on an API limit, resumed each time); all routes static; reviewed 1440 + 390; no fix round | card ✓ (from the live export); clips: waiting for the user's recording | ✓ 2026-10-04: `examples.ts`, symlink, zip, live at `/live/night-shift` (click-through checked), `npm run check` ✓ | clips open |
| 14 | Real estate — Aster House | ✓ (`examples/aster-house/opuskit.json`, approved 2026-10-04) | ✓ (§7) | ✓ film (the user's pick, Pexels 7578547) + 15 photos (Pexels), `media-src/SOURCES.md` | ✓ Prompt 1 (subagent); 19 static routes; reviewed 1440 + 390; no fix round | card ✓ (from the live export, film frames); clips: waiting for the user's recording | ✓ 2026-10-04: `examples.ts`, symlink, zip, live at `/live/aster-house` (click-through checked), `npm run check` ✓ | clips open |
| 15 | Personal brand — Sela Mor | ✓ (`examples/sela-mor/opuskit.json`, approved 2026-10-04) | ✓ (§7) | ✓ film (the user's pick, made black and white) + sound and 6 Listen tracks (Pixabay, picked by Claude at the user's request) + 16 photos (Pexels; 1 retouched), `media-src/SOURCES.md` | ✓ Prompt 1 (subagent); all routes static; reviewed 1440 + 390; no fix round | card ✓ (from the live export); clips: waiting for the user's recording | ✓ 2026-10-04: `examples.ts`, symlink, zip, live at `/live/sela-mor` (click-through checked), `npm run check` ✓ | clips open |

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
