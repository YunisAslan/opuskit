#!/usr/bin/env bash
# RALPH&LAUREN — Swiss Modern Event Site — turn ONE source video into every file the hero needs. Free tools only.
#
#   bash scripts/prepare-video.sh path/to/original.mp4                   # encode
#   bash scripts/prepare-video.sh path/to/original.mp4 --upscale footage # sharpen people, fabric, real scenes (slow, best)
#   bash scripts/prepare-video.sh path/to/original.mp4 --upscale cgi     # sharpen product, 3D, liquid, animation (fast)
#   bash scripts/prepare-video.sh path/to/original.mp4 --wide wide.mp4   # desktop from your 16:9 (AI-expanded) version
#
# Screens: desktop and tablet get 16:9 files, phones get your original shape (FRAME=wide).
# A vertical/square/4:3 source with no --wide version is cropped to a 16:9 window for desktop — move it with
# FOCUS_Y=0 (top) … 0.5 (centre, default) … 1 (bottom), and add --upscale so the crop is sharp at full size.
#
# Always pass the ORIGINAL file (the export from your camera or AI tool), never a copy already compressed
# for the web — every re-compression loses detail you cannot get back.
# Needs ffmpeg:  macOS: brew install ffmpeg · Ubuntu: sudo apt install ffmpeg · Windows: winget install ffmpeg
# --upscale needs Real-ESRGAN (free, runs on your GPU): download the zip for your OS from
#   https://github.com/xinntao/Real-ESRGAN/releases/tag/v0.2.5.0
# unzip it, and point REALESRGAN_DIR at that folder (e.g. export REALESRGAN_DIR=~/tools/realesrgan).
set -euo pipefail

SRC="${1:?Usage: $0 path/to/original.mp4 [--upscale footage|cgi] [--wide path/to/16x9.mp4]}"; shift
MODE=""; WIDE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --upscale) MODE="${2:?--upscale needs footage or cgi}"; shift 2 ;;
    --wide) WIDE="${2:?--wide needs the path to your 16:9 version}"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done
FRAME="${FRAME:-wide}"; FOCUS_Y="${FOCUS_Y:-0.5}"
OUT="${OUT:-public/media}"
mkdir -p "$OUT"
command -v ffmpeg >/dev/null || { echo "ffmpeg not found — install it first (see the top of this script)."; exit 1; }

probe() { ffprobe -v error -select_streams v:0 -show_entries "stream=$1" -of csv=p=0 "$2"; }
W=$(probe width "$SRC"); H=$(probe height "$SRC"); FPS=$(probe r_frame_rate "$SRC")
echo "Source: ${W}×${H} @ ${FPS} fps"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

# Desktop source: your 16:9 version if given; else a 16:9 window of the original when it isn't already ~16:9.
DESK="$SRC"
if [ -n "$WIDE" ]; then
  DESK="$WIDE"; echo "Desktop files from your widescreen version: $WIDE ($(probe width "$WIDE")×$(probe height "$WIDE"))"
elif [ "$FRAME" = "wide" ] && [ $(( W * 900 / H )) -lt 1520 -o $(( W * 900 / H )) -gt 1680 ]; then
  ffmpeg -v error -y -i "$SRC" -vf "crop=w='min(iw,ih*16/9)':h='min(ih,iw*9/16)':x='(iw-ow)/2':y='(ih-oh)*$FOCUS_Y'" -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -an "$TMP/wide.mp4"
  DESK="$TMP/wide.mp4"
  echo "Not 16:9 — desktop uses a 16:9 window of it: $(probe width "$DESK")×$(probe height "$DESK") (FOCUS_Y=$FOCUS_Y)."
  echo "  For full quality: make a 16:9 version with an AI "expand" tool and re-run with --wide, or add --upscale."
fi
DW=$(probe width "$DESK")

WORK="$DESK"
if [ -n "$MODE" ]; then
  [ -x "${REALESRGAN_DIR:-}/realesrgan-ncnn-vulkan" ] || { echo "Set REALESRGAN_DIR to the unzipped Real-ESRGAN folder (see top of script)."; exit 1; }
  if [ "$MODE" = "footage" ]; then MODEL=realesrgan-x4plus; SCALE=4; else MODEL=realesr-animevideov3; SCALE=2; fi
  mkdir "$TMP/in" "$TMP/out"
  echo "Upscaling ${SCALE}× with $MODEL — footage mode can take a while (seconds per frame)…"
  ffmpeg -v error -i "$DESK" -fps_mode passthrough "$TMP/in/%05d.png"
  (cd "$REALESRGAN_DIR" && ./realesrgan-ncnn-vulkan -i "$TMP/in" -o "$TMP/out" -n "$MODEL" -s "$SCALE" -f png)
  ffmpeg -v error -y -framerate "$FPS" -i "$TMP/out/%05d.png" -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p "$TMP/upscaled.mp4"
  WORK="$TMP/upscaled.mp4"
elif [ "$DW" -lt 1920 ]; then
  echo "Note: ${DW}px wide will look soft on a full-screen hero. Re-run with --upscale footage or --upscale cgi."
fi

FIT="scale='min(1920,iw)':-2:flags=lanczos"   # never wider than 1920, never upscaled by ffmpeg
X264="-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an"

ffmpeg -v error -y -i "$WORK" -vf "$FIT" $X264 -crf 20 "$OUT/heroVideo.mp4"
echo "✓ heroVideo.mp4 — normal playback"
# Scroll-controlled: a keyframe every 6 frames keeps seeking instant without the size of all-intra.
ffmpeg -v error -y -i "$WORK" -vf "$FIT" $X264 -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 "$OUT/scrubReadyEncode.mp4"
echo "✓ scrubReadyEncode.mp4 — scroll-scrubbed desktop hero"
# Phones: from the ORIGINAL — a vertical source is already the right shape, a wide one gets a 9:16 centre crop.
ffmpeg -v error -y -i "$SRC" -vf "crop='min(iw,ih*9/16)':ih,scale=-2:'min(1920,ih)':flags=lanczos" $X264 -crf 22 -g 6 -keyint_min 6 -sc_threshold 0 "$OUT/mobileVideoEncode.mp4"
echo "✓ mobileVideoEncode.mp4 — phones (9:16)"
# JPEG, not WebP: every ffmpeg build has it (Homebrew's lacks libwebp). next/image converts it for the browser anyway.
ffmpeg -v error -y -i "$WORK" -vf "$FIT" -frames:v 1 -q:v 2 "$OUT/posterImage.jpg"
ffmpeg -v error -y -i "$SRC" -vf "crop='min(iw,ih*9/16)':ih" -frames:v 1 -q:v 2 "$OUT/posterMobile.jpg"
echo "✓ posterImage.jpg, posterMobile.jpg — first frame"
ls -lh "$OUT"/heroVideo.mp4 "$OUT"/*Encode.mp4 "$OUT"/poster*.jpg 2>/dev/null
