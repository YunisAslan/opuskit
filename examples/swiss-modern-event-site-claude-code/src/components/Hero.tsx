"use client"

import Link from "next/link"
import { getImageProps } from "next/image"
import { useEffect, useRef, useState } from "react"
import { Pause, Play } from "lucide-react"
import { assets } from "@/config/assets"
import { scenes, type Scene } from "@/config/scenes"
import { site } from "@/config/site"
import { gsap } from "@/lib/motion"
import { useReducedMotion } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Mobile re-breaks for the wide display face at 390px.
const mobileLines: Record<string, string[]> = {
  match: ["Polo in", "Sheki.", "11–13 June", "2027."],
  field: ["Eight", "chukkas", "a day. Seven", "minutes each."],
  clubhouse: ["Lunch in", "the club-", "house from", "13:00."],
  summer: ["Dress for", "a summer", "afternoon."],
  final: ["The final.", "Sunday", "13 June,", "16:00."],
}

function Poster() {
  const common = { alt: assets.posterImage.alt, priority: true, sizes: "100vw" }
  const { props: desk } = getImageProps({ ...common, src: assets.posterImage.src, width: assets.posterImage.width, height: assets.posterImage.height, quality: 85 })
  const { props: mob } = getImageProps({ ...common, src: assets.posterMobile.src, width: assets.posterMobile.width, height: assets.posterMobile.height, quality: 85 })
  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desk.srcSet} />
      <source srcSet={mob.srcSet} />
      <img {...mob} alt={common.alt} className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  )
}

