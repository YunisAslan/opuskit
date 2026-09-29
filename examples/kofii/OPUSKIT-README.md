# KOFII — Scandinavian Minimal Restaurant Site — Claude Code Build Package

1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.
Before building: run bash scripts/prepare-video.sh path/to/your-original-video.mp4 — it makes every video file the hero needs (add --upscale footage or --upscale cgi if the original is under 1920 px wide).

## Your uploaded files
Included in this package, at the paths `src/config/assets.ts` already points to:
- public/media/yourPhotos-1.jpg (from koffii-6.jpg)
- public/media/yourPhotos-2.jpg (from koffii-7.jpg)
- public/media/yourPhotos-3.jpg (from koffii-8.jpg)
- public/media/yourPhotos-4.png (from koffii-9.png)
- public/media/yourPhotos-5.jpg (from kofii-1.jpg)
- public/media/yourPhotos-6.jpg (from kofii-2.jpg)
- public/media/yourPhotos-7.jpg (from kofii-3.jpg)
- public/media/yourPhotos-8.jpg (from kofii-4.jpg)
- public/media/yourPhotos-9.jpg (from kofii-5.jpg)
- public/media/heroVideo.mp4 (from kofii.mp4)
