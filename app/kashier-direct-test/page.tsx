"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { KashierPaymentButton } from "@/components/kashier-payment-button"

export default function KashierDirectTestPage() {
  const [amount, setAmount] = useState(10)
  const [currency, setCurrency] = useState("EGP")
  const [orderId, setOrderId] = useState(`TEST-${Date.now()}`)
  const [customerName, setCustomerName] = useState("Test Customer")
  const [customerEmail, setCustomerEmail] = useState("test@example.com")
  const [customerPhone, setCustomerPhone] = useState("+201234567890")

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Kashier Payment Test</CardTitle>
          <CardDescription>Test the Kashier payment integration directly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={1}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="EGP">EGP</option>
              <option value="USD">USD</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="orderId">Order ID</Label>
            <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerEmail">Customer Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customerPhone">Customer Phone</Label>
            <Input id="customerPhone" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
          </div>
        </CardContent>
        <CardFooter>
          <KashierPaymentButton
            amount={amount}
            currency={currency}
            orderId={orderId}
            description="Test Payment"
            customerName={customerName}
            customerEmail={customerEmail}
            customerPhone={customerPhone}
            redirectUrl={`${process.env.NEXT_PUBLIC_BASE_URL || "https://hmwellness.site"}/book/confirmation`}
            className="w-full"
          >
            Pay {currency} {amount}
          </KashierPaymentButton>
        </CardFooter>
      </Card>
    </div>
  )
}
