"use client"

import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function CalendarSetupSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="mx-auto max-w-2xl bg-bg-light border-primary">
          <CardHeader>
            <div className="mx-auto rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-center text-2xl text-primary">Google Calendar Setup Complete!</CardTitle>
            <CardDescription className="text-center text-lg">
              Your Google Calendar integration has been successfully set up.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p>
              The refresh token has been generated. Please copy it from the console and add it to your environment
              variables or config file.
            </p>
            <div className="rounded-lg border p-4 bg-white">
              <h3 className="font-medium text-primary">Next Steps</h3>
              <ol className="mt-3 space-y-2 text-left list-decimal list-inside">
                <li>Copy the refresh token from the console logs</li>
                <li>Add it to your environment variables as GOOGLE_REFRESH_TOKEN</li>
                <li>Restart your application for the changes to take effect</li>
              </ol>
            </div>
            <p className="text-sm text-muted-foreground">
              Note: The refresh token is only shown once. If you lose it, you'll need to repeat the authorization
              process.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild className="w-full max-w-xs">
              <Link href="/admin">Return to Admin Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
