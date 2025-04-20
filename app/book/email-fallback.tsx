"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Copy, Mail } from "lucide-react"

interface EmailFallbackProps {
  name: string
  email: string
  date: string
  timeSlot: string
  open: boolean
  onClose: () => void
}

export function EmailFallback({ name, email, date, timeSlot, open, onClose }: EmailFallbackProps) {
  const [copied, setCopied] = useState(false)

  const emailSubject = `Your Coaching Session Confirmation - ${date} at ${timeSlot}`
  const emailBody = `
Hello ${name},

Your 60-Minute Coaching Session with Hagar Moharam has been confirmed for ${date} at ${timeSlot}.

Session Details:
- Service: 60-Minute Coaching Session
- Date: ${date}
- Time: ${timeSlot}

Please join the meeting 5 minutes before the scheduled time. If you need to reschedule or cancel, please do so at least 24 hours in advance.

Looking forward to our session!

Warm regards,
Hagar Moharam
HM Wellness
  `

  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Confirmation</DialogTitle>
          <DialogDescription>
            The automatic email system is currently unavailable. Please use one of the methods below to send the
            confirmation email.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Alert>
            <AlertDescription>
              <p className="text-sm">
                The booking has been confirmed, but we couldn't send an automatic email. Please use one of these options
                to send the confirmation.
              </p>
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Option 1: Send via your email client</h3>
            <Button asChild variant="outline" className="w-full">
              <a href={mailtoLink} target="_blank" rel="noopener noreferrer">
                <Mail className="mr-2 h-4 w-4" />
                Open in Email Client
              </a>
            </Button>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Option 2: Copy the email content</h3>
            <div className="relative">
              <pre className="bg-muted p-3 rounded-md text-xs whitespace-pre-wrap">{emailBody}</pre>
              <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            {copied && <p className="text-xs text-green-600">Copied to clipboard!</p>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
