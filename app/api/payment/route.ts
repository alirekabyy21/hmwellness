// app/api/kashier/checkout/route.ts (for App Router)

import { NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      amount,
      currency = "EGP",
      customerName,
      customerEmail,
      customerPhone = "",
      description,
      orderId,
    } = body

    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || ""
    const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY || ""
    const testMode = process.env.NODE_ENV !== "production"
    const redirectUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/book/confirmation?orderId=${orderId}`

    const formattedAmount = Number(amount).toFixed(2)
    const signatureString = `${merchantId}${formattedAmount}${currency}${orderId}`

    const signature = crypto.createHmac("sha256", apiKey)
      .update(signatureString)
      .digest("hex")

    const paymentUrl = new URL("https://checkout.kashier.io")
    paymentUrl.searchParams.append("merchantId", merchantId)
    paymentUrl.searchParams.append("amount", formattedAmount)
    paymentUrl.searchParams.append("currency", currency)
    paymentUrl.searchParams.append("orderId", orderId)
    paymentUrl.searchParams.append("signature", signature)
    paymentUrl.searchParams.append("redirectUrl", redirectUrl)
    paymentUrl.searchParams.append("mode", testMode ? "test" : "live")
    paymentUrl.searchParams.append("display", "en")
    paymentUrl.searchParams.append("description", encodeURIComponent(description))

    const customerData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
    }

    paymentUrl.searchParams.append("customer", encodeURIComponent(JSON.stringify(customerData)))

    return NextResponse.json({ url: paymentUrl.toString() })
  } catch (error) {
    console.error("Payment session error:", error)
    return NextResponse.json({ error: "Failed to create payment URL" }, { status: 500 })
  }
}
