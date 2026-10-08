// Curriculum's remembered moment — "Poster in six frames". The same A-format poster drawn six times, two columns each,
// so the six weeks fill the twelve columns exactly. Every frame adds that week's layer: the baseline, the columns, the
// modules, the drawn letter, the layout — and the sixth is the print: grid gone, white paper, blue ink, and the one
// pink block of the page. Each frame links to its week below. Still: the only change is a hover/focus state.
import { cn } from '@/lib/utils'

const W = 100
const H = 141.4 // 1 : √2, the A2 sheet the students print
const M = { x: 8, top: 8, bottom: 12 }
const COLS = 6
const GAP = 2
const colW = (W - M.x * 2 - GAP * (COLS - 1)) / COLS
const colX = (i: number) => M.x + i * (colW + GAP)
const ROWS = 4
const rowH = (H - M.top - M.bottom - GAP * (ROWS - 1)) / ROWS
const rowY = (i: number) => M.top + i * (rowH + GAP)

function Poster({ week }: { week: number }) {
  const print = week === 6
  const ink = print ? 'var(--inv-text)' : 'var(--color-text)'
  const guide = 'var(--color-border)'
  const thin = { vectorEffect: 'non-scaling-stroke' as const, strokeWidth: 1 }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden>
      <rect width={W} height={H} fill={print ? 'var(--inv-bg)' : 'transparent'} />
      {!print && (
        <>
          {/* week 1: the baseline */}
          {Array.from({ length: Math.floor((H - M.top - M.bottom) / 3) + 1 }, (_, i) => (
            <line key={`b${i}`} x1={M.x} x2={W - M.x} y1={M.top + i * 3} y2={M.top + i * 3} stroke={guide} {...thin} opacity={0.75} />
          ))}
          {/* week 2: the columns */}
          {week >= 2 &&
            Array.from({ length: COLS }, (_, i) => (
              <rect key={`c${i}`} x={colX(i)} y={M.top} width={colW} height={H - M.top - M.bottom} fill="none" stroke="var(--color-muted)" {...thin} />
            ))}
          {/* week 3: the modules — flowlines and one picture field */}
          {week >= 3 && (
            <>
              {Array.from({ length: ROWS - 1 }, (_, i) => (
                <line key={`r${i}`} x1={M.x} x2={W - M.x} y1={rowY(i + 1) - GAP / 2} y2={rowY(i + 1) - GAP / 2} stroke="var(--color-muted)" {...thin} />
              ))}
              <rect x={colX(3)} y={rowY(2)} width={colW * 3 + GAP * 2} height={rowH} fill="var(--color-secondary)" />
            </>
          )}
        </>
      )}
      {/* week 4: the drawn letter */}
      {week >= 4 && (
        <text x={colX(0) - 1.5} y={rowY(1) + rowH * 0.9} fill={ink} fontFamily="var(--font-display)" fontWeight={800} fontSize={rowH * 2.05} letterSpacing="-0.04em">
          R
        </text>
      )}
      {/* week 5: the layout — headline, text and caption bars on the grid */}
      {week >= 5 && (
        <>
          <rect x={colX(0)} y={rowY(2) + 2} width={colW * 3 + GAP * 2} height={3.2} fill={ink} />
          <rect x={colX(0)} y={rowY(2) + 8} width={colW * 2 + GAP} height={3.2} fill={ink} />
          {Array.from({ length: 6 }, (_, i) => (
            <rect key={`t${i}`} x={colX(0)} y={rowY(3) + 2 + i * 3} width={i === 5 ? colW : colW * 2 + GAP} height={1} fill={ink} />
          ))}
          {Array.from({ length: 3 }, (_, i) => (
            <rect key={`k${i}`} x={colX(3)} y={rowY(3) + 2 + i * 3} width={colW * 1.6} height={1} fill={ink} />
          ))}
        </>
      )}
      {/* week 6: the print — and its one signal block where the picture field was */}
      {print && (
        <>
          <rect x={colX(3)} y={rowY(2)} width={colW * 3 + GAP * 2} height={rowH} fill="var(--chap-bg)" />
          <rect x={colX(5)} y={H - M.bottom + 4} width={colW} height={1} fill={ink} />
        </>
      )}
    </svg>
  )
}

export function PosterFrames({ weeks }: { weeks: { label: string; short: string }[] }) {
  return (
    <ol className="raster gap-y-8" aria-label="The poster, week by week">
      {weeks.map((w, i) => (
        <li key={w.label} className="col-span-2">
          <a href={`#week-${i + 1}`} className="group press block">
            <span
              className={cn(
                'block border transition-[border-color] duration-150',
                i === 5 ? 'border-(--inv-bg)' : 'border-(--color-border) group-hover:border-(--color-text) group-focus-visible:border-(--color-text)',
              )}
            >
              <Poster week={i + 1} />
            </span>
            <span className="mt-3 flex items-baseline justify-between gap-2">
              <span className="type-utility text-(--color-muted)">{w.label}</span>
            </span>
            <span className="type-heading link-line mt-0.5 block [font-size:clamp(1.0625rem,1.4vw,1.25rem)] group-hover:decoration-current group-focus-visible:decoration-current">{w.short}</span>
          </a>
        </li>
      ))}
    </ol>
  )
}
