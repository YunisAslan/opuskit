'use client'
// The hero's 3D scene, made from shapes in code (no model file): one bevelled hexagonal prism, instanced into a field
// of tiles (one draw call), lit with a single key light and a soft rim, shadows on an invisible floor. Colours come
// from the recipe tokens at runtime. It renders on demand only: while the pointer/scroll targets are being eased
// towards (lerp 0.08), during the one-off intro ripple, and never while off-screen.
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { cameras, layout, type Variant } from './layouts'

const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
const MAX_TILT = (8 * Math.PI) / 180 // the object turns at most 8° toward the pointer

export type SceneProps = {
  variant?: Variant
  /** Still render for posters: no intro, no pointer, no scroll; keeps the drawing buffer for capture. */
  still?: boolean
  inView?: React.RefObject<boolean>
  onReady?: () => void
  onFail?: () => void
  className?: string
}

function hexGeometry(bevelSegments: number) {
  const r = 0.46, bevel = 0.035
  const shape = new THREE.Shape()
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 2
    const x = Math.cos(a) * (r - bevel), y = Math.sin(a) * (r - bevel)
    if (i === 0) shape.moveTo(x, y); else shape.lineTo(x, y)
  }
  shape.closePath()
  const g = new THREE.ExtrudeGeometry(shape, { depth: 1 - 2 * bevel, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments, curveSegments: 1 })
  g.rotateX(-Math.PI / 2) // extrude up the y axis
  g.translate(0, bevel, 0) // base sits on y = 0, top at y = 1
  return g
}

function Tiles({ variant, small, still, inView, onReady }: { variant: Variant; small: boolean; still: boolean; inView?: React.RefObject<boolean>; onReady?: () => void }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const group = useRef<THREE.Group>(null)
  const { camera, size, invalidate } = useThree()
  const tiles = useMemo(() => layout(variant, small), [variant, small])
  const geometry = useMemo(() => hexGeometry(small ? 1 : 2), [small])
  const portrait = size.width < size.height
  const cam = cameras[variant]

  // Targets the frame loop eases towards.
  const target = useRef({ rx: 0, ry: 0, scroll: 0 })
  const start = useRef<number | null>(still ? -1 : null)
  const ready = useRef(false)
  const tmp = useMemo(() => ({ m: new THREE.Matrix4(), q: new THREE.Quaternion(), p: new THREE.Vector3(), s: new THREE.Vector3(), e: new THREE.Euler(), look: new THREE.Vector3() }), [])
  const accentAt = tiles.find((t) => t.accent) ?? tiles[0]

  const place = (lift: (i: number) => number) => {
    const m = mesh.current
    if (!m) return
    tiles.forEach((t, i) => {
      tmp.q.setFromEuler(tmp.e.set(0, t.rot ?? 0, 0))
      tmp.p.set(t.x, (t.y ?? 0) + lift(i), t.z)
      tmp.s.set(t.s ?? 1, t.h, t.s ?? 1)
      m.setMatrixAt(i, tmp.m.compose(tmp.p, tmp.q, tmp.s))
    })
    m.instanceMatrix.needsUpdate = true
  }

  useLayoutEffect(() => {
    const m = mesh.current
    if (!m) return
    const base = new THREE.Color(token('--color-surface')), high = new THREE.Color(token('--color-secondary')), signal = new THREE.Color(token('--color-accent'))
    const maxH = Math.max(...tiles.map((t) => t.h))
    const c = new THREE.Color()
    tiles.forEach((t, i) => m.setColorAt(i, t.accent ? signal : c.copy(base).lerp(high, Math.min(1, t.h / maxH))))
    if (m.instanceColor) m.instanceColor.needsUpdate = true
    place(() => 0)
    m.computeBoundingSphere()
    invalidate()
  }, [tiles]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pointer (fine pointers only) and scroll set targets; each event asks for frames only while in view.
  useEffect(() => {
    if (still) return
    const fine = matchMedia('(pointer: fine)').matches
    const onMove = (e: PointerEvent) => {
      if (!fine || e.pointerType !== 'mouse') return
      target.current.ry = ((e.clientX / innerWidth) * 2 - 1) * MAX_TILT
      target.current.rx = ((e.clientY / innerHeight) * 2 - 1) * MAX_TILT * 0.5
      if (inView?.current !== false) invalidate()
    }
    const onScroll = () => {
      target.current.scroll = Math.min(1, scrollY / innerHeight)
      if (inView?.current !== false) invalidate()
    }
    onScroll()
    addEventListener('pointermove', onMove, { passive: true })
    addEventListener('scroll', onScroll, { passive: true })
    return () => { removeEventListener('pointermove', onMove); removeEventListener('scroll', onScroll) }
  }, [still, inView, invalidate])

  useFrame((state) => {
    const g = group.current
    if (!g) return
    let moving = false
    const ease = (from: number, to: number) => {
      const next = from + (to - from) * (still ? 1 : 0.08)
      if (Math.abs(to - next) > 1e-4) moving = true
      return Math.abs(to - next) > 1e-4 ? next : to
    }
    const t = target.current
    g.rotation.y = ease(g.rotation.y, t.ry)
    g.rotation.x = ease(g.rotation.x, t.rx)
    // Camera: framing per aspect, then a dolly back and up as the hero scrolls away.
    const pull = portrait ? 1.75 : 1
    const sc = ease(g.userData.scroll ?? 0, t.scroll)
    g.userData.scroll = sc
    camera.position.set(cam.pos[0] * pull, cam.pos[1] * pull + sc * 1.4, cam.pos[2] * pull + sc * 2.4)
    tmp.look.set(cam.look[0], cam.look[1] - (portrait ? (variant === 'hero' ? 2.6 : 0) : 0) + sc * 0.4, cam.look[2])
    camera.lookAt(tmp.look)
    g.position.x = portrait ? 0 : cam.shiftX

    // Intro: one ripple from the signal tile outwards, once (~2.4 s), then the scene rests.
    if (start.current === null) start.current = state.clock.elapsedTime
    if (start.current >= 0) {
      const el = state.clock.elapsedTime - start.current
      if (el < 2.6) {
        place((i) => {
          const d = Math.hypot(tiles[i].x - accentAt.x, tiles[i].z - accentAt.z)
          const w = el * 3.2 - d
          return w > 0 && w < Math.PI ? Math.sin(w) * 0.22 * (1 - el / 2.6) : 0
        })
        moving = true
      } else { place(() => 0); start.current = -1 }
    }
    if (moving && inView?.current !== false) invalidate()
    if (!ready.current) { ready.current = true; requestAnimationFrame(() => onReady?.()) }
  })

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[geometry, undefined, tiles.length]} castShadow receiveShadow frustumCulled={false}>
        <meshStandardMaterial roughness={0.5} metalness={0.12} />
      </instancedMesh>
      <mesh rotation-x={-Math.PI / 2} position-y={0.001} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <shadowMaterial opacity={0.38} />
      </mesh>
    </group>
  )
}

