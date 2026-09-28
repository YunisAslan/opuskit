import type { ReactNode } from "react"

// ponytail: forms post nowhere yet; connect to the auth provider when accounts go live.
export function AuthForm({ fields, submit, footer }: {
  fields: { id: string; label: string; type: string; autoComplete: string }[]
  submit: string
  footer: ReactNode
}) {
  return (
    <div className="container-content pb-32 md:pb-40">
      <form action="/account" className="max-w-[28rem] space-y-6">
        {fields.map((f) => (
          <div key={f.id}>
            <label className="label" htmlFor={f.id}>{f.label}</label>
            <input id={f.id} name={f.id} type={f.type} autoComplete={f.autoComplete} required className="field" />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-full">{submit}</button>
        <div className="space-y-2 text-muted">{footer}</div>
      </form>
    </div>
  )
}
