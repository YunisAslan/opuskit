// QUM wordmark: the name set in Petrona, opened up a little. Ink by default; it takes the current colour.
export function Logo({ className = '' }: { className?: string }) {
  return <span className={`font-(family-name:--font-display) text-[1.75rem] font-normal leading-none tracking-[0.2em] [margin-right:-0.2em] ${className}`}>QUM</span>
}
