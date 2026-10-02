'use client'
// Keeps the sign-up form (react-hook-form + zod) out of the first load: its code is fetched on the first "Start free".
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const Signup = dynamic(() => import('./Signup').then((m) => m.Signup), { ssr: false })

export function SignupLoader() {
  const [wanted, setWanted] = useState(false)
  useEffect(() => {
    const on = () => setWanted(true)
    addEventListener('hexmint:start', on, { once: true })
    return () => removeEventListener('hexmint:start', on)
  }, [])
  return wanted ? <Signup initiallyOpen /> : null
}
