import Link from 'next/link'
import { notFound as copy } from '@/content/site'

// 404 — in the style's voice: a title card on the dark, the reel that never arrived, a running timecode stopped at zero.
export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-(--gutter) pt-24 pb-(--section-y) text-center">
      <p className="type-utility flex items-center gap-2 text-base text-(--color-muted)"><span aria-hidden className="size-1.5 bg-(--color-accent)" />{copy.label}</p>
      <h1 className="type-display mt-6 max-w-[12ch] text-[clamp(4rem,11vw,10rem)]">{copy.title}</h1>
      <p className="type-body mt-8 max-w-[40ch] text-(--color-muted)">{copy.text}</p>
      <p aria-hidden className="type-utility mt-8 text-base tabular-nums text-(--color-muted)">00:00:00:00</p>
      <Link href={copy.action.href} className="btn btn-solid mt-10">{copy.action.label}</Link>
    </section>
  )
}
