import type { BuildTargetId } from '@/types/domain'

/** The tools a recipe can be built with, as the user sees them. */
export const TARGETS: [BuildTargetId, string, string][] = [
  ['not-sure', 'Decide later', 'Choose your tool on the result page'],
  ['lovable', 'Lovable', 'Build it by chatting — no code needed'], ['v0', 'v0', 'Paste one prompt, get a site'],
  ['claude-code', 'Claude Code', 'An AI assistant that writes the code for you'], ['cursor', 'Cursor', 'An AI code editor, for people who code a little'],
  ['own-code', 'I’ll code it myself', 'Full design notes, colors and fonts as code'],
]
