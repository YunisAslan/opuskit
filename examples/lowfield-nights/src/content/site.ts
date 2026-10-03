// All the words on the site, in one place. Names, programme and practical details are invented for this example.
import { EVENT } from '@/lib/event'
import type { AssetKey } from '@/config/assets'

export const brand = 'Lowfield Nights'
export const contactEmail = 'hello@lowfieldnights.az'
export const mapUrl = 'https://www.google.com/maps/search/?api=1&query=Zira%2C+Absheron%2C+Azerbaijan'

export const nav = [
  { label: 'Programme', href: '/#programme' },
  { label: 'Players', href: '/#players' },
  { label: 'Venue & travel', href: '/venue-and-travel' },
]
export const visit = [
  { label: 'Getting here', href: '/venue-and-travel#getting-here' },
  { label: 'The walk through the hangar', href: '/venue-and-travel#the-walk' },
  { label: 'Questions', href: '/faq' },
]

export const intro = {
  label: 'Lowfield Nights, 12–14 June 2027',
  statement: 'Three nights of silent films with live scores, in a hangar the airfield forgot.',
  body: 'Each night has one film and one score written for this room, then a late screening outside on the apron. Entry is free with an RSVP: 220 seats a night, on benches and blankets. The sea is two minutes’ walk from the door.',
}

export const schedule = [
  {
    label: EVENT.nights[0].label,
    items: [
      { time: '19:00', title: 'Doors and the long table', detail: 'Bread, cheese and tea on the apron while the light goes.' },
      { time: '20:30', title: 'Sevil (1929)', detail: 'Amo Bek-Nazarov’s silent drama, scored live by Kamran Sadiq on tar and tape loops.' },
      { time: '22:40', title: 'Night set on the apron', detail: 'Kamran Sadiq and guests, outside, until the last shuttle.' },
    ],
  },
  {
    label: EVENT.nights[1].label,
    items: [
      { time: '19:00', title: 'Doors and the long table', detail: 'Tea, bread and the food stalls open.' },
      { time: '20:30', title: 'Man with a Movie Camera (1929)', detail: 'Dziga Vertov’s city symphony with Tural Amirli’s double bass quartet.' },
      { time: '22:30', title: 'Sunrise (1927), under the sky', detail: 'Murnau on the outdoor screen, Ines Varga at the piano and electronics.' },
    ],
  },
  {
    label: EVENT.nights[2].label,
    items: [
      { time: '19:00', title: 'Doors and the long table', detail: 'The last long table. Stay for the walk.' },
      { time: '20:30', title: 'The Passion of Joan of Arc (1928)', detail: 'Dreyer’s close-ups, a choir of twelve, Nora Halloway on voice and strings.' },
      { time: '22:30', title: 'Last light', detail: 'We walk to the shore together. Bring a layer.' },
    ],
  },
]

export const people: { name: string; role: string; line: string; image: AssetKey }[] = [
  { name: 'Kamran Sadiq', role: 'Tar and tape loops, Saturday', line: 'Sevil was shot two streets from where I grew up. I score it from memory.', image: 'artist3' },
  { name: 'Tural Amirli', role: 'Double bass, Sunday', line: 'I play Vertov like a train timetable: on the beat, then just off it.', image: 'artist1' },
  { name: 'Ines Varga', role: 'Piano and electronics, Sunday late', line: 'Sunrise is a love story told mostly in fog. The piano should sound like fog.', image: 'artist2' },
  { name: 'Nora Halloway', role: 'Voice and strings, Monday', line: 'Joan barely speaks. The choir does the speaking for her.', image: 'artist4' },
]

export const location = {
  title: 'The hangar',
  address: 'Hangar 2, Lowfield airstrip\nZira coast road, Absheron\nAzerbaijan',
  hours: ['Doors 19:00, first film 20:30', 'Last shuttle back 00:30', '12, 13 and 14 June 2027'],
  notes: 'Free shuttle from 28 May metro in Baku at 18:00 and 18:30. By car it is 40 minutes east; park at the gate.',
}

