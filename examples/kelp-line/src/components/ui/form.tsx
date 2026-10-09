'use client'
// shadcn/ui Form — react-hook-form + zod. Each field: label, control, and its error underneath in --color-error,
// tied by aria-describedby / aria-invalid.
import { createContext, useContext, useId, type ComponentProps, type ReactNode } from 'react'
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'
import { Label } from './label'

export const Form = FormProvider

type Ctx = { name: string; id: string }
const FieldCtx = createContext<Ctx>({ name: '', id: '' })

export function FormField<V extends FieldValues, N extends FieldPath<V>>(props: ControllerProps<V, N>) {
  const id = useId()
  return <FieldCtx.Provider value={{ name: props.name, id }}><Controller {...props} /></FieldCtx.Provider>
}

export function useFormField() {
  const { name, id } = useContext(FieldCtx)
  const { getFieldState, formState } = useFormContext()
  const state = getFieldState(name, formState)
  return { id, name, controlId: `${id}-control`, messageId: `${id}-message`, error: state.error }
}

export function FormItem({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
}

export function FormLabel({ className, ...props }: ComponentProps<typeof Label>) {
  const { controlId } = useFormField()
  return <Label htmlFor={controlId} className={className} {...props} />
}

export function FormControl(props: ComponentProps<typeof Slot.Root>) {
  const { controlId, messageId, error } = useFormField()
  return <Slot.Root id={controlId} aria-describedby={error ? messageId : undefined} aria-invalid={!!error || undefined} {...props} />
}

export function FormMessage({ className, children }: { className?: string; children?: ReactNode }) {
  const { messageId, error } = useFormField()
  const body = error?.message ?? children
  if (!body) return null
  return <p id={messageId} role="alert" className={cn('type-caption text-(--color-error)', className)}>{body}</p>
}
