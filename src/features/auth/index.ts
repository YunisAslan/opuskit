'use client'
// ponytail: local mock auth (no password check, no server). Replace signIn/signUp with Supabase Auth; UI stays the same.
import { KEYS, useStored, write } from '@/lib/store'

export type User = { email: string; name: string }
const NOBODY: User | null = null

export const useUser = () => useStored<User | null>(KEYS.user, NOBODY)

export const auth = {
  signUp(name: string, email: string) { write(KEYS.user, { name: name.trim() || email.split('@')[0], email: email.trim().toLowerCase() }) },
  signIn(email: string) { write(KEYS.user, { name: email.split('@')[0], email: email.trim().toLowerCase() }) },
  signOut() { write(KEYS.user, null) },
}
