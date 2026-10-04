// Every word on the site that isn't layout. Dates are Oslo dates; sessions run Tue + Thu 19:00–21:30 Oslo time.
import type { AssetKey } from '@/config/assets'

export const site = {
  name: 'Night Shift',
  email: 'hello@nightshiftgrading.com',
  city: 'Oslo',
  timeZone: 'Europe/Oslo',
  session: { days: [2, 4], start: '19:00', end: '21:30' }, // 2 = Tuesday, 4 = Thursday
  seatsPerCohort: 12,
  price: '€1,450',
}

export type Cohort = { n: string; start: string; end: string; seatsLeft: number }
// start is always a Tuesday, end the Thursday of week 8.
export const cohorts: Cohort[] = [
  { n: '07', start: '2026-10-27', end: '2026-12-17', seatsLeft: 5 },
  { n: '08', start: '2027-02-02', end: '2027-03-25', seatsLeft: 9 },
  { n: '09', start: '2027-05-04', end: '2027-06-24', seatsLeft: 12 },
]

export const pages = [
  { href: '/', label: 'Home' },
  { href: '/curriculum', label: 'Curriculum' },
  { href: '/enrol', label: 'Enrol' },
  { href: '/instructor', label: 'Instructor' },
  { href: '/faq', label: 'FAQ' },
] as const

export type Module = { n: string; key: string; title: string; text: string; lessons: string[]; shot: string; handIn: string; image: AssetKey }
export const modules: Module[] = [
  { n: '01', key: 'Ingest', title: 'Set up to see', image: 'set1',
    text: 'A grade is only as good as the screen you judge it on. You set up the room, the monitor and the signal path, then bring in the course footage the way a post house does.',
    lessons: ['Grey walls, low lamps and why they matter', 'Calibrating the monitor you already own', 'Colour management from camera log to display', 'Ingest and a project that holds together'],
    shot: 'Night street, camera log', handIn: 'A photo of your setup and its calibration report' },
  { n: '02', key: 'Scopes', title: 'Read the signal', image: 'scope',
    text: 'Before you touch a wheel, you learn to read what the image is doing: where the light sits, which channel runs hot, where skin falls.',
    lessons: ['Waveform: levels and exposure', 'RGB parade: finding the cast', 'Vectorscope: hue, saturation and the skin line', 'False colour on set and in the suite'],
    shot: 'Night street, camera log', handIn: 'Scope readings of three frames, with notes and no grading' },
  { n: '03', key: 'Balance', title: 'Lift, gamma, gain', image: 'log1',
    text: 'Primary correction on the night street: set the black and white points, take the sodium cast out of the shadows, and match two angles of the same corner.',
    lessons: ['What each wheel actually moves', 'Black point, white point, then everything else', 'Neutralising mixed street light', 'Matching shot to shot on the scopes'],
    shot: 'Night street, two angles', handIn: 'A balanced, matched pair of shots' },
  { n: '04', key: 'Contrast', title: 'Curves and density', image: 'suite',
    text: 'Contrast decides where the eye goes. You build it with curves rather than saturation, and keep the night dark without crushing it.',
    lessons: ['Custom curves, and the S you shouldn’t draw', 'Density without a LUT', 'Highlight roll-off on practical lights', 'Noise, and when to stop pushing'],
    shot: 'Night street, graded', handIn: 'The night street, finished, with your node tree' },
  { n: '05', key: 'Skin', title: 'Faces first', image: 'log2',
    text: 'The golden-hour portrait. Skin of every complexion sits on one line of the vectorscope; you learn to put it there and still keep the backlit sky.',
    lessons: ['The skin line and how to read it', 'Qualifying skin without the plastic look', 'Holding a sky behind a backlit face', 'Warmth that belongs to the light'],
    shot: 'Golden-hour portrait', handIn: 'The portrait, graded, with skin on the vectorscope before and after' },
  { n: '06', key: 'Mixed light', title: 'Two colours of light', image: 'log3',
    text: 'A dim room lit by a caged bulb and a window. You separate the sources with windows and keys, then decide which one the scene belongs to.',
    lessons: ['Power windows and tracking', 'Hue-versus-hue and hue-versus-sat curves', 'Keys that survive movement', 'Choosing what reads as warm'],
    shot: 'Room, lamp and window', handIn: 'The room graded two ways, with a note on which is right' },
  { n: '07', key: 'Look', title: 'One look, one scene', image: 'set2',
    text: 'You take a scene from the course library, shot on set for Night Shift, and build a look that holds across every angle. A guest director sits in as the client.',
    lessons: ['Building a look from references', 'Shared nodes and groups', 'A director in the room', 'Taking notes without losing the grade'],
    shot: 'A library scene of your choice', handIn: 'A look reference and the first pass of your scene' },
  { n: '08', key: 'Deliver', title: 'Finish and hand over', image: 'set3',
    text: 'The last week is the last week of every job: final notes, quality control and files a distributor will accept. The cohort screens every scene on Thursday.',
    lessons: ['Final notes and trims', 'QC: legal levels, flicker, dropped frames', 'Deliverables: master, web, archive', 'The screening'],
    shot: 'Your library scene', handIn: 'The finished scene delivered to spec, with grade notes' },
]

