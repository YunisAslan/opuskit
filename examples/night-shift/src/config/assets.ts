// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a file = dropping a new one at the same path, or editing one line here.
// status: 'have' = final; 'temporary' = shows a dev-only badge until replaced (see assets/manifest.json).
type Status = 'have' | 'temporary'
type Asset = { src: string; alt: string; width: number; height: number; status: Status; usage: string; poster?: string }

export const assets = {
  monitorVideo: { src: '/media/monitor.mp4', poster: '/media/monitor-poster.jpg', alt: '', width: 1280, height: 720, status: 'have', usage: 'Hero console — the shot on the grading monitor' },
  heroPoster: { src: '/media/console-poster.jpg', alt: 'A grading console in a slate-grey room: a monitor showing a golden-hour shot, a waveform and a vectorscope beside it, three colour wheels on the desk.', width: 1920, height: 1080, status: 'have', usage: 'Hero poster — loading state, slow connections' },
  heroPosterMobile: { src: '/media/console-poster-mobile.jpg', alt: 'A grading console: a monitor showing a golden-hour shot above three colour wheels and two scopes.', width: 1080, height: 1350, status: 'have', usage: 'Hero poster — phones and reduced motion' },

  log1: { src: '/media/log-1.jpg', alt: 'A night street under an overpass, flat and grey as the camera recorded it.', width: 2400, height: 1350, status: 'have', usage: 'Before / after — night street, log' },
  grade1: { src: '/media/grade-1.jpg', alt: 'The same night street graded: teal overpass, warm sodium kerb, deep blacks.', width: 2400, height: 1350, status: 'have', usage: 'Before / after — night street, grade' },
  log2: { src: '/media/log-2.jpg', alt: 'A woman under a tree in a stubble field at golden hour, flat and washed out as the camera recorded it.', width: 1920, height: 1080, status: 'have', usage: 'Before / after — golden-hour portrait, log' },
  grade2: { src: '/media/grade-2.jpg', alt: 'The same golden-hour portrait graded: warm skin, a held sky, a rich field.', width: 1920, height: 1080, status: 'have', usage: 'Before / after — golden-hour portrait, grade' },
  log3: { src: '/media/log-3.jpg', alt: 'A dim room with a caged bulb and a window, flat and muddy as the camera recorded it.', width: 1920, height: 1080, status: 'have', usage: 'Before / after — mixed-light room, log' },
  grade3: { src: '/media/grade-3.jpg', alt: 'The same room graded: warm lamp light, green window spill kept apart, readable shadows.', width: 1920, height: 1080, status: 'have', usage: 'Before / after — mixed-light room, grade' },

  instructor: { src: '/media/instructor.jpg', alt: 'Hanne Vik, the colourist who teaches Night Shift, lit in teal and green.', width: 1590, height: 2400, status: 'have', usage: 'Instructor page, About on Home' },
  student1: { src: '/media/student-1.jpg', alt: 'Tove Aasen under red light.', width: 1600, height: 2400, status: 'have', usage: 'Testimonial portrait' },
  student2: { src: '/media/student-2.jpg', alt: 'Clara Mendes in a teal doorway.', width: 1590, height: 2400, status: 'have', usage: 'Testimonial portrait' },
  suite: { src: '/media/suite.jpg', alt: 'A grading suite at night: a colourist in silhouette at a monitor showing a waveform, light through the blinds.', width: 2400, height: 1213, status: 'have', usage: 'Intro, Curriculum week 4' },
  scope: { src: '/media/scope.jpg', alt: 'A colour curve over a spectrum on a scope, close up.', width: 2400, height: 1350, status: 'have', usage: 'Intro, Curriculum week 2' },
  set1: { src: '/media/set-1.jpg', alt: 'A film crew in a warehouse around a seated actor, monitors and lights.', width: 2400, height: 1600, status: 'have', usage: 'Curriculum week 1 — where the footage comes from' },
  set2: { src: '/media/set-2.jpg', alt: 'A night shoot: a crew on a dolly track around a lit set.', width: 2400, height: 1600, status: 'have', usage: 'Curriculum week 7' },
  set3: { src: '/media/set-3.jpg', alt: 'Silhouettes and a cinema camera against red haze.', width: 2400, height: 1600, status: 'have', usage: 'Curriculum week 8' },
} as const satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