export const reservation = {
  title: 'Hold a seat',
  text: 'Entry is free. Your RSVP holds a seat until 20:15 on the night; after that it goes to the door queue. Tell us which night and how many of you, up to four per RSVP.',
  hours: ['Doors 19:00, film 20:30', `${EVENT.seats} seats a night`, 'Groups over four: write to us'],
}

export type Faq = { id: string; q: string; a: string }
export const faqs: Record<string, Faq> = {
  free: { id: 'free', q: 'Is it really free?', a: 'Yes. Lowfield Nights is paid for by its partners and the bar. The RSVP is how we keep the hangar at 220 people, so the musicians can hear each other.' },
  nights: { id: 'nights', q: 'Can I come to more than one night?', a: 'Yes. Send one RSVP per night; each night is a different film and a different score.' },
  cancel: { id: 'cancel', q: 'What if I can’t make it after all?', a: 'Reply to our confirmation with “cancel”, so someone from the door queue gets your seat.' },
  travel: { id: 'travel', q: 'How do I get there?', a: 'Take the free shuttle from 28 May metro in Baku at 18:00 or 18:30, or drive 40 minutes east and park at the gate. Taxis know it as “Lowfield hangar, Zira road”.' },
  cold: { id: 'cold', q: 'Will it be cold?', a: 'The hangar is open on the sea side. June evenings are around 20 °C, with wind after dark, so bring a layer. Blankets are at the door.' },
  subtitles: { id: 'subtitles', q: 'Are the films subtitled?', a: 'They are silent films. Intertitles are shown in Azerbaijani and English, and the music does the rest.' },
  access: { id: 'access', q: 'Is the hangar accessible?', a: 'The floor is level concrete with step-free access from the parking. There are accessible toilets and a reserved row near the musicians; tell us in your RSVP.' },
  children: { id: 'children', q: 'Can I bring children?', a: 'Over-12s are welcome with an adult. The films are long and the nights end late.' },
  food: { id: 'food', q: 'Is there food?', a: 'Tea and bread at the long table are free. Food stalls open at 19:00 and take cash and card.' },
}
const pick = (...ids: (keyof typeof faqs)[]) => ids.map((id) => faqs[id])
export const faqSets = {
  home: pick('travel', 'cold', 'subtitles', 'free', 'children'),
  rsvp: pick('free', 'nights', 'cancel', 'access'),
  venue: pick('travel', 'cold', 'access', 'food'),
  all: Object.values(faqs),
}

export const travel = [
  { id: 'shuttle', tab: 'Shuttle', title: 'Free shuttle from Baku', text: 'From 28 May metro, exit 2. Leaves at 18:00 and 18:30; back at 23:45 and 00:30. No booking, just show your RSVP.' },
  { id: 'car', tab: 'Car', title: '40 minutes east of Baku', text: 'Follow the Zira coast road. Parking at the gate is free and the hangar is a 200 m walk.' },
  { id: 'taxi', tab: 'Taxi', title: 'Lowfield hangar, Zira road', text: 'About 25 AZN from the centre. After the last film there are cars waiting at the gate.' },
  { id: 'stay', tab: 'Staying over', title: 'Zira and Mardakan', text: 'Guesthouses 10 to 15 minutes away. Book early: the coast fills up in June.' },
]

// The walk through the hangar (Venue & travel): four named stops.
export const walk: { id: string; name: string; text: string; image: AssetKey; link: { label: string; href: string } }[] = [
  { id: 'the-hall', name: 'The hall', image: 'venue1', text: 'Inside Hangar 2: sixty metres of steel truss, the screen hung from the far beam. Benches up front, blankets at the back.', link: { label: 'Hold a seat', href: '/rsvp' } },
  { id: 'the-apron', name: 'The apron', image: 'venue2', text: 'The concrete outside, where the late film plays on Saturday and Sunday. Blankets are at the door.', link: { label: 'See the late films', href: '/#programme' } },
  { id: 'the-floor', name: 'The floor', image: 'venue3', text: 'The musicians play beneath the screen, at eye level. Arrive by 20:15 to sit close to them.', link: { label: 'Meet the players', href: '/#players' } },
  { id: 'the-shore', name: 'The shore', image: 'venue4', text: 'Two minutes from the hangar door. On the last night we walk here together after the film.', link: { label: 'Getting here', href: '#getting-here' } },
]
