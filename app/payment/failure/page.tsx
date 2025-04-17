import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

const message = {
  title: "Payment Failed",
  description: "There was an issue with your payment",
  failureReasons: [
    "Insufficient funds",
    "Card declined by your bank",
    "Incorrect card information",
    "Technical issues with the payment gateway"
  ],
  tryAgain: "Try Again",
  contactSupport: "Contact Support"
}

export default function PaymentFailurePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title={message.title}
          description={message.description}
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-2xl bg-white border-red-200 shadow-lg">
              <CardHeader>
                <div className="mx-auto rounded-full bg-red-100 p-3 mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-center text-2xl text-red-600">{message.title}</CardTitle>
                <CardDescription className="text-center text-lg text-gray-700">{message.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-center">
                <p>{message.description}</p>
                <ul className="text-left list-disc list-inside mx-auto text-base text-gray-700">
                  {message.failureReasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
                <p>
                  Don't worry, your booking information is saved. You can try again or use an alternative payment method.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col md:flex-row justify-center gap-4">
                <Button asChild className="w-full md:w-auto">
                  <Link href="/payment">{message.tryAgain}</Link>
                </Button>
                <Button asChild className="w-full md:w-auto">
                  <Link href="/contact-support">{message.contactSupport}</Link>
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
