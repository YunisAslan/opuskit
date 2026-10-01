// Slow Atlas logo (temporary, made for the build): a square symbol (a sun on the horizon, one place) + the wordmark.
// The symbol is drawn with currentColor and cut-out shapes, so it works on any ground. Files: public/brand/, src/app/icon.svg.
export function LogoSymbol({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path fill="currentColor" fillRule="evenodd" d="M0 0h32v32H0z M9 21a7 7 0 0 1 14 0z M5 23h22v2H5z" />
    </svg>
  )
}

export function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  if (size === 'lg') return (
    <span className="flex flex-col items-start gap-6">
      <LogoSymbol className="size-16 md:size-20" />
      <span className="type-display leading-[0.85] [font-size:clamp(3.5rem,9vw,8rem)]">Slow<br />Atlas</span>
    </span>
  )
  return (
    <span className="flex items-center gap-3">
      <LogoSymbol className="size-7" />
      <span className="type-display [font-size:1.5rem] leading-none tracking-[-0.03em]">Slow Atlas</span>
    </span>
  )
}
