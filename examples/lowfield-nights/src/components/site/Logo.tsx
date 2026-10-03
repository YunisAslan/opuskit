// Lowfield Nights logo: an arch (the hangar roof, the tunnel mouth in the film) over a low horizon line, then the name.
// Draws in currentColor, so it works light on dark and dark on light. The same symbol is app/icon.svg.
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d="M5 28V15a11 11 0 0 1 22 0v13" stroke="currentColor" strokeWidth="2.25" />
      <path d="M10 22h12" stroke="currentColor" strokeWidth="2.25" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-6 md:size-7" />
      <span className="font-(family-name:--font-display) whitespace-nowrap text-[1.125rem] font-semibold leading-none md:text-[1.375rem] tracking-[-0.01em]">Lowfield Nights</span>
    </span>
  )
}
