// Scene map for the Home film (public/media/scrubReadyEncode.mp4, 8.0 s, 24 fps, 192 frames).
// Written from watching the film, frame by frame. Times are fractions of the film (0 → 1 = 0 s → 8 s), and the scroll
// maps 1:1 onto them, so each message arrives with its own picture. If the film is replaced, watch the new one and
// move each `from` / `to` (and the words) to what is on screen — no other code changes.
//
//   0.0–2.0 s  Lamp     Close on the projector lens; the lamp burns, dust drifts through the beam.
//   2.0–4.5 s  Rows     The camera pulls back; red seat backs rise into frame, the projector sinks behind them.
//   4.5–6.0 s  Screen   The screen appears above the rows; one seat sits dead centre, facing it.
//   6.0–8.0 s  Light    The screen fills with white light; the whole room is revealed, waiting.

export type SceneReveal = 'rise' | 'wipe' | 'track' | 'lines'

export type Scene = {
  id: string
  /** The name shown beside the timecode while this scene plays. */
  name: string
  from: number
  to: number
  title: string[] // one entry per line — broken by hand
  titleMobile?: string[]
  line?: string
  action?: boolean
  /** How its words arrive — varied per scene (recipe: masked lines, short travel, a wipe, a tracking change). */
  reveal: SceneReveal
  /** Where the words sit, so they never cover what the scene is about. */
  place: 'bottom-left' | 'top-left' | 'bottom-right' | 'center'
}

export const film = { duration: 8, fps: 24 }

export const scenes: Scene[] = [
  {
    id: 'lamp', name: 'Lamp', from: 0, to: 0.25,
    title: ['The lamp is lit', 'every night'],
    titleMobile: ['The lamp', 'is lit every', 'night'],
    line: 'Ninth Row is a 120-seat arthouse cinema. New films and old, every night of the week.',
    action: true,
    reveal: 'lines', place: 'bottom-left', // the lens fills the upper middle; the lower left is quiet shadow
  },
  {
    id: 'rows', name: 'Rows', from: 0.3, to: 0.55,
    title: ['120 seats.', 'Count nine back.'],
    reveal: 'rise', place: 'top-left', // the seat backs rise from the bottom; the dark top is free
  },
  {
    id: 'screen', name: 'Screen', from: 0.6, to: 0.78,
    title: ['On Fridays', 'it runs late'],
    line: 'A late-night series, one film after 23:00.',
    reveal: 'wipe', place: 'bottom-right', // the centred seat and the screen above it stay clear
  },
  {
    id: 'light', name: 'Light', from: 0.84, to: 1,
    title: ['Tickets for', 'every screening'],
    action: true,
    reveal: 'track', place: 'bottom-left', // the white screen is the top; the dark rows below hold the words
  },
]
