"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function GoogleAuthTestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)

  const testGoogleAuth = async () => {
    setStatus("loading")

    try {
      const response = await fetch("/api/google-auth")
      const data = await response.json()

      setResult(data)
      setStatus(data.success ? "success" : "error")
    } catch (error) {
      console.error("Error testing Google Auth:", error)
      setResult({ error: error instanceof Error ? error.message : "Unknown error" })
      setStatus("error")
    }
  }

  useEffect(() => {
    // Automatically test on page load
    testGoogleAuth()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Google Auth Test"
          description="Test Google Calendar API authentication"
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Google OAuth2 Authentication Test</CardTitle>
                <CardDescription>
                  This page tests if your Google OAuth2 credentials are properly configured
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {status === "loading" ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : status === "success" ? (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertDescription>
                      <p className="font-medium">Google OAuth2 credentials are valid!</p>
                      <p className="mt-2">Your Google Calendar integration should work correctly.</p>
                    </AlertDescription>
                  </Alert>
                ) : status === "error" ? (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertDescription>
                      <p className="font-medium">Google OAuth2 credentials are invalid or missing!</p>
                      <p className="mt-2">Please check your environment variables and Google Cloud Console settings.</p>
                      {result?.error && <p className="mt-2 text-sm font-mono bg-red-100 p-2 rounded">{result.error}</p>}
                      {result?.missingCredentials && (
                        <div className="mt-2">
                          <p className="font-medium">Missing credentials:</p>
                          <ul className="list-disc pl-5 mt-1">
                            {result.missingCredentials.clientId && <li>GOOGLE_CLIENT_ID</li>}
                            {result.missingCredentials.clientSecret && <li>GOOGLE_CLIENT_SECRET</li>}
                            {result.missingCredentials.refreshToken && <li>GOOGLE_REFRESH_TOKEN</li>}
                          </ul>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : null}

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Environment Variables</h3>
                  <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-md">
                    <p>
                      <strong>GOOGLE_CLIENT_ID:</strong> {process.env.GOOGLE_CLIENT_ID ? "✓ Set" : "✗ Not set"}
                    </p>
                    <p>
                      <strong>GOOGLE_CLIENT_SECRET:</strong> {process.env.GOOGLE_CLIENT_SECRET ? "✓ Set" : "✗ Not set"}
                    </p>
                    <p>
                      <strong>GOOGLE_REFRESH_TOKEN:</strong> {process.env.GOOGLE_REFRESH_TOKEN ? "✓ Set" : "✗ Not set"}
                    </p>
                    <p>
                      <strong>GOOGLE_CALENDAR_ID:</strong> {process.env.GOOGLE_CALENDAR_ID ? "✓ Set" : "✗ Not set"}
                    </p>
                  </div>
                </div>

                {result?.success && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Authentication Details</h3>
                    <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-md">
                      <p>
                        <strong>Access Token Expiry:</strong>{" "}
                        {result.accessTokenExpiry ? new Date(result.accessTokenExpiry).toLocaleString() : "N/A"}
                      </p>
                      <p>
                        <strong>Scopes:</strong>{" "}
                        {result.scopes?.length > 0 ? result.scopes.join(", ") : "No scopes found"}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={testGoogleAuth} disabled={status === "loading"} className="w-full">
                  {status === "loading" ? "Testing..." : "Test Google Authentication"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
