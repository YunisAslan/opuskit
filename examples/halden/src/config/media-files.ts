// Server only: which films are really in public/media. Pages ask here and hand the answer to the client, so a film
// that has not been delivered yet is never requested (no 404s) and its still stands in. Drop the file in and it is
// found — on the next request in development, on the next build in production. No code change.
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { getVideo, type VideoKey } from '@/config/assets'

export const onDisk = (key: VideoKey) => existsSync(join(process.cwd(), 'public', getVideo(key).src))

/** The hero's encodes that exist: the 16:9 scroll encode and the 9:16 phone encode. */
export const heroFilms = () => ({
  desktop: onDisk('scrubReadyEncode') ? getVideo('scrubReadyEncode').src : undefined,
  mobile: onDisk('mobileVideoEncode') ? getVideo('mobileVideoEncode').src : undefined,
})

export const playableFilms = (): VideoKey[] => (['heroVideo', 'scrubReadyEncode', 'mobileVideoEncode', 'secondaryVideo'] as const).filter(onDisk)
