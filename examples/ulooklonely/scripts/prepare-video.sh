#!/usr/bin/env bash
# ulooklonely — Film-inspired Portfolio — turn ONE source video into every file the hero needs. Free tools only.
#
#   bash scripts/prepare-video.sh path/to/original.mp4                   # encode; a small source is sharpened automatically
#   bash scripts/prepare-video.sh path/to/original.mp4 --upscale footage # sharpen with the people/fabric model (slow, most natural)
#   bash scripts/prepare-video.sh path/to/original.mp4 --upscale cgi     # sharpen with the fast model (the automatic default)
#   bash scripts/prepare-video.sh path/to/original.mp4 --no-upscale      # never sharpen
#   bash scripts/prepare-video.sh path/to/original.mp4 --wide wide.mp4   # desktop from your 16:9 (AI-expanded) version
#
# Screens: desktop and tablet get 16:9 files, phones get your original shape (FRAME=wide).
# A vertical/square/4:3 source with no --wide version is cropped to a 16:9 window for desktop — move it with
# FOCUS_Y=0 (top) … 0.5 (centre, default) … 1 (bottom).
#
# Always pass the ORIGINAL file (the export from your camera or AI tool), never a copy already compressed
# for the web — every re-compression loses detail you cannot get back.
# Too small for the screen it fills (desktop < 1920 px wide, phone < 1080 px tall)? It is sharpened with Real-ESRGAN
# (free, BSD-3, runs on your GPU), which this script downloads on first use into ~/.cache/opuskit/realesrgan
# (or $REALESRGAN_DIR). A small video stretched full-screen by the browser is what makes a hero look soft.
# Needs ffmpeg:  macOS: brew install ffmpeg · Ubuntu: sudo apt install ffmpeg · Windows: winget install ffmpeg
set -euo pipefail

SRC="${1:?Usage: $0 path/to/original.mp4 [--upscale footage|cgi | --no-upscale] [--wide path/to/16x9.mp4]}"; shift
MODE="auto"; WIDE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --upscale) MODE="${2:?--upscale needs footage or cgi}"; shift 2 ;;
    --no-upscale) MODE="off"; shift ;;
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
# Work from a copy: the upload often sits at public/media/heroVideo.mp4 — the very file this script writes.
cp "$SRC" "$TMP/source.${SRC##*.}"; SRC="$TMP/source.${SRC##*.}"
[ -n "$WIDE" ] && { cp "$WIDE" "$TMP/widesource.${WIDE##*.}"; WIDE="$TMP/widesource.${WIDE##*.}"; }

# Real-ESRGAN, fetched once. Non-zero return = can't run here; the script then carries on unsharpened.
esrgan() {
  ESRGAN_DIR="${REALESRGAN_DIR:-$HOME/.cache/opuskit/realesrgan}"
  [ -x "$ESRGAN_DIR/realesrgan-ncnn-vulkan" ] && return 0
  local os; case "$(uname -s)" in Darwin) os=macos ;; Linux) os=ubuntu ;; *) os=windows ;; esac
  command -v curl >/dev/null && command -v unzip >/dev/null || { echo "curl and unzip are needed to fetch Real-ESRGAN."; return 1; }
  echo "Downloading Real-ESRGAN (~45 MB, once) into ${ESRGAN_DIR}…"
  mkdir -p "$ESRGAN_DIR" && curl -fsSL -o "$ESRGAN_DIR/esr.zip" "https://github.com/xinntao/Real-ESRGAN/releases/download/v0.2.5.0/realesrgan-ncnn-vulkan-20220424-$os.zip" \
    && unzip -oq "$ESRGAN_DIR/esr.zip" -d "$ESRGAN_DIR" && rm -f "$ESRGAN_DIR/esr.zip" || { echo "Download failed."; return 1; }
  [ -f "$ESRGAN_DIR/realesrgan-ncnn-vulkan.exe" ] && ln -sf realesrgan-ncnn-vulkan.exe "$ESRGAN_DIR/realesrgan-ncnn-vulkan"
  chmod +x "$ESRGAN_DIR/realesrgan-ncnn-vulkan"
}
# sharpen IN OUT SCALE — echoes OUT on success, IN if sharpening is off or fails.
sharpen() {
  local in="$1" out="$2" scale="$3" model=realesr-animevideov3 d
  [ "$MODE" = "off" ] || [ "$scale" -le 1 ] && { echo "$in"; return; }
  if [ "$MODE" = "footage" ]; then model=realesrgan-x4plus; scale=4; fi
  [ "$scale" -gt 4 ] && scale=4
  esrgan >&2 || { echo "⚠ No Real-ESRGAN — continuing unsharpened." >&2; echo "$in"; return; }
  d=$(mktemp -d "$TMP/esr.XXXX"); mkdir "$d/in" "$d/out"
  echo "Sharpening $(probe width "$in")×$(probe height "$in") ${scale}× with $model (fast model: well under a second per frame; footage: several seconds)…" >&2
  ffmpeg -v error -i "$in" -fps_mode passthrough "$d/in/%05d.png"
  if (cd "$ESRGAN_DIR" && ./realesrgan-ncnn-vulkan -i "$d/in" -o "$d/out" -n "$model" -s "$scale" -f png) >&2 && [ -f "$d/out/00001.png" ]; then
    ffmpeg -v error -y -framerate "$(probe r_frame_rate "$in")" -i "$d/out/%05d.png" -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p "$out"
    echo "$out"
  else echo "⚠ Real-ESRGAN could not run here (it needs a Vulkan-capable GPU) — continuing unsharpened." >&2; echo "$in"; fi
}
ceil_div() { echo $(( ($1 + $2 - 1) / $2 )); }

