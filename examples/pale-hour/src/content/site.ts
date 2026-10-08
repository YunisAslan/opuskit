// Copy deck — Pale Hour. Every word on the site lives here; components only lay it out.
// Grown from the owner's line: "A photography gallery and bookshop in an old print works: three exhibitions a year,
// talks on Thursdays, photobooks to take home."
// Anything the owner has not told us yet (addresses, names, dates, prices, quotes) is marked PLACEHOLDER — replace the
// value, keep the shape.

export const site = {
  name: 'Pale Hour',
  description:
    'A photography gallery and bookshop in an old print works. Three exhibitions a year, talks on Thursdays, photobooks to take home.',
  // PLACEHOLDER — address, postcode, phone and email
  address: { lines: ['The Old Print Works', '14 Foundry Lane', 'Bristol BS1 6QH'], short: '14 Foundry Lane, Bristol' },
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=14+Foundry+Lane+Bristol+BS1+6QH',
  phone: { label: '0117 496 0381', href: 'tel:+441174960381' },
  email: 'visit@palehour.co.uk',
  instagram: 'https://www.instagram.com/',
  // PLACEHOLDER — opening hours. Days: 0 Sunday … 6 Saturday. Times in 24h, venue time.
  timeZone: 'Europe/London',
  hours: [
    { day: 0, open: '11:00', close: '17:00' },
    { day: 3, open: '11:00', close: '18:00' },
    { day: 4, open: '11:00', close: '21:00', late: 'Talk at 19:00' },
    { day: 5, open: '11:00', close: '18:00' },
    { day: 6, open: '10:00', close: '18:00' },
  ],
  hoursLines: ['Wednesday to Saturday, 11:00 to 18:00', 'Thursday open late, until 21:00', 'Sunday, 11:00 to 17:00', 'Closed Monday and Tuesday'],
}

export const nav = {
  left: [
    { label: 'Exhibitions', href: '/exhibitions' },
    { label: 'Visit', href: '/visit' },
    { label: 'About', href: '/about' },
  ],
  action: { label: 'Plan your visit', short: 'Visit', href: '/visit' },
  menu: 'Menu',
  close: 'Close',
  home: 'Pale Hour, home',
}

export type Exhibition = {
  slug: string
  artist: string
  title: string
  year: string
  medium: string
  size: string
  dates: string
  status: 'Now on' | 'Next' | 'Earlier this year'
  discipline: string
  curator: string
  long: string
  alt: string
}

// PLACEHOLDER — the four exhibitions (three this year, the first of next). Artists, titles, dates, media, sizes.
export const exhibitions: Exhibition[] = [
  {
    slug: 'the-quiet-rooms',
    artist: 'Mirela Okafor',
    title: 'The Quiet Rooms',
    year: '2026',
    medium: 'Gelatin silver prints',
    size: '38 works, 50 × 60 cm',
    dates: '2 October 2026 to 17 January 2027',
    status: 'Now on',
    discipline: 'Interiors, black and white',
    curator: 'Rooms photographed the morning after their owners left, a chair still under the window, the light doing all the talking.',
    long: 'Okafor spent four winters in houses about to be sold. She worked only in the hour after sunrise, with no lamps and a tripod she never moved between frames. The prints were made by hand in her own darkroom and hang here unframed, pinned to the old composing room wall.',
    alt: 'A bare room in black and white: one window of small square panes, a single chair beneath it, the floor in shadow.',
  },
  {
    slug: 'field-notes-on-snow',
    artist: 'Aled Price',
    title: 'Field Notes on Snow',
    year: '2027',
    medium: 'Pigment prints',
    size: '24 works, 40 × 50 cm',
    dates: 'Opens 5 February 2027',
    status: 'Next',
    discipline: 'Landscape, colour',
    curator: 'A shepherd’s year on the Cambrian hills, kept as a notebook of white on white.',
    long: 'Price photographed one hillside every day of a winter, from the same stone wall. The exhibition hangs the pictures in the order they were made, so the snow comes and goes as you walk the press hall.',
    alt: 'The crest of a snow slope under a white sky, a faint line of footprints crossing it.',
  },
  {
    slug: 'night-shift',
    artist: 'Tomas Rehn',
    title: 'Night Shift',
    year: '2026',
    medium: 'Chromogenic prints',
    size: '31 works, 60 × 75 cm',
    dates: '12 June to 13 September 2026',
    status: 'Earlier this year',
    discipline: 'People at work, colour',
    curator: 'The people who keep the city running between midnight and six, each photographed at the end of their shift.',
    long: 'Bakers, nurses, a tram driver, the attendant who walks the hospital car park until the day staff arrive. Rehn followed each of them through the last minutes of the shift and took one frame.',
    alt: 'A man in a reflective work jacket walks across an underground car park under strip lights.',
  },
  {
    slug: 'salt-roads',
    artist: 'Ines Varga',
    title: 'Salt Roads',
    year: '2026',
    medium: 'Platinum palladium prints',
    size: '19 works, 30 × 40 cm',
    dates: '6 February to 24 May 2026',
    status: 'Earlier this year',
    discipline: 'Landscape, platinum print',
    curator: 'The roads that once carried salt inland, printed in platinum so the greys go on for ever.',
    long: 'Varga spent two years on the old salt roads, across flats so white the horizon goes missing. The prints are small and hung low, so the room asked you to lean in.',
    alt: 'A single road runs straight across a white salt flat towards low hills, printed in warm grey.',
  },
]

