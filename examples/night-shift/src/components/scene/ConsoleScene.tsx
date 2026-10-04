'use client'
/* eslint-disable react-hooks/immutability -- three.js objects (uniforms, textures, lights) are mutated in place by design */
// The first screen: a grading console as a real-time scene. A dark desk under a slate room light, a monitor playing
// the golden-hour shot through a live lift/gamma/gain shader, three trackball wheels, and a scope monitor whose
// waveform and vectorscope are computed from the very frame on the monitor, graded the same way.
// The pointer nudges the wheels (and so the grade, and so the scopes); scroll dollies the camera in.
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { MotionValue } from 'motion/react'
import { assets } from '@/config/assets'
import { MONITOR_SHADER, SAMPLE_H, SAMPLE_W, WHEELS, createScopes, drawScopes, gradeFromPointer, wheelOffset, type RGB } from './grade'

export type SceneLayout = 'wide' | 'tall'
type Props = { progress?: MotionValue<number>; poster?: boolean; layout: SceneLayout; active: boolean; onReady: () => void; onLost: () => void }

export default function ConsoleScene(props: Props) {
  return (
    <Canvas aria-hidden flat shadows="percentage" dpr={props.poster ? 1 : [1, 2]} frameloop={props.active ? 'always' : 'never'}
      camera={{ fov: props.layout === 'tall' ? 38 : 30, near: 0.1, far: 30, position: [0, 1.5, 3.4] }}
      gl={{ antialias: true, preserveDrawingBuffer: !!props.poster, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); props.onLost() })}>
      <Console {...props} />
    </Canvas>
  )
}

const css = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()
const rgbOfHex = (hex: string): RGB => { const c = new THREE.Color(hex); return [c.r, c.g, c.b] }

// Positions in metres. The monitor sits left of centre so the title has the desk's front-left.
const MON = { x: -0.18, y: 1.2, z: -0.5, w: 1.15, h: 0.647 }
const SCOPE = { x: 0.88, y: 1.06, z: -0.4, ry: -0.36 }
const PANEL = { x: -0.18, y: 0.775, z: 0.3 }
const CAMERA: Record<SceneLayout, Record<'from' | 'fromLook' | 'to' | 'toLook', [number, number, number]>> = {
  wide: { from: [0.25, 1.55, 4.4], fromLook: [-0.35, 0.6, -0.3], to: [-0.12, 1.22, 1.05], toLook: [-0.16, 1.18, -0.5] },
  tall: { from: [0.12, 2.0, 3.4], fromLook: [0.08, 1.0, -0.3], to: [-0.12, 1.25, 1.2], toLook: [-0.16, 1.15, -0.5] },
}

