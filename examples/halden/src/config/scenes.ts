// Scene map for the opening film (recipe/media.md → Scroll storytelling).
// The film's timeline runs 0 → 1 over the pinned scroll; every scene is a stretch of that timeline with the one
// message that belongs to what is on screen. Messages never overlap: each leaves before the next arrives.
//
// The film (public/media/scrubReadyEncode.mp4 · mobileVideoEncode.mp4): 25.3 s, one continuous drone move at first
// light, watched frame by frame. Fractions below are seconds ÷ 25.3.
//    0 – 10 s   the sun low on the left, a sea of golden fog, dark wooded ridges breaking through on the horizon
//   10 – 12 s   the sun slides out of frame; the ridges close in
//   12 – 18 s   one dark ridge alone in front, the light behind it, blue sky, white fog below
//   18 – 21 s   the camera sinks; the ridge dissolves into the fog
//   21 – 25 s   nothing but soft white-grey
// If the film is ever re-cut, re-time start/end here (time ÷ duration). No other change is needed.

export type SceneMotion = 'title' | 'wipe' | 'scale' | 'lines'

export type Scene = {
  id: string
  /** Where the scene begins and ends, as a fraction of the film (and so of the pinned scroll). */
  start: number
  end: number
  /** What is on screen — for whoever re-times the map. */
  shows: string
  title: string
  /** Desktop and phone line breaks for the title, set by hand. */
  lines: string[]
  mobileLines?: string[]
  line: string
  /** How the message arrives — varied per scene. */
  motion: SceneMotion
}

export const scenes: Scene[] = [
  {
    id: 'first-light',
    start: 0,
    end: 0.44, // leaves 9.9–11.1 s, as the sun slides out of frame
    shows: '0–11 s: first light over a sea of fog, dark ridges coming through it.',
    title: 'Halden',
    lines: ['Halden'],
    line: 'First light over the fog. Heat, salt water and the long quiet in between.',
    motion: 'title',
  },
  {
    id: 'the-ridge',
    start: 0.48, // arrives 12.1–13.4 s, as the single ridge takes the frame
    end: 0.71, // leaves 16.7–18.0 s, before the camera sinks
    shows: '12–18 s: one dark ridge alone in front, the light behind it.',
    title: 'Heat',
    lines: ['Heat'],
    line: 'The sun behind the ridge, the fire behind the door. Wood-fired, every morning.',
    motion: 'wipe',
  },
  {
    id: 'into-the-fog',
    start: 0.75, // arrives 19.0–20.2 s, as the ridge dissolves; stays while the frame turns to fog and then to dark
    end: 1,
    shows: '19–25 s: the camera sinks into the fog until the frame is soft white-grey.',
    title: 'The long quiet',
    lines: ['The long', 'quiet'],
    line: 'Then the fog closes in, and there is nothing to do for a while.',
    motion: 'lines',
  },
]

/** How long a message takes to arrive and to leave, as a fraction of the timeline. */
export const SCENE_FADE = 0.05

/** The end of the film eases into the dark page instead of cutting from white fog to the ground colour: first the
 *  dark rises from the bottom edge (where the next section waits), then the whole frame settles into it. */
export const RELEASE = {
  rise: [0.8, 0.93] as const, // 20.2–23.5 s: once the ridge has gone, the dark climbs up from below
  settle: [0.85, 1] as const, // 21.5–25.3 s: the white-grey frame dims all the way to the page ground
}
