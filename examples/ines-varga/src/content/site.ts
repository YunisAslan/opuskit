// Copy deck — every word on the site, written before the layout (build/implementation-plan.md → Step 1).
// Grown from the owner's own line: "Illustrated maps for towns, trails and books, drawn by hand in ink and watercolour.
// Commissions open." Anything marked PLACEHOLDER was invented to fill the page — names, dates, prices, quotes,
// clients, the studio town and the email. Replace each with the real fact; the wording around it can stay.

export const site = {
  name: 'Ines Varga',
  offer: 'Illustrated maps for towns, trails and books, drawn by hand in ink and watercolour. Commissions open.',
  email: 'hello@inesvarga.com', // PLACEHOLDER — the real address
  studio: 'Pécs, Hungary', // PLACEHOLDER — where the studio is
  hours: 'Mon to Thu, 9 till 5. Fridays I’m out walking.', // PLACEHOLDER
  visits: 'Studio visits by appointment',
  status: 'Taking commissions for spring 2027', // PLACEHOLDER — the next open slot
  url: 'https://inesvarga.com', // PLACEHOLDER — the real domain, for share links
}

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Selected work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export const menu = {
  open: 'Menu',
  close: 'Close',
  action: { label: 'Commission a map', href: '/contact' },
  note: 'Write to me',
}

// ── Projects ────────────────────────────────────────────────────────────────────────────────────────────────
// The four maps, in the order of the owner's files (featuredWork-1 … 4). All project facts are PLACEHOLDERS.
export type ProjectEntry = {
  slug: string
  title: string
  kind: string // the discipline
  year: string
  place: string
  /** One plain line for the index. */ line: string
  client: string
  role: string
  /** Problem, approach, result. */ story: [string, string, string]
  specs: { label: string; value: string }[]
  /** Notes in the margin: what Ines would scribble beside the map. */ notes: string[]
  gallery: string[] // captions for the eight gallery slots, in order
}

