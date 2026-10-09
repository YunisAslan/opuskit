// Copy deck — Shop and Product pages (they share the FAQ and the testimonials).
// PLACEHOLDER marks invented facts for the owner to confirm.

export const shop = {
  grid: {
    title: 'Hot stuff.',
    line: 'Every piece is thrown, glazed and fired in our studio. Small batches, so grab what you love.',
    filterLabel: 'Show',
    all: 'Everything',
    sortLabel: 'Sort',
    sorts: [
      { value: 'featured', label: 'Our favourites first' },
      { value: 'low', label: 'Price, low to high' },
      { value: 'high', label: 'Price, high to low' },
    ],
    empty: 'Nothing here right now. The kiln is warming up.',
    emptyAction: 'Show everything',
    thermo: { label: 'Kiln temperature', done: 'Cool enough to post' },
  },
  highlight: { product: 'morning-person-mug', action: 'Add to bag' },
  collection: {
    season: 'Autumn 2026', // PLACEHOLDER
    title: 'The Big Yellow Batch',
    lines: ['The Big', 'Yellow Batch'],
    text: 'Four pieces, one butter glaze, fired the same week. Made for grey days and people who refuse them.',
    action: 'Shop the batch',
    pieces: ['morning-person-mug', 'sunny-side-plate', 'show-off-vase', 'big-hug-mug'],
  },
  faq: {
    title: 'Questions? Answered.',
    items: [
      { q: 'Is it dishwasher safe?', a: 'Yes. Dishwasher and microwave safe. The glaze is food safe and fired hard. Hand-washing keeps the shine longest.' },
      { q: 'Why does mine look a bit different from the photo?', a: 'Because a person made it, not a machine. Glaze moves in the kiln, so every piece pools and shines a little differently. That’s the fun bit.' },
      { q: 'How fast do you post?', a: 'Within two working days, double-boxed. UK delivery is free over £50 and £4.50 under it.' }, // PLACEHOLDER
      { q: 'What if it arrives broken?', a: 'Send us a photo within 7 days and we’ll post a new one. No forms, no fuss.' },
      { q: 'Can I return it?', a: 'Yes, within 30 days if it’s unused. Pop it back in its box and email us first.' },
      { q: 'Do you post abroad?', a: 'Not yet. Ceramics and long journeys don’t get along. UK only for now.' }, // PLACEHOLDER
      { q: 'Sold out. Now what?', a: 'We fire a new batch roughly every three weeks. Join the newsletter and you’ll hear first.' },
    ],
  },
}

export const product = {
  breadcrumbHome: 'Home',
  breadcrumbShop: 'Shop',
  optionLabel: 'Glaze',
  quantity: 'How many',
  fewer: 'One fewer',
  more: 'One more',
  action: 'Add to bag',
  added: 'Added',
  soldOut: 'Sold out',
  soldOutNote: 'Back after the next firing, roughly three weeks.',
  soldOutAction: 'Tell me when it’s back',
  note: 'Free UK delivery over £50. Posted in two days.', // PLACEHOLDER
  testimonialsTitle: 'Overheard',
  gridTitle: 'Lonely? It has friends.',
  gridLines: ['Lonely?', 'It has friends.'],
}
