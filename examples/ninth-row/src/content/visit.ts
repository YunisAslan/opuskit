// Copy deck — Visit. Address, hours and transit are PLACEHOLDERS for the owner's real ones.
import { site } from './site'

export const location = {
  title: 'Find the door',
  address: `${site.address.street}\n${site.address.city}`,
  hours: [
    'Open every night from 17:30',
    'Saturday and Sunday from 14:30',
    'Fridays until the late film ends',
  ],
  corners: {
    topLeft: site.address.street,
    topRight: 'Every night from 17:30',
    bottomLeft: '4 minutes from Bethnal Green',
    bottomRight: 'Look for the lit sign',
  },
  map: 'Open in maps',
  call: 'Call the box office',
  transitTitle: 'Getting here',
  transit: [
    { id: 'train', label: 'By train', text: 'Bethnal Green station, Central line. Leave by the Cambridge Heath Road exit and walk four minutes north.' },
    { id: 'bus', label: 'By bus', text: 'Routes 8, 106 and 254 stop on Cambridge Heath Road, two minutes away. Night buses run after Friday Late.' },
    { id: 'bike', label: 'By bike', text: 'Racks for twelve bikes in the yard, under the lit sign. A hire dock is at the corner.' },
  ],
} // PLACEHOLDER — the real address, hours and routes

export const visitFaq = {
  title: 'Questions',
  items: [
    { q: 'Is the cinema step-free?', a: 'Yes, from the yard to the auditorium. The toilets are on the same level, and two wheelchair spaces sit in the second row.' },
    { q: 'Do you have a bar?', a: 'A small one in the foyer: wine, beer, coffee and things to eat quietly. You can take drinks into the film.' },
    { q: 'Is there parking?', a: 'Not on site. There is pay-and-display on the streets around the yard, free after 18:30.' },
    { q: 'Are the films subtitled?', a: 'Foreign-language films always are. We run a captioned screening of every English-language film on Sunday afternoons.' },
    { q: 'How cold is it inside?', a: 'Comfortable, but old cinemas keep their draughts. We lend blankets at the door.' },
    { q: 'Can I hire the cinema?', a: 'For private screenings on weekday mornings, yes. Write to the box office with a date and what you want to show.' },
  ],
} // PLACEHOLDER — the owner's real answers
