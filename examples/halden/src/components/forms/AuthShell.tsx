import Link from 'next/link'
import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'
import { MediaAsset } from '@/components/MediaAsset'
import { auth } from '@/content/site'

// Sign in / Sign up stand on their own: the picture holds one half on desktop (a strip on phones), the form the other,
// with only the logo and the way back above it.
export function AuthShell({ title, line, children, footer }: { title: string; line: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="grid min-h-svh md:grid-cols-2">
      <MediaAsset id="supportingImages" priority sizes="(min-width: 768px) 50vw, 100vw" className="h-[28svh] md:sticky md:top-0 md:h-svh" />
      <div className="flex flex-col px-(--gutter) pb-12 md:px-16 md:pb-16 lg:px-24">
        <div className="flex h-(--nav-h) shrink-0 items-center justify-between border-b border-(--color-border)">
          <Link href="/" aria-label="Halden, home" className="flex min-h-11 items-center"><Logo /></Link>
          <Link href="/" className="type-utility link-line flex min-h-11 items-center">{auth.back}</Link>
        </div>
        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center pt-16 md:pt-24">
          <h1 className="type-heading">{title}</h1>
          <p className="type-body mt-4 text-(--color-muted)">{line}</p>
          <div className="mt-12">{children}</div>
          <div className="type-body mt-12 border-t border-(--color-border) pt-6 text-(--color-muted)">{footer}</div>
        </div>
      </div>
    </div>
  )
}
