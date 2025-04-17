import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function PaymentSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Payment Successful"
          description="Thank you for your payment"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl bg-bg-light border-primary">
              <CardHeader>
                <div className="mx-auto rounded-full bg-green-100 p-3 mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-center text-2xl text-primary">
                  Payment Successful!
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  Your booking has been confirmed.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p>
                  We've sent a confirmation email with all the details of your
                  booking.
                </p>
                <div className="rounded-lg border p-4 bg-white">
                  <h3 className="font-medium text-primary">What's Next?</h3>
                  <ol className="mt-3 space-y-2 text-left list-decimal list-inside">
                    <li>Check your email for booking confirmation</li>
                    <li>Add the session to your calendar</li>
                    <li>Prepare for your coaching session</li>
                    <li>
                      Join the Zoom meeting link sent to your email at the
                      scheduled time
                    </li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button asChild className="w-full max-w-xs">
                  <Link href="/">Return to Homepage</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
