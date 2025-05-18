"use client"

import { useLanguage } from "@/contexts/language-context"

interface PageHeaderProps {
  title: string | { en: string; ar: string }
  description?: string | { en: string; ar: string }
  className?: string
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  const { t, isRTL } = useLanguage()

  return (
    <section
      className={`w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-bg-light to-bg-medium ${className} ${
        isRTL ? "rtl" : "ltr"
      }`}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-primary">{t(title)}</h1>
            {description && (
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t(description)}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
