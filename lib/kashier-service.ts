import crypto from "crypto"

// Kashier payment service based on official Kashier NodeJS demo
export interface KashierPaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  redirectUrl: string
  allowedMethods?: string[] // Payment methods to allow
}

export interface KashierPaymentResponse {
  success: boolean
  paymentUrl: string
  error?: string
}

// This would be set from environment variables
const kashierConfig = {
  apiKey: process.env.NEXT_PUBLIC_KASHIER_API_KEY || "",
  merchantId: process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || "",
  testMode: process.env.NODE_ENV !== "production",
}

/**
 * Creates a payment session with Kashier
 * Based on the official Kashier NodeJS demo
 */
export async function createKashierPayment(request: KashierPaymentRequest): Promise<KashierPaymentResponse> {
  try {
    // Get Kashier credentials from environment variables
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const secretKey = process.env.KASHIER_SECRET_KEY

    if (!merchantId || !secretKey) {
      throw new Error("Missing Kashier credentials")
    }

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(request.amount).toFixed(2)

    // Generate hash according to Kashier documentation
    // Format: merchantId + orderId + amount + currency + secretKey
    const hashString = `${merchantId}${request.orderId}${formattedAmount}${request.currency}${secretKey}`
    const hash = crypto.createHash("sha256").update(hashString).digest("hex")

    // Create customer data object
    const customerData = {
      name: request.customerName,
      email: request.customerEmail,
      phone: request.customerPhone || "",
    }

    // Build the payment URL with all required parameters
    const baseUrl = "https://checkout.kashier.io"

    // Start building the URL with required parameters
    let paymentUrl = `${baseUrl}?merchantId=${merchantId}&orderId=${request.orderId}&amount=${formattedAmount}&currency=${request.currency}&hash=${hash}&display=en`

    // Add redirect URL
    paymentUrl += `&merchantRedirect=${encodeURIComponent(request.redirectUrl)}`

    // Add customer data
    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    // Add allowed payment methods (cards and wallets only)
    paymentUrl += "&allowedMethods=card,wallet"

    // Add type parameter for external checkout
    paymentUrl += "&type=external"

    console.log("Generated Kashier payment URL:", paymentUrl)

    return {
      success: true,
      paymentUrl,
    }
  } catch (error) {
    console.error("Error creating Kashier payment:", error)
    return {
      success: false,
      paymentUrl: "",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

export function getKashierScriptUrl(): string {
  return kashierConfig.testMode ? "https://test.kashier.io/kashier.js" : "https://checkout.kashier.io/kashier.js"
}

/**
 * Verifies a Kashier payment
 * This would be used to verify the payment status after redirect
 */
export async function verifyKashierPayment(paymentId: string): Promise<boolean> {
  // In a real implementation, you would call the Kashier API to verify a payment
  console.log("Verifying payment with Kashier:", paymentId)
  return true
}
