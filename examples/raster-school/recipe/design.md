# Raster School — Precise Swiss Modern Course Site

Raster School: A six-week evening course in typographic design: grids, lettering and a poster of your own at the end. Twelve seats a cohort, in our studio or online. A course site in the Swiss Modern look: the Grid Discipline lettering (Zalando Sans), the Klein Field palette, typography leading and still motion. Primary goal: apply or enrol.

Complexity: light · Recipe id: swiss-modern

## Room to invent

This recipe fixes what the owner chose and leaves the rest to you — and a literal, safe build of it is a failure too. The test: the owner recognises every part they picked, and is surprised by how good it feels.

### Locked — the owner chose these; keep them
- Colours: the Klein Field tokens in tokens.css — tints and shades of them are fine, new hues are not.
- Lettering: Zalando Sans, each in its role.
- Pages and the order of their parts: Home (Hero → Manifesto → Process → Team → Testimonials → Pricing → Schedule → FAQ → Closing CTA); Curriculum (Curriculum → Process → FAQ); Enrol (Pricing → FAQ → Testimonials); Instructor (About → Stats → Testimonials); FAQ (FAQ).
- Each part’s design as the owner picked it (recipe/layout.md); the menu “Floating pill”, the footer “Big name”, the shape “Sharp”, the first screen “Typographic statement”.
- The facts in the copy deck — names, prices, times, places, promises. Sharpen the wording; never the facts.
- The owner’s files and the shot list (what each picture shows, its ratio).
- One system, accessibility and speed (build/verification.md).

### Free — yours to design, and expected
- Composition inside each part: scale, offsets, overlaps, crops, where the empty space goes — beyond the reference code’s defaults, as long as the part stays recognisable.
- The hand-over between parts: a shared edge, a colour turn, a line that carries on, a change of pace — the page reads as one piece, not stacked blocks.
- Typographic moments: where a headline breaks, one word set larger or in the italic, numerals, captions, small labels.
- Every state: hover, focus, press, loading, empty, success, error, the 404 — each in the style’s voice.
- Small details that make it feel made by hand for this owner: a caption that follows, a counter, a line in the footer, the favicon.
- Where the recipe is silent, decide as a designer of this style would — never the plainest default.

### Your move
- Every page gets one moment people remember. Home has it: the first screen (Typographic statement). Design one yourself for: Curriculum, Enrol, Instructor, FAQ.
- Start from the sparks in “What Swiss Modern is known for”, or invent a better one. Make it this owner’s — tied to their words, pictures or trade — not a stock effect.
- This site doesn’t move (motion: Still): your moment is composition, type or an interaction state — a size, a crop, a reveal on hover — not an animation.
- Use at least three of the style’s moves and every craft detail that fits; avoid its traps.
- Name each moment in your plan before you build, and again in your final reply — so the owner can see what you added.

## Creative Direction

**Mood:** Rational, Direct, Timeless, Technical

**Personality:** Technical — exact and knowledgeable

### Visual principles
- Objective structure
- Hierarchy through size and position
- Motion only to clarify

### Do
- Use a visible 12-column rhythm
- Set big numbers and short labels
- Use one signal color

### Avoid
- Soft shadows
- Ornament
- Script or decorative fonts

### Not the generic AI look
- A cream or beige page ground with a clay/terracotta accent
- A near-black ground with one acid-green or orange accent, or tinted charcoal standing in for black
- Small uppercase, letter-spaced monospace labels above every heading
- Numbered markers (01 / 02) on content that is not a real sequence
- Meta strings joined with middle dots or spaced em dashes, and "→" appended to links
- One italic or coloured accent word inside an otherwise plain headline
- Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts
- Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block
- Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit

### Design principles
- Objective structure
- Hierarchy through size and position
- Motion only to clarify
- No ambient motion. Only state feedback (hover, focus, press) using short CSS transitions.

## What Swiss Modern is known for

What the best sites in this style do — from OpusKit’s study of award sites and from the sites it has built. Not a checklist to copy: use it to design like someone who knows the style.

### Its moves
- The wordmark split to the two edges of the screen, the space between left empty on purpose.
- Small labels pinned to the four corners of the viewport, so every screen reads as a composed poster.
- Photos turned halftone or dithered and set inside a 1px hairline grid, with one flat colour block among them.
- Work as a ruled table: name, client, type and year in columns, with a count beside the heading, like Work (14).
- A live local clock or availability line in the menu bar, the same small size as the links.
- Once per site, a whole band in the committed signal colour with pure black or white type on it.

