"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { sendEmail, generateTestEmail } from "@/lib/email-service"
import { siteConfig } from "@/app/config"

export default function EmailTestPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSendTest = async () => {
    if (!email) {
      setStatus("error")
      setMessage("Please enter an email address")
      return
    }

    setStatus("loading")
    setMessage("Sending test email...")

    try {
      const success = await sendEmail({
        to: email,
        subject: "Test Email from HM Wellness",
        html: generateTestEmail(),
      })

      if (success) {
        setStatus("success")
        setMessage("Test email sent successfully! Please check your inbox.")
      } else {
        setStatus("error")
        setMessage("Failed to send test email. Please check the console for more details.")
      }
    } catch (error) {
      console.error("Error in test email:", error)
      setStatus("error")
      setMessage(`Error: ${error instanceof Error ? error.message : "Unknown error"}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Email Test"
          description="Test the email functionality of the website"
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-md">
              <CardHeader>
                <CardTitle>Email Test Tool</CardTitle>
                <CardDescription>Send a test email to verify the email functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {status !== "idle" && (
                    <Alert
                      className={`p-3 rounded-md ${
                        status === "loading"
                          ? "bg-blue-50 text-blue-700"
                          : status === "success"
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-700"
                      }`}
                    >
                      <AlertDescription>{message}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Email Configuration</h3>
                    <div className="text-xs space-y-1 bg-gray-50 p-3 rounded-md">
                      <p>
                        <strong>Domain:</strong> {siteConfig.domain}
                      </p>
                      <p>
                        <strong>Email:</strong> {siteConfig.email}
                      </p>
                      <p>
                        <strong>EMAIL_SERVER_HOST:</strong> {process.env.EMAIL_SERVER_HOST ? "✓ Set" : "✗ Not set"}
                      </p>
                      <p>
                        <strong>EMAIL_SERVER_PORT:</strong> {process.env.EMAIL_SERVER_PORT ? "✓ Set" : "✗ Not set"}
                      </p>
                      <p>
                        <strong>EMAIL_SERVER_USER:</strong> {process.env.EMAIL_SERVER_USER ? "✓ Set" : "✗ Not set"}
                      </p>
                      <p>
                        <strong>EMAIL_FROM_ADDRESS:</strong> {process.env.EMAIL_FROM_ADDRESS ? "✓ Set" : "✗ Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Email Template Preview</h3>
                    <div className="border rounded-md p-3 max-h-40 overflow-auto">
                      <div dangerouslySetInnerHTML={{ __html: generateTestEmail() }} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSendTest} disabled={status === "loading"} className="w-full">
                  {status === "loading" ? "Sending..." : "Send Test Email"}
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
