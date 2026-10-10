// What excellent sites in each look are known for. Distilled from OpusKit's research (docs/research/: 163 live award
// sites, 349 element videos, the typography and colour studies) and from the sites OpusKit itself built (examples/),
// with the lessons those builds taught. Not rules — the builder keeps the owner's picks and uses this to design like
// someone who knows the style: its best moves, its craft, seeds for a remembered moment, and the traps.
// Each look's own principles / do / avoid live in taxonomy.ts; nothing here repeats them.
import type { DirectionId, LookKnowledge } from '@/types/domain'

export const lookKnowledge: Record<DirectionId, LookKnowledge> = {
  'japanese-minimal': {
    moves: [
      'The headline sits low in one corner while one tall photo holds the opposite columns; everything between is plain ground.',
      'Every photo carries a short caption naming the place and the hour, like ‘Room 2, late morning’, in the small face.',
      'One object or one photograph per screen, a single quiet serif line beside it, nothing else competing.',
      'A white or barely warm off-white ground with no accent colour at all; the photographs bring the only colour.',
      'The page reads as a walk of named stops; the current stop’s name runs vertically down the right edge.',
    ],
    craft: [
      'Labels and captions in sentence case at 12–13px, never wide-tracked capitals, which read as dated ‘elegant’.',
      'The first screen is complete on first paint; one fade-rise under 600 ms, then nothing moves until the visitor scrolls.',
      'A small live line in local time with a dot (‘Open until 7’) gives a present, human detail without decoration.',
      'The page index is one hairline tick per section; the current tick is longer and darker, and each tick is clickable.',
    ],
    sparks: [
      'The stop name set vertically down the edge, changing as each chapter arrives; still, it is a clickable index of the page.',
      'The same room shown at three hours of the day, each still captioned with its time, read top to bottom.',
      'One handmade object turning very slowly on a paper-grey ground beside a one-line caption; a still photo when motion is off.',
    ],
    traps: [
      'Emptiness without a focal point: a centred template with small text looks unfinished, not calm.',
      'Costume props such as brush strokes, ink splashes or red circles standing in for restraint.',
      'Tracked uppercase labels on everything, which turns stillness into a generic luxury template.',
    ],
    seen: ['Immersive Garden website', 'Diana Toloza - Portfolio 2024', 'Atelier Meridien', 'Yevgeniya Grab', 'Montfort', 'example:hane'],
  },
  'scandinavian-minimal': {
    moves: [
      'A small card pinned on the hero photo names what is in it and offers one useful next step.',
      'Products come with a plain spec sheet: batch number, size, what is inside, where it was made.',
      'Collections listed as a centred column of plain words instead of tiles; each word leads to its range.',
      'Steps carry real durations (‘About a minute’) beside a daylight photo of the hands doing them.',
      'A pale material-coloured ground (sage, concrete, pale wood) with near-black ink, surfaces a few shades lighter in the same hue.',
    ],
    craft: [
      'Real numbers in the copy: batch counts, opening hours in local time, minutes per step, distances.',
      'A light contemporary serif for headlines beside a plain sans, rather than one geometric sans for everything.',
      'Only photographs move: each opens once like a curtain while settling from 1.15 to 1 scale; type simply appears.',
      'Surfaces step by lightness alone; no shadows, borders only where a control needs one.',
    ],
    sparks: [
      'A ‘where you are’ pill in a corner: the current part’s name and ‘3 of 9’; open it to jump anywhere.',
      'A row of close-up material swatches (salt, oak, linen); choosing one swaps the large photo to that material.',
      'A closing line with a small material photo set between its words, like ‘made from [stone] and time’.',
      'A checkerboard of photo tiles and flat pale-colour tiles, one tile per person or product.',
    ],
    traps: [
      'A greyed mid-tone beige ground with taupe text: everything the same weight, so it reads faded rather than light.',
      'Rounded cards, icons and pill buttons on every block until it looks like an app template.',
    ],
    seen: ['Noho', 'Lyon Béton', 'Petralithe', 'cobloc', 'example:qum'],
  },
  'architectural-minimal': {
    moves: [
      'Scroll drives a walk-through film of the building; a caption names each room as the camera passes it.',
      'The name drawn from construction lines (compass arcs, ruled guides), as if set out on a drawing board.',
      'Facts as a measured table: area in m², orientation, bedrooms, status, with counts on the filter chips.',
      'A letterbox frame with labels pinned to the four corners that opens onto the first photograph.',
      'The footer is the wordmark repeated as a pattern, edge to edge, like a stamp on a drawing set.',
    ],
    craft: [
      'Captions give orientation and time (‘facing south-west, 16:00’), not adjectives.',
      'One thin line returns at every chapter title in a different pose, so the page has a single drawn motif.',
      'Status labels (Available, Reserved, Sold) are words with a small mark, not coloured badges.',
      'Display type stays below the photo’s weight: a light face, tight tracking, never bolder than the building.',
    ],
    sparks: [
      'A line of light travels down the page and rests beside each chapter title, like sun crossing a floor; still lines when motion is off.',
      'A hairline floor plan where choosing a room shows its photograph and its measurements.',
      'The same façade at each hour of the day as a stepped row of stills with times; drag or scroll moves through them.',
    ],
    traps: [
      'Glossy renders with lens flare and stock people, which read as a developer brochure rather than architecture.',
      'Rules in every direction with text that never actually sits on them: a spreadsheet, not a grid.',
      'A scroll-driven film with no poster or captions, leaving phones and reduced motion with a blank stage.',
    ],
    seen: ['Kononenko Architectural Bureau', 'LIKOVA', 'Bienal Arquitectura Urbanismo', 'MAKHNO', 'Sobha Privy Collection', 'example:aster-house'],
  },
  'monochrome-minimal': {
    moves: [
      'One grotesk set enormous and light, tracked tight (−0.02 to −0.07em), lines closer than 1.',
      'The name split to the two edges of the screen, the middle left empty.',
      'Work as a table index (name, client, type, year) with a count in the label, ‘Work [17]’; hovering a row shows its image.',
      'Clients as a stacked list of names in display type ending in full stops, never a logo strip.',
      'A chapter opens on one word far bigger than anything else, cropped by the screen edges.',
      'One full inversion mid-page, black to white or back, as the only change of ground.',
    ],
    craft: [
      'Pure black and pure white are allowed; greys exist only as small steps for secondary text and rules.',
      'The variable font’s width or weight axis is the type’s only motion.',
      'A small counter in the label face (‘02 / 05’) whenever works replace each other.',
      'Live local time or city clocks in the footer, set in the same small face as everything else.',
    ],
    sparks: [
      'The name breathes: its width axis slowly widens and narrows, following the sound when sound is on; still at middle width otherwise.',
      'Works one per screen in a held chapter with a counter; moving the mouse leaves a short trail of that work’s photos.',
      'The first choice is two black-and-white covers side by side, each a door to half the work.',
    ],
    traps: [
      'Grey text on black for mood, which fails contrast and looks unfinished.',
      'Every size medium with no jump between them, so it reads as a wireframe.',
      'Cursor, trail, marquee and sound all at once to make up for missing colour.',
    ],
    seen: ['Inkfish', 'Bennett & Clive', "bleibtgleich'26", 'Yambo Studio', 'Exo Ape', 'example:sela-mor'],
  },
  'luxury-editorial': {
    moves: [
      'A statement mixing italic lowercase with roman capitals in one line: ‘where INNOVATION meets CRAFTSMANSHIP’.',
      'One script word very large over tiny extended sans capitals.',
      'One film or photograph per screen, a centred italic serif title in quotation marks over it.',
      'A two-line thin serif title, the lines staggered, over a full-bleed photograph.',
      'A commission or enquiry pill in the menu where a cart would be; one-offs are asked for, not added.',
      'The footer ends on the brand name in the serif, spanning the full width.',
    ],
    craft: [
      'Captions in italic serif, small: rare on the web and so it reads as fresh.',
      'Headlines broken by hand, with separate breaks for desktop and phone, so no line ends on a weak word.',
      'Words are complete on first paint; only the picture settles, from 1.04 to 1.',
      'Words sit on a scrim of the ground colour, never straight on a busy part of the photograph.',
    ],
    sparks: [
      'A held section where vertical scroll moves a row of tall photographs sideways, with a small counter; a swipe row when motion is off.',
      'Staggered interior photographs converge into one composed spread as you scroll; the finished spread when still.',
      'A handwritten signature laid over the closing headline or the founder’s note.',
    ],
    traps: [
      'Playfair with wide-tracked light Montserrat capitals: the template version of ‘elegant’.',
      'Every photograph the same size and distance, so nothing feels near or far and the pace is lost.',
      'Script for whole sentences or paragraphs instead of a single word.',
    ],
    seen: ['Depo Luxe', 'Sobha Privy Collection', 'Vero New-York', 'ERA Residence', 'Tengile Malamala Collection', 'example:maison-vey'],
  },
  'fashion-editorial': {
    moves: [
      'The collection name in huge display type running across two photographs set side by side.',
      'Cut-out models on white with condensed category words, then a torn-paper edge into a raw editorial band.',
      'A portrait with the brand name set huge in white across it.',
      'Staggered spreads: photos at different widths and heights with short text floating opposite.',
      'Shop the look: a campaign photo beside the exact pieces worn, paged ‘Look 01 / 08’.',
      'A product grid broken after a row or two by a full-width campaign photograph.',
    ],
    craft: [
      'Mixed-case condensed display, not only capitals; the small type beside it stays plain.',
      'Look numbers, editions and prices as tiny captions, so the huge type has a scale to play against.',
      'A floating Filter pill over an endless grid of photos instead of a filter sidebar.',
      'Pieces placed off-grid at different scales like objects on a table, each with a tiny caption.',
    ],
    sparks: [
      'A strip of thin vertical photo slices, one per category; the chosen slice widens to show the full image.',
      'A colourway compare: one piece in two colours split by a handle you drag.',
      'A torn-paper edge where the clean shop gives way to the season’s raw story.',
    ],
    traps: [
      'Every crop centred at one ratio, so spreads lose the tension of scale and offset.',
      'Distort, tilt or colour-split effects on the photos, competing with the clothes.',
    ],
    seen: ['Serotoninn', "L'OISEAU DÉ", 'Synchrodogs Portfolio', 'Pontus Rudolfson', 'Coutumes', 'Cecilie Bahnsen'],
  },
  'art-editorial': {
    moves: [
      'One work per screen, read by scrolling, like walking past a wall.',
      'A contact sheet of every work that opens into a sideways sequence, flat colour blocks between photographs.',
      'Two covers side by side as doors into two rooms of the show.',
      'Artists’ names set huge over their works; the opening statement has one word that changes.',
      'Category labels with counts in superscript, like ‘sculptures³’, so depth shows at a glance.',
    ],
    craft: [
      'A label for every work in museum order: artist, title in italic, year, medium, size.',
      'A huge hairline serif for titles, a small grotesk for every caption and label.',
      'Works are never cropped or rounded; each keeps its own ratio, so the grid is irregular on purpose.',
    ],
    sparks: [
      'A floor plan of the show where each marked spot opens that work and its label.',
      'Press and hold on a work to reveal it from a pale wash; the full work is shown when motion is off.',
      'Two doors on the first screen: choose a room, and the page becomes that room’s sequence.',
    ],
    traps: [
      'A catalogue turned into a shop: same-size cards, badges and buttons on every work.',
      'Captions written as marketing copy instead of facts and one curator’s sentence.',
    ],
    seen: ['Julien Calot', 'Tracing Art', 'Hearst Exhibit 2026', 'Body of Water', 'Immersive Garden website'],
  },
  'swiss-editorial': {
    moves: [
      'Halftone or dithered photographs inside a 1px grid, with one flat colour block on the page.',
      'Letters or labels pinned to the four corners of the viewport, so every screen is framed.',
      'Footnote marks in the menu and intro, ‘(1) Partnerships, (2) Capabilities’, each linking to its part.',
      'Numbered full-screen chapters with ← → and an index, read like a printed deck.',
      'The footer is the complete index: every page, service and post listed in columns.',
      'Local time live in the menu bar, set in the same small face as the links.',
    ],
    craft: [
      'A grotesk at regular or light weight, very large, tracked tight; weight never does the work size can.',
      'Sentence-case labels at 12–13px rather than monospace capitals everywhere, which is the award-site uniform.',
      'Every rule is 1px in one colour; the grid shows only through rules and the edges text sits on.',
      'Counts in brackets on labels and filters: Work [14], Notes [32].',
    ],
    sparks: [
      'Photographs shown dithered in the grid that resolve to the real image on hover or focus; the dithered still otherwise.',
      'The wordmark split to the two screen edges, meeting in the middle at the footer.',
      'Corner labels that update with each chapter’s number and name as you read.',
    ],
    traps: [
      'Monospace capital labels plus a Neue Montreal look-alike: it looks like every other award site.',
      'Rules everywhere but text that never aligns to them, so the grid is decoration.',
    ],
    seen: ['Aspen Search', 'AIM — AI Modernism of Kharkiv', "bleibtgleich'26", 'Dragonfly Redux', 'Squarespace Foundations', 'Watson'],
  },
  'coastal-calm': {
    moves: [
      'Live conditions in the chrome: water temperature, wind, local time, set as quiet small numbers.',
      'A frosted card over a wide sea or ice photograph holding the few facts that matter.',
      'A booking bar (dates, guests, one button) docked to the bottom of the first screen.',
      'A thin serif title in two staggered lines over a wide landscape photograph.',
      'A drawn map of the coast with a numbered legend of places beside it.',
    ],
    craft: [
      'Facts as numbers: minutes from town, steps to the water, sea temperature by month.',
      'The blue comes from the photographs; the UI keeps neutral ink and one quiet accent.',
      'Wide photos keep their horizon; text sits in the sky, never across the shoreline.',
    ],
    sparks: [
      'The page ground shifts with the day as you scroll, white morning to pale blue to soft dusk; three still bands when motion is off.',
      'An enquiry form set as a postcard: message on the left, fields on the right, a stamp in the corner.',
      'A wide panorama that pans sideways as you scroll, with places named along it; a swipe row when still.',
    ],
    traps: [
      'Nautical props: anchors, rope, stripes and lifebuoys instead of light and space.',
      'A greyed teal ground with teal text, which looks faded rather than fresh.',
    ],
    seen: ['Seasats', 'White Desert', 'Tengile Malamala Collection', 'Palazzo Sogni', 'Montfort', 'Inkwell'],
  },
  'ethereal': {
    moves: [
      'Warm blurred light as the first-screen ground, with one italic serif line over it.',
      'Natural objects floating slowly in soft light, as if weightless.',
      'A deep night ground with a pale pastel accent; pastels read as light only on dark.',
      'Letters arriving from soft focus to sharp, not sliding in.',
      'The hero film fades into the page ground through a long gradient, with no hard edge.',
    ],
    craft: [
      'Gradients live inside media (blurred photo, shader, film), never as a wash over the interface.',
      'Body text always sits on a solid surface; frosted glass holds only short labels, over a photo or colour.',
      'Sound is off by default, with a visible switch; it fades in and pauses in a hidden tab.',
      'A thin display weight (around 300) at large size only; text sizes stay regular.',
    ],
    sparks: [
      'A soft disc of light travels down the page, resting beside each chapter title and floating between; still marks when motion is off.',
      'A living gradient (Paper MeshGradient or GodRays) slowed almost to stillness behind the first words; a still frame when motion is off.',
      'Press and hold a misty photograph and the mist clears; the clear photo is shown when motion is off.',
    ],
    traps: [
      'Lilac ground, lilac cards and lilac text together, which reads as faded rather than luminous.',
      'Blur and glass over a flat colour, which just turns grey.',
      'Glow, glass, particles and gradient stacked on one screen: heavy to render and mushy to look at.',
    ],
    seen: ['Microsoft AI', 'Alethia', 'cobloc', 'Kriss.ai', 'Noomo Agency'],
  },
  'dark-cinematic': {
    moves: [
      'One film or still per screen with a small italic serif title in quotes centred on it; the next frame waits one scroll away.',
      'A scroll-scrubbed film cut into two or three scenes, each line of copy timed to what that stretch of footage shows.',
      'A quiet gate before the first screen: wordmark, one line, Enter, and an offer of sound for those who want it.',
      'Menus and footers as quiet instruments: a live local clock, city times or a one-line status in tiny type.',
      'Every photo graded to one shared dark grade, so stills and film read as frames from the same reel.',
    ],
    craft: [
      'The film’s last seconds ease into the page ground, so the first section rises out of the footage instead of cutting to it.',
      'Headlines sit on a soft floor gradient from the ground colour, never a boxed panel, so any frame stays readable.',
      'The accent is taken from the light in the footage (a stove glow, a lamp, first sun) and appears once per view.',
      'The poster shows at once, the film fades in over it, pauses off-screen, and a visible pause button sits in a corner.',
    ],
    sparks: [
      'A light that grows: the page opens almost black and one warm source in the film brightens as the visitor nears the booking.',
      'Sound as an invitation: a small "best with sound" toggle that adds the place’s own ambience (fire, sea, rain), off by default.',
      'A mono index of scenes or rooms with running times; the row in focus lights its frame behind the list.',
    ],
    traps: [
      'Copy laid over busy footage with no floor gradient, or scene words that fight what the film is showing.',
      'Autoplay films in every section: one lead film, stills everywhere else, or phones stutter and the lead loses its weight.',
    ],
    seen: ['Depo Luxe', 'EDOLUS', 'Siena Film Foundation', 'Inkfish', 'Bennett & Clive', 'example:halden'],
  },
  'cinematic-editorial': {
    moves: [
      'An opening paragraph read like narration, a few words in italic serif, set over a single still from the film.',
      'Giant chapter or place words with a thin band of footage running between them, like a title across a spread.',
      'A serif statement where one noun keeps changing while the sentence stays still.',
      'A scroll film fixed behind the whole page, with see-through gaps where the film plays alone with one line.',
      'Numbered chapters with a counter like 01/08 and a small caption under each frame, read like credits.',
    ],
    craft: [
      'A serif display with a plain grotesk for text; Playfair with a geometric sans reads as the template version.',
      'Captions in italic serif at caption size: rare on award sites, so it reads as chosen.',
      'Each film gap names the next stop in a small card, so the scroll feels like a programme, not a slideshow.',
      'The footer’s full-width name is measured to fit the content width exactly, whole, at every screen size.',
    ],
    sparks: [
      'A live line in the menu counting to the next night or chapter ("First night in 252 days"), turning to "Open now" when it is.',
      'A sentence with tiny film stills set between its words, each still opening the chapter it names.',
      'Two covers as doors: the first choice is between two full-height frames, each a different chapter of the story.',
      'A menu of giant stacked words over a grid of stills taken from the site’s own film.',
    ],
    traps: [
      'Long text over moving footage; words belong on still frames and in the film’s gaps, not over action.',
      'Every chapter in the same layout; scenes need changes of scale: a full frame, then a narrow column, then giant type.',
      'Giant words or the footer name sized by eye and cut off at the edge on some screens.',
    ],
    seen: ['Depo Luxe', 'Colonia Zacamil', 'Tracing Art', 'Hearst Exhibit 2026', 'Paul Kalkbrenner'],
  },
  'immersive-portfolio': {
    moves: [
      'The first screen is the work itself: an infinite drag canvas, a curved carousel, or a ring of projects you spin.',
      'A portrait pinned in the centre while the client’s name runs edge to edge in giant type behind it, swapping per project.',
      'Rounded video cards that open into full-screen films when clicked.',
      'Work as a mono table with a count in its label, WORK [14]; each row shows its image when hovered or focused.',
      'An availability line in the bar: "Available September 2026", local time, an online dot.',
    ],
    craft: [
      'The clicked thumbnail grows into the project’s first frame, so leaving the list feels like walking into the work.',
      'Drag and spin carry inertia and settle on one project facing the visitor; they never fight the page scroll.',
      'A view switch (Slider / Grid / List) with discipline filters and counts for visitors who want the overview.',
    ],
    sparks: [
      'A 3D ring of project images around the initial, dragged to spin, settling with one project front and centre.',
      'A curved carousel of project screens bending like a cinema screen, with a counter 03/12 beneath it.',
      'A real object as the navigation (a signpost, a drawer of files, a deck of cards) whose parts lead to the work.',
    ],
    traps: [
      'A 3D world with no plain list behind it: keyboard users and visitors who cannot drag never find the work.',
      'Every project at the same scale and pace, so nothing stands out and the tour turns into a slideshow.',
    ],
    seen: ['Gil Huybrecht', 'Jesper Landberg', 'Cipher', 'Milledollars', 'Inkfish', 'Hiroto Sato'],
  },
  'film-inspired': {
    moves: [
      'A letterbox intro: black bars with letters set in the four corners, opening onto the first photo.',
      'Small thumbnails that grow into the first screen, like frames pulled off a reel.',
      'A scroll-driven film with a running timecode and plain words, Forward / Pause, in place of icons.',
      'Posters as the work index, a grid that re-arranges itself as the visitor moves through it.',
      'A contact sheet of photos that opens into a sideways story, flat colour frames between the shots.',
    ],
    craft: [
      'Warm black ground under amber footage and bone type: the warmth comes from the media, never a sepia filter.',
      'Title cards in a mixed-case condensed face, not all-caps Bebas, which reads as a template.',
      'Wide crops are real crops chosen per photo so faces and horizons sit right, never bars painted over a 16:9 frame.',
    ],
    sparks: [
      'Two doors: two tilted film cards on the first screen, each a different path through the site.',
      'A row of stills under the main frame; picking one cuts the main frame to it and the timecode jumps.',
      'A gate like an opening title: the name centred in its own period lettering, one word to enter, the page fading up from black.',
    ],
    traps: [
      'Every section a centred title card: the pacing stalls; title cards should only mark a change of chapter.',
      'Letterbox crops applied mechanically to every image, cutting off heads, products or text in the photo.',
    ],
    seen: ['Heloise Thibodeau', 'Petra Garmon', 'Siena Film Foundation', 'Body of Water', 'Paris by Emily'],
  },
  'gothic-modern': {
    moves: [
      'A committed full-colour ground, deep red or plum, with pure white type and nothing greyed in between.',
      'A gothic emblem or crest as a metallic object turning slowly beside the name.',
      'A script line running as a marquee across the blackletter: the soft hand against the hard letter.',
      'Giant chapter words opening each section, sized by their letter count so they always read whole.',
      'A collage of dark stills with titles overlapping their edges, like a gig flyer.',
    ],
    craft: [
      'An arch or crest as the logo, with one ember-coloured detail as the only warm point on the page.',
      'List rows stay black type until hovered, then a photo follows the cursor; product photos never hide this way.',
      'Voice in the small print: a sold-out item marked "Burnt out", a 404 with attitude, dry button labels.',
    ],
    sparks: [
      'One blackletter initial as a window: the film plays inside the letter, then the letter grows to fill the screen.',
      'The emblem rendered as liquid metal (Paper shader) catching light as the page scrolls; an engraved still without motion.',
      'A dithered, photocopied pass over the first-screen film, like a flyer for a night that already sold out.',
    ],
    traps: [
      'Drama from props instead of contrast: drips, skulls, candle flicker and red glows read as Halloween.',
      'Giant words cropped at the edge until a letter is lost, so the headline stops reading.',
    ],
    seen: ['MEER MOHSIN', 'Glitch&Grit', 'Hearst Exhibit 2026'],
  },
  'modern-heritage': {
    moves: [
      'A statement mixing italic lower-case with roman capitals, the capitals on the one or two words that carry the claim.',
      'A list of names beside one large photo that holds its place and changes to the item in view.',
      'Interior and detail photos arriving from staggered positions and settling into one composed spread.',
      'A full-width serif wordmark closing the page, menu and newsletter tucked above it.',
      'An engraved illustration as the brand layer, in the footer or beside the address.',
    ],
    craft: [
      'Ink tinted only toward the ground’s own hue (bone on warm black, parchment on moss), never a contrasting colour.',
      'Real italics from a family drawn with them, such as Garamond revivals, rather than slanted roman or Playfair.',
      'The headline’s lines lift apart at different speeds as the first photo drifts and the page slides over it.',
      'Project pages open with the main photo wide and large, then the facts; never a small photo beside text.',
    ],
    sparks: [
      'A slow word swap inside a serif sentence, one noun moving through materials, places or years.',
      'A side index naming each chapter, the current one in italic, so the page reads like a book’s contents.',
      'One script word laid over a roman headline like a signature on a deed.',
    ],
    traps: [
      'Cinzel, IM Fell or Playfair with Montserrat standing in for heritage: they read as a template from ten years ago.',
      'Photos only on hover: a craft is judged by its work, so pictures must show without the pointer.',
    ],
    seen: ['Vero New-York', 'Sobha Privy Collection', 'Son Daven', 'Tracing Art', 'ERA Residence', 'example:fieldhouse'],
  },
  'organic-modern': {
    moves: [
      'One small brand mark that travels down the margin and rests beside each section title, landing larger in the footer.',
      'Material shapes (stone, clay, wood) floating gently around the headline, cut out with no frame.',
      'A warm off-white ground with a deep olive or earth band at the end holding hours, columns and sign-up.',
      'Giant arches as a closing shape, cut from the deep colour like doorways or an oven mouth.',
      'Links underlined by a hand-drawn line, as if marked in pencil.',
    ],
    craft: [
      'Photos from one light and one season across the site; texture comes from materials in the frame, not overlays.',
      'Dish, product or material photos that follow the cursor over a text list, so the list stays calm until asked.',
      'The logo drawn from the place’s own object (an oven arch, a kiln, a leaf), reused as favicon and travelling mark.',
    ],
    sparks: [
      'A sketch of the place or object that draws itself as the visitor scrolls, settling into the finished photo.',
      'Press and hold to let colour seep into a pencil landscape, like watercolour on paper.',
      'A watercolour illustration beside a short letter from the founder, signed in their own hand.',
    ],
    traps: [
      'Beige on beige: a greyed mid-tone ground with tinted text reads as faded, not natural.',
      'A moving mark or ornament that crosses text or photos; it must keep to the margins.',
    ],
    seen: ['cobloc', 'House of Honey', 'Tengile Malamala Collection', 'Microsoft AI', 'Sculpting Harmony', 'example:fennwood'],
  },
  'warm-hospitality': {
    moves: [
      'A full-bleed photo with a thin serif title in two staggered lines, the second line pushed to the right.',
      'A booking bar docked at the foot of the first screen (dates, guests, one button), then fixed in the header.',
      'Rooms or menus as a name index: big lines with rules and a from-price, a photo beside the name in view.',
      'A Reserve | Order split: two equal cards, each with its own button, when there is takeaway or delivery.',
      'An illustrated footer showing the building’s facade or the landscape, with sign-up and address on it.',
    ],
    craft: [
      'An hours card in the footer with a day switcher, showing dining room and bar times for the chosen day.',
      'The booking rule said plainly (when tables open, how far ahead, the phone) beside a fixed photo.',
      'On phones a slim Book bar that hides once the footer or the booking form is on screen.',
      'An enquiry framed as a postcard: message on the left, fields on the right, a stamp in the corner.',
    ],
    sparks: [
      'A closing invitation: one edge-to-edge evening photo, one centred line, the booking opening over it.',
      'The light changes as you scroll (morning room, afternoon table, evening bar), each photo a later hour.',
      'Two doors on the first screen, Stay or Dine, or two houses, as two tilted photo cards.',
    ],
    traps: [
      'Cream ground, cream cards, cream photos: one warm tone everywhere flattens the photography it should frame.',
      'Photos at mixed temperatures and seasons, so the welcome looks assembled rather than lived in.',
    ],
    seen: ['Tengile Malamala Collection', 'Palazzo Sogni', 'The Hoxton', 'Septime', 'Qissa', 'example:fennwood'],
  },
  'bohemian': {
    moves: [
      'A slab or plump serif headline with one small word swapped into an italic script, like a hand note.',
      'A warm, decided field (blush with chocolate, or a committed sun yellow or orange), never a faded tone.',
      'Photos as tilted prints scattered around the name, as on a pinboard.',
      'A painted landscape as the gate or first screen instead of a photograph.',
      'A sideways story of photos with flat colour blocks between them, like a travel journal.',
    ],
    craft: [
      'Ink is deep brown or near-black, tinted toward the ground, never navy or grey type on warm colour.',
      'Arches used big and few, such as a footer of huge arch shapes, rather than every photo in a small arch.',
      'Pattern drawn from the brand’s own pictures, like one landscape mirrored, instead of borrowed boho motifs.',
    ],
    sparks: [
      'A kaleidoscope: one landscape photo mirrored into a slow-turning pattern behind the name; a still mirrored image otherwise.',
      'Little stamps, labels or pressed leaves that scatter after the pointer and settle where it stops.',
      'A postcard contact form with a stamp in the corner, the greeting written in the brand’s script.',
    ],
    traps: [
      'Yeseva One with Nunito, or script for paragraphs: the dated boho template.',
      'Greyed sage, dusty rose and mustard side by side: three mid colours read as an old theme, not sun-warmed.',
    ],
    seen: ['House of Honey', 'Synchrodogs Portfolio', 'Body of Water', 'Pasqua Wines', 'Palazzo Sogni', 'Sunbeam Bagels'],
  },
  'victorian': {
    moves: [
      'An engraved illustration as the brand layer (the house, the animal, the bottle) in the hero or footer.',
      'A deep wine or moss ground with type in a pale tint of that same hue, like an engraved card.',
      'One copperplate script word set huge over a small extended sans.',
      'An illustrated facade or toile pattern as the footer ground, the address set over it.',
      'A gate that sets the scene: the crest, one line, Enter; the natural place for an age check.',
    ],
    craft: [
      'A modern serif with real italics rather than Cinzel or IM Fell, which read as costume.',
      'Engravings kept to two colours, ink and ground, so they sit in the page like print, not pasted pictures.',
      'The phone number or address set as display type, treated as part of the ornament.',
    ],
    sparks: [
      'An engraving that draws itself line by line as the page settles, ending as the printed plate.',
      'Two framed portraits as doors (a room, a spirit, a collection), each opening its own chapter.',
      'The enquiry as a letter: fields written into the sentence, the send button a wax seal at the bottom.',
    ],
    traps: [
      'Low contrast: brown text on dark green or gold on oxblood looks rich in a mock-up and unreadable on a phone.',
      'Script set small or in sentences: one copperplate word reads as luxury, a paragraph of it as a wedding invitation.',
    ],
    seen: ['Son Daven', 'ERA Residence', 'Palazzo Sogni', 'Hearst Exhibit 2026', 'Schlosshotel Kitzbühel'],
  },
  'swiss-modern': {
    moves: [
      'The wordmark split to the two edges of the screen, the space between left empty on purpose.',
      'Small labels pinned to the four corners of the viewport, so every screen reads as a composed poster.',
      'Photos turned halftone or dithered and set inside a 1px hairline grid, with one flat colour block among them.',
      'Work as a ruled table: name, client, type and year in columns, with a count beside the heading, like Work (14).',
      'A live local clock or availability line in the menu bar, the same small size as the links.',
      'Once per site, a whole band in the committed signal colour with pure black or white type on it.',
    ],
    craft: [
      'Huge type at light or regular weight, tracked tight, line-height under 1: size and position do the work, not boldness.',
      'Rules are 1px and sit on the same column lines as the text; no image or button floats off the grid.',
      'The signal colour lands on one thing per screen (a figure, a block, the active link), never on borders or icons.',
      'The footer as two flush blocks: the wordmark on black beside the invitation on the signal colour.',
    ],
    sparks: [
      'The wordmark split to the screen edges in the hero, closing into one word by the time you reach the footer.',
      'Corner labels that change per chapter: section name top left, its place in the page top right, local time bottom right.',
      'Photos that sharpen from a coarse dither to the full picture as they enter the grid, then stay still.',
    ],
    traps: [
      'The grid drawn as boxes round everything instead of hairline columns: it turns Swiss into a spreadsheet.',
      'Heavy bold grotesk at every level with no big jump in size, so nothing leads.',
      'Small uppercase letter-spaced mono labels over every heading: the award-site uniform, not Swiss.',
    ],
    seen: ['Aspen Search', 'bleibtgleich\'26', 'Dragonfly Redux', 'PP Neue Montreal', 'Inkfish', 'Boc.Studio'],
  },
  'typography-first': {
    moves: [
      'A sentence at display size with small photos set between its words, so the sentence itself is the hero.',
      'Chapters that open on one word wider than the screen, cropped at both edges, sliding a little sideways with scroll.',
      'Client or project names stacked as giant type instead of logos or cards.',
      'Headline lines that drift apart as you scroll, alternate lines moving in opposite directions.',
      'An image strip set between two giant words, so the photo reads as part of the line.',
    ],
    craft: [
      'Lines broken by hand twice, once for desktop and once for phones, never left to the browser’s wrap.',
      'Huge size at light or regular weight with line-height near 0.85; scale carries the drama, not extra weight.',
      'Display six to nine times the body size, while body text stays a calm 16–18px in a narrow column.',
    ],
    sparks: [
      'Footnote marks in the hero sentence, (1) (2) (3), that are the menu: each number opens its page.',
      'One word that widens along its variable width axis as you scroll past it, from narrow to wide.',
      'A statement whose words fill in from pale to full ink as you read down it.',
      'Small photo chips between the words of the hero; hovering a chip enlarges it in place.',
    ],
    traps: [
      'Giant type sized for desktop and never re-broken, so words overflow or split mid-word on phones.',
      'Every heading animated word by word; the motion belongs on the first screen and the chapter words only.',
      'One italic or coloured accent word dropped into a plain headline: the stock move, not typography.',
    ],
    seen: ['MONOLOG', 'Watson', 'Bennett & Clive', 'Colonia Zacamil', 'Decathlon Yestalgia', 'example:brasshand'],
  },
  'neo-brutalist': {
    moves: [
      'One headline number at poster size on a committed yellow or orange ground, in black type only.',
      'Buttons written in square brackets, [GET IN TOUCH], and one joke button with its own copy.',
      'Giant condensed caps with a hand-drawn circle round one word.',
      'Coloured folder tabs as navigation: flat, stacked, each a solid block with a name on it.',
      'Donation or price options as bordered blocks that each say exactly what that amount buys.',
    ],
    craft: [
      'The hard shadow collapses on press, the element moving by the shadow’s offset, so buttons feel like keys.',
      'One border width and zero radius on everything, including inputs, toasts, menus and the focus ring.',
      'Copy as blunt as the frame: real counts, real units, the bad numbers too.',
    ],
    sparks: [
      'A total that flips over like a split-flap departure board on arrival, then sits still at its final number.',
      'A button that does what it says: “Make the logo bigger” grows the logo a step each click.',
      'A chapter word cropped by both screen edges inside a ruled band, drifting sideways as you scroll.',
      'A small pixel canvas in a bordered box that visitors can draw on, with a clear button.',
    ],
    traps: [
      'Borders and shadows on every element, text blocks included: structure everywhere means no hierarchy.',
      'A different loud colour per section; the style commits to one loud ground plus black.',
      'Thick borders hiding the focus ring, so keyboard users lose their place.',
    ],
    seen: ['Lama Lama', 'Hero Collective', 'Design Office', 'Mosby\'s Files', 'The Line Studio', 'example:kur-delta-watch'],
  },
  'raw-editorial': {
    moves: [
      'A torn-paper edge between a clean band and a grungy one, so the page changes register mid-scroll.',
      'Photos printed as coarse halftone, grainy and high contrast, like a photocopied zine.',
      'A collage of stills overlapping one another, with short project titles set across the pile.',
      'Hand-drawn marks in one ink over the type: a circle round a word, a doodle arrow.',
      'Dense catalogue columns of text beside torn collage panels.',
      'Black-and-white photos under a band of handwritten words in one bright colour.',
    ],
    craft: [
      'Tilts kept to a few pieces and a few degrees; the rest sits square, so each tilt reads as chosen.',
      'Titles over the collage sit on a solid paper strip, never straight on the photo.',
      'One print treatment for every photo, the same halftone or grain, so mixed pictures look like one print run.',
    ],
    sparks: [
      'A torn edge as the section divider, its ragged paper drawn in SVG, between the clean story and the raw one.',
      'A hand-drawn circle traced once round the headline’s key word when it comes into view.',
      'Photos that sit as a photocopy until hovered, then show in full colour.',
    ],
    traps: [
      'Random tilts and offsets everywhere, titles scattered at odd positions: it reads as broken, not handmade.',
      'Text set in a blend mode over collage photos, so its colour turns random and unreadable.',
      'Grunge texture laid over body text; the reading column stays clean.',
    ],
    seen: ['Serotoninn', 'Glitch&Grit', 'QUIN: Queer Info Network', 'Hero Collective', 'The Renaissance Edition'],
  },
  'news-grid': {
    moves: [
      'A masthead line at the top: the title, issue number and date, like a front page.',
      'The lead story is the hero: headline, standfirst and byline beside one big image, no brand slogan.',
      'A text-first index of stories: title, category and date in ruled columns, almost no pictures.',
      'The home as a stack of category blocks, each a lead story, a short list and a More link.',
      'Categories as a row of chips or tabs near the top, each with its count.',
      'Two magazine covers side by side as the first choice, each a door into its section.',
    ],
    craft: [
      'Column rules are 1px and run the full height of the block; gutters stay equal, as in print.',
      'Datelines, bylines and issue numbers are real and specific; they are the texture of the page.',
      'A metadata row under the hero (this issue, the lead story, a one-line promise, subscribe) on the same columns.',
    ],
    sparks: [
      'A page tear between sections: the front page rips away to show the next spread.',
      'A ticker of the latest headlines under the masthead that pauses on hover.',
      'The newsletter as an inline tile inside the story grid, set like a classified ad.',
      'A footer that is the back page: every section, writer and issue listed in dense columns.',
    ],
    traps: [
      'Stories as rounded cards with shadows: it reads as a blog theme, not a paper.',
      'Every story given an image of equal weight; a paper ranks stories by size, lead first.',
    ],
    seen: ['Miranda', 'Hearst Exhibit 2026', 'anothermag.com', 'interiorglobe.co', 'Inkfish', 'example:slow-atlas'],
  },
  'art-direction': {
    moves: [
      'A tilted card set between two words of a headline, or a media card splitting the headline in half.',
      'Case studies as giant client words over their image, with a quiet two-line caption.',
      'Giant cropped letters behind project cards, used as a background shape.',
      'Tall colour cards with vertical titles, one widening when it is chosen.',
      'Video revealed through a polygon window that unfolds as you scroll.',
      'Mirrored, kaleidoscope landscapes on a fully saturated ground.',
    ],
    craft: [
      'Each section is composed on its own but all share one type scale, one colour pair and one easing.',
      'Overlaps are planned per breakpoint: on phones an overlap becomes a stack, never type over a face.',
      'Colour comes from one committed field with black or white type, not from many accents.',
      'The shape that reveals the hero (a clip-path, a card) is the same one that opens every page.',
    ],
    sparks: [
      'A first screen of two tilted cards, each a different route into the work.',
      'The clicked project thumbnail grows into the next page’s hero, carrying the eye across.',
      'Project titles as giant words whose letters fill with that project’s photo on hover.',
    ],
    traps: [
      'Off-grid by accident: pieces misaligned at random rather than placed against a clear grid.',
      'Titles laid over photos in blend modes, so their colour goes random and unreadable.',
      'The desktop composition carried onto phones unchanged: overlaps collide and captions run off screen.',
    ],
    seen: ['Hero Collective', 'NORMAL IS BORING', 'Realevate', 'Synchrodogs Portfolio', 'Zentry', 'Paris by Emily'],
  },
  'digital-futurism': {
    moves: [
      'A 3D object built in code, such as a field of tiles or a wireframe globe, lit by one key light.',
      'A giant outlined or extended wordmark standing behind the product render.',
      'Scroll moves a camera past a few sculpted objects, with small coordinate and date readouts.',
      'A ribbon or liquid shader band closing the page in the footer.',
      'Live numbers in the chrome: telemetry, a countdown, or what is true right now.',
      'The product on a plinth in a dark room, shown like a sculpture.',
    ],
    craft: [
      'The poster is rendered from the same scene and shown first; the canvas fades in over it only once ready.',
      'The object turns a few degrees toward the pointer, eased; it never spins to get attention.',
      'Repeated shapes drawn in one call, rendering on demand and pausing off-screen.',
      'Hero facts in a ruled row of four cells, each one real figure with a plain label.',
    ],
    sparks: [
      'A field of tiles that ripples once outward on arrival, then rests and leans slightly toward the pointer.',
      'A preloader that reads READY on a grid, and the grid becomes the page’s hairline layout.',
      'Technical line drawings of a part or a pipe that draw themselves along their path as you scroll.',
      'A status line counting down to a real deadline the product cares about.',
    ],
    traps: [
      'A 3D canvas with no poster: a black box on slow phones and a first screen that jumps late.',
      'Numbered // 01 labels on sections that are not a sequence: the generic dark-tech tell.',
      'Near-black ground, one acid-green accent and mono caps everywhere: the default award look, not a chosen one.',
    ],
    seen: ['Cerebrium', 'USAvionix', 'Seasats', 'Igloo Inc', 'SSTR - Friction Reduction', 'example:hexmint'],
  },
  'technical-minimal': {
    moves: [
      'Exploded technical line drawings of the product or system, thin strokes on a plain ground.',
      'A footer that is a dense index: every page and doc in columns with small coloured bullets.',
      'A before/after drag line labelled like a viewer’s A/B, showing the real difference the work makes.',
      'A live status line: the next session, seats left or system state, recomputed every half minute.',
      'A 1px hairline grid drawn behind one data-heavy section, not the whole site.',
      'Line icons drawn in the same stroke weight as the diagrams.',
    ],
    craft: [
      'Diagrams computed from real data, such as a scope read from the actual frame, never illustrative.',
      'Labels in sentence case at 12–13px rather than mono caps: precision without the costume.',
      'Status dots stay still; their colour shows the state, never a pulse.',
    ],
    sparks: [
      'The first screen is the instrument itself, its readouts answering the pointer.',
      'A spec sheet where hovering a value highlights the part it describes on the drawing.',
      'A paragraph whose small inline product icons light up as each sentence is read.',
    ],
    traps: [
      'Monospace for everything, body text included: it reads as a costume and tires the eye.',
      'Invented metrics and decorative numbers that measure nothing; every figure must be true.',
      'Numbered markers on every block; numbers only where the order is real.',
    ],
    seen: ['Anime.js', 'Aspen Search', 'Terminal Industries', 'CoMinVi', 'Opal Tadpole', 'example:night-shift'],
  },
  'bento-product': {
    moves: [
      'A bento of colour tiles that each open into a chapter, so the whole site is visible at a glance.',
      'Uneven tiles in one grid: a product photo, one big figure, a text-only tile side by side.',
      'A spec strip under the hero: four cells, each one fact with its label.',
      'A footer of tiles: a logo block, a few link cards, and one colour block for the call to action.',
      'Product options picked inside a tile, opening the buy panel already set.',
    ],
    craft: [
      'Flush tiles joined by a 1px seam, the border colour showing through the gaps, instead of floating cards.',
      'Tile size follows weight: the lead feature spans two cells, small facts stay small.',
      'Photos cropped per tile to the exact detail named, the knob or the angle, not one wide shot reused.',
    ],
    sparks: [
      'The brand mark travels down the page and lands beside each chapter title in a new pose.',
      'A tile that becomes its chapter: clicked, it grows to fill the grid while the others fold away.',
      'A colour picker in one tile that repaints the product in the next tile and the ground behind it.',
    ],
    traps: [
      'Every tile the same size: a grid of equal cards reads as a template, not a bento.',
      'Gradient washes and frosted blur on each tile: the generic app-site default, and it hides the product.',
    ],
    seen: ['Dropbox Brand', 'Aspen Search', 'Vectr', 'framer.com', 'CIAO ENERGY - LAUNCH WEBSITE'],
  },
  'cyberpunk': {
    moves: [
      'Console chrome: status rows with lit dots, coordinates and corner brackets framing the screen.',
      'A 404 that is a terminal log, its error printed line by line.',
      'Video revealed through an angular polygon window that unfolds to full screen.',
      'Neon-tube strokes that spell letters on the dark ground.',
      'A pixel dissolve between pages: the screen breaks into blocks and reassembles.',
      'Buttons and labels in square brackets, [ENTER], set like commands.',
    ],
    craft: [
      'Readouts are real: local time, live counts, dates, not random hex strings.',
      'Text over footage sits on a solid dark panel, never straight on bright video.',
      'Corner brackets and readouts stay pinned to the viewport while content scrolls beneath them.',
    ],
    sparks: [
      'Four corner brackets whose coordinates update as you scroll, like a camera locking onto its target.',
      'A 404 that types out its error, then offers the site’s pages as commands to run.',
      'Scroll to land on a dark map whose labelled hotspots open small data cards.',
      'Footage that breaks into dithered pixels under the pointer and snaps back to clear video.',
    ],
    traps: [
      'Scanlines, noise and colour fringing over the whole page: the texture buries the content.',
      'Fake hacker text and random code rain: the costume replaces the information.',
    ],
    seen: ['Pensatori Irrazionali', '21 Hrs On The Moon', 'Igloo Inc', 'Zentry', 'Lama Lama', 'Boc.Studio'],
  },
  'soft-pastel': {
    moves: [
      'A pale lilac-to-pink sky as the first screen, with one soft 3D object or cutaway room sitting in it',
      'A headline with one word that rotates or types itself, set over the calm sky',
      'Pastel tiles in a checkerboard on a warm off-white ground, each tile holding one person or product',
      'Material shapes floating slowly while the headline letters blur in',
      'The sky changes colour as you scroll: white, then peach, then a deep evening blue for the closing part',
      'A footer wordmark with each letter in a different pastel',
    ],
    craft: [
      'Ink stays near-black and neutral; pastels carry the ground and tiles, never the reading text',
      'One deeper colour (violet, raspberry or navy) does every action, so the pastels never compete with the button',
      'Soft gradients live inside media (blurred light, 3D renders), not as a wash over flat UI',
      'One inverted deep band where small pastel accents glow as light, not mud',
    ],
    sparks: [
      'A dollhouse cutaway of the owner’s place in pastel 3D, with the headline’s last word cycling through what happens in each room',
      'Each section owns a time of day: the sky warms from morning lilac to evening blue as the visitor reads down',
      'A pastel checkerboard where tiles lift and swap places when hovered, settling into a still grid',
    ],
    traps: [
      'Greyed, dusty pastels read faded and dated instead of chosen',
      'A different pastel behind every section turns the page into a paint chart',
      'Pastel text or thin lines on a pastel ground that nobody can read',
    ],
    seen: ['Kriss.ai', 'Noho', 'cobloc', 'Inkwell', 'Noomo Agency', 'Microsoft AI'],
  },
  'retro-seventies': {
    moves: [
      'A committed orange, mustard or red ground with cream type tinted toward the ground’s own hue',
      'The name as a huge warm serif running the full width of the first screen',
      'Fat, squat display headlines set tight (line-height near 0.8) in short lowercase phrases',
      'Wavy or blob edges where one colour band melts into the next',
      'A checkerboard or repeating pattern in two warm colours as a gate or band',
      'A footer on a warm gradient band with a giant, ornamental wordmark',
    ],
    craft: [
      'Ochre and orange are full and committed, never buttercream or pea-soup green',
      'Italic words dropped into a roman serif statement give the warm, spoken feel',
      'Big lowercase footer links and a pill-shaped newsletter card instead of tiny link columns',
    ],
    sparks: [
      'A footer wordmark in fat 3D extruded letters standing on a wavy edge, like a gelato shop sign',
      'A loyalty card in the footer whose stamps fill one by one for the pages visited',
      'Photos dropped as tilted instant prints around the headline, as if spread on a table',
    ],
    traps: [
      'Greyed yellow-greens and dusty browns read as an old kitchen, not a sunny poster',
      'Three or four warm mid-tones at equal weight side by side look like a dated theme',
    ],
    seen: ['Slow Down Creative', 'Aardvark Book Club', 'Mate Libre', 'Pontus Rudolfson', 'Garden Party', 'Delice'],
  },
  'playful-pop': {
    moves: [
      'One full, saturated colour as the whole ground with pure black or white type',
      'The product travels down the page, flying and turning as each section arrives',
      'A flavour or variant switcher that swaps the product, its name and the ground colour together',
      'Cut-out photos of people with speech bubbles, including in the menu',
      'Stickers piling up as the loader counts, then the page bursts in',
      'A flower or starburst badge that pops in with an offer',
    ],
    craft: [
      'Chunky squat display type set at line-height near 0.8, short words only',
      'Every product or flavour brings its own ground, so colour changes mean something',
      'Jokes in the small print: the 404, the cookie note, a menu bubble saying “Leaving so soon?”',
    ],
    sparks: [
      'A cut-out head whose top opens and spills the brand’s objects across the first screen',
      'Googly eyes on the logo that follow the pointer and look at the main button',
      'A dangling product you can pull and let swing back',
      'A 404 with a marquee “4 NOT FOUND 4” and the product crushed in the middle',
    ],
    traps: [
      'Bright grounds with grey or tinted text that blurs the contrast',
      'Rotating a new colour on every section until no colour means anything',
    ],
    seen: ['Trevor Noah', 'MindMarket', 'Aardvark Book Club', 'Mana Yerba Mate', 'Spylt', 'CIAO ENERGY - LAUNCH WEBSITE'],
  },
  'sticker-studio': {
    moves: [
      'Brand stickers drawn as die-cut vinyl: a fat white edge, a coloured face and a thin ink outline',
      'Work shown as a list of project names; hovering one reveals its photo and turns the whole section its colour',
      'Case cards fanned out at angles, each in its own colour',
      'Stickers that scatter after the pointer or orbit the first screen',
      'A self-aware joke in the chrome, like a footer that calls itself “Footer®”',
      'A footer with a marquee and a click-to-copy email instead of a contact form',
    ],
    craft: [
      'Stickers are the brand’s own marks and slogans drawn as SVG, set in the display face, not clip art',
      'On phones stickers travel in lanes above and below the words, never across text or the button',
      'The contact section recolours with the kind of project picked, so the form answers back',
    ],
    sparks: [
      'A gate you hold to peel, lifting a giant sticker off the page to reveal the site',
      'The footer name slapped on letter by letter like stickers landing',
      'A 3D sticker cube in the footer that turns to show a different slogan on each face',
    ],
    traps: [
      'Stickers over the headline or button on small screens',
      'Flat stickers with no die-cut edge read as emoji or clip art',
      'Two chapter colours fighting in one view',
    ],
    seen: ['example:sticky-weather', 'Warm & Fuzzy', 'Spylt', 'Ask Phill', 'Studio Size'],
  },
  'y2k-chrome': {
    moves: [
      'A chrome or iridescent 3D wordmark as the ending, often cut off by the bottom edge',
      'A chrome object floating on a saturated blue gradient as the first screen',
      'Wide type that stretches and squeezes along its width axis',
      'Dot-matrix lettering for the wordmark or counters',
      'Work as cards floating in a coloured 3D space the visitor drifts through',
      'A perspective grid floor, squiggles and bolts as the retro-future kit',
    ],
    craft: [
      'Chrome sits on a clean light ground or a full blue so the reflections read, never on a mid grey',
      'The logo rendered as liquid metal with a plain image fallback underneath',
      'Hard, bright highlights and dark reflections; a soft grey gradient is not chrome',
    ],
    sparks: [
      'Headline letters swap to brushed steel or holographic foil where the pointer passes',
      'A 404 of iridescent glass that cracks and shatters, resting as broken pieces',
      'The footer wordmark melting into liquid metal as it arrives, cut by the page edge',
    ],
    traps: [
      'Silver on a mid grey ground looks like an old operating system',
      'Every element shiny, so the one hero object has nothing to shine against',
    ],
    seen: ['Butter', 'Sharplink', 'Decathlon Yestalgia', '2xA Studio', 'Studio K95', '21 Hrs On The Moon'],
  },
  'synthwave': {
    moves: [
      'Neon tube lines drawing the letters of a word on a dark ground',
      'Light-speed lines streaming toward one point behind a single line of text',
      'A perspective grid floor running to the horizon',
      'Small pastel accents on a deep night ground, where they read as light',
    ],
    craft: [
      'The ground is a deep tinted night, not black and not a mid purple',
      'Neon is a stroked line with glow, so it can switch on like a real sign',
      'Wide, extended labels for the small type; the display face is kept to one word',
    ],
    sparks: [
      'A neon sign that flickers on tube by tube as the section arrives, then stays lit',
      'Scrolling drives the grid floor toward the horizon, as if the page is the road',
    ],
    traps: [
      'A neon display face used for headings and buttons as well as the one word',
      'Gradients washed over the UI instead of living in the sky or the image',
    ],
    seen: ['Boc.Studio', 'Analogue Agency', 'Decathlon Yestalgia', 'Glitch&Grit'],
  },
  'pixel-art': {
    moves: [
      'A pixel-mosaic loader that resolves into the first screen',
      'A dot-matrix wordmark running as a marquee in the footer',
      'A pattern of pixel blocks built from the brand’s own letters',
      'Pixel dissolve between pages',
      'Bracket buttons like [GET IN TOUCH] in a mono or pixel face',
    ],
    craft: [
      'Sprites scaled only at whole multiples, so every pixel stays square',
      'A dot-matrix percent counter instead of a spinner',
      'Game toys are optional extras beside the content, never the way in',
    ],
    sparks: [
      'A small pixel canvas where visitors draw, using only the site’s palette',
      'A snake game hidden in a list, started by a key',
      'A 404 where pixel blocks fall and stack into the number',
    ],
    traps: [
      'Pixel transitions on every link until moving around feels slow',
      'A game that must be played before the content can be seen',
    ],
    seen: ['Lama Lama', '2xA Studio', 'Thessaloniki Sto Piato', 'Messenger'],
  },
  'scrapbook': {
    moves: [
      'A torn-paper edge between a clean band and a raw, collaged one',
      'Prints laid on a desk with sticky notes and typed captions',
      'Archive photos scattered around one giant year or date',
      'Handwritten words over black-and-white snapshots',
      'Objects placed off-grid at different sizes, each with a tiny caption',
      'Small spot drawings in the same hand marking each section',
    ],
    craft: [
      'Beside every scatter, a typed caption list that opens each photo full size, so nothing is only reachable by hunting',
      'Each item can turn the section its own colour as it arrives, like a new page in the album',
      'Tilted pieces start flat under reduced motion and on phones settle into a readable stack',
    ],
    sparks: [
      'The site opens under a sheet of tracing paper, the page faint beneath, and the visitor lifts it away',
      'The footer name pasted together from cut-out paper letters',
      'The first screen as a hand drawing in layers that part as the visitor scrolls',
    ],
    traps: [
      'A scatter that hides photos behind each other on small screens',
      'Collage and tape crowding the reading column',
    ],
    seen: ['example:inkwell-moth', 'Glitch&Grit', 'Serotoninn', 'The Renaissance Edition', 'Miranda – Paper Portfolio', 'Bulletproof'],
  },
  'surrealism': {
    moves: [
      'Natural objects (rocks, moss, materials) floating weightless in a plain void',
      'Mirrored landscapes on a single saturated colour ground',
      'One sculpted object per project, with a small quiet caption beside it',
      'Artworks floating around a centred serif statement',
      'A painted landscape as the gate before the site',
      'Clouds behind thin, widely spaced capitals',
    ],
    craft: [
      'Huge image, tiny calm caption: the scale gap is what makes it feel strange',
      'Fog and depth instead of hard edges, so objects seem to hang in air',
      'A still poster frame shows first; any 3D scene fades in over it',
    ],
    sparks: [
      'Pressing and holding paints the landscape in, leaving a finished painting',
      'Scrolling moves a camera past three strange objects, one per chapter',
      'One word inside the calm statement slowly turns into another',
    ],
    traps: [
      'Many floating things at once, which reads as a screensaver',
      'A 3D scene with no poster, leaving a blank first screen while it loads',
    ],
    seen: ['Alethia', 'Immersive Garden website', 'Tracing Art', 'Igloo Inc', 'David Whyte Experience', 'Synchrodogs'],
  },
  'maximalism': {
    moves: [
      'Flat candy colour blocks section by section with a rounded heavy grotesk',
      'Overlapping colour shapes behind the dates or the main claim',
      'A handwritten signature scribbled over a headline',
      'A bento of flat colour tiles, each opening its own chapter',
      'The line-up or list as giant names in a marquee',
      'A Memphis kit of squiggles, bolts and grid floors',
    ],
    craft: [
      'One action colour stays the same while chapter colours rotate around it',
      'Type stretched along its width axis, from narrow to very wide, as art direction',
      'Every colour is full and committed; type on it is pure black or pure white',
    ],
    sparks: [
      'A signature scribbling itself over the headline, resting as ink',
      'A pattern built from the brand’s own letters filling a whole band',
      'A comic-strip story the visitor reads by scrolling, one panel per screen',
    ],
    traps: [
      'Mid-strength colours of equal weight next to each other, which reads as an old theme',
      'Stickers and shapes piling onto the main button until it is hard to find',
    ],
    seen: ['Aardvark Book Club', 'Ponpon Mania', 'Decathlon Yestalgia', 'Lando Norris', 'C2 Montréal', 'Dropbox Brand'],
  },
  'conceptual-sketch': {
    moves: [
      'A pencil sketch that draws itself as the visitor scrolls',
      'Letters built from compass arcs and construction lines',
      'A two-colour drawing that zooms into a plan and then a 3D model',
      'A hand-drawn circle around one word of a bold headline',
      'The team as line drawings standing in a row',
      'A line-drawing illustration as the footer',
    ],
    craft: [
      'Drawings are SVG strokes, not scanned images, so they stay sharp and can trace',
      'One strong ground (orange, or clean paper) with graphite lines and mono labels as annotations',
      'Two colours only: the line and one marker',
    ],
    sparks: [
      'The founder’s sketch of the idea traces itself, then the real photo fades in behind it',
      'Zoom from a pencil drawing into the plan, then into the built thing',
      'Connect-the-dots that becomes the logo as the visitor clicks',
    ],
    traps: [
      'Drawing animations long enough to block reading',
      'Handwriting fonts for paragraphs, which look dated and tire the eye',
    ],
    seen: ['Sculpting Harmony', 'SSTR - Friction Reduction', 'Bienal Arquitectura Urbanismo', 'Illoca', 'Artem Shcherbakov', 'Hero Collective'],
  },
}
