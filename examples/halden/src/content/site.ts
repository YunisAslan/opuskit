// Halden — copy deck. Every word on the site lives here, written before any layout (recipe/content.md).
// Voice: say less than you know; let the media finish the sentence. Headlines are fragments, ≤ 8 words.
//
// ⚑ OWNER TO REPLACE — anything marked `⚑` was invented to fill the shape of the page: the address, phone, email,
//   hours, prices, the quotes and their names. They read as real copy on the page; swap them for the real thing.

export const brand = {
  name: 'Halden',
  promise: 'Heat, salt water and the long quiet in between.',
  offer: 'A wood-fired sauna and cold-sea bathhouse on a northern coast.',
  phone: '+47 400 12 345', // ⚑
  email: 'bookings@haldenbaths.com', // ⚑
  address: 'Halden Bathhouse\nNordre Molo 4\n1769 Halden', // ⚑
  addressLine: 'Nordre Molo 4, 1769 Halden', // ⚑
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nordre+Molo+4+Halden', // ⚑
}

export const nav = {
  links: [
    { label: 'The baths', href: '/the-baths' },
    { label: 'Visit', href: '/visit' },
    { label: 'Questions', href: '/faq' },
    { label: 'Sign in', href: '/sign-in' },
  ],
  action: { label: 'Reserve a session', href: '/visit#reserve' },
  sticky: 'Reserve',
  menu: 'Menu',
  close: 'Close',
  callTip: 'Call the bathhouse',
}

// The opening film. Each scene's message lives in src/config/scenes.ts beside its timing.
export const hero = {
  title: 'Halden',
  line: 'Heat, salt water and the long quiet in between.',
  action: { label: 'Reserve a session', href: '/visit#reserve' },
}

export const services = {
  title: 'What is here',
  pageTitle: 'The baths',
  pageLine: 'One wood-fired room, one cold sea, and the time it takes to move between them.',
  items: [
    { name: 'The sauna', line: 'A wood-fired room for twelve, birch on the stove, the sea through one long window.', image: 'serviceSauna' },
    { name: 'The sea', line: 'A ladder off the jetty into open water, every month of the year.', image: 'serviceSea' },
    { name: 'Smoke sauna', line: 'Heated for six hours, aired, then entered. Saturdays, from October to April.', image: 'serviceSmoke' }, // ⚑ schedule
    { name: 'Cedar tubs', line: 'Two tubs on the rocks, fired by hand, for the time between dips.', image: 'serviceTubs' },
    { name: 'The quiet room', line: 'Wool blankets, tea from the stove, no phones past the door.', image: 'serviceQuiet' },
    { name: 'Private evenings', line: 'The whole bathhouse for your group, after eight.', image: 'servicePrivate' },
  ],
} as const

export const howItWorks = {
  title: 'A session, start to end',
  steps: [
    { name: 'Book a time', text: 'Two hours, chosen online; arrive a quarter of an hour early.', image: 'stepArrive', alt: '' },
    { name: 'Heat', text: 'Ten minutes on the cedar benches, or as long as it feels right.', image: 'stepHeat', alt: '' },
    { name: 'The sea', text: 'Down the jetty ladder, under once, and out again.', image: 'stepSea', alt: '' },
    { name: 'Rest', text: 'By the stove in wool, until the body comes back. Then again.', image: 'stepRest', alt: '' },
  ],
} as const

export const process = {
  title: 'The round',
  steps: [
    { name: 'Arrive', text: 'Change, shower, leave the phone in the locker. The staff walk you through the house once.', duration: '15 min' },
    { name: 'Heat', text: 'Sit high for heat, low for less. Water on the stones whenever the room agrees.', duration: '10–15 min' },
    { name: 'Cold', text: 'The jetty ladder, or the cold tub if the sea is rough. Breathe out on the way down.', duration: '1–2 min' },
    { name: 'Rest', text: 'Blanket, tea, the window. Most people go round three times.', duration: '20 min' },
  ],
} as const

