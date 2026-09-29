'use client'
import { useEffect, useRef, useState } from 'react'
import { photos } from '@/config/assets'
import { useClientValue } from '@/lib/motion'
import { MediaAsset } from './MediaAsset'

const N = photos.length
const COPIES = 3 // endless strip: the middle copy is "home", the others cover the edges

let detected: 'glass' | 'plain' | undefined
function detectMode() {
  if (!detected) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lowPower = (navigator.hardwareConcurrency ?? 8) < 4
    const gl = !!document.createElement('canvas').getContext('webgl')
    detected = reduce || lowPower || !gl ? 'plain' : 'glass'
  }
  return detected
}

// Liquid glass carousel: an endless, inertial photo strip under a WebGL lens (refraction + chromatic rim).
// Reduced motion, no WebGL or low-power devices get a plain swipe row.
export function GlassCarousel() {
  const mode = useClientValue(detectMode, 'pending')
  const [focus, setFocus] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open !== null && !d.open) d.showModal()
    if (open === null && d.open) d.close()
  }, [open])

  return (
    <div>
      {mode === 'plain' ? (
        <PlainRow onOpen={setOpen} />
      ) : (
        <GlassStrip onOpen={setOpen} onFocus={setFocus} />
      )}
      <p className="container-text type-utility mt-6 min-h-5 text-center text-muted" aria-live="polite">
        {mode === 'glass' ? photos[focus].alt : 'Swipe to see more'}
      </p>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        className="m-auto max-h-[92svh] w-[min(92vw,560px)] overflow-visible rounded-card bg-surface p-4 text-text backdrop:bg-background/80 backdrop:backdrop-blur-sm"
        aria-label={open !== null ? photos[open].alt : 'Photo'}
      >
        {open !== null && (
          <>
            <MediaAsset photo={open} fit="contain" className="aspect-[9/14] max-h-[78svh] w-full" sizes="560px" />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="type-utility text-muted">{photos[open].alt}</p>
              <button type="button" className="btn btn-secondary min-h-11 py-2" onClick={() => setOpen(null)} autoFocus>
                Close
              </button>
            </div>
          </>
        )}
      </dialog>
    </div>
  )
}

// `home` = the copy keyboard and screen-reader users move through; edge copies are visual only.
function Card({ i, onClick, onFocus, home = true }: { i: number; onClick?: () => void; onFocus?: () => void; home?: boolean }) {
  const p = i % N
  return (
    <button
      type="button"
      data-index={i}
      onClick={onClick}
      onFocus={onFocus}
      tabIndex={home ? 0 : -1}
      aria-hidden={home ? undefined : true}
      className="glass-card relative aspect-[9/16] w-[clamp(220px,20vw,300px)] shrink-0 cursor-grab rounded-media active:cursor-grabbing"
      aria-label={`Open photo: ${photos[p].alt}`}
    >
      <MediaAsset photo={p} fit="contain" className="h-full w-full" sizes="300px" reveal="clip" />
    </button>
  )
}

function PlainRow({ onOpen }: { onOpen: (i: number) => void }) {
  return (
    <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin]">
      {photos.map((_, i) => (
        <div key={i} className="snap-center">
          <Card i={i} onClick={() => onOpen(i)} />
        </div>
      ))}
    </div>
  )
}

