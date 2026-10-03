import type { ReactNode } from 'react'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'

// One labelled field with its inline error underneath. The fields' look: surface ground, muted outline, the outline
// darkens to the text colour on focus — no rings.
export const fieldLook = 'type-body h-11 rounded-(--radius-button) border-(--color-muted) bg-(--color-surface) text-(--color-text) focus-visible:border-(--color-text) aria-invalid:border-(--color-accent)'

export function FormField({ id, label, error, className, children }: { id: string; label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <Field data-invalid={!!error} className={`gap-2 ${className ?? ''}`}>
      <FieldLabel htmlFor={id} className="type-utility text-(--color-text)">{label}</FieldLabel>
      {children}
      <FieldError className="type-utility text-(--color-accent)">{error}</FieldError>
    </Field>
  )
}
