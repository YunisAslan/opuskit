# Ines Varga — Raw Conceptual Sketch Portfolio

Ines Varga: Illustrated maps for towns, trails and books, drawn by hand in ink and watercolour. Commissions open. A portfolio in the Conceptual Sketch look: the Sketchbook lettering (Caveat Brush with Winky Sans), the Gallery Grey palette, illustration leading and dynamic motion. Primary goal: get in touch.

Complexity: moderate · Recipe id: typography-first

## Room to invent

This recipe fixes what the owner chose and leaves the rest to you — and a literal, safe build of it is a failure too. The test: the owner recognises every part they picked, and is surprised by how good it feels.

### Locked — the owner chose these; keep them
- Colours: the Gallery Grey tokens in tokens.css — tints and shades of them are fine, new hues are not.
- Lettering: Caveat Brush, Caveat, Winky Sans, each in its role.
- Pages and the order of their parts: Home (Hero → Featured Work → Closing CTA); Selected Work (Featured Work → Clients); Project (Case Study Preview → Gallery → Specs → Featured Work); About (About → Testimonials → Timeline); Contact (Closing CTA → FAQ).
- Each part’s design as the owner picked it (recipe/layout.md); the menu “Full-screen menu”, the footer “Say hello”, the shape “Hairline”, the first screen “Illustrated hero”.
- The facts in the copy deck — names, prices, times, places, promises. Sharpen the wording; never the facts.
- The owner’s files and the shot list (what each picture shows, its ratio).
- The effects the owner picked: Prints on a desk (Home → Featured Work); Hand-drawn underline (Every page — menu, footer and text links); A picture that becomes the next page (Selected Work → Featured Work); A story told beside one held picture (About → About); Letters that gather into a sentence (Contact → Closing CTA); Shutter between pages (Whole site — every internal link; mount once in app/layout.tsx); Tap to open large (Project → Gallery (its photo layout)); Smooth scroll (Whole site — mount once in app/layout.tsx).
- One system, accessibility and speed (build/verification.md).

### Free — yours to design, and expected
- Composition inside each part: scale, offsets, overlaps, crops, where the empty space goes — beyond the reference code’s defaults, as long as the part stays recognisable.
- The hand-over between parts: a shared edge, a colour turn, a line that carries on, a change of pace — the page reads as one piece, not stacked blocks.
- Typographic moments: where a headline breaks, one word set larger or in the italic, numerals, captions, small labels.
- Every state: hover, focus, press, loading, empty, success, error, the 404 — each in the style’s voice.
- Small details that make it feel made by hand for this owner: a caption that follows, a counter, a line in the footer, the favicon.
- Where the recipe is silent, decide as a designer of this style would — never the plainest default.

### Your move
- Every page gets one moment people remember. Home has it: the first screen (Illustrated hero). Design one yourself for: Selected Work, Project, About, Contact.
- Start from the sparks in “What Conceptual Sketch is known for”, or invent a better one. Make it this owner’s — tied to their words, pictures or trade — not a stock effect.
- Keep it inside the motion level (Dynamic) and the Locked list; give it a mobile and a reduced-motion version.
- Use at least three of the style’s moves and every craft detail that fits; avoid its traps.
- Name each moment in your plan before you build, and again in your final reply — so the owner can see what you added.

## Creative Direction

**Mood:** Thoughtful, Human, Unfinished, Raw

**Personality:** Raw — direct and unfiltered

### Visual principles
- Show the thinking
- Hand lines, clean page
- Annotations guide the eye

### Do
- Hand-drawn underlines, arrows and circles as emphasis
- Wobbly borders (uneven radii) on cards
- One marker colour for notes, pencil grey for lines

