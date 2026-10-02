// Sticky Weather logo: a cloud sticker with its corner peeling up, plus the name. Drawn in currentColor, so it is the
// dark version on pink and the light version on the plum footer. The same mark is the favicon (src/app/icon.svg).
export function LogoMark({ className = 'size-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className}>
      <path d="M14 38 H31 L38 31 A9 9 0 0 0 37 20 A12 12 0 0 0 14 17 A10.5 10.5 0 0 0 14 38 Z" fill="currentColor" />
      <path d="M31 38 L38 31 L32 32 Z" fill="currentColor" opacity="0.45" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark />
      <span className="font-(family-name:--font-display) text-[1.35rem] leading-none font-semibold tracking-[-0.04em]">Sticky Weather</span>
    </span>
  )
}
