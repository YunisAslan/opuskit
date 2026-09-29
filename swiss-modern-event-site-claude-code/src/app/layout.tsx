import type { Metadata, Viewport } from "next"
import { ViewTransition } from "react"
import { Special_Gothic, Special_Gothic_Expanded_One } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { Footer } from "@/components/Footer"
import { SmoothScroll } from "@/components/SmoothScroll"
import { StickyRSVP } from "@/components/StickyRSVP"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { site } from "@/config/site"

const display = Special_Gothic_Expanded_One({ weight: "400", subsets: ["latin"], variable: "--font-sg-expanded", display: "swap", adjustFontFallback: false, fallback: ["Arial", "sans-serif"] })
const body = Special_Gothic({ subsets: ["latin"], axes: ["wdth"], variable: "--font-sg", display: "swap", adjustFontFallback: false, fallback: ["Arial", "sans-serif"] })

export const metadata: Metadata = {
  title: { default: `${site.event}, ${site.dates} | ${site.name}`, template: `%s | ${site.name}` },
  description: "Three days of polo on the grass ground in Sheki, 11–13 June 2027. Seats by RSVP.",
}

export const viewport: Viewport = { themeColor: "#FFFFFF" }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-svh overflow-x-clip">
        <TooltipProvider delayDuration={200}>
          <a href="#main" className="type-utility sr-only z-50 bg-background p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
            Skip to content
          </a>
          <Navigation />
          <ViewTransition>
            <main id="main">{children}</main>
          </ViewTransition>
          <Footer />
          <StickyRSVP />
          <SmoothScroll />
          <Toaster position="bottom-left" />
        </TooltipProvider>
      </body>
    </html>
  )
}
