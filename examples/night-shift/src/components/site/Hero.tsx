'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMedia, useReduce } from '@/lib/useMedia'
import { useEffect, useRef, useState } from 'react'
import { assets } from '@/config/assets'
import type { SceneLayout } from '@/components/scene/ConsoleScene'

const ConsoleScene = dynamic(() => import('@/components/scene/ConsoleScene'), { ssr: false })

type Fact = { value: string; label: string }

// Phones, reduced motion, slow connections, weak devices and a failed context all keep the rendered poster.
function canRunScene() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string }; deviceMemory?: number }
  if (!matchMedia('(min-width: 768px) and (pointer: fine)').matches) return false
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (nav.connection?.saveData || /(^|-)2g|3g/.test(nav.connection?.effectiveType ?? '')) return false
  if ((nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) < 2) return false
  try { return !!document.createElement('canvas').getContext('webgl2') } catch { return false }
}

export function Hero({ line, action, meta, preview, facts }: { line: string; action: { label: string; href: string }; meta: string; preview: { label: string; href: string }; facts: Fact[] }) {
  const outer = useRef<HTMLElement>(null)
  const reduce = useReduce()
  const { scrollYProgress } = useScroll({ target: outer, offset: ['start start', 'end end'] })
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -48])
  const posterScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]) // the poster's own push-in when there's no scene

  const [scene, setScene] = useState<null | { layout: SceneLayout; poster: boolean }>(null)
  const [ready, setReady] = useState(false)
  const [active, setActive] = useState(true)
  const pinned = useMedia('(min-width: 768px)') // the pin (and so the text fade) only exists from md up

  useEffect(() => {
    // ?poster=wide|tall renders the scene alone, frozen, for the poster stills (see media-src/SOURCES.md).
    const p = new URLSearchParams(location.search).get('poster')
    const poster = p === 'wide' || p === 'tall'
    if (!poster && !canRunScene()) return
    const start = () => setScene(poster ? { layout: p, poster } : { layout: 'wide', poster })
    const id = 'requestIdleCallback' in window ? requestIdleCallback(start, { timeout: poster ? 1 : 1500 }) : setTimeout(start, 600)
    return () => { if ('cancelIdleCallback' in window) cancelIdleCallback(id as number); clearTimeout(id as number) }
  }, [])

  // render only while in view and while the tab is visible
  useEffect(() => {
    if (!scene || scene.poster) return
    let inView = true
    const update = () => setActive(inView && !document.hidden)
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update() })
    io.observe(outer.current!)
    document.addEventListener('visibilitychange', update)
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', update) }
  }, [scene])

  useEffect(() => { if (ready && scene?.poster) (window as unknown as { __posterReady: boolean }).__posterReady = true }, [ready, scene])

  if (scene?.poster) return (
    <div className="fixed inset-0 z-[100]"><ConsoleScene layout={scene.layout} poster active onReady={() => setReady(true)} onLost={() => {}} /></div>
  )

  const live = !!scene && !reduce
  return (
    <section ref={outer} aria-labelledby="hero-title" className="relative md:motion-safe:h-[175svh]">
      <div className="relative md:h-svh md:min-h-[640px] md:overflow-hidden md:motion-safe:sticky md:motion-safe:top-0">
        <div className="relative h-[60svh] min-h-[360px] overflow-hidden md:absolute md:inset-0 md:h-auto">
          <motion.picture className="block size-full origin-[42%_42%]" style={live || reduce || !pinned ? undefined : { scale: posterScale }}>
            <source media="(min-width: 768px)" srcSet={assets.heroPoster.src} width={assets.heroPoster.width} height={assets.heroPoster.height} />
            <img src={assets.heroPosterMobile.src} alt={assets.heroPoster.alt} width={assets.heroPosterMobile.width} height={assets.heroPosterMobile.height}
              fetchPriority="high" className="size-full object-cover" />
          </motion.picture>
          {scene && (
            <div className={`absolute inset-0 transition-opacity duration-700 ease-out ${ready ? 'opacity-100' : 'opacity-0'}`}>
              <ConsoleScene layout={scene.layout} progress={scrollYProgress} active={active} onReady={() => setReady(true)} onLost={() => setScene(null)} />
            </div>
          )}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-(--color-background) to-transparent md:h-3/5 md:from-(--color-background) md:via-(--color-background)/60 md:via-35%" />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-(--color-background)/80 to-transparent" />
        </div>

        <motion.div style={reduce || !pinned ? undefined : { opacity: textOpacity, y: textY }} className="relative px-6 pb-16 md:absolute md:inset-x-0 md:bottom-0 md:pb-28">
          <div className="mx-auto max-w-[1440px]">
            <h1 id="hero-title" className="type-display -mt-2 md:mt-0">Night Shift</h1>
            <p className="type-body mt-5 max-w-[34ch] text-[1.125rem] text-(--color-text) md:mt-4 md:max-w-[44ch] md:text-[1.25rem]">{line}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-6">
              <Link href={action.href} className="type-utility inline-flex min-h-12 items-center rounded-(--radius-button) bg-(--color-primary) px-6 text-[1rem] text-(--color-background) transition-colors duration-150 hover:bg-(--color-muted)">{action.label}</Link>
              <span className="type-utility text-(--color-muted)">{meta}</span>
              <Link href={preview.href} className="type-utility inline-flex min-h-11 items-center underline decoration-1 underline-offset-4 hover:text-(--color-muted)">{preview.label}</Link>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px border-t border-(--color-border) md:mt-8 md:grid-cols-12">
              {facts.map((f) => (
                <div key={f.label} className="pt-4 pr-4 md:col-span-3">
                  <dt className="type-utility order-2 text-(--color-muted)">{f.label}</dt>
                  <dd className="type-heading mt-1 [font-size:clamp(1.25rem,1.8vw,1.6rem)] tabular-nums">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
