// Kelp Line — copy deck. Every word on the site lives here; layout reads it, never the other way round.
// Written from the owner's own line: "Volunteers replanting kelp forests on a cold northern coast: dives, beach days
// and a count of every plant in the water."
//
// PLACEHOLDER — anything marked [P] below was invented so the site reads as real: the place, names, dates, counts,
// prices, quotes, phone and email. Replace each with the true fact before going live; the full list is at the bottom.

export const site = {
  name: 'Kelp Line',
  /** [P] the coast, the town and its time zone — used for the live local time in the hero and footer */
  place: 'Skerra Bay',
  coast: 'the north coast',
  timeZone: 'Europe/London',
  email: 'hello@kelpline.org', // [P]
  phone: '+44 1632 960 418', // [P] — a reserved drama number until the real one is in
  address: 'The Boathouse, North Quay\nSkerra Bay', // [P]
  addressLine: 'The Boathouse, North Quay, Skerra Bay', // [P]
  charity: 'Registered charity SC 000000', // [P]
  year: 2026,
  description:
    'Volunteers replanting kelp forests on a cold northern coast: dives, beach days and a count of every plant in the water.',
}

/** The count — the one number the whole site turns on. [P] */
export const count = {
  plants: 41206,
  countedOn: '4 October 2026',
  nextDive: 'Sat 18 Oct, 08:30',
  seaToday: '11°C',
}

export const nav = {
  links: [
    { label: 'Our mission', href: '/our-mission' },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'Contact', href: '/contact' },
  ],
  action: { label: 'Donate', href: '/donate' },
  footer: [
    { label: 'Our mission', href: '/our-mission' },
    { label: 'Programs', href: '/programs' },
    { label: 'Stories', href: '/stories' },
    { label: 'Donate', href: '/donate' },
    { label: 'Contact', href: '/contact' },
  ],
}

// ───────────────────────────────── Home ─────────────────────────────────
export const home = {
  hero: {
    // two staggered lines; mobile re-breaks them by hand
    lines: ['Put a forest', 'back in the sea'],
    mobileLines: ['Put a forest', 'back in', 'the sea'],
    line: 'We are volunteers replanting kelp off Skerra Bay, one seeded line at a time. Dive with us, walk the shore with us, or help pay for the next plant.',
    action: { label: 'Donate', href: '/donate' },
    second: { label: 'Volunteer with us', href: '/programs' },
    caption: 'North reef at low water, the first lines planted in 2020.', // [P]
  },
  timeline: {
    title: 'How the forest came back',
    text: 'Eight years, a shed full of tanks and a lot of cold mornings. Each step is still in the water.',
    steps: [
      { when: '2018', title: 'Three divers count what is left', detail: 'A survey off the point finds a few stands where a forest used to be. Somebody has to start.' },
      { when: '2019', title: 'The first seeded lines', detail: 'Spores from the last wild plants, settled onto twine in a borrowed shed on the quay.' },
      { when: '2020', title: 'Six hundred plants on the north reef', detail: 'Our first outplanting dive. Most of them are still there.' },
      { when: '2022', title: 'Beach days begin', detail: 'Volunteers who do not dive start sorting, seeding and counting from the shore.' },
      { when: '2026', title: 'The reef seeds itself', detail: 'For the first time, young plants grow on the north reef that nobody planted.' },
    ], // [P] dates and events
  },
  stats: {
    title: 'In the water so far',
    stats: [
      { value: '41,206', label: 'Plants in the water' },
      { value: '212', label: 'Volunteers this year' },
      { value: '1,380', label: 'Dives logged' },
      { value: '9.4 ha', label: 'Seabed replanted' },
    ], // [P]
    note: 'Counted by hand, by divers, every autumn. Last count 4 October 2026.',
  },
  services: {
    title: 'Ways to join in',
    items: [
      { name: 'Replanting dives', line: 'Tie seedlings to the reef with a buddy and a dive lead. Qualified divers only.', href: '/programs' },
      { name: 'Beach days', line: 'Sort, seed and count on the shore. No diving, no experience, wellies welcome.', href: '/programs' },
      { name: 'Nursery evenings', line: 'Tend the seeded lines in the tanks on Wednesday evenings, all winter.', href: '/programs' },
      { name: 'The autumn count', line: 'Snorkel or dive the planted reefs and count every plant, one by one.', href: '/programs' },
      { name: 'Shore school', line: 'Rock-pool mornings for local classes, led by our volunteers.', href: '/programs' },
    ],
  },
  story: {
    title: 'A forest you cannot see from the shore',
    paragraphs: [
      'From the quay at Skerra Bay the water looks empty. Ten metres down it used to be a forest: kelp taller than a house, swaying in the swell, full of fish, crabs and the young of everything that lives on this coast.',
      'Storms, warmer summers and urchins took most of it in a single generation. When three of us dived the point in 2018, we found a few stands holding on, and a lot of bare rock.',
      'So we started small. A few wild plants, a borrowed shed, twine and tanks. Spores settle on the twine, grow into seedlings over the winter, and in spring divers tie them to the reef. Every autumn we count them, by hand, one by one.',
    ],
    quote: 'We do not need anyone to believe in the forest. We just need them to count it with us.',
    quoteBy: 'Ingrid Moss, co-founder', // [P]
    caption: 'Seedlings on a line, six weeks after seeding.', // [P]
    alt: 'Hands lifting a seeded line of young kelp out of the water',
  },
  ctaBand: {
    text: 'Beach days start again on Sunday 2 November. No diving needed.', // [P]
    action: { label: 'Join a beach day', href: '/contact' },
    note: 'Bring warm layers. We bring the tea and the gloves.',
  },
  journal: {
    title: 'From the logbook',
    entries: [
      { title: 'The 2026 count: 41,206 and a surprise on the north reef', date: '6 Oct 2026', category: 'The count', href: '/stories' },
      { title: 'Why we seed in October, not in spring', date: '22 Sep 2026', category: 'Nursery', href: '/programs' },
      { title: 'Forty volunteers, one beach and a lot of twine', date: '8 Sep 2026', category: 'Beach days', href: '/stories' },
    ], // [P]
  },
  newsletter: {
    title: 'The tide letter',
    text: 'One email on the first Sunday of the month: the next dives and beach days, the latest count and one photo from under the water.',
    placeholder: 'you@example.com',
    button: 'Sign me up',
    note: 'Once a month. Leave with one click, any time.',
  },
}

