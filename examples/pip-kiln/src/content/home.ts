// Copy deck — Home. Headlines are "problem? answer." jokes with a point; short lines only.
// PLACEHOLDER marks invented facts (quotes, names, season) for the owner to replace.

export const home = {
  hero: {
    product: 'morning-person-mug',
    // ≤ 8 words: "Grumpy mornings? Meet the Morning Person."
    headline: 'Grumpy mornings? Meet the Morning Person.',
    lines: ['Grumpy', 'mornings?'],
    tail: 'Meet the Morning Person.',
    mobileLines: ['Grumpy', 'mornings?'],
    line: 'A chunky, butter-bright mug, thrown and glazed by the two of us. Holds one proper tea.',
    action: 'Add to bag',
    secondary: 'See the whole shop',
    sticker: 'Thumb dip included',
    badge: 'New glaze',
  },
  categories: {
    title: 'Mug, plate or vase? Yes.',
    lines: ['Mug, plate', 'or vase? Yes.'],
    workshop: { name: 'Saturdays', count: '3 ways to book' },
  },
  grid: {
    title: 'Hot from the kiln? Cool enough to buy.',
    lines: ['Hot from the kiln?', 'Cool enough to buy.'],
    more: 'See them all',
  },
  collection: {
    season: 'Autumn 2026', // PLACEHOLDER
    title: 'The Big Yellow Batch',
    lines: ['The Big', 'Yellow Batch'],
    text: 'Grey sky? We glazed against it. One batch, four pieces, all dipped in our new butter glaze and fired the same week. When they’re gone, they’re gone.',
    action: 'Shop the batch',
    pieces: ['morning-person-mug', 'sunny-side-plate', 'show-off-vase', 'big-hug-mug'],
  },
  manifesto: {
    statement: 'Two of us. One kiln. Zero beige.',
    lines: ['Two of us.', 'One kiln.', 'Zero beige.'],
    attribution: 'House rule number one.',
  },
  testimonials: {
    title: 'Overheard',
    quotes: [
      // PLACEHOLDER — replace with real customer quotes and names
      { quote: 'I bought one mug. Now I own six and a vase, and my flatmate is jealous.', name: 'Hannah R.', role: 'Customer, Leeds' },
      { quote: 'My toast has never looked this happy. Neither have I, before nine.', name: 'Marcus O.', role: 'Customer, Bristol' },
      { quote: 'Arrived double-boxed and wrapped like treasure. The pink is even louder in real life.', name: 'Priya S.', role: 'Customer, Glasgow' },
      { quote: 'Came for a Saturday workshop, left with a wonky bowl I love more than anything I own.', name: 'Tom W.', role: 'Workshop guest' },
    ],
  },
  trust: [
    // PLACEHOLDER — confirm each promise
    { title: 'Posted in two days', text: 'Every order leaves the studio within two working days.' },
    { title: 'Free over £50', text: 'Free UK delivery on bags over £50. Under that, it’s £4.50.' },
    { title: 'Broken? Replaced', text: 'If the post wins a fight with your mug, we send a new one.' },
    { title: '30 days to decide', text: 'Not in love? Send it back within 30 days for a refund.' },
  ],
  newsletter: {
    title: 'Want first dibs on the next batch?',
    lines: ['First dibs', 'on the next', 'batch?'],
    text: 'One short email a month: what came out of the kiln, which Saturdays have space, and the odd wonky second going cheap.',
    placeholder: 'you@example.com',
    button: 'Sign me up',
    note: 'Once a month. One click to leave, no hard feelings.',
    handoff: 'Your email app is opening with the sign-up written for you. Press send and you’re in.',
  },
}
