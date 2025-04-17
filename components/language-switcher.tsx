"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const [language, setLanguage] = useState<"en" | "ar">("en")

  const handleLanguageChange = (newLanguage: "en" | "ar") => {
    setLanguage(newLanguage)
    // In a real implementation, this would change the language throughout the site
    // For now, we'll just update the state
    document.documentElement.lang = newLanguage
    document.documentElement.dir = newLanguage === "ar" ? "rtl" : "ltr"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={className}>
          <Globe className="h-4 w-4" />
          <span className="sr-only">Switch language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleLanguageChange("en")}
          className={language === "en" ? "bg-primary/10 text-primary" : ""}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleLanguageChange("ar")}
          className={language === "ar" ? "bg-primary/10 text-primary" : ""}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