// ───────────────────────────────── Our mission ─────────────────────────────────
export const mission = {
  about: {
    title: 'Our mission',
    heading: ['We count every', 'plant because', 'nobody else did'],
    statement:
      'Kelp Line began with two divers, Ingrid Moss and Calum Reid, who grew up swimming in the forest off Skerra Bay and watched it go.', // [P]
    bio: 'Ingrid ran the dive school on the quay; Calum fixed boat engines and kept a fish tank in his kitchen. In 2019 they borrowed a shed, filled it with tanks and asked the town for help. Today more than two hundred volunteers dive, seed and count with us, and the reef is starting to look after itself.', // [P]
    caption: 'Ingrid and Calum on North Quay.', // [P]
    alt: 'The two founders of Kelp Line standing on the quay in dry suits',
  },
  story: {
    title: 'Why we count every plant',
    paragraphs: [
      'Planting is the easy part to photograph. The part that matters is what is still there a year later.',
      'So every September we go back. Divers and snorkellers swim the planted reefs in pairs, slate in hand, and count each plant: alive, grown, gone. It takes three weeks and most of the town’s spare wetsuits.',
      'The count tells us which reefs hold and which do not, where the urchins are winning, and which lines grew best in the nursery. It is how we know your gift is a plant in the water, not a promise. We publish it in full every October.',
    ],
    quote: 'A plant only counts if it is still there next autumn.',
    quoteBy: 'Tomas Lind, survey lead', // [P]
    caption: 'The north reef from the surface, two years after planting.', // [P]
    alt: 'A wide view of the sea over the replanted north reef',
  },
  team: {
    title: 'The people on the quay',
    people: [
      { name: 'Ingrid Moss', role: 'Co-founder, dive lead', line: 'Plans every dive and has never once been on time for tea.' },
      { name: 'Calum Reid', role: 'Co-founder, nursery', line: 'Keeps eleven tanks of seedlings alive through the winter.' },
      { name: 'Aileen Ferris', role: 'Beach days', line: 'Runs the shore crew, the kettle and the twine.' },
      { name: 'Tomas Lind', role: 'Survey lead', line: 'Owns the slate, the spreadsheet and the final number.' },
    ], // [P]
  },
  stats: {
    title: 'Eight years on the coast',
    stats: [
      { value: '8', label: 'Years on the water' },
      { value: '64%', label: 'Plants alive after one year' },
      { value: '23', label: 'Fish species back on the north reef' },
      { value: '146', label: 'Beach days held' },
    ], // [P]
    note: 'From the 2026 count. The full count is published every October.',
  },
}