# Desktop comes from your 16:9 version if given; otherwise from a 16:9 window of the original when it isn't ~16:9.
# Scale factor: enough that desktop is ≥ 1920 px wide AND phones (a 9:16 slice of the original's height) ≥ 1080 px tall.
NEEDS_WIDE=0; [ -z "$WIDE" ] && [ "$FRAME" = "wide" ] && [ $(( W * 900 / H )) -lt 1520 -o $(( W * 900 / H )) -gt 1680 ] && NEEDS_WIDE=1
CROP_W=$W; [ "$NEEDS_WIDE" = 1 ] && CROP_W=$(( W < H * 16 / 9 ? W : H * 16 / 9 ))
[ -n "$WIDE" ] && S=$(ceil_div 1080 "$H") || { S=$(ceil_div 1920 "$CROP_W"); P=$(ceil_div 1080 "$H"); [ "$P" -gt "$S" ] && S=$P; }
[ "$MODE" = "auto" ] && MODE=cgi
ORIG=$(sharpen "$SRC" "$TMP/orig.mp4" "$S")

if [ -n "$WIDE" ]; then
  echo "Desktop files from your widescreen version: $WIDE ($(probe width "$WIDE")×$(probe height "$WIDE"))"
  WORK=$(sharpen "$WIDE" "$TMP/wide-up.mp4" "$(ceil_div 1920 "$(probe width "$WIDE")")")
elif [ "$NEEDS_WIDE" = 1 ]; then
  ffmpeg -v error -y -i "$ORIG" -vf "crop=w='min(iw,ih*16/9)':h='min(ih,iw*9/16)':x='(iw-ow)/2':y='(ih-oh)*$FOCUS_Y'" -c:v libx264 -crf 12 -preset slow -pix_fmt yuv420p -an "$TMP/wide.mp4"
  WORK="$TMP/wide.mp4"
  echo "Not 16:9 — desktop uses a 16:9 window of it: $(probe width "$WORK")×$(probe height "$WORK") (FOCUS_Y=$FOCUS_Y)."
  echo "  Best quality: make a 16:9 version with an AI "expand" tool and re-run with --wide."
else WORK="$ORIG"; fi

FIT="scale='min(1920,iw)':-2:flags=lanczos"   # never wider than 1920
X264="-c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p -movflags +faststart -an"

ffmpeg -v error -y -i "$WORK" -vf "$FIT" $X264 -crf 20 "$OUT/heroVideo.mp4"
echo "✓ heroVideo.mp4 — normal playback"
# Scroll-controlled: a keyframe every 6 frames keeps seeking instant without the size of all-intra.
ffmpeg -v error -y -i "$WORK" -vf "$FIT" $X264 -crf 20 -g 6 -keyint_min 6 -sc_threshold 0 "$OUT/scrubReadyEncode.mp4"
echo "✓ scrubReadyEncode.mp4 — scroll-scrubbed desktop hero"
# Phones: from the ORIGINAL — a vertical source is already the right shape, a wide one gets a 9:16 centre crop.
ffmpeg -v error -y -i "$ORIG" -vf "crop='min(iw,ih*9/16)':ih,scale=-2:'min(1920,ih)':flags=lanczos" $X264 -crf 22 -g 6 -keyint_min 6 -sc_threshold 0 "$OUT/mobileVideoEncode.mp4"
echo "✓ mobileVideoEncode.mp4 — phones (9:16)"
# JPEG, not WebP: every ffmpeg build has it (Homebrew's lacks libwebp). next/image converts it for the browser anyway.
ffmpeg -v error -y -i "$WORK" -vf "$FIT" -frames:v 1 -q:v 2 "$OUT/posterImage.jpg"
ffmpeg -v error -y -i "$ORIG" -vf "crop='min(iw,ih*9/16)':ih,scale=-2:'min(1920,ih)':flags=lanczos" -frames:v 1 -q:v 2 "$OUT/posterMobile.jpg"
echo "✓ posterImage.jpg, posterMobile.jpg — first frame"

HW=$(probe width "$OUT/heroVideo.mp4"); MH=$(probe height "$OUT/mobileVideoEncode.mp4")
echo "Result: desktop ${HW}×$(probe height "$OUT/heroVideo.mp4"), phone $(probe width "$OUT/mobileVideoEncode.mp4")×${MH} — put these real sizes in src/config/assets.ts."
[ "$HW" -lt 1920 ] || [ "$MH" -lt 1080 ] && echo "⚠ Still smaller than the screen it fills — it will look soft. Find a larger original, or fix Real-ESRGAN and re-run."
ls -lh "$OUT"/heroVideo.mp4 "$OUT"/*Encode.mp4 "$OUT"/poster*.jpg 2>/dev/null
