// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Replacing a photo = replacing the file at that path or editing one line here.
// status: 'have' = the owner's real file (sources in media-src/SOURCES.md).
export const assets = {
  story: { src: '/media/story.avif', width: 2670, height: 1780, status: 'have', usage: 'Editorial Story lead image', alt: 'A small red wooden house alone on a grassy hill under a pale blue sky.' },
  article1: { src: '/media/article-1.jpg', width: 2400, height: 1800, status: 'have', usage: 'Essay: Fog on the lake road', alt: 'A narrow road curving along the shore of a still lake, dark forest above and fog over the water.' },
  article2: { src: '/media/article-2.jpg', width: 2400, height: 1600, status: 'have', usage: 'Essay: A harbour that keeps its own time', alt: 'Two small boats, one white and one red, moored in a calm grey harbour under a misty sky.' },
  article3: { src: '/media/article-3.jpg', width: 2400, height: 1350, status: 'have', usage: 'Essay: Two hundred kilometres of straight road', alt: 'An empty road running straight to the horizon through flat, pale desert under a deep blue sky.' },
  article4: { src: '/media/article-4.jpg', width: 2400, height: 1591, status: 'have', usage: 'Essay: Winter at the edge of the fjord', alt: 'Red wooden boathouses on a snowy shore, reflected in still water, with white mountains behind.' },
  article5: { src: '/media/article-5.jpg', width: 2400, height: 1800, status: 'have', usage: 'Essay: Kotor before the cruise ships', alt: 'A narrow cobbled street seen through a stone arch, old houses on both sides and one lit shop window.' },
  article6: { src: '/media/article-6.jpg', width: 2400, height: 1600, status: 'have', usage: 'Essay: Nine hours at the train window', alt: 'The inside of a train carriage, its window showing a landscape blurred by speed.' },
  team1: { src: '/media/team-1.jpg', width: 1800, height: 2400, status: 'have', usage: 'Team: Ingrid Solberg', alt: 'Portrait of Ingrid Solberg, fair hair tied back, in a white top against a white wall.' },
  team2: { src: '/media/team-2.jpg', width: 1600, height: 2400, status: 'have', usage: 'Team: Kofi Mensah', alt: 'Portrait of Kofi Mensah in a cream ribbed turtleneck against a warm grey wall.' },
  team3: { src: '/media/team-3.jpg', width: 1603, height: 2400, status: 'have', usage: 'Team: Elin Varga', alt: 'Portrait of Elin Varga, red hair pulled back, wearing a fine necklace, against a pale green wall.' },
} as const

export type AssetKey = keyof typeof assets
