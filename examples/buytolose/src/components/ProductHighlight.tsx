"use client"
import Link from "next/link"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import type { AssetKey } from "@/config/assets"
import { formatPrice, getProduct } from "@/data/products"
import { useReducedMotion } from "@/lib/motion"
import { MediaAsset } from "./MediaAsset"
import { AddToBag } from "./AddToBag"

gsap.registerPlugin(ScrollTrigger)

const product = getProduct("star-sling")!
const chapters: { image: AssetKey; title: string; body: string }[] = [
  { image: "highlight1", title: "420D nylon", body: "Water-repellent and stiff enough to hold its shape empty. The star print is dyed through, not printed on." },
  { image: "highlight2", title: "32 × 18 × 9 cm", body: "Room for a phone, keys, a paperback and whatever you bought on the way. Two inner pockets keep them apart." },
  { image: "highlight3", title: "Built to be thrown", body: "Bar-tacked strap anchors and a 38mm webbing strap. We dropped ours from a second-floor window forty times." },
]

/** Pinned story: the sling stays in frame while details advance; media crossfades per chapter. */
export function ProductHighlight() {
  const reduced = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduced || !window.matchMedia("(min-width: 768px)").matches) return
    const ctx = gsap.context(() => {
      const media = gsap.utils.toArray<HTMLElement>("[data-media]")
      const text = gsap.utils.toArray<HTMLElement>("[data-step]")
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.5 },
      })
      chapters.forEach((_, i) => {
        if (i === 0) return
        tl.to(media[i - 1], { autoAlpha: 0, duration: 0.3 }, i)
          .fromTo(media[i], { autoAlpha: 0, scale: 1.05 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, i)
          .to(text[i - 1], { autoAlpha: 0.4, duration: 0.3 }, i)
          .fromTo(text[i], { autoAlpha: 0.4 }, { autoAlpha: 1, duration: 0.3 }, i)
      })
      tl.to({}, { duration: 0.5 })
    }, root)
    return () => ctx.revert()
  }, [reduced])

  // Pinned with CSS sticky inside a 250vh track from md up; unpinned list on mobile and under reduced motion.
  return (
    <div ref={root} className={reduced ? "" : "md:h-[350svh]"}>
      <section aria-labelledby="highlight-title" className="md:sticky md:top-0 md:h-svh">
        <div className="container-content grid h-full gap-12 py-32 md:grid-cols-12 md:items-center md:gap-6 md:py-24">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:col-span-7">
            {chapters.map((c, i) => (
              <div key={c.image} data-media className={`absolute inset-0 ${i > 0 ? "max-md:hidden md:invisible md:opacity-0" : ""}`}>
                <MediaAsset id={c.image} fill sizes="(max-width: 767px) 100vw, 58vw" />
              </div>
            ))}
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <h2 id="highlight-title" className="font-display text-display">{product.name}</h2>
            <ol className="mt-8 space-y-6">
              {chapters.map((c, i) => (
                <li key={c.title} data-step className={i > 0 && !reduced ? "md:opacity-40" : ""}>
                  <h3 className="font-heading text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 max-w-[42ch] text-muted">{c.body}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <AddToBag product={product} className="btn btn-primary" />
              <Link href={`/shop/${product.slug}`} className="link inline-flex min-h-11 items-center">Details, {formatPrice(product.price)}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