export const gallery = {
  title: 'The house',
  stories: [
    { image: 'gallery1', heading: 'Built on the rocks', text: 'Bare timber on the rocks, the sea on three sides, the stove lit before first light.' },
    { image: 'gallery2', heading: 'Birch and stone', text: 'The fire is fed by hand all day. You can hear it from the benches.' },
    { image: 'gallery3', heading: 'The jetty at dusk', text: '' },
    { image: 'gallery4', heading: 'Eight degrees', text: 'The water in February. Nobody stays in long; everybody goes back.' },
    { image: 'gallery5', heading: 'After', text: 'Wool to the chin, salt on the lips, nothing to say.' },
    { image: 'secondaryVideo', heading: 'The last step down', text: '' },
  ],
  open: 'Open photo',
  close: 'Close',
  previous: 'Previous photo',
  next: 'Next photo',
} as const

// ⚑ All four quotes, names and roles are placeholders until real guests are asked.
export const testimonials = {
  title: 'Said on the way out',
  quotes: [
    { quote: 'I came for the sauna and stayed for the silence after. The sea at night is something else.', name: 'Ingrid S.', role: 'Comes on Thursdays' },
    { quote: 'Three rounds and the week was gone. I drove home without the radio on.', name: 'Martin O.', role: 'First visit, January' },
    { quote: 'The smoke sauna smells like a forest after rain. Worth the Saturday.', name: 'Aud H.', role: 'Season card' },
    { quote: 'We hired the house for my sister’s birthday. Twelve of us, one fire, very few words.', name: 'Jonas B.', role: 'Private evening' },
  ],
} as const

// ⚑ Prices are placeholders.
export const pricing = {
  title: 'Sessions',
  recommended: 'Most chosen',
  note: 'Towels, blankets and tea are in every price. Bring a swimsuit.',
  plans: [
    { name: 'One session', price: '€28', period: 'two hours', line: 'Sauna, sea and tubs.', features: ['Every room in the house', 'Towel and wool blanket', 'Tea by the stove'], action: { label: 'Reserve a session', href: '/visit#reserve' } },
    { name: 'Ten sessions', price: '€240', period: 'ten visits', line: 'For the ones who come back.', features: ['Ten two-hour sessions', 'Any day, no expiry for a year', 'Smoke sauna Saturdays included'], action: { label: 'Reserve with a card', href: '/visit#reserve' }, recommended: true },
    { name: 'Private evening', price: '€420', period: 'up to twelve', line: 'The house is yours after eight.', features: ['Three hours, after closing', 'Fire tended by our staff', 'Soup and bread on request'], action: { label: 'Ask for a date', href: '/visit#reserve' } },
  ],
} as const

// ⚑ Hours and transit details are placeholders.
export const location = {
  title: 'Finding us',
  hours: ['Monday closed', 'Tuesday to Friday, 7–21', 'Saturday and Sunday, 8–20'],
  notes: 'The coastal bus stops at the harbour, four minutes along the shore. Park by the boatyard; the path is lit after dark.',
  map: 'Open in maps',
  call: 'Call',
  arrivalAlt: 'The path along the shore to the bathhouse door',
  insideAlt: 'Inside the bathhouse, the benches and the long window',
} as const

export const reservation = {
  title: 'Reserve a session',
  pageTitle: 'Visit',
  pageLine: 'Two hours of heat and cold. Come as you are; bring a swimsuit.',
  text: 'Sessions start on the hour and last two. Groups of up to six book here; more than six, ask us for a private evening.',
  hours: ['Tuesday to Friday, 7–21', 'Saturday and Sunday, 8–20'], // ⚑
  phoneLead: 'Rather call?',
  form: {
    name: 'Name',
    email: 'Email',
    date: 'Day',
    datePlaceholder: 'Choose a day',
    time: 'Time',
    timePlaceholder: 'Choose a time',
    guests: 'Guests',
    guestsPlaceholder: 'How many',
    message: 'Anything we should know',
    messagePlaceholder: 'First time, an injury, a birthday',
    submit: 'Send the request',
    handoff: 'Your email app opens with the details filled in. We reply within the day.',
    toast: 'Your email is ready to send',
    toastLine: 'Nothing is booked until we reply to confirm.',
    errors: {
      name: 'Tell us who is coming.',
      email: 'An email we can answer.',
      date: 'Choose a day.',
      time: 'Choose a time.',
      guests: 'Choose how many.',
    },
  },
  times: ['07:00', '09:00', '11:00', '13:00', '15:00', '17:00', '19:00'],
  guests: ['1', '2', '3', '4', '5', '6'],
} as const

