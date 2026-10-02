import type { ElementType } from 'react'
// Line-by-line headline reveal: lines are split by hand (one string per line), each masked and rising 100% → 0 with an
// 80 ms stagger once the headline enters (CSS in globals.css). Screen readers get the sentence once.
export function Lines({ as: Tag = 'h2', lines, className }: { as?: ElementType; lines: string[]; className?: string }) {
  return (
    <Tag data-lines="" className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((l) => <span key={l} aria-hidden className="line-mask"><span className="line">{l}</span></span>)}
    </Tag>
  )
}