### Avoid
- Sketch texture under body text
- Clip-art doodles
- Too many annotation colours

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
- A small label in tracked capitals, or a chip, above the hero headline (an eyebrow); the headline stands alone
- A coloured stripe down one side of a card, alert or list item (a pull quote's rule is fine); a card in a card; a grid of same-size icon tiles as the page's structure
- A hairline border under a wide soft shadow (a ghost card), a zero-offset coloured glow, gradient-filled text
- A pulsing dot or blinking caret pretending something is live, and a strip that scrolls forever when nobody picked one
- Copy in a manufactured cadence: "Not a X. A Y.", "X. No Y.", "X. Just Y." — more than one on a site — or an em dash in every other sentence

### Design principles
- Show the thinking
- Hand lines, clean page
- Annotations guide the eye
- Scroll-linked parallax, line-by-line type reveals, media transitions between sections.

## What Conceptual Sketch is known for

What the best sites in this style do — from OpusKit’s study of award sites and from the sites it has built. Not a checklist to copy: use it to design like someone who knows the style.

### Its moves
- A pencil sketch that draws itself as the visitor scrolls
- Letters built from compass arcs and construction lines
- A two-colour drawing that zooms into a plan and then a 3D model
- A hand-drawn circle around one word of a bold headline
- The team as line drawings standing in a row
- A line-drawing illustration as the footer

### The craft
- Drawings are SVG strokes, not scanned images, so they stay sharp and can trace
- One strong ground (orange, or clean paper) with graphite lines and mono labels as annotations
- Two colours only: the line and one marker

### Sparks — seeds for a remembered moment
- The founder’s sketch of the idea traces itself, then the real photo fades in behind it
- Zoom from a pencil drawing into the plan, then into the built thing
- Connect-the-dots that becomes the logo as the visitor clicks

### Traps
- Drawing animations long enough to block reading
- Handwriting fonts for paragraphs, which look dated and tire the eye

Learned from: Sculpting Harmony, SSTR - Friction Reduction, Bienal Arquitectura Urbanismo, Illoca, Artem Shcherbakov, Hero Collective.

## Award checklist

What separates an award-winning site from a good template (from a study of 12 Awwwards sites). Check every page against it.

- One idea: everything serves the creative direction. A part that doesn’t serve it gets quieter, not louder.
- One moment per page that people remember — and only one: on Home it is the first screen (Illustrated hero), on other pages one you design (Room to invent). Never a stock effect pasted in — it grows out of this style; everything else on the page supports it.
- Type scale contrast: the biggest Caveat Brush size is at least 6× the body size on desktop, labels stay small (11–14 px, Winky Sans), and nothing in between competes.
- Motion choreography: one thing moves at a time; each arrival enters, holds and leaves; staggers of 40–80 ms; the same one or two easings everywhere.
- The first seconds: the first screen is complete and readable before anything animates.
- Mobile is its own composition: headlines re-broken by hand, media re-cropped, pinned and hover effects replaced by their mobile versions — never a squeezed desktop.
- The ending is designed: the footer (Say hello) is a moment, not leftovers
- Craft details: text selection in the accent colour, a favicon from the logo, designed focus states, no layout shift, real copy everywhere, a 404 page in the same voice.
- Smooth is part of the effect: 60 fps on a mid-range laptop; animate only transform, opacity and clip-path; nothing runs off-screen.

## Why It Works

### Why the visual direction works
Makes a studio feel approachable and inventive — for architects, designers, educators and early-stage products.

### Why the typography works
Everything looks written by one hand: a brush-marker title, quick notes, and a friendly plain sans for reading — handwriting for paragraphs was the dated part.

### Why the palette works
A cool gallery wall (Mille Dollars) under black type: it frames photography and 3D like a white cube, and a single vermilion keeps it from going corporate.

### Why the layout works
A visible modular grid makes dense content scannable and gives the brand an objective, confident structure.

### Why the motion works
Scroll-linked motion makes the visitor feel in control of the story. Here, hard cut and image clip reveal serve the story: unpolished on purpose — things land like paper on a table.

### Why the chosen assets work
Illustration makes a brand unmistakably ownable — nobody else has the same drawings.

## References

Study the principle. Build something original — never copy a referenced site.

### Portfolio websites (Awwwards)
https://www.awwwards.com/websites/portfolio/
- **Study:** How the work is ordered and how little text it needs.
- **Why it matters:** Sites of the same kind show what visitors of this kind expect to find, and in which order.
- **Principle:** Meet the visitor’s expectations, then surprise

### Typography in web design (Awwwards)
https://www.awwwards.com/websites/typography/
- **Study:** Sites where type is the hero: watch how they handle line breaks and scale.
- **Why it matters:** Hand-set line breaks are what separate designed type from default text.
- **Principle:** Designed line breaks

### Scroll websites (Awwwards)
https://www.awwwards.com/websites/scrolling/
- **Study:** Scroll-linked type movement: horizontal drift, weight shifts, masking.
- **Why it matters:** Motion in type is the lightest way to make a page feel alive.
- **Principle:** Kinetic typography

### CSS Design Awards gallery (CSS Design Awards)
https://www.cssdesignawards.com/website-gallery
- **Study:** Variable-font experiments and how they stay legible.
- **Why it matters:** Readability must survive the effect.
- **Principle:** Legibility first
