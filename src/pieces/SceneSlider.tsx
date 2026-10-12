'use client'
// OpusKit piece — full-screen scenes, one after another: each scene is the owner's picture (or its cut-out layers, far
// to near), drifting with the pointer. A slanted edge crosses the screen quickly and brings the next scene, which keeps
// gliding home for a few seconds after it, so the page never stops at the cut; the scene it covers rushes on and in.
// The headline's letters slide a tenth of its width sideways as they fade, 30 ms apart, the letter at the front of
// the movement first — a line stretches as it leaves and tightens as it lands (after rainforest.imm-g-prod.com).
// Turned by the wheel or a trackpad (only while the scenes fill the screen; past the last one the page scrolls on), a
// drag with a mouse, finger or pen, the arrow keys, or the buttons; it rests off screen and under a dialog. The pictures
// are painted on one canvas. Reduced motion: scenes change in place, nothing travels. Original OpusKit code (MIT).
import { Fragment, useEffect, useRef, type CSSProperties, type ElementType } from 'react'

type Layer = { src: string; depth: number }
export type Scene = {
  /** 1–3 short lines, set large; 2–4 words each. */ title: string[]
  eyebrow?: string
  /** One or two sentences under the headline. */ text?: string
  action?: { label: string; href: string }
  /** The scene's picture… */ src?: string
  /** …or its layers, far to near: depth 0.05 (sky) … 1.4 (a leaf right at the lens), each a transparent cut-out
   *  except the farthest. */ layers?: Layer[]
  /** What the scene shows, for screen readers. */ alt: string
}

const WIPE = 820 // the slanted edge crossing
const SETTLE = 2800 // the new scene gliding home after it
const PARALLAX = 38 // px a layer of depth 1 follows the pointer
const easeInOut = (t: number) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-9 * t))
const clamp = (v: number) => Math.min(1, Math.max(0, v))
const pad = (n: number) => String(n).padStart(2, '0')

// One copy in the page (React hoists and de-duplicates a <style> with an href).
const CSS = `[data-scene-slider] [data-scene]{visibility:hidden}
[data-scene-slider] [data-scene][data-on]{visibility:visible}
[data-scene-slider] [data-scene][data-leaving]{z-index:2}
[data-scene-slider] [data-scene][data-entering]{z-index:3;--d:.6s}
.ss-char{--k:var(--i);--from:10cqw;--to:-10cqw;display:inline-block;opacity:0;transform:translate3d(var(--from),0,0);transition:opacity .6s cubic-bezier(.38,0,.32,1),transform .6s cubic-bezier(.38,0,.32,1);transition-delay:calc(var(--in,0s) + var(--k)*30ms)}
[data-scene-slider][data-dir="-1"] .ss-char{--k:calc(var(--n) - 1 - var(--i));--from:-10cqw;--to:10cqw}
[data-scene][data-active] .ss-char{--in:.2s;opacity:1;transform:none}
[data-scene][data-leaving] .ss-char{opacity:0;transform:translate3d(var(--to),0,0)}
.ss-fade{opacity:0;transform:translateY(14px);transition:opacity .8s,transform .9s cubic-bezier(.16,1,.3,1)}
[data-scene][data-active] .ss-fade{opacity:1;transform:none;transition-delay:calc(var(--d,0s) + var(--fd,0s))}
[data-scene][data-leaving] .ss-fade{opacity:0;transform:translateY(-10px);transition-duration:.4s;transition-delay:0s}
@media (prefers-reduced-motion:reduce){.ss-char{transform:none!important;transition-duration:.3s;transition-delay:0s!important}.ss-fade{transform:none!important}}`

