// Copy deck — site-wide words: the name, the menu, the footer, contact details.
// PLACEHOLDER marks a fact the owner must confirm or replace (email, phone, address, prices, thresholds).

export const site = {
  name: 'Pip & Kiln',
  offer: 'Bright glazed mugs, plates and vases from a two-person pottery, sold in our online shop. Saturday workshops at the wheel.',
  description: 'Bright glazed mugs, plates and vases, thrown and glazed by two people. Buy them here, or come and make your own on a Saturday at the wheel.',
  email: 'hello@pipandkiln.co.uk', // PLACEHOLDER
  phone: '+44 1234 567 890', // PLACEHOLDER
  address: ['Unit 4, Brightside Yard', 'Bristol BS2 0XX'], // PLACEHOLDER
  currency: 'GBP', // PLACEHOLDER — prices are shown in pounds
  freeDeliveryFrom: 50, // PLACEHOLDER — free UK delivery from this bag total
  deliveryCost: 4.5, // PLACEHOLDER — standard UK delivery below the threshold
}

export const nav = {
  links: [
    { label: 'Shop', href: '/shop' },
    { label: 'Mugs', href: '/shop?type=mugs' },
    { label: 'Plates', href: '/shop?type=plates' },
    { label: 'Vases', href: '/shop?type=vases' },
    { label: 'Workshops', href: '/workshops' },
  ],
  bag: 'Bag',
  menu: 'Menu',
  close: 'Close',
  skip: 'Skip to the good stuff',
  sheetTitle: 'Your bag',
  sheetEmpty: 'Nothing in here yet. Your shelf deserves better.',
  sheetToBag: 'See the bag',
  sheetCheckout: 'Checkout',
  sheetShop: 'Go shopping',
}

export const footer = {
  sticker: 'Leaving so soon? The kettle’s still on.',
  line: 'Thrown, glazed and packed by two pairs of hands.',
  columns: [
    {
      title: 'Shop',
      links: [
        { label: 'Everything', href: '/shop' },
        { label: 'Mugs', href: '/shop?type=mugs' },
        { label: 'Plates', href: '/shop?type=plates' },
        { label: 'Vases', href: '/shop?type=vases' },
        { label: 'Your bag', href: '/cart' },
      ],
    },
    {
      title: 'Saturdays',
      links: [
        { label: 'Workshops', href: '/workshops' },
        { label: 'What happens when', href: '/workshops#schedule' },
        { label: 'Prices', href: '/workshops#pricing' },
        { label: 'Book a wheel', href: '/workshops#book' },
      ],
    },
    {
      title: 'Say hello',
      links: [
        { label: site.email, href: `mailto:${site.email}` },
        { label: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
      ],
    },
  ],
  legal: [
    { label: 'Delivery & returns', href: '/shop#questions' },
    { label: 'Workshop questions', href: '/workshops#questions' },
  ],
  copyright: `© ${new Date().getFullYear()} Pip & Kiln`,
}

export const notFound = {
  marquee: '4 NOT FOUND 4',
  title: 'Oops. We dropped it.',
  text: 'This page slipped off the shelf. The mugs are fine, honest.',
  action: 'Back to the shop',
}
