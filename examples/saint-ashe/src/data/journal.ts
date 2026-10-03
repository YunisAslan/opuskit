import { assets } from '@/config/assets'
import type { Entry } from '@/components/sections/Journal'

// Short notes from the workshop. Each points to where that story lives on the site.
export const journal: Entry[] = [
  { title: 'Wax that remembers where you sat', date: '18 September 2026', category: 'Materials', href: '/about#story', image: assets.product1.src, alt: '' },
  { title: 'Ember, cut in twelve weeks on one machine', date: '2 September 2026', category: 'Workshop', href: '/about', image: assets.studio.src, alt: '' },
  { title: 'Walking the collection through Sololaki', date: '21 August 2026', category: 'Lookbook', href: '/collections#lookbook', image: assets.look3.src, alt: '' },
  { title: 'Resoling the first pair of slouch boots', date: '30 July 2026', category: 'Repairs', href: '/contact#faq', image: assets.detail.src, alt: '' },
  { title: 'Why the tee weighs three hundred grams', date: '11 July 2026', category: 'Materials', href: '/collections#shop', image: assets.product3.src, alt: '' },
  { title: 'The shop on Kote Afkhazi Street is open', date: '20 June 2026', category: 'News', href: '/contact#visit', image: assets.shop.src, alt: '' },
]
