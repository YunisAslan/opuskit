// Copy deck — every headline, line and button on the site, written before any layout.
// Grown from the owner's words: "Maison Vey. A small perfume house making five scents by hand, each one a single
// place at a single hour." Tone: composed, precise. No exclamation marks.
//
// PLACEHOLDER (owner to replace): the workshop town (Sète), the founders' names and history, the year founded,
// the quotes and the people quoted, prices, delivery terms and the email address. They are written in the house
// voice so the layout carries real words, but they are invented.

export const brand = {
  name: 'Maison Vey',
  town: 'Sète', // PLACEHOLDER
  email: 'atelier@maisonvey.com', // PLACEHOLDER
  address: ['Maison Vey', '14 quai de la Marine', '34200 Sète, France'], // PLACEHOLDER
  founded: '2019', // PLACEHOLDER
  description: 'A small perfume house making five scents by hand, each one a single place at a single hour.',
}

export const nav = {
  links: [
    { label: 'Shop', href: '/shop' },
    { label: 'The five hours', href: '/#collection' },
    { label: 'Discovery set', href: '/shop/discovery-set' },
    { label: 'About', href: '/about' },
  ],
  bag: 'Bag',
  menu: 'Menu',
  close: 'Close',
}

export const home = {
  hero: {
    product: 'salt-quay',
    eyebrow: 'Salt Quay, eau de parfum',
    // ≤ 8 words. Broken by hand per breakpoint.
    title: { desktop: ['A harbour wall', 'at twenty to six'], mobile: ['A harbour', 'wall at', 'twenty to six'] },
    line: 'Sea fennel, wet stone and the first coffee on the boats. One of five scents we make by hand, each a single place at a single hour.',
    priceLine: '50 ml, €185',
    action: 'Add to bag',
    secondary: 'See all five',
  },
  grid: {
    title: 'Five places, one set',
  },
  collection: {
    season: 'Autumn and winter 2026',
    title: 'The late hours',
    text: 'Three scents for the months when the light goes early: a courtyard after lunch, a library as the lamps come on, the deck of a ferry at eleven. Made in batches of two hundred, from now until the first figs.',
    pieces: ['fig-courtyard', 'reading-room', 'night-ferry'],
  },
  story: {
    title: 'The hour is an ingredient',
    caption: 'The harbour at Sète, a little before six.',
    paragraphs: [
      'Every Maison Vey scent starts with a place we have stood in, at a time we can name. Not a mood board or a brief: a wall, a room, a deck, and the minute the light changed on it.',
      'We go back to that place at that hour as many times as it takes, with a notebook and a small glass jar. What we bring home is a list of what was really there. Salt drying on stone. Diesel from a far-off engine. Someone frying onions three doors down.',
      'Then the slow part. Each formula is built by hand at one bench in Sète, in batches small enough to stir with a glass rod, and left to rest for six weeks before it is filtered and poured. Every bottle is labelled and numbered by the person who filled it.',
      'We make five. We may never make a sixth. A house this size can only know so many places well.',
    ],
    quote: 'We do not invent the scent. We stand still until the place gives it to us.',
    quoteBy: 'Hélène Vey, perfumer',
  },
  testimonials: {
    title: 'What people say',
    // PLACEHOLDER — invented quotes; replace with real customers' words and permission.
    quotes: [
      { quote: 'I wore Reading Room to my father’s house in November and he asked which library I had been in. That is the whole review.', name: 'Clémence Arnaud', role: 'Bookbinder, Lyon' },
      { quote: 'The discovery set ruined other perfumes for me. Night Ferry smells like the crossing to Bastia I took every summer.', name: 'Marc Delorme', role: 'Architect, Marseille' },
      { quote: 'The bottle arrived with a handwritten number and a sample of something I had not ordered. I have now ordered it.', name: 'Ruth Okafor', role: 'Translator, London' },
      { quote: 'Salt Quay is the only scent my partner has ever noticed on me before I said anything.', name: 'Jonas Weil', role: 'Chef, Hamburg' },
    ],
  },
  trust: [
    { title: 'Sent in two days', text: 'From our bench in Sète, free across the EU over €120.' },
    { title: 'Wear it before you open it', text: 'A 2 ml sample rides with every bottle, so the seal stays yours to break.' },
    { title: 'Thirty days to return', text: 'Unopened bottles come back free, no questions asked.' },
    { title: 'Refills for life', text: 'Send back an empty 100 ml and we refill it for €190.' },
  ],
  newsletter: {
    title: 'A letter when the season turns',
    text: 'Four times a year we write about the place behind the next batch, and tell you before a small run sells out. Nothing else lands in your inbox.',
    label: 'Email address',
    placeholder: 'you@example.com',
    button: 'Subscribe',
    note: 'Four letters a year. One click to leave.',
    success: 'Thank you. The next letter arrives when the season turns.',
    error: 'Please write a full email address.',
  },
}

