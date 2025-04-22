import crypto from "crypto"

// Kashier payment gateway configuration
export const kashierConfig = {
  merchantId: "MID-33722-173",
  apiKey: "75a1d1db-ce72-4e8c-92ac-c5d5b4a1f0dd",
  secretKey:
    "2d0ef469d6dce13a79a8f01beb657eca$77e043baa0750dc63359cb868d98c2d2a38a26fc2b7889975874567ec4a5173a7cdde8dd599718169d1bd17ee4c5a78e",
  baseUrl: "https://checkout.kashier.io",
  mode: "live", // Change to "live" for production
  currency: "EGP",
  display: "page", // or "page" for full page redirect
  successRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://hmwellness.site"}/payment/success`,
  failureRedirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://hmwellness.site"}/payment/failure`,
  webhookUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "https://hmwellness.site"}/api/payment/webhook`,
}

// Generate a unique order ID
export function generateOrderId(prefix = "HMW"): string {
  const timestamp = Date.now().toString()
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")
  return `${prefix}-${timestamp}-${random}`
}

// Generate hash for payment request
export function generatePaymentHash(
  merchantId: string,
  orderId: string,
  amount: number,
  currency: string,
  secretKey: string,
): string {
  // Format: merchantId + orderId + amount + currency + secretKey
  const dataToHash = `${merchantId}${orderId}${amount}${currency}${secretKey}`
  return crypto.createHash("sha256").update(dataToHash).digest("hex")
}

// Create payment URL with all required parameters
export function createPaymentUrl(
  orderId: string,
  amount: number,
  customerData?: {
    firstName?: string
    lastName?: string
    email?: string
    phoneNumber?: string
  },
  currency = "EGP",
): string {
  const { merchantId, apiKey, secretKey, baseUrl, mode, display, successRedirectUrl, failureRedirectUrl, webhookUrl } =
    kashierConfig

  // Generate hash
  const hash = generatePaymentHash(merchantId, orderId, amount, currency, secretKey)

  // Build customer data object if provided
  let customerParam = ""
  if (customerData) {
    const customer = {
      firstName: customerData.firstName || "",
      lastName: customerData.lastName || "",
      email: customerData.email || "",
      phoneNumber: customerData.phoneNumber || "",
    }
    customerParam = `&customer=${encodeURIComponent(JSON.stringify(customer))}`
  }

  // Build the payment URL with all required parameters
  const paymentUrl =
    `${baseUrl}/?` +
    `merchantId=${merchantId}` +
    `&orderId=${orderId}` +
    `&amount=${amount}` +
    `&currency=${currency}` +
    `&hash=${hash}` +
    `&mode=${mode}` +
    `&merchantRedirect=${encodeURIComponent(successRedirectUrl)}` +
    `&failureRedirect=${encodeURIComponent(failureRedirectUrl)}` +
    `&serverWebhook=${encodeURIComponent(webhookUrl)}` +
    `&display=${display}` +
    `&enable3DS=true` +
    `&interactionSource=Ecommerce` +
    customerParam

  return paymentUrl
}

// Parse and validate webhook data
export function validateWebhook(webhookData: any, signature: string): boolean {
  // Implement webhook validation logic here
  // This would verify the signature from Kashier to ensure the webhook is legitimate

  // For now, return true as a placeholder
  return true
}