function GlassStrip({ onOpen, onFocus }: { onOpen: (i: number) => void; onFocus: (i: number) => void }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const api = useRef<{ go: (dir: number) => void; openAt: (i: number) => void; moveTo: (i: number) => void; dragged: boolean }>({ go() {}, openAt() {}, moveTo() {}, dragged: false })

  useEffect(() => {
    const root = rootRef.current!
    const track = trackRef.current!
    const canvas = canvasRef.current!
    const cards = Array.from(track.children) as HTMLElement[]

    // Geometry comes from CSS, so breakpoints stay in one place.
    let W = 0, H = 0, step = 0, loopW = 0, cw = 0, D = 0
    const measure = () => {
      const r0 = cards[0].getBoundingClientRect()
      const r1 = cards[1].getBoundingClientRect()
      W = r0.width
      H = r0.height
      step = r1.left - r0.left
      loopW = step * N
      cw = root.clientWidth
      D = Math.round(Math.min(W * 1.2, H * 0.78))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.style.width = canvas.style.height = `${D}px`
      canvas.style.left = `${cw / 2 - D / 2}px`
      canvas.style.top = `${H / 2 - D / 2}px`
      canvas.width = canvas.height = Math.round(D * dpr)
    }
    measure()

    let pos = 0 // px along the strip; item i is centred when pos = i * step
    let vel = 0
    let target: number | null = null
    let dragging = false
    let dirty = true
    const mod = (a: number, n: number) => ((a % n) + n) % n
    const translate = () => cw / 2 - W / 2 - loopW - mod(pos, loopW)

    // ---------- WebGL lens ----------
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: true })!
    const css = getComputedStyle(document.documentElement)
    const rgb = (v: string) => {
      const c = document.createElement('canvas').getContext('2d')!
      c.fillStyle = css.getPropertyValue(v).trim()
      const hex = c.fillStyle.replace('#', '')
      return [0, 2, 4].map((o) => parseInt(hex.slice(o, o + 2), 16) / 255)
    }
    const surface = rgb('--color-surface')
    const bg = rgb('--color-background')

    const vs = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}'
    const fs = `precision highp float;
      uniform sampler2D uTex; uniform float uDpr, uD, uTranslate, uStep, uW, uH, uCw, uRad;
      uniform vec3 uBg, uRim;
      vec3 strip(vec2 q){
        float sx=q.x-uTranslate; float slot=floor(sx/uStep); float lx=sx-slot*uStep;
        if(lx>uW||q.y<0.||q.y>uH) return uBg;
        vec2 d=max(abs(vec2(lx,q.y)-vec2(uW,uH)*.5)-(vec2(uW,uH)*.5-uRad),0.);
        if(length(d)>uRad) return uBg;
        float idx=mod(slot,${N}.);
        vec2 cell=vec2(mod(idx,3.),floor(idx/3.));
        return texture2D(uTex,(cell+vec2(lx/uW,q.y/uH))/3.).rgb;
      }
      void main(){
        vec2 c=vec2(uCw*.5,uH*.5);
        vec2 f=gl_FragCoord.xy/uDpr-uD*.5;
        vec2 p=c+vec2(f.x,-f.y);
        float r=uD*.5; float d=length(p-c)/r;
        if(d>1.) { gl_FragColor=vec4(0.); return; }
        float k=.7+.26*d*d+.1*pow(d,8.);
        float ca=.018*d*d*d;
        vec3 col=vec3(strip(c+(p-c)*k*(1.+ca)).r, strip(c+(p-c)*k).g, strip(c+(p-c)*k*(1.-ca)).b);
        float rim=smoothstep(.84,1.,d);
        col=mix(col,uRim,rim*.38);
        float spec=smoothstep(.72,.98,d)*max(0.,dot(normalize(p-c+1e-4),normalize(vec2(-1.,-1.))));
        col=mix(col,uRim,spec*.45);
        float a=1.-smoothstep(.985,1.,d);
        gl_FragColor=vec4(col*a,a);
      }`
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs))
    gl.linkProgram(prog)
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'a')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)
    gl.uniform3fv(u('uBg'), bg)
    gl.uniform3fv(u('uRim'), surface)

    // Atlas: 3×3 cells, each photo contain-fit on the surface colour, exactly like the DOM cards.
    let ready = false
    const cellW = 512, cellH = Math.round((512 * 16) / 9)
    const atlas = document.createElement('canvas')
    atlas.width = cellW * 3
    atlas.height = cellH * 3
    const ctx = atlas.getContext('2d')!
    ctx.fillStyle = css.getPropertyValue('--color-surface').trim()
    ctx.fillRect(0, 0, atlas.width, atlas.height)
    Promise.all(
      photos.map(
        (ph, i) =>
          new Promise<void>((res) => {
            const img = new Image()
            img.onload = () => {
              const s = Math.min(cellW / img.width, cellH / img.height)
              const w = img.width * s, h = img.height * s
              ctx.drawImage(img, (i % 3) * cellW + (cellW - w) / 2, Math.floor(i / 3) * cellH + (cellH - h) / 2, w, h)
              res()
            }
            img.onerror = () => res()
            img.src = ph.src
          }),
      ),
    ).then(() => {
      const tex = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      ready = true
      dirty = true
      canvas.style.opacity = '1'
    })

    const draw = (tx: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform1f(u('uDpr'), canvas.width / D)
      gl.uniform1f(u('uD'), D)
      gl.uniform1f(u('uTranslate'), tx)
      gl.uniform1f(u('uStep'), step)
      gl.uniform1f(u('uW'), W)
      gl.uniform1f(u('uH'), H)
      gl.uniform1f(u('uCw'), cw)
      gl.uniform1f(u('uRad'), 12)
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // ---------- Motion loop ----------
    let lastFocus = -1
    let visible = true
    let raf = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!visible) return
      if (!dragging) {
        if (target !== null) {
          const dx = target - pos
          pos += dx * 0.12
          if (Math.abs(dx) < 0.3) { pos = target; target = null }
          dirty = true
        } else if (Math.abs(vel) > 0.4) {
          pos += vel
          vel *= 0.94
          dirty = true
        } else if (vel !== 0) {
          vel = 0
          target = Math.round(pos / step) * step // settle on the nearest photo
        }
      }
      if (!dirty) return
      dirty = false
      const tx = translate()
      track.style.transform = `translate3d(${tx}px,0,0)`
      if (ready) draw(tx)
      const f = mod(Math.round(pos / step), N)
      if (f !== lastFocus) { lastFocus = f; onFocus(f) }
    }
    raf = requestAnimationFrame(loop)

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(root)

    // ---------- Input ----------
    let startX = 0, lastX = 0, lastT = 0, moved = 0
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return
      dragging = true
      target = null
      vel = 0
      startX = lastX = e.clientX
      lastT = performance.now()
      moved = 0
      api.current.dragged = false
    }
    const move = (e: PointerEvent) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const now = performance.now()
      pos -= dx
      vel = (-dx / Math.max(1, now - lastT)) * 16
      lastX = e.clientX
      lastT = now
      moved = Math.max(moved, Math.abs(e.clientX - startX))
      // Capture only once it is a real drag, so a plain tap still clicks the card.
      if (moved >= 6 && !root.hasPointerCapture(e.pointerId)) root.setPointerCapture(e.pointerId)
      dirty = true
    }
    const up = () => {
      if (!dragging) return
      dragging = false
      if (performance.now() - lastT > 80) vel = 0
      // A drag must not also count as a click on the card under the pointer.
      api.current.dragged = moved >= 6
      if (api.current.dragged && Math.abs(vel) <= 0.4) target = Math.round(pos / step) * step
    }
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return
      e.preventDefault()
      target = null
      pos += e.deltaX
      vel = 0
      dirty = true
      clearTimeout(wheelEnd)
      wheelEnd = window.setTimeout(() => (target = Math.round(pos / step) * step), 120)
    }
    let wheelEnd = 0
    root.addEventListener('pointerdown', down)
    root.addEventListener('pointermove', move)
    root.addEventListener('pointerup', up)
    root.addEventListener('pointercancel', up)
    root.addEventListener('wheel', wheel, { passive: false })

    api.current.go = (dir) => {
      vel = 0
      target = (Math.round((target ?? pos) / step) + dir) * step
    }
    // Offset from the current pos to where rendered card i sits under the lens (shortest way round).
    const deltaTo = (i: number) => {
      let delta = mod(i * step - loopW - mod(pos, loopW), loopW)
      if (delta > loopW / 2) delta -= loopW
      return delta
    }
    api.current.moveTo = (i) => { vel = 0; target = pos + deltaTo(i) }
    // Tap the photo under the lens to open it; tap any other photo to bring it to the lens.
    api.current.openAt = (i) => (Math.abs(deltaTo(i)) < step / 2 ? onOpen(i % N) : api.current.moveTo(i))

    const onResize = () => {
      const f = Math.round(pos / step)
      measure()
      pos = f * step
      dirty = true
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', onResize)
      root.removeEventListener('pointerdown', down)
      root.removeEventListener('pointermove', move)
      root.removeEventListener('pointerup', up)
      root.removeEventListener('pointercancel', up)
      root.removeEventListener('wheel', wheel)
    }
  }, [onOpen, onFocus])

  return (
    <div>
      <div
        ref={rootRef}
        className="relative touch-pan-y select-none overflow-hidden outline-none"
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Photos from KOFİİ. Drag, or use the arrow keys."
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); api.current.go(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); api.current.go(-1) }
        }}
      >
        <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
          {Array.from({ length: N * COPIES }, (_, i) => (
            <Card
              key={i}
              i={i}
              home={i >= N && i < N * 2}
              onFocus={() => api.current.moveTo(i)}
              onClick={() => {
                if (api.current.dragged) return void (api.current.dragged = false)
                api.current.openAt(i)
              }}
            />
          ))}
        </div>
        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute opacity-0 transition-opacity duration-500" />
      </div>
      <div className="container-text mt-6 flex justify-center gap-4">
        <button type="button" className="btn btn-secondary min-w-24" onClick={() => api.current.go(-1)}>
          Previous
        </button>
        <button type="button" className="btn btn-secondary min-w-24" onClick={() => api.current.go(1)}>
          Next
        </button>
      </div>
    </div>
  )
}
