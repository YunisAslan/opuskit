import Link from "next/link"

const cols = [
  { title: "Shop", links: [["/shop", "All products"], ["/gift-cards", "Gift cards"], ["/size-guide", "Size guide"], ["/testimonials", "Testimonials"]] },
  { title: "Help", links: [["/shipping-returns", "Shipping & returns"], ["/faq", "FAQ"], ["/contact", "Contact"], ["/account", "Account"]] },
  { title: "Legal", links: [["/privacy", "Privacy policy"], ["/terms", "Terms of service"], ["/cookies", "Cookie policy"]] },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-content grid gap-12 py-24 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">BUYTOLOSE</p>
          <address className="mt-4 text-muted not-italic">
            Rua do Almada 88<br />4050-031 Porto, Portugal<br />
            <a className="link mt-1 inline-flex min-h-11 items-center" href="mailto:hello@buytolose.com">hello@buytolose.com</a>
          </address>
          <ul className="mt-6 flex gap-6 font-utility text-utility">
            <li><a className="link inline-flex min-h-11 items-center" href="https://instagram.com">Instagram</a></li>
            <li><a className="link inline-flex min-h-11 items-center" href="https://tiktok.com">TikTok</a></li>
          </ul>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="font-heading text-base font-semibold">{c.title}</h2>
            <ul className="mt-4">
              {c.links.map(([href, label]) => (
                <li key={href}><Link className="inline-flex min-h-11 items-center transition-opacity duration-150 hover:opacity-70" href={href}>{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="container-content pb-8 font-utility text-utility text-muted">© 2026 BUYTOLOSE Lda. Made in small runs in Porto.</p>
    </footer>
  )
}
