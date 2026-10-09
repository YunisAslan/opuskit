import Link from 'next/link'
import { Lines } from '@/components/motion/Lines'
import { buttonVariants } from '@/components/ui/button'
import { count, notFound } from '@/content/site'
import { number } from '@/lib/utils'

export const metadata = { title: 'Not found' }

export default function NotFound() {
  return (
    <section className="section-pad first-pad flex min-h-[80svh] items-center">
      <div className="frame grid gap-10 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="type-utility rise text-(--color-muted)">Page not found</p>
          <Lines as="h1" onLoad lines={notFound.title} className="type-display mt-6" />
          <p className="type-lead rise mt-8 max-w-[44ch] text-(--color-muted)" style={{ ['--i' as string]: 2 }}>{notFound.text}</p>
          <Link href={notFound.action.href} className={`${buttonVariants()} rise mt-10`} style={{ ['--i' as string]: 3 }}>{notFound.action.label}</Link>
        </div>
        <p className="type-caption rise self-end text-(--color-muted) md:col-span-3 md:col-start-10" style={{ ['--i' as string]: 4 }}>
          Plants counted elsewhere: <span className="tabular-nums text-(--color-text)">{number(count.plants)}</span>
        </p>
      </div>
    </section>
  )
}
