import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound } from '@/content/site'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end px-(--gutter) pb-(--section-y)">
      <div className="mx-auto w-full max-w-(--container)">
        <h1 className="type-display max-w-[12ch]">{notFound.title}</h1>
        <p className="type-body mt-8 max-w-[42ch] text-(--color-muted)">{notFound.line}</p>
        <Button asChild size="lg" className="mt-10"><Link href={notFound.action.href}>{notFound.action.label}</Link></Button>
      </div>
    </section>
  )
}
