// Copy deck — shared facts. Written from the owner's own words:
//   "Raster School: A six-week evening course in typographic design: grids, lettering and a poster of your own at
//    the end. Twelve seats a cohort, in our studio or online."
// Anything marked PLACEHOLDER was invented to make the page complete — replace it with the real fact.

export const site = {
  name: 'Raster School',
  sentence:
    'A six-week evening course in typographic design: grids, lettering and a poster of your own at the end. Twelve seats a cohort, in our studio or online.',
  seats: 12,
  weeks: 6,
  evenings: 12,
  hours: 36,
  // PLACEHOLDER — teaching evenings and times
  days: 'Tuesday and Thursday',
  daysShort: 'Tue and Thu',
  time: '18:30–21:30',
  timeZone: 'Europe/Zurich',
  zoneLabel: 'CET',
  // PLACEHOLDER — the studio, the address and the ways to reach it
  city: 'Basel',
  address: 'Feldbergstrasse 42, 4057 Basel, Switzerland',
  addressShort: 'Feldbergstrasse 42, Basel',
  email: 'hello@rasterschool.ch',
  phone: '+41 61 555 01 42',
  // PLACEHOLDER — legal line
  legal: 'Raster School GmbH, Basel',
  deposit: 'CHF 200',
} as const

export const nav = [
  { label: 'Curriculum', href: '/curriculum' },
  { label: 'Enrol', href: '/enrol' },
  { label: 'Instructor', href: '/instructor' },
  { label: 'FAQ', href: '/faq' },
] as const

export type Cohort = {
  id: string
  name: string
  format: 'Studio' | 'Online'
  dates: string
  start: string
  closes: string
  taken: number
}

// PLACEHOLDER — cohorts, dates and seats already taken. Every cohort has twelve seats (the owner's fact).
export const cohorts: Cohort[] = [
  { id: 'c18', name: 'Cohort 18', format: 'Online', dates: '10 Nov – 17 Dec 2026', start: '10 November', closes: '27 October', taken: 9 },
  { id: 'c19', name: 'Cohort 19', format: 'Studio', dates: '2 Mar – 10 Apr 2027', start: '2 March', closes: '16 February', taken: 5 },
  { id: 'c20', name: 'Cohort 20', format: 'Online', dates: '13 Apr – 20 May 2027', start: '13 April', closes: '30 March', taken: 0 },
]

export const nextCohort = cohorts[0]
export const seatsLeft = (c: Cohort) => site.seats - c.taken

/** "1 seat left", "3 seats left", "No seats left" — never "1 seats". */
export function seatsLine(c: Cohort) {
  const n = seatsLeft(c)
  if (n <= 0) return 'No seats left'
  return `${n} of ${site.seats} ${n === 1 ? 'seat' : 'seats'} left`
}

export type Quote = { quote: string; name: string; role: string }

// PLACEHOLDER — quotes, names and cohorts. Replace with real students' words, with their permission.
export const quotes: Quote[] = [
  {
    quote: 'I had set type for ten years without knowing why it worked. After twelve evenings I can defend every line on my poster.',
    name: 'Lena Fischer',
    role: 'Architect, studio cohort 9',
  },
  {
    quote: 'Twelve seats means nobody hides at the back. Every evening someone looked hard at my sheet, even through a camera.',
    name: 'Tomás Ibarra',
    role: 'Front-end developer, online cohort 11',
  },
  {
    quote: 'I came for the lettering and left with a grid I now use for everything, from our menus to the annual report.',
    name: 'Aiko Brunner',
    role: 'Communications lead, studio cohort 14',
  },
]

export type Faq = { q: string; a: string; topic: 'The course' | 'Applying and paying' | 'Online' }

// PLACEHOLDER — the policies in these answers (refunds, instalments, rates) follow the plans in content/plans.ts.
export const faqs: Faq[] = [
  { topic: 'The course', q: 'Do I need design experience?', a: 'No. Most students work in another field: architecture, code, writing, marketing. You need to be able to come to twelve evenings and spend about three hours a week on the hand-in.' },
  { topic: 'The course', q: 'What software do we use?', a: 'Pencil, ruler and paper first. Then any layout program you already have: InDesign, Affinity Publisher or Figma. We teach the method, not the menus.' },
  { topic: 'The course', q: 'What do I make in six weeks?', a: 'Six weekly hand-ins, from a text page on a baseline grid to your own drawn headline, and one poster of your own, printed on print day in an edition of 50 at A2.' },
  { topic: 'The course', q: 'How much time does it take outside class?', a: 'About three hours a week for the hand-in. Week five, the poster week, usually takes a little more.' },
  { topic: 'The course', q: 'What if I miss an evening?', a: 'Every lecture is recorded and shared the same night. You can move your desk crit to the online slot on Thursday.' },
  { topic: 'The course', q: 'Do I get a certificate?', a: 'Yes: a printed certificate stating 36 hours of teaching, signed by the instructor, set on the same grid as your poster.' },
  { topic: 'Applying and paying', q: 'How do I apply?', a: 'Fill in the application (about ten minutes). We reply within two working days to arrange a 15-minute call. A deposit of CHF 200 then holds your seat.' },
  { topic: 'Applying and paying', q: 'When do applications close?', a: 'Two weeks before the first evening, or earlier when the twelve seats are taken. The dates for each cohort are on the Enrol page.' },
  { topic: 'Applying and paying', q: 'Can I pay in instalments?', a: 'Yes. After the deposit you can pay the rest at once or in three monthly instalments, with no fee.' },
  { topic: 'Applying and paying', q: 'What if I have to cancel?', a: 'Up to 14 days before the first evening you get everything back, deposit included. After that we move your seat to a later cohort instead.' },
  { topic: 'Applying and paying', q: 'Is there a reduced price?', a: 'Yes. Students and anyone between jobs pay CHF 1,040 for the studio course. Three seats in each studio cohort are kept at this rate.' },
  { topic: 'Online', q: 'How does the online course work?', a: 'Live on video, on the same evenings and times, with a camera over the instructor’s desk. Same twelve seats, same instructors, same hand-ins.' },
  { topic: 'Online', q: 'Do online students get a printed poster?', a: 'Yes. We print your poster on print day with the studio cohort and post it to you. Postage within Europe is included.' },
  { topic: 'Online', q: 'Which time zone are the evenings in?', a: 'Central European Time, 18:30–21:30. That suits most of Europe, Africa and the Middle East.' },
]

export const faqsFor = (topics: Faq['topic'][]) => faqs.filter((f) => topics.includes(f.topic))
