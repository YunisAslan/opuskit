// Asset reference layer: every image/video on the site is looked up by key here.
// Swap a file by changing its entry; components never hard-code media paths.
// `temp: true` marks stand-ins cut from the brand film (640×360 source) — replace
// with full-resolution photography when available. A badge shows them in dev.

export type ImageAsset = {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  /** object-position for crops (mobile portrait, 4:5 cards) */
  focus?: string;
  temp?: boolean;
};

export type VideoAsset = {
  kind: "video";
  src: string;
  mobileSrc?: string;
  poster: string;
  alt: string;
  focus?: string;
  temp?: boolean;
};

const still = (file: string, alt: string, focus = "50% 50%"): ImageAsset => ({
  kind: "image",
  src: `/media/${file}.webp`,
  alt,
  width: 1280,
  height: 720,
  focus,
  temp: true,
});

export const assets = {
  heroVideo: {
    kind: "video",
    src: "/media/hero-scrub.mp4",
    poster: "/media/hero-poster.webp",
    alt: "A pavé diamond ring resting on volcanic stone as warm mist drifts past, then a solitaire held between two rocks.",
    focus: "62% 50%",
    temp: true,
  },
  collectionFilm: {
    kind: "video",
    src: "/media/collection-loop.mp4",
    poster: "/media/collection-poster.webp",
    alt: "A yellow-gold halo ring on dark stone, mist moving behind it.",
    focus: "55% 50%",
    temp: true,
  },

  // Collection key pieces
  pieceCushion: still("s12_4", "Cushion halo ring with a double pavé band on blue-lit stone", "55% 50%"),
  pieceSphere: still("s19_0", "Domed pavé ring on dark rock with mist behind", "54% 60%"),
  pieceHalo: still("s27_0", "Close view of a round halo stud earring", "50% 50%"),

  // Lookbook
  look1Large: still("s04_5", "Floral solitaire ring balanced on a ridge of volcanic stone", "40% 50%"),
  look1Small: still("s03_8", "The floral solitaire from a lower angle", "50% 50%"),
  look2Large: still("s07_0", "Yellow-gold pavé ring leaning against rock", "80% 50%"),
  look2Small: still("s10_3", "Pair of halo stud earrings on stone", "55% 60%"),
  look3Large: still("s20_0", "Tension-set solitaire held between two rocks", "48% 50%"),
  look3Small: still("s24_5", "Halo stud earring in profile, showing the screw back", "45% 50%"),
  look4Large: still("s30_8", "Marquise pavé ring on a boulder, cool light", "50% 50%"),
  look4Small: still("s33_1", "Gold halo ring against drifting mist", "55% 50%"),

  // Editorial
  editorialWide: still("s14_5", "Cushion halo ring on dark stone under blue light", "50% 45%"),
  editorialDetail: still("s16_5", "Domed pavé ring half-hidden in warm mist", "47% 80%"),

  // Products (main / alternate)
  p1a: still("s04_5", "Ember Solitaire ring", "40% 50%"),
  p1b: still("s03_8", "Ember Solitaire ring, alternate angle", "50% 50%"),
  p2a: still("s07_0", "Dune Pavé ring in yellow gold", "84% 50%"),
  p2b: still("s09_5", "Dune Pavé ring, pavé detail", "70% 50%"),
  p3a: still("s10_3", "Halo Stud earrings", "55% 60%"),
  p3b: still("s11_8", "Halo Stud earrings, alternate angle", "55% 60%"),
  p4a: still("s12_4", "Cushion Halo ring", "55% 50%"),
  p4b: still("s15_2", "Cushion Halo ring, close view", "50% 50%"),
  p5a: still("s19_0", "Sphere Pavé ring", "54% 60%"),
  p5b: still("s16_5", "Sphere Pavé ring in mist", "47% 80%"),
  p6a: still("s20_0", "Tension Solitaire ring", "48% 50%"),
  p6b: still("s23_5", "Tension Solitaire ring, side view", "48% 50%"),
  p7a: still("s24_5", "Halo Drop stud earring", "45% 50%"),
  p7b: still("s27_0", "Halo Drop stud earring, front view", "50% 50%"),
  p8a: still("s31_5", "Solace Halo ring in yellow gold", "55% 50%"),
  p8b: still("s33_1", "Solace Halo ring, alternate angle", "55% 50%"),
} satisfies Record<string, ImageAsset | VideoAsset>;

export type AssetId = keyof typeof assets;
