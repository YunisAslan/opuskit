'use client'
// Copying an email or address (recipe → Seasoning): a click copies it; the icon becomes a tick for 1.5s.
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      window.setTimeout(() => setDone(false), 1500)
    } catch {
      toast('Could not copy. Select the text and copy it instead.')
    }
  }
  return (
    <button type="button" onClick={copy} aria-label={done ? 'Copied' : label} className="press grid size-11 shrink-0 place-items-center rounded-(--radius-button) text-(--color-muted) hover:bg-(--color-surface) hover:text-(--color-text) focus-visible:bg-(--color-surface)">
      {done ? <Check className="size-4 text-(--color-text)" strokeWidth={1.75} aria-hidden /> : <Copy className="size-4" strokeWidth={1.5} aria-hidden />}
      <span className="sr-only" aria-live="polite">{done ? 'Copied' : ''}</span>
    </button>
  )
}
