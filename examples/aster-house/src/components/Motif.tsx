// A resting place for the line of light, beside a chapter title. `rot` is its pose there (degrees), `len` its length.
// `hold` = the anchor sits in a pinned stage and the line stays with it for the whole pin (the hero).
export function Motif({ len = 96, rot = 0, rotEnd, hold = false, className = '' }: { len?: number; rot?: number; rotEnd?: number; hold?: boolean; className?: string }) {
  return (
    <span aria-hidden data-motif="" data-rot={rot} data-rot-end={rotEnd ?? rot} data-hold={hold ? '' : undefined}
      className={`motif-anchor ${className}`} style={{ width: len, ['--motif-rot' as string]: `${rot}deg` }} />
  )
}
