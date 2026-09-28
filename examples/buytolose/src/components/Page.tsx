import type { ReactNode } from "react"

/** One huge word per view: every inner page opens on a single display word, then one plain line. */
export function PageIntro({ word, title, children }: { word: string; title?: string; children?: ReactNode }) {
  return (
    <div className="container-content pt-40 pb-16 md:pt-60 md:pb-24">
      <h1>
        <span className="block font-display text-[clamp(3.5rem,14vw,11rem)] leading-[0.9] font-bold tracking-[-0.04em] break-words" aria-hidden={!!title}>
          {word}
        </span>
        {title && <span className="sr-only">{title}</span>}
      </h1>
      {children && <div className="mt-8 max-w-[52ch] text-lg text-muted">{children}</div>}
    </div>
  )
}

/** Long copy sits on surface, capped at ~65 characters per line. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="container-content pb-32 md:pb-40">
      <div className="rounded-3xl bg-surface p-6 md:p-16">
        <div className="max-w-[65ch] space-y-4 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-heading [&_h2:first-child]:mt-0 [&_li]:ml-5 [&_li]:list-disc [&_a]:underline">
          {children}
        </div>
      </div>
    </div>
  )
}
