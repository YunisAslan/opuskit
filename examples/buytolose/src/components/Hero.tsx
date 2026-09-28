"use client"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { assets } from "@/config/assets"
import { useReducedMotion } from "@/lib/motion"
import { formatPrice, getProduct } from "@/data/products"
import { AddToBag } from "./AddToBag"
import { MediaAsset } from "./MediaAsset"

gsap.registerPlugin(ScrollTrigger)

const scrub = assets.scrubReadyEncode
const mobile = assets.mobileVideoEncode

/** Video length in seconds. The whole hero timeline is measured in video-seconds, so type cues read as timecodes. */
const DUR = 12
const HOLD = 0.8 // finale rests after the last frame before the page moves on

type Scene = {
  from: number
  to: number
  kind: "intro" | "product" | "note" | "finale"
  lines: string[]
  align?: "left" | "right"
  slug?: string
  line?: string
}

// Cues match what is on screen: legs, hoodie, face, the throw, crisps zoom, cup zoom, sling zoom, the fall.
const scenes: Scene[] = [
  { from: 0, to: 0.9, kind: "intro", lines: ["Buy", "to lose."] },
  { from: 0.9, to: 1.9, kind: "product", slug: "crossing-sweatpant", lines: ["Crossing", "Sweatpant"], line: "Wide leg, reinforced knee. Cut for asphalt." },
  { from: 1.9, to: 2.9, kind: "product", slug: "crossing-hoodie", align: "right", lines: ["Crossing", "Hoodie"], line: "480gsm loopback fleece. Heavy enough to land in." },
  { from: 2.9, to: 4.2, kind: "product", slug: "backwards-cap", lines: ["Backwards", "Cap"], line: "Cobalt twill, meant for the wrong way round." },
  { from: 4.2, to: 5.6, kind: "note", align: "right", lines: ["Four in the afternoon.", "Everything goes up."] },
  { from: 5.6, to: 7.0, kind: "product", slug: "sparko-crisps", lines: ["Sparko", "Crisps"], line: "Salt and cider vinegar in a very loud bag." },
  { from: 7.0, to: 8.4, kind: "product", slug: "spill-cup", align: "right", lines: ["Spill", "Cup"], line: "700ml with a sealed lid. The rest is on you." },
  { from: 8.4, to: 10.3, kind: "product", slug: "star-sling", lines: ["Star", "Sling"], line: "420D nylon, bar-tacked strap. Survives the throw." },
  { from: 10.3, to: DUR + HOLD, kind: "finale", lines: ["Clothes for", "losing it", "in public."] },
]

/** Sticky 100svh stage. One scrubbed GSAP timeline drives the playhead and every type cue, so film and words never drift. */
export function Hero() {
  const reduced = useReducedMotion()
  return reduced ? <StillHero /> : <ScrubHero />
}

function ScrubHero() {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current!
    // iOS only paints seeks after one play(); prime it muted.
    v.play().then(() => v.pause()).catch(() => {})
    // ponytail: breakpoint read once per mount; a resize across 768px keeps the first layout's motion set.
    const desktop = window.matchMedia("(min-width: 768px)").matches

    // Seek on the ticker, never while a seek is in flight: keeps reverse scrubbing smooth on GOP-4 encodes.
    let target = 0
    const seek = () => {
      if (!v.duration || v.seeking) return
      const t = target * (v.duration - 0.05)
      if (Math.abs(v.currentTime - t) > 0.02) v.currentTime = t
    }
    gsap.ticker.add(seek)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      })
      const proxy = { p: 0 }
      tl.to(proxy, { p: 1, duration: DUR, onUpdate: () => { target = proxy.p } }, 0)
      tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, duration: DUR + HOLD }, 0)

      gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((el, i) => {
        const s = scenes[i]
        const lines = el.querySelectorAll("[data-line]")
        const meta = el.querySelectorAll("[data-meta]")
        if (i > 0) {
          tl.set(el, { autoAlpha: 1 }, s.from)
          tl.fromTo(lines, { yPercent: 115 }, { yPercent: 0, duration: 0.45, stagger: 0.07, ease: "power3.out" }, s.from)
          if (desktop && s.kind === "product") {
            tl.fromTo(el.querySelector("[data-name]"), { scale: 1.06 }, { scale: 1, duration: 0.9, ease: "power2.out" }, s.from)
          }
          tl.fromTo(meta, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }, s.from + 0.2)
        }
        if (s.kind !== "finale") {
          tl.to(meta, { autoAlpha: 0, y: -10, duration: 0.2, ease: "power1.in" }, s.to - 0.4)
          tl.to(lines, { yPercent: -115, duration: 0.35, stagger: 0.05, ease: "power2.in" }, s.to - 0.4)
          tl.set(el, { autoAlpha: 0 }, s.to)
        }
      })

      // Finale hands off to the page: the film draws back into a framed plate.
      if (desktop) {
        tl.to("[data-frame]", { clipPath: "inset(5% 3% 5% 3% round 32px)", duration: 1.4, ease: "power2.inOut" }, DUR - 1.2)
      }
    }, root)
    return () => {
      gsap.ticker.remove(seek)
      ctx.revert()
    }
  }, [])

  // Sticky track: ~420vh of scroll on mobile, ~700vh from md up (about 55vh per second of film).
  return (
    <div ref={root} className="relative h-[520svh] md:h-[800svh]">
      <section id="hero" aria-label="Introduction" className="sticky top-0 h-svh overflow-hidden">
        <h1 className="sr-only">BUYTOLOSE: clothes for losing it in public</h1>
        <div data-frame className="absolute inset-0" style={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}>
          <video ref={video} muted playsInline preload="auto" poster={scrub.poster} aria-hidden
            className="absolute inset-0 h-full w-full object-cover">
            <source src={mobile.src} media="(max-width: 639px)" type="video/mp4" />
            <source src={scrub.src} type="video/mp4" />
          </video>
          <Scrim />
        </div>
        {scenes.map((s, i) => <SceneText key={i} scene={s} hidden={i > 0} />)}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-border/60">
          <div data-progress className="h-full origin-left bg-primary" style={{ transform: "scaleX(0)" }} />
        </div>
      </section>
    </div>
  )
}

