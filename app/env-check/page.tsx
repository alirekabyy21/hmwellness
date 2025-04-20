"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function EnvCheckPage() {
  const [serverEnvs, setServerEnvs] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkEnvs = async () => {
      try {
        const response = await fetch("/api/env-check")
        const data = await response.json()

        if (data.success) {
          setServerEnvs(data.envs)
        } else {
          setError(data.error || "Failed to check environment variables")
        }
      } catch (err) {
        console.error("Error checking environment variables:", err)
        setError((err as Error).message || "An unexpected error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    checkEnvs()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Environment Check" description="Check environment variables for payment integration" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Environment Variables Check</CardTitle>
                <CardDescription>
                  This page checks if the required environment variables are set correctly
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : serverEnvs ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Server Environment Variables</h3>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="font-medium">KASHIER_MERCHANT_ID</div>
                      <div>{serverEnvs.KASHIER_MERCHANT_ID ? "✅ Set" : "❌ Not set"}</div>

                      <div className="font-medium">KASHIER_SECRET_KEY</div>
                      <div>{serverEnvs.KASHIER_SECRET_KEY ? "✅ Set" : "❌ Not set"}</div>

                      <div className="font-medium">NEXT_PUBLIC_KASHIER_MERCHANT_ID</div>
                      <div>{serverEnvs.NEXT_PUBLIC_KASHIER_MERCHANT_ID ? "✅ Set" : "❌ Not set"}</div>
                    </div>

                    <div className="mt-4 p-4 bg-muted rounded-md">
                      <h4 className="text-sm font-medium mb-2">Client-Side Environment Variables</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="font-medium">NEXT_PUBLIC_KASHIER_MERCHANT_ID</div>
                        <div>{process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID ? "✅ Set" : "❌ Not set"}</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No environment data available</div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
