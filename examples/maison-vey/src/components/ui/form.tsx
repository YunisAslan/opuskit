'use client'
import * as React from 'react'
import { Controller, FormProvider, useFormContext, type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form'
import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils'
import { Label } from './label'

// shadcn/ui Form (react-hook-form + zod): label tied to field, inline error under it.
const Form = FormProvider

type FieldCtx = { name: string }
const FormFieldContext = React.createContext<FieldCtx>({} as FieldCtx)
const FormItemContext = React.createContext<{ id: string }>({} as { id: string })

function FormField<V extends FieldValues = FieldValues, N extends FieldPath<V> = FieldPath<V>>(props: ControllerProps<V, N>) {
  return <FormFieldContext.Provider value={{ name: props.name }}><Controller {...props} /></FormFieldContext.Provider>
}

function useFormField() {
  const field = React.useContext(FormFieldContext)
  const item = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()
  const state = getFieldState(field.name, formState)
  const id = item.id
  return { name: field.name, formItemId: `${id}-item`, formMessageId: `${id}-message`, ...state }
}

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()
  return <FormItemContext.Provider value={{ id }}><div className={cn('grid gap-2', className)} {...props} /></FormItemContext.Provider>
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { formItemId } = useFormField()
  return <Label htmlFor={formItemId} className={className} {...props} />
}

function FormControl(props: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, formMessageId } = useFormField()
  return <Slot.Root id={formItemId} aria-describedby={error ? formMessageId : undefined} aria-invalid={!!error || undefined} {...props} />
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? '') : props.children
  if (!body) return null
  return <p id={formMessageId} className={cn('type-caption text-(--color-accent)', className)} {...props}>{body}</p>
}

export { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, useFormField }
