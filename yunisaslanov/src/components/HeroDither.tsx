'use client'
import dynamic from 'next/dynamic'

// The dithered print loads late and client-only; the surface block underneath is its poster.
export const HeroDither = dynamic(() => import('@/components/pieces/ShaderDither').then((m) => m.ShaderDither), { ssr: false })