export const home = {
  hero: {
    headline: 'Where the presses stood, photographs hang',
    line: 'A photography gallery and bookshop in an old print works. Three exhibitions a year, talks on Thursdays, photobooks to take home.',
    action: 'Plan your visit',
    directions: 'Get directions',
    nowOn: 'Now on',
  },
  intro: {
    label: 'The gallery',
    statement: 'Three exhibitions a year in the press hall, a talk every Thursday, and a bookshop in the old bindery.',
    body: 'Pale Hour is for anyone who would rather look at a photograph on a wall than on a screen. Entry is always free. The prints hang where the presses stood, and the books you leave with were chosen by the people who hung them.',
  },
  featured: {
    title: 'The year in the press hall',
    more: 'All exhibitions',
    open: 'Open large',
  },
  schedule: {
    title: 'Thursdays this autumn',
    intro: 'Doors and bookshop stay open until 21:00. Talks start at 19:00 and last about an hour. Seats are £6, and free for under 25s.',
  },
  journal: {
    title: 'From the journal',
  },
}

export type Talk = { label: string; date: string; iso: string; items: { time: string; title: string; detail?: string }[] }

// PLACEHOLDER — the Thursday programme. Speakers and titles.
export const talks: Talk[] = [
  {
    label: 'Thursday 15 October',
    date: 'Thursday 15 October, 19:00',
    iso: '2026-10-15T19:00',
    items: [
      { time: '18:00', title: 'Late opening', detail: 'The Quiet Rooms and the bookshop, open until 21:00.' },
      { time: '19:00', title: 'Mirela Okafor in conversation', detail: 'On working in the first hour of light. With Sade Adeyemi.' },
      { time: '20:15', title: 'Book signing', detail: 'Okafor signs the book of The Quiet Rooms, £45.' },
    ],
  },
  {
    label: 'Thursday 22 October',
    date: 'Thursday 22 October, 19:00',
    iso: '2026-10-22T19:00',
    items: [
      { time: '18:00', title: 'Late opening', detail: 'The Quiet Rooms and the bookshop, open until 21:00.' },
      { time: '19:00', title: 'How a photobook is made', detail: 'A designer and a printer take one book apart, page by page.' },
      { time: '20:15', title: 'Bookshop hour', detail: 'Ask us for the book you cannot name.' },
    ],
  },
  {
    label: 'Thursday 29 October',
    date: 'Thursday 29 October, 19:00',
    iso: '2026-10-29T19:00',
    items: [
      { time: '18:00', title: 'Late opening', detail: 'The Quiet Rooms and the bookshop, open until 21:00.' },
      { time: '19:00', title: 'Reading a room', detail: 'Hana Lindqvist walks the exhibition, one photograph at a time.' },
      { time: '20:15', title: 'Prints from the press', detail: 'A small edition pulled on the last working press in the building.' },
    ],
  },
]

