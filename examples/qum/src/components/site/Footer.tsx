import { FooterSection } from '@/components/sections/Footer'
import { posts } from '@/data/journal'
import { products } from '@/data/shop'
import { LiveStatus } from './LiveStatus'
import { Logo } from './Logo'
import { FooterLink } from './NavLink'

// Everything, listed — and the last stop is the way in: the lab, and whether it is open right now.
export function Footer() {
  return (
    <FooterSection variant="index" link={FooterLink}
      logo={
        <div className="space-y-4">
          <Logo className="text-[2.6rem]" />
          <p className="type-body max-w-[40ch] text-(--color-muted)">The last stop is our lab in Mardakan, where every batch is poured. Visitors are welcome on Saturdays. Orders open in spring.</p>
          <LiveStatus />
        </div>
      }
      contact={[{ label: 'hello@qum.az', href: 'mailto:hello@qum.az' }, { label: 'Instagram', href: 'https://instagram.com/' }]}
      columns={[
        { title: 'Shop', links: [...products.map((p) => ({ label: p.name, href: `/shop/${p.slug}` })), { label: 'Everything', href: '/shop' }] },
        { title: 'QUM', links: [{ label: 'Home', href: '/' }, { label: 'The salt', href: '/the-salt' }, { label: 'Visit the lab', href: '/the-salt#visit' }, { label: 'Journal', href: '/journal' }, { label: 'Help', href: '/help' }] },
        { title: 'Your order', links: [{ label: 'Your bag', href: '/cart' }, { label: 'Checkout', href: '/checkout' }, { label: 'Delivery and returns', href: '/help#delivery' }, { label: 'Write to us', href: 'mailto:hello@qum.az' }] },
        { title: 'Journal', links: posts.map((p) => ({ label: p.title, href: `/journal/${p.slug}` })) },
      ]}
      legal={[{ label: 'Privacy', href: '/help#privacy' }, { label: 'Terms of sale', href: '/help#terms' }]}
      copyright="© 2026 QUM, Mardakan, Azerbaijan"
    />
  )
}
