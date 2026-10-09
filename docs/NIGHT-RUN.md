# Night run — build the next example sites, learn, go on

A runbook for a scheduled Claude Code session in the cloud. It is unattended: nobody can answer a question while it runs.
The user reads what it did the next morning, from the pull request it opens.

The run is a loop: build one example site, learn from it, fix the engine, then start the next one. Each site is built
on the lessons of the one before it.

## 0. Before anything

1. Read `AGENTS.md`, then `docs/HANDOFF.md`, then `docs/plan-examples.md`. In `plan-examples.md` read §3 (the loop),
   §5b (the queue) and §6 (Progress).
2. Read `docs/plan-library.md`, decisions 46–52. Then read the newest `examples/*/BUILD-LOG.md`. Its **Engine lessons**
   are where the last run stopped.
3. Write docs, commits and the pull request in English. Do not message the user. Everything goes in the PR.
4. Make a branch from an up-to-date `main`: `night/YYYY-MM-DD`. Never commit to `main`. Never force-push.
5. Run `npm ci` and `npm run check`. If the check fails before you have changed anything, stop. Open the PR with the
   failure and nothing else.

## 1. Pick the site

- Take the first row in §5b whose Progress row (§6) still says `planned`.
- Skip a site that needs media only the user can give: a film, a sound, or the user's own photos. Write
  "waiting for the user's film" in its Progress row and move to the next row.
- If no row is left, write a new batch of four into §5b, following §5b's own rules. Each new site gets:
  - a look no example has yet;
  - a kind of site that has fewer examples than the others;
  - one engine test.

  Then stop. A new batch needs the user's approval before anything is built.

## 2. Fix what is still open

Read the **Open** items under Engine lessons in the newest BUILD-LOG. If one changes the engine and can be fixed cleanly,
fix it before this site is built:
- add a check.ts regression for it;
- `npm run check` must pass;
- write a decision in `docs/plan-library.md` if a rule changed.

If an item needs the user's judgement, leave it alone and list it for the PR.

## 3. The recipe — through the flow, as a user would

1. Start OpusKit with `npm run dev` on port 3000. In the cloud nothing else uses that port.
2. Install Playwright in a scratch folder outside the repository: `npm i playwright`, then
   `npx playwright install chromium`.
3. Drive the screens headless, the way `examples/raster-school/BUILD-LOG.md` §1 describes:
   1. **Library:** take only signature parts and effects that fit the site. A still site takes no effects.
   2. **You:** the site's name and its one sentence. Check that the sentence is read as the right kind of site. If it
      is not, that is an engine lesson: fix it the way #22 did.
   3. **Direction:** pick the look from §5b. Choose the palette and lettering by fit: preview 2–3 of each on the
      brand poster and keep the screenshots. Never pick one because it is unused.
   4. **Next: Recipe.**
4. Save the spec. Write the `/studio/open?recipe=…` link into the BUILD-LOG for the user to open in the morning.
5. There is no approval at night. Build anyway: the PR is the approval. Record in the BUILD-LOG that the recipe has not
   been approved yet.

## 4. Media

- Photos come from the Unsplash connector, following the shot list (`recipe/media.md`). Use one grade for all of them.
  Note each source in `media-src/SOURCES.md`.
- If the connector is not available, build with temporary pictures and leave the shot list for the morning.
- In the cloud the network policy blocks `images.unsplash.com`: the connector searches, but only its 400px previews
  (`small_s3`) download. Then pick the photos from the previews anyway (look at each one), build with temporary
  pictures, and leave `media-src/fetch.sh` (download, crop, resize by key), `picks.json` (with alt text) and the photo
  prompt in the BUILD-LOG for the morning (#23 Kelp Line).
- A resumed `claude -p` round: run it with `--continue` from the project folder — in the cloud the session id it
  reports can be the night run's own.
- Never take photos from a website through a browser.
- No real brands or logos. No Azerbaijan theming (`AGENTS.md`, `HANDOFF.md` working agreements).
- Films and sound are the user's. Never source them yourself.

## 5. The build — isolated

1. Make the project outside the repository, in `~/projects/{slug}`, exactly as §3 step 4 says:
   1. `create-next-app@16.3.8`.
   2. The `turbopack.root` pin, before any install.
   3. `scripts/build-package.ts` to write the Build Package.
   4. Keep `build/` out of `.gitignore`.
   5. `npm install`.
2. Write Prompt 1 into the BUILD-LOG word for word **before** it runs. Copy it from `examples/raster-school/BUILD-LOG.md`
   (temporary pictures, port 3022, stay in the folder, keep the `turbopack.root` line). Its last line must say:
   "before your final reply stop any dev server you started".
3. Run the builder in that folder:
   `claude -p "<prompt>" --setting-sources project,local --permission-mode acceptEdits --allowedTools Bash Read Write Edit Glob Grep --output-format json`.
   - If the `claude` CLI cannot run here, build with a subagent instead. Tell it to work only inside the project folder.
     Write in the BUILD-LOG: "not isolated (no claude CLI in the cloud)".
4. Put the photos in, then send Prompt 2 with `claude -p --resume <session>`: status `have`, the alt text of each real
   photo, any captions that must change.

## 6. Review and fix

1. Run `next build`.
2. Check every page in Playwright at 1440 and 390 px: horizontal overflow, console errors, failed requests (prefetches
   that abort are fine).
3. Look at each page as a stranger would.
4. Fix only through prompts to the same isolated session: at most two rounds, each logged. No hand-written code in an
   example.

## 7. Learn — the point of the run

1. Compare the Build Package with the built code, the way `docs/review-engine-2026-10-07.md` does.
2. Read the builder's final reply. Look for any deviation it named and any rule it worked around.
3. Write every gap into the BUILD-LOG under **Engine lessons**. Mark each one Fixed, Open or Process.
4. Fix in OpusKit every lesson that has a clean fix. Each fix gets a check.ts regression, and `npm run check` must pass.
5. Do not apply section feedback (decision 33: a build's better section comes back to `src/sections/`). List it in the
   PR for the user to approve.

## 8. Register

Follow §3 step 8 and `AGENTS.md`, "Showing one on the site":
1. Move the project into `examples/{slug}`.
2. Pin in `opuskit.json` whatever the engine has changed since the build, so its recipe still says what was built.
3. Add the entry to `src/data/examples.ts`.
4. Make the symlink `public/examples/{slug}`.
5. Save the card screenshot.
6. Run `npm run examples`.
7. Make the live export at `/live/{slug}`.
8. Click through it from the menu.
9. Run `npm run check`.

Then update the docs: §6 Progress, HANDOFF Now and Next, and the BUILD-LOG's registration section.

## 9. Commit, then the next site

1. Commit the site and its engine fixes in one commit on the night branch: `feat: #{n} {Name} — …`, ending with the
   Co-Authored-By line from the system prompt. Push the branch.
2. Then go back to step 1 for the next site, with this site's lessons already in the engine.
3. Stop when one of these happens:
   - two sites are done;
   - a check fails twice in a row;
   - the queue needs the user;
   - roughly five hours have passed.

## 10. The pull request — the morning report

Open one PR from the night branch to `main` with `gh pr create`. In it:
- each site: its live path, the recipe link to approve, palette and lettering with why, and the builder's named
  moments;
- the Engine lessons, each fixed with its check, or still open;
- what needs the user:
  - recipes to approve;
  - films;
  - screen recordings for clips;
  - section feedback to approve;
  - anything skipped and why;
- cost and time from each `claude -p` run.

End the PR description with the line the system prompt gives for pull requests. Never merge it yourself.
