# BUYTOLOSE — Gothic Modern Store — Claude Code Build Package

1. Create a Next.js project (npx create-next-app@latest) or open your existing one.
2. Unzip this package into the project root (it adds CLAUDE.md, .claude/skills, recipe/, assets/, build/ and two src/ files).
3. Run `claude` in the project folder.
4. Prompt: "Read CLAUDE.md and build/implementation-plan.md. Start with step 1 and stop after each step for review."
5. When all steps are done: "Run the visual-qa skill against build/verification.md and fix every deviation."

## Your uploaded files
Included in this package, at the paths `src/config/assets.ts` already points to:
- public/media/heroVideo.mp4 (from hf_20260908_203743_e36b99a1-6078-4b70-9226-fc463561f871.mp4)
