# Brasshand — Typography First Agency Site — Claude Code Build Package

1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.
Ready sections: 15 section components in src/components/sections/ — build each page from them, passing real copy and media as props.
Your kit: 6 ready components in src/components/pieces/ (CutReveal, TextRoll, Magnetic, PageCurtain, Preloader, SmoothScroll) — keep them in the project; run npm i motion lenis.

You didn't attach any files during creation, so `public/media/` only has placeholder paths — add your own files there before building.
