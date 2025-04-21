"use client";
import { useState } from 'react'
import BookingForm from "@/components/booking-form"

export default function BookingPage() {
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendTestEmail = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'test-email@example.com', // Change to the email you'd like to test with
          subject: 'Test Booking Confirmation',
          html: '<h1>Your booking has been confirmed for testing!</h1>',
        }),
      })

      const data = await response.json()

      if (data.success) {
        setEmailSent(true)
        console.log('Test email sent successfully:', data.messageId)
      } else {
        setEmailSent(false)
        setError('Failed to send test email')
      }
    } catch (err) {
      console.error('Error in email API request:', err)
      setError('An error occurred while sending the email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Book Your Session</h1>
            <p className="mt-4 text-lg text-gray-500">
              Take the first step towards transformation by scheduling your session with Hagar Moharam.
            </p>
          </div>

          {/* Add the booking form component */}
          <BookingForm />

          {/* Test Email Button */}
          <div className="mt-6">
            <button 
              onClick={sendTestEmail} 
              className="px-6 py-2 bg-blue-600 text-white rounded-md" 
              disabled={loading}
            >
              {loading ? 'Sending Test Email...' : 'Send Test Email'}
            </button>
          </div>

          {/* Success/Error Messages */}
          {emailSent && <p className="mt-4 text-green-600">Test email sent successfully!</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  )
}
