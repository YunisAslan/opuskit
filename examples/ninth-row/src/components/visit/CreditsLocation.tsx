'use client'
// Visit — the remembered moment: "Credits in four corners". The page opens like a film's first shot: two black bars
// leave only a slit of the way in, the title centred above it and the four facts a visitor needs — street, hours, the
// station, the sign to look for — set in the four corners like opening credits. Scrolling opens the bars to a 2.39:1
// frame (the credits stay in the bars), the picture settles from 1.12 to 1 (and a little lower, so the lit sign stays in
// the frame), and the facts card arrives over it.
// Desktop: pinned over 240vh. Phones: pinned over 170svh, the bars open fully onto the photo, and the card follows
// below. Reduced motion: no pin — the frame is shown open at 2.39:1, the credits around it, the card below.
import { useReduced } from '@/lib/motion'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { MediaAsset } from '@/components/MediaAsset'
import { cn } from '@/lib/utils'

type Corners = { topLeft: string; topRight: string; bottomLeft: string; bottomRight: string }

function useEndScale() {
  // the bars' final size: what is left of the frame is 2.39:1 on wide screens, the whole photo on phones
  const [end, setEnd] = useState(0.33)
  useEffect(() => {
    const on = () => {
      const w = innerWidth, h = innerHeight
      setEnd(w < 768 ? 0 : Math.max(0, 1 - w / 2.39 / h))
    }
    on()
    addEventListener('resize', on)
    return () => removeEventListener('resize', on)
  }, [])
  return end
}

export function CreditsLocation({ title, corners, card }: { title: string; corners: Corners; card: ReactNode }) {
  const reduce = useReduced()
  if (reduce) return <StillCredits title={title} corners={corners} card={card} />
  return <OpeningCredits title={title} corners={corners} card={card} />
}

function CornerText({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('type-utility absolute max-w-[42vw] text-base text-(--color-text)', className)}>{children}</p>
}

function OpeningCredits({ title, corners, card }: { title: string; corners: Corners; card: ReactNode }) {
  const block = useRef<HTMLDivElement>(null)
  const end = useEndScale()
  const { scrollYProgress: p } = useScroll({ target: block, offset: ['start start', 'end end'] })
  const bars = useTransform(p, [0, 0.55], [0.955, end])
  const picture = useTransform(p, [0, 0.6], [1.12, 1])
  // as the frame opens, the picture settles a little lower so the lit sign above the doors lands inside the 2.39:1
  // frame rather than under the top bar (each bar ends at end/2 of the height; the shift stays well inside it)
  const settle = useTransform(p, [0, 0.6], ['0%', `${end * 50 * 0.75}%`])
  const titleOpacity = useTransform(p, [0, 0.18], [1, 0])
  const titleY = useTransform(p, [0, 0.18], [0, -24])
  const cardOpacity = useTransform(p, [0.6, 0.78], [0, 1])
  const cardY = useTransform(p, [0.6, 0.78], [24, 0])
  const [cardOn, setCardOn] = useState(false)
  useMotionValueEvent(cardOpacity, 'change', (v) => setCardOn(v > 0.5))

  return (
    <section aria-labelledby="visit-title">
      <div ref={block} className="relative h-[170svh] md:h-[240vh]">
        <div className="sticky top-0 h-svh overflow-hidden bg-(--color-background)">
          <motion.div className="absolute inset-0" style={{ scale: picture, y: settle }}>
            <MediaAsset id="location" fill priority sizes="100vw" className="h-full w-full" />
          </motion.div>
          {/* the two bars — real black, the credits set in them */}
          <motion.div aria-hidden className="absolute inset-x-0 top-0 h-1/2 origin-top bg-(--color-background)" style={{ scaleY: bars }} />
          <motion.div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-(--color-background)" style={{ scaleY: bars }} />

          <motion.h1 id="visit-title" style={{ opacity: titleOpacity, y: titleY }} className="type-display absolute inset-x-0 top-[24%] px-(--gutter) text-center text-[clamp(4.5rem,13vw,12.5rem)] md:top-[18%]">
            {title}
          </motion.h1>

          <div className="absolute inset-0 mx-auto max-w-[calc(var(--container)+2*var(--gutter))] px-(--gutter)">
            <div className="relative h-full">
              <CornerText className="top-[calc(64px+env(safe-area-inset-top,0px)+16px)] left-0 md:top-24">{corners.topLeft}</CornerText>
              <CornerText className="top-[calc(64px+env(safe-area-inset-top,0px)+16px)] right-0 text-right md:top-24">{corners.topRight}</CornerText>
              <CornerText className="bottom-[max(24px,env(safe-area-inset-bottom,0px))] left-0 md:bottom-8">{corners.bottomLeft}</CornerText>
              <CornerText className="bottom-[max(24px,env(safe-area-inset-bottom,0px))] right-0 text-right md:bottom-8">{corners.bottomRight}</CornerText>
            </div>
          </div>

          {/* wide screens: the facts card arrives over the picture, on the dark pillars left of the doors — the sign and the way in stay clear */}
          <div className="absolute inset-0 hidden items-center md:flex">
            <div className="mx-auto flex w-full max-w-[calc(var(--container)+2*var(--gutter))] justify-start px-(--gutter)">
              <motion.div style={{ opacity: cardOpacity, y: cardY }} className={cn('w-full max-w-md', !cardOn && 'pointer-events-none')} inert={!cardOn}>
                {card}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      {/* phones: the card follows the opened frame */}
      <div className="relative z-10 -mt-24 px-(--gutter) md:hidden">{card}</div>
    </section>
  )
}

function StillCredits({ title, corners, card }: { title: string; corners: Corners; card: ReactNode }) {
  return (
    <section aria-labelledby="visit-title" className="px-(--gutter) pt-[calc(var(--section-y)+64px)]">
      <div className="mx-auto max-w-(--container)">
        <h1 id="visit-title" className="type-display text-center text-[clamp(4.5rem,13vw,12.5rem)]">{title}</h1>
        <div className="type-utility mt-12 flex justify-between gap-6 text-base"><p>{corners.topLeft}</p><p className="text-right">{corners.topRight}</p></div>
        <MediaAsset id="location" sizes="100vw" fill className="mt-4 aspect-[4/3] md:aspect-[2.39/1]" />
        <div className="type-utility mt-4 flex justify-between gap-6 text-base"><p>{corners.bottomLeft}</p><p className="text-right">{corners.bottomRight}</p></div>
        <div className="mt-12 md:ml-auto md:max-w-md">{card}</div>
      </div>
    </section>
  )
}
