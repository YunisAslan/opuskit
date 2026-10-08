// Low Hum — copy deck. Every headline, line and button on the site lives here, written from the owner's own words:
// "A listening bar with ten thousand records, a hand-built sound system and small plates until late."
// Anything invented (prices, times, address, phone, email, dishes, answers) is marked PLACEHOLDER — the owner replaces it.

export const brand = {
  name: 'Low Hum',
  offer: 'A listening bar with ten thousand records, a hand-built sound system and small plates until late.',
  // PLACEHOLDER — contact details
  email: 'hello@lowhum.bar',
  phone: '+44 20 7946 0321',
  phoneDisplay: '020 7946 0321',
  address: '14 Wax Lane\nLondon E8 3RL',
  addressLine: '14 Wax Lane, London E8 3RL',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=14+Wax+Lane+London+E8+3RL',
  instagram: 'https://instagram.com/lowhum.bar', // PLACEHOLDER
}

// PLACEHOLDER — opening hours
export const hours = [
  'Tuesday to Thursday, 5pm till midnight',
  'Friday and Saturday, 5pm till 2am',
  'Sunday, 3pm till 11pm',
  'Monday, closed (the records need a rest)',
]

export const nav = {
  left: [
    { label: 'Menu', href: '/menu' },
    { label: 'Programme', href: '/#programme' },
  ],
  right: [
    { label: 'Find us', href: '/reservations#find-us' },
    { label: 'Questions', href: '/reservations#questions' },
  ],
  action: { label: 'Book a table', href: '/reservations' },
  actionShort: 'Book',
  menuButton: 'Open menu',
}

export const home = {
  hero: {
    title: 'loud world? low hum.',
    titleMobile: ['loud', 'world?', 'low hum.'],
    line: 'Ten thousand records, a sound system built by hand and small plates until late.',
    action: 'Book a table',
    secondary: 'See the menu',
  },
  intro: {
    label: 'The bar',
    statement: 'A listening bar for people who would rather hear the record than shout over it.',
    body: 'The shelves hold ten thousand records. The speakers were built by hand, in this room, for this room. The kitchen sends out small plates until late. Come for one side of an album and stay for both.',
  },
  menu: {
    title: 'hungry ears? small plates.',
    note: 'Plates land as they are ready, like tracks on a good mix. Tell us about allergies and we will sort you out.',
    more: 'See the whole menu',
  },
  schedule: {
    title: 'one record? whole evening.',
    intro: 'Something is always on the platter. Here is roughly what, and when.',
  },
}

export const menuPage = {
  title: 'hungry ears? small plates.',
  intro: 'Two sides, like any good record. Side A is the kitchen, Side B is the bar. Both play until late.',
  gallery: {
    title: 'too shy? have a look.',
    intro: 'Pick a print up and move it around. The room looks better from every angle.',
    gridTitle: 'Every print, in a row',
    hint: 'Drag the prints',
    open: 'See larger',
    close: 'Close',
  },
}

// PLACEHOLDER — every dish, drink and price
export const menuSides = [
  {
    side: 'Side A',
    label: 'Plates',
    groups: [
      {
        name: 'Small plates',
        items: [
          { name: 'Smoked almonds', description: 'Warm from the oven, rosemary salt.', price: '£4' },
          { name: 'Gildas', description: 'Anchovy, olive and guindilla on a stick. Salty, sour, gone in one.', price: '£3' },
          { name: 'Burnt leeks', description: 'Charred over the grill, hazelnut romesco.', price: '£8' },
          { name: 'Crab toast', description: 'Brown butter, chives, a squeeze of lemon.', price: '£11' },
        ],
      },
      {
        name: 'Late plates',
        items: [
          { name: 'Chicken skewers', description: 'Miso glaze, burnt spring onion.', price: '£10' },
          { name: 'Beef shin croquettes', description: 'Three of them, with mustard mayo.', price: '£9' },
          { name: 'Cheese on toast', description: 'Aged cheddar, onion jam. The 1am classic.', price: '£8' },
          { name: 'Chocolate pot', description: 'Dark, salted, a little cream on top.', price: '£7' },
        ],
      },
    ],
  },
  {
    side: 'Side B',
    label: 'Drinks',
    groups: [
      {
        name: 'Cocktails',
        items: [
          { name: 'B-side Negroni', description: 'Gin, bitter orange, a little coffee.', price: '£12' },
          { name: 'Slow Groove', description: 'Rye, sweet vermouth, cherry, stirred long.', price: '£13' },
          { name: 'Needle Drop', description: 'Mezcal, grapefruit, salt. Sharp start, soft finish.', price: '£12' },
          { name: 'Quiet Storm', description: 'Dark rum, ginger, lime. No shouting.', price: '£11' },
        ],
      },
      {
        name: 'Wine, beer and soft',
        items: [
          { name: 'House red or white', description: 'Natural, by the glass. Ask what is open.', price: '£8' },
          { name: 'Local lager', description: 'Brewed two streets away.', price: '£6' },
          { name: 'Sour cherry soda', description: 'Made here, no alcohol.', price: '£5' },
          { name: 'Filter coffee', description: 'For the second half of the night.', price: '£3' },
        ],
      },
    ],
  },
]

