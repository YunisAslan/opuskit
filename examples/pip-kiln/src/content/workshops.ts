// Copy deck — Workshops. PLACEHOLDER marks invented facts: times, prices, group sizes, hours.

export const workshops = {
  intro: {
    title: 'Saturdays at the wheel',
    lines: ['Saturdays', 'at the wheel'],
    mobileLines: ['Saturdays', 'at the', 'wheel'],
    line: 'Never touched clay? Perfect. Two potters, six wheels, and you leave with something you made.',
  },
  services: {
    title: 'Pick your mess',
    items: [
      { name: 'Taster', line: 'Two hours on the wheel. Make a cup, make a mess, make a friend.' },
      { name: 'Full Saturday', line: 'Throw in the morning, add handles after lunch. Up to three pieces.' },
      { name: 'Glaze day', line: 'Already made something? Come back and dip it in colour.' },
      { name: 'Wheel for two', line: 'Side by side at two wheels. Dates, mates, mums.' },
      { name: 'Private party', line: 'Book the whole studio for up to eight. Bring cake.' },
    ],
  },
  schedule: {
    title: 'What happens when',
    lines: ['What happens', 'when'],
    days: [
      {
        label: 'Saturday',
        items: [
          { time: '10:00', title: 'Wedge it', detail: 'Kettle on, aprons on. Squish the air out of your clay.', stage: 0 },
          { time: '10:30', title: 'Throw it', detail: 'Centre the lump on the wheel and pull up your first walls.', stage: 1 },
          { time: '13:00', title: 'Lunch', detail: 'Soup in our mugs, obviously. Your pots firm up meanwhile.', stage: 1 },
          { time: '14:00', title: 'Handle it', detail: 'Trim the base and pull a handle. This is where it becomes a mug.', stage: 2 },
          { time: '15:30', title: 'Pick a glaze', detail: 'Choose Sunshine, Raspberry or Liquorice. We do the dipping.', stage: 3 },
        ],
      },
      {
        label: 'Three weeks later',
        items: [
          { time: 'Week 1', title: 'Bisque firing', detail: 'Your piece dries slowly, then gets its first trip to the kiln.', stage: 3 },
          { time: 'Week 3', title: 'Glaze firing', detail: 'Second firing at 1,240°C. The colour wakes up.', stage: 3 },
          { time: 'Any Sat', title: 'Collect it', detail: 'Pick it up from the studio, or we post it for £6.', stage: 3 }, // PLACEHOLDER
        ],
      },
    ],
    stages: ['A lump of clay', 'A thrown pot', 'A mug with a handle', 'A glazed mug'],
  },
  gallery: {
    title: 'Saturday, in pictures',
    lines: ['Saturday,', 'in pictures'],
    hint: 'Go on, pick one up.',
    view: { desk: 'Messy desk', grid: 'Tidy grid' },
    viewLabel: 'Show the photos as',
    photos: [
      // PLACEHOLDER captions — rewrite from the real photos
      { caption: 'The studio, 9:58 on a Saturday' },
      { caption: 'Centring. Harder than it looks.' },
      { caption: 'First walls going up' },
      { caption: 'Six wheels, one kettle' },
      { caption: 'Handles drying on the rack' },
      { caption: 'The glaze buckets' },
      { caption: 'Fresh out of the kiln' },
      { caption: 'Proud owner, wonky bowl' },
    ],
  },
  pricing: {
    title: 'What it costs',
    lines: ['What it', 'costs'],
    note: 'Clay, glaze, two firings, aprons and tea are always included.',
    recommended: 'Most picked',
    plans: [
      // PLACEHOLDER prices
      { name: 'Taster', price: '£45', period: 'person', line: 'Two hours, morning or afternoon.', features: ['One piece, glazed and fired', 'All clay and tools', 'Tea and biscuits'], action: { label: 'Book a taster', href: '#book' } },
      { name: 'Full Saturday', price: '£95', period: 'person', line: '10:00 to 16:00, lunch included.', features: ['Up to three pieces', 'Handles and trimming', 'Pick your glaze', 'Soup lunch'], action: { label: 'Book the day', href: '#book' }, recommended: true },
      { name: 'Wheel for two', price: '£170', period: 'pair', line: 'Full Saturday, side by side.', features: ['Two wheels, next to each other', 'Up to six pieces between you', 'Soup lunch for two'], action: { label: 'Book for two', href: '#book' } },
    ],
  },
  reservation: {
    title: 'Grab a wheel',
    lines: ['Grab', 'a wheel'],
    text: 'Pick a Saturday and tell us who’s coming. Your email app opens with it all written down, and we confirm within a day.',
    hours: [
      // PLACEHOLDER hours and policy
      'Workshops: Saturdays, 10:00 to 16:00',
      'Studio shop: Thursday to Saturday, 11:00 to 17:00',
      'Up to 8 people a session. Bigger group? Ask us.',
      'Ages 12 and up. Under 16s with a grown-up.',
    ],
    callPrompt: 'Rather call?',
    sticky: 'Book a Saturday',
    form: {
      name: 'Your name',
      email: 'Email',
      date: 'Saturday',
      datePlaceholder: 'Pick a Saturday',
      session: 'Session',
      sessionPlaceholder: 'Pick a session',
      sessions: [
        { value: 'taster-am', label: 'Taster, 10:00 to 12:00' },
        { value: 'taster-pm', label: 'Taster, 14:00 to 16:00' },
        { value: 'full', label: 'Full Saturday, 10:00 to 16:00' },
        { value: 'two', label: 'Wheel for two, 10:00 to 16:00' },
      ],
      people: 'How many',
      peoplePlaceholder: 'How many of you',
      message: 'Anything we should know?',
      messagePlaceholder: 'Left-handed, birthday, nervous, all three…',
      submit: 'Write my booking email',
      handoff: 'Your email app is opening with your booking written in. Press send and we’ll confirm within a day.',
      errors: { name: 'Who’s coming?', email: 'That email looks off.', date: 'Pick a Saturday.', session: 'Pick a session.', people: 'How many of you?' },
    },
  },
  faq: {
    title: 'Nervous? Don’t be.',
    items: [
      { q: 'I’ve never touched clay. Is that okay?', a: 'That’s most people. We start from the very first squish and stay at your elbow all day.' },
      { q: 'What should I wear?', a: 'Clothes you don’t mind getting muddy. We have aprons, but clay is sneaky. Short nails help.' },
      { q: 'When do I get my pieces?', a: 'About three weeks later, after two firings. Collect them on any Saturday, or we post them for £6.' }, // PLACEHOLDER
      { q: 'Can I cancel?', a: 'Move or cancel up to 7 days before for free. After that we can’t refill your wheel, sorry.' }, // PLACEHOLDER
      { q: 'Can kids come?', a: 'From age 12. Under 16s need a grown-up at the next wheel.' },
      { q: 'Do you sell gift vouchers?', a: 'Yes. Email us and we’ll send one with a date left blank, so they can pick.' },
    ],
  },
}
