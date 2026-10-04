// Kür Delta Watch mark: one channel that splits into three as it meets the sea — the delta, drawn as a hazard sign.
// Draws in currentColor on the page ground, so it works dark-on-yellow and yellow-on-black.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={className}>
      <rect width="40" height="40" fill="currentColor" />
      <path d="M20 6v13M20 19 9.5 33M20 19v14M20 19l10.5 14" fill="none" stroke="var(--color-background)" strokeWidth="4" strokeLinecap="square" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ''}`}>
      <LogoMark className="size-9 shrink-0" />
      <span className="font-(family-name:--font-display) text-[1.05rem] leading-[0.9] font-extrabold uppercase">Kür Delta<br />Watch</span>
    </span>
  )
}
