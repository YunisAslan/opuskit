// Brasshand logo: a square stamp with a stepped B cut out of it, a burgundy full stop, and the name in Bayon.
// The square takes currentColor, so the same mark works dark on blue and blue on dark (public/brand/ has both as files).
export function Symbol({ className = 'size-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <path fill="currentColor" fillRule="evenodd" d="M0 0H32V32H0Z M9 6H20V15H23V26H9Z M13 9.5H16.5V12.5H13Z M13 18H19V22.5H13Z" />
      <rect x="25" y="23" width="3" height="3" fill="var(--color-accent)" />
    </svg>
  )
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Symbol />
      <span className="type-heading text-[1.75rem] leading-none tracking-normal">Brasshand</span>
    </span>
  )
}
