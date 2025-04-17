"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function PaymentForm({ amount, bookingDetails }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState("")
  const router = useRouter()

  const handlePayment = async () => {
    setIsProcessing(true)
    setPaymentError("")

    try {
      // Save booking details to database first
      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      })

      if (!bookingResponse.ok) {
        const bookingData = await bookingResponse.json()
        throw new Error(bookingData.error || "Failed to save booking")
      }

      const bookingData = await bookingResponse.json()

      // Initialize payment with Kashier
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          description: `Booking for ${bookingDetails.service}`,
          email: bookingDetails.email,
          name: bookingDetails.name,
          bookingId: bookingData.id,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Payment setup failed")
      }

      // Redirect to Kashier payment page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        \
        throw new Error("No payment  {
        window.location.href = data.paymentUrl
      }
      else
      throw new Error("No payment URL received")
    } catch (error) {
      setPaymentError(error.message)
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      {paymentError && (
        <Alert variant="destructive">
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}

      <div className="p-4 border rounded-md bg-gray-50">
        <h3 className="font-medium mb-2">Payment Summary</h3>
        <p className="text-gray-600 mb-1">Service: {bookingDetails.service || "Coaching Session"}</p>
        <p className="text-gray-600 mb-1">Date: {bookingDetails.date}</p>
        <p className="text-gray-600 mb-1">Time: {bookingDetails.time}</p>
        <p className="text-gray-600 mb-4">Name: {bookingDetails.name}</p>
        <p className="text-xl font-bold">
          Total:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "EGP",
          }).format(amount)}
        </p>
      </div>

      <Button onClick={handlePayment} disabled={isProcessing} className="w-full">
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Proceed to Payment"
        )}
      </Button>

      <p className="text-sm text-gray-500 text-center mt-2">You will be redirected to Kashier's secure payment page</p>
    </div>
  )
}
