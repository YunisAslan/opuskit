// Saint Ashe logo: a pointed gothic arch with an ember inside, and the name in the display face.
// Drawn in currentColor, so it works light on mulberry and dark on the footer's light band. Favicon: src/app/icon.svg.
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" className={className} aria-hidden fill="none">
      <path d="M2 31V14.5C2 7.5 7 3 12 1c5 2 10 6.5 10 13.5V31H2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 12c2.6 3 3.6 5.4 3.6 7.6A3.6 3.6 0 0 1 12 23.2a3.6 3.6 0 0 1-3.6-3.6C8.4 17.4 9.4 15 12 12Z" fill="currentColor" />
    </svg>
  )
}

export function Logo({ large = false }: { large?: boolean }) {
  return large ? (
    <span className="flex items-end gap-[0.12em] type-display leading-[0.8]! [font-size:clamp(3.5rem,7vw,6.5rem)]">
      <Mark className="mb-[0.06em] h-[0.78em] w-auto" />
      <span>Saint Ashe</span>
    </span>
  ) : (
    <span className="flex items-center gap-2">
      <Mark className="h-7 w-auto" />
      <span className="type-heading [font-size:1.75rem] leading-none!">Saint Ashe</span>
    </span>
  )
}
