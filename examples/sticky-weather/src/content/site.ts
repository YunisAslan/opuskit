// Every word on the site, in one place. Clients are made up; the work photos are the studio's own (media-src/SOURCES.md).
import { assets, type AssetKey } from '@/config/assets'

export const brand = {
  name: 'Sticky Weather',
  email: 'hello@stickyweather.studio',
  phone: '+44 117 496 0123',
  phoneHref: 'tel:+441174960123',
  instagram: 'https://www.instagram.com/',
  booking: 'Booking new projects from November',
}

// Each project brings its own ground and ink (the colour chapters), so the section changes colour as it arrives.
// Ink is chosen for AA on its ground: plum on pink and orange, pale pink on Klein blue.
export type Work = { slug: string; title: string; meta: string; photo: AssetKey; ground: string; ink: string; text: string }

const blue = { ground: 'var(--color-chapter-1)', ink: 'var(--color-surface)' }
const pink = { ground: 'var(--color-chapter-2)', ink: 'var(--color-text)' }
const orange = { ground: 'var(--color-chapter-3)', ink: 'var(--color-text)' }

export const work: Work[] = [
  { slug: 'squeeze-club', title: 'Squeeze Club', meta: 'Packaging, 2026', photo: 'work1', ...orange, text: 'A juice box that looks squeezed straight out of an orange. One colour, one fold, no cartoon fruit anywhere.' },
  { slug: 'starling-goods', title: 'Starling Goods', meta: 'Shop identity, 2025', photo: 'work2', ...pink, text: 'A gift shop that sells small joys, so we gave it a bag people reuse until it falls apart. The stars are hand-cut, all 212 of them.' },
  { slug: 'soft-hours', title: 'Soft Hours', meta: 'Skincare packaging, 2025', photo: 'work3', ...blue, text: 'Calm boxes for a loud shelf. Peach, white and a typeface that whispers, so the product does the talking.' },
  { slug: 'foam-party', title: 'Foam Party', meta: 'Sticker set, 2026', photo: 'work4', ...orange, text: 'Twelve latte-art stickers for a café whose regulars collect them on their laptops. Free with every flat white, gone by noon.' },
  { slug: 'linden-mill', title: 'Linden Paper Mill', meta: 'Colour system, 2024', photo: 'work5', ...blue, text: 'A 140-year-old mill, forty paper colours and no system. Now there are eight families, each folded into a pocket swatch.' },
  { slug: 'lilac-and-lark', title: 'Lilac & Lark', meta: 'Business cards, 2024', photo: 'work6', ...pink, text: 'A florist’s cards in four shades of lilac, so every bunch leaves the shop with the right one tucked in.' },
]

export const journal = [
  { title: 'Why the Squeeze Club box has a secret inside', date: '12 Sep 2026', category: 'Packaging', href: '/practice#squeeze-club' },
  { title: 'Printing 400 latte stickers by hand, badly, then well', date: '28 Aug 2026', category: 'Print', href: '/practice#foam-party' },
  { title: 'A colour system you can fold in half', date: '3 Aug 2026', category: 'Colour', href: '/practice#linden-mill' },
  { title: 'Stars, but make them a shop', date: '14 Jul 2026', category: 'Identity', href: '/practice#starling-goods' },
  { title: 'Peach is a serious colour, actually', date: '20 Jun 2026', category: 'Packaging', href: '/practice#soft-hours' },
  { title: 'Business cards people refuse to throw away', date: '2 Jun 2026', category: 'Print', href: '/practice#lilac-and-lark' },
]

export const team = [
  { name: 'Mara Lindqvist', role: 'Founder, art direction', line: 'Has never met a pink she didn’t like.', photo: 'team2' as const },
  { name: 'Rio Vance', role: 'Packaging and print', line: 'Will fold anything twice to see what happens.', photo: 'team1' as const },
  { name: 'Arjun Mehta', role: 'Websites and motion', line: 'Makes the stickers move, then makes them stop.', photo: 'team3' as const },
].map((p) => ({ ...p, image: assets[p.photo].src, alt: assets[p.photo].alt }))

export const steps = [
  { name: 'Say hello', text: 'Tell us what’s stuck. A 30-minute call, no deck, no fee.', duration: 'Week 1' },
  { name: 'Sticker sketch', text: 'We draw the idea as one sticker first. If it doesn’t work that small, it won’t work big.', duration: 'Weeks 1 to 2' },
  { name: 'Make it real', text: 'Boxes, cards, screens. We print, fold and build until it holds up in your hand.', duration: 'Weeks 3 to 6' },
  { name: 'Stick it everywhere', text: 'Launch day, then a handover kit so your team keeps it going without us.', duration: 'Week 7' },
]

export const gallery = (['studio2', 'work4', 'studio5', 'work5', 'work3', 'work6', 'work2'] as const).map((k, i) => ({
  ...assets[k],
  caption: ['Offcuts we refuse to bin', 'Foam Party, fresh off the sheet', 'Linden’s colour fan, version eight', 'Folded swatches for the mill', 'Soft Hours on set', 'Lilac & Lark, the whole run', 'Starling Goods, bag number one'][i],
}))

export const location = {
  title: 'Lost? Follow the stickers.',
  address: 'Sticky Weather\nUnit 4, 12 Gasferry Road\nBristol BS1 6UN',
  hours: ['Monday to Thursday, 9:30 to 17:30', 'Friday, 9:30 to 15:00', 'Weekends, closed (probably printing)'],
  notes: 'Fifteen minutes’ walk from Temple Meads, or the ferry to Baltic Wharf. Ring the bell twice and we’ll put the kettle on.',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=12+Gasferry+Road+Bristol+BS1+6UN',
}

export const projectTypes = [
  { value: 'identity', label: 'An identity', ground: 'var(--color-chapter-3)' },
  { value: 'packaging', label: 'Packaging', ground: 'var(--color-chapter-2)' },
  { value: 'website', label: 'A website', ground: 'var(--color-surface)' },
  { value: 'stickers', label: 'Stickers, obviously', ground: 'var(--color-secondary)' },
] as const