export const projects: ProjectEntry[] = [
  {
    slug: 'salt-isles',
    title: 'The Salt Isles',
    kind: 'Book map',
    year: '2025',
    place: 'An archipelago that doesn’t exist',
    line: 'Endpaper map for a seafaring novel, drawn from the author’s notes and a box of sketches.',
    client: 'Tessel Press', // PLACEHOLDER
    role: 'Map, lettering, endpapers',
    story: [
      'The author had forty islands in her head and three of them on paper. Readers kept losing the ship between chapters four and nine.',
      'We read the book together with a pencil, island by island, and fixed every distance the story depends on. Then I drew the coasts in one sitting so the hand stays the same.',
      'One map, printed inside both covers. Readers write to the author with the routes they traced, which is the best review a map can get.',
    ],
    specs: [
      { label: 'Client', value: 'Tessel Press' },
      { label: 'Year', value: '2025' },
      { label: 'Format', value: 'Endpaper spread, 2 × 234 × 156 mm' },
      { label: 'Original', value: 'Ink on hot-press paper, 70 × 50 cm' },
      { label: 'Colour', value: 'Black ink only, for a one-colour print' },
      { label: 'Islands named', value: '41' },
      { label: 'Time', value: '9 weeks, sketch to final' },
      { label: 'Delivered', value: '600 dpi scan, layered PDF, the original' },
    ],
    notes: ['every crossing timed against chapter 6', 'coasts drawn in one sitting', 'one ink, so the printer keeps it sharp'],
    gallery: ['The whole sheet before the scan', 'Coastline, close', 'Sketchbook pages from the first read', 'The compass rose, pencil', 'Lettering the island names', 'The ship’s route, inked', 'Proof on the press', 'The book, open at the endpapers'],
  },
  {
    slug: 'centro-on-foot',
    title: 'Centro on Foot',
    kind: 'Town map',
    year: '2024',
    place: 'A city centre, walked street by street',
    line: 'A folding walking map of the old centre, with the trees, the avenues and the shortcuts locals use.',
    client: 'Old Town Visitor Office', // PLACEHOLDER
    role: 'Survey walks, map, colour',
    story: [
      'The visitor office had a map nobody kept. It showed every street at the same weight, so the walk you actually want was invisible.',
      'I walked the centre for eleven days and drew only what you notice on foot: shade, steps, the square with the good bench. The avenues carry the colour; the side streets stay in ink.',
      'The fold-out went to print in two languages. The office reorders it each spring and people pin it to their fridge after the trip.',
    ],
    specs: [
      { label: 'Client', value: 'Old Town Visitor Office' },
      { label: 'Year', value: '2024' },
      { label: 'Area', value: 'Old centre, about 2.4 km²' },
      { label: 'Format', value: 'Fold-out, 600 × 420 mm' },
      { label: 'Original', value: 'Ink and watercolour, 100 × 70 cm' },
      { label: 'Survey', value: '11 days on foot' },
      { label: 'Languages', value: 'Two' },
      { label: 'Delivered', value: 'Print files, a poster version, the original' },
    ],
    notes: ['trees drawn where the shade really is', 'avenues in colour, the rest in ink', 'shortcuts from the café owners'],
    gallery: ['The full sheet, flat', 'An avenue and its trees', 'Survey notebook, day three', 'Watercolour going down on the parks', 'The fold, tested', 'Street names, lettered by hand', 'A walker with the map', 'Stacked for the visitor office'],
  },
  {
    slug: 'riverside-quarter',
    title: 'Riverside Quarter',
    kind: 'Neighbourhood map',
    year: '2023',
    place: 'A quarter between the river and the rail line',
    line: 'Every building in fine line, for the residents who wanted their streets on one wall.',
    client: 'Riverside Quarter Association', // PLACEHOLDER
    role: 'Map, building portraits',
    story: [
      'The residents wanted a map of the quarter as it is, before the new bridge changes it. Satellite views flatten everything that makes it theirs.',
      'I drew every building from the street, roof by roof, in one fine pen. The residents marked their own doors in pencil and I inked those last.',
      'A large print hangs in the community hall, and each household got a copy with its own door circled.',
    ],
    specs: [
      { label: 'Client', value: 'Riverside Quarter Association' },
      { label: 'Year', value: '2023' },
      { label: 'Buildings', value: 'About 1,300, drawn one by one' },
      { label: 'Original', value: 'Fineliner on paper, 120 × 80 cm' },
      { label: 'Pen', value: '0.1 mm, one nib for the whole sheet' },
      { label: 'Print', value: 'Giclée, edition of 200' },
      { label: 'Time', value: '14 weeks' },
      { label: 'Delivered', value: 'Hall print, household prints, the original' },
    ],
    notes: ['every roof drawn from the street', 'residents marked their own doors', 'one 0.1 nib, start to finish'],
    gallery: ['The full sheet on the studio wall', 'Roofs along the river', 'Pencil under the ink', 'The rail line, close', 'Residents marking their doors', 'Inking the market hall', 'Hung in the community hall', 'A household copy, door circled'],
  },
  {
    slug: 'lake-loop',
    title: 'The Lake Loop',
    kind: 'Trail map',
    year: '2022',
    place: 'A 14 km loop around a town lake',
    line: 'A trail map for the path around the lake, with every bench, spring and steep bit on it.',
    client: 'Lakeside Parks Trust', // PLACEHOLDER
    role: 'Trail survey, map, signage',
    story: [
      'The trust needed one map for the trail boards and the leaflet. The old one was a traced plan that didn’t say where the path gets hard.',
      'I walked the loop in all four seasons and marked what a walker needs: water, shade, the slope, where to turn back. The contours are pencil-soft so the path reads first.',
      'The map stands on six boards around the lake and goes home in pockets as a leaflet. Rangers say fewer people get lost at the north fork.',
    ],
    specs: [
      { label: 'Client', value: 'Lakeside Parks Trust' },
      { label: 'Year', value: '2022' },
      { label: 'Trail', value: '14 km loop, about 4 hours on foot' },
      { label: 'Survey', value: 'Four walks, one each season' },
      { label: 'Original', value: 'Ink and watercolour, 70 × 50 cm' },
      { label: 'Boards', value: 'Six, enamel print, 1200 × 800 mm' },
      { label: 'Leaflet', value: 'A3, folded to pocket size' },
      { label: 'Delivered', value: 'Board files, leaflet, the original' },
    ],
    notes: ['every spring and bench marked', 'contours soft, the path loud', 'walked once in each season'],
    gallery: ['The full sheet', 'The north fork, close', 'Field sketches from the winter walk', 'Mixing the lake colour', 'A trail board on site', 'Benches and springs, inked', 'The leaflet, folded', 'Walkers at the board'],
  },
]

// The studio photos that stand in on project galleries until each project's own set exists.
export const galleryStandIns = ['processPath', 'processSupplies', 'processPalette', 'workVintageStack'] as const

