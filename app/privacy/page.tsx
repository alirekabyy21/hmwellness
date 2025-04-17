import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title="Privacy Policy" description="How we collect, use, and protect your information" />

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="prose max-w-4xl mx-auto">
              <p>Last updated: {new Date().toLocaleDateString()}</p>

              <h2>Introduction</h2>
              <p>
                At HM Wellness, we respect your privacy and are committed to protecting your personal data. This privacy
                policy will inform you about how we look after your personal data when you visit our website and tell
                you about your privacy rights and how the law protects you.
              </p>

              <h2>The Data We Collect About You</h2>
              <p>
                Personal data, or personal information, means any information about an individual from which that person
                can be identified. We may collect, use, store and transfer different kinds of personal data about you
                which we have grouped together as follows:
              </p>
              <ul>
                <li>
                  <strong>Identity Data</strong> includes first name, last name, username or similar identifier.
                </li>
                <li>
                  <strong>Contact Data</strong> includes email address, telephone numbers, and physical address.
                </li>
                <li>
                  <strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version,
                  time zone setting and location, browser plug-in types and versions, operating system and platform, and
                  other technology on the devices you use to access this website.
                </li>
                <li>
                  <strong>Profile Data</strong> includes your interests, preferences, feedback, and survey responses.
                </li>
                <li>
                  <strong>Usage Data</strong> includes information about how you use our website and services.
                </li>
              </ul>

              <h2>How We Use Your Personal Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal
                data in the following circumstances:
              </p>
              <ul>
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>
                  Where it is necessary for our legitimate interests (or those of a third party) and your interests and
                  fundamental rights do not override those interests.
                </li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally
                lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to
                your personal data to those employees, agents, contractors and other third parties who have a business
                need to know.
              </p>

              <h2>Data Retention</h2>
              <p>
                We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we
                collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or
                reporting requirements.
              </p>

              <h2>Your Legal Rights</h2>
              <p>
                Under certain circumstances, you have rights under data protection laws in relation to your personal
                data, including:
              </p>
              <ul>
                <li>The right to request access to your personal data.</li>
                <li>The right to request correction of your personal data.</li>
                <li>The right to request erasure of your personal data.</li>
                <li>The right to object to processing of your personal data.</li>
                <li>The right to request restriction of processing your personal data.</li>
                <li>The right to request transfer of your personal data.</li>
                <li>The right to withdraw consent.</li>
              </ul>

              <h2>Contact Us</h2>
              <p>If you have any questions about this privacy policy or our privacy practices, please contact us at:</p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@hmwellness.com" className="text-primary">
                  privacy@hmwellness.com
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
