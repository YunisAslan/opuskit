'use client'
import { useState, type ReactNode } from 'react'

// Forms are front-end only until a provider (booking, shop, auth) is connected.
// On submit the browser validates the fields, then we confirm in place.
export function DemoForm({ children, submit, done, className = '' }: { children: ReactNode; submit: string; done: string; className?: string }) {
  const [sent, setSent] = useState(false)
  if (sent)
    return (
      <div role="status" className="rounded-card bg-surface p-8">
        <p className="type-heading">{done}</p>
        <button type="button" className="mt-6 min-h-11 font-semibold underline" onClick={() => setSent(false)}>
          Start again
        </button>
      </div>
    )
  return (
    <form
      className={`grid gap-6 ${className}`}
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      {children}
      <div>
        <button type="submit" className="btn w-full sm:w-auto">
          {submit}
        </button>
      </div>
    </form>
  )
}

export function Field({ label, name, type = 'text', required, autoComplete, children, ...rest }: {
  label: string
  name: string
  type?: string
  required?: boolean
  autoComplete?: string
  children?: ReactNode
  min?: string | number
  max?: string | number
  placeholder?: string
  defaultValue?: string | number
  minLength?: number
}) {
  const id = `f-${name}`
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children ? (
        <select id={id} name={name} required={required} defaultValue={rest.defaultValue}>
          {children}
        </select>
      ) : type === 'textarea' ? (
        <textarea id={id} name={name} required={required} rows={4} placeholder={rest.placeholder} />
      ) : (
        <input id={id} name={name} type={type} required={required} autoComplete={autoComplete} {...rest} />
      )}
    </div>
  )
}