export const rsvp = {
  button: 'RSVP',
  next: 'Next talk',
  title: 'Keep a seat',
  intro: 'Choose an evening and tell us how many are coming. This opens your email app with everything filled in, addressed to us; we reply to confirm.',
  fields: { name: 'Your name', email: 'Your email', evening: 'Which Thursday', seats: 'Seats' },
  less: 'One fewer seat',
  more: 'One more seat',
  submit: 'Write the email',
  done: 'Your email app should now be open with the RSVP written. Send it and we will reply to confirm your seats.',
  errors: { name: 'Tell us your name.', email: 'Give an email we can reply to.', evening: 'Choose an evening.' },
  subject: (date: string) => `RSVP: ${date}`,
}

export type JournalEntry = { title: string; date: string; iso: string; category: string; href: string; alt: string }

// PLACEHOLDER — journal entries
export const journal: JournalEntry[] = [
  {
    title: 'Printing in the dark: an afternoon with Mirela Okafor',
    date: '1 October 2026',
    iso: '2026-10-01',
    category: 'Conversation',
    href: '/exhibitions#the-quiet-rooms',
    alt: 'A darkroom under red safelight: enlargers along the back wall, developing trays on the bench, a clock above.',
  },
  {
    title: 'Twelve photobooks for the shorter days',
    date: '24 September 2026',
    iso: '2026-09-24',
    category: 'Bookshop',
    href: '/visit#bookshop',
    alt: 'A photobook open on a wooden table: a city at night on one page, figures against a burst of light on the other.',
  },
  {
    title: 'Hanging a wall, one frame at a time',
    date: '30 September 2026',
    iso: '2026-09-30',
    category: 'In the hall',
    href: '/exhibitions#the-plan',
    alt: 'A woman in a checked shirt levels a framed colour photograph among others on a white wall.',
  },
].sort((a, b) => b.iso.localeCompare(a.iso))

export const exhibitionsPage = {
  title: 'The year in three rooms',
  titleMobile: ['The year in', 'three rooms'],
  intro: 'Three exhibitions a year, each given the whole press hall for four months. What is on now, what comes next, and what has just come down.',
  index: 'This year and next',
  label: 'Label',
  gallery: {
    title: 'Walk the print works',
    intro: 'The building has four rooms and one yard. The marks follow the way most visitors walk: in through the yard, along the press hall, and out through the bookshop.',
    planLabel: 'Plan of the old print works, ground floor',
    hint: 'Choose a mark to see what hangs there.',
    hintTouch: 'Tap a mark to open the photograph.',
    closing: 'Photographs of the print works, made over one week in September 2026.',
  },
}

export type Room = 'Press hall' | 'Composing room' | 'Bindery' | 'Yard'

// Captions for the gallery photographs, written from the real pictures. Room is where each sits on the plan.
export const galleryPhotos: { caption: string; alt: string; room: Room }[] = [
  { caption: 'The iron gate in the yard wall, kept from the old works.', alt: 'A black iron lattice gate beside a wall of dark brick banded with red.', room: 'Yard' },
  { caption: 'The press hall from the far end, prints hung in a single line.', alt: 'A long white hall under top light, framed black-and-white prints in a line along each wall, a few visitors at the far end.', room: 'Press hall' },
  { caption: 'Okafor’s prints, pinned and unframed.', alt: 'Small black-and-white prints of streets and buildings pinned in rows to a white board.', room: 'Press hall' },
  { caption: 'The last working press, still run once a season.', alt: 'A black cast-iron printing press, a printed sheet on its bed, tall factory windows behind.', room: 'Press hall' },
  { caption: 'A Thursday evening, the chairs set out before the talk.', alt: 'Rows of empty black chairs, close together, seen from the side.', room: 'Composing room' },
  { caption: 'Type cases kept from the old works, one drawer still full of type.', alt: 'A worn wooden cabinet of shallow type drawers, one pulled open on rows of metal type.', room: 'Composing room' },
  { caption: 'The bookshop table in the old bindery.', alt: 'A stack of well-read books at the edge of a pale table in soft daylight.', room: 'Bindery' },
  { caption: 'Wrapping a signed copy to take home.', alt: 'Hands taping brown paper around a book-shaped parcel.', room: 'Bindery' },
]

