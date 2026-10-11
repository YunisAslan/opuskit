'use client'
// OpusKit piece — a photo that ripples under the pointer: moving across it sends rings through the picture with a
// faint colour split at their edge, stronger the faster the pointer moves, settling within a second. Plain WebGL (one
// fragment shader, no library). The photo itself is an ordinary <img> underneath, so it shows at once, stays for screen
// readers and remains when WebGL is missing; touch screens and reduced motion keep it still.
// Original OpusKit code (MIT).
import { useEffect, useRef } from 'react'

const VERT = 'attribute vec2 p; varying vec2 v; void main() { v = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }'
const FRAG = `precision mediump float;
varying vec2 v; uniform sampler2D t; uniform vec2 m; uniform float s, time, aspect; uniform vec2 fit, shift;
void main() {
  vec2 uv = vec2(v.x, 1.0 - v.y) * fit + shift; // object-fit: cover
  vec2 d = vec2(v.x, 1.0 - v.y) - m; d.x *= aspect;
  float r = length(d);
  float wave = sin(r * 42.0 - time * 7.0) * exp(-r * 7.0) * s;
  vec2 o = (d / max(r, 1e-4)) * wave * 0.025;
  gl_FragColor = vec4(texture2D(t, uv + o * 1.35).r, texture2D(t, uv + o).g, texture2D(t, uv + o * 0.7).b, 1.0);
}`

export function RippleImage({ src, alt, strength = 1, className }: {
  src: string; alt: string
  /** How strong the rings get at full pointer speed (0–2). */ strength?: number
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return
    const el = root.current!, c = canvas.current!, gl = c.getContext('webgl')
    if (!gl) return
    const shader = (type: number, code: string) => { const x = gl.createShader(type)!; gl.shaderSource(x, code); gl.compileShader(x); return x }
    const prog = gl.createProgram()!
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const at = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(at); gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0)
    const u = (n: string) => gl.getUniformLocation(prog, n)

    let ready = false, frame = 0, s = 0, mx = 0.5, my = 0.5, last = { x: 0, y: 0, t: 0 }, t0 = performance.now()
    const img = new Image()
    img.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
      for (const [k, val] of [[gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE], [gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR]]) gl.texParameteri(gl.TEXTURE_2D, k, val)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      ready = true; size()
    }
    img.src = src
    const size = () => {
      const r = el.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio)
      c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr); gl.viewport(0, 0, c.width, c.height)
      if (!ready) return
      const box = r.width / r.height, pic = img.naturalWidth / img.naturalHeight
      const fit = box > pic ? [1, pic / box] : [box / pic, 1]
      gl.uniform2f(u('fit'), fit[0], fit[1]); gl.uniform2f(u('shift'), (1 - fit[0]) / 2, (1 - fit[1]) / 2); gl.uniform1f(u('aspect'), box)
    }
    const draw = (now: number) => {
      s *= 0.95
      gl.uniform2f(u('m'), mx, my); gl.uniform1f(u('s'), s); gl.uniform1f(u('time'), (now - t0) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      c.style.opacity = s > 0.004 ? '1' : '0' // at rest the plain <img> shows: crisp, and nothing to draw
      frame = s > 0.004 ? requestAnimationFrame(draw) : 0
    }
    const move = (e: PointerEvent) => {
      if (!ready) return
      const r = el.getBoundingClientRect(), now = performance.now()
      mx = (e.clientX - r.left) / r.width; my = (e.clientY - r.top) / r.height
      const speed = Math.hypot(e.clientX - last.x, e.clientY - last.y) / Math.max(8, now - last.t)
      last = { x: e.clientX, y: e.clientY, t: now }
      s = Math.min(strength, s + speed * 0.08 * strength)
      frame ||= requestAnimationFrame(draw)
    }
    const ro = new ResizeObserver(size); ro.observe(el)
    el.addEventListener('pointermove', move)
    return () => { ro.disconnect(); el.removeEventListener('pointermove', move); cancelAnimationFrame(frame) } // never loseContext here: a remount (React strict mode) gets the same, lost, context back
  }, [src, strength])

  return (
    <div ref={root} className={`relative overflow-hidden ${className ?? ''}`}>
      <img src={src} alt={alt} className="size-full object-cover" />
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 size-full opacity-0" />
    </div>
  )
}
