'use client'
// next/image loader for the static export: /media/farm.jpg at 640w -> /media/farm-640.webp (made by scripts/media.sh).
const WIDTHS = [320, 640, 1080, 1600, 2400]

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1]
  return src.replace(/\.jpg$/, `-${w}.webp`)
}
