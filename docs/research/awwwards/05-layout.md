# Part 5 — Layout and navigation

**Source:** all 93 Sites of the Day from part 1, opened in a headless browser on 2026-10-11 by
`scripts/research/awwwards-layout.mjs` (`data/layout.json`): the header, the menu (opened where it hides behind a
button) and the footer; the top 16 also as screenshots of the open menu and the footer (outside the repo).

## What the data says

- **Headers stay and stay small:** 74% keep the header fixed or sticky; the median header shows **3 links**, and 45%
  show two or fewer — the logo, one or two words, the action.
- **A menu button on 23%**; what it opens is mostly a panel, not a full screen of huge type (only 3 of 21 set the
  links larger than 4vw). Lama Lama and Butter open a compact panel from the button's corner: ruled rows, a picture,
  two actions at the foot.
- **Footers:** 39% are tall (most of a screen); 18% carry a huge wordmark. The striking ones put the name huge and
  faint *behind* the product (USAvionix, The Watch) or end on one big invitation (Made With GSAP, Lidar Drone).

## What moved into OpusKit

- Menu **Corner panel** (`corner-panel`): a Menu button opens a ~380px ruled panel from its corner — pages, a picture
  of the page pointed at, two actions. Recommended for product sites (a kind no example has yet, so no built site's
  menu changes); drawn in `MenuDemo`.
- Footer **The name behind the thing** (`stage`, `Footer.tsx`): the name across the width at ~12%, the product
  cut-out or one photo in front, one invitation and action. Recommended for sites led by their product or a 3D
  object (every built example keeps the footer its layout.md names).

Already in OpusKit: big-name footers (wordmark, full / cropped / outline), contact footers, the full-screen menu, the
card menu, the side index.
