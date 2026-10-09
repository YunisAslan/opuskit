#!/usr/bin/env bash
# Pip & Kiln — fetch the picked Unsplash photos (Unsplash License; credits in SOURCES.md).
# Run from the example folder. Safe to re-run: files already present are kept.
#   media-src/{key}-original.jpg  full-size original from Unsplash
#   public/media/{key}.jpg        cropped centred to the key's ratio, <=2400px long side, JPEG q82
#                                 ("pad" keys keep the whole wide frame and extend its ground up and down)
#   public/media/productPageBuy/{slug}-1.jpg  copy of productGrid-N (the rest of each product set needs the owner's shoot)
set -euo pipefail

PICKS=$(cat <<'LIST'
hero 40NjbC-Q-cw 4:5 crop
categories-1 iq3o70fpMsU 2:3 crop
categories-2 DjOco3qncig 2:3 crop
categories-3 wYlEzCsfZDk 2:3 crop
categories-4 nXYmYO_-JUk 2:3 crop
productGrid-1 LFd2h58YmGw 2:3 crop
productGrid-2 t9SSd2AJhTI 2:3 crop
productGrid-3 sBTWWive5ZI 2:3 pad
productGrid-4 AVh7ttYI5kQ 2:3 pad
productGrid-5 HNN8RgbVgi8 2:3 crop
productGrid-6 KkTYrvy-6Fs 2:3 crop
collection-1 HSWzgDRN1q0 2:3 pad
collection-2 Jb1h2YCAjJQ 2:3 pad
collection-3 C-V3VR3x17o 2:3 pad
collection-4 9hzb7CdWJus 2:3 pad
productHighlight QYYt41egFQo 1:1 crop
gallery-1 iUbsw_VOkbM 3:2 crop
gallery-2 fmuykMXH-dY 3:2 crop
gallery-3 Tq4YjCa2BSc 3:2 crop
gallery-4 GjpUt15XbPE 3:2 crop
gallery-5 P21tYLUo_PI 3:2 crop
gallery-6 ZOeyUJB6t_Y 3:2 crop
gallery-7 2ZnkIsutb4g 3:2 crop
gallery-8 1FPwnKpLeOE 3:2 crop
LIST
)
SLUGS=(morning-person-mug big-hug-mug sunny-side-plate second-helping-plate show-off-vase bud-buddy-vase)

mkdir -p media-src public/media public/media/productPageBuy

IM=""
if command -v magick >/dev/null 2>&1; then IM="magick"
elif command -v convert >/dev/null 2>&1; then IM="convert"
else echo "ImageMagick not found: originals are downloaded, but public/media/ is left for you to crop." >&2
fi
identify_wh() { if [ "$IM" = "magick" ]; then magick identify -format '%w %h\n' "$1[0]"; else identify -format '%w %h\n' "$1[0]"; fi; }

while read -r key id ratio fit; do
  [ -z "$key" ] && continue
  src="media-src/${key}-original.jpg"
  out="public/media/${key}.jpg"
  if [ ! -s "$src" ]; then
    echo "download $key ($id)"
    curl -fSL --retry 3 -o "$src.part" "https://unsplash.com/photos/${id}/download?force=true"
    mv "$src.part" "$src"
  fi
  [ -z "$IM" ] && continue
  [ -s "$out" ] && continue
  read -r w h < <(identify_wh "$src")
  a=${ratio%:*}; b=${ratio#*:}
  if [ "$fit" = "pad" ] && [ $((w * b)) -gt $((h * a)) ]; then
    # keep the whole (wide) frame and extend it up and down: each edge row is smoothed sideways and
    # stretched, so the ground runs on without a seam
    ch=$((w * b / a)); top=$(((ch - h) / 2)); bot=$((ch - h - top)); sw=$((w / 40 > 2 ? w / 40 : 2))
    $IM "$src" -auto-orient \
      \( -clone 0 -gravity North -crop "${w}x1+0+0" +repage -resize "${sw}x1!" -resize "${w}x${top}!" \) \
      \( -clone 0 -gravity South -crop "${w}x1+0+0" +repage -resize "${sw}x1!" -resize "${w}x${bot}!" \) \
      -swap 0,1 +gravity -append \
      -resize '2400x2400>' -strip -interlace Plane -quality 82 "$out"
  else
    if [ $((w * b)) -gt $((h * a)) ]; then cw=$((h * a / b)); ch=$h; else cw=$w; ch=$((w * b / a)); fi
    $IM "$src" -auto-orient -gravity center -crop "${cw}x${ch}+0+0" +repage \
      -resize '2400x2400>' -strip -interlace Plane -quality 82 "$out"
  fi
  echo "made $out"
done <<< "$PICKS"

for n in 1 2 3 4 5 6; do
  slug=${SLUGS[$((n - 1))]}
  g="public/media/productGrid-${n}.jpg"
  dst="public/media/productPageBuy/${slug}-1.jpg"
  if [ -s "$g" ] && [ ! -s "$dst" ]; then cp "$g" "$dst"; echo "copied $dst"; fi
done
echo "done"
