#!/usr/bin/env bash
# Kelp Line — fetch the original Unsplash photos and fit them to the shot list.
# Run from the example folder:  bash fetch.sh
# Originals land in media-src/{key}-original.jpg; fitted images in public/media/{key}.jpg
# (cropped to the key's ratio, <= 2400px long side, JPEG quality 82) when ImageMagick is installed.
# Idempotent: existing files are kept; delete one to fetch or fit it again.
# Photos: Unsplash License — see SOURCES.md for photographers and pages.
set -euo pipefail

PICKS=(
  "hero n4tWGvk_gWY 4:5 Center"
  "storyHome o-Z9-rl__28 3:4 Center"
  "storyMission Viry87ggNG4 3:4 Center"
  "storyStories IYw9HKodlog 3:4 Center"
  "journal-1 OxXH8b4ZRJI 3:2 Center"
  "journal-2 04X0-RqBOjQ 3:2 Center"
  "journal-3 9byed9_svTo 3:2 Center"
  "about N6SC4E8SPIk 3:4 Center"
  "team-1 HYbgYMJJiqw 3:4 North"
  "team-2 y9vn9crKPzg 3:4 Center"
  "team-3 6vftD8rPSOo 3:4 Center"
  "team-4 MXV59Queb0I 3:4 Center"
  "gallery-1 O5fC_wRJ_8s 3:2 Center"
  "gallery-2 vHDLjO-iW8k 3:2 Center"
  "gallery-3 kBqfWKmwjnk 3:2 Center"
  "gallery-4 puofcLpFuOU 3:2 Center"
  "gallery-5 F5fSo5tn-XY 3:2 Center"
  "gallery-6 EQlwRGr5sqk 3:2 Center"
  "gallery-7 D-awPXLgdj8 3:2 Center"
  "gallery-8 PHjhQWwSzMw 3:2 Center"
  "location F77Ya9O6FeQ 3:4 Center"
)

mkdir -p media-src public/media

IM=""
if command -v magick >/dev/null 2>&1; then IM="magick"
elif command -v convert >/dev/null 2>&1; then IM="convert"
else echo "ImageMagick not found: originals will be downloaded but not cropped/resized." >&2
fi

identify_wh() {
  if [ "$IM" = "magick" ]; then magick identify -format '%w %h' "$1[0]"; else identify -format '%w %h' "$1[0]"; fi
}

for row in "${PICKS[@]}"; do
  read -r key id ratio gravity <<<"$row"
  orig="media-src/${key}-original.jpg"
  out="public/media/${key}.jpg"

  if [ ! -s "$orig" ]; then
    echo "download $key ($id)"
    curl -fL --retry 3 -o "$orig.part" "https://unsplash.com/photos/${id}/download?force=true"
    mv "$orig.part" "$orig"
  fi

  [ -z "$IM" ] && continue
  if [ -s "$out" ]; then echo "keep     $out"; continue; fi

  rw=${ratio%%:*}; rh=${ratio##*:}
  wh=$(identify_wh "$orig"); w=${wh%% *}; h=${wh##* }
  # largest crop of ratio rw:rh that fits inside w x h
  if [ $(( w * rh )) -gt $(( h * rw )) ]; then cw=$(( h * rw / rh )); ch=$h; else cw=$w; ch=$(( w * rh / rw )); fi
  echo "fit      $key -> ${ratio} (${cw}x${ch} from ${w}x${h}, $gravity)"
  "$IM" "$orig" -auto-orient -gravity "$gravity" -crop "${cw}x${ch}+0+0" +repage \
    -resize '2400x2400>' -strip -interlace Plane -quality 82 "$out.tmp.jpg"
  mv "$out.tmp.jpg" "$out"
done

# mobileHeroCrop: no new download — cut from the hero original, 4:5 centred, exactly 1440x1800.
if [ -n "$IM" ] && [ -s media-src/hero-original.jpg ]; then
  out="public/media/mobileHeroCrop.jpg"
  if [ -s "$out" ]; then echo "keep     $out"
  else
    wh=$(identify_wh media-src/hero-original.jpg); w=${wh%% *}; h=${wh##* }
    if [ $(( w * 5 )) -gt $(( h * 4 )) ]; then cw=$(( h * 4 / 5 )); ch=$h; else cw=$w; ch=$(( w * 5 / 4 )); fi
    echo "fit      mobileHeroCrop -> 4:5 (${cw}x${ch} from ${w}x${h}) -> 1440x1800"
    "$IM" media-src/hero-original.jpg -auto-orient -gravity Center -crop "${cw}x${ch}+0+0" +repage \
      -resize '1440x1800!' -strip -interlace Plane -quality 82 "$out.tmp.jpg"
    mv "$out.tmp.jpg" "$out"
  fi
fi

echo "done: $(ls public/media | wc -l | tr -d ' ') files in public/media"
