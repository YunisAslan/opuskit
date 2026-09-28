'use client'
import { useState } from 'react'

// No backend yet: the form validates natively, then confirms in place.
export function FormShell({ children, done, submit }: { children: React.ReactNode; done: string; submit: string }) {
  const [sent, setSent] = useState(false)
  if (sent) return <p role="status" className="type-heading">{done}</p>
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true) }} className="flex flex-col gap-6">
      {children}
      <button type="submit" className="self-start border border-primary px-6 min-h-11 hover:bg-primary hover:text-background">
        {submit}
      </button>
    </form>
  )
}

export function Field({ label, name, type = 'text', required = true, autoComplete, textarea }: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; textarea?: boolean
}) {
  const cls = 'w-full border border-muted bg-surface px-4 py-3 text-text placeholder:text-muted'
  return (
    <label className="flex flex-col gap-2">
      <span className="type-utility text-muted">{label}{!required && ', optional'}</span>
      {textarea
        ? <textarea name={name} required={required} rows={5} className={cls} />
        : <input name={name} type={type} required={required} autoComplete={autoComplete} className={`${cls} min-h-11`} />}
    </label>
  )
}
