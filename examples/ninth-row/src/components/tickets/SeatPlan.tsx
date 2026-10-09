'use client'
// Tickets — the remembered moment: "Pick your seat". The owner's 120 seats drawn as the room: the lit screen at the
// top, twelve rows of ten split by the aisle, the ninth row named in the margin. When the plan comes into view the
// house lights come up row by row from the screen back (40 ms apart, once). Choosing a seat lights it in the accent and
// writes "Row 9, seat 5" into the booking. Desktop: every seat is a button in a keyboard-walkable grid (arrow keys).
// Phones: the plan stays as the picture of the room, and two rows of 44 px buttons choose the row and the seat.
// Reduced motion: the plan is simply there.
import { useReduced } from '@/lib/motion'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { seatPlan as P } from '@/content/tickets'
import { cn } from '@/lib/utils'

export type Seat = { row: number; seat: number } | null

const rows = Array.from({ length: P.rows }, (_, i) => i + 1)
const seats = Array.from({ length: P.perRow }, (_, i) => i + 1)
const half = P.perRow / 2

export function SeatPlan({ value, onChange }: { value: Seat; onChange: (s: Seat) => void }) {
  const reduce = useReduced()
  const grid = useRef<HTMLDivElement>(null)
  const focusSeat = (r: number, s: number) => grid.current?.querySelector<HTMLButtonElement>(`[data-seat="${r}-${s}"]`)?.focus()
  const onKey = (e: React.KeyboardEvent, r: number, s: number) => {
    const move: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }
    const m = move[e.key]
    if (!m) return
    e.preventDefault()
    focusSeat(Math.min(P.rows, Math.max(1, r + m[0])), Math.min(P.perRow, Math.max(1, s + m[1])))
  }
  const chosen = (r: number, s: number) => value?.row === r && value?.seat === s

  return (
    <div>
      {/* the screen: a bar of the film's white light */}
      <div aria-hidden className="relative mx-auto mb-8 w-[86%]">
        <div className="h-1 bg-(--color-text)" />
        <div className="absolute inset-x-0 top-1 h-10 bg-linear-to-b from-(--color-text)/14 to-transparent" />
        <p className="type-caption mt-2 text-center text-(--color-muted)">{P.screen}</p>
      </div>

      <div ref={grid} role="grid" aria-label={P.title} className="grid gap-1.5 sm:gap-2">
        {rows.map((r) => {
          const ninth = r === P.ninth
          return (
            <motion.div
              key={r}
              role="row"
              className="grid grid-cols-[1.25rem_1fr_0.75rem_1fr_1.25rem] items-center gap-1.5 sm:grid-cols-[1.5rem_1fr_1.25rem_1fr_1.5rem] sm:gap-2"
              initial={reduce ? false : { opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: reduce ? 0 : r * 0.04 }}
            >
              <span aria-hidden className={cn('type-caption text-right tabular-nums', ninth ? 'text-(--color-text)' : 'text-(--color-muted)')}>{r}</span>
              {[seats.slice(0, half), seats.slice(half)].map((block, bi) => (
                <div key={bi} className={cn('grid grid-cols-5 gap-1.5 sm:gap-2', bi === 1 && 'col-start-4')}>
                  {block.map((s) => (
                    <button
                      key={s}
                      type="button"
                      role="gridcell"
                      data-seat={`${r}-${s}`}
                      aria-label={P.chosen(r, s)}
                      aria-selected={chosen(r, s)}
                      tabIndex={(value ? chosen(r, s) : r === P.ninth && s === half) ? 0 : -1}
                      onKeyDown={(e) => onKey(e, r, s)}
                      onClick={() => onChange(chosen(r, s) ? null : { row: r, seat: s })}
                      className={cn(
                        'press aspect-[5/4] w-full border transition-[background-color,border-color] duration-150 max-sm:pointer-events-none',
                        chosen(r, s)
                          ? 'border-(--color-accent) bg-(--color-accent)'
                          : ninth
                            ? 'border-(--color-text)/70 bg-(--color-secondary) hover:bg-(--color-text)/40 focus-visible:bg-(--color-text)/40'
                            : 'border-(--color-border) bg-(--color-surface) hover:border-(--color-muted) hover:bg-(--color-secondary) focus-visible:border-(--color-text)'
                      )}
                    />
                  ))}
                </div>
              ))}
              <span aria-hidden className={cn('type-caption tabular-nums', ninth ? 'text-(--color-text)' : 'text-(--color-muted)')}>{r}</span>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-(--color-border) pt-4">
        <p className="type-utility text-base" aria-live="polite">
          {value ? <span className="inline-flex items-center gap-2"><span aria-hidden className="size-1.5 bg-(--color-accent)" />{P.chosen(value.row, value.seat)}</span> : <span className="text-(--color-muted)">{P.ninthLabel}: {P.ninthLine}</span>}
        </p>
        {value && <button type="button" onClick={() => onChange(null)} className="press link-line type-utility text-base text-(--color-muted)">{P.clear}</button>}
      </div>

      {/* phones: choose by row, then seat — 44 px targets */}
      <div className="mt-6 space-y-4 sm:hidden">
        <fieldset>
          <legend className="type-utility text-(--color-muted)">Row</legend>
          <div className="mt-2 grid grid-cols-6 gap-1.5">
            {rows.map((r) => (
              <button key={r} type="button" aria-pressed={value?.row === r} onClick={() => onChange({ row: r, seat: value?.seat ?? half })}
                className={cn('press type-utility h-11 border text-base tabular-nums', value?.row === r ? 'border-(--color-text) bg-(--color-text) text-(--color-background)' : r === P.ninth ? 'border-(--color-text)/70' : 'border-(--color-border)')}>{r}</button>
            ))}
          </div>
        </fieldset>
        <fieldset disabled={!value}>
          <legend className="type-utility text-(--color-muted)">Seat</legend>
          <div className="mt-2 grid grid-cols-5 gap-1.5">
            {seats.map((s) => (
              <button key={s} type="button" aria-pressed={value?.seat === s} onClick={() => value && onChange({ row: value.row, seat: s })}
                className={cn('press type-utility h-11 border text-base tabular-nums disabled:opacity-40', value?.seat === s ? 'border-(--color-text) bg-(--color-text) text-(--color-background)' : 'border-(--color-border)')}>{s}</button>
            ))}
          </div>
        </fieldset>
      </div>
    </div>
  )
}
