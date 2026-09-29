// Scene map for the hero film (source: 14.3 s, cuts measured with ffmpeg scene detection).
// start / end are fractions of the video timeline — and so of the pinned scroll range.
// One message per scene, about what is on screen while it plays.
export type Scene = {
  id: string
  start: number
  end: number
  onScreen: string
  transition: "lines" | "wipe" | "track" | "rise"
  lines: string[]
  sub?: string
}

export const scenes: Scene[] = [
  {
    id: "match",
    start: 0,
    end: 0.18, // cut at 2.6 s
    onScreen: "Riders at full gallop, the embroidered pony, a polo shirt close up",
    transition: "lines",
    lines: ["Polo in Sheki.", "11–13 June 2027."],
    sub: "Three days of polo on the grass ground below the Caucasus. Seats by RSVP.",
  },
  {
    id: "field",
    start: 0.18,
    end: 0.42, // cut at 6.0 s
    onScreen: "Archive match footage, riders shoulder to shoulder, ponies in low sun",
    transition: "lines",
    lines: ["Eight chukkas a day.", "Seven minutes each."],
  },
  {
    id: "clubhouse",
    start: 0.42,
    end: 0.615, // cut at 8.8 s
    onScreen: "Library interior, an illustrated rider, a crowd around the founder",
    transition: "wipe",
    lines: ["Lunch in the clubhouse", "from 13:00."],
  },
  {
    id: "summer",
    start: 0.615,
    end: 0.825, // cut at 11.8 s
    onScreen: "Red cars on the coast road, a tennis player, sailors in sweaters",
    transition: "track",
    lines: ["Dress for a", "summer afternoon."],
  },
  {
    id: "final",
    start: 0.825,
    end: 1,
    onScreen: "A pencil drawing of a polo player, then black, end of film",
    transition: "rise",
    lines: ["The final.", "Sunday 13 June, 16:00."],
  },
]