function Console({ progress, poster, layout, active, onReady }: Props) {
  const { scene, camera } = useThree()
  const colors = useMemo(() => ({
    bg: css('--color-background'), surface: css('--color-surface'), text: css('--color-text'), muted: css('--color-muted'),
    accent: css('--color-accent'), border: css('--color-border'), secondary: css('--color-secondary'),
  }), [])
  // Grading-suite black: the desk in the surface tone, bezels and trackballs a step darker; only screens give light.
  const dark = useMemo(() => new THREE.Color(colors.surface), [colors])
  const darker = useMemo(() => new THREE.Color(colors.surface).lerp(new THREE.Color(colors.bg), 0.55), [colors])

  // --- textures: the shot (poster frame first, then the video), the scopes, the hue rings, the glows
  const tex = useMemo(() => {
    const posterTex = new THREE.TextureLoader().load(assets.monitorVideo.poster)
    const scopes = createScopes([520, 470], 470)
    const waveTex = new THREE.CanvasTexture(scopes.wave), vecTex = new THREE.CanvasTexture(scopes.vec)
    for (const t of [waveTex, vecTex]) { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4 }
    const hue = document.createElement('canvas'); hue.width = hue.height = 256
    const h = hue.getContext('2d')!
    const g = h.createConicGradient(0, 128, 128)
    // hue runs counter-clockwise seen from above, so the puck sits on the colour the wheel is pushing (see rgbOf)
    for (let i = 0; i <= 12; i++) g.addColorStop(i / 12, `hsl(${360 - i * 30} 70% 62%)`)
    h.fillStyle = g; h.fillRect(0, 0, 256, 256)
    const hueTex = new THREE.CanvasTexture(hue); hueTex.colorSpace = THREE.SRGBColorSpace
    const glow = document.createElement('canvas'); glow.width = glow.height = 128
    const gl = glow.getContext('2d')!, rg = gl.createRadialGradient(64, 64, 0, 64, 64, 64)
    rg.addColorStop(0, 'rgba(255,255,255,0.55)'); rg.addColorStop(0.45, 'rgba(255,255,255,0.14)'); rg.addColorStop(1, 'rgba(255,255,255,0)')
    gl.fillStyle = rg; gl.fillRect(0, 0, 128, 128)
    const glowTex = new THREE.CanvasTexture(glow)
    const sample = Object.assign(document.createElement('canvas'), { width: SAMPLE_W, height: SAMPLE_H })
    return { posterTex, scopes, waveTex, vecTex, hueTex, glowTex, sample, sampleCtx: sample.getContext('2d', { willReadFrequently: true })! }
  }, [])

  const uniforms = useMemo(() => ({
    map: { value: tex.posterTex as THREE.Texture },
    lift: { value: new THREE.Vector3() }, gamma: { value: new THREE.Vector3(1, 1, 1) }, gain: { value: new THREE.Vector3(1, 1, 1) },
  }), [tex])

  // --- the video, live mode only; paused whenever the scene is paused
  const video = useRef<HTMLVideoElement | null>(null)
  useEffect(() => {
    if (poster) return
    const v = Object.assign(document.createElement('video'), { src: assets.monitorVideo.src, muted: true, loop: true, playsInline: true, preload: 'auto' })
    const vt = new THREE.VideoTexture(v); vt.generateMipmaps = false
    const onPlaying = () => { uniforms.map.value = vt; video.current = v }
    v.addEventListener('playing', onPlaying, { once: true })
    v.play().catch(() => {})
    return () => { v.pause(); v.removeAttribute('src'); v.load(); vt.dispose(); video.current = null }
  }, [poster, uniforms])
  useEffect(() => { const v = video.current; if (!v) return; if (active) v.play().catch(() => {}); else v.pause() }, [active])

  useEffect(() => () => { for (const t of [tex.posterTex, tex.waveTex, tex.vecTex, tex.hueTex, tex.glowTex]) t.dispose() }, [tex])

  // --- scene ground: the page's own slate, fading into it
  useEffect(() => {
    scene.background = new THREE.Color(colors.bg)
    scene.fog = new THREE.Fog(colors.bg, 4.2, 9)
  }, [scene, colors])

  // --- pointer, damped; fixed in poster mode
  const target = useRef({ x: 0, y: 0 }), cur = useRef({ x: 0, y: 0 })
  useEffect(() => {
    if (poster) { target.current = cur.current = { x: 0.42, y: 0.18 }; return }
    const move = (e: PointerEvent) => { target.current = { x: (e.clientX / innerWidth) * 2 - 1, y: -((e.clientY / innerHeight) * 2 - 1) } }
    addEventListener('pointermove', move, { passive: true })
    return () => removeEventListener('pointermove', move)
  }, [poster])

  const group = useRef<THREE.Group>(null)
  const wheels = useRef<{ ring: THREE.Mesh | null; ball: THREE.Mesh | null; puck: THREE.Mesh | null }[]>(WHEELS.map(() => ({ ring: null, ball: null, puck: null })))
  const spill = useRef<THREE.PointLight>(null), monGlow = useRef<THREE.MeshBasicMaterial>(null)
  const cam = CAMERA[layout]
  const v3 = useMemo(() => ({ a: new THREE.Vector3(), b: new THREE.Vector3(), look: new THREE.Vector3() }), [])
  const frame = useRef(0), readied = useRef(false)
  const scopeColors = useMemo(() => ({ screen: colors.bg, line: colors.border, trace: rgbOfHex(colors.text), skin: colors.accent }), [colors, darker])

  useFrame((_, dt) => {
    const k = 1 - Math.pow(1 - 0.08, Math.min(dt, 0.1) * 60)
    const c = cur.current, t = target.current
    c.x += (t.x - c.x) * k; c.y += (t.y - c.y) * k

    // the whole console turns ≤ 6° toward the pointer
    if (group.current) { group.current.rotation.y = c.x * 0.1; group.current.rotation.x = -c.y * 0.035 }

    // the grade the wheels are making, on the monitor
    const g = gradeFromPointer(c.x, c.y)
    uniforms.lift.value.set(...g.lift); uniforms.gamma.value.set(...g.gamma); uniforms.gain.value.set(...g.gain)

    wheels.current.forEach((w, i) => {
      const [ox, oy] = wheelOffset(c.x, c.y, i), m = Math.min(1, Math.hypot(ox, oy)), a = Math.atan2(oy, ox)
      if (w.ring) w.ring.rotation.z = ox * 0.35
      if (w.ball) { w.ball.rotation.x = -oy * 0.8; w.ball.rotation.z = -ox * 0.8 }
      if (w.puck) { w.puck.position.set(Math.cos(a) * 0.118 * Math.max(m, 0.15), 0.017, -Math.sin(a) * 0.118 * Math.max(m, 0.15)) }
    })

    // camera: scroll dolly toward the monitor
    const p = progress?.get() ?? 0, e = p * p * (3 - 2 * p)
    camera.position.lerpVectors(v3.a.fromArray(cam.from), v3.b.fromArray(cam.to), e)
    camera.lookAt(v3.look.lerpVectors(v3.a.fromArray(cam.fromLook), v3.b.fromArray(cam.toLook), e))

    // scopes: read the frame on the monitor, grade it the same way, redraw (every 4th frame)
    if (frame.current++ % 4 === 0) {
      const src = video.current && video.current.readyState >= 2 ? video.current : (tex.posterTex.image as HTMLImageElement | undefined)
      if (src && (!(src instanceof HTMLImageElement) || src.complete)) {
        tex.sampleCtx.drawImage(src, 0, 0, SAMPLE_W, SAMPLE_H)
        drawScopes(tex.sampleCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H), g, tex.scopes, scopeColors)
        tex.waveTex.needsUpdate = tex.vecTex.needsUpdate = true
        const [r, gg, b] = tex.scopes.average
        spill.current?.color.setRGB(r, gg, b, THREE.SRGBColorSpace)
        monGlow.current?.color.setRGB(r, gg, b, THREE.SRGBColorSpace)
        if (!readied.current && frame.current > 8) { readied.current = true; onReady() }
      }
    }
  })

  const metal = { color: colors.secondary, roughness: 0.32, metalness: 0.55 }
  const wallTarget = useMemo(() => new THREE.Object3D(), [])
  return (
    <>
      <hemisphereLight args={[colors.muted, colors.bg, 0.22]} />
      <spotLight position={[-1.6, 3.6, 2.2]} angle={0.62} penumbra={0.85} intensity={7} color={colors.muted} castShadow
        shadow-mapSize={[1024, 1024]} shadow-bias={-0.0004} />
      <directionalLight position={[2.6, 2.4, -2.4]} intensity={0.35} color={colors.text} />
      <pointLight ref={spill} position={[MON.x, MON.y - 0.05, MON.z + 0.45]} intensity={3.2} distance={3} decay={2} />
      <pointLight position={[SCOPE.x - 0.1, SCOPE.y, SCOPE.z + 0.35]} intensity={0.18} distance={1.4} decay={2} color={colors.text} />

      {/* the room */}
      <mesh position={[0, 2.2, -1.45]} receiveShadow><planeGeometry args={[14, 7]} /><meshStandardMaterial color={colors.bg} roughness={1} /></mesh>
      {/* a slate pool of room light on the wall behind the console */}
      <primitive object={wallTarget} position={[0.35, 1.5, -1.45]} />
      <spotLight position={[0.35, 3.6, 0.8]} angle={0.42} penumbra={1} intensity={3} color={colors.muted} target={wallTarget} />

      <group ref={group}>
        {/* desk */}
        <mesh position={[0, 0.72, -0.12]} receiveShadow castShadow><boxGeometry args={[4.6, 0.05, 1.75]} /><meshStandardMaterial color={dark} roughness={0.42} metalness={0.15} /></mesh>

        {/* grading monitor */}
        <group position={[MON.x, MON.y, MON.z]}>
          <mesh position={[0, 0, -0.32]} scale={[MON.w * 2.4, MON.h * 2.4, 1]}><planeGeometry /><meshBasicMaterial ref={monGlow} map={tex.glowTex} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.5} toneMapped={false} /></mesh>
          <mesh castShadow><boxGeometry args={[MON.w + 0.045, MON.h + 0.045, 0.04]} /><meshStandardMaterial color={darker} roughness={0.5} metalness={0.3} /></mesh>
          <mesh position={[0, 0, 0.0205]}><planeGeometry args={[MON.w, MON.h]} /><shaderMaterial uniforms={uniforms} vertexShader={MONITOR_SHADER.vertex} fragmentShader={MONITOR_SHADER.fragment} toneMapped={false} /></mesh>
          <mesh position={[0, 0.815 - MON.y, -0.05]} castShadow><boxGeometry args={[0.07, 0.16, 0.05]} /><meshStandardMaterial {...metal} /></mesh>
          <mesh position={[0, -(MON.y - 0.755), -0.03]} castShadow receiveShadow><boxGeometry args={[0.42, 0.016, 0.24]} /><meshStandardMaterial {...metal} /></mesh>
        </group>

        {/* scope monitor: vectorscope and waveform */}
        <group position={[SCOPE.x, SCOPE.y, SCOPE.z]} rotation={[0, SCOPE.ry, 0]}>
          <mesh position={[0, 0, -0.25]} scale={[1.9, 1.15, 1]}><planeGeometry /><meshBasicMaterial map={tex.glowTex} color={colors.text} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.1} toneMapped={false} /></mesh>
          <mesh castShadow><boxGeometry args={[0.9, 0.44, 0.035]} /><meshStandardMaterial color={darker} roughness={0.5} metalness={0.3} /></mesh>
          <mesh position={[-0.215, 0, 0.0185]}><planeGeometry args={[0.4, 0.4]} /><meshBasicMaterial map={tex.vecTex} toneMapped={false} /></mesh>
          <mesh position={[0.21, 0, 0.0185]}><planeGeometry args={[0.44, 0.4]} /><meshBasicMaterial map={tex.waveTex} toneMapped={false} /></mesh>
          <mesh position={[0, 0.8 - SCOPE.y, -0.04]} castShadow><boxGeometry args={[0.06, 0.13, 0.04]} /><meshStandardMaterial {...metal} /></mesh>
          <mesh position={[0, -(SCOPE.y - 0.755), -0.02]} castShadow receiveShadow><boxGeometry args={[0.32, 0.016, 0.2]} /><meshStandardMaterial {...metal} /></mesh>
        </group>

        {/* control panel: lift, gamma, gain */}
        <group position={[PANEL.x, PANEL.y, PANEL.z]} rotation={[0.06, 0, 0]}>
          <mesh castShadow receiveShadow><boxGeometry args={[1.2, 0.05, 0.38]} /><meshStandardMaterial color={darker} roughness={0.55} metalness={0.25} /></mesh>
          {WHEELS.map((w, i) => (
            <group key={w.name} position={[(i - 1) * 0.38, 0.026, 0]}>
              <mesh receiveShadow><cylinderGeometry args={[0.16, 0.16, 0.012, 48]} /><meshStandardMaterial color={dark} roughness={0.4} metalness={0.4} /></mesh>
              <mesh position={[0, 0.0075, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.096, 0.14, 64]} /><meshBasicMaterial map={tex.hueTex} transparent opacity={0.85} toneMapped={false} /></mesh>
              <mesh ref={(m) => { wheels.current[i].ring = m }} position={[0, 0.012, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow><torusGeometry args={[0.152, 0.011, 12, 72]} /><meshStandardMaterial {...metal} />
                <mesh position={[0, 0.152, 0]}><boxGeometry args={[0.008, 0.026, 0.026]} /><meshBasicMaterial color={colors.text} toneMapped={false} /></mesh>
              </mesh>
              <mesh ref={(m) => { wheels.current[i].ball = m }} position={[0, 0.05, 0]} castShadow><sphereGeometry args={[0.078, 40, 24]} /><meshStandardMaterial color={darker} roughness={0.12} metalness={0.2} /></mesh>
              <mesh ref={(m) => { wheels.current[i].puck = m }}><sphereGeometry args={[0.011, 12, 8]} /><meshBasicMaterial color={colors.text} toneMapped={false} /></mesh>
            </group>
          ))}
        </group>
      </group>
    </>
  )
}
