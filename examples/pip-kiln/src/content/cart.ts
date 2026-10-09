// Copy deck — Cart and Checkout. PLACEHOLDER marks invented facts (delivery prices, collection day).

export const cart = {
  title: 'Your bag',
  lines: ['Your', 'bag'],
  emptyTitle: 'Emptier than a Monday mug.',
  emptyText: 'Nothing in here yet. Let’s fix that.',
  emptyAction: 'Go shopping',
  headings: { item: 'Piece', qty: 'How many', price: 'Price' },
  remove: 'Remove',
  fewer: 'One fewer',
  more: 'One more',
  subtotal: 'Subtotal',
  delivery: 'Delivery',
  free: 'Free',
  total: 'Total',
  checkout: 'Checkout',
  gauge: {
    label: 'Free delivery',
    to: (left: string) => `${left} more and delivery’s on us.`,
    done: 'Delivery’s on us!',
    sticker: 'Free!',
  },
  gridTitle: 'Room for one more?',
  gridLines: ['Room for', 'one more?'],
}

export const checkout = {
  title: 'Nearly yours.',
  lines: ['Nearly', 'yours.'],
  intro: 'Four quick steps. Then it’s in a box and on its way.',
  steps: { contact: 'Contact', address: 'Delivery address', delivery: 'Delivery', payment: 'Payment' },
  fields: {
    email: 'Email',
    name: 'Full name',
    line1: 'Address',
    city: 'Town or city',
    postcode: 'Postcode',
    gift: 'It’s a present. Leave the price out of the box.',
  },
  options: [
    { value: 'standard', label: 'Royal Mail, 2–3 days', note: 'Free over £50, otherwise £4.50' }, // PLACEHOLDER
    { value: 'collect', label: 'Collect from the studio', note: 'Free, any Saturday 10:00–16:00' }, // PLACEHOLDER
  ],
  payment: {
    title: 'Card payments aren’t open yet.',
    text: 'We’re still wiring up the till. For now, send us your order by email and we’ll reply within a day with a payment link.',
    button: 'Email this order',
    handoff: 'Your email app is opening with the whole order written in. Press send and we’ll reply within a day.',
  },
  summary: 'Your order',
  edit: 'Change the bag',
  empty: 'Your bag is empty, so there’s nothing to check out.',
  emptyAction: 'Go shopping',
  errors: {
    email: 'That email looks off. Mind checking it?',
    required: 'We need this one to post it.',
    postcode: 'That postcode looks off.',
  },
}
