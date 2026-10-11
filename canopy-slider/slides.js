// Slide content + scene definitions. All copy and artwork are placeholders —
// swap text freely; scenes are procedurally drawn (see scenes.js).
// Layer fields: depth (parallax strength), res (render scale), blur (px),
// ops (static painters) or dyn (animated layer type).

const LEAVES = ['#284d17', '#3c6e1f', '#5b9a2c', '#86c13c', '#b5dc5a'];

export const SLIDES = [
  {
    id: 'dawn',
    eyebrow: 'First light',
    title: ['Wake with', 'the forest'],
    text: 'A slow sunrise over the ridgeline. Move your cursor to look around, then scroll to wander deeper.',
    cta: 'Begin the journey',
    card: { title: 'First light', text: 'Mornings in the high forest start with mist. As the sun climbs, it burns off the valleys one ridge at a time, and the canopy wakes in layers.' },
    scene: [
      { depth: 0.08, res: 0.5, ops: [
        ['sky', { stops: [[0, '#e7d3b0'], [0.35, '#f2dcb0'], [0.6, '#d8c398'], [1, '#a5b386']] }],
        ['sun', { x: 0.3, y: 0.14, radius: 0.35, color: '#fff3d2' }],
        ['clouds', { count: 5, y: [0.05, 0.25], size: 0.18, color: '#fff6e6', alpha: 0.35, flat: 0.15 }],
      ] },
      { depth: 0.18, res: 0.6, blur: 2, ops: [
        ['ridge', { y: 0.44, amp: 0.14, color: '#a8a37e', top: '#cbbd98', freq: 1.2, canopy: 0.006 }],
        ['ridge', { y: 0.52, amp: 0.12, color: '#8b8f63', top: '#b1a87f', freq: 1.8, canopy: 0.008 }],
      ] },
      { dyn: 'mist', depth: 0.25, color: '#f6e8c9', alpha: 0.5, count: 6, y: [0.42, 0.62], size: [0.3, 0.6], speed: 0.004 },
      { depth: 0.35, res: 0.75, ops: [
        ['ridge', { y: 0.64, amp: 0.12, color: '#4f6b35', top: '#808d59', freq: 1.6, canopy: 0.012 }],
        ['ridge', { y: 0.76, amp: 0.1, color: '#2f5a23', top: '#4f7a33', freq: 2.2, canopy: 0.016 }],
      ] },
      { dyn: 'mist', depth: 0.45, color: '#eef3d2', alpha: 0.35, count: 6, y: [0.66, 0.86], size: [0.3, 0.5], speed: 0.006 },
      { depth: 0.6, ops: [['foliage', { y: 0.84, spread: 0.3, count: 500, size: 0.05, colors: ['#1f4a18', '#2c6020', '#3f7a28', '#5d9a35'] }]] },
      { depth: 0.9, ops: [
        ['branch', { p: [[-0.06, 0.5], [0.3, 0.34], [0.6, 0.36], [1.08, 0.12]], width: 0.11, density: 1.3, moss: 10, leaves: LEAVES }],
        ['branch', { p: [[-0.06, 0.78], [0.35, 0.66], [0.7, 0.74], [1.08, 0.58]], width: 0.07, density: 0.9, moss: 6, leaves: LEAVES }],
      ] },
      { dyn: 'particles', depth: 1, type: 'mote', count: 60, color: '#fff3c4' },
      { depth: 1.4, res: 0.4, blur: 14, ops: [['bigLeaves', { items: [[-0.03, 1.02, 0.5, -0.9], [0.07, 1.06, 0.4, -1.3], [1.03, 0.98, 0.45, -2.3]], colors: ['#1d3a14', '#2e5a1e'] }]] },
    ],
  },
  {
    id: 'canopy',
    eyebrow: 'Under the canopy',
    title: ['Light becomes', 'leaf'],
    text: 'Beneath the canopy, every shade of green is sunlight that has been caught, folded and kept.',
    cta: 'Read about the canopy',
    card: { title: 'The green ceiling', text: 'Only a sliver of the light that hits the top of a rainforest reaches the floor. Everything in between is a competition for it — and the reason the canopy is so dense.' },
    hotspots: [{ at: [0.6, 0.38], depth: 0.8, title: 'Hanging gardens', text: 'Mosses and ferns grow directly on branches, catching water from the air. A single limb can carry a whole garden.' }],
    scene: [
      { depth: 0.08, res: 0.5, ops: [
        ['sky', { stops: [[0, '#cfe0b4'], [0.5, '#a9c58c'], [1, '#6f9a55']] }],
        ['glow', { x: 0.6, y: 0.08, radius: 0.6, color: '#f4f7d8', alpha: 0.8 }],
      ] },
      { depth: 0.18, res: 0.5, blur: 6, ops: [
        ['trunks', { count: 9, width: [0.015, 0.03], color: '#93ab7b', moss: '#afc690' }],
        ['branch', { p: [[-0.1, 0.18], [0.3, 0.1], [0.7, 0.22], [1.1, 0.08]], width: 0.05, density: 0.6, moss: 0, bark: ['#7f8f68', '#8f9f75', '#a0ae86'], leaves: ['#8fb070', '#9fbe7a', '#b2cc8a'] }],
      ] },
      { dyn: 'rays', depth: 0.22, color: '#fffbe0', count: 5, alpha: 0.2 },
      { dyn: 'mist', depth: 0.3, color: '#e3efd0', alpha: 0.4, count: 7, y: [0.2, 0.9], size: [0.3, 0.6] },
      { depth: 0.45, res: 0.75, blur: 2, ops: [
        ['branch', { p: [[1.1, 0.8], [0.7, 0.62], [0.3, 0.86], [-0.1, 0.72]], width: 0.08, density: 1, moss: 6, bark: ['#3e3a26', '#5a5136', '#6e6648'], leaves: ['#4d7a2c', '#5f8f35', '#79a845'] }],
      ] },
      { dyn: 'mist', depth: 0.55, color: '#e8f2d8', alpha: 0.3, count: 5, y: [0.5, 1], size: [0.3, 0.5] },
      { depth: 0.8, ops: [
        ['branch', { p: [[-0.08, 0.3], [0.3, 0.14], [0.6, 0.34], [1.08, 0.2]], width: 0.12, density: 1.5, moss: 30, leaves: LEAVES }],
        ['branch', { p: [[-0.08, 0.64], [0.3, 0.54], [0.7, 0.6], [1.08, 0.78]], width: 0.09, density: 1.1, moss: 12, leaves: LEAVES }],
      ] },
      { dyn: 'particles', depth: 1, type: 'mote', count: 80, color: '#f8ffd8' },
      { depth: 1.3, res: 0.4, blur: 12, ops: [['foliage', { y: 0.92, spread: 0.12, count: 120, size: 0.12, colors: ['#3a6a26', '#4f8a30'] }]] },
    ],
  },
  {
    id: 'river',
    eyebrow: 'From above',
    title: ['Every river', 'remembers rain'],
    text: 'From the air, the forest breathes in clouds and breathes out rivers — one long, slow cycle.',
    cta: 'Follow the water',
    card: { title: 'Flying rivers', text: 'Trees pull water from the soil and release it as vapour. Those clouds drift inland and fall again as rain, sometimes thousands of kilometres away.' },
    scene: [
      { depth: 0.15, res: 0.7, ops: [['aerial', {}]] },
      { dyn: 'mist', depth: 0.3, color: '#ffffff', alpha: 0.3, count: 8, y: [0.1, 0.9], size: [0.25, 0.5], speed: 0.006 },
      { depth: 0.5, res: 0.5, blur: 4, ops: [['clouds', { count: 6, y: [0.05, 0.4], size: 0.2, alpha: 0.85, flat: 0.6 }]] },
      { depth: 1.1, res: 0.4, blur: 10, ops: [
        ['clouds', { count: 3, x: [-0.15, 0.2], y: [0, 1], size: 0.3, alpha: 0.9, flat: 0.8 }],
        ['clouds', { count: 3, x: [0.82, 1.15], y: [0, 1], size: 0.3, alpha: 0.9, flat: 0.8 }],
      ] },
    ],
  },
  {
    id: 'fireflies',
    eyebrow: 'After dark',
    title: ['The night keeps', 'its own light'],
    text: 'When the sun goes, the forest switches on. Thousands of small lamps drift over the water.',
    cta: 'Listen to the night',
    card: { title: 'Living lanterns', text: 'Fireflies flash in patterns to find each other. In some places whole groups fall into rhythm and blink together.' },
    scene: [
      { depth: 0.08, res: 0.5, ops: [
        ['sky', { stops: [[0, '#06121f'], [0.5, '#0d2a3a'], [0.72, '#164a4f'], [1, '#0a1f22']] }],
        ['stars', { count: 260 }],
        ['sun', { x: 0.72, y: 0.18, radius: 0.25, color: '#dff3ff', disc: 0.022 }],
      ] },
      { depth: 0.22, res: 0.6, ops: [['ridge', { y: 0.62, amp: 0.15, color: '#0c2a2c', top: '#16403f', freq: 1.3, canopy: 0.008 }]] },
      { depth: 0.35, res: 0.7, ops: [
        ['ridge', { y: 0.67, amp: 0.08, color: '#071b1c', freq: 2.4, canopy: 0.012 }],
        ['water', { y: 0.67, top: '#0f3a40', bottom: '#04141a', shimmer: '#8fd3e0', lines: 140, reflect: { x: 0.725, width: 0.06, color: '#e6f7ff' } }],
      ] },
      { dyn: 'mist', depth: 0.4, color: '#7fb9b8', alpha: 0.16, count: 6, y: [0.55, 0.75], size: [0.3, 0.5] },
      { dyn: 'particles', depth: 0.6, type: 'firefly', count: 45, color: '#e8ff8a', size: 1, area: [0, 0.4, 1, 1] },
      { depth: 1, res: 0.8, ops: [['reeds', { count: 140, color: '#020a0b', height: [0.1, 0.36] }]] },
      { dyn: 'particles', depth: 1.2, type: 'firefly', count: 12, color: '#f4ffb0', size: 2.2, area: [0, 0.2, 1, 1] },
      { depth: 1.45, res: 0.4, blur: 12, ops: [
        ['reeds', { count: 12, color: '#01070a', height: [0.45, 0.85], x: [-0.05, 0.12] }],
        ['reeds', { count: 12, color: '#01070a', height: [0.45, 0.85], x: [0.88, 1.05] }],
      ] },
    ],
  },
  {
    id: 'lagoon',
    eyebrow: 'Golden hour',
    title: ['Gold at the', "water's edge"],
    text: 'The lagoon holds the last of the day. Birds head home low over the water, and the palms go dark first.',
    cta: 'Stay for sunset',
    card: { title: 'Mangrove edges', text: 'Where forest meets salt water, mangroves knit the coast together, sheltering young fish and slowing the tide.' },
    scene: [
      { depth: 0.08, res: 0.5, ops: [
        ['sky', { stops: [[0, '#3b2a5a'], [0.35, '#c0507a'], [0.58, '#f39a6b'], [0.68, '#ffd39a'], [1, '#ffd39a']] }],
        ['sun', { x: 0.5, y: 0.62, radius: 0.45, color: '#fff0c8', disc: 0.055 }],
        ['clouds', { count: 6, y: [0.15, 0.42], size: 0.25, color: '#ff9fa8', alpha: 0.35, flat: 0.12 }],
      ] },
      { depth: 0.22, res: 0.6, ops: [
        ['ridge', { y: 0.67, amp: 0.05, color: '#4a2a4a', top: '#7a3f5f', freq: 1.2, canopy: 0.005 }],
        ['water', { y: 0.67, top: '#f2a77c', bottom: '#4a2550', shimmer: '#ffe2b8', lines: 220, reflect: { x: 0.5, width: 0.12, color: '#fff2cf' } }],
      ] },
      { dyn: 'birds', depth: 0.4, count: 9, color: '#2a1530', y: [0.22, 0.5], size: 9 },
      { depth: 0.6, res: 0.8, ops: [
        ['island', { x: [-0.12, 0.4], y: 0.71, h: 0.08, color: '#1d0f22' }],
        ['palms', { items: [[0.05, 0.68, 0.34], [0.14, 0.67, 0.27], [0.25, 0.69, 0.2]], color: '#1a0c1f' }],
        ['island', { x: [0.72, 1.12], y: 0.7, h: 0.05, color: '#2a1530' }],
        ['palms', { items: [[0.88, 0.68, 0.18]], color: '#26122c' }],
      ] },
      { dyn: 'particles', depth: 0.9, type: 'mote', count: 40, color: '#ffd9a0' },
      { depth: 1.35, res: 0.4, blur: 14, ops: [['reeds', { count: 26, color: '#140912', height: [0.25, 0.55], x: [0.8, 1.1] }]] },
    ],
  },
  {
    id: 'frog',
    eyebrow: 'Cloud forest',
    title: ['Stillness is', 'a language'],
    text: 'Look long enough and the forest looks back. Most of it is watching, perfectly still, from just out of focus.',
    cta: 'Look closer',
    card: { title: 'The art of waiting', text: 'Many forest animals rely on staying motionless. Camouflage only works if you trust it — and hold still.' },
    hotspots: [
      { at: [0.79, 0.71], portraitAt: [0.64, 0.59], depth: 0.85, title: 'Red-eyed watcher', text: 'Tree frogs sleep through the day pressed flat against leaves, eyes closed, green on green. At dusk the eyes open — and so does the hunt.' },
      { at: [0.22, 0.34], depth: 0.6, title: 'Living towers', text: 'Each trunk is its own ecosystem: moss, orchids, lichens and insects stacked from root to crown.' },
    ],
    scene: [
      { depth: 0.08, res: 0.5, ops: [
        ['sky', { stops: [[0, '#eef3e6'], [0.5, '#d6e2c8'], [1, '#9db88a']] }],
        ['glow', { x: 0.5, y: 0.2, radius: 0.6, color: '#ffffff', alpha: 0.8 }],
      ] },
      { depth: 0.14, res: 0.4, blur: 8, ops: [['trunks', { count: 14, width: [0.006, 0.014], color: '#b9c8a8', moss: '#c4d3ae', vines: 6 }]] },
      { dyn: 'mist', depth: 0.2, color: '#f4f8ee', alpha: 0.6, count: 8, y: [0.2, 0.9], size: [0.3, 0.6] },
      { depth: 0.3, res: 0.6, blur: 3, ops: [['trunks', { count: 8, width: [0.012, 0.025], color: '#8da27a', moss: '#9db87a', vines: 5 }]] },
      { dyn: 'mist', depth: 0.4, color: '#f0f5e8', alpha: 0.45, count: 6, y: [0.3, 1], size: [0.3, 0.5] },
      { depth: 0.6, res: 0.85, ops: [
        ['trunks', { count: 5, width: [0.025, 0.05], color: '#45583a', moss: '#6f9a3a', mossAlpha: 0.7, vines: 4 }],
        ['foliage', { y: 0.88, spread: 0.2, count: 300, size: 0.05, colors: ['#3d6a2a', '#4f8236', '#6a9a45', '#86b35a'] }],
      ] },
      { depth: 0.85, ops: [['frog', { x: 0.75, y: 0.72, s: 0.06, portrait: { x: 0.55, y: 0.6, s: 0.045 } }]] },
      { dyn: 'particles', depth: 1, type: 'mote', count: 50, color: '#ffffff' },
      { depth: 1.5, res: 0.35, blur: 16, ops: [
        ['stalk', { x: 0.93, w: 0.07, color: '#3f8a2a' }],
        ['bigLeaves', { items: [[-0.03, 0.96, 0.45, -0.7]], colors: ['#2e6a22', '#3f8a2a'] }],
      ] },
    ],
  },
];
