# Pale Hour — Atelier Art Editorial Event Site

Pale Hour: A photography gallery and bookshop in an old print works: three exhibitions a year, talks on Thursdays, photobooks to take home. An event site in the Art Editorial look: the Cut Glass lettering (Prata with Public Sans), the Gallery Grey palette, photography leading and dynamic motion. Primary goal: visit in person.

Complexity: moderate · Recipe id: art-direction-studio

## Room to invent

This recipe fixes what the owner chose and leaves the rest to you — and a literal, safe build of it is a failure too. The test: the owner recognises every part they picked, and is surprised by how good it feels.

### Locked — the owner chose these; keep them
- Colours: the Gallery Grey tokens in tokens.css — tints and shades of them are fine, new hues are not.
- Lettering: Prata, Public Sans, each in its role.
- Pages and the order of their parts: Home (Hero → Intro → Featured Work → Schedule → Journal); Exhibitions (Featured Work → Gallery); Visit (Location → Schedule → FAQ); About (About → Team).
- Each part’s design as the owner picked it (recipe/layout.md); the menu “Centered logo”, the footer “Signature columns”, the shape “Sharp”, the first screen “Full-bleed photo with depth”.
- The facts in the copy deck — names, prices, times, places, promises. Sharpen the wording; never the facts.
- The owner’s files and the shot list (what each picture shows, its ratio).
- The effects the owner picked: Photos follow the cursor (Home → Hero); Tap to open large (Home → Featured Work; Exhibitions → Gallery (its photo layout)); Cut-out headline (Every page — the h1, plus at most two section headings per page (not every heading)).
- One system, accessibility and speed (build/verification.md).

### Free — yours to design, and expected
- Composition inside each part: scale, offsets, overlaps, crops, where the empty space goes — beyond the reference code’s defaults, as long as the part stays recognisable.
- The hand-over between parts: a shared edge, a colour turn, a line that carries on, a change of pace — the page reads as one piece, not stacked blocks.
- Typographic moments: where a headline breaks, one word set larger or in the italic, numerals, captions, small labels.
- Every state: hover, focus, press, loading, empty, success, error, the 404 — each in the style’s voice.
- Small details that make it feel made by hand for this owner: a caption that follows, a counter, a line in the footer, the favicon.
- Where the recipe is silent, decide as a designer of this style would — never the plainest default.

### Your move
- Every page gets one moment people remember. Home has it: the first screen (Full-bleed photo with depth). Design one yourself for: Exhibitions, Visit, About.
- Start from the sparks in “What Art Editorial is known for”, or invent a better one. Make it this owner’s — tied to their words, pictures or trade — not a stock effect.
- Keep it inside the motion level (Dynamic) and the Locked list; give it a mobile and a reduced-motion version.
- Use at least three of the style’s moves and every craft detail that fits; avoid its traps.
- Name each moment in your plan before you build, and again in your final reply — so the owner can see what you added.

## Creative Direction

**Mood:** Curated, Intellectual, Open, Sophisticated

**Personality:** Sophisticated — cultured and assured

### Visual principles
- The work is the interface
- Captions carry context
- Sequence matters more than grid

### Do
- Show works large with small metadata
- Use one accent color sparingly
- Write captions like a curator

### Avoid
- Hover effects that distort artwork
- Heavy UI chrome
- Autoplaying carousels

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
- The work is the interface
- Captions carry context
- Sequence matters more than grid
- Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

## What Art Editorial is known for

What the best sites in this style do — from OpusKit’s study of award sites and from the sites it has built. Not a checklist to copy: use it to design like someone who knows the style.

### Its moves
- One work per screen, read by scrolling, like walking past a wall.
- A contact sheet of every work that opens into a sideways sequence, flat colour blocks between photographs.
- Two covers side by side as doors into two rooms of the show.
- Artists’ names set huge over their works; the opening statement has one word that changes.
- Category labels with counts in superscript, like ‘sculptures³’, so depth shows at a glance.

