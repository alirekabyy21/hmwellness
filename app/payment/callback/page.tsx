"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, XCircle } from "lucide-react"

export default function PaymentCallback() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    // Get payment status from URL parameters
    const paymentStatus = searchParams.get("status")
    const orderId = searchParams.get("merchantOrderId")

    if (paymentStatus === "success") {
      setStatus("success")
      setMessage("Your payment was successful! Your booking has been confirmed.")

      // Here you would typically verify the payment with your backend
      // and update your database with the confirmed booking
      fetch(`/api/bookings/confirm?orderId=${orderId}`, {
        method: "POST",
      }).catch(console.error)
    } else {
      setStatus("error")
      setMessage("Payment was not successful. Please try again.")
    }
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          {status === "loading" ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : status === "success" ? (
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="mx-auto h-16 w-16 text-red-500" />
          )}
        </div>

        <h1 className="text-2xl font-bold mt-6 mb-2 text-center">
          {status === "success" ? "Payment Successful" : status === "error" ? "Payment Failed" : "Processing Payment"}
        </h1>

        <p className="text-gray-700 mb-6 text-center">{message}</p>

        <div className="flex justify-center">
          <Link href="/" passHref>
            <Button>{status === "success" ? "Return to Home" : "Try Again"}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
