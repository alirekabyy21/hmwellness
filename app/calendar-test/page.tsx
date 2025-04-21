"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CalendarTestPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [result, setResult] = useState<any>(null)

  const testCalendarIntegration = async () => {
    setStatus("loading")

    try {
      const response = await fetch("/api/calendar/test")
      const data = await response.json()

      setResult(data)
      setStatus(data.success ? "success" : "error")
    } catch (error) {
      console.error("Error testing Calendar integration:", error)
      setResult({ error: error instanceof Error ? error.message : "Unknown error" })
      setStatus("error")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Calendar Integration Test"
          description="Test Google Calendar API integration"
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl">
              <CardHeader>
                <CardTitle>Google Calendar Integration Test</CardTitle>
                <CardDescription>
                  This page tests if your Google Calendar integration is working correctly by creating a test event
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="bg-yellow-50 border-yellow-200 text-yellow-800">
                  <AlertDescription>
                    <p className="font-medium">Warning: This will create a real test event in your Google Calendar!</p>
                    <p className="mt-2">
                      The test event will be scheduled for tomorrow and will include a Google Meet link.
                    </p>
                  </AlertDescription>
                </Alert>

                {status === "loading" ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : status === "success" ? (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <AlertDescription>
                      <p className="font-medium">Google Calendar integration is working correctly!</p>
                      <p className="mt-2">A test event was successfully created in your calendar.</p>

                      {result?.testEvent && (
                        <div className="mt-4 p-3 bg-white rounded-md">
                          <h4 className="font-medium">Test Event Details</h4>
                          <p className="mt-1">
                            <strong>Event ID:</strong> {result.testEvent.id}
                          </p>
                          <p>
                            <strong>Summary:</strong> {result.testEvent.summary}
                          </p>
                          {result.testEvent.meetingLink && (
                            <p>
                              <strong>Meeting Link:</strong>{" "}
                              <a
                                href={result.testEvent.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary underline"
                              >
                                {result.testEvent.meetingLink}
                              </a>
                            </p>
                          )}
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : status === "error" ? (
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertDescription>
                      <p className="font-medium">Google Calendar integration test failed!</p>
                      <p className="mt-2">Please check your environment variables and Google Cloud Console settings.</p>
                      {result?.error && <p className="mt-2 text-sm font-mono bg-red-100 p-2 rounded">{result.error}</p>}
                      {result?.details && (
                        <p className="mt-2 text-sm font-mono bg-red-100 p-2 rounded">{result.details}</p>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : null}

                {result?.success && result?.calendars && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Available Calendars</h3>
                    <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-md max-h-40 overflow-auto">
                      {result.calendars.map((cal: any, index: number) => (
                        <div key={index} className="p-2 border-b last:border-b-0">
                          <p>
                            <strong>ID:</strong> {cal.id}
                          </p>
                          <p>
                            <strong>Name:</strong> {cal.summary}
                          </p>
                          {cal.primary && <p className="text-primary font-medium">Primary Calendar</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={testCalendarIntegration} disabled={status === "loading"} className="w-full">
                  {status === "loading" ? "Testing..." : "Create Test Calendar Event"}
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
