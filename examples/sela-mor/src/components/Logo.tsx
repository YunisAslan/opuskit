import { useId } from 'react'

// Sela Mor's mark: a full circle with one breath of a sound wave cut through it. The wave is cut out (a mask),
// so the mark works on black and on white. The same drawing is the favicon (app/icon.svg).
export function Mark({ className }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <mask id={id}>
        <rect width="32" height="32" fill="#fff" />
        <path d="M2 16c3.5 0 4.5-7 7-7s3.5 14 7 14 4.5-14 7-14 3.5 7 7 7" fill="none" stroke="#000" strokeWidth="2.6" strokeLinecap="round" />
      </mask>
      <circle cx="16" cy="16" r="15" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  )
}

/** The mark with the name set beside it in Mona Sans, wide and heavy. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] font-(family-name:--font-display) font-extrabold leading-none tracking-[-0.02em] [font-stretch:125%] ${className}`}>
      <Mark className="size-[1.15em] shrink-0" />
      <span>Sela Mor</span>
    </span>
  )
}
