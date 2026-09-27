"use client";

import { useState } from "react";

type Field = { name: string; label: string; type: string; autoComplete: string; minLength?: number };

// ponytail: no auth backend yet — submit validates natively and shows a notice. Wire `onSubmit` to the real provider.
export default function AuthForm({ fields, submit }: { fields: Field[]; submit: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {fields.map((f) => (
        <label key={f.name} className="flex flex-col gap-2">
          <span className="t-utility">{f.label}</span>
          <input
            required
            name={f.name}
            type={f.type}
            autoComplete={f.autoComplete}
            minLength={f.minLength}
            className="min-h-12 border border-border bg-surface px-4"
          />
        </label>
      ))}
      <button type="submit" className="t-utility min-h-12 border border-border bg-primary px-4 text-background hover:bg-secondary hover:text-text">
        {submit}
      </button>
      <p role="status" className="t-utility text-muted">
        {sent && "Accounts open soon — we’ll email you the moment they do."}
      </p>
    </form>
  );
}
