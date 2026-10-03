'use client'
// Footer "Signature columns" on the dark band, with its closing moment: the travelling mark comes to rest beside the
// brand name (on desktop it lands in the MotifStop; elsewhere the stop shows it still), and the name's letters rise in
// one after another as the footer arrives — together on phones, already in place with reduced motion.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion } from 'motion/react'
import { useSyncExternalStore, type ComponentProps } from 'react'
import { FooterSection } from '@/components/sections/Footer'
import { ScribbleLink } from '@/components/pieces/ScribbleLink'
import { MotifStop } from '@/components/Mark'
import { site } from '@/config/site'

function FooterLink({ href, children, 'aria-current': current }: ComponentProps<'a'>) {
  const internal = href?.startsWith('/')
  return <ScribbleLink link={internal ? Link : 'a'} href={href ?? '/'} current={current === 'page'} className="py-2 lg:py-1">{children}</ScribbleLink>
}

function Wordmark() {
  const reduce = useReducedMotion()
  const small = useSyncExternalStore(
    (cb) => { const mq = window.matchMedia('(max-width: 1023px)'); mq.addEventListener('change', cb); return () => mq.removeEventListener('change', cb) },
    () => window.matchMedia('(max-width: 1023px)').matches,
    () => false,
  )
  return (
    <motion.span aria-hidden className="type-display flex overflow-hidden pb-[0.06em] leading-[0.9] [font-size:clamp(3.25rem,6.6vw,5.5rem)]"
      initial="down" whileInView="up" viewport={{ once: true, amount: 0.6 }}>
      {[...site.name].map((ch, i) => (
        <motion.span key={i} className="inline-block" variants={{ down: { y: 40, opacity: 0 }, up: { y: 0, opacity: 1 } }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: small ? 0 : i * 0.04 }}>{ch}</motion.span>
      ))}
    </motion.span>
  )
}

export function SiteFooter() {
  const path = usePathname()
  const tel = `tel:${site.phone.replace(/\s/g, '')}`
  return (
    <div className="bg-(--color-text) max-lg:pb-20 [--color-chapter-1:var(--color-secondary)]">
      <FooterSection
        link={FooterLink}
        logo={
          <Link href="/" aria-label="Fennwood, home" className="inline-flex items-end gap-4">
            <MotifStop place="end" tone="light" size={60} pose={0} />
            <Wordmark />
          </Link>
        }
        columns={[
          { title: 'Pages', links: [
            { label: 'Home', href: '/', current: path === '/' },
            { label: 'This week’s menu', href: '/menu', current: path === '/menu' },
            { label: 'Book a table', href: '/reservations', current: path === '/reservations' },
            { label: 'Questions', href: '/reservations#faq' },
          ] },
          { title: 'Visit', links: [
            { label: '27 Larder Street, Bristol', href: site.mapUrl },
            { label: site.phone, href: tel },
            { label: site.email, href: `mailto:${site.email}` },
          ] },
        ]}
        legal={[{ label: 'Allergens', href: '/menu#allergens' }]}
        copyright="© 2026 Fennwood"
      />
    </div>
  )
}
