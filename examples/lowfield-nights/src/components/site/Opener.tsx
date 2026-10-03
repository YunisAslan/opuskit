import type { ReactNode } from 'react'
import { TextEffect } from '@/components/pieces/TextEffect'
import { StopCard } from './StopCard'

// A page's first stop: a full-screen view of the film with the h1 at the bottom left (5–6 of 12 columns) on a soft
// scrim, and the small card that names the stop. `children` sits under the headline (the hero's action, a form).
export function Opener({ title, lead, card, children, className = '' }: {
  title: string; lead?: string; card?: { name: string; text: string; link?: { label: string; href: string } }; children?: ReactNode; className?: string
}) {
  return (
    <section className={`relative flex min-h-svh items-end px-5 pb-16 pt-40 md:px-10 md:pb-24 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_100%,color-mix(in_srgb,var(--color-background)_80%,transparent),transparent_75%)]" />
      <div className="relative mx-auto grid w-full max-w-[1440px] items-end gap-10 md:grid-cols-12">
        <div className="md:col-span-7 lg:col-span-6">
          <TextEffect as="h1" preset="slide" className="type-display text-balance">{title}</TextEffect>
          {lead && <p className="type-body mt-6 max-w-[34ch] text-(--color-text)">{lead}</p>}
          {children}
        </div>
        {card && <StopCard {...card} className="md:col-span-4 md:col-start-9 md:justify-self-end" />}
      </div>
    </section>
  )
}
