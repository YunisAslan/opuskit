import type { ReactNode } from 'react'
import { FirstScreen, Lines } from '@/components/motion/Reveal'

// The opening of an inner page: its one h1, set as a film title, and one line. It is not a section of its own — the
// first section of the page carries it above its content (pass it as `intro`).
export type Intro = { title: string; mobile?: string[]; line: string }

export function PageIntro({ intro }: { intro: Intro }) {
  return (
    <div className="mb-24 md:mb-40">
      <Lines as="h1" lines={[intro.title]} mobile={intro.mobile} immediate className="type-display" />
      <p className="type-body mt-6 max-w-[40ch] text-(--color-muted) md:mt-8 md:text-[1.125rem]">{intro.line}</p>
    </div>
  )
}

/** The section that opens a page is already there when the page loads; later sections make their entrance. */
export function Opening({ on, children }: { on: boolean; children: ReactNode }) {
  return on ? <FirstScreen>{children}</FirstScreen> : <>{children}</>
}
