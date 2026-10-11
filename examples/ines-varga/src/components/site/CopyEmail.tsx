'use client'
// The email as a link (opens mail) with a small copy button beside it: a click copies the address and the icon
// becomes a drawn tick for 1.5s; a sonner toast says it for screen readers and anyone not looking at the icon.
import { useState } from 'react'
import { toast } from 'sonner'
import { DrawnLink } from '@/components/pieces/DrawnLink'
import { footer, site } from '@/content/site'

export function CopyEmail({ className = '', big = false }: { className?: string; big?: boolean }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(site.email) } catch { return }
    setDone(true); toast(footer.copied, { description: site.email })
    setTimeout(() => setDone(false), 1500)
  }
  return (
    <span className={`inline-flex max-w-full items-center gap-2 ${className}`}>
      <DrawnLink href={`mailto:${site.email}`} stroke={big ? 'scribble' : 'wave'} className="min-w-0 [overflow-wrap:anywhere]">{site.email}</DrawnLink>
      <button type="button" onClick={copy} aria-label={footer.copy} className={`press grid shrink-0 place-items-center rounded-(--radius-button) text-(--color-muted) transition-colors duration-150 hover:text-(--color-text) ${big ? 'size-12' : 'size-11 -my-2'}`}>
        <svg viewBox="0 0 24 24" aria-hidden className={big ? 'size-7' : 'size-5'}>
          {done
            ? <path d="M4 12.5 C 6.5 14, 8.5 16.5, 9.5 19 C 12 13, 15.5 8.5, 20 5" pathLength={1} className="motion-safe:animate-[tick_200ms_ease-out_both]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="1" />
            : <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M8.5 8.2 L 19.6 7.8 L 20 19.6 L 8.8 20 Z" /><path d="M15.5 5 L 15.3 4 L 4.2 4.3 L 4.5 15.6 L 5.6 15.5" /></g>}
        </svg>
      </button>
    </span>
  )
}
