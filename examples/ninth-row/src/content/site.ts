// Copy deck — site-wide. Written from the owner's own words: "Ninth Row — a 120-seat arthouse cinema: new and old
// films every night, a late-night series on Fridays, tickets for every screening."
// Everything marked PLACEHOLDER is invented and waits for the owner's real detail; the rest is the owner's fact.

export const site = {
  name: 'Ninth Row',
  promise: 'A 120-seat arthouse cinema. New and old films every night, a late-night series on Fridays, tickets for every screening.',
  email: 'tickets@ninthrow.example', // PLACEHOLDER — the owner's booking address
  phone: '+44 20 7946 0909', // PLACEHOLDER — the box-office number
  address: { street: '9 Lantern Yard', city: 'London E2 7DJ' }, // PLACEHOLDER — the real address
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=9+Lantern+Yard+London', // PLACEHOLDER — follows the address
  boxOffice: 'Box office opens 30 minutes before the first film', // PLACEHOLDER — real opening rule
}

export const nav = {
  left: [
    { label: 'Programme', href: '/programme' },
    { label: 'Tickets', href: '/tickets' },
  ],
  right: [
    { label: 'Visit', href: '/visit' },
    { label: 'About', href: '/about' },
  ],
  action: { label: 'Book tickets', href: '/tickets#book' },
  menuOpen: 'Menu',
  menuClose: 'Close',
}

export const footer = {
  sign: 'Lights down nightly.',
  columns: [
    { title: 'Tonight', links: [{ label: 'Programme', href: '/programme' }, { label: 'Book tickets', href: '/tickets#book' }, { label: 'Prices', href: '/tickets#prices' }] },
    { title: 'Find us', links: [{ label: 'Visit', href: '/visit' }, { label: 'About', href: '/about' }, { label: 'Write to the box office', href: 'mailto:tickets@ninthrow.example' }] },
  ],
  legal: [{ label: 'Privacy', href: '/privacy' }, { label: 'Access', href: '/visit#questions' }],
  copyright: `© ${new Date().getFullYear()} Ninth Row`,
}

export const notFound = {
  label: 'Reel missing',
  title: 'This reel never arrived',
  text: 'The page you asked for is not on tonight’s programme. The lamp is still warm.',
  action: { label: 'Back to the programme', href: '/programme' },
}

export const privacy = {
  title: 'Privacy',
  text: [
    'We keep only what a booking needs: your name, your email and the screening you chose. Booking requests travel by your own email app, straight to the box office.',
    'We do not sell or share your details. Write to us and we will delete them.', // PLACEHOLDER — the owner's real policy
  ],
}
