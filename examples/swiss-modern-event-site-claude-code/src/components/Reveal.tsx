"use client"

import { Children, cloneElement, isValidElement, useEffect, useRef, type CSSProperties, type ReactElement, type ReactNode } from "react"
import { cn } from "@/lib/utils"

// One observer per wrapper toggles data-shown; globals.css holds the three transitions and their
// reduced-motion versions: rise (fade & rise, children staggered 60ms), clip (curtain), lines (masked lines).
function useShown<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
          el.setAttribute("data-shown", "")
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

type Tag = "div" | "section" | "ul" | "ol" | "dl" | "form" | "header"

export function Reveal({ children, className, as: As = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const ref = useShown<HTMLDivElement>()
  let i = 0
  const staggered = Children.map(children, (c) => {
    if (!isValidElement(c)) return c
    const el = c as ReactElement<{ style?: CSSProperties }>
    return cloneElement(el, { style: { ...el.props.style, "--i": i++ } as CSSProperties })
  })
  return (
    // @ts-expect-error polymorphic ref
    <As ref={ref} data-reveal="rise" className={className}>
      {staggered}
    </As>
  )
}

export function ClipReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useShown<HTMLDivElement>()
  return (
    // The observer watches this unclipped wrapper: a fully clipped target never reports an intersection.
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div data-reveal="clip" className="absolute inset-0">
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  )
}

type HeadingTag = "h1" | "h2" | "h3" | "p"

// Lines are split by hand so breaks stay intentional; `mobile` lets a headline re-break under 640px.
export function LineReveal({ lines, mobile, as: As = "h2", className }: { lines: string[]; mobile?: string[]; as?: HeadingTag; className?: string }) {
  const ref = useShown<HTMLHeadingElement>()
  const render = (ls: string[], cls?: string) =>
    ls.map((l, i) => (
      <span key={i} className={cn("line", cls)}>
        <span style={{ "--i": i } as CSSProperties}>{l}</span>
      </span>
    ))
  return (
    // h1s sit above the fold: they animate in CSS from first paint (no wait for hydration, so LCP is not held back).
    <As ref={ref} data-reveal="lines" data-immediate={As === "h1" ? "" : undefined} className={className} aria-label={lines.join(" ")}>
      <span aria-hidden className={mobile ? "hidden sm:block" : "block"}>{render(lines)}</span>
      {mobile && <span aria-hidden className="block sm:hidden">{render(mobile)}</span>}
    </As>
  )
}
