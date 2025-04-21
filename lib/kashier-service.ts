import crypto from "crypto"

export interface KashierConfig {
  merchantId: string
  apiKey: string
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
  customerReference?: string
}

// Get Kashier credentials from environment variables
const getKashierConfig = (): KashierConfig => {
  const merchantId = process.env.KASHIER_MERCHANT_ID || process.env.NEXT_PUBLIC_KASHIER_MERCHANT_ID
  const apiKey = process.env.KASHIER_SECRET_KEY || process.env.NEXT_PUBLIC_KASHIER_API_KEY

  if (!merchantId || !apiKey) {
    throw new Error("Missing Kashier credentials")
  }

  return {
    merchantId,
    apiKey,
  }
}

// Generate a hash for Kashier payment
export function generateKashierHash(
  merchantId: string,
  amount: string,
  currency: string,
  orderId: string,
  apiKey: string,
): string {
  // Format: merchantId + amount + currency + orderId + apiKey
  const hashString = `${merchantId}${amount}${currency}${orderId}${apiKey}`
  return crypto.createHash("sha256").update(hashString).digest("hex")
}

// Create a payment URL for Kashier
export function createKashierPaymentUrl(details: PaymentDetails): string {
  try {
    // Get Kashier credentials
    const config = getKashierConfig()

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(details.amount).toFixed(2)

    // Generate hash
    const hash = generateKashierHash(
      config.merchantId,
      formattedAmount,
      details.currency,
      details.orderId,
      config.apiKey,
    )

    // Create customer data
    const customerData = {
      name: details.customerName,
      email: details.customerEmail,
      phone: details.customerPhone || "",
    }

    // Construct the payment URL - always use live mode
    const baseUrl = "https://checkout.kashier.io"

    // Build the URL with required parameters
    let paymentUrl = `${baseUrl}?merchantId=${config.merchantId}&orderId=${details.orderId}&amount=${formattedAmount}&currency=${details.currency}&hash=${hash}&merchantRedirect=${encodeURIComponent(details.redirectUrl)}&display=en&type=external`

    // Add optional parameters
    if (details.description) {
      paymentUrl += `&description=${encodeURIComponent(details.description.substring(0, 120))}`
    }

    if (details.customerReference) {
      paymentUrl += `&customerReference=${encodeURIComponent(details.customerReference)}`
    }

    paymentUrl += `&customer=${encodeURIComponent(JSON.stringify(customerData))}`

    // Log the payment URL for debugging
    console.log("Generated Kashier payment URL:", paymentUrl)

    return paymentUrl
  } catch (error) {
    console.error("Error creating Kashier payment URL:", error)
    throw error
  }
}

// Verify a Kashier payment
export async function verifyKashierPayment(paymentId: string): Promise<boolean> {
  // In a real implementation, you would call the Kashier API to verify a payment
  console.log("Verifying payment with Kashier:", paymentId)
  return true
}

export function prepareKashierData(details: PaymentDetails) {
  try {
    // Get Kashier credentials
    const config = getKashierConfig()

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(details.amount).toFixed(2)

    // Generate hash
    const hash = generateKashierHash(
      config.merchantId,
      formattedAmount,
      details.currency,
      details.orderId,
      config.apiKey,
    )

    return {
      merchantId: config.merchantId,
      amount: formattedAmount,
      currency: details.currency,
      orderId: details.orderId,
      hash: hash,
      customerReference: details.customerReference || details.orderId,
      customerName: details.customerName,
      customerEmail: details.customerEmail,
      customerPhone: details.customerPhone || "",
      description: details.description || "Coaching Session",
      redirectUrl: details.redirectUrl,
    }
  } catch (error) {
    console.error("Error preparing Kashier data:", error)
    throw error
  }
}
