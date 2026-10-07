// Fieldhouse logo: a barn gable with its door, and the name in the display italic. Draws in currentColor, so it is
// light on the ground and dark on the footer band. The same mark is the favicon (src/app/icon.svg).
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M3 21V9.5L12 3l9 6.5V21Z" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  )
}

export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  if (size === 'lg') return (
    <span className="flex items-end gap-[0.18em] [font-size:clamp(3.25rem,7vw,6.5rem)]">
      <Mark className="mb-[0.12em] size-[0.62em] shrink-0" />
      <span className="type-display leading-none [font-size:inherit]">Fieldhouse</span>
    </span>
  )
  return (
    <span className="flex items-center gap-2">
      <Mark className="size-5 shrink-0" />
      <span className="type-display leading-none [font-size:1.6rem]">Fieldhouse</span>
    </span>
  )
}
