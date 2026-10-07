// The mark: a hand-cut Y with the accent dot. Inherits the text colour, so it works on every tone.
export function Logo({ name = true }: { name?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg aria-hidden viewBox="0 0 32 32" className="size-6 shrink-0">
        <path d="M8 6.5 L16.5 17 L24 7 M16.5 17 L15.5 26.5" fill="none" stroke="currentColor" strokeWidth="3.6" strokeLinecap="square" />
        <circle cx="25.5" cy="25" r="2.6" className="fill-(--color-accent)" />
      </svg>
      {name && <span className="font-(family-name:--font-heading) text-[15px] font-bold tracking-[-0.01em] [font-stretch:112.5%]">yunis aslanov</span>}
    </span>
  )
}
