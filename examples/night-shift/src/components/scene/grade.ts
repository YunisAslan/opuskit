// Lift / gamma / gain from the pointer, the same grade applied to pixels on the CPU (for the scopes), and the two
// scopes drawn from a real frame. Pure apart from the canvas calls, so the maths can be checked with
// `node src/components/scene/grade.check.ts`.
export type RGB = [number, number, number]
export type Grade = { lift: RGB; gamma: RGB; gain: RGB }

const TAU = Math.PI * 2
/** A colour-wheel offset (x right, y up, |v| ≤ 1) as a zero-sum RGB push: right warms, left cools to teal. */
export const rgbOf = (x: number, y: number): RGB => {
  const a = Math.atan2(y, x), m = Math.min(1, Math.hypot(x, y))
  return [m * Math.cos(a), m * Math.cos(a - TAU / 3), m * Math.cos(a + TAU / 3)]
}

// Each wheel sees the pointer a little differently, so the three never move as one.
export const WHEELS = [
  { name: 'Lift', scale: 0.7, turn: 0.5 },
  { name: 'Gamma', scale: 1, turn: 0 },
  { name: 'Gain', scale: 0.85, turn: -0.45 },
] as const
export const wheelOffset = (px: number, py: number, i: number): [number, number] => {
  const { scale, turn } = WHEELS[i], c = Math.cos(turn), s = Math.sin(turn)
  return [(px * c - py * s) * scale, (px * s + py * c) * scale]
}

export function gradeFromPointer(px: number, py: number): Grade {
  const l = rgbOf(...wheelOffset(px, py, 0)), m = rgbOf(...wheelOffset(px, py, 1)), h = rgbOf(...wheelOffset(px, py, 2))
  return {
    lift: l.map((v) => v * 0.035) as RGB,
    gamma: m.map((v) => 1 + v * 0.12 + py * 0.14) as RGB,
    gain: h.map((v) => 1 + v * 0.08) as RGB,
  }
}

/** One channel through the grade — the same formula the monitor's shader runs. Values 0–1, display-referred. */
export const gradeChannel = (v: number, ch: 0 | 1 | 2, g: Grade) => {
  const x = v * g.gain[ch] + g.lift[ch] * (1 - v)
  return Math.pow(Math.min(1, Math.max(0, x)), 1 / g.gamma[ch])
}

