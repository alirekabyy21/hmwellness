import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { siteConfig } from "./config"
import { isFeatureEnabled } from "@/lib/feature-flags"
import { WorkshopLayout } from "@/components/workshop-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["life coach", "wellness", "coaching", "personal development", "egypt", "online coaching", "workshop"],
  authors: [
    {
      name: siteConfig.coachName,
      url: "https://hmwellness.com",
    },
  ],
  creator: siteConfig.coachName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hmwellness.com",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: `@${siteConfig.name.replace(/\s+/g, "").toLowerCase()}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://hmwellness.com/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check if the main site is enabled
  const mainSiteEnabled = isFeatureEnabled("MAIN_SITE_ENABLED")

  // If the main site is disabled, show only the workshop page
  if (!mainSiteEnabled) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <WorkshopLayout />
          </ThemeProvider>
        </body>
      </html>
    )
  }

  // Otherwise, show the regular site
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
