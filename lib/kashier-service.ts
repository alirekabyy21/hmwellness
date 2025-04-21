import crypto from "crypto"

// Kashier payment service using iframe model
export interface KashierPaymentRequest {
  amount: number
  currency: string
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  customerReference: string // Added customer reference
  description?: string
  redirectUrl?: string
}

export interface KashierPaymentResponse {
  success: boolean
  error?: string
}

/**
 * Generates a hash for Kashier payment
 */
export function generateKashierHash(
  merchantId: string,
  orderId: string,
  amount: string,
  currency: string,
  secretKey: string,
): string {
  // Format: merchantId + orderId + amount + currency + secretKey
  const hashString = `${merchantId}${orderId}${amount}${currency}${secretKey}`
  return crypto.createHash("sha256").update(hashString).digest("hex")
}

/**
 * Prepares data for Kashier iframe integration
 */
export function prepareKashierData(request: KashierPaymentRequest): {
  merchantId: string
  orderId: string
  amount: string
  currency: string
  hash: string
  customerReference: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  description?: string
  redirectUrl?: string
} {
  // Get Kashier credentials from environment variables
  const merchantId = process.env.KASHIER_MERCHANT_ID || ""
  const secretKey = process.env.KASHIER_SECRET_KEY || ""

  if (!merchantId || !secretKey) {
    throw new Error("Missing Kashier credentials")
  }

  // Format amount to ensure it has 2 decimal places
  const formattedAmount = Number(request.amount).toFixed(2)

  // Generate hash
  const hash = generateKashierHash(merchantId, request.orderId, formattedAmount, request.currency, secretKey)

  // Return data for iframe
  return {
    merchantId,
    orderId: request.orderId,
    amount: formattedAmount,
    currency: request.currency,
    hash,
    customerReference: request.customerReference,
    customerName: request.customerName,
    customerEmail: request.customerEmail,
    customerPhone: request.customerPhone,
    description: request.description,
    redirectUrl: request.redirectUrl,
  }
}

/**
 * Verifies a Kashier payment
 */
export async function verifyKashierPayment(paymentId: string): Promise<boolean> {
  // In a real implementation, you would call the Kashier API to verify a payment
  console.log("Verifying payment with Kashier:", paymentId)
  return true
}
