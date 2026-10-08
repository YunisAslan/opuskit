import Link from 'next/link'
import { Section } from '@/components/site/SectionHead'
import { nav } from '@/content/site'

export default function NotFound() {
  return (
    <Section className="flex min-h-svh flex-col pt-[calc(var(--nav-top)+var(--nav-h)+clamp(40px,7vh,88px))]">
      <div className="raster">
        <p className="type-utility col-span-4 text-(--color-muted) sm:col-span-6 lg:col-span-12">Error 404</p>
        <h1 className="type-display col-span-4 mt-6 [font-size:clamp(3.5rem,11vw,10rem)] sm:col-span-6 lg:col-span-12">
          <span className="line-in" style={{ '--i': 0 } as React.CSSProperties}>This page is</span>
          <span className="line-in" style={{ '--i': 1 } as React.CSSProperties}>off the grid.</span>
        </h1>
      </div>
      <div className="raster mt-auto gap-y-6 border-t border-(--color-text) pt-4">
        <p className="type-body col-span-4 text-(--color-muted) sm:col-span-6 lg:col-span-4">
          The address may have changed, or a column was moved. Every page that exists is on the right.
        </p>
        <ul className="col-span-4 sm:col-span-6 lg:col-span-5 lg:col-start-8">
          {[{ label: 'Home', href: '/' }, ...nav].map((l) => (
            <li key={l.href} className="border-b border-(--color-border)">
              <Link href={l.href} className="press type-heading link-line flex min-h-14 items-center">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