// PLACEHOLDER — times and titles of the programme
export const schedule = [
  {
    label: 'Tuesday to Thursday',
    items: [
      { time: '17:00', title: 'Doors, first record', detail: 'Whatever the bartender pulled from the shelf on the way in.' },
      { time: '19:00', title: 'Album hour', detail: 'One record, both sides, start to finish. Talk stays at a hum.' },
      { time: '21:00', title: 'Selector’s choice', detail: 'The staff pick from the ten thousand. No skips.' },
      { time: '23:30', title: 'Last plates', detail: 'The kitchen calls it. The records keep going till midnight.' },
    ],
  },
  {
    label: 'Friday and Saturday',
    items: [
      { time: '17:00', title: 'Doors, first record', detail: 'Early drinks, early plates, plenty of room.' },
      { time: '20:00', title: 'Guest selector', detail: 'A collector brings a crate and plays it through our system.' },
      { time: '23:00', title: 'Late listening', detail: 'Lights down, volume just right, small plates still coming.' },
      { time: '01:00', title: 'Last plates', detail: 'Cheese on toast o’clock. Lights up at 2.' },
    ],
  },
  {
    label: 'Sunday',
    items: [
      { time: '15:00', title: 'Sunday sides', detail: 'Jazz, folk and slow soul with a long, lazy menu.' },
      { time: '18:00', title: 'Request hour', detail: 'Write a record on a napkin. If it is on the shelf, it gets played.' },
      { time: '22:30', title: 'Last plates', detail: 'One more side, then home. We close at 11.' },
    ],
  },
]

export const reservation = {
  title: 'big night? small table.',
  text: 'Book a table for one to six at the bar or in a booth. We hold every table for fifteen minutes, then give it to the next person humming at the door.',
  groups: 'Seven or more? Call us and we will pull a crate of records just for you.', // PLACEHOLDER — group policy
  call: 'Rather call?',
  hoursLabel: 'When we are open',
  form: {
    date: 'Day',
    datePlaceholder: 'Pick a day',
    time: 'Time',
    timePlaceholder: 'Pick a time',
    guests: 'Guests',
    guestsPlaceholder: 'How many',
    name: 'Your name',
    email: 'Email',
    note: 'Anything we should know?',
    notePlaceholder: 'Birthday, allergies, a record you want to hear',
    submit: 'Book a table',
    where: 'Sending opens your email app with the booking filled in, addressed to',
    after: 'We reply to confirm, usually the same day.',
    toastTitle: 'Your email app is open',
    toastBody: 'Your booking is filled in. Hit send and we will confirm by reply.',
    errors: {
      date: 'Pick a day for your table.',
      time: 'Pick a time.',
      guests: 'Tell us how many are coming.',
      name: 'We need a name for the table.',
      email: 'That email does not look right.',
    },
  },
  label: {
    side: 'Your night',
    empty: 'Fill in the form and we press your night onto the label.',
    rpm: '45 rpm',
    pressed: 'Pressed for you',
  },
}

// PLACEHOLDER — kitchen sittings
export const times = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00']
export const guestOptions = ['1', '2', '3', '4', '5', '6']

export const reservationsPage = {
  title: 'no plans? one table.',
  intro: 'Thirty seconds now, a whole evening later. Pick a day, a time and how many of you are coming.',
}

export const location = {
  title: 'lost? follow the bass.',
  notes: 'Five minutes from Hackney Central on the Overground. Look for the green door and the low hum. Step-free entrance, bikes welcome out front.', // PLACEHOLDER — transit notes
  map: 'Open in maps',
  call: 'Call us',
}

// PLACEHOLDER — answers to confirm with the owner
export const faq = {
  title: 'questions? quiet answers.',
  items: [
    { q: 'Do I have to book?', a: 'No, but it helps. We keep the bar stools for walk-ins and book the booths. On Fridays and Saturdays, booking is the safe bet.' },
    { q: 'Do I have to be quiet?', a: 'Not silent, just kind. Talk like you would in a friend’s living room while their favourite record is on. During album hour we ask for a little more hush.' },
    { q: 'Can I request a record?', a: 'Yes. Write it on a napkin and hand it to the bar. If it is on the shelf, it gets played, most likely on Sunday at request hour.' },
    { q: 'Can I bring my own records?', a: 'Once a month we run a bring-your-own night. Follow us on Instagram for the date. Other nights, our selector keeps the platter.' },
    { q: 'Do you cook for allergies and diets?', a: 'Most plates can be made without meat, gluten or dairy. Tell us when you book, or tell your server, and the kitchen will sort you out.' },
    { q: 'Is there a dress code?', a: 'Come as you are. Comfortable shoes are a good idea, the records are long.' },
    { q: 'Can I bring kids or dogs?', a: 'Well-behaved dogs, yes, any time. Kids are welcome on Sundays until 7pm.' },
  ],
}

export const footer = {
  invite: 'say hello. softly.',
  detailsTitle: 'Find us',
  hoursTitle: 'Open',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'Book a table', href: '/reservations' },
    { label: 'Instagram', href: brand.instagram },
  ],
  copyright: `© ${new Date().getFullYear()} Low Hum`,
  legal: 'No cookies, no tracking. Just records.',
  signoff: 'Thanks for listening.',
}

export const sticky = { label: 'Book a table' }

export const notFound = {
  title: 'wrong groove? skip back.',
  text: 'The needle jumped and this page is not on the record. Ten thousand others are.',
  home: 'Back to the start',
  book: 'Book a table',
}
