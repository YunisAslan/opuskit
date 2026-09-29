import type { ElementType } from 'react'

// Headline broken into hand-set lines for the line-by-line reveal.
// `mobile` lets a headline re-break differently under 640px.
export function Lines({ as: Tag = 'h2', lines, mobile, className = '' }: { as?: ElementType; lines: string[]; mobile?: string[]; className?: string }) {
  const render = (ls: string[], cls: string) => (
    <span className={cls} aria-hidden>
      {ls.map((l) => (
        <span className="line" key={l}>
          <span>{l}</span>
        </span>
      ))}
    </span>
  )
  return (
    <Tag className={className} data-reveal="lines">
      <span className="sr-only">{lines.join(' ')}</span>
      {mobile ? (
        <>
          {render(mobile, 'block sm:hidden')}
          {render(lines, 'hidden sm:block')}
        </>
      ) : (
        render(lines, 'block')
      )}
    </Tag>
  )
}
