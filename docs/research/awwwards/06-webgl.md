# Part 6 — WebGL, 3D and texture

**Source:** part 1 (44% of the 93 winners tagged 3D, 45% WebGL, 33% Three.js), part 3's browser measurements (a WebGL
canvas on 71% of the 49 scroll and transition winners) and its contact sheets (2026-10-11).

## What the winners do with it

- **A real object, held and turned** — a product, a drone, a helmet, a watch (Nick Ho, Lidar Drone, USAvionix, The
  Watch). OpusKit: `model-stage` (three) since batch 5, with the 3D first screen.
- **Photos treated as surfaces** — rippling, bending, curved walls (Jesper Landberg, Gil Huybrecht). OpusKit:
  `ripple-image` (plain WebGL), `ring-carousel`, `image-field`, `photo-dome`.
- **Points and scans** — a word or an object drawn as a cloud of points (Lidar Drone's point cloud, Dragonfly's
  scanned dragonfly).
- **Speed you can feel** — pictures that lean and stretch with a fast scroll.
- **Texture** — grain and dither over flat colour. OpusKit: `shader-grain`, `shader-dither`, `grain`.

## What moved into OpusKit

- `dot-word` — the name as a field of points that part around the pointer and drift home (Canvas 2D, no library;
  draws only while something moves); moment `name-of-points` for technical, futuristic and product sites.
- `speed-bend` — pictures that skew and stretch a little with scroll speed and spring straight (transform only).

Both give the look of a WebGL site without its weight: no shader to compile, nothing drawn when nothing moves, and
the same on phones. Heavier ideas — a point-cloud scan of a real object, a full 3D scene — stay with `model-stage` and
the owner's own model.
