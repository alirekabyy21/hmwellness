import { v4 as uuidv4 } from "uuid"

export interface PaymentDetails {
  id: string
  orderId: string
  amount: number
  currency: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  status: "pending" | "completed" | "failed"
  createdAt: string
}

// In-memory storage for payments (in a real app, this would be a database)
const payments: Record<string, PaymentDetails> = {}

export function createPayment(details: Omit<PaymentDetails, "id" | "status" | "createdAt">): PaymentDetails {
  const id = uuidv4()
  const createdAt = new Date().toISOString()

  const payment: PaymentDetails = {
    id,
    ...details,
    status: "pending",
    createdAt,
  }

  // Store the payment
  payments[id] = payment

  return payment
}

export function getPayment(id: string): PaymentDetails | null {
  return payments[id] || null
}

export function updatePaymentStatus(id: string, status: "pending" | "completed" | "failed"): PaymentDetails | null {
  const payment = payments[id]
  if (!payment) return null

  payment.status = status
  return payment
}

export function getPaymentByOrderId(orderId: string): PaymentDetails | null {
  return Object.values(payments).find((payment) => payment.orderId === orderId) || null
}
