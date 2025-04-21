"use client"

import { useState } from "react"
import { Search, Download, Filter, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isViewingPayment, setIsViewingPayment] = useState(false)

  // Mock data for payments
  const payments = [
    {
      id: "PAY-001",
      clientName: "Sarah Johnson",
      email: "sarah@example.com",
      amount: 600,
      currency: "EGP",
      status: "completed",
      date: "2023-10-15",
      paymentMethod: "Credit Card",
      orderId: "ORD-001",
    },
    {
      id: "PAY-002",
      clientName: "Ahmed Hassan",
      email: "ahmed@example.com",
      amount: 600,
      currency: "EGP",
      status: "completed",
      date: "2023-10-20",
      paymentMethod: "Credit Card",
      orderId: "ORD-002",
    },
    {
      id: "PAY-003",
      clientName: "Mona Ali",
      email: "mona@example.com",
      amount: 600,
      currency: "EGP",
      status: "pending",
      date: "2023-10-25",
      paymentMethod: "Bank Transfer",
      orderId: "ORD-003",
    },
    {
      id: "PAY-004",
      clientName: "Khaled Mohamed",
      email: "khaled@example.com",
      amount: 30,
      currency: "USD",
      status: "completed",
      date: "2023-10-10",
      paymentMethod: "PayPal",
      orderId: "ORD-004",
    },
    {
      id: "PAY-005",
      clientName: "Laila Ibrahim",
      email: "laila@example.com",
      amount: 600,
      currency: "EGP",
      status: "failed",
      date: "2023-10-22",
      paymentMethod: "Credit Card",
      orderId: "ORD-005",
    },
  ]

  // Filter payments based on search query and status filter
  const filteredPayments = payments.filter(
    (payment) =>
      (payment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "all" || payment.status === statusFilter),
  )

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsViewingPayment(true)
  }

  const handleExportPayments = () => {
    // In a real app, you would generate a CSV file and download it
    alert("Exporting payments...")
  }

  // Calculate total revenue
  const totalRevenue = payments
    .filter((payment) => payment.status === "completed")
    .reduce((total, payment) => {
      if (payment.currency === "EGP") {
        return total + payment.amount
      } else if (payment.currency === "USD") {
        // Convert USD to EGP (assuming 1 USD = 30 EGP)
        return total + payment.amount * 30
      }
      return total
    }, 0)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Payments</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search payments..."
              className="w-[250px] pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportPayments}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString()} EGP</div>
            <p className="text-xs text-muted-foreground">From {payments.length} payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.filter((p) => p.status === "completed").length}</div>
            <p className="text-xs text-muted-foreground">
              {((payments.filter((p) => p.status === "completed").length / payments.length) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{payments.filter((p) => p.status === "pending").length}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">{payment.id}</TableCell>
                <TableCell>
                  <div>{payment.clientName}</div>
                  <div className="text-sm text-muted-foreground">{payment.email}</div>
                </TableCell>
                <TableCell>
                  {payment.amount} {payment.currency}
                </TableCell>
                <TableCell>
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                      payment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : payment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {payment.status}
                  </div>
                </TableCell>
                <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                <TableCell>{payment.paymentMethod}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleViewPayment(payment)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={isViewingPayment} onOpenChange={setIsViewingPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
            <DialogDescription>Detailed information about this payment.</DialogDescription>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment ID</h3>
                  <p>{selectedPayment.id}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Order ID</h3>
                  <p>{selectedPayment.orderId}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Client Name</h3>
                  <p>{selectedPayment.clientName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p>{selectedPayment.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                  <p>
                    {selectedPayment.amount} {selectedPayment.currency}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <div
                    className={`text-xs px-2 py-0.5 rounded-full inline-block ${
                      selectedPayment.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : selectedPayment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedPayment.status}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                  <p>{new Date(selectedPayment.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Payment Method</h3>
                  <p>{selectedPayment.paymentMethod}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Payment Actions</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Send Receipt
                  </Button>
                  <Button variant="outline" size="sm">
                    Issue Refund
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
