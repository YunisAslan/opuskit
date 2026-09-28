#!/usr/bin/env bash
# CHEEKY — Film-inspired Fashion House — turn ONE source video into every file the hero needs. Free tools only.
#
#   bash scripts/prepare-video.sh path/to/original.mp4                   # encode
#   bash scripts/prepare-video.sh path/to/original.mp4 --upscale footage # sharpen people, fabric, real scenes (slow, best)
#   bash scripts/prepare-video.sh path/to/original.mp4 --upscale cgi     # sharpen product, 3D, liquid, animation (fast)
#
# Always pass the ORIGINAL file (the export from your camera or AI tool), never a copy already compressed
# for the web — every re-compression loses detail you cannot get back.
# Needs ffmpeg:  macOS: brew install ffmpeg · Ubuntu: sudo apt install ffmpeg · Windows: winget install ffmpeg
# --upscale needs Real-ESRGAN (free, runs on your GPU): download the zip for your OS from
#   https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0
# unzip it, and point REALESRGAN_DIR at that folder (e.g. export REALESRGAN_DIR=~/tools/realesrgan).
set -euo pipefail

SRC="${1:?Usage: $0 path/to/original.mp4 [--upscale footage|cgi]}"
MODE="${3:-}"; [ "${2:-}" = "--upscale" ] || MODE=""
OUT="${OUT:-public/media}"
mkdir -p "$OUT"
command -v ffmpeg >/dev/null || { echo "ffmpeg not found — install it first (see the top of this script)."; exit 1; }

probe() { ffprobe -v error -select_streams v:0 -show_entries "stream=$1" -of csv=p=0 "$2"; }
W=$(probe width "$SRC"); H=$(probe height "$SRC"); FPS=$(probe r_frame_rate "$SRC")
echo "Source: ${W}×${H} @ ${FPS} fps"

WORK="$SRC"
if [ -n "$MODE" ]; then
  [ -x "${REALESRGAN_DIR:-}/realesrgan-ncnn-vulkan" ] || { echo "Set REALESRGAN_DIR to the unzipped Real-ESRGAN folder (see top of script)."; exit 1; }
  if [ "$MODE" = "footage" ]; then MODEL=realesrgan-x4plus; SCALE=4; else MODEL=realesr-animevideov3; SCALE=2; fi
  TMP=$(mktemp -d); mkdir "$TMP/in" "$TMP/out"
  echo "Upscaling ${SCALE}× with $MODEL — footage mode can take a while (seconds per frame)…"
  ffmpeg -v error -i "$SRC" -fps_mode passthrough "$TMP/in/%05d.png"
  (cd "$REALESRGAN_DIR" && ./realesrgan-ncnn-vulkan -i "$TMP/in" -o "$TMP/out" -n "$MODEL" -s "$SCALE" -f png)
  ffmpeg -v error -y -framerate "$FPS" -i "$TMP/out/%05d.png" -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p "$TMP/upscaled.mp4"
  WORK="$TMP/upscaled.mp4"
elif [ "$W" -lt 1920 ]; then
  echo "Note: ${W}px wide will look soft on a full-screen hero. Re-run with --upscale footage or --upscale cgi."
fi

FIT="scale='min(1920,iw)':-2:flags=lanczos"   # never wider than 1920, never upscaled by ffmpeg
X264="-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an"

ffmpeg -v error -y -i "$WORK" -vf "$FIT" $X264 -crf 20 "$OUT/heroVideo.mp4"
echo "✓ heroVideo.mp4 — normal playback"
# Scroll-controlled: a keyframe every 6 frames keeps seeking instant without the size of all-intra.
ffmpeg -v error -y -i "$WORK" -vf "$FIT" $X264 -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 "$OUT/scrubReadyEncode.mp4"
echo "✓ scrubReadyEncode.mp4 — scroll-scrubbed desktop hero"
ffmpeg -v error -y -i "$WORK" -vf "crop='min(iw,ih*9/16)':ih,scale=-2:'min(1920,ih)':flags=lanczos" $X264 -crf 22 -g 6 -keyint_min 6 -sc_threshold 0 "$OUT/mobileVideoEncode.mp4"
echo "✓ mobileVideoEncode.mp4 — 9:16 centre crop"
# JPEG, not WebP: every ffmpeg build has it (Homebrew's lacks libwebp). next/image converts it for the browser anyway.
ffmpeg -v error -y -i "$WORK" -vf "$FIT" -frames:v 1 -q:v 2 "$OUT/posterImage.jpg"
ffmpeg -v error -y -i "$WORK" -vf "crop='min(iw,ih*9/16)':ih" -frames:v 1 -q:v 2 "$OUT/posterMobile.jpg"
echo "✓ posterImage.jpg, posterMobile.jpg — first frame"
ls -lh "$OUT"/heroVideo.mp4 "$OUT"/*Encode.mp4 "$OUT"/poster*.jpg 2>/dev/null
