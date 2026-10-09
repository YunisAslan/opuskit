import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { notFound as copy } from '@/content/site'

// The 404 in the shop's voice: "4 NOT FOUND 4" runs across the page with a dropped mug in pieces in the middle.
// Reduced motion: the line stands still.
function Shards() {
  return (
    <svg viewBox="0 0 240 160" aria-hidden className="w-[min(70vw,22rem)]">
      <g className="fill-(--color-surface) stroke-(--color-text)" strokeWidth="5" strokeLinejoin="round">
        <path d="M40 120 L52 52 Q80 44 100 48 L92 84 L104 100 L96 128 Z" transform="rotate(-14 70 90)" />
        <path d="M112 50 Q140 46 166 54 L172 126 L118 130 L126 102 L110 86 Z" transform="rotate(10 140 90)" />
        <path d="M184 70 Q214 70 214 92 Q214 112 186 112" fill="none" transform="rotate(24 200 90) translate(8 -6)" />
        <path d="M70 150 L84 138 L94 152 Z" />
        <path d="M150 146 L166 140 L160 156 Z" />
      </g>
    </svg>
  )
}

export default function NotFound() {
  const run = Array.from({ length: 3 }, () => copy.marquee).join('\u2003')
  return (
    <section className="flex min-h-[calc(100svh-var(--nav-h))] flex-col justify-center overflow-hidden py-16">
      <div aria-hidden className="relative py-[clamp(2rem,6vw,5rem)]">
        <p className="marquee type-display flex w-max whitespace-nowrap leading-[0.84] [font-size:clamp(5rem,16vw,15rem)]"><span className="pr-[0.5em]">{run}</span><span className="pr-[0.5em]">{run}</span></p>
        <div className="absolute inset-0 grid place-items-center"><div className="-rotate-6 rounded-full bg-(--color-background) px-6 py-2"><Shards /></div></div>
      </div>
      <div className="mt-6 px-(--gutter) text-center">
        <h1 className="t-sticker">{copy.title}</h1>
        <p className="type-body mx-auto mt-3 max-w-[40ch]">{copy.text}</p>
        <Button asChild className="mt-8"><Link href="/shop">{copy.action}</Link></Button>
      </div>
    </section>
  )
}
