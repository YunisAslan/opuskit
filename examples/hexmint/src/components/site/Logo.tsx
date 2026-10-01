// Hexmint logo — a hexagon with a ledger slot. Drawn in currentColor, so it is light on the navy ground and dark on
// the footer band without separate files. Made during the build as a stand-in; replace it when the real one exists.
export const LOGO_PATH = 'M16 2L28.12 9L28.12 23L16 30L3.88 23L3.88 9Z M9.5 14.25H18.5A1.75 1.75 0 0 1 18.5 17.75H9.5A1.75 1.75 0 0 1 9.5 14.25Z'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

export function Logo({ className, large = false }: { className?: string; large?: boolean }) {
  return (
    <span className={`inline-flex items-center ${large ? 'gap-4' : 'gap-2'} ${className ?? ''}`}>
      <LogoMark className={large ? 'size-[clamp(3rem,6vw,5rem)]' : 'size-6'} />
      <span className={large ? 'type-display [font-size:clamp(3rem,7vw,6rem)]' : 'type-heading [font-size:1.2rem]'}>Hexmint</span>
    </span>
  )
}
