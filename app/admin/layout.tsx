import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { LayoutDashboard, Calendar, Users, CreditCard, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getSession } from "@/lib/auth-service"

export const metadata: Metadata = {
  title: "Admin Dashboard | Hagar Moharam",
  description: "Admin dashboard for managing bookings, clients, and payments",
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check if user is authenticated
  const session = await getSession()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-primary/10 border-r">
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-2 px-2 py-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              HM
            </div>
            <span className="font-semibold text-primary">Admin Dashboard</span>
          </div>

          <nav className="space-y-1 mt-8 flex-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/20 text-primary"
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/bookings"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/20 text-primary"
            >
              <Calendar size={18} />
              <span>Bookings</span>
            </Link>
            <Link
              href="/admin/clients"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/20 text-primary"
            >
              <Users size={18} />
              <span>Clients</span>
            </Link>
            <Link
              href="/admin/payments"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/20 text-primary"
            >
              <CreditCard size={18} />
              <span>Payments</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-primary/20 text-primary"
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
          </nav>

          <form
            action={async () => {
              "use server"
              await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/logout`, {
                method: "POST",
              })
              redirect("/admin/login")
            }}
            className="mt-auto pt-4 border-t"
          >
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-100"
            >
              <LogOut size={18} className="mr-2" />
              <span>Logout</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
