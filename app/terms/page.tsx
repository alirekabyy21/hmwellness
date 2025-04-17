import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Terms & Conditions"
          description="Please read these terms carefully before using our services"
        />

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="prose max-w-4xl mx-auto">
              <p>Last updated: {new Date().toLocaleDateString()}</p>

              <h2>Introduction</h2>
              <p>
                These terms and conditions outline the rules and regulations for the use of HM Wellness's website and
                services. By accessing this website and using our services, we assume you accept these terms and
                conditions in full. Do not continue to use HM Wellness's website and services if you do not accept all
                of the terms and conditions stated on this page.
              </p>

              <h2>Services</h2>
              <p>
                HM Wellness provides life coaching services to clients. Our services include but are not limited to:
              </p>
              <ul>
                <li>One-on-one coaching sessions</li>
                <li>Group coaching sessions</li>
                <li>Workshops and seminars</li>
                <li>Digital content and resources</li>
              </ul>

              <h2>Booking and Cancellation</h2>
              <p>When booking a session with HM Wellness, you agree to the following terms:</p>
              <ul>
                <li>Full payment is required to confirm your booking.</li>
                <li>Cancellations made more than 24 hours before the scheduled session will receive a full refund.</li>
                <li>Cancellations made less than 24 hours before the scheduled session will not be refunded.</li>
                <li>
                  Rescheduling is available at no additional cost if requested at least 24 hours before the scheduled
                  session.
                </li>
                <li>
                  HM Wellness reserves the right to reschedule or cancel sessions in case of emergency or unforeseen
                  circumstances.
                </li>
              </ul>

              <h2>Payment</h2>
              <p>
                We accept various payment methods including credit/debit cards, bank transfers, and mobile payment
                services. All payments are processed securely through our payment processors. Prices are subject to
                change without notice, but any price changes will not affect already confirmed bookings.
              </p>

              <h2>Student Discounts</h2>
              <p>HM Wellness offers discounted rates for students in Egypt. To qualify for the student discount:</p>
              <ul>
                <li>You must be currently enrolled in an educational institution in Egypt.</li>
                <li>You must provide valid proof of student status (student ID or university email).</li>
                <li>Student status will be verified before the session is confirmed.</li>
                <li>
                  Misrepresentation of student status will result in cancellation of the booking and forfeiture of
                  payment.
                </li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                Unless otherwise stated, HM Wellness and/or its licensors own the intellectual property rights for all
                material on this website and in our services. All intellectual property rights are reserved. You may
                view and/or print pages from the website for your own personal use subject to restrictions set in these
                terms and conditions.
              </p>

              <h2>Limitations of Liability</h2>
              <p>
                HM Wellness's coaching services are not a substitute for professional medical, psychological, financial,
                or legal advice. We do not guarantee specific results from our coaching services. In no event shall HM
                Wellness be liable for any direct, indirect, incidental, special, or consequential damages arising out
                of or in any way connected with the use of our services.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of Egypt, and you
                irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                HM Wellness reserves the right to modify these terms at any time. We will notify clients of any
                significant changes. Your continued use of our services following the posting of changes to these terms
                will mean you accept those changes.
              </p>

              <h2>Contact Us</h2>
              <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
              <p>
                Email:{" "}
                <a href="mailto:info@hmwellness.com" className="text-primary">
                  info@hmwellness.com
                </a>
                <br />
                Phone: +20 123 456 7890
                <br />
                Address: 123 Coaching Street, Cairo, Egypt
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