// ── Home ────────────────────────────────────────────────────────────────────────────────────────────────────
export const home = {
  meta: { title: 'Ines Varga, maps drawn by hand', description: 'Illustrated maps for towns, trails and books, drawn by hand in ink and watercolour. Commissions open.' },
  hero: {
    // ≤ 8 words. `circled` gets the hand-drawn marker circle.
    lines: ['Maps drawn by', 'hand, on foot.'],
    mobileLines: ['Maps', 'drawn by', 'hand,', 'on foot.'],
    circled: 'hand',
    line: 'Illustrated maps for towns, trails and books, drawn by hand in ink and watercolour. Commissions open.',
    action: { label: 'Commission a map', href: '/contact' },
    second: { label: 'See the maps', href: '/work' },
    mapLabels: { town: 'old town', trail: 'lake loop', book: 'here be islands', north: 'N', scale: '1 km, more or less' },
  },
  work: {
    title: 'Recent maps',
    years: '2022 to 2025',
    desk: 'These are prints. Pick one up and move it.',
    deskSr: 'Prints of the maps scattered on a desk. The same maps are listed below as links.',
    all: 'All the work',
  },
  cta: {
    headline: 'Got a place that needs a map?',
    quiet: 'Tell me where it is.',
    action: { label: 'Start a commission', href: '/contact' },
  },
}

// ── Selected Work ───────────────────────────────────────────────────────────────────────────────────────────
export const work = {
  meta: { title: 'Selected work', description: 'Town, trail and book maps by Ines Varga, 2022 to 2025: what each was for, where, and how it was drawn.' },
  title: 'Selected maps',
  years: '2022–2025',
  intro: 'Four maps, newest first. Each one was walked or read before a line went down.',
  open: 'Open the map',
  route: { start: 'start here', end: 'your place next?' },
  clients: {
    title: 'Drawn for',
    // PLACEHOLDER — real client names only
    names: ['Tessel Press', 'Old Town Visitor Office', 'Riverside Quarter Association', 'Lakeside Parks Trust', 'Northfold Walking Club', 'Harrow & Finch Books', 'Ember Lane Publishing', 'Highmoor Trails', 'The Quay Bookshop', 'Saltmarsh Festival'],
    text: 'Publishers, towns, park trusts and the occasional walking club.',
  },
}

// ── Project ─────────────────────────────────────────────────────────────────────────────────────────────────
export const project = {
  facts: { client: 'Client', place: 'Place', year: 'Year', role: 'My part' },
  gallery: { title: 'From the drawing board', open: 'Open large' },
  specs: { title: 'The facts', text: 'What was made, how big, and what the client took home.', note: 'Every commission ends with the original sheet going to the client.' },
  more: { title: 'More maps' },
  ask: { line: 'Want one like this?', action: 'Write to me' },
  notesLabel: 'Notes in the margin',
}

// ── About ───────────────────────────────────────────────────────────────────────────────────────────────────
export const about = {
  meta: { title: 'About', description: 'Ines Varga walks a place before she draws it. How a map gets made, who it’s been made for, and how long it took to get here.' },
  title: 'I walk it first, then I draw it.',
  mobileTitle: ['I walk it', 'first, then', 'I draw it.'],
  statement: 'I’m Ines Varga. I draw maps by hand, in ink and watercolour, for towns, trails and books.',
  bio: 'Before that I spent six years drawing plans in a surveyor’s office, which taught me accuracy and made me miss the pencil. Now every map starts with a walk and ends with an original sheet you can hang. I work alone, take a few commissions a year, and answer my own email.', // PLACEHOLDER history
  portraitAlt: 'Ines Varga in a red jumper in her studio, holding a framed line drawing',
  story: {
    title: 'How a map gets made',
    chapters: [
      { key: 'walk', heading: 'The walk', body: 'I go there. I walk the streets or the trail with a notebook and mark what you notice on foot: the hill, the shade, the turn people miss. A book map starts the same way, only the walk is through the manuscript.', alt: 'A trail map board beside a country road' },
      { key: 'pencil', heading: 'The pencil', body: 'Back at the desk I sketch the whole sheet in soft pencil. This is where things move: a street gets wider because it matters, a hill gets taller because it hurts.', alt: 'A hand sketching buildings in pencil and ink' },
      { key: 'ink', heading: 'The ink', body: 'Then the ink, one pen at a time, and no going back. The lettering goes in last, by hand, so every name sits where it reads best.', alt: 'A pair of glasses resting on a map on the work table' },
      { key: 'colour', heading: 'The colour', body: 'Watercolour comes last and stays quiet: a wash for water, one for parks, the path a little louder. Then the sheet is scanned, and the original is yours.', alt: 'Brushes in a jar beside a watercolour palette' },
    ],
  },
  testimonials: {
    title: 'What clients said',
    // PLACEHOLDER — real quotes, names and roles
    quotes: [
      { quote: 'She walked the loop four times before she drew a line. You can feel it: the map knows where your legs get tired.', name: 'Marta Kovács', role: 'Ranger, Lakeside Parks Trust' },
      { quote: 'Readers send us photos of the endpapers with their own routes pencilled in.', name: 'Daniel Rook', role: 'Editor, Tessel Press' },
      { quote: 'Every household found its own door. That was the point.', name: 'Ilse Brandt', role: 'Riverside Quarter Association' },
    ],
  },
  timeline: {
    title: 'How I got here',
    text: 'Dates are the real ones; the reasons are the honest ones.',
    // PLACEHOLDER — real dates and steps
    steps: [
      { when: '2012', title: 'Plans in a surveyor’s office', detail: 'Six years of exact lines. It taught me scale, and how little of a place a plan shows.' },
      { when: '2018', title: 'A map for a walking club', detail: 'Drawn for free, at weekends. Forty copies, and the first time strangers used something I drew.' },
      { when: '2020', title: 'Went on my own', detail: 'One desk, one pen, a list of three towns to ask.' },
      { when: '2022', title: 'The first trail on public boards', detail: 'Six boards around a lake. Proof that hand-drawn can survive the weather.' },
      { when: '2025', title: 'The first book map', detail: 'An archipelago that doesn’t exist, which turned out to need more surveying than a real one.' },
      { when: '2026', title: 'Commissions open', detail: 'Taking a few maps a year, booked in order. Yours could be next.' },
    ],
  },
}

