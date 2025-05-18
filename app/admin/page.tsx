"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, FileEdit, LayoutDashboard, LogOut, Settings, Users, Users2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminConfig } from "../config"
import { calendarConfig } from "../config"

export default function AdminPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === adminConfig.username && password === adminConfig.password) {
      setIsLoggedIn(true)
      setError("")
    } else {
      setError("Invalid username or password")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUsername("")
    setPassword("")
  }

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-light">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-primary">Admin Login</CardTitle>
            <CardDescription>Login to access the admin dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/" className="text-sm text-primary hover:underline">
                Return to Website
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "LayoutDashboard":
        return <LayoutDashboard className="h-5 w-5" />
      case "Calendar":
        return <Calendar className="h-5 w-5" />
      case "Users":
        return <Users className="h-5 w-5" />
      case "FileEdit":
        return <FileEdit className="h-5 w-5" />
      case "Users2":
        return <Users2 className="h-5 w-5" />
      case "Settings":
        return <Settings className="h-5 w-5" />
      default:
        return <LayoutDashboard className="h-5 w-5" />
    }
  }

  return (
    <div className="flex min-h-screen bg-bg-light">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold text-primary">Admin Dashboard</h2>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            {adminConfig.sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveTab(section.id)}
                  className={`flex w-full items-center rounded-md px-3 py-2 text-sm font-medium ${
                    activeTab === section.id ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {getIcon(section.icon)}
                  <span className="ml-3">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t">
        <div className="grid grid-cols-5 gap-1 p-2">
          {adminConfig.sections.slice(0, 5).map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex flex-col items-center justify-center rounded-md p-2 text-xs ${
                activeTab === section.id ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {getIcon(section.icon)}
              <span className="mt-1">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="flex h-14 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="flex items-center md:hidden">
            <h2 className="text-lg font-semibold text-primary">Admin Dashboard</h2>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="outline" size="sm" className="md:hidden" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="hidden">
              {adminConfig.sections.map((section) => (
                <TabsTrigger key={section.id} value={section.id}>
                  {section.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">+2 from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">6,400 EGP</div>
                    <p className="text-xs text-muted-foreground">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">8</div>
                    <p className="text-xs text-muted-foreground">+2 new clients this month</p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 text-sm text-muted-foreground">
                        <div>Name</div>
                        <div>Date</div>
                        <div>Status</div>
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <div>Ahmed Hassan</div>
                        <div>May 15, 2024</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Confirmed
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <div>Sara Ahmed</div>
                        <div>May 17, 2024</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <div>Mohamed Ali</div>
                        <div>May 20, 2024</div>
                        <div>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Confirmed
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Workshops</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 text-sm text-muted-foreground">
                        <div>Workshop</div>
                        <div>Date</div>
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <div>Finding Your Purpose</div>
                        <div>June 15, 2024</div>
                      </div>
                      <div className="grid grid-cols-2 items-center">
                        <div>Stress Management</div>
                        <div>July 8, 2024</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
                <Button>Add New</Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Manage your scheduled coaching sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 text-sm text-muted-foreground">
                      <div>Client</div>
                      <div>Date</div>
                      <div>Time</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Ahmed Hassan</div>
                      <div>May 15, 2024</div>
                      <div>10:00 AM</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Confirmed
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Sara Ahmed</div>
                      <div>May 17, 2024</div>
                      <div>2:00 PM</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Pending
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Mohamed Ali</div>
                      <div>May 20, 2024</div>
                      <div>11:00 AM</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Confirmed
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="clients" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
                <Button>Add Client</Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Client List</CardTitle>
                  <CardDescription>Manage your client information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 text-sm text-muted-foreground">
                      <div>Name</div>
                      <div>Email</div>
                      <div>Phone</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Ahmed Hassan</div>
                      <div>ahmed@example.com</div>
                      <div>+20 123 456 7890</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Active
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Sara Ahmed</div>
                      <div>sara@example.com</div>
                      <div>+20 123 456 7891</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Active
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Mohamed Ali</div>
                      <div>mohamed@example.com</div>
                      <div>+20 123 456 7892</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Active
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Website Content</h2>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Edit Website Content</CardTitle>
                  <CardDescription>Manage the content displayed on your website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      To edit your website content, you need to modify the config.ts file. This file contains all the
                      text, images, and settings for your website.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Home Page</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            Edit Home Page
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">About Page</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            Edit About Page
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Services Page</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            Edit Services Page
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Workshops Page</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full">
                            Edit Workshops Page
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workshops" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Workshops</h2>
                <Button>Add Workshop</Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Workshops</CardTitle>
                  <CardDescription>Manage your scheduled workshops and events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-5 text-sm text-muted-foreground">
                      <div>Title</div>
                      <div>Date</div>
                      <div>Location</div>
                      <div>Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Finding Your Purpose Workshop</div>
                      <div>June 15, 2024</div>
                      <div>Online via Zoom</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Scheduled
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Stress Management Masterclass</div>
                      <div>July 8, 2024</div>
                      <div>Online via Zoom</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Scheduled
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-5 items-center">
                      <div>Goal Setting & Achievement Retreat</div>
                      <div>August 20-21, 2024</div>
                      <div>Cairo Marriott Hotel</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          Planning
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Workshop Registrations</CardTitle>
                  <CardDescription>View and manage workshop registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 text-sm text-muted-foreground">
                      <div>Name</div>
                      <div>Workshop</div>
                      <div>Payment Status</div>
                      <div>Actions</div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                      <div>Laila Mohamed</div>
                      <div>Finding Your Purpose Workshop</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Paid
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center">
                      <div>Omar Khaled</div>
                      <div>Finding Your Purpose Workshop</div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Pending
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Website Settings</CardTitle>
                  <CardDescription>Manage your website settings and configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="site-name">Website Name</Label>
                        <Input id="site-name" defaultValue="HM Wellness" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coach-name">Coach Name</Label>
                        <Input id="coach-name" defaultValue="Hagar Moharam" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Contact Email</Label>
                        <Input id="email" defaultValue="hello@hmwellness.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Contact Phone</Label>
                        <Input id="phone" defaultValue="+20 123 456 7890" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue="123 Wellness Street, Cairo, Egypt" />
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure your payment methods and pricing</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="student-price">Student Price (EGP)</Label>
                        <Input id="student-price" type="number" defaultValue="400" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="regular-price">Regular Price (EGP)</Label>
                        <Input id="regular-price" type="number" defaultValue="600" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="international-price">International Price (USD)</Label>
                        <Input id="international-price" type="number" defaultValue="30" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bank-details">Bank Transfer Details</Label>
                      <Textarea
                        id="bank-details"
                        defaultValue="Bank: Example Bank
Account Name: HM Wellness
Account Number: 1234567890
IBAN: EG123456789012345678901234"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="qr-code">Payment QR Code</Label>
                      <div className="flex items-center gap-4">
                        <img
                          src="/placeholder.svg?height=100&width=100"
                          alt="Payment QR Code"
                          className="h-24 w-24 border"
                        />
                        <Button variant="outline">Upload New QR Code</Button>
                      </div>
                    </div>
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Update your admin account credentials</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="admin-username">Admin Username</Label>
                        <Input id="admin-username" defaultValue="admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="admin-password">New Password</Label>
                        <Input id="admin-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <Button>Update Credentials</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">Google Calendar Integration</h2>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Google Calendar Setup</CardTitle>
                  <CardDescription>Connect your Google Calendar to automatically manage appointments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Current Status</h3>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`h-3 w-3 rounded-full ${calendarConfig.credentials.refreshToken ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <p>{calendarConfig.credentials.refreshToken ? "Connected" : "Not Connected"}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Setup Instructions</h3>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>Go to the Google Cloud Console</li>
                      <li>Create a new project</li>
                      <li>Enable the Google Calendar API</li>
                      <li>Create OAuth 2.0 credentials</li>
                      <li>Add the credentials to your environment variables</li>
                      <li>Click the "Connect Google Calendar" button below</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Environment Variables</h3>
                    <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto">
                      GOOGLE_CLIENT_ID=your-client-id
                      <br />
                      GOOGLE_CLIENT_SECRET=your-client-secret
                      <br />
                      GOOGLE_REDIRECT_URI=https://your-domain.com/api/auth/callback/google
                      <br />
                      GOOGLE_REFRESH_TOKEN=generated-after-authorization
                    </pre>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/api/auth/google">Connect Google Calendar</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
