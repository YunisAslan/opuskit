'use client'
import { useEffect } from 'react'
import { startSmoothScroll } from '@/lib/motion'

export function SmoothScroll() {
  useEffect(startSmoothScroll, [])
  return null
}