function Lights({ small }: { small: boolean }) {
  const colors = useMemo(() => ({ text: token('--color-text'), muted: token('--color-muted'), ground: token('--color-background') }), [])
  return (
    <>
      <hemisphereLight args={[colors.text, colors.ground, 0.4]} />
      {/* key: one soft white light, high front-left, the only shadow caster */}
      <directionalLight color={colors.text} intensity={2.9} position={[-4, 7.5, 4.5]} castShadow
        shadow-mapSize={small ? [512, 512] : [1024, 1024]} shadow-bias={-0.0005} shadow-normalBias={0.025}
        shadow-camera-left={-7} shadow-camera-right={7} shadow-camera-top={7} shadow-camera-bottom={-7} />
      {/* rim: cooler, from behind-right, to separate the edges from the ground */}
      <directionalLight color={colors.muted} intensity={1.5} position={[5, 3, -6]} />
    </>
  )
}

export default function HexScene({ variant = 'hero', still = false, inView, onReady, onFail, className }: SceneProps) {
  const small = typeof window !== 'undefined' && innerWidth < 640
  return (
    <Canvas className={className} frameloop="demand" flat shadows
      dpr={still ? devicePixelRatio : [1, small ? 1.5 : 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', preserveDrawingBuffer: still }}
      camera={{ fov: 32, near: 0.1, far: 60, position: cameras[variant].pos }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); onFail?.() })
      }}>
      <Lights small={small} />
      <Tiles variant={variant} small={small} still={still} inView={inView} onReady={onReady} />
    </Canvas>
  )
}
