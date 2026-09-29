"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

// Words that light up as you read: each word moves from the muted tone to the text colour,
// in reading order, scrubbed by the section's scroll. Shorter range on phones.
// Reduced motion: text is rendered at full colour and never animated.
export function WordLight({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current!
    if (prefersReducedMotion()) return
    const css = getComputedStyle(document.documentElement)
    const faint = css.getPropertyValue("--color-muted").trim()
    const ink = css.getPropertyValue("--color-text").trim()
    const words = el.querySelectorAll("span")
    const mm = gsap.matchMedia()
    mm.add({ mobile: "(max-width: 639px)", desktop: "(min-width: 640px)" }, (ctx) => {
      const mobile = !!ctx.conditions?.mobile
      gsap.fromTo(
        words,
        { color: faint },
        {
          color: ink,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: mobile ? "top 85%" : "top 80%", end: mobile ? "bottom 60%" : "bottom 40%", scrub: 0.5 },
        },
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <p ref={ref} className={cn(className)}>
      {text.split(" ").map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  )
}
