# Part 2 — Typography

**Source:** the live pages of the 93 Sites of the Day from part 1, read 2026-10-11 by
`scripts/research/awwwards-fonts.mjs` into `data/fonts.json`: each site's `@font-face` families (and Google / Adobe
Fonts links). 86 of 93 could be read. Awwwards itself does not list fonts.

## What the data says

- **Grotesks everywhere.** The most used faces are neo-grotesks: Inter (8), Geist (5), Aeonik, ABC Diatype, Neue
  Montreal, Helvetica Now, Basel Grotesk, Switzer, Lay Grotesk, GT Standard, Die Grotesk, PP Mori. Most are commercial
  (Pangram Pangram, Dinamo, Grilli Type, Klim); the free ones are the ones OpusKit bans as AI defaults (Inter, Geist,
  DM Sans).
- **Mono labels: 25 of 86 sites (29%)** set their small text — navigation, dates, counts, captions — in a mono
  (Geist Mono 5, PP Supply Mono, Fragment Mono 2 each, Roboto Mono, Proto Mono…). OpusKit had it in 2 of 58 pairings.
- **Serifs are the accent, not the rule:** 16 of 86 (19%) — PP Editorial, Reckless, Roslindale, Teodor, Novela,
  Migra, Ramillas — mostly as the display voice over a grotesk body, often in italic.
- **Few families:** one family alone on 22 sites, two on 24, three on 23. Rarely more.

## What moved into OpusKit (2026-10-11)

- **The rule changed (the user's decision):** mono labels may be in up to 4 pairings, each with its own mono;
  uppercase labels stay in one (`scripts/check.ts`). The AI tell is mono + uppercase + one face everywhere.
- **Three pairings** (`src/data/ingredients.ts`), free stand-ins for the winners' formula:
  - *Studio Mono* — Instrument Sans throughout, Fragment Mono labels (for Neue Montreal / Diatype + Supply Mono);
    on Monochrome Minimal and Immersive Portfolio.
  - *Lab Notes* — Chivo with Chivo Mono (a grotesk with its own mono, like Diatype / Diatype Mono); on Technical
    Minimal and Bento Product.
  - *Spline Edition* — Brygada 1918 with real italics over Spline Sans (for PP Editorial over a grotesk); on Fashion
    Editorial and Art Editorial.

Not taken: Inter, Geist and DM Sans (AI defaults, kept out), any commercial face.
