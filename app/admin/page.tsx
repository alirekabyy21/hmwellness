import { Suspense } from "react"
import Link from "next/link"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getBookingStats, getBookings } from "@/lib/db-service"

async function DashboardStats() {
  const stats = await getBookingStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Lifetime bookings</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
          <p className="text-xs text-muted-foreground">Scheduled sessions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Clients</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">Unique clients</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalRevenue} EGP</div>
          <p className="text-xs text-muted-foreground">Total revenue</p>
        </CardContent>
      </Card>
    </div>
  )
}

async function RecentBookings() {
  const bookings = await getBookings()
  const recentBookings = bookings.slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Bookings</CardTitle>
        <CardDescription>Latest booking requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentBookings.map((booking) => (
            <div key={booking.id} className="flex items-center justify-between border-b pb-4">
              <div>
                <div className="font-medium">{booking.name}</div>
                <div className="text-sm text-muted-foreground">{booking.service}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {booking.date}, {booking.time}
                </div>
                <div
                  className={`text-sm ${
                    booking.status === "confirmed"
                      ? "text-green-500"
                      : booking.status === "cancelled"
                        ? "text-red-500"
                        : "text-yellow-500"
                  }`}
                >
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-4">
            <Link href="/admin/bookings">
              <Button variant="outline" size="sm">
                View all bookings
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
        <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleString()}</div>
      </div>

      <Suspense fallback={<div>Loading stats...</div>}>
        <DashboardStats />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <Suspense fallback={<div>Loading bookings...</div>}>
          <RecentBookings />
        </Suspense>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Link href="/admin/bookings/new">
                <Button className="w-full">Create New Booking</Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" className="w-full">
                  Manage Settings
                </Button>
              </Link>
              <Link href="/" target="_blank">
                <Button variant="outline" className="w-full">
                  View Website
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
