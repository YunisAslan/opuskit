import type { CSSProperties, ElementType } from 'react'

// A headline set by hand: one span per line, separate breaks for mobile and desktop.
// `now` reveals on load (first screen); otherwise lines reveal when the headline scrolls into view.
export function Lines({ as: Tag = 'h2', text, mobile, desktop, now = false, className, block, style }: {
  as?: ElementType; text: string; mobile: string[]; desktop: string[]; now?: boolean; className?: string; block?: string; style?: CSSProperties
}) {
  const set = (lines: string[], cls: string) => (
    <span aria-hidden className={cls}>
      {lines.map((l, i) => <span key={i} className="line"><span style={{ '--i': i } as CSSProperties}><span className={block}>{l}</span></span></span>)}
    </span>
  )
  return (
    <Tag aria-label={text} style={style} className={`${now ? 'lines-now' : ''} ${className ?? ''}`} data-reveal={now ? undefined : 'lines'}>
      {set(mobile, 'block md:hidden')}
      {set(desktop, 'hidden md:block')}
    </Tag>
  )
}
