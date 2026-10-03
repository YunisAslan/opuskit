'use client'
// Footer "Signature columns" + signature moment "A footer worth reaching": the brand name across the full width,
// its letters rising one after another (together on phones) as the footer arrives, and the travelling disc coming to
// rest beside it. Reduced motion: the wordmark simply sits in place (globals.css).
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { FooterSection } from '@/components/sections/Footer'
import { Logo } from './Logo'
import { MotifMark } from './Motif'
import { useMedia } from '@/hooks/use-media'

function RisingWordmark({ word }: { word: string }) {
  const phone = useMedia('(max-width: 47.99rem)')
  return (
    <div className="shell mt-20 md:mt-28">
      <div className="relative">
        <MotifMark pose="end" />
        <p aria-hidden data-wordmark className="type-display flex whitespace-nowrap leading-[0.85] [font-size:min(12.6vw,11rem)] [letter-spacing:-0.03em]">
          {[...word].map((ch, i) => (
            <motion.span key={i} className="inline-block" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: phone ? 0 : i * 0.04 }}>
              {ch}
            </motion.span>
          ))}
        </p>
      </div>
    </div>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  const link = (href: string, label: string) => ({ href, label, current: pathname === href })
  return (
    <FooterSection
      link={Link}
      logo={
        <div className="space-y-6">
          <Logo size="lg" />
          <address className="type-body max-w-[30ch] not-italic">Nohur lake shore, Gabala AZ3600, Azerbaijan</address>
        </div>
      }
      columns={[
        { title: 'Stay', links: [link('/', 'Home'), link('/rooms', 'Rooms'), link('/gallery', 'Gallery')] },
        { title: 'Visit', links: [link('/book', 'Book a stay'), link('/getting-here', 'Getting here')] },
        { title: 'Write', links: [{ href: 'mailto:stay@velmira.az', label: 'stay@velmira.az' }, { href: 'tel:+994242051840', label: '+994 24 205 18 40' }] },
      ]}
      closing={<RisingWordmark word="Velmira" />}
      legal={[{ href: '/book#questions', label: 'Cancellations' }, { href: '/getting-here#questions', label: 'House notes' }]}
      copyright="© 2026 Velmira. Nine rooms and a bathhouse."
    />
  )
}
