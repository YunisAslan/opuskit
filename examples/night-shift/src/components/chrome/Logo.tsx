// Night Shift mark: a vectorscope ring with its four ticks, a crescent (the night) and one cyan puck (the grade).
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <circle cx="16" cy="16" r="14.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 1.75v2.75M16 27.5v2.75M1.75 16h2.75M27.5 16h2.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.263 7.169A9 9 0 1 0 24.831 17.737A7.5 7.5 0 0 1 14.263 7.169Z" fill="currentColor" />
      <circle cx="21.6" cy="10.4" r="1.7" className="fill-(--color-accent)" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="size-8 shrink-0" />
      <span className="font-(family-name:--font-display) text-[1.05rem] leading-none font-semibold [font-stretch:125%]">Night Shift</span>
    </span>
  )
}
