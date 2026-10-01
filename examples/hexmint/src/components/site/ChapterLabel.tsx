import { TextScramble } from '@/components/pieces/TextScramble'

// "Labels that decode": a // chapter label in the utility face that resolves out of random characters once, on first
// view (~600 ms). Its own line, so the scramble never shifts anything around it. Reduced motion: shown as is.
export function ChapterLabel({ children, className = '' }: { children: string; className?: string }) {
  return <TextScramble duration={0.6} replayOnHover={false} className={`type-utility block whitespace-nowrap text-(--color-muted) ${className}`}>{children}</TextScramble>
}