// ── Contact ─────────────────────────────────────────────────────────────────────────────────────────────────
export const contact = {
  meta: { title: 'Contact', description: 'Commission a hand-drawn map from Ines Varga: tell her the place, what the map is for, and when you need it.' },
  headline: 'Tell me where, and I’ll draw the way.',
  quiet: 'Commissions open, booked in order.',
  intro: 'A few lines are enough to start: the place, what the map is for and roughly when. I reply within three working days.', // PLACEHOLDER promise
  form: {
    name: 'Your name',
    email: 'Your email',
    place: 'Where is it?',
    placeHint: 'A town, a trail, or a book’s imaginary country',
    kind: 'What kind of map',
    kinds: ['A town or city', 'A trail or park', 'A book', 'Something else'],
    kindPlaceholder: 'Choose one',
    when: 'When do you need it?',
    whenPlaceholder: 'Spring next year, no rush…',
    message: 'Tell me about it',
    messagePlaceholder: 'What the map is for, who will hold it, where it will hang or be printed.',
    consent: 'Keep my email only to answer this. Nothing else.',
    send: 'Write the email',
    sending: 'Opening your email…',
    sent: 'Your email app should be open with everything filled in. Press send there and I’ll reply within three working days.',
    fallback: 'Nothing opened? Write to',
    errors: { name: 'I need something to call you.', email: 'That email doesn’t look right.', place: 'Where is the map for?', kind: 'Pick the closest one.', message: 'A line or two, please.', consent: 'Tick this so I can reply.' },
    subject: 'A map of',
  },
  card: { desk: 'my desk', yours: 'your place', empty: 'type a place', title: 'Your place on the map' },
  faq: {
    title: 'Before you write',
    // PLACEHOLDER — prices and times are invented
    items: [
      { q: 'How much does a map cost?', a: 'Most commissions land between €1,800 and €6,000. A small trail leaflet sits at the low end; a whole town in colour at the top. You get a fixed price after the first call, before anything is drawn.' },
      { q: 'How long does it take?', a: 'Six to fourteen weeks from the first walk to the final scan, depending on the size and the season. I book maps in order, so the start date depends on the queue.' },
      { q: 'Do you really walk the place?', a: 'Yes, every town and trail map starts on foot. Travel is billed at cost. For book maps I walk the manuscript instead, with the author.' },
      { q: 'Can we print it on signs, leaflets and merchandise?', a: 'Yes. The licence covers the uses we agree at the start, written down in plain words. Adding a use later is a short email, not a new contract.' },
      { q: 'What do I get at the end?', a: 'A high-resolution scan, print-ready files in the sizes you need, and the original sheet in ink and watercolour.' },
      { q: 'How many changes can I ask for?', a: 'Two rounds at the pencil stage, where changes are cheap, and one round of small fixes after the ink.' },
      { q: 'Can you map a place that doesn’t exist?', a: 'Gladly. Fantasy worlds, a family farm as it was in 1950, a festival that lasts a weekend. If it has a shape, it can have a map.' },
    ],
  },
}

// ── Footer and 404 ──────────────────────────────────────────────────────────────────────────────────────────
export const footer = {
  invite: 'Let’s draw your map.',
  copy: 'Copy the address',
  copied: 'Email copied',
  legal: [{ label: 'Imprint', href: '/contact#imprint' }],
  line: 'Drawn by hand. Coded with care.',
  copyright: `© ${new Date().getFullYear()} Ines Varga. Maps and drawings are hers.`,
}

export const notFound = {
  title: 'You’ve walked off the map.',
  line: 'This page isn’t on any sheet I’ve drawn. The path back is still here.',
  home: 'Back to the start',
  action: 'Commission a map',
  edge: 'edge of the sheet',
}
