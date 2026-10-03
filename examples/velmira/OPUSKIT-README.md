# Velmira — Ethereal Hotel Site — Claude Code Build Package

0. Video — do this first, before anything else:
   bash scripts/prepare-video.sh path/to/your-original-video.mp4
   A source too small for the screen (under 1920 px wide) is sharpened automatically with Real-ESRGAN (free; downloaded once). For people and real scenes add --upscale footage — slower, most natural.
   Always pass the original export from your camera or AI tool — never a web-compressed copy.
1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.
Ready sections: 10 section components in src/components/sections/ — build each page from them, passing real copy and media as props.
Your kit: 1 ready component in src/components/pieces/ (AmbientSound) — keep them in the project.

You didn't attach any files during creation, so `public/media/` only has placeholder paths — add your own files there before building.