export const shop = {
  title: { desktop: ['Five places,', 'one bench'], mobile: ['Five places,', 'one bench'] },
  intro: 'Every scent in 15, 50 and 100 ml, and all five together in a set of vials. Made in Sète, in batches of two hundred.',
  filters: { label: 'Show hours', all: 'All', morning: 'Morning', afternoon: 'Afternoon', night: 'Night' },
  sort: { label: 'Sort', options: [{ value: 'house', label: 'House order' }, { value: 'price-asc', label: 'Price, low to high' }, { value: 'price-desc', label: 'Price, high to low' }] },
  gridTitle: 'All scents',
  empty: 'No scent for that hour yet.',
  highlight: {
    product: 'salt-quay',
    name: 'Salt Quay',
    text: 'Our first scent, and still the one we wear. The stone accord took two winters to stop smelling of a chemistry set and start smelling of a harbour wall after rain.',
    details: [
      { label: 'Notes', value: 'Sea fennel, wet stone, ambrette' },
      { label: 'Concentration', value: '18% in grape alcohol' },
      { label: 'Lasts', value: 'Six to eight hours' },
      { label: 'Bottle', value: '50 ml, ground glass stopper' },
    ],
    action: 'Add to bag',
  },
  collection: {
    season: 'All year',
    title: 'The early hours',
    text: 'Two scents for the first light: a harbour before the boats leave, a glasshouse with the vents just opened. Bright, cool and close to the skin, and the pair we suggest you start with.',
    pieces: ['salt-quay', 'orangery', 'discovery-set'],
  },
  faqTitle: 'Questions',
}

export const faq = [
  { q: 'How do I choose without smelling them first?', a: 'Start with the discovery set: five 2 ml vials, enough for a week of each. The €38 comes off your first full bottle, so trying costs nothing in the end.' },
  { q: 'How long does a scent last on skin?', a: 'Six to ten hours, depending on the scent and on you. The morning scents sit closer and softer; Reading Room and Night Ferry are still there the next day on wool.' },
  { q: 'Can I return a bottle I have opened?', a: 'We take back unopened bottles within 30 days. That is why every order carries a sample: wear the sample, and only break the seal once you are sure.' },
  { q: 'What is in them?', a: 'Organic grape alcohol, natural extracts and a small number of safe synthetics where nature cannot do the job, such as the stone and paper accords. No colourants, nothing tested on animals.' },
  { q: 'Do you ship outside the EU?', a: 'Yes, to the UK, Switzerland, Norway, the US and Canada. Delivery takes four to seven days and duties are shown before you pay.' },
  { q: 'Will my scent sell out?', a: 'Sometimes. We make batches of two hundred and the next one takes six weeks to rest. Subscribers to the seasonal letter hear before a batch runs low.' },
  { q: 'Do you refill bottles?', a: 'Every 100 ml bottle can come back to Sète for a refill at €190, postage paid both ways. The glass is made to be used for years.' },
]

export const product = {
  breadcrumb: 'Shop',
  option: 'Size',
  quantity: 'Quantity',
  fewer: 'One fewer',
  more: 'One more',
  action: 'Add to bag',
  note: 'Sent in two days. A sample comes with every bottle.',
  highlightAction: 'Add to bag',
  gridTitle: 'The other hours',
  added: (name: string) => `${name} is in your bag.`,
  viewBag: 'View bag',
}

export const bag = {
  title: 'Your bag',
  empty: 'Your bag is empty. Every scent starts with a place, so pick one.',
  emptyAction: 'Go to the shop',
  remove: 'Remove',
  subtotal: 'Subtotal',
  delivery: 'Delivery',
  deliveryFree: 'Free',
  deliveryPrice: 9,
  freeOver: 120,
  total: 'Total',
  checkout: 'Go to checkout',
  continue: 'Keep looking',
  view: 'View full bag',
  sample: 'A 2 ml sample of another scent is added to every order.',
}

export const cart = {
  title: { desktop: ['Your bag'], mobile: ['Your bag'] },
  intro: 'Check the sizes, then on to a short checkout. Delivery is free over €120.',
  columns: { item: 'Scent', size: 'Size', qty: 'Quantity', price: 'Price' },
  gridTitle: 'Before you go',
}

