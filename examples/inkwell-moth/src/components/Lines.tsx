// Line-by-line headline: lines are split by hand (one string per line) so each breakpoint can be re-broken on purpose.
// `mobile` gives the small-screen breaks; without it the same lines are used everywhere.
export function Lines({ lines, mobile }: { lines: string[]; mobile?: string[] }) {
  const set = (ls: string[], cls: string) => (
    <span className={`lines ${cls}`}>
      {ls.map((l, i) => <span key={i} className="line"><span style={{ '--i': i } as React.CSSProperties}>{l}</span></span>)}
    </span>
  )
  if (!mobile) return set(lines, 'block')
  return <>{set(mobile, 'block md:hidden')}{set(lines, 'hidden md:block')}</>
}