export const weekRun = [
  { name: 'Tuesday session', text: 'The week’s technique, taught live on the week’s shot. My grade is on screen the whole time; ask anything.', duration: 'Tue 19:00–21:30' },
  { name: 'Your grade', text: 'Grade the shot on your own machine. Footage, references and a node template are in the course folder.', duration: '3–5 hours' },
  { name: 'Thursday review', text: 'Your grade on the big screen, with notes from me and the cohort. Twelve people means every grade is reviewed.', duration: 'Thu 19:00–21:30' },
  { name: 'Hand in', text: 'Export and upload by Sunday night. Written notes come back to you by Tuesday.', duration: 'Sun 23:59' },
]

export const finalScene = [
  { name: 'Pick a scene', text: 'Choose one of six scenes from the course library, shot on set with camera originals in log.', duration: 'Week 6' },
  { name: 'Balance and match', text: 'Conform the cut and bring every angle to one neutral starting point.', duration: 'Week 7, Tue' },
  { name: 'Look with a director', text: 'Present a look to the guest director and take their notes, as on a paid job.', duration: 'Week 7, Thu' },
  { name: 'Deliver and screen', text: 'Final notes, QC and a delivered master. The cohort watches every scene together.', duration: 'Week 8' },
]

export type Shot = { key: string; title: string; before: AssetKey; after: AssetKey; facts: { label: string; value: string }[]; paragraphs: string[] }
export const shots: Shot[] = [
  { key: 'Night street', title: 'Night street', before: 'log1', after: 'grade1',
    facts: [{ label: 'Weeks', value: '1 to 4' }, { label: 'Light', value: 'Sodium and LED' }, { label: 'Hand in', value: 'Balanced and matched' }],
    paragraphs: [
      'Sodium street lamps, teal LEDs under the overpass and headlights, all in one frame. In log the street is one muddy grey.',
      'You set black and white points on the waveform, pull the orange out of the shadows without killing the lamps, and let the overpass keep its colour.',
    ] },
  { key: 'Golden hour', title: 'Golden-hour portrait', before: 'log2', after: 'grade2',
    facts: [{ label: 'Week', value: '5' }, { label: 'Light', value: 'Low sun, backlight' }, { label: 'Hand in', value: 'Skin on the line' }],
    paragraphs: [
      'The sun sits behind her, so the face falls two stops under the field and the sky is close to clipping.',
      'Gamma lifts the face, a soft window holds the sky, and a skin key puts her complexion on the vectorscope’s skin line instead of guessing by eye.',
    ] },
  { key: 'Mixed light', title: 'Room, lamp and window', before: 'log3', after: 'grade3',
    facts: [{ label: 'Week', value: '6' }, { label: 'Light', value: 'Tungsten and window' }, { label: 'Hand in', value: 'Graded two ways' }],
    paragraphs: [
      'A caged bulb, green spill from a window and an old TV. Every source pulls the room a different way.',
      'You separate the sources with windows and hue curves, decide that the lamp is the room’s light, and let the window stay cold behind him.',
    ] },
]

export type Quote = { quote: string; name: string; role: string; image?: AssetKey }
export const quotes = {
  home: [
    { quote: 'I’d been fixing everything with saturation. Week two taught me to read the vectorscope first, and my grades got quieter and better.', name: 'Tove Aasen', role: 'assistant editor, cohort 06', image: 'student1' },
    { quote: 'The Thursday reviews were the course. Hearing why a grade works, on your own shot, is how it sticks.', name: 'Clara Mendes', role: 'camera operator, cohort 06', image: 'student2' },
    { quote: 'I graded my first paid short three weeks after the course ended. The director never asked which LUT I used.', name: 'Daniel Fisk', role: 'editor, cohort 05' },
    { quote: 'Mixed light used to scare me. Now it’s the part of a scene I look forward to.', name: 'Amir Haddad', role: 'documentary director, cohort 05' },
  ],
  enrol: [
    { quote: 'Two evenings a week and about four hours of grading. I kept a full-time job and didn’t miss a hand-in.', name: 'Clara Mendes', role: 'camera operator, cohort 06', image: 'student2' },
    { quote: 'The notes come back written, every week, by Tuesday. I still reread mine before a job.', name: 'Tove Aasen', role: 'assistant editor, cohort 06', image: 'student1' },
    { quote: 'I paid in three instalments. Calibrating my own monitor in week one changed how I saw everything after it.', name: 'Rasmus Holm', role: 'wedding filmmaker, cohort 06' },
  ],
  instructor: [
    { quote: 'Hanne grades like an editor. She knows which shot the scene hangs on and spends her time there.', name: 'Per Lund', role: 'director, The Salt Year' },
    { quote: 'She’ll tell you when a note is wrong, and she’ll show you why on the scope.', name: 'Ingrid Sæther', role: 'producer, Northern Line' },
    { quote: 'Four campaigns together, and the skin never looks graded.', name: 'Mats Ekberg', role: 'creative director, Fjellbris' },
    { quote: 'She remembered my shot from week two in week eight, down to the node.', name: 'Tove Aasen', role: 'assistant editor, cohort 06', image: 'student1' },
  ],
} satisfies Record<string, Quote[]>

