'use client'
// Footer — Signature columns, with its closing moment: the brand name set large in the display face, its letters
// rising 40px with a 40ms stagger as the footer arrives (together on phones; in place under reduced motion), and the
// travelling mark coming to rest beside it — the journey visibly ends.
import { motion, useReducedMotion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useSyncExternalStore, type ReactNode } from 'react'
import { FooterSection } from '@/components/sections/Footer'
import { MotionSiteLink } from '@/components/SiteLink'
import { UnderlineFill } from '@/components/pieces/UnderlineFill'
import { MotifSlot } from '@/components/Motif'
import { email } from '@/config/product'

const WIDE = '(min-width: 1024px)'
const subscribeWide = (f: () => void) => { const m = matchMedia(WIDE); m.addEventListener('change', f); return () => m.removeEventListener('change', f) }

function Wordmark() {
  const reduce = useReducedMotion()
  const wide = useSyncExternalStore(subscribeWide, () => matchMedia(WIDE).matches, () => true) // phones: the letters rise together
  return (
    <div className="flex items-center gap-[0.18em] text-[clamp(3.5rem,6vw,5.5rem)]">
      <MotifSlot inverse rotate={0} className="size-[0.72em]" />
      <motion.p className="type-display leading-none [font-size:inherit]" initial="hidden" whileInView="shown" viewport={{ once: true, amount: 0.6 }}
        transition={reduce ? { duration: 0 } : { staggerChildren: wide ? 0.04 : 0 }}>
        <span className="sr-only">Halvik</span>
        {'Halvik'.split('').map((c, i) => (
          <motion.span key={i} aria-hidden className="inline-block" variants={{ hidden: { opacity: 0, y: 40 }, shown: { opacity: 1, y: 0 } }}
            transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>{/* same markup either way (hydration); reduced motion: shown in place */}{c}</motion.span>
        ))}
      </motion.p>
    </div>
  )
}

// The site's Links behaviour (UnderlineFill) on the dark footer: the piece paints with --color-text / --color-background,
// so they are swapped back to the footer's own ink (--ink) and ground (--paper), set on the wrapper below.
function FooterLink({ href, children }: { href: string; children?: ReactNode }) {
  return <span className="[--color-text:var(--ink)] [--color-background:var(--paper)]"><UnderlineFill href={href} link={MotionSiteLink}>{children}</UnderlineFill></span>
}

export function SiteFooter() {
  const path = usePathname()
  const cur = (href: string) => href === path
  const col = (title: string, links: { label: string; href: string }[]) => ({ title, links: links.map((l) => ({ ...l, current: cur(l.href) })) })
  return (
    <div className="pb-24 md:pb-0 bg-(--color-text) [--ink:var(--color-background)] [--paper:var(--color-text)]">
      <FooterSection link={FooterLink} variant="signature"
        logo={<div><Wordmark /><p className="type-body mt-6 max-w-[34ch] opacity-80">Small keyboards in powder-coated aluminium, made to stay on your desk.</p></div>}
        columns={[
          col('Shop', [{ label: 'Halvik 65', href: '#buy?build=complete' }, { label: 'Halvik 65 Barebones', href: '#buy?build=barebones' }, { label: 'Halvik Dial', href: '#buy?build=dial' }, { label: 'Pricing', href: '/#pricing' }]),
          col('Learn', [{ label: 'Overview', href: '/' }, { label: 'Features', href: '/features' }, { label: 'Swapping switches', href: '/features#how' }]),
          col('Help', [{ label: 'Contact', href: '/contact' }, { label: 'Questions', href: '/contact#faq' }, { label: email, href: `mailto:${email}` }]),
        ]}
        legal={[{ label: 'Shipping and returns', href: '/contact#faq' }, { label: 'Warranty', href: '/contact#faq' }]}
        copyright="© 2026 Halvik" />
    </div>
  )
}
