import Link from 'next/link'

// Wordmark in the display face — a paper-white sticker with an ink border. Temporary until a real logo exists.
export function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  if (size === "lg") return <span className="type-display block [font-size:clamp(2.25rem,4.4vw,3.75rem)]">ulooklonely</span>
  return (
    <Link href="/" aria-label="ulooklonely, home" className="fixed top-4 left-4 z-50 border-2 border-(--color-text) bg-(--color-surface) px-3 py-2 shadow-(--shadow-card) transition-[background-color] duration-150 hover:bg-(--color-secondary) focus-visible:bg-(--color-secondary) md:top-6 md:left-6">
      <span className="type-display block [font-size:1rem] leading-none">ulooklonely</span>
    </Link>
  )
}
