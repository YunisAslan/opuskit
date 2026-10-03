import Link from 'next/link'
import type { ReactNode } from 'react'

// The small card each stop opens with: its name, one useful thing, one link.
export function StopCard({ name, text, link, children, className = '' }: { name: string; text: string; link?: { label: string; href: string }; children?: ReactNode; className?: string }) {
  return (
    <div className={`w-full max-w-[22rem] border border-(--color-border) bg-(--color-surface)/90 p-5 ${className}`}>
      <p className="type-utility text-(--color-accent)">{name}</p>
      <p className="type-body mt-2">{text}</p>
      {children}
      {link && <Link href={link.href} className="type-utility mt-3 flex min-h-11 w-fit items-center underline underline-offset-[6px] transition-colors duration-150 hover:text-(--color-muted)">{link.label}</Link>}
    </div>
  )
}
