// A title card between chapters — centred, in the mixed-case display face, a rule drawn above it. Used only where the
// story changes chapter (never on every section).
import { Lines } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'

export function TitleCard({ lines, line, className, as = 'h2', onLoad }: { lines: string[]; line?: string; className?: string; as?: 'h1' | 'h2'; onLoad?: boolean }) {
  return (
    <div className={cn('mx-auto flex max-w-[52rem] flex-col items-center px-(--gutter) text-center', className)}>
      <span aria-hidden className="mb-10 block h-16 w-px bg-(--color-border)" />
      <Lines as={as} lines={lines} onLoad={onLoad} className="type-display" />
      {line && <p className={cn('type-body mt-8 max-w-[44ch] text-(--color-muted)', onLoad && 'motion-safe:animate-[fade-up_700ms_cubic-bezier(0.22,1,0.36,1)_400ms_both]')}>{line}</p>}
    </div>
  )
}
