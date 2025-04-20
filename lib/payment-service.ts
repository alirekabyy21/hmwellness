import crypto from "crypto"

export interface PaymentDetails {
  amount: number
  currency: string
  orderId: string
  customerName: string
  customerEmail: string
  redirectUrl: string
}

export function createPaymentUrl(details: PaymentDetails): string {
  try {
    // Get Kashier credentials
    const merchantId = process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
    const apiKey = process.env.NEXT_PUBLIC_KASHIER_API_KEY

    if (!merchantId || !apiKey) {
      throw new Error("Missing Kashier credentials")
    }

    // Generate hash
    const hashString = `${details.amount}${details.currency}${details.orderId}${merchantId}${apiKey}`
    const hash = crypto.createHash("sha256").update(hashString).digest("hex")

    // Create the payment URL
    let paymentUrl = `https://payments.kashier.io?merchantId=${merchantId}&orderId=${details.orderId}&amount=${details.amount}&currency=${details.currency}&hash=${hash}&mode=test&merchantRedirect=${encodeURIComponent(details.redirectUrl)}&display=en&type=external`

    // Add customer data if provided
    if (details.customerName && details.customerEmail) {
      const customerData = {
        name: details.customerName,
        email: details.customerEmail,
      }

      paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`
    }

    return paymentUrl
  } catch (error) {
    console.error("Error creating payment URL:", error)
    throw error
  }
}
