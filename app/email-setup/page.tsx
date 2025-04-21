import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { siteConfig } from "@/app/config"

export default function EmailSetupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader
          title="Email Setup Guide"
          description="Configure your email service for HM Wellness"
          className="bg-gradient-to-r from-bg-light to-bg-medium"
        />

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <Card className="mx-auto max-w-3xl">
              <CardHeader>
                <CardTitle>Email Configuration Guide</CardTitle>
                <CardDescription>
                  Follow these steps to set up your email service for {siteConfig.domain}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertDescription>
                    <p className="font-medium">
                      You've purchased the domain {siteConfig.domain} and set up the email address {siteConfig.email}.
                    </p>
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 1: Set Environment Variables</h3>
                  <p>
                    Add the following environment variables to your Vercel project. These are needed for the email
                    service to work correctly:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-md font-mono text-sm overflow-auto">
                    <p>EMAIL_SERVER_HOST=mail.hmwellness.site</p>
                    <p>EMAIL_SERVER_PORT=465</p>
                    <p>EMAIL_SERVER_USER=hagar@hmwellness.site</p>
                    <p>EMAIL_SERVER_PASSWORD=your_email_password</p>
                    <p>EMAIL_FROM="HM Wellness" &lt;hagar@hmwellness.site&gt;</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Note: Replace "your_email_password" with the actual password for your email account.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 2: Test Your Email Configuration</h3>
                  <p>
                    After setting up the environment variables, you can test your email configuration by visiting the{" "}
                    <a href="/email-test" className="text-primary font-medium">
                      Email Test
                    </a>{" "}
                    page.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 3: Troubleshooting</h3>
                  <p>If you encounter issues with sending emails, check the following:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Verify that all environment variables are set correctly in your Vercel project.</li>
                    <li>
                      Make sure your email provider allows sending emails from applications (some providers may block
                      this for security reasons).
                    </li>
                    <li>
                      Check if you need to enable "Less secure apps" or create an "App Password" in your email settings.
                    </li>
                    <li>Verify that the port (465 for SSL or 587 for TLS) is correct for your email provider.</li>
                    <li>Check the Vercel logs for any error messages related to email sending.</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Step 4: Update Website Content</h3>
                  <p>
                    Make sure your new domain and email are reflected throughout your website. The main configuration is
                    in <code>app/config.ts</code>, but you may need to update other files as well.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