export const checkout = {
  title: { desktop: ['Checkout'], mobile: ['Checkout'] },
  intro: 'Three short steps. Your bag stays as it is until you pay.',
  contact: 'Contact',
  shipping: 'Delivery address',
  method: 'Delivery',
  payment: 'Payment',
  summary: 'Your order',
  fields: {
    email: 'Email',
    firstName: 'First name',
    lastName: 'Last name',
    address: 'Street and number',
    city: 'Town',
    postcode: 'Postcode',
    country: 'Country',
    countryPlaceholder: 'Choose a country',
    card: 'Card number',
    expiry: 'Expiry (MM/YY)',
    cvc: 'Security code',
    letter: 'Send me the seasonal letter, four times a year',
    gift: 'Wrap it as a gift, with a plain card',
  },
  methods: [
    { value: 'standard', label: 'Standard', text: 'Two to four days', price: 9 },
    { value: 'express', label: 'Express', text: 'Next working day', price: 18 },
    { value: 'collect', label: 'Collect in Sète', text: 'From the workshop, Tuesday to Saturday', price: 0 },
  ],
  countries: ['France', 'Belgium', 'Germany', 'Italy', 'Netherlands', 'Spain', 'Switzerland', 'United Kingdom', 'United States'],
  pay: (total: string) => `Pay ${total}`,
  secure: 'Payments are handled by our card processor; we never see your card number.', // PLACEHOLDER: connect a real processor
  errors: {
    email: 'Please write a full email address.',
    required: 'This one is needed for delivery.',
    country: 'Choose where it should go.',
    card: 'Card numbers are 16 digits.',
    expiry: 'Write it as MM/YY.',
    cvc: 'Three or four digits from the back.',
  },
  done: { title: 'Thank you', text: 'Your order is with us. We fill and number each bottle by hand and send it within two working days; a confirmation is on its way to your inbox.', action: 'Back to the shop' },
  emptyTitle: 'Nothing to pay for yet',
}

export const about = {
  title: 'About',
  masthead: { desktop: ['A house of', 'five places'], mobile: ['A house', 'of five', 'places'] },
  statement: 'We are two people at one bench in Sète, and we only make what we have stood inside.',
  // PLACEHOLDER — founders' names and history.
  bio: 'Hélène Vey trained as a perfumer in Grasse and spent eleven years composing for larger houses. Tomas Vey is a carpenter who built the workshop, its shelves and the crates the bottles travel in. They opened Maison Vey in 2019 above a chandlery on the quai de la Marine, with one scent and a list of four more places they wanted to keep.',
  stepsTitle: 'From the place to your shelf',
  steps: [
    { name: 'Standing in the place', text: 'We return to the same place at the same hour, again and again, and write down what is really there.', duration: 'One season' },
    { name: 'Building the formula', text: 'Hélène sketches the scent at the bench and wears each draft for a week before changing one thing.', duration: 'Six months to two years' },
    { name: 'Resting', text: 'Each batch of two hundred is mixed by hand and left in glass, in the dark, to round off.', duration: 'Six weeks' },
    { name: 'Filling and numbering', text: 'Filtered cold, poured by hand, stoppered, labelled and numbered by whoever filled it.', duration: 'Two days a batch' },
    { name: 'Sent to you', text: 'Folded into a box Tomas designed, with a sample of another place tucked beside it.', duration: 'Two working days' },
  ],
}

export const footer = {
  columns: [
    { title: 'Shop', links: [{ label: 'All scents', href: '/shop' }, { label: 'Discovery set', href: '/shop/discovery-set' }, { label: 'Your bag', href: '/cart' }] },
    { title: 'House', links: [{ label: 'About', href: '/about' }, { label: 'Questions', href: '/shop#questions' }] },
  ],
  visit: 'Visit',
  legal: [{ label: 'Privacy', href: '/legal#privacy' }, { label: 'Terms of sale', href: '/legal#terms' }],
  copyright: '© 2026 Maison Vey, Sète',
  line: 'Five scents, made by hand, one batch at a time.',
}

export const legal = {
  title: 'Privacy and terms',
  // PLACEHOLDER — have these checked before launch.
  privacy: {
    title: 'Privacy',
    text: [
      'We keep your name, address and email only to send your order and, if you ask for it, the seasonal letter. We do not sell or share them.',
      'Card payments are handled by our payment processor; card numbers never reach our servers. Write to atelier@maisonvey.com and we will send or delete what we hold about you within a month.',
    ],
  },
  terms: {
    title: 'Terms of sale',
    text: [
      'Prices include French VAT. Orders are sent within two working days from Sète. Unopened bottles can be returned within 30 days for a full refund; return postage is on us within the EU.',
      'If a bottle arrives damaged, send us a photograph within seven days and we will send a new one.',
    ],
  },
}

export const notFound = {
  title: { desktop: ['This hour has', 'not happened yet'], mobile: ['This hour', 'has not', 'happened yet'] },
  text: 'The page you were looking for is not here. The five places are.',
  action: 'Go to the shop',
  home: 'Back to the start',
}
