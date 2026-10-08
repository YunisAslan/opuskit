'use client'
// Reservations — remembered moment, "Your night, pressed": a 45 on the platter whose label prints the booking as the
// form is filled in (day, time, party, name — each line settles in as it changes). On send, the tonearm swings over,
// the needle drops and the record turns. Mobile: a compact version above the send button. Reduced motion: the label
// still updates, nothing spins or swings.
import { AnimatePresence, motion } from 'motion/react'
import { useReduced } from './useReduced'
import { useId } from 'react'
import { dayLabel, type BookingDraft } from './BookingForm'
import { reservation } from '@/content/site'

const L = reservation.label

function Line({ k, y, size, font, children }: { k: string; y: number; size: number; font: 'display' | 'body'; children: string }) {
  const reduce = useReduced()
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.text key={k + children} x="100" y={y} textAnchor="middle" fontSize={size}
        className={font === 'display' ? 'font-(family-name:--font-display)' : 'font-(family-name:--font-body) font-semibold'}
        fill="var(--chap-text)"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
        transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 120, damping: 20 }}>
        {children}
      </motion.text>
    </AnimatePresence>
  )
}

export function PressedRecord({ draft, pressed, compact = false }: { draft: BookingDraft; pressed: boolean; compact?: boolean }) {
  const reduce = useReduced()
  const arc = useId().replace(/:/g, '')
  const empty = !draft.date && !draft.time && !draft.guests && !draft.name
  const party = draft.guests ? (draft.guests === '1' ? 'party of one' : `party of ${draft.guests}`) : ''
  const timeLine = [draft.time, party].filter(Boolean).join(', ')
  const name = draft.name?.trim() ? `for ${draft.name.trim().split(' ')[0]}` : ''

  return (
    <div aria-hidden className={`relative mx-auto aspect-square w-full ${compact ? 'max-w-[240px]' : 'max-w-[420px]'}`}>
      <motion.svg viewBox="0 0 200 200" className="h-full w-full"
        animate={pressed && !reduce ? { rotate: 360 * 2 } : { rotate: 0 }}
        transition={pressed && !reduce ? { duration: 2.4, ease: [0.65, 0, 0.35, 1], delay: 0.7 } : { duration: 0 }}>
        <defs>
          <path id={arc} d="M 100 100 m -46 0 a 46 46 0 1 1 92 0" />
        </defs>
        {/* the vinyl: a deep shade of the ground with grooves in the warm secondary */}
        <circle cx="100" cy="100" r="99" fill="color-mix(in oklab, var(--color-background) 55%, black)" />
        {[92, 86, 80, 74, 68].map((r) => <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="var(--color-secondary)" strokeWidth="0.6" opacity="0.8" />)}
        <path d="M 40 58 A 70 70 0 0 1 100 30" fill="none" stroke="var(--color-text)" strokeOpacity="0.14" strokeWidth="5" strokeLinecap="round" />
        {/* the label */}
        <circle cx="100" cy="100" r="58" fill="var(--chap-bg)" />
        <circle cx="100" cy="100" r="54" fill="none" stroke="var(--chap-text)" strokeOpacity="0.3" strokeWidth="0.5" />
        <text fontSize="11" className="font-(family-name:--font-display)" fill="var(--chap-text)">
          <textPath href={`#${arc}`} startOffset="50%" textAnchor="middle">low hum</textPath>
        </text>
        <text x="100" y="146" textAnchor="middle" fontSize="6" className="font-(family-name:--font-body) font-semibold" fill="var(--chap-text)" opacity="0.7">{L.rpm}</text>
        {empty ? (
          <Line k="empty" y={86} size={11} font="display">{L.side}</Line>
        ) : (
          <>
            <Line k="day" y={86} size={draft.date ? 9.5 : 11} font="display">{draft.date ? dayLabel(draft.date) : L.side}</Line>
            {timeLine && <Line k="time" y={118} size={7.5} font="body">{timeLine}</Line>}
            {name && <Line k="name" y={129} size={7.5} font="body">{name}</Line>}
          </>
        )}
        <circle cx="100" cy="100" r="3.2" fill="var(--color-background)" />
      </motion.svg>

      {/* tonearm: rests off the record, swings over when the booking is sent */}
      <motion.svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 h-full w-full"
        style={{ transformOrigin: '94% 8%' }}
        initial={false}
        animate={{ rotate: pressed ? 0 : -24 }}
        transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 120, damping: 20 }}>
        <circle cx="188" cy="16" r="9" fill="var(--color-secondary)" stroke="var(--color-border)" />
        <circle cx="188" cy="16" r="3" fill="var(--color-muted)" />
        <path d="M188 16 L 170 120 L 146 146" fill="none" stroke="var(--color-muted)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="136" y="140" width="16" height="10" rx="2" transform="rotate(-45 144 145)" fill="var(--color-text)" />
      </motion.svg>

      <AnimatePresence>
        {pressed && (
          <motion.p initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.3, rotate: -14 }} animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={reduce ? { duration: 0.2 } : { type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
            className="type-utility absolute bottom-[6%] left-0 rounded-(--radius-button) border border-(--color-text) bg-(--color-background) px-3 py-1.5 text-(--color-text)">
            {L.pressed}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
