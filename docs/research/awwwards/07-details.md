# Part 7 — Details: the 404 page

**Source:** each of the 93 Sites of the Day from part 1, opened on 2026-10-11 at an address that does not exist
(`/opuskit-missing-page`) by `scripts/research/awwwards-404.mjs` (`data/404.json`); the designed ones screenshotted
outside the repo.

## What the data says (91 reachable)

- **Half design it:** 45 (49%) show their own page — it says it is lost, has a way home and more than a few words.
- **The status is often wrong:** 74 answer 404, but 13 answer **200** (a "soft 404" search engines index as a page).
- **The headline comes from the brand's world**, not "Page not found": Nick Ho (racing) "Welcome to Turn 404"; Paul
  Kalkbrenner (music) "Track not found"; United Carriers (freight) "You've taken a wrong turn", a lorry in front of a
  ghosted "PAGE NOT FOUND"; Boc Studio "Exploration is also part of our process, but you are lost", a giant 404 in the
  brand's orange with the line running across it; House of Honey "We couldn't find that page. But our doors are
  always open."
- Two of three designed ones carry a picture, a film or a drawing; most keep the menu.

## What moved into OpusKit

The 404 line in `JURY_QA` (`build-packages/craft.ts`, every package's verification and its interaction-craft guide)
is now concrete: a real 404 status from `app/not-found.tsx`, a headline from the brand's own world (with the examples
above), the site's own big move (giant word, product, photography), the menu and footer kept, home and the main
action offered.

This closes the study plan (parts 1–7). Forms and microcopy were left out: the winners' forms are few and plain, and
OpusKit's craft rules (sending a form, focus, errors) already go further.
