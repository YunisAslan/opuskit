import { useId } from 'react'

// Slow Atlas logo: a square symbol (a sun resting on the horizon, cut out of the block) and the name in the display
// face. currentColor everywhere, so one file gives the light and the dark version. Made for this build — temporary
// until there is a real one (see assets/manifest.json).
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  const id = useId()
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <mask id={id}>
        <rect width="32" height="32" fill="#fff" />
        <rect x="5" y="21" width="22" height="2" fill="#000" />
        <path d="M10 19a6 6 0 0 1 12 0z" fill="#000" />
      </mask>
      <rect width="32" height="32" fill="currentColor" mask={`url(#${id})`} />
    </svg>
  )
}

export function Logo({ large = false }: { large?: boolean }) {
  if (large) return (
    <span className="block">
      <LogoMark className="size-12 md:size-16" />
      <span className="type-display mt-6 block leading-[0.85] [font-size:clamp(4rem,9vw,8.5rem)]">Slow<br />Atlas</span>
    </span>
  )
  return (
    <span className="inline-flex items-center gap-3">
      <LogoMark />
      <span className="type-heading [font-size:1.375rem] tracking-[-0.03em]" style={{ fontWeight: 800 }}>Slow Atlas</span>
    </span>
  )
}
