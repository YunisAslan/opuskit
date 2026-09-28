import Link from 'next/link'
import Logo from './Logo'

const cols = [
  {
    title: 'Drink',
    links: [
      { href: '/features', label: 'Features' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/comparison', label: 'Comparison' },
      { href: '/testimonials', label: 'Testimonials' },
      { href: '/faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
      { href: '/sign-in', label: 'Sign in' },
      { href: '/sign-up', label: 'Create account' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of service' },
      { href: '/cookies', label: 'Cookie policy' },
      { href: '/accessibility', label: 'Accessibility' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-border bg-background/90">
      <div className="container-text grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div className="flex flex-col gap-4">
          <Logo className="text-5xl" />
          <address className="type-body not-italic">
            Keepers Drinks Ltd.
            <br />
            Unit 4, 22 Hackney Wick Road
            <br />
            London E9 5ES
          </address>
          <a href="mailto:hello@keepersdrinks.com" className="link-quiet type-body min-h-11 w-fit py-3">
            hello@keepersdrinks.com
          </a>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="flex flex-col gap-2 border-t border-border pt-4 lg:border-t-0 lg:border-l lg:pl-6 lg:pt-0">
            <h2 className="type-heading text-2xl">{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-quiet type-body inline-flex min-h-11 items-center">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="container-text flex flex-col gap-2 border-t border-border py-6 text-muted sm:flex-row sm:justify-between">
        <p className="type-utility">© 2026 Keepers Drinks Ltd. Company no. 14820917.</p>
        <p className="type-utility">
          <a href="https://instagram.com" className="link-quiet mr-6">Instagram</a>
          <a href="https://tiktok.com" className="link-quiet">TikTok</a>
        </p>
      </div>
    </footer>
  )
}
