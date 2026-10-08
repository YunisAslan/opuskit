// Copy deck — the course itself: the six weeks, the evening, the way in, the people, the fees.
// PLACEHOLDER marks what the owner has to confirm or replace.
import { site } from './site'

export const hero = {
  // One sentence, ≤ 8 words, from the owner's own words. Broken by hand per breakpoint in the Hero.
  headline: 'Grids, letters and a poster of your own.',
  linesDesktop: ['Grids, letters', 'and a poster', 'of your own.'],
  linesMobile: ['Grids,', 'letters', 'and a', 'poster', 'of your', 'own.'],
  line: `A six-week evening course in typographic design. Twelve seats a cohort, in our ${site.city} studio or online.`,
  action: 'Apply for a seat',
}

export const manifesto = {
  // PLACEHOLDER — attribution
  statement: 'Every line on a good poster is there for a reason. In six weeks you will know yours.',
  attribution: 'Mira Vogt, lead instructor',
}

export type Step = { name: string; text: string; duration?: string }

export const wayIn = {
  title: 'How to get a seat',
  steps: [
    { name: 'Apply', text: 'Tell us who you are, which cohort you want and what you would like to make a poster about.', duration: '10 minutes' },
    { name: 'A short call', text: 'We call to check the course fits you. No portfolio needed, no test.', duration: '15 minutes' },
    { name: 'Hold your seat', text: `A deposit of ${site.deposit} holds one of the twelve seats. The rest is due two weeks before the first evening.`, duration: 'Within a week' },
    { name: 'Week zero', text: 'A reading list, the kit list and a first small exercise arrive a week before you start.', duration: '1 week' },
  ] satisfies Step[],
}

export const anEvening = {
  title: 'How an evening runs',
  steps: [
    { name: 'Look', text: 'Ten posters on the wall and one question about them. We start by looking, not talking.', duration: '15 minutes' },
    { name: 'Lecture', text: 'One idea, shown in real work, with the grid drawn over it.', duration: '30 minutes' },
    { name: 'Draw', text: 'Studio time with pencil, ruler and screen. The instructors go from desk to desk.', duration: '90 minutes' },
    { name: 'Pin-up', text: 'Everyone pins the evening’s sheet to the wall. We talk about three of them, out loud.', duration: '30 minutes' },
  ] satisfies Step[],
}

export type Module = { label: string; title: string; short: string; text: string; lessons: string[]; outcome: { label: string; value: string } }

// PLACEHOLDER — lesson titles; the arc (grids, lettering, a poster at the end) is the owner's.
export const curriculum = {
  title: 'Six weeks, week by week',
  text: `Twelve evenings, ${site.daysShort} ${site.time}. Each week adds one layer to the same poster, so by week six you are not starting, you are printing.`,
  note: 'Every lecture is recorded. Online cohorts follow the same weeks, on the same evenings.',
  modules: [
    { label: 'Week 1', short: 'The baseline', title: 'The baseline', text: 'How text is measured, and how a page gets its rhythm from one number.', lessons: ['Reading a type specimen', 'Measure and leading, by eye and by number', 'Setting a baseline grid', 'One page set three ways'], outcome: { label: 'Hand in', value: 'A text page on a 12 pt baseline' } },
    { label: 'Week 2', short: 'Columns', title: 'Columns', text: 'Margins, columns and gutters: the frame every later decision sits in.', lessons: ['Margins and proportion', 'Columns, gutters and fields', 'Hierarchy by size and position', 'Flush left, and when not to'], outcome: { label: 'Hand in', value: 'An event programme on 12 columns' } },
    { label: 'Week 3', short: 'Modules', title: 'Modules', text: 'Fields across rows and columns, and how pictures and tables live in them.', lessons: ['Fields and modules', 'Cropping pictures to the grid', 'Tables and timetables', 'Rules that sit on the lines'], outcome: { label: 'Hand in', value: 'A four-page leaflet' } },
    { label: 'Week 4', short: 'Letters', title: 'Letters', text: 'Drawing letters by hand, on a grid, until a word holds together.', lessons: ['Constructing letters on a grid', 'Stroke, contrast and width', 'Spacing a word by eye', 'From pencil to outline'], outcome: { label: 'Hand in', value: 'Your poster’s headline, drawn' } },
    { label: 'Week 5', short: 'The poster', title: 'The poster', text: 'Your own subject, three layouts, one decision.', lessons: ['Choosing a subject', 'Three layouts in one evening', 'Crit with the whole cohort', 'One signal colour'], outcome: { label: 'Hand in', value: 'The final layout, at full size' } },
    { label: 'Week 6', short: 'Print', title: 'Print', text: 'Proofs at 1:1, print day in the studio and a last crit in front of the wall.', lessons: ['Proofing at full size', 'Preparing files for Riso', 'Print day, Saturday', 'Final crit and hanging'], outcome: { label: 'You keep', value: '50 copies of your poster, A2' } },
  ] satisfies Module[],
}

