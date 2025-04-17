"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { languageConfig } from "@/app/config"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  direction: "ltr" | "rtl"
  t: (key: any) => string
  isRTL: boolean
}

// Create a default translation function that handles objects and strings
const defaultTranslate = (key: any): string => {
  if (!key) return ""
  if (typeof key === "string") return key
  return key["en"] || ""
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  direction: "ltr",
  t: defaultTranslate,
  isRTL: false,
})

export const useLanguage = () => useContext(LanguageContext)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState("en")
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Function to translate text
  const t = (key: any): string => {
    if (!key) return ""
    if (typeof key === "string") return key
    return key[language] || key["en"] || ""
  }

  // Set language and store in localStorage
  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem("preferred_language", lang)

    // Set direction based on language
    const langConfig = languageConfig.availableLanguages.find((l) => l.code === lang)
    if (langConfig) {
      setDirection(langConfig.direction as "ltr" | "rtl")
      document.documentElement.dir = langConfig.direction
      document.documentElement.lang = lang
    }
  }

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const storedLanguage = localStorage.getItem("preferred_language")
    const hasVisitedBefore = localStorage.getItem("has_visited_before")

    if (storedLanguage) {
      setLanguage(storedLanguage)
    } else if (!hasVisitedBefore && languageConfig.askOnFirstVisit) {
      // Show language selection modal for first-time visitors
      setShowLanguageModal(true)
      localStorage.setItem("has_visited_before", "true")
    } else {
      // Default to browser language or English
      try {
        const browserLang = navigator.language.split("-")[0]
        const isSupported = languageConfig.availableLanguages.some((l) => l.code === browserLang)
        setLanguage(isSupported ? browserLang : "en")
      } catch (error) {
        // Fallback to English if there's an error
        setLanguage("en")
      }
    }

    setIsInitialized(true)
  }, [])

  // Don't render children until language is initialized
  if (!isInitialized) {
    return <div className="flex h-screen w-full items-center justify-center">Loading...</div>
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction, t, isRTL: direction === "rtl" }}>
      {showLanguageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Choose Your Language / اختر لغتك</h2>
            <div className="grid grid-cols-2 gap-4">
              {languageConfig.availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  className="rounded-md border border-primary/20 p-4 text-center hover:bg-primary/10"
                  onClick={() => {
                    setLanguage(lang.code)
                    setShowLanguageModal(false)
                  }}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {children}
    </LanguageContext.Provider>
  )
}