export const visitPage = {
  title: 'Come by the print works',
  titleMobile: ['Come by the', 'print works'],
  addressLabel: 'Address',
  hoursLabel: 'Opening hours',
  directions: 'Get directions',
  call: 'Call us',
  gettingHere: 'Getting here',
  // PLACEHOLDER — transit notes
  transit: [
    { id: 'foot', label: 'On foot', text: 'Twelve minutes from the harbourside. Walk up Foundry Lane to the brick arch with the old timber doors; the yard beyond is open whenever we are.' },
    { id: 'train', label: 'By train', text: 'Bristol Temple Meads is a twenty-minute walk or two stops on the number 8 bus. Get off at Old Market.' },
    { id: 'bus', label: 'By bus', text: 'Buses 8, 9 and 72 stop at Old Market, three minutes away. The stop is step-free.' },
    { id: 'bike', label: 'By bike', text: 'There are eight bike stands inside the yard, under cover.' },
  ],
  hourLine: {
    title: 'Today at Pale Hour',
    open: (until: string) => `Open now, until ${until}`,
    later: (from: string) => `Closed now, opens at ${from}`,
    closed: 'Closed',
    next: (day: string, from: string) => `Opens ${day} at ${from}`,
    talk: 'Talk',
    now: 'Now',
    opening: 'Open',
  },
  rooms: [
    { id: 'gallery', title: 'The gallery', hours: 'Wednesday to Sunday', note: 'Free, always. No need to book.' },
    { id: 'bookshop', title: 'The bookshop', hours: 'Same hours as the gallery', note: 'Photobooks, many signed. We post anywhere in the UK.' },
    { id: 'talks', title: 'Thursday talks', hours: 'Every Thursday at 19:00', note: '£6, free for under 25s. Keep a seat by email.' },
  ],
  schedule: {
    title: 'A week at Pale Hour',
    // PLACEHOLDER — the weekly rhythm
    days: [
      {
        label: 'Wednesday and Friday',
        items: [
          { time: '11:00', title: 'Doors open', detail: 'Gallery and bookshop.' },
          { time: '14:00', title: 'Hall walk', detail: 'Twenty minutes with whoever is on the desk. Free.' },
          { time: '18:00', title: 'Doors close' },
        ],
      },
      {
        label: 'Thursday',
        items: [
          { time: '11:00', title: 'Doors open', detail: 'Gallery and bookshop.' },
          { time: '19:00', title: 'The Thursday talk', detail: 'One hour, then signing. £6.' },
          { time: '21:00', title: 'Doors close' },
        ],
      },
      {
        label: 'Saturday',
        items: [
          { time: '10:00', title: 'Doors open early', detail: 'The quietest hour of the week.' },
          { time: '15:00', title: 'Portfolio table', detail: 'Bring prints, we look at them with you. First Saturday of the month.' },
          { time: '18:00', title: 'Doors close' },
        ],
      },
      {
        label: 'Sunday',
        items: [
          { time: '11:00', title: 'Doors open', detail: 'Gallery and bookshop.' },
          { time: '17:00', title: 'Doors close' },
        ],
      },
    ],
  },
  faq: {
    title: 'Before you come',
    // PLACEHOLDER — answers to check with the owner
    items: [
      { id: 'free', q: 'Do I need a ticket for the exhibitions?', a: 'No. The gallery is free and you can walk in whenever we are open. Only the Thursday talks have a ticket, and even those keep a few seats at the door.' },
      { id: 'access', q: 'Is the building step-free?', a: 'The yard, press hall, composing room and bookshop are all on the ground floor and step-free. There is an accessible toilet by the bindery. Folding stools are by the door; take one round with you.' },
      { id: 'photos', q: 'Can I take photographs?', a: 'Yes, without flash. Please ask before photographing other visitors, and leave the prints the room they need.' },
      { id: 'books', q: 'Do you post photobooks?', a: 'Yes, anywhere in the UK, wrapped in paper from the old works. Write to us with the title and we will tell you what it costs to send.' },
      { id: 'talk-late', q: 'What if I arrive after a talk has started?', a: 'Come in quietly by the side door; we keep the back row free for late arrivals.' },
      { id: 'groups', q: 'Can we visit as a group or a class?', a: 'Of course. Groups of more than ten, write to us first so we can open the hall early or give you a walk-through.' },
      { id: 'cafe', q: 'Is there a café?', a: 'No, we keep the rooms for the photographs. There is good coffee two doors down, and a bench in the yard for drinking it.' },
    ],
  },
}

