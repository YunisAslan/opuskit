// Asset reference layer. Components never hardcode media paths — they ask for a key.
// Paths under files you uploaded during creation point at the real file, already included in this package.
// Replacing a placeholder = replacing the file at that path or editing one line here.
// status: 'have' = your file · 'temporary' = stand-in photo (Picsum/Unsplash licence), replace with your own work.
type Asset = { src: string; alt: string; w: number; h: number; status: 'have' | 'temporary'; usage: string; focus?: string }

const temp = (src: string, alt: string, w: number, h: number): Asset => ({ src: `/media/${src}.jpg`, alt, w, h, status: 'temporary', usage: 'Project cover / gallery' })
const L = [1800, 1200] as const, P = [1200, 1500] as const, C = [2000, 1333] as const

export const assets = {
  yourPhotos: { src: '/media/yourPhotos.jpeg', alt: 'Yunis Aslanov in a white shirt, looking straight at the camera', w: 1085, h: 1448, status: 'have', usage: 'About cover — full-bleed moment', focus: '50% 28%' },

  quietHoursCover: temp('quiet-hours-cover', 'A woman in a canoe on a turquoise lake, pines behind her', ...C),
  quietHours1: temp('quiet-hours-1', 'A long wooden pier running out to the sea', ...L),
  quietHours2: temp('quiet-hours-2', 'A rainbow over old city rooftops', ...P),
  quietHours3: temp('quiet-hours-3', 'A snow-capped volcano over a still lake at night', ...L),
  quietHours4: temp('quiet-hours-4', 'Orange tulips in soft focus', ...L),
  quietHours5: temp('quiet-hours-5', 'A broken wooden jetty among reeds', ...P),
  quietHours6: temp('quiet-hours-6', 'Raised hands against bright stage light', ...L),

  northboundCover: temp('northbound-cover', 'Empty church pews under arched windows, one man sitting alone', ...C),
  northbound1: temp('northbound-1', 'A facade painted in red, white and yellow stripes', ...L),
  northbound2: temp('northbound-2', 'Two glass towers seen from below, almost touching', ...P),
  northbound3: temp('northbound-3', 'Mountain ranges under a sea of cloud, seen from above', ...L),
  northbound4: temp('northbound-4', 'A tall cloud lit by the last sun, the moon beside it', ...L),
  northbound5: temp('northbound-5', 'Hikers on a granite ridge above the clouds', ...P),
  northbound6: temp('northbound-6', 'A narrow stone street ending at the sea', ...L),

  paperWeatherCover: temp('paper-weather-cover', 'A woman sitting by a lake as the sun goes down', ...C),
  paperWeather1: temp('paper-weather-1', 'Fog over a forest and an old bridge rail', ...L),
  paperWeather2: temp('paper-weather-2', 'A gull over a flat grey sea', ...P),
  paperWeather3: temp('paper-weather-3', 'A mountain road curving into a tunnel', ...L),
  paperWeather4: temp('paper-weather-4', 'A person standing in a wheat field at sunset', ...L),
  paperWeather5: temp('paper-weather-5', 'A white sail against a bright sky', ...P),
  paperWeather6: temp('paper-weather-6', 'A book on a wooden desk, a cork coaster beside it', ...L),

  highGroundCover: temp('high-ground-cover', 'A pine forest in low cloud', ...C),
  highGround1: temp('high-ground-1', 'A pier pavilion over breaking waves', ...L),
  highGround2: temp('high-ground-2', 'Dark blue water with a line of foam', ...P),
  highGround3: temp('high-ground-3', 'A leaning stone tower against a pale sky', ...L),
  highGround4: temp('high-ground-4', 'A sharp mountain peak in snow', ...L),
  highGround5: temp('high-ground-5', 'A mown football pitch seen from above', ...P),
  highGround6: temp('high-ground-6', 'Sun through pines on a mountain ridge', ...L),
} satisfies Record<string, Asset>

export type AssetKey = keyof typeof assets
