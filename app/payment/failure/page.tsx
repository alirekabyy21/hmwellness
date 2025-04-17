import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function PaymentFailurePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title={{ en: "Payment Failed", ar: "فشلت عملية الدفع" }}
          description={{ en: "There was an issue with your payment", ar: "كانت هناك مشكلة في الدفع الخاص بك" }}
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl bg-bg-light border-red-200">
              <CardHeader>
                <div className="mx-auto rounded-full bg-red-100 p-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-center text-2xl text-red-600">Payment Failed</CardTitle>
                <CardDescription className="text-center text-lg">We couldn't process your payment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p>Your payment was not successful. This could be due to:</p>
                <ul className="text-left list-disc list-inside">
                  <li>Insufficient funds</li>
                  <li>Card declined by your bank</li>
                  <li>Incorrect card information</li>
                  <li>Technical issues with the payment gateway</li>
                </ul>
                <p>
                  Don't worry, your booking information is saved. You can try again or use an alternative payment
                  method.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button asChild className="w-full">
                  <Link href="/book">Try Again</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/contact">Contact Support</Link>
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
