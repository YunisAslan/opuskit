// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
// status "temporary": stand-in cropped from the uploaded sky texture — swap for real renders (see assets/manifest.json).
export const assets = {
  "3dModelOrScene": { src: "/media/3dModelOrScene.glb", alt: "", status: "have", usage: "Hero scene" },
  preRenderedPoster: { src: "/media/preRenderedPoster.jpg", width: 1516, height: 927, alt: "", status: "have", usage: "Loading state, mobile & reduced motion fallback" },
  gallery01: { src: "/media/sky-01-sunline.jpg", width: 1000, height: 500, alt: "Low sun sitting on a hard horizon line", status: "temporary", usage: "Experiment gallery" },
  gallery02: { src: "/media/sky-02-cumulus.jpg", width: 600, height: 800, alt: "A single cumulus cloud lit from the right", status: "temporary", usage: "Experiment gallery" },
  gallery03: { src: "/media/sky-03-zenith.jpg", width: 600, height: 600, alt: "Flat deep blue straight overhead", status: "temporary", usage: "Experiment gallery" },
  gallery04: { src: "/media/sky-04-horizon.jpg", width: 2400, height: 250, alt: "A thin panoramic strip of horizon", status: "temporary", usage: "Experiment gallery" },
  gallery05: { src: "/media/sky-05-underside.jpg", width: 800, height: 600, alt: "Violet haze below the horizon", status: "temporary", usage: "Experiment gallery" },
  gallery06: { src: "/media/sky-06-edge.jpg", width: 596, height: 600, alt: "The edge of a cloud bank", status: "temporary", usage: "Experiment gallery" },
  gallery07: { src: "/media/sky-07-flare.jpg", width: 300, height: 400, alt: "Lens flare streaking down from the sun", status: "temporary", usage: "Experiment gallery" },
  gallery08: { src: "/media/sky-08-mass.jpg", width: 1250, height: 650, alt: "A wide mass of cloud over pale blue", status: "temporary", usage: "Experiment gallery" },
  editorial: { src: "/media/sky-editorial.jpg", width: 1600, height: 900, alt: "The sun breaking the horizon between two cloud banks", status: "temporary", usage: "Editorial story" },
  portrait: { src: "/media/sky-portrait.jpg", width: 600, height: 800, alt: "Studio portrait placeholder", status: "temporary", usage: "About portrait" },
} as const

export type AssetKey = keyof typeof assets
