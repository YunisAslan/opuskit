'use client'
// shadcn/ui Form — react-hook-form with the label tied to its field and the error under it, in --color-error.
import * as React from 'react'
import { Slot } from 'radix-ui'
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from './label'

export const Form = FormProvider

const FieldContext = React.createContext<{ name: string }>({ name: '' })
const ItemContext = React.createContext<{ id: string }>({ id: '' })

export function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  props: ControllerProps<TFieldValues, TName>,
) {
  return (
    <FieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FieldContext.Provider>
  )
}

export function useFormField() {
  const field = React.useContext(FieldContext)
  const item = React.useContext(ItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: field.name })
  const state = getFieldState(field.name, formState)
  const id = item.id
  return { id, name: field.name, formItemId: `${id}-item`, descriptionId: `${id}-description`, messageId: `${id}-message`, ...state }
}

export function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = React.useId()
  return (
    <ItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-2', className)} {...props} />
    </ItemContext.Provider>
  )
}

export function FormLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField()
  return <Label data-error={!!error} htmlFor={formItemId} className={className} {...props} />
}

export function FormControl(props: React.ComponentProps<typeof Slot.Root>) {
  const { error, formItemId, descriptionId, messageId } = useFormField()
  return (
    <Slot.Root
      id={formItemId}
      aria-describedby={error ? `${descriptionId} ${messageId}` : descriptionId}
      aria-invalid={!!error}
      {...props}
    />
  )
}

export function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { descriptionId } = useFormField()
  return <p id={descriptionId} className={cn('type-caption text-(--color-muted)', className)} {...props} />
}

export function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, messageId } = useFormField()
  const body = error ? String(error.message ?? '') : props.children
  if (!body) return null
  return (
    <p id={messageId} role="alert" className={cn('type-caption text-(--color-error)', className)} {...props}>
      {body}
    </p>
  )
}
