// Wordmark: faceted-stone symbol + BLUESTONE set in the display face.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <path d="M16 6 25 13 16 26 7 13Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 13h18M12 13l4-7 4 7-4 13-4-13" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
      </svg>
      <span className="font-display text-[1.05rem] font-extrabold tracking-[0.18em]">BLUESTONE</span>
    </span>
  );
}
