'use client'
// Small pieces of site chrome that need the browser: the phone's sticky booking bar, and the reading line placement.
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { ScrollProgress } from '@/components/pieces/ScrollProgress'
import { brand, nav } from '@/content/site'
import { EASE_LINE, useStill } from '@/lib/motion'

/** Phones only: once the first screen is behind, booking stays under the thumb — Reserve and Call. On the home page
 *  it waits until the film has released, so it never covers a scene's message. */
export function StickyReserve() {
  const [show, setShow] = useState(false)
  const still = useStill()
  useEffect(() => {
    const on = () => {
      const hero = document.querySelector('[data-hero]')
      setShow(hero ? hero.getBoundingClientRect().bottom < window.innerHeight * 0.6 : window.scrollY > window.innerHeight * 0.6)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={still ? { opacity: 0 } : { y: '100%' }}
          animate={still ? { opacity: 1 } : { y: 0 }}
          exit={still ? { opacity: 0 } : { y: '100%' }}
          transition={{ duration: 0.45, ease: EASE_LINE }}
          className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] gap-2 border-t border-(--color-border) bg-(--color-background) px-(--gutter) pt-3 pb-[max(12px,env(safe-area-inset-bottom))] md:hidden"
        >
          <Link href={nav.action.href} className="btn btn-solid">{nav.sticky}</Link>
          <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="btn btn-line">Call</a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** The kit's reading line, on the long reading pages — not on the home page, where the film is the timeline, and not
 *  on the one-screen sign-in pages. */
const NO_LINE = ['/', '/sign-in', '/sign-up']
export function ReadingLine() {
  const path = usePathname()
  if (NO_LINE.includes(path)) return null
  return <ScrollProgress />
}