// ───────────────────────────────── Programs ─────────────────────────────────
export const programs = {
  services: {
    title: 'Five ways into the water',
    intro: 'Pick the one that suits you. Most volunteers end up doing two.',
    items: [
      { name: 'Replanting dives', line: 'Saturday mornings, March to May. Tie seedlings to the reef in pairs, with a dive lead. You need your own qualification and a dry suit.' },
      { name: 'Beach days', line: 'Sundays, all year. Sort, seed and count on the shore. No diving and no experience needed.' },
      { name: 'Nursery evenings', line: 'Wednesdays, October to February. Clean tanks, check lines and watch the seedlings grow.' },
      { name: 'The autumn count', line: 'Three weeks in September. Snorkel or dive the planted reefs and count every plant.' },
      { name: 'Shore school', line: 'Weekday mornings in term. Rock-pool lessons for local classes, led by trained volunteers.' },
    ], // [P]
  },
  process: {
    title: 'A year in the life of one plant',
    steps: [
      { name: 'Collect', text: 'On a low tide in October we take a few ripe blades from wild plants, never the whole plant.', duration: 'One tide' },
      { name: 'Seed', text: 'Spores settle onto twine wrapped around tubes in the nursery tanks, cold and dim like the seabed.', duration: 'Six weeks' },
      { name: 'Grow', text: 'The seeded lines hang in sheltered water off the quay until the seedlings are a finger long.', duration: 'December to February' },
      { name: 'Outplant', text: 'Divers carry the lines to the reef and tie them to the rock, a metre at a time.', duration: 'March to May' },
      { name: 'Count', text: 'In September we swim back and count every plant. The ones that hold are the forest.', duration: 'Three weeks' },
    ], // [P]
  },
  stats: {
    title: 'The water we work in',
    stats: [
      { value: '7°C', label: 'Sea in March, when we plant' },
      { value: '13°C', label: 'Sea in August, at its warmest' },
      { value: '4 to 12 m', label: 'Depth of the planted reefs' },
      { value: '15 min', label: 'From the quay to the north reef' },
    ], // [P]
    note: 'Dry suits for every dive, all year. We lend them for beach days.',
  },
  ctaBand: {
    text: 'Dive places for spring 2027 open on 1 December.', // [P]
    action: { label: 'Ask about a place', href: '/contact' },
    note: 'Twenty-four places. Qualified divers, any club.',
  },
}

