import type { Metadata } from "next"
import NewsletterTest from "@/components/newsletter-test"

export const metadata: Metadata = {
  title: "EmailJS Test | Life with Style Admin",
  description: "Test EmailJS configuration for newsletter system",
}

export default function NewsletterTestPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">EmailJS Test</h1>
              <p className="text-gray-600">Test your EmailJS configuration for newsletter system</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <NewsletterTest />
      </div>
    </div>
  )
}
