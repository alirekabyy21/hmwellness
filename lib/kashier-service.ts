import crypto from "crypto"

export interface KashierConfig {
  apiKey: string
  merchantId: string
  testMode: boolean
}

export interface PaymentDetails {
  amount: number
  currency: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  description: string
  orderId: string
  redirectUrl: string
}

// This would be set from environment variables
const kashierConfig: KashierConfig = {
  apiKey: process.env.NEXT_PUBLIC_KASHIER_API_KEY || "",
  merchantId: process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID || "",
  testMode: process.env.NODE_ENV !== "production",
}

export async function createPaymentSession(details: PaymentDetails): Promise<string> {
  try {
    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(details.amount).toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${kashierConfig.merchantId}${formattedAmount}${details.currency}${details.orderId}`

    // Use HMAC-SHA256 with the secret key
    const signature = crypto.createHmac("sha256", kashierConfig.apiKey).update(signatureString).digest("hex")

    // Use the test environment endpoint
    const baseUrl = "https://checkout.kashier.io"

    // Construct the payment URL with all required parameters
    const paymentUrl = new URL(baseUrl)

    // Add required parameters
    paymentUrl.searchParams.append("merchantId", kashierConfig.merchantId)
    paymentUrl.searchParams.append("amount", formattedAmount)
    paymentUrl.searchParams.append("currency", details.currency)
    paymentUrl.searchParams.append("orderId", details.orderId)
    paymentUrl.searchParams.append("signature", signature)
    paymentUrl.searchParams.append("redirectUrl", details.redirectUrl)

    // Add mode parameter for test environment
    if (kashierConfig.testMode) {
      paymentUrl.searchParams.append("mode", "test")
    }

    // Add display language
    paymentUrl.searchParams.append("display", "en")

    // Add optional parameters if provided
    if (details.description) {
      paymentUrl.searchParams.append("description", details.description.substring(0, 120))
    }

    if (details.customerName) {
      const customerData = {
        name: details.customerName,
        email: details.customerEmail,
        phone: details.customerPhone || "",
      }
      paymentUrl.searchParams.append("customer", JSON.stringify(customerData))
    }

    return paymentUrl.toString()
  } catch (error) {
    console.error("Error creating Kashier payment session:", error)
    throw error
  }
}

export function getKashierScriptUrl(): string {
  return kashierConfig.testMode ? "https://test.kashier.io/kashier.js" : "https://checkout.kashier.io/kashier.js"
}

export async function verifyPayment(paymentId: string): Promise<boolean> {
  // In a real implementation, you would call the Kashier API to verify a payment
  console.log("Verifying payment with Kashier:", paymentId)

  // Return a mock result
  return true
}