// ───────────────────────────────── Stories ─────────────────────────────────
export const stories = {
  testimonials: {
    title: 'In their words',
    heading: 'What the water gives back',
    quotes: [
      { quote: 'I dived this reef as a teenager and then it was bare for twenty years. Last spring I swam through kelp over my head again. I had to come up for a minute.', name: 'Morag Duncan', role: 'Volunteer diver since 2020' },
      { quote: 'I cannot dive. I sort twine and count seedlings on a Sunday, and somehow I am part of a forest.', name: 'Peter Allan', role: 'Beach day volunteer' },
      { quote: 'More fish in my creels off the north reef than in years. I did not believe it would work.', name: 'Jim Sinclair', role: 'Creel fisher, Skerra Bay' },
      { quote: 'My class still talks about the morning they held a crab that lives in the kelp.', name: 'Ruth Henderson', role: 'Teacher, Skerra Primary' },
    ], // [P]
  },
  story: {
    title: 'A Saturday on the north reef',
    paragraphs: [
      'The boat leaves the quay at half past eight, whatever the weather is pretending to do. Six divers, a dive lead, two crates of seeded lines in cold seawater and a flask that never lasts the morning.',
      'On the reef it is quiet and green. You find the marker, clip on, and tie each line to the rock with a buddy holding the slate. Forty minutes, sixty plants, numb fingers.',
      'Back on the quay the beach crew have the tea on and the twine sorted for next week. Somebody writes the number on the board. Then everyone goes home and sleeps for the afternoon.',
    ],
    quote: 'Forty minutes, sixty plants, numb fingers. Best morning of the week.',
    quoteBy: 'Morag Duncan, volunteer diver', // [P]
    caption: 'Clipping a seeded line to the reef at eight metres.', // [P]
    alt: 'Divers in a small boat on a grey sea over the north reef',
  },
  gallery: {
    title: 'From the dive log',
    // the moment: each photo captioned like a logbook entry — date, depth, sea temperature as quiet numbers [P]
    photos: [
      { alt: 'The north reef forest from above, kelp reaching the surface', caption: 'The north reef at slack water.', text: 'Six years after the first lines went in, the canopy reaches the surface on a low tide.', log: { date: '14 Aug 2026', depth: '0 m', temp: '13°C' } },
      { alt: 'Hands sorting seeded twine on a trestle table on the beach', caption: 'Twine for the nursery.', text: 'Every metre of line is wound by hand on a beach day, ready for the spores.', log: { date: '2 Nov 2025', depth: 'Shore', temp: '10°C' } },
      { alt: 'A diver counting kelp plants with a slate on the reef', caption: 'The count, plant by plant.', text: 'Alive, grown or gone. Each mark on the slate is one plant.', log: { date: '12 Sep 2026', depth: '8 m', temp: '12°C' } },
      { alt: 'Close view of a young kelp blade with light coming through it', caption: 'One blade, one season.', text: 'A seedling a finger long in March is taller than a diver by August.', log: { date: '30 Jul 2026', depth: '6 m', temp: '13°C' } },
      { alt: 'The nursery shed on the quay with tanks glowing in the evening', caption: 'Nursery evening.', text: 'Eleven tanks, kept cold and dim, carry the forest through the winter.', log: { date: '19 Feb 2026', depth: 'Shed', temp: '8°C' } },
      { alt: 'The dive boat leaving the quay in early morning light', caption: 'Half past eight, every Saturday.', text: 'The boat goes whatever the sky is doing. The sea decides if we dive.', log: { date: '25 Apr 2026', depth: 'Quay', temp: '8°C' } },
      { alt: 'A school class looking into a rock pool with a volunteer', caption: 'Shore school.', text: 'Most of the town’s children have now held a crab that lives in the kelp.', log: { date: '11 Jun 2026', depth: 'Shore', temp: '11°C' } },
      { alt: 'Volunteers on the beach at dusk after a planting day', caption: 'After the last dive of spring.', text: 'Twenty-four divers, sixty volunteers, 7,800 plants in one season.', log: { date: '24 May 2026', depth: 'Shore', temp: '9°C' } },
    ],
  },
}

// ───────────────────────────────── Donate ─────────────────────────────────
export const donate = {
  title: 'Every pound goes into the water',
  text: 'Pick a gift, once or every month. Each one says what it pays for. We publish the count every October, so you can see your plants.',
  /** [P] plants a pound puts in the water, from seed to reef — used for the live sentence beside the form */
  plantsPerPound: 4,
  currency: 'GBP',
  gifts: [
    { amount: 10, what: 'A metre of seeded line', detail: 'About forty seedlings, from spore to reef.' },
    { amount: 25, what: 'One morning on the boat', detail: 'Fuel and air for a planting dive.' },
    { amount: 60, what: 'A nursery tank for a month', detail: 'Light, cooling and seawater through the winter.' },
    { amount: 150, what: 'A diver’s season', detail: 'Training, kit checks and insurance for one volunteer diver.' },
  ], // [P]
  spendTitle: 'Where the money goes',
  spend: [
    { label: 'Nursery and planting', share: 52 },
    { label: 'Boats and dive safety', share: 24 },
    { label: 'Beach days and schools', share: 14 },
    { label: 'Running the charity', share: 10 },
  ], // [P]
  noteUntilPayment: 'Online payment opens soon. Until then your pledge reaches us by email and we send a secure payment link. Monthly gifts can be stopped at any time.',
  note: 'You finish on our secure payment page, by card or bank transfer. No account needed, and monthly gifts can be stopped at any time.',
  /** [P] the payment page. Empty until the owner connects one — the form then hands the pledge over by email instead. */
  paymentUrl: '',
  form: {
    title: 'Your gift',
    once: 'Once',
    monthly: 'Monthly',
    other: 'Other amount',
    name: 'Your name',
    email: 'Email',
    giftAid: 'I am a UK taxpayer. Add Gift Aid to my gift.',
    button: 'Continue to payment',
  },
  trust: [
    { title: 'Every plant counted', text: 'The full count is published each October.' },
    { title: 'Stop any time', text: 'Monthly gifts end with one email.' },
    { title: 'Gift Aid adds 25%', text: 'If you pay UK tax, at no cost to you.' },
    { title: 'A registered charity', text: 'Accounts filed and public every year.' },
  ],
  faq: {
    title: 'Questions before you give',
    items: [
      { q: 'How do I know my gift becomes plants?', a: 'We count every plant on every planted reef each September and publish the number, reef by reef, every October. Your gift pays for the work that number measures.' },
      { q: 'Can I give without a card?', a: 'Yes. The payment page takes bank transfer as well as card. You can also write to us for our bank details, or bring cash to a beach day.' },
      { q: 'How do I stop a monthly gift?', a: 'Send one email to hello@kelpline.org, or use the link in your receipt. It stops before the next payment, no questions asked.' },
      { q: 'Do you plant anything that is not native?', a: 'Never. Every spore comes from wild kelp on this coast, collected without taking the whole plant.' },
      { q: 'Can my company or club give together?', a: 'Gladly. Write to us and we will set up a line your team can dive, visit or count.' },
      { q: 'Does the money go to divers’ wages?', a: 'Every diver is a volunteer. Ten pence in each pound runs the charity; the rest goes to the nursery, the boats and the beach days.' },
    ], // [P]
  },
}

