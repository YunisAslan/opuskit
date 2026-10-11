'use client'
// OpusKit piece — a picture that becomes the next page: wrap a thumbnail and the large picture on the page it opens in
// a PhotoMorph with the same name, and on the click the thumbnail itself grows into its place on the new page (and
// shrinks back on Back) — one object moving, not two swapping. React's <ViewTransition> over the browser's View
// Transitions API: no library, and where a browser lacks it the page simply changes. Reduced motion: no movement.
// Original OpusKit code (MIT).
import { ViewTransition, type ReactNode } from 'react'

// One copy in the page, however many pictures use it (React hoists and de-duplicates a <style> with an href).
const CSS = `::view-transition-group(.opuskit-morph){animation-duration:420ms;animation-timing-function:cubic-bezier(0.76,0,0.24,1)}
::view-transition-image-pair(.opuskit-morph){animation-name:opuskit-via-blur}
@keyframes opuskit-via-blur{30%{filter:blur(3px)}}
@media (prefers-reduced-motion:reduce){::view-transition-group(.opuskit-morph),::view-transition-image-pair(.opuskit-morph){animation:none}}`

export function PhotoMorph({ name, children }: {
  /** The same on both pages: the item's slug ("project-halden"). Unique on each page. */ name: string
  /** The picture: an <img> or next/image (in a box of the shape it has on that page). */ children: ReactNode
}) {
  return <>
    <style href="opuskit-morph" precedence="default">{CSS}</style>
    <ViewTransition name={`morph-${name}`} share="opuskit-morph" default="none">{children}</ViewTransition>
  </>
}
