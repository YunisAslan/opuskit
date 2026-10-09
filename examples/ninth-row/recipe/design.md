# Ninth Row — Nocturne Film-inspired Event Site

Ninth Row: A 120-seat arthouse cinema: new and old films every night, a late-night series on Fridays, tickets for every screening. An event site in the Film-inspired look: the Tall Order lettering (Sofia Sans Extra Condensed with Sofia Sans), the Grading Suite palette, video leading and immersive motion. Primary goal: book or reserve.

Complexity: advanced · Recipe id: cinematic-editorial

## Room to invent

This recipe fixes what the owner chose and leaves the rest to you — and a literal, safe build of it is a failure too. The test: the owner recognises every part they picked, and is surprised by how good it feels.

### Locked — the owner chose these; keep them
- Colours: the Grading Suite tokens in tokens.css — tints and shades of them are fine, new hues are not.
- Lettering: Sofia Sans Extra Condensed, Sofia Sans Condensed, Sofia Sans, each in its role.
- Pages and the order of their parts: Home (Hero → Intro → Schedule → Featured Work → Newsletter); Programme (Schedule → Featured Work); Tickets (Reservation → Pricing → FAQ); Visit (Location → FAQ); About (About → Team).
- Each part’s design as the owner picked it (recipe/layout.md); the menu “Centered logo”, the footer “Signature columns”, the shape “Sharp”, the first screen “Scroll-controlled video”.
- The facts in the copy deck — names, prices, times, places, promises. Sharpen the wording; never the facts.
- The owner’s files and the shot list (what each picture shows, its ratio).
- The effects the owner picked: Smooth scroll (Whole site — mount once in app/layout.tsx); Curtain between pages (Whole site — every internal link; mount once in app/layout.tsx).
- One system, accessibility and speed (build/verification.md).

### Free — yours to design, and expected
- Composition inside each part: scale, offsets, overlaps, crops, where the empty space goes — beyond the reference code’s defaults, as long as the part stays recognisable.
- The hand-over between parts: a shared edge, a colour turn, a line that carries on, a change of pace — the page reads as one piece, not stacked blocks.
- Typographic moments: where a headline breaks, one word set larger or in the italic, numerals, captions, small labels.
- Every state: hover, focus, press, loading, empty, success, error, the 404 — each in the style’s voice.
- Small details that make it feel made by hand for this owner: a caption that follows, a counter, a line in the footer, the favicon.
- Where the recipe is silent, decide as a designer of this style would — never the plainest default.

### Your move
- Every page gets one moment people remember. Home has it: the first screen (Scroll-controlled video). Design one yourself for: Programme, Tickets, Visit, About.
- Start from the sparks in “What Film-inspired is known for”, or invent a better one. Make it this owner’s — tied to their words, pictures or trade — not a stock effect.
- Keep it inside the motion level (Immersive) and the Locked list; give it a mobile and a reduced-motion version.
- Use at least three of the style’s moves and every craft detail that fits; avoid its traps.
- Name each moment in your plan before you build, and again in your final reply — so the owner can see what you added.

## Creative Direction

**Mood:** Nostalgic, Warm, Dramatic, Mysterious

**Personality:** Mysterious — intriguing, reveals slowly

### Visual principles
- Frame media like film
- Title cards between chapters
- Texture adds warmth

### Do
- Use 2.39:1 letterbox crops for key media
- Add subtle grain (≤ 4% opacity)
- Center title cards

### Avoid
- Heavy vintage filters
- Fake film UI (sprocket holes)
- Cold, clinical palettes

### Not the generic AI look
- A cream or beige page ground with a clay/terracotta accent
- Small uppercase, letter-spaced monospace labels above every heading
- Numbered markers (01 / 02) on content that is not a real sequence
- Meta strings joined with middle dots or spaced em dashes, and "→" appended to links
- One italic or coloured accent word inside an otherwise plain headline
- Falling back to Inter, Space Grotesk, Syne or Fraunces instead of the recipe's fonts
- Text in mix-blend-difference (or any blend mode) over a photo — its colours turn random; text on a picture sits on a scrim or a solid block
- Effects nobody picked: no text effect, hover, cursor or scroll trick beyond the recipe's motion system and Your Kit

### Design principles
- Frame media like film
- Title cards between chapters
- Texture adds warmth
- Pinned, scroll-driven sequences where media and type are choreographed together.

## What Film-inspired is known for

What the best sites in this style do — from OpusKit’s study of award sites and from the sites it has built. Not a checklist to copy: use it to design like someone who knows the style.