// ───────────────────────────────── Contact ─────────────────────────────────
export const contact = {
  schedule: {
    title: 'A week on the coast',
    intro: 'Come to any of these. Write first for a dive; just turn up for the rest.',
    days: [
      { label: 'Wednesday', items: [
        { time: '18:30', title: 'Nursery evening', detail: 'The shed on North Quay. October to February.' },
        { time: '20:30', title: 'Tea and the tank log', detail: 'Who checked what, and what grew.' },
      ] },
      { label: 'Saturday', items: [
        { time: '08:30', title: 'Boat leaves the quay', detail: 'Planting or counting, weather permitting.' },
        { time: '09:15', title: 'First dive', detail: 'North reef, four to twelve metres.' },
        { time: '12:30', title: 'Back on the quay', detail: 'Rinse kit, write the number on the board.' },
      ] },
      { label: 'Sunday', items: [
        { time: '10:00', title: 'Beach day', detail: 'Meet at the slipway. All ages, no diving.' },
        { time: '13:00', title: 'Soup and sorting', detail: 'Twine, seedlings and the week’s tally.' },
      ] },
    ], // [P]
  },
  cta: {
    headline: 'Come down to the water',
    quiet: 'The kettle is always on.',
    action: { label: 'Send us a postcard' },
  },
  postcard: {
    title: 'A postcard to the boathouse',
    lead: 'Write it like a postcard. It opens in your own email, addressed to us, ready to send.',
    message: 'Your message',
    messagePlaceholder: 'Hello from…',
    name: 'Your name',
    email: 'Your email',
    topic: 'About',
    topics: ['A beach day', 'A dive place', 'Shore school for my class', 'Giving or Gift Aid', 'Something else'],
    keep: 'Add me to the tide letter',
    button: 'Open in my email',
    done: 'Your email app has opened with the postcard filled in. Press send there and it reaches us.',
  },
  location: {
    title: 'Finding the boathouse',
    hours: ['Wednesday 18:30 to 21:00', 'Saturday 08:00 to 13:00', 'Sunday 10:00 to 15:00'], // [P]
    notes: 'The 52 bus stops at the harbour, five minutes’ walk. Park on Shore Road; the quay is for boats.', // [P]
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=North+Quay+Skerra+Bay', // [P]
    caption: 'The slipway at North Quay, where every beach day starts.', // [P]
    alt: 'The slipway and the boathouse door at North Quay',
  },
}

export const notFound = {
  title: ['Nothing planted', 'on this stretch'],
  text: 'The page you were looking for is not in the water. The forest is this way.',
  action: { label: 'Back to the shore', href: '/' },
}

/** Everything still to confirm with the owner — invented so the site reads as real. */
export const placeholders = [
  'Place: Skerra Bay, North Quay, the time zone, bus number and map link',
  'Email, phone and charity number',
  'All counts, dates and figures (plants, volunteers, dives, hectares, sea temperatures, survival rate)',
  'Founder and team names, roles and lines',
  'Testimonials and their names',
  'Gift amounts, what each pays for, plants per pound and the spending split',
  'The payment page link (donate.paymentUrl)',
  'Schedule times and opening hours',
]
