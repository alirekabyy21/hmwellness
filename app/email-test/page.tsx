"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, CheckCircle } from "lucide-react"

export default function EmailTestPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      setResult({ success: false, message: "Please enter an email address" })
      return
    }

    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch(`/api/send-email?to=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (data.success) {
        setResult({ success: true, message: "Test email sent successfully!" })
      } else {
        setResult({ success: false, message: data.error || "Failed to send test email" })
      }
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-b from-[#f8f9ff] to-[#f0f4ff]">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 bg-[#e8edff] border-b border-[#d1dbff]">
          <div className="flex items-center">
            <div className="bg-[#5d6bb0] p-3 rounded-full text-white mr-4">
              <Mail className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold text-[#5d6bb0]">Email Test</h1>
          </div>
        </div>

        <div className="p-6">
          <p className="mb-6 text-[#6b7280]">
            Use this form to test the email functionality. Enter an email address below to receive a test email.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5d6bb0]">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-[#d1dbff] focus:border-[#5d6bb0] focus:ring-[#5d6bb0]"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-[#5d6bb0] hover:bg-[#4a5899] text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Test Email"
              )}
            </Button>
          </form>

          {result && (
            <Alert className={`mt-6 ${result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <div className="flex items-center">
                {result.success ? (
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <Mail className="h-4 w-4 text-red-500 mr-2" />
                )}
                <AlertDescription className={result.success ? "text-green-800" : "text-red-800"}>
                  {result.message}
                </AlertDescription>
              </div>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}