### Its moves
- A letterbox intro: black bars with letters set in the four corners, opening onto the first photo.
- Small thumbnails that grow into the first screen, like frames pulled off a reel.
- A scroll-driven film with a running timecode and plain words, Forward / Pause, in place of icons.
- Posters as the work index, a grid that re-arranges itself as the visitor moves through it.
- A contact sheet of photos that opens into a sideways story, flat colour frames between the shots.

### The craft
- Warm black ground under amber footage and bone type: the warmth comes from the media, never a sepia filter.
- Title cards in a mixed-case condensed face, not all-caps Bebas, which reads as a template.
- Wide crops are real crops chosen per photo so faces and horizons sit right, never bars painted over a 16:9 frame.

### Sparks — seeds for a remembered moment
- Two doors: two tilted film cards on the first screen, each a different path through the site.
- A row of stills under the main frame; picking one cuts the main frame to it and the timecode jumps.
- A gate like an opening title: the name centred in its own period lettering, one word to enter, the page fading up from black.

### Traps
- Every section a centred title card: the pacing stalls; title cards should only mark a change of chapter.
- Letterbox crops applied mechanically to every image, cutting off heads, products or text in the photo.

Learned from: Heloise Thibodeau, Petra Garmon, Siena Film Foundation, Body of Water, Paris by Emily, lowfield-nights (built with OpusKit).

## Award checklist

What separates an award-winning site from a good template (from a study of 12 Awwwards sites). Check every page against it.

- One idea: everything serves the creative direction. A part that doesn’t serve it gets quieter, not louder.
- One moment per page that people remember — and only one: on Home it is the first screen (Scroll-controlled video), on other pages one you design (Room to invent). Never a stock effect pasted in — it grows out of this style; everything else on the page supports it.
- Type scale contrast: the biggest Sofia Sans Extra Condensed size is at least 6× the body size on desktop, labels stay small (11–14 px, Sofia Sans Condensed), and nothing in between competes.
- Motion choreography: one thing moves at a time; each arrival enters, holds and leaves; staggers of 40–80 ms; the same one or two easings everywhere.
- The first seconds: the first screen is complete and readable before anything animates.
- Mobile is its own composition: headlines re-broken by hand, media re-cropped, pinned and hover effects replaced by their mobile versions — never a squeezed desktop.
- The ending is designed: the footer (Signature columns) is a moment, not leftovers
- Craft details: text selection in the accent colour, a favicon from the logo, designed focus states, no layout shift, real copy everywhere, a 404 page in the same voice.
- Smooth is part of the effect: 60 fps on a mid-range laptop; animate only transform, opacity and clip-path; nothing runs off-screen.

## Why It Works

### Why the visual direction works
Film conventions are instantly understood; they give a site narrative pacing and emotional warmth.

### Why the typography works
Award sites use condensed grotesks big and in mixed case (Gooper Condensed at Koto's Seasoned, Freigeist Condensed at Quatre Cent Quatre, Akzidenz Condensed at WCS) — not only the Bebas all-caps poster. Three widths of one family (1–1000 weight each) keep the voice consistent from hero to footnote.

### Why the palette works
The room a colourist works in: a neutral, nearly black surround so the only colour on screen is the footage. Film and stills look richer here than on any grey; the one warm accent is the skin-tone line every grade is judged against.

### Why the layout works
Edge-to-edge media removes the frame of the browser, making the content feel like an environment, not a page.

### Why the motion works
Choreographed sequences create the memorable moments people share — used once or twice, not everywhere. Here, clip reveal and image clip reveal serve the story: every section enters like a cut in a film — image first, words second.

### Why the chosen assets work
Footage communicates atmosphere and time in a way stills cannot — the visitor feels the place or product before reading.

## References

Study the principle. Build something original — never copy a referenced site.

### Event websites (Awwwards)
https://www.awwwards.com/websites/events/
- **Study:** How events show the date, the programme and the way to come.
- **Why it matters:** Sites of the same kind show what visitors of this kind expect to find, and in which order.
- **Principle:** Meet the visitor’s expectations, then surprise

### Video in web design (Awwwards)
https://www.awwwards.com/websites/video/
- **Study:** How hero footage is framed, when it loops vs. scrubs, and how poster frames hide loading.
- **Why it matters:** The strongest examples use one continuous camera move rather than edited cuts.
- **Principle:** One continuous shot per hero

### Storytelling websites (Awwwards)
https://www.awwwards.com/websites/storytelling/
- **Study:** Chapter structure — how sites divide a story into scroll "scenes".
- **Why it matters:** Scene-based pacing is what makes long scroll feel like film, not a long page.
- **Principle:** Scroll as timeline
