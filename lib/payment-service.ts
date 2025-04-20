import crypto from "crypto"

// Define the payment details interface
export interface PaymentDetails {
  amount: number
  currency: string
  orderId: string
  customerName: string
  customerEmail: string
  redirectUrl: string
}

// Create a function to generate a payment URL
export async function createPaymentUrl(details: PaymentDetails): Promise<string> {
  try {
    // Get Kashier credentials from environment variables
    const merchantId = process.env.KASHIER_MERCHANT_ID
    const secretKey = process.env.KASHIER_SECRET_KEY

    if (!merchantId || !secretKey) {
      console.error("Missing Kashier credentials:", {
        merchantIdExists: !!merchantId,
        secretKeyExists: !!secretKey,
      })
      throw new Error("Missing Kashier credentials")
    }

    // Format amount to ensure it has 2 decimal places
    const formattedAmount = Number(details.amount).toFixed(2)

    // Generate signature using HMAC-SHA256
    // Format: merchantId + amount + currency + orderId
    const signatureString = `${merchantId}${formattedAmount}${details.currency}${details.orderId}`
    const signature = crypto.createHmac("sha256", secretKey).update(signatureString).digest("hex")

    // Create the payment URL
    const paymentUrl = new URL("https://checkout.kashier.io")

    // Add required parameters
    paymentUrl.searchParams.append("merchantId", merchantId)
    paymentUrl.searchParams.append("amount", formattedAmount)
    paymentUrl.searchParams.append("currency", details.currency)
    paymentUrl.searchParams.append("orderId", details.orderId)
    paymentUrl.searchParams.append("signature", signature)

    // Always use test mode for now
    paymentUrl.searchParams.append("mode", "test")

    // Add redirect URL
    paymentUrl.searchParams.append("redirectUrl", details.redirectUrl)

    // Set display language to English
    paymentUrl.searchParams.append("display", "en")

    // Add customer data
    const customerData = {
      name: details.customerName,
      email: details.customerEmail,
    }
    paymentUrl.searchParams.append("customer", JSON.stringify(customerData))

    console.log("Generated payment URL:", paymentUrl.toString())

    return paymentUrl.toString()
  } catch (error) {
    console.error("Error creating payment URL:", error)
    throw error
  }
}
