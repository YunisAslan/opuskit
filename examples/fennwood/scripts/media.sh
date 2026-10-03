#!/usr/bin/env bash
# Makes the responsive WebP sizes next/image asks for (see src/lib/image-loader.ts) from the JPEGs in public/media/.
# Run after adding or replacing a photo: bash scripts/media.sh   (needs cwebp and sips — macOS + `brew install webp`)
set -euo pipefail
cd "$(dirname "$0")/../public/media"

# Dedicated 9:16 mobile crop of the tall hero: tighter, with the fire in the upper half so the headline sits below it.
sips -c 2844 1600 --cropOffset 756 568 hero.jpg --out hero-mobile.jpg >/dev/null
sips -Z 2560 -s formatOptions 82 hero-mobile.jpg >/dev/null

for f in *.jpg; do
  name="${f%.jpg}"
  orig=$(sips -g pixelWidth "$f" | awk '/pixelWidth/ {print $2}')
  for w in 320 640 1080 1600 2400; do
    (( w < orig )) && size=$w || size=$orig
    cwebp -quiet -q 78 -resize "$size" 0 "$f" -o "$name-$w.webp"
  done
done
