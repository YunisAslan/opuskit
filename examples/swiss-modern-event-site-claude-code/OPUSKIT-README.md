# RALPH&LAUREN — Swiss Modern Event Site — Claude Code Build Package

0. Video — do this first, before anything else:
   bash scripts/prepare-video.sh path/to/your-original-video.mp4
   Use --upscale footage (people, real scenes) or --upscale cgi (product, 3D, animation) if your source is under 1920 px wide.
   Always pass the original export from your camera or AI tool — never a web-compressed copy.
1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.

## Your uploaded files
Included in this package, at the paths `src/config/assets.ts` already points to:
- public/media/heroVideo.mp4 (from From Klickpin.com- Blue seaside quotes for people who love practical beauty on a budget that feel calm and airy-pin-id-650981321191837516.mp4)
