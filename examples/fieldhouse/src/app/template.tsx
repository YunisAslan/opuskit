import { ViewTransition } from 'react'

// Page transition: each route change crossfades the page; a project's picture morphs into its case study
// (named ViewTransitions in FeaturedWork and CaseStudy). Reduced motion: instant (globals.css).
export default function Template({ children }: { children: React.ReactNode }) {
  return <ViewTransition>{children}</ViewTransition>
}
