'use client'
// Site-wide extras that don't need to be in the first paint: smooth scroll, toasts, the brand cursor.
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll').then((m) => m.SmoothScroll), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/sonner').then((m) => m.Toaster), { ssr: false })
const BrandCursor = dynamic(() => import('@/components/pieces/BrandCursor').then((m) => m.BrandCursor), { ssr: false })

export function Deferred() {
  return <><SmoothScroll /><Toaster position="top-center" /><BrandCursor /></>
}
