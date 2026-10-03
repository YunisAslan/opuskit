// Hane's mark: a doorway — the way in — standing on one line. currentColor, so it works on any ground.
export function Mark({ className = 'size-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" aria-hidden className={className}>
      <path d="M7 20V10.5a5 5 0 0 1 10 0V20" />
      <path d="M3.5 20h17" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-(--color-primary) ${className}`}>
      <Mark />
      <span className="type-heading [font-size:1.6rem] leading-none">Hane</span>
    </span>
  )
}
