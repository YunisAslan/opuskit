import type { ElementType } from 'react'
// Line-by-line headline reveal: each line is masked and rises into place once, 80ms apart (globals.css, Reveals.tsx).
// Lines are split by hand so each one breaks where it reads best.
export function Lines({ as: T = 'h2', lines, className }: { as?: ElementType; lines: string[]; className?: string }) {
  return (
    <T data-lines className={className}>
      {lines.map((l) => <span key={l} className="line-mask"><span className="line">{l}</span></span>)}
    </T>
  )
}
