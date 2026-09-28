# KEEPERS — News Grid Product Launch — Claude Code Build Package

1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build the whole site following build/implementation-plan.md." That is all — it works through every step, checks itself against build/verification.md, and replies with a localhost URL when done.

## Your uploaded files
Included in this package, at the paths `src/config/assets.ts` already points to:
- public/media/heroVideo.mp4 (from GATEKEEPER.mp4)
