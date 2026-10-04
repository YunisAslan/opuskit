// Aster House mark: a square plan (the house) crossed by one thin beam of light. currentColor, so it works on any ground.
export function LogoMark({ className = 'size-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="29" height="29" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 24.5 25.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    </svg>
  )
}

export function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`inline-flex items-center ${large ? 'gap-5' : 'gap-2.5 md:gap-3'}`}>
      <LogoMark className={large ? 'size-14 md:size-16' : 'size-7'} />
      <span className={large ? 'type-display whitespace-nowrap [font-size:clamp(2.75rem,5vw,4.75rem)]' : 'whitespace-nowrap font-(family-name:--font-display) text-[1.15rem] font-normal tracking-[-0.01em] md:text-[1.3rem]'}>Aster House</span>
    </span>
  )
}
