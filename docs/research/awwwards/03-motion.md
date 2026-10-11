# Part 3 — Transitions and scroll

**Source:** the 49 Sites of the Day from part 1 tagged Transitions, Scrolling, Parallax, Storytelling or Infinite
Scroll, opened in a headless browser on 2026-10-11 by `scripts/research/awwwards-motion.mjs` and measured
(`data/motion.json`); the top 12 also scrolled through as contact sheets (kept outside the repo, for study only).

## What the data says (share of the 49)

| What | Share | In OpusKit |
|---|---|---|
| clip-path in use (reveals, masks, wipes) | 73% | yes — curtain, morph, scroll-story wipe; now a shaped window |
| a WebGL canvas | 71% | ripple-image, model-stage, shaders |
| Lenis smooth scroll | 63% | yes — SmoothScroll, a whole-site extra the owner picks |
| video | 51% | film first screens |
| sticky parts | 43% | pinned stage, sticky cards, scroll-story |
| split lettering (chars / words / lines) | 43% | cut reveal, text effect; now letters that gather |
| a preloader | 41% | yes — Preloader |
| mix-blend-mode | 39% | — |
| a custom cursor | 27% | brand cursor, cursor area |
| a page-transition library (Barba, Swup, Taxi) | 24% | four page changes + the picture that becomes the page |
| GSAP on `window` | 24% (a floor — most bundle it) | allowed since 2026-10-11 |

Pages are long: median 10 screens.

**What the contact sheets show** (top 12): an age or sound gate before the site (Santioni, Michael Gatt — OpusKit's
entry gate); a sentence whose letters gather as it scrolls in (Made With GSAP); a curved 3D wall of projects
(Jesper Landberg — ring carousel); an infinite overview grid (Gil Huybrecht — image field); one object held while the
chapters change around it, with callouts (Lidar Drone, USAvionix — product highlight, model stage); a small arch window
on a coloured ground that opens into the full photograph while the words beside it draw apart (ERA Residence); a
blurred giant word passing behind (Dragonfly).

## What moved into OpusKit

- `mask-reveal` — the window that opens onto the picture (arch, circle or frame), GSAP pin + scrub; its own moment
  `window-opens` (hotels, real estate, restaurants, heritage…). The older "scroll into a full-screen image" moment
  stays on PinnedStage, since a built example (Kür Delta Watch) made that one.
- `letters-assemble` — letters that gather into a sentence, GSAP scrub with an even ease (a front-loaded curve
  finished half the gathering in the first fifth of the scroll); moment `letters-gather`.

## Decided

- Smooth scroll (63% of these winners) is now the default for dynamic and immersive recipes (the user, 2026-10-11);
  still and subtle ones get it only when the owner picks it.
