// Asset reference layer. Components never hardcode media paths — they ask for a key (<MediaAsset id="hero" />).
// Every photo is the owner's own (sources in media-src/SOURCES.md). Each key has the original JPEG (≤ 2400px) plus
// WebP copies at 800 and 1600px wide (`{name}-800.webp`, `{name}-1600.webp`) for srcset.
// Replacing a photo = dropping a new file at the same path (and regenerating the two WebP copies) or editing one line here.
export const assets = {
  hero: { src: '/media/hero.jpg', width: 1600, height: 2400, alt: 'A practitioner’s hands working on a patient’s lower back on pale linen, in soft daylight', status: 'have' },
  step1: { src: '/media/step-1.jpg', width: 2400, height: 1600, alt: 'A bright treatment room: the practitioner kneels beside a patient lying on a linen mat, talking before the session starts', status: 'have' },
  step2: { src: '/media/step-2.jpg', width: 2400, height: 1600, alt: 'Close-up of hands treating a patient’s arm and shoulder as she lies relaxed with her eyes closed', status: 'have' },
  step3: { src: '/media/step-3.jpg', width: 2400, height: 1600, alt: 'A woman kneeling on a mat at home, stretching back into a slow back-bend in window light', status: 'have' },
  team1: { src: '/media/team-1.jpg', width: 1800, height: 2400, alt: 'Ines Calder, arms folded, against a plain white wall', status: 'have' },
  team2: { src: '/media/team-2.jpg', width: 1920, height: 2400, alt: 'Tom Reyes in a white shirt against a white brick wall', status: 'have' },
  team3: { src: '/media/team-3.jpg', width: 1600, height: 2400, alt: 'Ruth Hale, long silver hair, laughing and looking down', status: 'have' },
  location: { src: '/media/location.jpg', width: 2400, height: 1504, alt: 'The studio entrance: a stone porch, dark wooden double doors and a potted yucca on each side', status: 'have' },
} as const

export type AssetKey = keyof typeof assets
