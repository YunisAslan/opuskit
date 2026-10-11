'use client'
// OpusKit piece — a 3D object as the lead: the site's own model (glTF/GLB) in soft studio light, turning slowly by
// itself, leaning a few degrees toward the pointer and easing back from the camera as the page scrolls away. Words go
// over it as plain HTML (children), never inside the canvas. The poster shows first and stays when WebGL is missing,
// the model fails to load, or motion is reduced. Draws only while in view; pixel ratio capped (2, phones 1.5).
// Uses three (MIT). Original OpusKit code (MIT).
import { useEffect, useRef, useState, type ReactNode } from 'react'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export function ModelStage({ src, poster, alt, tilt = 8, spin = 0.12, children, className }: {
  /** The model: .glb, < 3 MB. */ src: string
  /** A rendered still of the same model, shown first and as the fallback. */ poster: string
  /** What the object is, for screen readers. */ alt: string
  /** How far it leans toward the pointer, in degrees (≤ 8). */ tilt?: number
  /** Idle turning speed, in radians per second. */ spin?: number
  /** The headline and button, laid over the scene. */ children?: ReactNode
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null), canvas = useRef<HTMLCanvasElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const el = root.current!, c = canvas.current!
    let renderer: THREE.WebGLRenderer
    try { renderer = new THREE.WebGLRenderer({ canvas: c, antialias: true, alpha: true }) } catch { return }
    const coarse = matchMedia('(pointer: coarse)').matches
    renderer.setPixelRatio(Math.min(coarse ? 1.5 : 2, devicePixelRatio))
    renderer.toneMapping = THREE.ACESFilmicToneMapping

    const scene = new THREE.Scene(), pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    const key = new THREE.DirectionalLight(0xffffff, 1.6); key.position.set(3, 4, 5); scene.add(key)
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)
    const holder = new THREE.Group(); scene.add(holder)
    let base = 4, alive = true, seen = true, frame = 0, last = performance.now()
    const aim = { x: 0, y: 0 }

    new GLTFLoader().load(src, (gltf) => {
      if (!alive) return
      const model = gltf.scene, box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3())
      model.position.sub(box.getCenter(new THREE.Vector3())) // centred on the origin, so it turns in place
      holder.add(model)
      base = (Math.max(size.x, size.y, size.z) / 2 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 1.5
      setReady(true)
      frame = requestAnimationFrame(draw)
    }, undefined, () => { /* keep the poster */ })

    const size = () => { const r = el.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / Math.max(1, r.height); camera.updateProjectionMatrix() }
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now
      const r = el.getBoundingClientRect(), away = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)))
      holder.rotation.y += spin * dt
      holder.rotation.x += (aim.y * THREE.MathUtils.degToRad(tilt) - holder.rotation.x) * 0.08
      holder.position.x += (aim.x * 0.05 * base - holder.position.x) * 0.08
      camera.position.set(0, 0, base * (1 + away * 0.35)); camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      frame = seen && alive ? requestAnimationFrame(draw) : 0
    }
    const move = (e: PointerEvent) => { const r = el.getBoundingClientRect(); aim.x = ((e.clientX - r.left) / r.width) * 2 - 1; aim.y = ((e.clientY - r.top) / r.height) * 2 - 1 }
    const io = new IntersectionObserver(([e]) => { seen = e.isIntersecting; if (seen && !frame && holder.children.length) { last = performance.now(); frame = requestAnimationFrame(draw) } })
    const ro = new ResizeObserver(size)
    io.observe(el); ro.observe(el); size()
    if (!coarse) el.addEventListener('pointermove', move)
    return () => {
      alive = false; cancelAnimationFrame(frame); io.disconnect(); ro.disconnect(); el.removeEventListener('pointermove', move)
      holder.traverse((o) => { if (o instanceof THREE.Mesh) { o.geometry.dispose(); for (const m of [o.material].flat()) m.dispose() } })
      pmrem.dispose(); renderer.dispose() // never forceContextLoss: a remount (React strict mode) gets the same canvas back
    }
  }, [src, tilt, spin])

  return (
    <div ref={root} className={`relative overflow-hidden ${className ?? ''}`}>
      <img src={poster} alt={alt} className="absolute inset-0 size-full object-contain transition-opacity duration-500" style={{ opacity: ready ? 0 : 1 }} />
      <canvas ref={canvas} aria-hidden className="absolute inset-0 size-full transition-opacity duration-500" style={{ opacity: ready ? 1 : 0 }} />
      {children && <div className="relative z-10 size-full">{children}</div>}
    </div>
  )
}
