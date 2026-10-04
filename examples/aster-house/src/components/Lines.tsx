import type { ReactNode } from 'react'
// A headline split into lines by hand, for the line-by-line reveal. `mobile` re-breaks it for phones.
export function Lines({ lines, mobile }: { lines: ReactNode[]; mobile?: ReactNode[] }) {
  const set = (ls: ReactNode[], cls: string) => (
    <span data-reveal="lines" className={cls}>
      {ls.map((l, i) => <span key={i} className="line"><span style={{ ['--l' as string]: i }}>{l}</span></span>)}
    </span>
  )
  return mobile ? <>{set(mobile, 'block md:hidden')}{set(lines, 'hidden md:block')}</> : set(lines, 'block')
}
