# Canopy — immersive full-screen slider

A dependency-free, layered parallax slider: full-screen scenes, a slanted wipe
transition with depth-based layer travel, letter-by-letter headline reveals,
mouse parallax, hotspots, menu overlay, custom cursor and a preloader.

All artwork is drawn procedurally on `<canvas>` (`scenes.js`), and all copy is
placeholder (`slides.js`) — replace both with your own.

## Run

Any static server works (ES modules need http, not file://):

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Controls

Mouse wheel / trackpad, arrow keys, PageUp/PageDown, swipe on touch, the right
rail, or the menu. Deep links: `#/dawn`, `#/canopy`, `#/river`, `#/fireflies`,
`#/lagoon`, `#/frog`.

## Customising

- **Content**: edit `SLIDES` in `slides.js` (`title` lines, `text`, `cta`, `card`, `hotspots`).
- **Scenes**: each slide's `scene` is an ordered list of layers. Static layers
  (`ops`) are pre-rendered once; dynamic layers (`dyn`: `mist`, `particles`,
  `birds`, `rays`) animate every frame. `depth` controls parallax/transition
  travel, `blur` gives depth-of-field, `res` lowers render resolution for soft
  layers.
- **Timing**: `DURATION` in `app.js`; easing in `styles.css` (`--ease`).

Any painter option can take a `portrait: { ... }` override (used on tall/mobile screens), and hotspots can set `portraitAt` alongside `at`.
