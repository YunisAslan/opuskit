// Halden — the mark is a low sun on a sea line (heat over cold water); the wordmark is set in Imbue.
// The same drawing is the favicon (src/app/icon.svg).
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path d="M8 19a8 8 0 0 1 16 0Z" fill="currentColor" />
      <path d="M3 22.5h26" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export function Logo({ size = 'bar', className = '' }: { size?: 'bar' | 'sign'; className?: string }) {
  if (size === 'sign') return (
    <span className={`flex items-end gap-[0.12em] font-(family-name:--font-display) font-light leading-[0.8] tracking-[-0.01em] [font-size:clamp(4.5rem,9vw,8.5rem)] ${className}`}>
      <Mark className="mb-[0.06em] size-[0.42em] shrink-0" />
      <span>Halden</span>
    </span>
  )
  return (
    <span className={`flex items-center gap-2 font-(family-name:--font-display) text-[1.75rem] font-normal leading-none ${className}`}>
      <Mark className="size-6 shrink-0 -translate-y-px" />
      <span className="translate-y-px">Halden</span>
    </span>
  )
}
