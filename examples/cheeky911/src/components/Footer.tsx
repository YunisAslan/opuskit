import Link from 'next/link'

const columns = [
  {
    title: 'Visit',
    items: [
      { label: 'hello@cheeky911.com', href: 'mailto:hello@cheeky911.com' },
      { label: 'Viewings by appointment', href: '/contact' },
    ],
  },
  {
    title: 'House',
    items: [
      { label: 'Collections', href: '/collections' },
      { label: 'Shop', href: '/shop' },
      { label: 'About', href: '/about' },
      { label: 'Journal', href: '/journal' },
      { label: 'Wholesale', href: '/wholesale' },
      { label: 'Gift cards', href: '/gift-cards' },
    ],
  },
  {
    title: 'Follow',
    items: [
      { label: 'Instagram', href: 'https://instagram.com' },
      { label: 'YouTube', href: 'https://youtube.com' },
      { label: 'Sign up for letters', href: '/sign-up' },
    ],
  },
  {
    title: 'Small print',
    items: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Size guide', href: '/size-guide' },
      { label: 'Privacy policy', href: '/privacy-policy' },
      { label: 'Cookie policy', href: '/cookie-policy' },
      { label: 'Terms of service', href: '/terms-of-service' },
    ],
  },
]

// Sticky under the page sheet on desktop, so the page lifts away to reveal it. Mobile: a normal footer.
export default function Footer() {
  return (
    <footer className="z-0 md:sticky md:bottom-0">
      <div className="mx-auto max-w-[1200px] px-6 pt-24 md:pt-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
          {columns.map((c) => (
            <div key={c.title}>
              <h2 className="type-utility mb-4 text-muted">{c.title}</h2>
              <ul className="flex flex-col">
                {c.items.map((i) => (
                  <li key={i.label}>
                    <Link href={i.href} className="flex min-h-11 items-center hover:text-muted md:min-h-8">
                      {i.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 1000 170" className="mt-16 block w-full px-4 md:mt-12" role="img" aria-label="CHEEKY">
        <text x="0" y="150" textLength="1000" lengthAdjust="spacingAndGlyphs" className="fill-primary font-display font-extrabold [font-size:196px] [font-stretch:150%]">
          CHEEKY
        </text>
      </svg>
      <p className="type-utility mx-auto max-w-[1200px] px-6 pb-8 pt-4 text-muted">© 2026 CHEEKY. Every car shown is photographed as found.</p>
    </footer>
  )
}