export function SceneSlider({ link: L = 'a', scenes, label = 'Scenes', autoplay, className }: {
  /** The site's link component (next/link) for the scenes' actions. */ link?: ElementType
  /** 3–6 scenes, all pictures in one grade. */ scenes: Scene[]
  /** What the scenes are, for screen readers ("The forest, from dawn to night"). */ label?: string
  /** ms between scenes, round and round — for a demo or a screen in a shop window; a site leaves it off. */ autoplay?: number
  className?: string
}) {
  const root = useRef<HTMLElement>(null)
  const api = useRef<{ step: (by: number) => void } | null>(null)

  useEffect(() => {
    const el = root.current!
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    const wipe = el.querySelector<SVGSVGElement>('[data-wipe]')!, line = wipe.querySelector('line')!
    const counter = el.querySelector<HTMLElement>('[data-counter]')!
    // The pictures are painted on one canvas, not moved as layers of the page: two scenes of 5–7 full-screen layers each
    // were more than the browser keeps drawn, and it dropped parts of them mid-turn — grey bands, see-through layers
    // (the user, 2026-10-12). The words stay in the page, over it.
    const canvas = el.querySelector('canvas')!, ctx = canvas.getContext('2d')!
    const slides = [...el.querySelectorAll<HTMLElement>('[data-scene]')].map((node, i) => ({
      node, i,
      layers: [...node.querySelectorAll<HTMLImageElement>('[data-depth]')].map((img) => ({ img, depth: Number(img.dataset.depth) })),
      shift: 0, zoom: 1, settle: null as null | { start: number; dir: number }, on: false,
    }))
    let W = 0, H = 0, dpr = 1, current = 0, raf = 0, inView = false
    let move: null | { from: (typeof slides)[number]; to: (typeof slides)[number]; dir: number; start: number; e: number; top: number; bottom: number } = null
    const mouse = { x: 0, y: 0, active: false }, smooth = { x: 0, y: 0 }

    const set = (s: (typeof slides)[number], attr: string, on: boolean) => (on ? s.node.setAttribute(attr, '') : s.node.removeAttribute(attr))
    const show = (s: (typeof slides)[number]) => { s.on = true; set(s, 'data-on', true); s.node.setAttribute('aria-hidden', 'false') }
    const hide = (s: (typeof slides)[number]) => {
      s.on = false; s.shift = 0; s.zoom = 1; s.settle = null
      for (const a of ['data-on', 'data-active', 'data-leaving', 'data-entering']) set(s, a, false)
      s.node.setAttribute('aria-hidden', 'true'); s.node.style.clipPath = ''
    }

    function go(target: number) {
      const to = Math.min(slides.length - 1, Math.max(0, target))
      if (move || to === current) return
      const dir = to > current ? 1 : -1, from = slides[current], next = slides[to], now = performance.now()
      show(next)
      el.dataset.dir = String(dir)
      void next.node.offsetWidth // the new direction's starting places are in effect before the letters move
      set(next, 'data-entering', true); set(next, 'data-active', true)
      set(from, 'data-active', false); set(from, 'data-leaving', true)
      move = { from, to: next, dir, start: now, e: 0, top: dir > 0 ? W : 0, bottom: dir > 0 ? W : 0 }
      next.settle = reduce ? null : { start: now, dir }
      current = to
      counter.textContent = pad(current + 1)
      warm(to - 1); warm(to + 1)
      wipe.style.opacity = reduce ? '0' : '1'
      start()
    }
    api.current = { step: (by) => go(current + by) }
    // A scene's layers are decoded before its turn: drawn while still decoding, a layer was a hole for a few frames (the
    // scene behind showed through it), and the browser drops decoded pictures it has not drawn for a while.
    const warm = (i: number) => slides[i]?.layers.forEach(({ img }) => img.decode().catch(() => {}))

    function step(now: number) {
      const { from, to, dir, start } = move!
      const p = clamp((now - start) / (reduce ? 400 : WIPE)), e = easeInOut(p), slant = W * 0.08 * (1 - e)
      let top: number, bottom: number
      if (reduce) { to.node.style.clipPath = ''; to.node.style.opacity = String(e); top = bottom = 0 }
      else if (dir > 0) { top = (1 - e) * W; bottom = top + slant; to.node.style.clipPath = `polygon(${top}px 0, ${W + 2}px 0, ${W + 2}px ${H}px, ${bottom}px ${H}px)` }
      else { top = e * W; bottom = top - slant; to.node.style.clipPath = `polygon(-2px 0, ${top}px 0, ${bottom}px ${H}px, -2px ${H}px)` }
      move!.e = e; move!.top = top; move!.bottom = bottom
      line.setAttribute('x1', String(top)); line.setAttribute('x2', String(bottom)); line.setAttribute('y2', String(H))
      if (!reduce) wipe.style.opacity = String(Math.sin(p * Math.PI) * 1.4)
      // The scene being covered rushes on and in as the edge crosses it.
      from.shift = reduce ? 0 : -dir * e * W * 0.3
      from.zoom = reduce ? 1 : 1 + 0.16 * e
      if (p >= 1) {
        hide(from); to.node.style.clipPath = ''; to.node.style.opacity = ''; set(to, 'data-entering', false)
        wipe.style.opacity = '0'; move = null
      }
    }

    /** One scene: its layers, far to near, each covering a box 12% larger than the screen, moved by its depth. */
    function paint(s: (typeof slides)[number], zoom: number, sway: number) {
      ctx.save()
      ctx.translate(W / 2, H / 2); ctx.scale(zoom, zoom); ctx.translate(-W / 2, -H / 2)
      const shift = s.shift + (s.i === current ? sway : 0), bw = W * 1.12, bh = H * 1.12
      for (const { img, depth } of s.layers) {
        if (!img.complete || !img.naturalWidth) continue
        const k = Math.max(bw / img.naturalWidth, bh / img.naturalHeight), w = img.naturalWidth * k, h = img.naturalHeight * k
        ctx.drawImage(img, -W * 0.06 + (bw - w) / 2 + (-smooth.x * PARALLAX + shift) * depth, -H * 0.06 + (bh - h) / 2 - smooth.y * PARALLAX * 0.6 * depth, w, h)
      }
      ctx.restore()
    }

    function frame(now: number) {
      raf = 0
      const m = move
      if (m) step(now)
      const t = now / 1000, k = reduce ? 0.02 : 0.05
      smooth.x += ((mouse.active ? mouse.x : Math.sin(t * 0.21) * 0.35) - smooth.x) * k
      smooth.y += ((mouse.active ? mouse.y : Math.cos(t * 0.17) * 0.25) - smooth.y) * k
      // Never quite still: a slow breath in and out, a slow sway across.
      const breathe = 1 + (reduce ? 0 : 0.02) * Math.sin(t * 0.35), sway = reduce ? 0 : Math.sin(t * 0.13) * W * 0.012
      for (const s of slides) {
        if (!s.on) continue
        if (s.settle) {
          // Arrives from the side the edge came from, a little close, and keeps gliding home long after the wipe. Kept
          // short of a third of the screen: a near layer travels most, and the cut-outs that frame a scene's edges (a
          // cloud bank, a leaf) once swept across its middle and washed it white.
          const left = 1 - easeOutExpo(clamp((now - s.settle.start) / SETTLE))
          s.shift = s.settle.dir * left * W * 0.14; s.zoom = 1 + 0.08 * left
          if (left < 0.0005) { s.settle = null; s.shift = 0; s.zoom = 1 }
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (m) {
        // The scene being covered, darkening; then the new one, inside the slanted edge (fading in, with reduced motion).
        paint(m.from, m.from.zoom * breathe, sway)
        ctx.fillStyle = `rgb(0 0 0 / ${(m.e * 0.35).toFixed(3)})`; ctx.fillRect(0, 0, W, H)
        ctx.save()
        if (reduce) ctx.globalAlpha = m.e
        else {
          ctx.beginPath()
          if (m.dir > 0) { ctx.moveTo(m.top, 0); ctx.lineTo(W + 2, 0); ctx.lineTo(W + 2, H); ctx.lineTo(m.bottom, H) }
          else { ctx.moveTo(-2, 0); ctx.lineTo(m.top, 0); ctx.lineTo(m.bottom, H); ctx.lineTo(-2, H) }
          ctx.clip()
        }
        paint(m.to, m.to.zoom * breathe, sway)
        ctx.restore()
      } else paint(slides[current], slides[current].zoom * breathe, sway)
      if (live()) start()
    }
    // It rests while the tab is hidden, off screen, or under a dialog opened over it (a menu, a large view).
    const live = () => { const d = document.querySelector('[role="dialog"]'); return inView && !document.hidden && (!d || d.contains(el)) }
    const start = () => { if (!raf) raf = requestAnimationFrame(frame) }

    // The wheel turns the scenes only while they fill the screen, and lets the page scroll on past either end.
    let lastWheel = 0, acc = 0, needGap = false, lastAbs = 0
    const fills = () => { const r = el.getBoundingClientRect(); return Math.abs(r.top) < 4 && r.bottom >= innerHeight - 4 }
    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX, abs = Math.abs(delta)
      const now = performance.now(), gap = now - lastWheel
      lastWheel = now
      if (gap > 160) { acc = 0; if (!move) needGap = false }
      // A trackpad's fading tail has no pause in it: a delta that jumps up again is a new swipe.
      else if (needGap && !move && abs > Math.max(8, lastAbs * 1.6)) { needGap = false; acc = 0 }
      lastAbs = abs
      const d = Math.sign(delta)
      if (!fills() || (!move && (current + d < 0 || current + d > slides.length - 1))) return
      e.preventDefault()
      if (move || needGap) return
      acc += delta
      if (Math.abs(acc) > 30) { acc = 0; needGap = true; go(current + Math.sign(delta)) }
    }
    // By hand: drag left or up for the next scene, right or down for the one before.
    let drag: null | { x: number; y: number } = null
    const onDown = (e: PointerEvent) => { if (e.button === 0 && !(e.target as Element).closest('a, button')) drag = { x: e.clientX, y: e.clientY } }
    const onUp = (e: PointerEvent) => {
      if (!drag) return
      const dx = drag.x - e.clientX, dy = drag.y - e.clientY, d = Math.abs(dx) > Math.abs(dy) ? dx : e.pointerType === 'touch' ? 0 : dy
      drag = null
      if (e.type === 'pointerup' && Math.abs(d) > 45) go(current + Math.sign(d))
    }
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1; mouse.y = ((e.clientY - r.top) / r.height) * 2 - 1; mouse.active = e.pointerType === 'mouse'
    }
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(e.key) && current < slides.length - 1) { e.preventDefault(); go(current + 1) }
      if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key) && current > 0) { e.preventDefault(); go(current - 1) }
    }
    const onResize = () => {
      W = el.clientWidth; H = el.clientHeight; dpr = Math.min(2, devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
      start()
    }
    const io = new IntersectionObserver(([x]) => { inView = x.isIntersecting; if (inView) start() })
    const wake = setInterval(() => { if (live()) start() }, 600)
    const timer = autoplay && !reduce ? setInterval(() => { if (live()) go(current === slides.length - 1 ? 0 : current + 1) }, autoplay) : 0

    const ro = new ResizeObserver(onResize); ro.observe(el)
    onResize(); show(slides[0]); warm(1)
    requestAnimationFrame(() => set(slides[0], 'data-active', true))
    io.observe(el)
    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('pointerdown', onDown); el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', () => { mouse.active = false })
    addEventListener('pointerup', onUp); addEventListener('pointercancel', onUp)
    el.addEventListener('keydown', onKey)
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); clearInterval(timer); clearInterval(wake); api.current = null
      el.removeEventListener('wheel', onWheel); el.removeEventListener('pointerdown', onDown); el.removeEventListener('pointermove', onMove)
      removeEventListener('pointerup', onUp); removeEventListener('pointercancel', onUp)
      el.removeEventListener('keydown', onKey); ro.disconnect()
    }
  }, [scenes.length, autoplay])

  const ink = 'text-[var(--color-on-photo,#fff)]'
  return (
    <section ref={root} data-scene-slider tabIndex={0} aria-roledescription="carousel" aria-label={label}
      className={`@container relative h-svh w-full touch-pan-y select-none overflow-hidden bg-(--color-text) outline-none ${ink} ${className ?? ''}`}>
      <style href="opuskit-scene-slider" precedence="default">{CSS}</style>
      <canvas aria-hidden className="absolute inset-0 size-full" />
      {/* A soft shade under the words, so they read on any picture — once, over the canvas: one per scene doubled up while
          two scenes showed, and the picture brightened in one frame as the old scene went (the user, 2026-10-12). */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_50%_32%_at_50%_50%,rgb(0_0_0/0.22),transparent_70%),linear-gradient(to_top,rgb(0_0_0/0.35),transparent_35%)]" />
      {scenes.map((s, i) => {
        const layers = s.layers?.length ? s.layers : [{ src: s.src ?? '', depth: 0.5 }]
        let n = 0
        return (
          <div key={i} data-scene aria-roledescription="slide" aria-label={`${i + 1} of ${scenes.length}: ${s.title.join(' ')}`} aria-hidden={i !== 0} className="absolute inset-0 overflow-hidden">
            {/* The pictures, loaded here and painted on the canvas below. */}
            <div role="img" aria-label={s.alt} className="absolute inset-0">
              {layers.map((l, j) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={j} src={l.src} alt="" data-depth={l.depth} fetchPriority={i ? 'low' : 'high'} className="hidden" />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-0 grid place-items-center px-[6vw] text-center">
              <div className="flex flex-col items-center gap-5">
                {s.eyebrow && <p className="ss-fade font-(family-name:--font-utility) text-xs uppercase tracking-[0.4em]" style={{ '--fd': '-0.1s' } as CSSProperties}><span className="opacity-60">{pad(i + 1)}</span> {s.eyebrow}</p>}
                <h2 className="font-(family-name:--font-display) text-[calc(30px+3.2cqw)] font-black uppercase leading-[0.9] [text-shadow:0_2px_30px_rgb(0_0_0/0.18)]">
                  {s.title.map((t, li) => {
                    let k = 0
                    const len = t.replace(/ /g, '').length
                    return (
                      <span key={li} className="block">
                        {t.split(' ').map((w, wi) => (
                          <Fragment key={wi}>
                            {wi > 0 && ' '}
                            <span className="inline-block whitespace-nowrap">
                              {[...w].map((ch) => <span key={n++} aria-hidden className="ss-char" style={{ '--i': k++, '--n': len } as CSSProperties}>{ch}</span>)}
                            </span>
                          </Fragment>
                        ))}
                      </span>
                    )
                  })}
                  <span className="sr-only">{s.title.join(' ')}</span>
                </h2>
              </div>
            </div>
            {(s.text || s.action) && (
              <div className="absolute bottom-[clamp(5.5rem,12vh,8rem)] left-1/2 flex w-[min(34rem,86vw)] -translate-x-1/2 flex-col items-center gap-6 text-center">
                {s.text && <p className="ss-fade font-(family-name:--font-body) text-[clamp(1rem,1.25vw,1.2rem)] leading-relaxed" style={{ '--fd': '0.5s' } as CSSProperties}>{s.text}</p>}
                {s.action && <L href={s.action.href} className="ss-fade font-(family-name:--font-body) text-lg underline decoration-1 underline-offset-[6px]" style={{ '--fd': '0.7s' } as CSSProperties}>{s.action.label}</L>}
              </div>
            )}
          </div>
        )
      })}
      <svg data-wipe aria-hidden className="pointer-events-none absolute inset-0 z-[4] size-full opacity-0"><line y1={0} stroke="currentColor" strokeOpacity={0.55} strokeWidth={1} /></svg>
      <div className="absolute bottom-[clamp(1.5rem,4vh,2.6rem)] right-[clamp(1.5rem,3vw,2.6rem)] z-[5] flex items-center gap-4 font-(family-name:--font-utility) text-xs tracking-[0.25em]">
        <button type="button" aria-label="Previous scene" onClick={() => api.current?.step(-1)} className="grid size-11 cursor-pointer place-items-center rounded-full border border-current/40 transition-colors hover:border-current">‹</button>
        <p aria-live="polite"><span data-counter>01</span><span className="mx-3 inline-block h-px w-7 bg-current/50 align-middle" />{pad(scenes.length)}</p>
        <button type="button" aria-label="Next scene" onClick={() => api.current?.step(1)} className="grid size-11 cursor-pointer place-items-center rounded-full border border-current/40 transition-colors hover:border-current">›</button>
      </div>
    </section>
  )
}