export const credits = [
  { year: '2025', title: 'The Salt Year', kind: 'Feature', role: 'Colourist' },
  { year: '2023–25', title: 'Northern Line, seasons 1–2', kind: 'Series, 16 episodes', role: 'Lead colourist' },
  { year: '2024', title: 'Low Tide Hotel', kind: 'Feature', role: 'Colourist' },
  { year: '2024', title: 'Fjellbris, Winter', kind: 'Commercial', role: 'Colourist' },
  { year: '2022', title: 'Weatherproof', kind: 'Feature', role: 'Colourist' },
  { year: '2021', title: 'The Quiet Floor', kind: 'Series, 8 episodes', role: 'Colourist' },
  { year: '2021', title: 'Nordvik Rail, Night Train', kind: 'Commercial', role: 'Colourist' },
  { year: '2019', title: 'A House in Glass', kind: 'Feature', role: 'Colourist' },
  { year: '2014', title: 'Kestrel', kind: 'Feature', role: 'Assistant colourist' },
]

export type Plan = { name: string; full: string; split?: string; line: string; features: string[]; action: string; recommended?: boolean }
export const plans: Plan[] = [
  { name: 'Seat', full: '€1,450', split: '€495', line: 'The full course, live.', recommended: true, action: 'Reserve a seat',
    features: ['16 live sessions, Tuesday and Thursday', 'Written notes on every hand-in', 'The course footage library, yours to keep', 'Recordings for twelve months', 'Certificate on seven hand-ins'] },
  { name: 'Seat and 1:1', full: '€1,850', split: '€630', line: 'The course, plus time on your own footage.', action: 'Reserve with 1:1',
    features: ['Everything in Seat', 'Three 45-minute 1:1 sessions', 'A review of your reel in week 8'] },
  { name: 'Recordings', full: '€480', line: 'Watch the sessions without a seat.', action: 'Buy recordings',
    features: ['All 16 recorded sessions', 'The course footage library', 'No live review and no notes'] },
]

export type Faq = { q: string; a: string }
export const faqs: Record<'start' | 'course' | 'money', Faq[]> = {
  start: [
    { q: 'Do I need to know colour grading already?', a: 'No, but you need to know editing. You should be at home in an editing app and know what a timeline, a clip and an export are. We start from how a camera records light.' },
    { q: 'Which software do we use?', a: 'Sessions are taught in DaVinci Resolve; its free version covers everything in the eight weeks. What you learn carries over to any grading tool with wheels, curves and scopes.' },
    { q: 'What computer and monitor do I need?', a: 'A computer from the last five years with a dedicated or Apple silicon GPU, and the best screen you have. Week one shows you how to calibrate it. A grading monitor is not required.' },
    { q: 'What time are the sessions?', a: 'Tuesday and Thursday, 19:00 to 21:30 Oslo time. That is 18:00 in London and 13:00 in New York for most of the year.' },
    { q: 'How much time does it take each week?', a: 'Five hours live, plus three to five hours grading the week’s shot on your own.' },
    { q: 'What if I miss a session?', a: 'Every session is recorded and online the same night. Your hand-in still gets written notes, and you can bring questions to the next live session.' },
  ],
  course: [
    { q: 'Where does the footage come from?', a: 'From three short films and six scenes shot on set for the course, all camera originals in log. You keep the files and can use your grades in a reel.' },
    { q: 'Can I bring my own footage?', a: 'Yes, in week 7 and in 1:1 sessions. Weeks 1 to 6 use the course shots so the cohort can compare grades on the same frames.' },
    { q: 'What does “log” mean?', a: 'A camera recording that keeps as much of the light’s range as it can, and looks flat and grey until it is graded. The “before” frames on this site are log; the “after” frames are the grade.' },
    { q: 'Is HDR covered?', a: 'Week 8 covers an HDR deliverable briefly. The course grades for standard dynamic range (Rec. 709), which is still most of the paid work.' },
    { q: 'Do I get a certificate?', a: 'Yes, when you hand in seven of the eight weeks. More useful is the finished library scene you leave with.' },
  ],
  money: [
    { q: 'Can I pay in instalments?', a: 'Yes: three monthly payments, the first when you enrol. In total it is €35 more than paying in full for a Seat, €40 more for Seat and 1:1.' },
    { q: 'What if I can’t continue?', a: 'Full refund until the second Tuesday of the course. After that, you can move once to the next cohort at no cost.' },
    { q: 'Can my company pay?', a: 'Yes. Add the company name in the form and you’ll get a VAT invoice. Many students have had the course paid as training.' },
    { q: 'Is there a discount?', a: 'Students referred by a past student get 15% off with their six-character referral code. If money is the only thing stopping you, write to me.' },
    { q: 'How many people are in a cohort?', a: 'Twelve. That is small enough for every grade to be reviewed live each Thursday.' },
  ],
}