### The craft
- Huge type at light or regular weight, tracked tight, line-height under 1: size and position do the work, not boldness.
- Rules are 1px and sit on the same column lines as the text; no image or button floats off the grid.
- The signal colour lands on one thing per screen (a figure, a block, the active link), never on borders or icons.
- The footer as two flush blocks: the wordmark on black beside the invitation on the signal colour.

### Sparks — seeds for a remembered moment
- The wordmark split to the screen edges in the hero, closing into one word by the time you reach the footer.
- Corner labels that change per chapter: section name top left, its place in the page top right, local time bottom right.
- Photos that sharpen from a coarse dither to the full picture as they enter the grid, then stay still.

### Traps
- The grid drawn as boxes round everything instead of hairline columns: it turns Swiss into a spreadsheet.
- Heavy bold grotesk at every level with no big jump in size, so nothing leads.
- Small uppercase letter-spaced mono labels over every heading: the award-site uniform, not Swiss.

Learned from: Aspen Search, bleibtgleich'26, Dragonfly Redux, PP Neue Montreal, Inkfish, Boc.Studio.

## Award checklist

What separates an award-winning site from a good template (from a study of 12 Awwwards sites). Check every page against it.

- One idea: everything serves the creative direction. A part that doesn’t serve it gets quieter, not louder.
- One moment per page that people remember — and only one: on Home it is the first screen (Typographic statement), on other pages one you design (Room to invent). Never a stock effect pasted in — it grows out of this style; everything else on the page supports it.
- Type scale contrast: the biggest Zalando Sans size is at least 6× the body size on desktop, labels stay small (11–14 px, Zalando Sans), and nothing in between competes.
- Motion choreography: one thing moves at a time; each arrival enters, holds and leaves; staggers of 40–80 ms; the same one or two easings everywhere.
- The first seconds: the first screen is complete and readable before anything animates.
- Mobile is its own composition: headlines re-broken by hand, media re-cropped, pinned and hover effects replaced by their mobile versions — never a squeezed desktop.
- The ending is designed: the footer (Big name) is a moment, not leftovers
- Craft details: text selection in the accent colour, a favicon from the logo, designed focus states, no layout shift, real copy everywhere, a 404 page in the same voice.
- Smooth is part of the effect: 60 fps on a mid-range laptop; animate only transform, opacity and clip-path; nothing runs off-screen.

## Why It Works

### Why the visual direction works
A strict grid and objective type make information feel trustworthy and easy to scan.

### Why the typography works
Swiss rigour from one 2025 neo-grotesk with a width axis: hierarchy by weight and width only, without the Helvetica/Inter look.

### Why the palette works
A full field of saturated blue is the gallery-wall move: the colour is the identity, not a detail. White type on it is fearless and extremely legible.

### Why the layout works
A visible modular grid makes dense content scannable and gives the brand an objective, confident structure.

### Why the motion works
Stillness puts content first and is the fastest, most accessible option.

### Why the chosen assets work
Typography-led sites are fast, accessible and distinctive — the words and the visual become the same thing.

## References

Study the principle. Build something original — never copy a referenced site.

### Siteinspire — education (Siteinspire)
https://www.siteinspire.com/
- **Study:** How courses show what you learn, who teaches it and when it starts.
- **Why it matters:** Sites of the same kind show what visitors of this kind expect to find, and in which order.
- **Principle:** Meet the visitor’s expectations, then surprise

### Typography in web design (Awwwards)
https://www.awwwards.com/websites/typography/
- **Study:** Grotesk-driven layouts: how size jumps (not color) build hierarchy.
- **Why it matters:** Fewer variables make the system easier to scale across pages.
- **Principle:** Hierarchy via scale

### CSS Design Awards gallery (CSS Design Awards)
https://www.cssdesignawards.com/website-gallery
- **Study:** Grid-visible layouts: how rules and modules organise dense content.
- **Why it matters:** A visible grid turns density into order.
- **Principle:** Modular structure

### Siteinspire — Swiss/International filter (Siteinspire)
https://www.siteinspire.com/
- **Study:** Flush-left typographic compositions and strict alignment.
- **Why it matters:** Alignment gives long pages a navigable rhythm.
- **Principle:** Systematic alignment
