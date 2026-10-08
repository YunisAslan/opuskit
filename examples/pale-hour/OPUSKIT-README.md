# Pale Hour — Atelier Art Editorial Event Site — Claude Code Build Package

1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.
Ready sections: 10 section components in src/components/sections/ — the design of each part to start from: pass real copy and media as props, and fit each into the site.
Your kit: 3 ready components in src/components/pieces/ (ImageTrail, Lightbox, TextEffect) — build on them, fitted to the site; run npm i motion.

You didn't attach any files during creation, so `public/media/` only has placeholder paths — add your own files there before building.
