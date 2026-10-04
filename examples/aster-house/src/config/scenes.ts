// Scene map of the walk-through film (21.2 s, watched frame by frame). Fractions of the timeline = fractions of the
// hero's scroll. One message per scene; each arrives as its scene begins and leaves before the next one arrives.
//   0.00–0.20  the living room, looking through to the kitchen   → the name and one line
//   0.24–0.52  the kitchen island and the dining table pass by    → "The kitchen"
//   0.57–0.74  the hall: a long white wall, a mirror, a painting  → "The hall"
//   0.79–1.00  the hall opens onto the glass stair                → "The stair"
export type Scene = { id: string; from: number; to: number; label?: string; line?: string; reveal: 'title' | 'mask' | 'wipe' | 'track' }

export const scenes: Scene[] = [
  { id: 'arrival', from: 0, to: 0.17, reveal: 'title' },
  { id: 'kitchen', from: 0.24, to: 0.5, label: 'The kitchen', line: 'Breakfast where the morning comes in.', reveal: 'mask' },
  { id: 'hall', from: 0.57, to: 0.73, label: 'The hall', line: 'One long wall to hold the light.', reveal: 'wipe' },
  { id: 'stair', from: 0.79, to: 0.95, label: 'The stair', line: 'Down to the sea rooms.', reveal: 'track' },
]
