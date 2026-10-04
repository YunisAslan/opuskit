// A headline split into masked lines by hand (one string per line), with its own breaks for phones. The line reveal
// (globals.css) slides each line up when its [data-reveal] chapter comes into view; reduced motion shows them at once.
export function Lines({ lines, mobile }: { lines: string[]; mobile?: string[] }) {
  const set = (ls: string[], cls: string) => <span className={cls}>{ls.map((l, i) => <span key={i} className="line"><span>{l}</span></span>)}</span>
  return mobile ? <>{set(mobile, 'block md:hidden')}{set(lines, 'hidden md:block')}</> : set(lines, 'block')
}
