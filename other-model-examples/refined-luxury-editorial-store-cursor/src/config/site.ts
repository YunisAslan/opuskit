import type { AssetKey } from '@/config/assets'

// Site chrome: navigation, the primary action, and the footer's signature columns.
export const site = {
  name: 'Maison Vey',
  tagline: 'A small perfume house',
  description:
    'Maison Vey makes five scents by hand — each one a single place at a single hour.',
  email: 'atelier@maisonvey.com',
  address: '12 Rue des Vents, Antwerp',
} as const

export type NavItem = { label: string; href: string }

export const navLinks: NavItem[] = [
  { label: 'Shop', href: '/shop' },
  { label: 'The house', href: '/about' },
  { label: 'Journal', href: '/journal' },
]

export type FooterColumn = { title: string; links: { label: string; href: string }[] }

export const footerColumns: FooterColumn[] = [
  {
    title: 'Scents',
    links: [
      { label: 'All five scents', href: '/shop' },
      { label: 'Quiet Harbour', href: '/product/quiet-harbour' },
      { label: 'First Rain', href: '/product/first-rain' },
    ],
  },
  {
    title: 'The house',
    links: [
      { label: 'Our story', href: '/about' },
      { label: 'How we work', href: '/about#process' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'Care',
    links: [
      { label: 'Shipping', href: '/shop#faq' },
      { label: 'Returns', href: '/shop#faq' },
      { label: 'Contact', href: '/about#contact' },
    ],
  },
]

export const legalLinks: NavItem[] = [
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Terms', href: '/legal/terms' },
]

export const copyright = '© 2026 Maison Vey'

// Handy re-exports so pages don't reach into two files.
export type { AssetKey }