export const MONITOR_SHADER = {
  vertex: /* glsl */ `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
  fragment: /* glsl */ `
    uniform sampler2D map; uniform vec3 lift; uniform vec3 gamma; uniform vec3 gain; varying vec2 vUv;
    void main() {
      vec3 c = texture2D(map, vUv).rgb;
      c = clamp(c * gain + lift * (1.0 - c), 0.0, 1.0);
      gl_FragColor = vec4(pow(c, 1.0 / gamma), 1.0);
    }`,
}

export type ScopeColors = { screen: string; line: string; trace: RGB; skin: string }
export type Scopes = { wave: HTMLCanvasElement; vec: HTMLCanvasElement; average: RGB }

// Sample size: 160 × 90 pixels of the frame is plenty for a scope the size of a hand.
export const SAMPLE_W = 160, SAMPLE_H = 90
const WAVE_H = 128, VEC = 128, VK = 1.6 // vectorscope gain (zoomed: footage rarely passes 50% saturation)

/** BT.709 luma and colour difference. */
export const luma = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b
export const cbcr = (r: number, g: number, b: number): [number, number] => [-0.1146 * r - 0.3854 * g + 0.5 * b, 0.5 * r - 0.4542 * g - 0.0458 * b]

export function createScopes(waveSize: [number, number], vecSize: number): Scopes {
  const make = (w: number, h: number) => Object.assign(document.createElement('canvas'), { width: w, height: h })
  return { wave: make(...waveSize), vec: make(vecSize, vecSize), average: [0.5, 0.5, 0.5] }
}

const traceWave = Object.assign(globalThis.document?.createElement('canvas') ?? {}, { width: SAMPLE_W, height: WAVE_H }) as HTMLCanvasElement
const traceVec = Object.assign(globalThis.document?.createElement('canvas') ?? {}, { width: VEC, height: VEC }) as HTMLCanvasElement
const waveCount = new Float32Array(SAMPLE_W * WAVE_H)
const vecSum = new Float32Array(VEC * VEC * 4)

/** Read a frame (already drawn into a SAMPLE_W × SAMPLE_H canvas), grade it, and redraw both scopes. */
export function drawScopes(frame: ImageData, g: Grade, s: Scopes, c: ScopeColors) {
  waveCount.fill(0); vecSum.fill(0)
  const d = frame.data
  let ar = 0, ag = 0, ab = 0
  for (let y = 0; y < SAMPLE_H; y++) for (let x = 0; x < SAMPLE_W; x++) {
    const i = (y * SAMPLE_W + x) * 4
    const r = gradeChannel(d[i] / 255, 0, g), gg = gradeChannel(d[i + 1] / 255, 1, g), b = gradeChannel(d[i + 2] / 255, 2, g)
    ar += r; ag += gg; ab += b
    const wy = Math.round((1 - luma(r, gg, b)) * (WAVE_H - 1))
    waveCount[wy * SAMPLE_W + x]++
    const [cb, cr] = cbcr(r, gg, b)
    const vx = Math.round(VEC / 2 + cb * VEC * VK), vy = Math.round(VEC / 2 - cr * VEC * VK)
    if (vx < 0 || vy < 0 || vx >= VEC || vy >= VEC) continue
    const j = (vy * VEC + vx) * 4
    vecSum[j] += r; vecSum[j + 1] += gg; vecSum[j + 2] += b; vecSum[j + 3]++
  }
  const n = SAMPLE_W * SAMPLE_H
  s.average = [ar / n, ag / n, ab / n]

  // Waveform trace: the trace colour, brighter where more pixels land.
  const wctx = traceWave.getContext('2d')!, wimg = wctx.createImageData(SAMPLE_W, WAVE_H)
  for (let k = 0; k < waveCount.length; k++) {
    const v = waveCount[k]; if (!v) continue
    const a = 1 - Math.exp(-v * 0.2)
    wimg.data.set([c.trace[0] * 255, c.trace[1] * 255, c.trace[2] * 255, a * 255], k * 4)
  }
  wctx.putImageData(wimg, 0, 0)

  // Vectorscope trace: each bin in the average colour of its pixels, saturated so it reads on the dark screen.
  const vctx = traceVec.getContext('2d')!, vimg = vctx.createImageData(VEC, VEC)
  for (let k = 0; k < VEC * VEC; k++) {
    const cnt = vecSum[k * 4 + 3]; if (!cnt) continue
    const m = Math.max(vecSum[k * 4], vecSum[k * 4 + 1], vecSum[k * 4 + 2], 1e-3)
    const [r, gg, b] = [0, 1, 2].map((ch) => 0.3 + 0.7 * (vecSum[k * 4 + ch] / m))
    const a = 1 - Math.exp(-cnt * 0.7)
    vimg.data.set([r * 255, gg * 255, b * 255, a * 255], k * 4)
  }
  vctx.putImageData(vimg, 0, 0)

  paintWave(s.wave, c); paintVec(s.vec, c)
}

function paintWave(cv: HTMLCanvasElement, c: ScopeColors) {
  const ctx = cv.getContext('2d')!, { width: w, height: h } = cv, pad = Math.round(w * 0.06)
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = c.screen; ctx.fillRect(0, 0, w, h)
  ctx.strokeStyle = c.line; ctx.lineWidth = 1.5
  for (let i = 0; i <= 4; i++) { const y = pad + ((h - pad * 2) * i) / 4; ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke() }
  ctx.imageSmoothingEnabled = true
  ctx.globalCompositeOperation = 'lighter'
  ctx.filter = 'blur(2px)'; ctx.drawImage(traceWave, pad, pad, w - pad * 2, h - pad * 2)
  ctx.filter = 'none'; ctx.drawImage(traceWave, pad, pad, w - pad * 2, h - pad * 2)
  ctx.globalCompositeOperation = 'source-over'
}

// Primary and secondary directions (75% bars), and the skin line (I-line, ≈123°).
const TARGETS: RGB[] = [[0.75, 0, 0], [0.75, 0.75, 0], [0, 0.75, 0], [0, 0.75, 0.75], [0, 0, 0.75], [0.75, 0, 0.75]]
function paintVec(cv: HTMLCanvasElement, c: ScopeColors) {
  const ctx = cv.getContext('2d')!, w = cv.width, r = w / 2 - w * 0.06, cx = w / 2
  ctx.globalCompositeOperation = 'source-over'
  ctx.fillStyle = c.screen; ctx.fillRect(0, 0, w, w)
  ctx.strokeStyle = c.line; ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.arc(cx, cx, r, 0, Math.PI * 2); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(cx - r, cx); ctx.lineTo(cx + r, cx); ctx.moveTo(cx, cx - r); ctx.lineTo(cx, cx + r); ctx.stroke()
  // zoomed, the 75% targets fall outside: mark each primary's and secondary's direction on the rim instead
  for (const t of TARGETS) {
    const [cb, cr] = cbcr(...t), len = Math.hypot(cb, cr), dx = cb / len, dy = -cr / len
    ctx.beginPath(); ctx.moveTo(cx + dx * r * 0.9, cx + dy * r * 0.9); ctx.lineTo(cx + dx * r * 1.0, cx + dy * r * 1.0); ctx.stroke()
  }
  ctx.strokeStyle = c.skin; ctx.lineWidth = 1.5
  const [scb, scr] = cbcr(0.8, 0.55, 0.42), len = Math.hypot(scb, scr)
  ctx.beginPath(); ctx.moveTo(cx, cx); ctx.lineTo(cx + (scb / len) * r, cx - (scr / len) * r); ctx.stroke()
  ctx.globalCompositeOperation = 'lighter'
  ctx.imageSmoothingEnabled = true
  ctx.filter = 'blur(3px)'; ctx.drawImage(traceVec, cx - r, cx - r, r * 2, r * 2)
  ctx.filter = 'none'; ctx.drawImage(traceVec, cx - r, cx - r, r * 2, r * 2)
  ctx.globalCompositeOperation = 'source-over'
}