// PLACEHOLDER — the programme of an evening and of print day
export const schedule = {
  title: 'A week in the studio',
  aside: `${site.zoneLabel}, every week of the six`,
  days: [
    { label: 'Tuesday', items: [
      { time: '18:30', title: 'Look', detail: 'Ten posters, one question.' },
      { time: '18:45', title: 'Lecture', detail: 'The week’s idea, in real work.' },
      { time: '19:15', title: 'Draw', detail: 'Studio time at your desk.' },
      { time: '20:45', title: 'Break' },
      { time: '21:00', title: 'Pin-up', detail: 'Three sheets, talked through.' },
    ] },
    { label: 'Thursday', items: [
      { time: '18:30', title: 'Desk crits', detail: 'Ten minutes one-to-one, by sign-up sheet.' },
      { time: '19:15', title: 'Workshop', detail: 'A hands-on exercise for the week.' },
      { time: '20:45', title: 'Break' },
      { time: '21:00', title: 'Hand-in', detail: 'The week’s sheet goes on the wall.' },
    ] },
    { label: 'Saturday, week 6 only', items: [
      { time: '10:00', title: 'Proofing', detail: 'Full-size proofs, last corrections.' },
      { time: '12:00', title: 'Print run', detail: '50 copies each, A2, Riso.' },
      { time: '15:00', title: 'Final crit', detail: 'Every poster on the wall.' },
      { time: '17:00', title: 'Opening', detail: 'Friends and family welcome.' },
    ] },
  ],
}

// PLACEHOLDER — names, roles and lines. The four portraits are the shot list's Home · Team photos.
export const team = {
  title: 'Who teaches',
  people: [
    { name: 'Mira Vogt', role: 'Lead instructor, grids and editorial', line: 'I teach the grid the way I learned it: pencil first, screen later.' },
    { name: 'Jonas Albrecht', role: 'Lettering', line: 'Draws letters for shop signs and book covers. He will ask you to draw an R forty times.' },
    { name: 'Elif Demir', role: 'Print, Riso and screen', line: 'Runs print day. Every poster goes through her machines.' },
    { name: 'Sam Okafor', role: 'Online cohorts and the studio', line: 'Answers your emails and makes the online room feel like the studio.' },
  ],
}

export type Plan = { id: string; name: string; price: string; period?: string; line: string; start: string; features: string[]; cohort: string; recommended?: boolean }

// PLACEHOLDER — every price
export const pricing = {
  title: 'Fees',
  plans: [
    { id: 'studio', name: 'Studio', price: 'CHF 1,480', line: `In the ${site.city} studio, desk and materials included.`, start: 'Next start 2 March', cohort: 'c19', recommended: true, features: ['12 evenings at the studio', 'Paper, pencils and print materials', 'Print day: 50 copies of your poster, A2', 'Recordings of every lecture'] },
    { id: 'online', name: 'Online', price: 'CHF 960', line: 'Live on video, on the same evenings.', start: 'Next start 10 November', cohort: 'c18', features: ['12 live evenings on video', 'Desk crits on camera', 'Your poster printed and posted to you', 'Recordings of every lecture'] },
    { id: 'reduced', name: 'Studio, reduced', price: 'CHF 1,040', line: 'For students and anyone between jobs.', start: 'Next start 2 March', cohort: 'c19', features: ['Everything in the studio course', 'Three seats per studio cohort', 'A student card or a short note is enough'] },
  ] satisfies Plan[],
  note: `A deposit of ${site.deposit} holds your seat. Pay the rest at once or in three monthly instalments.`,
  preview: 'Ask for the free preview lesson',
}

export const closing = {
  headline: 'Apply for one of twelve seats.',
  quiet: 'Cohort 18 starts online on 10 November.',
  action: 'Apply now',
}

// PLACEHOLDER — the instructor's history and numbers. The About portrait is the shot list's Instructor · About photo.
export const instructor = {
  first: 'Mira',
  last: 'Vogt',
  label: 'Lead instructor',
  statement: 'I started Raster School because I kept meeting people who could use every tool and still could not say why a page worked.',
  bio: 'Mira Vogt trained as a typesetter in Basel and spent nine years designing a weekly newspaper and exhibition catalogues. Then twelve years teaching typography at art school, before opening Raster School in the back room of a print shop in 2015. Mira still sets one poster a month for the theatre down the street.',
  stats: {
    title: 'In numbers',
    items: [
      { value: '204', label: 'Posters printed by students' },
      { value: '17', label: 'Cohorts taught' },
      { value: '12', label: 'Seats in every cohort' },
      { value: '19', label: 'Years teaching type' },
    ],
    note: 'Seventeen cohorts of twelve, one poster each.',
  },
}