export const aboutPage = {
  title: 'A print works, still printing',
  titleMobile: ['A print works,', 'still printing'],
  // PLACEHOLDER — the building's history
  presses: {
    lead: 'Since 1891 this hall has printed',
    sr: 'What the presses printed, year by year',
    years: [
      { year: '1891', word: 'railway timetables' },
      { year: '1923', word: 'seed catalogues' },
      { year: '1958', word: 'the evening paper' },
      { year: '1994', word: 'nothing at all' },
      { year: '2019', word: 'photographs' },
    ],
  },
  label: 'About',
  statement: 'We found the building empty, the last press still bolted to the floor, and decided to keep it that way.',
  bio: 'Hana Lindqvist curated for twelve years in Stockholm and London; Owen Marsh ran a secondhand bookshop on the harbour. In 2019 they took the lease on the Foundry Lane print works, swept out twenty-five years of pigeons, and opened with one exhibition and four shelves of books. The shelves now fill the old bindery. The press still runs once a season.',
  alt: 'A woman with long dark hair in profile, in a knitted jumper, against a pale wall. Black and white.',
  team: {
    title: 'The people on the desk',
    // PLACEHOLDER — names, roles and lines
    people: [
      { name: 'Hana Lindqvist', role: 'Director and curator', line: 'Chooses the three exhibitions each year and hangs every one herself.', alt: 'Hana Lindqvist, short pale hair and a dark jumper, outdoors in soft light. Black and white.' },
      { name: 'Owen Marsh', role: 'Bookshop', line: 'Will find you the photobook you half remember from twenty years ago.', alt: 'Owen Marsh in glasses and a dark jumper, by a window, bars of light across his face. Black and white.' },
      { name: 'Sade Adeyemi', role: 'Thursday programme', line: 'Invites the speakers, and asks them the question everyone else is too polite to.', alt: 'Sade Adeyemi in a white vest and drop earrings, against a white wall. Black and white.' },
      { name: 'Jonas Pereira', role: 'Technician and printer', line: 'Hangs the walls, runs the old press, and knows where every pin goes.', alt: 'Jonas Pereira in a white ribbed turtleneck, against a grey wall. Black and white.' },
    ],
  },
}

export const footer = {
  line: 'The presses stopped in 1994. The pictures did not.',
  columns: {
    visit: 'Visit',
    pages: 'Pages',
    elsewhere: 'Elsewhere',
  },
  links: {
    instagram: 'Instagram',
    newsletter: 'Newsletter by email',
    email: 'Write to us',
  },
  newsletterSubject: 'Add me to the Pale Hour newsletter',
  copyright: `© ${new Date().getFullYear()} Pale Hour`,
  legal: [
    { label: 'Access', href: '/visit#faq' },
    { label: 'Contact', href: 'mailto:visit@palehour.co.uk' },
  ],
}

export const notFound = {
  title: 'This page was never printed',
  body: 'The plate was set, the paper never came. The page you wanted is not here, but the press hall is, and so is everything on its walls.',
  home: 'Back to the front',
  visit: 'Plan your visit',
}

export const lightbox = { label: 'Photographs', close: 'Close', prev: 'Previous photograph', next: 'Next photograph' }
