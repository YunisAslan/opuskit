// Velmira's mark: a low sun (the coral disc — the same shape that travels down every page) over two
// strokes of water. Lines and name take the current colour, so it works on the violet ground and the white footer.
export function LogoMark({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 32" className={className} aria-hidden fill="none">
      <circle cx="20" cy="12" r="8" fill="var(--color-accent)" />
      <path d="M4 25h32M11 30h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className = '', size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  const lg = size === 'lg'
  return (
    <span className={`inline-flex items-center ${lg ? 'gap-4' : 'gap-2.5'} ${className}`}>
      <LogoMark className={lg ? 'h-12 w-auto' : 'h-6 w-auto'} />
      <span className={`font-(family-name:--font-display) font-light [font-stretch:125%] tracking-[0.02em] ${lg ? 'text-[2.5rem] leading-none' : 'text-[1.375rem] leading-none'}`}>Velmira</span>
    </span>
  )
}
