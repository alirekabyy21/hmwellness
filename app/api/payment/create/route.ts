import { type NextRequest, NextResponse } from "next/server"
import { createPaymentUrl, generateOrderId } from "@/lib/payment"
import { pricingConfig } from "@/app/config"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, customerData, promoCode, isInternational } = body

    // Validate amount
    if (!amount || isNaN(Number.parseFloat(amount)) || Number.parseFloat(amount) <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Verify promo code if provided
    let finalAmount = Number.parseFloat(amount)
    let discountApplied = false

    if (promoCode && promoCode === pricingConfig.studentPromo.code && !isInternational) {
      // Verify the amount matches the expected discounted price
      const expectedPrice = pricingConfig.tiers.egypt.regular - pricingConfig.studentPromo.discount
      if (Math.abs(finalAmount - expectedPrice) > 0.01) {
        // If there's a mismatch, use the correct discounted price
        finalAmount = expectedPrice
      }
      discountApplied = true
    } else if (isInternational) {
      // For international clients, verify the amount matches the expected price
      const expectedPrice = pricingConfig.international
      if (Math.abs(finalAmount - expectedPrice) > 0.01) {
        // If there's a mismatch, use the correct international price
        finalAmount = expectedPrice
      }
    } else {
      // For regular clients, verify the amount matches the expected price
      const expectedPrice = pricingConfig.tiers.egypt.regular
      if (Math.abs(finalAmount - expectedPrice) > 0.01) {
        // If there's a mismatch, use the correct regular price
        finalAmount = expectedPrice
      }
    }

    // Generate a unique order ID
    const orderId = generateOrderId()

    // Create payment URL
    const paymentUrl = createPaymentUrl(orderId, finalAmount, customerData, isInternational ? "USD" : "EGP")

    return NextResponse.json({
      success: true,
      orderId,
      paymentUrl,
      amount: finalAmount,
      currency: isInternational ? "USD" : "EGP",
      discountApplied,
    })
  } catch (error) {
    console.error("Payment creation error:", error)
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