export const faq = {
  title: 'Questions',
  pageTitle: 'Questions',
  pageLine: 'What people ask before their first time.',
  search: 'Search the questions',
  empty: 'Nothing matches. Call us instead.',
  items: [
    { q: 'I have never been in a cold sea. Is it safe?', a: 'For most healthy adults, yes, in short dips. Go in slowly, stay a minute or less, and get out when your body says so. The staff watch the jetty during opening hours.' },
    { q: 'What do I need to bring?', a: 'A swimsuit. Towels, blankets, slippers and tea are here. Wool hats help in winter; we sell them at the door.' },
    { q: 'How hot is the sauna?', a: 'Between 75 and 90 degrees, depending on the day and where you sit. Higher benches are hotter. The smoke sauna runs softer and damper.' },
    { q: 'Is there an age limit?', a: 'Guests under sixteen come with an adult and stay out of the sea in rough weather. Children under eight are welcome at private evenings only.' },
    { q: 'What if the weather turns?', a: 'The sauna runs in any weather. If the sea is closed for wind, the cold tub replaces it and we tell you before you arrive.' },
    { q: 'Can I cancel?', a: 'Up to 24 hours before, at no cost. Later than that, we move your session to another day.' },
    { id: 'rules', q: 'Are there house rules?', a: 'A few. Shower before the sauna, swimsuits in shared sessions, no phones past the changing room, voices low in the quiet room. Nobody goes in the sea alone after dark.' },
    { id: 'privacy', q: 'What happens to my details?', a: 'We keep your name, email and visits to run your bookings and session card, and nothing else. We never sell or share them. Write to us and we delete them.' }, // ⚑ owner to confirm against the real privacy policy
  ],
} as const

export const footer = {
  columns: [
    { title: 'The house', links: [{ label: 'The baths', href: '/the-baths' }, { label: 'Visit', href: '/visit' }, { label: 'Questions', href: '/faq' }] },
    { title: 'Reach us', links: [{ label: brand.phone, href: `tel:${brand.phone.replace(/\s/g, '')}` }, { label: brand.email, href: `mailto:${brand.email}` }, { label: 'Nordre Molo 4, Halden', href: brand.mapUrl }] },
    { title: 'Account', links: [{ label: 'Sign in', href: '/sign-in' }, { label: 'Create an account', href: '/sign-up' }] },
  ],
  legal: [{ label: 'Privacy', href: '/faq#faq-privacy' }, { label: 'House rules', href: '/faq#faq-rules' }],
  copyright: `© ${new Date().getFullYear()} Halden Bathhouse`,
  sign: 'Heat, salt water, quiet.',
}

export const auth = {
  back: 'Back to Halden',
  signIn: {
    title: 'Welcome back',
    line: 'Your sessions, your card, your next visit.',
    email: 'Email',
    password: 'Password',
    remember: 'Keep me signed in',
    forgot: 'Forgot your password?',
    submit: 'Sign in',
    switch: 'New here?',
    switchLink: 'Create an account',
    errors: { email: 'Your email, please.', password: 'Your password, please.' },
    pending: 'Accounts open with online booking this winter. Until then, reserve by email or phone.', // ⚑ until a sign-in service is connected
  },
  signUp: {
    title: 'An account',
    line: 'Keep your session card, see your visits, book again in two taps.',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    passwordHint: 'At least eight characters.',
    terms: 'I have read the house rules.',
    submit: 'Create the account',
    codeTitle: 'Check your email',
    codeLine: 'We sent a six-digit code to',
    codeLabel: 'Code',
    codeSubmit: 'Confirm',
    switch: 'Already have one?',
    switchLink: 'Sign in',
    errors: { name: 'Your name, please.', email: 'An email we can reach.', password: 'At least eight characters.', terms: 'Please read the house rules first.', code: 'All six digits.' },
    pending: 'Accounts open with online booking this winter. Until then, reserve by email or phone.', // ⚑ until a sign-up service is connected
  },
}

export const notFound = {
  title: 'Nothing here',
  line: 'Only the sea and the dark. The path back is lit.',
  action: 'Back to the house',
}
