import type { ReactNode } from 'react'
import { Label } from '@/components/ui/label'

// A label, the control, and its inline error underneath (ids: `${id}` for the control, `${id}-error` for the error).
export function Field({ id, label, error, children, className }: { id: string; label: string; error?: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="mb-2 text-(--color-muted)">{label}</Label>
      {children}
      {error && <p id={`${id}-error`} className="type-utility mt-2">{error}</p>}
    </div>
  )
}

export const invalid = (id: string, error?: string) => (error ? { 'aria-invalid': true, 'aria-describedby': `${id}-error` } : {})
