import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PageHeader } from "@/components/layout/page-header"
import { legalContent } from "../config"

export default function TermsPage() {
  const { terms } = legalContent

  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <PageHeader title={terms.title} />

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <p className="text-muted-foreground">Last updated: {terms.lastUpdated}</p>
              </div>

              {terms.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-primary">{section.title}</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                </div>
              ))}

              <div className="mt-12 pt-8 border-t">
                <p className="text-muted-foreground">
                  If you have any questions about these Terms and Conditions, please contact us at{" "}
                  <Link href={`mailto:${legalContent.email}`} className="text-primary hover:underline">
                    {legalContent.email}
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
