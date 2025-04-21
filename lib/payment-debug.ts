export function logPaymentDetails(details: any) {
  // Create a safe copy of the details without sensitive information
  const safeDetails = { ...details }

  // Remove any sensitive information
  if (safeDetails.apiKey) safeDetails.apiKey = "[REDACTED]"
  if (safeDetails.secretKey) safeDetails.secretKey = "[REDACTED]"

  // Log the payment details
  console.log("Payment Details:", JSON.stringify(safeDetails, null, 2))

  return {
    timestamp: new Date().toISOString(),
    orderId: details.orderId || "unknown",
    amount: details.amount || 0,
    currency: details.currency || "unknown",
    merchantId: details.merchantId || "unknown",
    redirectUrl: details.redirectUrl || "unknown",
  }
}

// Function to log payment responses
export function logPaymentResponse(response: any) {
  console.log("Payment Response:", JSON.stringify(response, null, 2))

  return {
    timestamp: new Date().toISOString(),
    success: response.success || false,
    message: response.message || "",
    error: response.error || "",
    paymentId: response.paymentId || "unknown",
  }
}
