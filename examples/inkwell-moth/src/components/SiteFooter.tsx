'use client'
// The ending: the studio's name pastes itself together letter by letter from cut-out scraps, then the one quiet line.
// Reduced motion: the name is simply there, already pasted.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import type { ComponentProps } from 'react'
import { FooterSection } from './sections/Footer'
import { ScribbleLink } from './pieces/ScribbleLink'
import { Logo } from './Logo'
import { email, pages } from './SideIndex'

// Each scrap gets its own paper and ink, a resting tilt, and a spot it flies in from (fixed, so server and client agree).
const papers = ['bg-(--color-surface)', 'bg-(--color-secondary)', 'bg-(--color-text) text-(--color-background)', 'bg-(--color-surface)', 'bg-(--color-primary) text-(--color-background)']
const tilt = (i: number) => [-4, 3, -2, 5, -3, 2, -5, 4][i % 8]
const from = (i: number) => ({ x: ((i * 73) % 120) - 60, y: 80 + ((i * 37) % 90), rotate: ((i * 47) % 70) - 35 })

function AssembleName() {
  const reduce = useReducedMotion()
  const words = ['Inkwell', '&', 'Moth']
  let n = 0
  return (
    <motion.p initial="out" whileInView="in" viewport={{ once: true, amount: 0.4 }}
      className="flex flex-wrap gap-x-[0.35em] gap-y-2 px-5 pt-24 font-(family-name:--font-display) leading-none text-[clamp(3.2rem,12vw,9.5rem)] md:px-10 md:pt-40">
      <span className="sr-only">Inkwell &amp; Moth</span>
      {words.map((w) => (
        <span key={w} aria-hidden className="inline-flex">
          {[...w].map((ch) => {
            const i = n++
            return (
              <motion.span key={i} className={`inline-block px-[0.06em] ${ch === '&' ? 'font-(family-name:--font-heading) font-bold' : ''} ${papers[i % papers.length]}`}
                style={{ rotate: tilt(i) }}
                variants={{ out: { opacity: 0, ...from(i) }, in: { opacity: 1, x: 0, y: 0, rotate: tilt(i), transition: reduce ? { duration: 0 } : { delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>
                {ch}
              </motion.span>
            )
          })}
        </span>
      ))}
    </motion.p>
  )
}

// The footer's links use the hand-drawn underline, like every other link in the menu.
function FooterLink({ href, children, 'aria-current': cur }: ComponentProps<'a'>) {
  return <ScribbleLink link={Link} href={href ?? '/'} current={cur === 'page'}>{children}</ScribbleLink>
}

export function SiteFooter() {
  const path = usePathname()
  return (
    <div data-chrome className="overflow-hidden">
      <AssembleName />
      <FooterSection variant="line" link={FooterLink} logo={<Logo />}
        columns={[{ title: 'Pages', links: pages.map((p) => ({ ...p, current: path === p.href })) }]}
        copyright={`© 2026 Nell Arden, Sheki. ${email}`} />
    </div>
  )
}