function SceneText({ scene, first }: { scene: Scene; first: boolean }) {
  const Tag = first ? "h1" : "p"
  const lines = (ls: string[], cls: string) => (
    <span aria-hidden className={cls}>
      {ls.map((l, i) => (
        <span key={i} className="ln block overflow-hidden pb-[0.06em]">
          <span className="block">{l}</span>
        </span>
      ))}
    </span>
  )
  return (
    <div data-scene={scene.id} data-transition={scene.transition} className={cn("absolute inset-x-0 bottom-0", !first && "invisible")}>
      <div className="page grid-page pb-28 sm:pb-16">
        <div className="col-span-4 sm:col-span-6 lg:col-span-9">
          <Tag className="type-display" aria-label={scene.lines.join(" ")}>
            {lines(scene.lines, "hidden sm:block")}
            {lines(mobileLines[scene.id] ?? scene.lines, "block sm:hidden")}
          </Tag>
          {scene.sub && (
            <div className="scene-extra mt-6 flex max-w-[34rem] flex-col items-start gap-6 sm:mt-8">
              <p className="type-body">{scene.sub}</p>
              <Button asChild size="lg" className="type-utility bg-background text-text hover:bg-secondary">
                <Link href="/rsvp">
                  RSVP<span className="font-normal">{site.dates}</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  const reduced = useReducedMotion()
  return reduced ? <StillHero /> : <FilmHero />
}

// Scroll film: the pinned scroll range IS the video timeline. One GSAP timeline drives the playhead,
// the progress rule and every scene message, each placed at its scene's fraction from scenes.ts.
function FilmHero() {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const root = section.current!
    const v = video.current!
    const state = { p: 0 }
    const seek = () => {
      if (v.readyState >= 1 && Number.isFinite(v.duration)) v.currentTime = state.p * (v.duration - 0.05)
    }
    const onMeta = () => seek()
    const onData = () => setReady(true)
    v.addEventListener("loadedmetadata", onMeta)
    v.addEventListener("loadeddata", onData)
    if (v.readyState >= 2) setReady(true)
    v.preload = "auto" // after hydration: fetch the whole (≤ 3 MB) file so seeking never waits

    const mm = gsap.matchMedia()
    mm.add({ mobile: "(max-width: 639px)", desktop: "(min-width: 640px)" }, (ctx) => {
      const mobile = !!ctx.conditions?.mobile
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root, start: "top top", end: mobile ? "+=180%" : "+=300%", pin: true, scrub: 0.5, anticipatePin: 1,
          pinSpacer: root.parentElement!, // our own wrapper: the hero is never moved in the DOM, so its LCP paint stands
          // Tells the navigation when the film has washed to white, so it switches to its solid bar.
          onUpdate: (st) => { document.documentElement.dataset.film = st.progress < 0.94 ? "on" : "off" },
        },
      })
      tl.to(state, { p: 1, duration: 1, onUpdate: seek }, 0)
      tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
      tl.to("[data-cue]", { autoAlpha: 0, duration: 0.02 }, 0.01)

      const IN = 0.035
      const OUT = 0.03
      scenes.forEach((s, i) => {
        const el = root.querySelector<HTMLElement>(`[data-scene="${s.id}"]`)!
        const lns = el.querySelectorAll<HTMLElement>(".ln > span")
        const box = el.querySelector<HTMLElement>(".type-display")!
        const extra = el.querySelector<HTMLElement>(".scene-extra")
        const tIn = s.start + 0.005
        const tOut = (i === scenes.length - 1 ? 0.955 : s.end) - OUT - 0.005
        const e = { ease: "power3.out" }
        const x = { ease: "power2.in" }

        if (i > 0) {
          tl.fromTo(el, { visibility: "hidden" }, { visibility: "visible", duration: 0.001, immediateRender: false }, tIn)
          if (mobile) tl.fromTo(el, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: IN, ...e }, tIn)
          else if (s.transition === "lines") tl.fromTo(lns, { yPercent: 110 }, { yPercent: 0, duration: IN, stagger: 0.006, ...e }, tIn)
          else if (s.transition === "wipe") tl.fromTo(box, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: IN, ...e }, tIn)
          else if (s.transition === "track") tl.fromTo(box, { opacity: 0, scale: 1.04, transformOrigin: "0% 100%" }, { opacity: 1, scale: 1, duration: IN, ...e }, tIn)
          else tl.fromTo(box, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: IN, ...e }, tIn)
        }

        if (mobile || s.transition === "track" || s.transition === "rise") tl.to(el, { opacity: 0, y: -12, duration: OUT, ...x }, tOut)
        else if (s.transition === "lines") {
          tl.to(lns, { yPercent: -110, duration: OUT, stagger: 0.004, ...x }, tOut)
          if (extra) tl.to(extra, { opacity: 0, y: -12, duration: OUT, ...x }, tOut)
        } else tl.to(box, { clipPath: "inset(0% 0% 0% 100%)", duration: OUT, ...x }, tOut)
        tl.fromTo(el, { visibility: "visible" }, { visibility: "hidden", duration: 0.001, immediateRender: false }, tOut + OUT)
      })

      // The film's last black frames ease into the white page, so the Intro follows without a cut.
      tl.to("[data-wash]", { opacity: 1, duration: 0.045, ease: "power1.inOut" }, 0.955)
    }, root)

    return () => {
      mm.revert()
      delete document.documentElement.dataset.film
      v.removeEventListener("loadedmetadata", onMeta)
      v.removeEventListener("loadeddata", onData)
    }
  }, [])

  // The outer div is the pin spacer (see pinSpacer above): React owns it and GSAP never re-parents the section.
  return (
    <div>
    <section id="hero" ref={section} aria-label="Film: the weekend in five scenes" className="relative h-svh overflow-hidden bg-text text-background">
      <Poster />
      <video
        ref={video}
        muted
        playsInline
        preload="metadata"
        aria-hidden
        tabIndex={-1}
        className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")}
      >
        <source media="(min-width: 640px)" src={assets.scrubReadyEncode.src} type="video/mp4" />
        <source src={assets.mobileVideoEncode.src} type="video/mp4" />
      </video>

      {/* Scrim only behind the type, bottom-left */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-[ellipse_90%_70%_at_0%_100%] from-text/75 via-text/30 via-45% to-transparent to-70%" />

      {scenes.map((s, i) => (
        <SceneText key={s.id} scene={s} first={i === 0} />
      ))}

      <p data-cue className="type-utility absolute right-6 bottom-8 hidden sm:block">Scroll to play the film</p>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-background/30">
        <div data-progress className="h-full origin-left scale-x-0 bg-background" />
      </div>
      <div data-wash aria-hidden className="pointer-events-none absolute inset-0 bg-background opacity-0" />
    </section>
    </div>
  )
}

// Reduced motion: no pin, no scrub. Poster with the opening message; the film plays only on request,
// with a pause control. The remaining scene messages follow as a plain list.
function StillHero() {
  const video = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const toggle = () => {
    const v = video.current!
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {})
    else { v.pause(); setPlaying(false) }
  }
  return (
    <>
      <section id="hero" aria-label="Opening" className="relative h-svh overflow-hidden bg-text text-background">
        <Poster />
        <video
          ref={video}
          muted
          playsInline
          loop
          preload="none"
          className={cn("absolute inset-0 h-full w-full object-cover", !playing && "opacity-0")}
        >
          <source media="(min-width: 640px)" src={assets.heroVideo.src} type="video/mp4" />
          <source src={assets.mobileVideoEncode.src} type="video/mp4" />
        </video>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-[ellipse_90%_70%_at_0%_100%] from-text/75 via-text/30 via-45% to-transparent to-70%" />
        <SceneText scene={scenes[0]} first />
        <Button onClick={toggle} variant="ghost" className="type-utility absolute top-24 right-6 h-11 border border-background/60 text-background hover:bg-background hover:text-text">
          {playing ? <Pause /> : <Play />}
          {playing ? "Pause film" : "Play film"}
        </Button>
      </section>
      <ol className="page border-b border-border">
        {scenes.slice(1).map((s) => (
          <li key={s.id} className="type-heading border-t border-border py-8 first:border-t-0">{s.lines.join(" ")}</li>
        ))}
      </ol>
    </>
  )
}
