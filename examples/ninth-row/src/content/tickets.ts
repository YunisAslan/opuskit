// Copy deck — Tickets. Prices, hours, group rules and phone are PLACEHOLDERS for the owner's real ones.

export const reservation = {
  title: 'Take a seat',
  text: 'Pick a night, a film and a seat. The request goes to the box office from your own email, and we write back with your tickets.',
  hours: [
    'Box office, Monday to Thursday: 17:30 to 21:30',
    'Friday: 17:30 to 23:45, for Friday Late',
    'Saturday and Sunday: 14:30 to 21:30',
  ],
  group: 'Ten or more? Call us and we will hold a row.',
  phoneLead: 'Rather talk?',
  form: {
    film: 'Film',
    filmPlaceholder: 'Choose a film',
    date: 'Night',
    datePlaceholder: 'Choose a night',
    time: 'Screening',
    timePlaceholder: 'Choose a time',
    timeEmpty: 'Pick a night first',
    timeNone: 'No screening that night',
    count: 'Tickets',
    seat: 'Seat',
    seatHint: 'Optional. Tap a seat in the plan.',
    seatNone: 'Any good seat',
    name: 'Your name',
    email: 'Your email',
    notes: 'Anything we should know',
    notesPlaceholder: 'Wheelchair space, a birthday, a late arrival…',
    submit: 'Request tickets',
    waiting: 'Opening your email',
    done: 'Your email app has opened with the booking filled in. Send it, and the box office replies with your tickets, usually within the hour.',
    again: 'Book another',
    errors: {
      film: 'Choose a film.',
      date: 'Choose a night.',
      time: 'Choose a screening.',
      name: 'Tell us whose name to put on the tickets.',
      email: 'We need an email to send the tickets to.',
    },
  },
  stickyAction: 'Book tickets',
}

// The seat plan — the owner's fact: 120 seats. Laid out as 12 rows of 10 (PLACEHOLDER — the real plan).
export const seatPlan = {
  rows: 12,
  perRow: 10,
  ninth: 9,
  title: 'Choose your seat',
  screen: 'Screen',
  ninthLabel: 'The ninth row',
  ninthLine: 'Far enough back to take in the whole frame, close enough to lose the room.',
  chosen: (row: number, seat: number) => `Row ${row}, seat ${seat}`,
  clear: 'Clear seat',
}

export const pricing = {
  title: 'Prices',
  note: 'Every ticket includes a numbered seat. Concessions for students, over-65s and anyone under 16.',
  recommended: 'Best value',
  plans: [
    { name: 'Ten Films', price: '£85', period: 'ten tickets', line: 'For people who come every week.', features: ['Ten tickets for any screening', 'Bring a friend on any of them', 'Valid for twelve months'], recommended: true },
    { name: 'One Film', price: '£11', period: 'per ticket', line: 'Any screening, any night.', features: ['A numbered seat', '£8 concession', 'Booking by email or phone'] },
    { name: 'Friday Late', price: '£8', period: 'per ticket', line: 'The late-night series.', features: ['The Friday film after 23:00', 'Bar open until the credits end', 'Over-18s only'] },
  ],
  action: 'Book',
} // PLACEHOLDER — real prices

export const ticketsFaq = {
  title: 'Before you book',
  items: [
    { q: 'Can I change or cancel my tickets?', a: 'Up to two hours before the film, yes. Reply to your ticket email and we will move you to another screening or refund you.' },
    { q: 'When should I arrive?', a: 'Doors open twenty minutes before the film. We run one trailer, no adverts, then the lights go down. Late arrivals are seated at a quiet moment.' },
    { q: 'Do you sell tickets at the door?', a: 'Yes, when seats are left. Most Friday Lates and first-week screenings sell out, so booking ahead is safer.' },
    { q: 'Is there a wheelchair space?', a: 'Two, in the second row, with a companion seat beside each. Mention it when you book and we will hold one.' },
    { q: 'Can children come?', a: 'To anything rated for their age, and Sunday Matinee is made for them. Friday Late is over-18s only.' },
    { q: 'Can I book for a group?', a: 'Ten or more, call the box office. We can hold a whole row, the ninth if you ask early.' },
  ],
} // PLACEHOLDER — the owner's real policies
