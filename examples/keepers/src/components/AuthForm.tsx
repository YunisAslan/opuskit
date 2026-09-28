'use client'
import { useState } from 'react'

type Field = { name: string; label: string; type: string; autoComplete: string; hint?: string; minLength?: number }

// Front-end only: accounts open when the shop backend is connected.
export default function AuthForm({ fields, submit, done }: { fields: Field[]; submit: string; done: string }) {
  const [sent, setSent] = useState(false)
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      {fields.map((f) => (
        <div key={f.name} className="flex flex-col gap-2">
          <label htmlFor={f.name} className="type-utility text-lg">{f.label}</label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            minLength={f.minLength}
            required
            aria-describedby={f.hint ? `${f.name}-hint` : undefined}
            className="type-body min-h-12 border-2 border-muted bg-surface px-4 py-3 text-text transition-colors duration-150 focus:border-text"
          />
          {f.hint && <p id={`${f.name}-hint`} className="type-body text-sm text-muted">{f.hint}</p>}
        </div>
      ))}
      <button type="submit" className="btn btn-primary w-full">{submit}</button>
      <p role="status" className="type-body">{sent ? done : ''}</p>
    </form>
  )
}
