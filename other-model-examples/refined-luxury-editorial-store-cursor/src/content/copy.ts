// Copy deck — written first, from the owner's own words: "A small perfume house making five scents
// by hand, each one a single place at a single hour." Names, prices and quotes are placeholders for
// the owner to confirm.

export const home = {
  hero: {
    lines: ['Perfume for', 'the hour you', 'remember'],
    sub: 'Five scents blended by hand in a small Antwerp workshop — each one a single place, at a single hour.',
    promise: '6 a.m. on the water — salt, wet rope and cold stone.',
    cta: 'Add to bag',
    secondary: 'See all five scents',
  },
  productGrid: {
    title: 'The five scents',
    text: 'Each is made to order in batches of forty, then left to settle for a month before it leaves the studio.',
  },
  collection: {
    season: 'Autumn, 2026',
    title: 'The Hours',
    text: 'One place, held at one hour. The first collection gathers five of them — a harbour at dawn, an orchard in the afternoon, a library at eleven, a courtyard in rain, a garden at dusk.',
  },
  editorial: {
    title: 'Made by hand, forty bottles at a time.',
    paragraphs: [
      'Maison Vey began in a sailmaker’s loft above the dock, with a notebook of hours rather than ingredients. We smell a place at a set time — before the boats leave, when the orchard is warmest — and build a scent that keeps it.',
      'Everything is blended and bottled by hand. We weigh each material on a brass scale, let the mixture settle for a month, and fill forty bottles before starting again. Nothing is rushed, and nothing is made in a quantity we cannot carry to the post ourselves.',
    ],
    pullQuote: 'A scent is a place, held at the hour it was worth remembering.',
    caption: 'The blending bench at first light, Antwerp.',
  },
  testimonials: {
    title: 'In their words',
    quotes: [
      { quote: 'Quiet Harbour is the only thing I wear on days that matter. It smells like the morning my father took me out on the water.', name: 'Ada Fenwick', role: 'Bookseller, Ghent' },
      { quote: 'Reading Room is exactly the library in my grandparents’ house. I did not expect a perfume to be this specific.', name: 'Tomas Reyne', role: 'Architect' },
      { quote: 'First Rain arrived on the first real day of autumn. It has not left my desk since.', name: 'Priya Mahendran', role: 'Ceramicist' },
    ],
  },
  trust: {
    items: [
      { title: 'Sent within two days', text: 'Every order is filled and posted from the studio, in recycled packaging.' },
      { title: 'Try before you commit', text: 'Any full bottle may be exchanged within 30 days, opened or unopened.' },
      { title: 'A sample with each order', text: 'We tuck a 2 ml sample of another scent into every parcel.' },
      { title: 'Made to be kept', text: 'Alcohol-free of fixatives, so a bottle is good for three years.' },
    ],
  },
  newsletter: {
    title: 'One letter, once a month.',
    text: 'A note from the workshop whenever there is a new hour in the notebook — what we made, and where it was. Nothing else, and easy to leave.',
    placeholder: 'you@example.com',
    button: 'Subscribe',
    note: 'Roughly one email a month. Unsubscribe in one click.',
  },
}
export const shop = {
  intro: {
    title: 'All five scents',
    text: 'Fifty millilitres, blended by hand and posted from the studio. Filter by family, or read how each hour was made.',
  },
  highlight: {
    name: 'First Rain',
    text: 'The scent we make most often. Petrichor, wet terracotta and green stem — the moment a summer courtyard is soaked for the first time in weeks.',
    action: 'Buy First Rain',
  },
  collection: home.collection,
  faq: {
    title: 'Questions',
    items: [
      { q: 'How large is a bottle?', a: 'Each scent comes in a 50 ml eau de parfum, hand-filled and sealed with wax. It lasts roughly two to three years of daily wear.' },
      { q: 'Is there a way to try before buying?', a: 'Yes. Every order includes a 2 ml sample of another scent, and we sell a Discovery Set of all five in 2 ml sprays.' },
      { q: 'How is it posted?', a: 'Orders leave the studio within two days, in recycled and refillable packaging. Standard delivery is two to four days across Europe, five to ten days worldwide.' },
      { q: 'What if I do not like it?', a: 'Any full bottle may be exchanged within 30 days, opened or unopened. Tell us the hour you were looking for and we will help you find it.' },
      { q: 'Are the bottles refillable?', a: 'They are. Return an empty bottle to the studio and we refill it for a third less, hand-poured the same way.' },
      { q: 'Do you make other sizes?', a: 'Not yet. We keep to 50 ml and the 2 ml discovery sprays so every batch stays small enough to make by hand.' },
    ],
  },
}

export const productCopy = {
  optionLabel: 'Size',
  optionValues: ['50 ml', '50 ml + 2 ml sample'],
  action: 'Add to bag',
  note: 'Posted from the studio within two days. Sample included.',
  details: [
    { title: 'Notes', text: '' },
    { title: 'Materials', text: 'Perfume oil, alcohol, water. Fill 50 ml. Bottled in recycled glass with a wax seal.' },
    { title: 'How to wear it', text: 'One pass at the pulse point, one at the collar. It opens in ten minutes and stays for six to eight hours.' },
    { title: 'Delivery and returns', text: 'Two to four days across Europe, five to ten worldwide. Exchange within 30 days, opened or unopened.' },
  ],
  relatedTitle: 'Pairs well with',
  relatedText: 'The other hours from the same notebook.',
}

export const about = {
  about: {
    title: 'About',
    statement: 'Maison Vey is one person, a brass scale and a notebook of hours — making five scents by hand, each one a single place at a single hour.',
    bio: 'Vera Vey trained as a perfumer in Grasse and came home to Antwerp to work slowly. She blends in a sailmaker’s loft above the dock, filling forty bottles before she starts again. Every scent in the house begins the same way: a place, a time, and a note written on the spot.',
  },
  process: {
    title: 'How an hour is made',
    steps: [
      { name: 'A place, at a time', text: 'We go and stand in the place at the hour — the harbour at six, the orchard at three — and write down what the air is doing.', duration: 'One visit' },
      { name: 'A formula, by hand', text: 'The notes are built into a formula on paper, then weighed out material by material on the brass scale.', duration: 'Two weeks' },
      { name: 'Settling', text: 'The blend is left to settle in the dark for a month, so the materials come together before it is judged.', duration: 'One month' },
      { name: 'Bottling, forty at a time', text: 'We fill, seal and box forty bottles by hand, then carry them to the post ourselves.', duration: 'Two days' },
    ],
  },
}

export const cartCopy = {
  title: 'Your bag',
  empty: 'Your bag is empty. The five scents are made to order — start with the hour you remember.',
  moreTitle: 'Begin with an hour',
  moreText: 'The five scents, made by hand in batches of forty.',
  subtotal: 'Subtotal',
  shipping: 'Shipping',
  shippingNote: 'Calculated at checkout',
  checkout: 'Checkout',
  continue: 'Continue shopping',
}

export const checkoutCopy = {
  title: 'Checkout',
  text: 'Two short steps, then it is on its way from the studio.',
  empty: 'Nothing to check out yet — your bag is empty.',
  contact: 'Contact',
  delivery: 'Delivery',
  payment: 'Payment',
  placeOrder: 'Place order',
  orderSummary: 'Order summary',
}