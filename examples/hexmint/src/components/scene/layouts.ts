// Tile layouts for the hex scene. One instanced hexagonal prism, arranged per variant — the live hero and the still
// renders used across the site all come from the same geometry, materials and lights.
export type Tile = { x: number; z: number; h: number; y?: number; s?: number; rot?: number; accent?: boolean }
export type Variant = 'hero' | 'invoices' | 'expenses' | 'books' | 'close'

const SPACING = 0.5 // hex "size": centre-to-corner distance of a cell; tiles are drawn slightly smaller for a gap

function cells(rings: number) {
  const out: { q: number; r: number }[] = []
  for (let q = -rings; q <= rings; q++)
    for (let r = Math.max(-rings, -q - rings); r <= Math.min(rings, -q + rings); r++) out.push({ q, r })
  return out
}
const at = (q: number, r: number) => ({ x: SPACING * Math.sqrt(3) * (q + r / 2), z: SPACING * 1.5 * r })

export function layout(variant: Variant, small = false): Tile[] {
  if (variant === 'hero') {
    // A field of quarterly figures: heights follow a smooth surface, lower towards the edges; one tile is the signal.
    return cells(small ? 3 : 4).map(({ q, r }) => {
      const d = Math.max(Math.abs(q), Math.abs(r), Math.abs(q + r))
      const wave = 0.5 + 0.5 * Math.sin(0.85 * q + 0.35 * r + 0.6) * Math.cos(0.55 * r - 0.25 * q)
      const accent = q === 1 && r === 0
      return { ...at(q, r), h: accent ? 2.2 : (0.22 + 1.6 * wave ** 1.6) * (1 - 0.08 * d), accent }
    })
  }
  if (variant === 'invoices') {
    // Three stacks of thin plates; the newest invoice on the tallest stack is the signal.
    const stacks = [{ x: -1.35, n: 5 }, { x: 0, n: 11 }, { x: 1.35, n: 7 }]
    return stacks.flatMap(({ x, n }) => Array.from({ length: n }, (_, i) => ({
      x, z: 0, h: 0.09, y: i * 0.125, s: 1.25, rot: ((i * 37) % 11) / 11 * 0.35 - 0.17, accent: n === 11 && i === n - 1,
    })))
  }
  if (variant === 'expenses') {
    // A flat honeycomb; one row rises step by step as its lines are matched, ending on the signal.
    return cells(3).map(({ q, r }) => ({ ...at(q, r), h: r === 0 ? 0.16 + (q + 3) * 0.2 : 0.16, accent: r === 0 && q === 3 }))
  }
  if (variant === 'books') {
    // Four quarters as columns on a low floor; Q4 is the signal.
    const cols: Record<number, number> = { [-1]: 0.85, 0: 1.25, 1: 1.7, 2: 2.25 }
    return cells(3).map(({ q, r }) => {
      const col = r === 0 && q in cols
      return { ...at(q, r), h: col ? cols[q] : 0.1, accent: col && q === 2 }
    })
  }
  // close: everything reconciled — a perfectly level field with the signal at its centre.
  return cells(4).map(({ q, r }) => ({ ...at(q, r), h: 0.32, accent: q === 0 && r === 0 }))
}

// Camera per variant: position and look-at for a landscape frame; portrait frames pull back and lift the field.
export const cameras: Record<Variant, { pos: [number, number, number]; look: [number, number, number]; shiftX: number }> = {
  hero: { pos: [-0.6, 7.2, 10.8], look: [0, -0.5, 0.4], shiftX: 2.1 },
  invoices: { pos: [0, 3.6, 6.2], look: [0, 0.6, 0], shiftX: 0 },
  expenses: { pos: [0.6, 4.6, 6.0], look: [0, 0.3, 0], shiftX: 0 },
  books: { pos: [-0.8, 3.8, 6.4], look: [0, 0.7, 0], shiftX: 0 },
  close: { pos: [0, 6.8, 6.8], look: [0, 0, 0], shiftX: 0 },
}