const Lines = ({ lines, className }: { lines: string[]; className: string }) => (
  <span data-name className={`block ${className}`}>
    {lines.map((l) => (
      <span key={l} className="block overflow-y-clip pb-[0.08em]">
        <span data-line className="block">{l}</span>
      </span>
    ))}
  </span>
)

function SceneText({ scene: s, hidden }: { scene: Scene; hidden: boolean }) {
  const right = s.align === "right"
  const p = s.slug ? getProduct(s.slug)! : null
  const col = right ? "md:col-span-8 md:col-start-5 md:text-right" : "md:col-span-8"
  const row = `flex flex-wrap items-center gap-3 ${right ? "md:justify-end" : ""}`

  return (
    <div data-scene className={`absolute inset-x-0 bottom-0 ${hidden ? "invisible" : ""}`}>
      <div className="container-content grid grid-cols-12 gap-6 pb-10 md:pb-16">
        <div className={`col-span-12 ${col}`}>
          {s.kind === "intro" && (
            <>
              <Lines lines={s.lines} className="font-display text-[clamp(4.5rem,17vw,16rem)] leading-[0.82] font-bold tracking-[-0.05em]" />
              <p data-meta className="mt-6 font-utility text-utility">Autumn 2026. Scroll to walk the crossing.</p>
            </>
          )}
          {s.kind === "product" && p && (
            <>
              <p data-meta className="mb-3 font-utility text-utility">{p.availability === "Sold out" ? "Sold out, back Friday" : "In the film"}</p>
              <Lines lines={s.lines} className={`font-display text-[clamp(3rem,6.5vw,7rem)] leading-[0.88] font-bold tracking-[-0.04em] ${right ? "origin-bottom-right" : "origin-bottom-left"}`} />
              <p data-meta className={`mt-5 max-w-[34ch] text-lg ${right ? "md:ml-auto" : ""}`}>{s.line}</p>
              <div data-meta className={`mt-6 ${row}`}>
                <span className="font-heading text-heading">{formatPrice(p.price)}</span>
                <AddToBag product={p} size={p.sizes?.[2]} className="btn btn-primary" />
                <Link href={`/shop/${p.slug}`} className="btn btn-secondary">Details</Link>
              </div>
            </>
          )}
          {s.kind === "note" && (
            <Lines lines={s.lines} className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.03em]" />
          )}
          {s.kind === "finale" && (
            <>
              <Lines lines={s.lines} className="font-display text-display" />
              <p data-meta className="mt-6 max-w-[40ch]">Fleece, carry and snacks from one Porto workshop, made in runs of two hundred.</p>
              <div data-meta className="mt-8">
                <Link href="/shop" className="btn btn-primary w-full sm:w-auto">Shop the collection</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Headline() {
  return (
    <div className="mt-6 max-w-[34rem]">
      <h1 className="font-heading text-heading">
        Clothes for <br className="sm:hidden" />losing it <br className="hidden sm:block" />in public.
      </h1>
      <p className="mt-4 max-w-[40ch]">Fleece, carry and snacks from one Porto workshop, made in runs of two hundred.</p>
      <Link href="/shop" className="btn btn-primary mt-8">Shop the collection</Link>
    </div>
  )
}

/** Reduced motion: poster, full headline, film plays only on request. */
function StillHero() {
  const [film, setFilm] = useState(false)
  return (
    <section id="hero" aria-label="Introduction" className="relative h-svh overflow-hidden">
      {film ? <MediaAsset id="heroVideo" autoPlay /> : (
        <>
          <MediaAsset id="posterImage" fill priority className="hidden sm:block" />
          <MediaAsset id="posterMobile" fill priority className="sm:hidden" />
          <button type="button" onClick={() => setFilm(true)}
            className="btn btn-secondary absolute top-24 right-6 z-10">Play film</button>
        </>
      )}
      <Scrim />
      <div className="absolute inset-x-0 bottom-0">
        <div className="container-content pb-12 md:pb-16">
          <p aria-hidden className="font-display text-[clamp(5rem,22vw,20rem)] leading-[0.8] font-bold tracking-[-0.05em]">LOSE</p>
          <Headline />
        </div>
      </div>
    </section>
  )
}

function Scrim() {
  return (
    <>
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-b from-background/80 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-background via-background/60 to-transparent" />
    </>
  )
}
