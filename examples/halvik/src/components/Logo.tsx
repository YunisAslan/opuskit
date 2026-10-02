// Halvik logo: the mark is one keycap seen from above (the base, and its dished top cut out of it), set beside the
// name in Hubot Sans. currentColor throughout, so it reads black on lilac and lilac on the black footer.
export function Mark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role={title ? 'img' : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path fillRule="evenodd" fill="currentColor"
        d="M8 1h16a7 7 0 0 1 7 7v16a7 7 0 0 1-7 7H8a7 7 0 0 1-7-7V8a7 7 0 0 1 7-7Zm2 5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H10Z" />
    </svg>
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <Mark className="size-[1.15em]" />
      <span className="font-(family-name:--font-display) font-extrabold [font-stretch:125%] tracking-[-0.02em]">Halvik</span>
    </span>
  )
}
