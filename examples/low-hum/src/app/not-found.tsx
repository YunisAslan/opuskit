import Link from 'next/link'
import { TextEffect } from '@/components/pieces/TextEffect'
import { Button } from '@/components/ui/button'
import { t } from '@/components/site/type'
import { notFound } from '@/content/site'

// 404 — the needle skipped. A record with a scratch across it, spinning slowly; still when motion is reduced.
export default function NotFound() {
  return (
    <section className="px-(--gutter) pt-40 pb-(--section-y) md:pt-48">
      <div className="mx-auto flex max-w-(--container) flex-col items-center text-center">
        <svg aria-hidden viewBox="0 0 200 200" className="w-40 motion-safe:animate-[spin-slow_6s_linear_infinite] md:w-52">
          <circle cx="100" cy="100" r="99" fill="color-mix(in oklab, var(--color-background) 55%, black)" />
          {[92, 84, 76, 68].map((r) => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="var(--color-secondary)" strokeWidth="0.8" />)}
          <path d="M 40 150 L 150 52" stroke="var(--color-muted)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="100" cy="100" r="40" fill="var(--color-text)" />
          <text x="100" y="108" textAnchor="middle" fontSize="24" className="font-(family-name:--font-display)" fill="var(--color-background)">404</text>
          <circle cx="100" cy="100" r="3" fill="var(--color-background)" />
        </svg>
        <TextEffect as="h1" preset="slide" className={`${t.page} mt-12 max-w-[12ch]`}>{notFound.title}</TextEffect>
        <p className="type-body mt-6 max-w-[40ch] text-(--color-muted) [font-size:clamp(1.0625rem,1.3vw,1.1875rem)]">{notFound.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg"><Link href="/">{notFound.home}</Link></Button>
          <Button asChild size="lg" variant="outline"><Link href="/reservations">{notFound.book}</Link></Button>
        </div>
      </div>
    </section>
  )
}
