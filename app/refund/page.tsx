import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function RefundPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Refund Policy" description="Our policy regarding refunds and cancellations" />

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="prose max-w-4xl mx-auto">
              <p>Last updated: {new Date().toLocaleDateString()}</p>

              <h2>Refund Policy</h2>
              <p>
                At HM Wellness, we strive to provide high-quality coaching services that meet your expectations. We
                understand that circumstances may arise that require you to cancel or reschedule your session. This
                refund policy outlines the terms and conditions for refunds and cancellations.
              </p>

              <h2>Cancellation and Refund Terms</h2>
              <h3>Individual Sessions</h3>
              <ul>
                <li>
                  <strong>More than 24 hours notice:</strong> If you cancel more than 24 hours before your scheduled
                  session, you will receive a full refund of the session fee.
                </li>
                <li>
                  <strong>Less than 24 hours notice:</strong> If you cancel less than 24 hours before your scheduled
                  session, no refund will be provided. However, at our discretion, we may offer to reschedule the
                  session once as a courtesy.
                </li>
                <li>
                  <strong>No-shows:</strong> If you fail to attend your scheduled session without prior notice, no
                  refund will be provided and the session will be considered used.
                </li>
              </ul>

              <h3>Package Purchases</h3>
              <ul>
                <li>
                  <strong>Unused sessions:</strong> If you purchase a package of sessions and decide not to continue
                  after using some sessions, you may request a partial refund for the unused sessions. The used sessions
                  will be charged at the individual session rate, and the difference will be refunded.
                </li>
                <li>
                  <strong>Cooling-off period:</strong> If you purchase a package and change your mind within 7 days of
                  purchase (before using any sessions), you may request a full refund.
                </li>
              </ul>

              <h3>Workshops and Group Programs</h3>
              <ul>
                <li>
                  <strong>More than 7 days notice:</strong> If you cancel more than 7 days before the workshop or
                  program start date, you will receive a full refund.
                </li>
                <li>
                  <strong>3-7 days notice:</strong> If you cancel between 3 and 7 days before the workshop or program
                  start date, you will receive a 50% refund.
                </li>
                <li>
                  <strong>Less than 3 days notice:</strong> If you cancel less than 3 days before the workshop or
                  program start date, no refund will be provided.
                </li>
              </ul>

              <h2>Rescheduling Policy</h2>
              <p>We understand that schedules can change. Our rescheduling policy is as follows:</p>
              <ul>
                <li>
                  You may reschedule a session at no additional cost if requested at least 24 hours before the scheduled
                  session time.
                </li>
                <li>
                  Rescheduling requests made less than 24 hours before the session may be accommodated at our
                  discretion, but are not guaranteed.
                </li>
                <li>Each session may be rescheduled a maximum of two times.</li>
              </ul>

              <h2>Exceptional Circumstances</h2>
              <p>
                We recognize that exceptional circumstances beyond your control (such as medical emergencies, family
                emergencies, etc.) may occur. In such cases, please contact us as soon as possible, and we will work
                with you to find a reasonable solution, which may include rescheduling or providing a refund regardless
                of the notice period.
              </p>

              <h2>How to Request a Refund</h2>
              <p>
                To request a refund, please contact us at{" "}
                <a href="mailto:refunds@hmwellness.com" className="text-primary">
                  refunds@hmwellness.com
                </a>{" "}
                with the following information:
              </p>
              <ul>
                <li>Your full name</li>
                <li>Date and time of the scheduled session</li>
                <li>Reason for cancellation</li>
                <li>Your preferred refund method</li>
              </ul>
              <p>
                We will process your refund request within 5-7 business days. Refunds will be issued using the original
                payment method when possible.
              </p>

              <h2>Our Right to Cancel</h2>
              <p>
                HM Wellness reserves the right to cancel or reschedule sessions due to illness, emergency, or other
                unforeseen circumstances. In such cases, you will be offered the choice of rescheduling or receiving a
                full refund, regardless of when the cancellation occurs.
              </p>

              <h2>Contact Us</h2>
              <p>If you have any questions about our refund policy, please contact us at:</p>
              <p>
                Email:{" "}
                <a href="mailto:refunds@hmwellness.com" className="text-primary">
                  refunds@hmwellness.com
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
