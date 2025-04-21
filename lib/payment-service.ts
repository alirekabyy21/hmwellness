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

// Update the kashierConfig to ensure it's using live mode in production
const kashierConfig: KashierConfig = {
  apiKey: process.env.KASHIER_SECRET_KEY || "",
  merchantId: process.env.KASHIER_MERCHANT_ID || "",
  testMode: false, // Always use live mode
}

// Update the createPaymentSession function to ensure it's using the live URL
export async function createPaymentSession(details: PaymentDetails): Promise<string> {
  try {
    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(details.amount).toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${kashierConfig.merchantId}${formattedAmount}${details.currency}${details.orderId}`

    // Use HMAC-SHA256 with the secret key
    const signature = crypto.createHmac("sha256", kashierConfig.apiKey).update(signatureString).digest("hex")

    // Use the live environment endpoint
    const baseUrl = "https://checkout.kashier.io/"

    // Construct the payment URL with all required parameters
    const paymentUrl = new URL(baseUrl)

    // Add required parameters
    paymentUrl.searchParams.append("merchantId", kashierConfig.merchantId)
    paymentUrl.searchParams.append("amount", formattedAmount)
    paymentUrl.searchParams.append("currency", details.currency)
    paymentUrl.searchParams.append("orderId", details.orderId)
    paymentUrl.searchParams.append("signature", signature)
    paymentUrl.searchParams.append("redirectUrl", details.redirectUrl)

    // Remove test mode parameter completely
    // No mode=test parameter should be added

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

    console.log("Generated payment URL:", paymentUrl.toString())

    return paymentUrl.toString()
  } catch (error) {
    console.error("Error creating Kashier payment session:", error)
    throw error
  }
}

// Update the getKashierScriptUrl function to always return the live URL
export function getKashierScriptUrl(): string {
  return "https://checkout.kashier.io/kashier.js"
}

export async function verifyPayment(paymentId: string): Promise<boolean> {
  // In a real implementation, you would call the Kashier API to verify a payment
  console.log("Verifying payment with Kashier:", paymentId)

  // Return a mock result
  return true
}