### The craft
- A label for every work in museum order: artist, title in italic, year, medium, size.
- A huge hairline serif for titles, a small grotesk for every caption and label.
- Works are never cropped or rounded; each keeps its own ratio, so the grid is irregular on purpose.

### Sparks — seeds for a remembered moment
- A floor plan of the show where each marked spot opens that work and its label.
- Press and hold on a work to reveal it from a pale wash; the full work is shown when motion is off.
- Two doors on the first screen: choose a room, and the page becomes that room’s sequence.

### Traps
- A catalogue turned into a shop: same-size cards, badges and buttons on every work.
- Captions written as marketing copy instead of facts and one curator’s sentence.

Learned from: Julien Calot, Tracing Art, Hearst Exhibit 2026, Body of Water, Immersive Garden website.

## Award checklist

What separates an award-winning site from a good template (from a study of 12 Awwwards sites). Check every page against it.

- One idea: everything serves the creative direction. A part that doesn’t serve it gets quieter, not louder.
- One moment per page that people remember — and only one: on Home it is the first screen (Full-bleed photo with depth), on other pages one you design (Room to invent). Never a stock effect pasted in — it grows out of this style; everything else on the page supports it.
- Type scale contrast: the biggest Prata size is at least 6× the body size on desktop, labels stay small (11–14 px, Public Sans), and nothing in between competes.
- Motion choreography: one thing moves at a time; each arrival enters, holds and leaves; staggers of 40–80 ms; the same one or two easings everywhere.
- The first seconds: the first screen is complete and readable before anything animates.
- Mobile is its own composition: headlines re-broken by hand, media re-cropped, pinned and hover effects replaced by their mobile versions — never a squeezed desktop.
- The ending is designed: the footer (Signature columns) is a moment, not leftovers
- Craft details: text selection in the accent colour, a favicon from the logo, designed focus states, no layout shift, real copy everywhere, a 404 page in the same voice.
- Smooth is part of the effect: 60 fps on a mid-range laptop; animate only transform, opacity and clip-path; nothing runs off-screen.

## Why It Works

### Why the visual direction works
Treating content like exhibits gives it weight and makes visitors read, not skim.

### Why the typography works
The Editorial New / Canela register that award sites license (Hilden Kaira, Normal is Boring) — and that templates fake with Playfair Display (8 of our 225 sites). Prata's wedge serifs and Didone contrast read sharper and less familiar; Public Sans (Franklin-derived, USWDS) is the plain workhorse beside it, as Neue Montreal is on the real thing.

### Why the palette works
A cool gallery wall (Mille Dollars) under black type: it frames photography and 3D like a white cube, and a single vermilion keeps it from going corporate.

### Why the layout works
Editorial grids pair narrow reading columns with generous media, mimicking print — content feels curated and worth reading.

### Why the motion works
Scroll-linked motion makes the visitor feel in control of the story. Here, clip reveal and image clip reveal serve the story: sections open like turning a page — the frame first, then the words.

### Why the chosen assets work
Consistent photography builds atmosphere faster than any UI element — it is the most direct way to make visitors feel something.

## References

Study the principle. Build something original — never copy a referenced site.

### Event websites (Awwwards)
https://www.awwwards.com/websites/events/
- **Study:** How events show the date, the programme and the way to come.
- **Why it matters:** Sites of the same kind show what visitors of this kind expect to find, and in which order.
- **Principle:** Meet the visitor’s expectations, then surprise

### Art & illustration websites (Awwwards)
https://www.awwwards.com/websites/art-illustration/
- **Study:** Media cropping and overlapping type.
- **Why it matters:** Deliberate crops create tension and movement.
- **Principle:** Tension through crop

### Animation websites (Awwwards)
https://www.awwwards.com/websites/animation/
- **Study:** Page transitions that carry the concept between pages.
- **Why it matters:** Transitions that connect content feel intentional, not decorative.
- **Principle:** Meaningful transitions
