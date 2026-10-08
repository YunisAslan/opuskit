'use client'
import { useState, type ReactNode } from 'react'

export function CopyButton({ text, label = 'Copy', className = '' }: { text: string | (() => string); label?: string; className?: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      className={`btn btn-line btn-sm ${className}`}
      onClick={async () => {
        try { await navigator.clipboard.writeText(typeof text === 'function' ? text() : text); setDone(true); setTimeout(() => setDone(false), 1600) } catch { /* clipboard blocked */ }
      }}
    >
      <span aria-live="polite">{done ? 'Copied' : label}</span>
    </button>
  )
}

export function Chip({ active, onClick, small, children }: { active: boolean; onClick: () => void; small?: boolean; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick}
      className={`rounded-[3px] border border-line ${small ? 'px-2.5 py-1 text-[13px]' : 'px-3 py-1.5 text-sm'} transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-paper`}>
      {children}
    </button>
  )
}

export function PageIntro({ label, title, children }: { label?: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pb-10 pt-14 md:px-8 md:pt-20">
      {label && <p className="label mb-5">{label}</p>}
      <h1 className="display max-w-4xl text-[clamp(2.6rem,6vw,5.5rem)]">{title}</h1>
      {children && <div className="mt-6 max-w-xl text-lg text-ink-2">{children}</div>}
    </div>
  )
}
