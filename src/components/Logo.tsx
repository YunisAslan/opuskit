// OpusKit symbol: a stem with a diagonal cut and a separated bowl (from the brand sheet).
export function Symbol({ className = 'h-6 w-auto', title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 92 110" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true} aria-label={title} fill="currentColor">
      <path d="M0 0H29L26.4 60L0 108Z" />
      <path d="M34 0H62A30 30 0 0 1 62 60H31.4Z" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Symbol className="h-[1.15em] w-auto" />
      <span className="font-(family-name:--font-display) font-semibold tracking-[-0.03em] [font-stretch:108%]">OpusKit</span>
    </span>
  )
}

export function AppIcon({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <span className={`inline-grid place-items-center rounded-[22%] bg-ink text-paper ${className}`}>
      <Symbol className="h-1/2 w-auto" />
    </span>
  )
}
