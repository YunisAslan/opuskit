'use client'
// Menu — remembered moment, "Side A / Side B": the menu is a record half out of its sleeve. It slides out as it
// arrives, turns as you scroll through the dishes, and flips over when you switch from Side A (plates) to Side B
// (drinks). Mobile: the same, smaller, above the tabs. Reduced motion: it sits still and only the label changes.
import { motion, useScroll, useTransform } from 'motion/react'
import { useReduced } from './useReduced'
import { settle } from './Reveal'

function Face({ side, title, tone, back = false }: { side: string; title: string; tone: 'mint' | 'cream'; back?: boolean }) {
  const label = tone === 'mint' ? 'var(--chap-bg)' : 'var(--color-text)'
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full [backface-visibility:hidden]" style={back ? { transform: 'rotateY(180deg)' } : undefined}>
      <circle cx="100" cy="100" r="99" fill="color-mix(in oklab, var(--color-background) 55%, black)" />
      {[94, 88, 82, 76, 70, 64].map((r) => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="var(--color-secondary)" strokeWidth="0.6" />)}
      <path d="M 36 62 A 72 72 0 0 1 96 28" fill="none" stroke="var(--color-text)" strokeOpacity="0.14" strokeWidth="5" strokeLinecap="round" />
      <circle cx="100" cy="100" r="44" fill={label} />
      <text x="100" y="86" textAnchor="middle" fontSize="13" className="font-(family-name:--font-display)" fill="var(--color-background)">{side.toLowerCase()}</text>
      <text x="100" y="124" textAnchor="middle" fontSize="8" className="font-(family-name:--font-body) font-semibold" fill="var(--color-background)">{title.toLowerCase()}</text>
      <circle cx="100" cy="100" r="3.2" fill="var(--color-background)" />
    </svg>
  )
}

export function SleeveRecord({ side, sides }: { side: number; sides: { side: string; label: string }[] }) {
  const reduce = useReduced()
  const { scrollY } = useScroll()
  const spin = useTransform(scrollY, (v) => v * 0.3)

  return (
    <div aria-hidden className="relative aspect-[1.5/1] w-full max-w-[300px] sm:max-w-[360px] lg:max-w-none">
      {/* the record, sliding out of the sleeve */}
      <motion.div className="absolute top-[4%] left-[37%] aspect-square w-[62%] [perspective:900px]"
        initial={reduce ? { opacity: 0 } : { x: '-42%', opacity: 0 }} whileInView={{ x: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }} transition={reduce ? { duration: 0.2 } : { ...settle, delay: 0.2 }}>
        <motion.div className="h-full w-full" style={reduce ? undefined : { rotate: spin }}>
          <motion.div className="relative h-full w-full [transform-style:preserve-3d]"
            animate={{ rotateY: side * 180 }} transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }}>
            <Face side={sides[0].side} title={sides[0].label} tone="mint" />
            <Face side={sides[1].side} title={sides[1].label} tone="cream" back />
          </motion.div>
        </motion.div>
      </motion.div>
      {/* the sleeve */}
      <div className="absolute top-0 left-0 flex aspect-square w-[66%] flex-col justify-between rounded-(--radius-card) bg-(--color-text) p-[7%] text-(--color-background) shadow-[12px_0_24px_color-mix(in_oklab,var(--color-background)_60%,transparent)]">
        <span className="type-poster leading-[0.8] [font-size:clamp(2.5rem,5.4vw,4.25rem)]">low<br />hum</span>
        <span className="type-caption">small plates until late</span>
      </div>
    </div>
  )
}
