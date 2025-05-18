import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { siteConfig } from "./config"
import { isMainSiteEnabled } from "@/lib/feature-flags"
import { WorkshopLayout } from "@/components/workshop-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check if the main site is enabled
  const showMainSite = isMainSiteEnabled()

  return (
    <html lang="en">
      <body className={inter.className}>{showMainSite ? children : <WorkshopLayout />}</body>
    </html>
  )
}
