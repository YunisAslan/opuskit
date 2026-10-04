'use client'
// What the site's links do, shown on the real footer a Build Package ships (src/sections/Footer.tsx), in the recipe's
// own tokens — framed close on its link columns, the way a camera would, so the effect reads at card size. The links
// take turns: each gets a real hover (the events the piece listens for), no pointer drawn.
// `piece` undefined = the plain underline a site gets with no Links behaviour.

import { motion } from 'motion/react'
import { useEffect, useRef, useState, type ComponentProps, type ElementType } from 'react'
import { TokenScope } from '@/components/TokenScope'
import { DrawnLink } from '@/pieces/DrawnLink'
import { TextRoll } from '@/pieces/TextRoll'
import { TextScramble } from '@/pieces/TextScramble'
import { UnderlineFill } from '@/pieces/UnderlineFill'
import { FooterSection } from '@/sections/Footer'
import type { PaletteColors, ShapeStyle, TypographyPairing } from '@/types/domain'

export type LinkPiece = 'text-roll' | 'scribble-link' | 'wavy-link' | 'underline-fill' | 'text-scramble' | 'hover-highlight'

/** Steps through `n` beats while the demo is on screen; with reduced motion it rests on the first. */
export function useLoop(n: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null)
  const [i, setI] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let t: ReturnType<typeof setInterval> | undefined
    const io = new IntersectionObserver(([x]) => {
      clearInterval(t)
      if (x.isIntersecting) t = setInterval(() => setI((v) => (v + 1) % n), ms)
    }, { threshold: 0.2 })
    io.observe(el)
    return () => { io.disconnect(); clearInterval(t) }
  }, [n, ms])
  return [ref, i] as const
}

// A real hover without a hand: React works enter/leave out from the element the pointer leaves (an "out" event whose
// relatedTarget is where it lands), Motion listens for pointerenter/leave on each element itself — the demo sends both.
function hover(el: Element, on: boolean, box: Element) {
  let leaf = el
  while (leaf.firstElementChild) leaf = leaf.firstElementChild
  const [from, to] = on ? [box, leaf] : [leaf, box]
  from.dispatchEvent(new PointerEvent('pointerout', { bubbles: true, pointerType: 'mouse', isPrimary: true, relatedTarget: to }))
  from.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: to }))
  for (const n of [el, ...el.querySelectorAll('*')]) n.dispatchEvent(new PointerEvent(on ? 'pointerenter' : 'pointerleave', { pointerType: 'mouse', isPrimary: true }))
}

type A = ComponentProps<'a'> & { href: string; children: string }
const stop = (e: { preventDefault: () => void }) => e.preventDefault()

function Highlight({ href, children }: A) {
  const [on, setOn] = useState(false)
  return (
    <a href={href} onClick={stop} className="relative -mx-2 inline-block px-2" onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)}>
      {on && <motion.span layoutId="demo-highlight" className="absolute inset-0 rounded-[var(--radius-button,6px)] bg-(--color-text)/10" transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />}
      <span className="relative">{children}</span>
    </a>
  )
}
function Plain({ href, children }: A) {
  const [on, setOn] = useState(false)
  return <a href={href} onClick={stop} onPointerEnter={() => setOn(true)} onPointerLeave={() => setOn(false)} className={`underline decoration-1 underline-offset-4 transition-[text-decoration-color] duration-200 ${on ? 'decoration-current' : 'decoration-transparent'}`}>{children}</a>
}

// The footer's `link`: each Links behaviour wrapped around the footer's own anchors, as a built site wires it.
// HoverHighlight's block slides between them (the piece itself takes a whole list); `plain` is the footer's own
// underline, driven by a real hover since CSS :hover can't be sent.
const LINK: Record<LinkPiece | 'plain', ElementType> = {
  'text-roll': ({ href, children }: A) => <a href={href} onClick={stop}><TextRoll>{children}</TextRoll></a>,
  'scribble-link': ({ href, children }: A) => <DrawnLink stroke="scribble" href={href}>{children}</DrawnLink>,
  'wavy-link': ({ href, children }: A) => <DrawnLink stroke="wave" href={href}>{children}</DrawnLink>,
  'underline-fill': ({ href, children }: A) => <UnderlineFill href={href}>{children}</UnderlineFill>,
  'text-scramble': ({ href, children }: A) => <a href={href} onClick={stop}><TextScramble>{children}</TextScramble></a>,
  'hover-highlight': Highlight,
  plain: Plain,
}

// The footer is drawn at desktop width; the frame shows its link columns, CROP px wide from (CROP_X, CROP_Y).
const FOOT_W = 820, CROP_X = 300, CROP_Y = 72, CROP = 390
const COLUMNS = [
  { title: 'Studio', links: [{ label: 'Work', href: '#work' }, { label: 'Services', href: '#services' }, { label: 'Journal', href: '#journal' }, { label: 'About', href: '#about' }] },
  { title: 'Say hello', links: [{ label: 'hello@north.studio', href: '#mail' }, { label: 'Instagram', href: '#ig' }, { label: 'LinkedIn', href: '#in' }] },
]

export function LinkDemo({ piece, colors, type, shape, brand = 'North' }: { piece?: LinkPiece; colors: PaletteColors; type?: TypographyPairing; shape?: ShapeStyle; brand?: string }) {
  const [box, beat] = useLoop(5, 1250) // four links, then a beat at rest
  const [k, setK] = useState(0.5)
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(() => setK(el.offsetWidth / CROP))
    ro.observe(el)
    return () => ro.disconnect()
  }, [box])
  useEffect(() => {
    const root = box.current, el = root?.querySelectorAll('nav[aria-label="Studio"] a')[beat]
    if (!root || !el) return
    hover(el, true, root)
    return () => hover(el, false, root)
  }, [beat, box])

  return (
    <div ref={box} className="relative size-full overflow-hidden" style={{ background: colors.background }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: FOOT_W, transform: `scale(${k}) translate(${-CROP_X}px, ${-CROP_Y}px)` }}>
        <TokenScope colors={colors} type={type} shape={shape}>
          <FooterSection variant="signature" light link={LINK[piece ?? 'plain']} brand={brand}
            logo={<span className="type-display [font-size:5.5rem] leading-none">{brand}</span>}
            columns={COLUMNS} legal={[{ label: 'Privacy', href: '#p' }, { label: 'Imprint', href: '#i' }]} copyright={`© 2026 ${brand} Studio`} />
        </TokenScope>
      </div>
    </div>
  )
}
