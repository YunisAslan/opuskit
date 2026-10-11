# Part 1 — The winners as data

**Source:** the 93 most recent Sites of the Day on Awwwards (2026-07-11 → 2026-10-11), collected 2026-10-11 by
`scripts/research/awwwards-sotd.mjs` into `data/sotd.json`: each site's tags, jury scores, palette, pitch and live URL.

## What the numbers say

**What the jury rewards and punishes.** Average scores out of 10: design 7.32, **usability 7.10 (the lowest, every
time)**, creativity 7.42 (the highest), content 7.35, overall 7.28 (range 6.93–7.99). A winner is creative first; the
jury marks it down for being hard to use. OpusKit's craft rules (press, phones, reduced motion, readable contrast) are
exactly where winners lose points — our sites can win there.

**What they are.** Categories: Web & Interactive 39, Design Agencies 26, Technology 24, Business & Corporate 18,
Promotional 14, Luxury 13, Experimental 13, Architecture 9. Portfolios and agencies dominate; shops are rare (6).

**What they do** (share of the 93):

| Tag | Sites | Share | In OpusKit today |
|---|---|---|---|
| Animation | 45 | 48% | yes — pieces, moments |
| **3D** | 41 | 44% | thin — one WebGL first screen (Hexmint), shaders |
| Typography (as the feature) | 24 | 26% | partly — kinetic type, giant word |
| Portfolio | 23 | 25% | yes |
| **Storytelling** | 22 | 24% | thin — no scroll-told story sections |
| Microinteractions | 21 | 23% | yes — craft.ts |
| Clean | 19 | 20% | — |
| Transitions | 16 | 17% | yes — three page changes |
| Scrolling | 13 | 14% | yes — pinned stage, tilted grid |
| Colorful | 12 | 13% | — |
| **404 pages** | 10 | 11% | **no** — a winner designs its 404 |
| Footer Design | 9 | 10% | yes — big-name footer |
| Sound-Audio | 7 | 8% | yes — ambient sound |
| Infinite Scroll | 6 | 6% | no |
| Data Visualization | 6 | 6% | no |

**What they are built with.** GSAP 52 (56%), WebGL 42 (45%), Three.js 31 (33%), Webflow 20, Next.js 14, Vue.js 7,
Blender 6. GSAP is now allowed in OpusKit (the user, 2026-10-11), for what Motion does less well (scroll timelines,
split text). WebGL/Three.js is the real gap.

**Colour.** Palettes are tiny: 73 of 88 list **two** colours, 15 list one. **37 of 88 are greyscale only** — black,
white, grey — and 38 of the two-colour palettes are a near-black and a near-white. Only about a quarter add one vivid
colour. Winners let photography, film and 3D bring the colour; the interface stays black and white plus at most one
signal.

**The top twelve** (overall): Santioni Spirits 7.99 (illustration, sound, storytelling), Léo Parpeix 7.66 (portfolio,
type, transitions, 3D), Made With Gsap 7.64, Lama Lama 7.61, Jesper Landberg 7.57 (infinite scroll), Michael Gatt 7.57
(project pages, 404), Lidar Drone Scanning 7.55 (3D, storytelling), Gil Huybrecht 7.53 (infinite gallery), Why Zero
7.52 (sound, 3D, storytelling), Colonia Zacamil 7.49 (3D), The Watch 7.46 (360, 3D), NOTHIN' 7.46 (parallax, 3D).
Live links are in `data/sotd.json` — they are part 3's and 6's study list.

## What this means for OpusKit (proposals — to decide with the user)

1. **A designed 404 in every package** — 11% of winners show theirs. Small, cheap: one line in the Build Package
   asking for a 404 that is one of the site's remembered moments.
2. **Usability as our edge** — winners score lowest there. Keep craft.ts strict; add the checks the jury names
   (accessibility, responsive, semantics) to verification where missing.
3. **Black-and-white palettes as first-class** — 42% of winners are greyscale. Make sure strong monochrome palettes
   exist and lead for agencies, portfolios, technology and luxury (part 4 tests this against check.ts).
4. **3D is the biggest gap** (44% of winners, one first screen in OpusKit) — part 6.
5. **Storytelling** (24%) — scroll-told sections are thin in OpusKit — part 3.

Applied 2026-10-11: 1 (`JURY_QA` in `build-packages/craft.ts`: a designed 404, semantics and meta, keyboard and
focus, speed — in all five packages), 2 (same), 3 (palette White Box, led for fashion, studio, agency, portfolio).

Batch 1 of new ingredients (2026-10-11), from what the tags above show and OpusKit had only in words: `side-scroll`
(Scrolling, 14%), `scroll-story` (Storytelling, 24%), `proximity-type` (Typography, 26%) — pieces in `src/pieces/`,
GSAP for the two that pin and scrub. Batch 2: nine moments linked to existing pieces; `photo-dome`, `pixel-swap`,
`spotlight`, `hover-preview`, `ripple-image` (WebGL, 45% of winners use it).

Not taken: Webflow (we build code), anything that needs the original sites' assets.
