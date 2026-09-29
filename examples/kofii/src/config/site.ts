// Shop details and copy that the owner should confirm. Edit here; every page reads from this file.
export const site = {
  name: 'KOFİİ',
  email: 'hello@kofii.coffee',
  phone: '+1 555 014 2290',
  phoneHref: 'tel:+15550142290',
  address: ['14 Birch Street', 'Old Town'],
  mapHref: 'https://maps.google.com/?q=14+Birch+Street',
  transit: 'Two minutes from the Old Town tram stop. Bike racks by the door.',
  hours: [
    { days: 'Monday to Friday', time: '7:30–18:00' },
    { days: 'Saturday and Sunday', time: '9:00–17:00' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/' },
    { label: 'TikTok', href: 'https://tiktok.com/' },
  ],
}

export const navLinks = [
  { href: '/menu', label: 'Menu' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/locations', label: 'Locations' },
]

export const footerLinks = {
  explore: [
    { href: '/menu', label: 'Menu' },
    { href: '/order', label: 'Order online' },
    { href: '/reservations', label: 'Reservations' },
    { href: '/catering', label: 'Catering and private events' },
    { href: '/gift-cards', label: 'Gift cards' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/locations', label: 'Locations' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy policy' },
    { href: '/terms', label: 'Terms of service' },
    { href: '/cookies', label: 'Cookie policy' },
    { href: '/accessibility', label: 'Accessibility' },
    { href: '/sign-in', label: 'Sign in' },
  ],
}

// photo = index into `photos` in config/assets.ts (used for the hover preview)
export type MenuItem = { name: string; description: string; price: string; photo?: number }
export const menu: { title: string; items: MenuItem[] }[] = [
  {
    title: 'Hot coffee',
    items: [
      { name: 'Espresso', description: 'A short double shot of our house blend.', price: '2.80' },
      { name: 'Cortado', description: 'Espresso cut with a little warm milk.', price: '3.40' },
      { name: 'Flat white', description: 'Double shot, thin layer of silky milk.', price: '3.90' },
      { name: 'Latte', description: 'Espresso and steamed milk, poured slowly.', price: '4.20' },
      { name: 'Filter of the week', description: 'Single origin, brewed by hand. Ask what is on.', price: '3.60' },
    ],
  },
  {
    title: 'Iced coffee',
    items: [
      { name: 'Iced caramel latte', description: 'Espresso, cold milk, house caramel, lots of ice.', price: '4.80', photo: 4 },
      { name: 'Iced coffee with cold cream', description: 'Cold brew under a thick, lightly sweet cream top.', price: '4.60', photo: 5 },
      { name: 'Iced mocha', description: 'Espresso, dark chocolate, milk, whipped cream and caramel.', price: '5.20', photo: 6 },
    ],
  },
  {
    title: 'Blended',
    items: [
      { name: 'Mocha frappé', description: 'Coffee and chocolate blended with ice, cream on top.', price: '5.40', photo: 0 },
      { name: 'Blueberry frappé', description: 'Blueberries, milk and ice, finished with berry cream.', price: '5.40', photo: 1 },
      { name: 'Strawberry shake', description: 'Fresh strawberries, vanilla milk, crushed nuts.', price: '5.60', photo: 8 },
    ],
  },
  {
    title: 'Matcha',
    items: [
      { name: 'Iced matcha latte', description: 'Ceremonial matcha whisked to order over cold milk.', price: '4.90', photo: 3 },
      { name: 'Matcha frappé', description: 'Matcha, milk and ice, blended and topped with cream.', price: '5.40', photo: 7 },
    ],
  },
  {
    title: 'Something sweet',
    items: [
      { name: 'Blueberry cheesecake', description: 'Baked in the shop each morning, with a blueberry top.', price: '4.40', photo: 2 },
      { name: 'Cardamom bun', description: 'Soft, knotted, not too sweet. Best before noon.', price: '3.20' },
    ],
  },
]

export const faqs = [
  { q: 'Do I need a reservation?', a: 'No. Most tables are walk-in. Book ahead for groups of five or more, or for weekend mornings.' },
  { q: 'Do you have plant-based milk?', a: 'Yes. Oat and almond are always on, at no extra cost.' },
  { q: 'Can I bring my laptop?', a: 'Yes, on weekdays. There are plugs along the window bench. On weekends we keep tables free for people eating.' },
  { q: 'Is the shop step-free?', a: 'Yes. The entrance is level, and the toilet is accessible.' },
  { q: 'Are dogs welcome?', a: 'Yes. We keep water bowls by the door.' },
  { q: 'Do you sell beans to take home?', a: 'Yes. We grind them for your brewer if you ask, or sell them whole.' },
  { q: 'Can I order ahead for pickup?', a: 'Yes. Order online and choose a pickup time. We start the drink when you are five minutes away.' },
]

export const milestones = [
  { year: 'The first cart', text: 'KOFİİ started as a two-group espresso cart at the Saturday market. One grinder, one menu board.' },
  { year: 'A room with a window', text: 'We moved into a small room on Birch Street. Six tables, a long bench and a lot of daylight.' },
  { year: 'Baking in the shop', text: 'Cheesecake and cardamom buns joined the menu, baked each morning before we open.' },
  { year: 'Cold drinks, done properly', text: 'We added cold brew, frappés and matcha, made with the same care as a hot flat white.' },
  { year: 'Today', text: 'Two locations, the same small team, and the same rule: every drink is made to order.' },
]

export const locations = [
  { name: 'Old Town', address: ['14 Birch Street', 'Old Town'], note: 'The original room. Seats 28, bench by the window.', hours: 'Every day, see hours below', mapHref: 'https://maps.google.com/?q=14+Birch+Street' },
  { name: 'Riverside kiosk', address: ['Riverside Walk, Pier 2'], note: 'Takeaway only. Iced drinks, espresso and buns.', hours: 'Weekdays 7:00–15:00', mapHref: 'https://maps.google.com/?q=Riverside+Walk' },
]
