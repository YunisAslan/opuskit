'use client'
// Copying an email (the recipe's micro-interaction): the address is a real mailto link; the small button beside it
// copies, and its icon becomes a tick for 1.5s.
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function CopyEmail({ email, className, linkClassName }: { email: string; className?: string; linkClassName?: string }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(t)
  }, [copied])
  return (
    <span className={cn('inline-flex max-w-full items-center gap-1', className)}>
      <a href={`mailto:${email}`} className={cn('link-line min-w-0 [overflow-wrap:anywhere]', linkClassName)}>{email}</a>
      <button
        type="button"
        onClick={() => navigator.clipboard?.writeText(email).then(() => setCopied(true), () => {})}
        className="press relative grid size-11 shrink-0 place-items-center text-current transition-opacity duration-150 hover:opacity-70 focus-visible:bg-(--color-surface)"
        aria-label={copied ? 'Email address copied' : 'Copy email address'}
      >
        <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
          {copied ? (
            <path d="M3 8.5 6.5 12 13 4.5" pathLength={24} strokeDasharray="24" className="animate-[tick-draw_200ms_var(--ease-out)_both]" />
          ) : (
            <>
              <rect x="5.5" y="5.5" width="8" height="8" />
              <path d="M10.5 5.5v-3h-8v8h3" />
            </>
          )}
        </svg>
        <span aria-live="polite" className="sr-only">{copied ? 'Copied' : ''}</span>
      </button>
    </span>
  )
}
