import type { CSSProperties } from 'react'

/** Delay index for a .rv / .rv-img / .rv-text child inside <Reveal>. */
export const i = (n: number) => ({ '--i': n }) as CSSProperties
