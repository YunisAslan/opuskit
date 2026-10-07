// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Every photo here is the owner's real, final picture (media-src/SOURCES.md); status 'have'.
// Replacing one = replacing the file at its path (same name) or editing one line here.
type Asset = { src: string; alt: string; width: number; height: number; status: 'have' | 'temporary' }

const photo = (name: string, alt: string, width: number, height: number): Asset => ({ src: `/media/${name}.jpg`, alt, width, height, status: 'have' })

export const assets = {
  hero: photo('hero', 'A long glazed barn house at dusk, lit from inside, a bare oak beside it', 2800, 1575),
  heroMobile: photo('hero-mobile', 'A long glazed barn house at dusk, lit from inside, a bare oak beside it', 1600, 2000),

  project1: photo('project-1', 'A timber barn house at dusk, its windows lit', 2400, 1600),
  project2: photo('project-2', 'A new glass gable set on the old stone base of a barn', 2400, 1600),
  project3: photo('project-3', 'A dark timber barn house in a meadow under a low sun', 2400, 1600),
  project4: photo('project-4', 'A stone farm barn among blossom, before its windows go in', 2400, 1600),

  gallery1: photo('gallery-1', 'The kept roof timbers of a converted barn, a ring chandelier hanging from them', 2400, 1600),
  gallery2: photo('gallery-2', 'An attic under the old rafters, with new glazing in the roof', 2400, 1600),
  gallery3: photo('gallery-3', 'A living room under timber ceiling beams', 1920, 2400),
  gallery4: photo('gallery-4', 'A double-height barn room with a gallery and a tall window', 1920, 2400),
  gallery5: photo('gallery-5', 'An open kitchen and living room with a wood stove under a vaulted roof', 2400, 1600),
  gallery6: photo('gallery-6', 'A hand-hewn post meeting its beam', 1920, 2400),
  gallery7: photo('gallery-7', 'Old oak beams in low sun', 1919, 2400),
  gallery8: photo('gallery-8', 'A dry stone barn wall with a shuttered window', 2400, 1600),
  gallery9: photo('gallery-9', 'Weathered barn boards and an iron hinge', 1919, 2400),
  gallery10: photo('gallery-10', 'Hands notching a new log with a chisel', 1920, 2400),

  case1: photo('case-1', 'Inside the barn as it was found, light coming through the boards', 2400, 1600),
  case2: photo('case-2', 'The floor plans laid out on the drawing table', 2400, 1600),
  case3: photo('case-3', 'Marking out new timber with a pencil', 2400, 1600),
  case4: photo('case-4', 'The finished roof: old trusses over new boards', 2400, 1600),

  about: photo('about', 'The architect at the drawing table', 1920, 2400),
  about2: photo('about-2', 'One of the studio outside an old barn', 1920, 2400),

  team1: photo('team-1', 'Portrait of Clara Wren in warm window light', 1600, 2000),
  team2: photo('team-2', 'Portrait of Owen Hale in side light', 1600, 2000),
  team3: photo('team-3', 'Portrait of Isla Marsh by a window', 1600, 2000),
  team4: photo('team-4', 'Portrait of Bill Rook in the workshop', 1600, 2000),

  location1: photo('location-1', 'The way in: a stable door in a stone wall', 2400, 1600),
  location2: photo('location-2', 'Inside the studio: the desk under old posts, sun on the floor', 2400, 1600),
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
