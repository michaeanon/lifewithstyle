"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="pt-24 pb-16">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Privacy Policy</h1>
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-muted-foreground mb-8">Last Updated: April 16, 2025</p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-medium mb-4">Introduction</h2>
                  <p>
                    Life With Style ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                    explains how we collect, use, disclose, and safeguard your information when you visit our website
                    lifewithstyle.com (the "Website") or use our services.
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy
                    Policy, please do not access the Website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Information We Collect</h2>
                  <p>We collect information that you provide directly to us when you:</p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>Register for an account</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Fill out a form</li>
                    <li>Participate in surveys or contests</li>
                    <li>Communicate with us via third-party social media sites</li>
                    <li>Request customer support</li>
                  </ul>

                  <p>The types of information we may collect include:</p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>Your name, email address, postal address, phone number, and other contact information</li>
                    <li>Your username and password</li>
                    <li>Your preferences and interests</li>
                    <li>Any other information you choose to provide</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Information Collected Automatically</h2>
                  <p>
                    When you visit our Website, we may use cookies, web beacons, tracking pixels, and other tracking
                    technologies to collect information about your browsing activities. This information may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>Your IP address</li>
                    <li>Browser type</li>
                    <li>Operating system</li>
                    <li>Pages you view</li>
                    <li>Time spent on pages</li>
                    <li>Links you click</li>
                    <li>Referring website</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">How We Use Your Information</h2>
                  <p>We may use the information we collect for various purposes, including to:</p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>Provide, maintain, and improve our Website and services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send administrative information, such as updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and requests</li>
                    <li>Personalize your experience on our Website</li>
                    <li>Monitor and analyze trends, usage, and activities</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>
                      Send promotional communications, such as special offers or other information we think you might
                      find interesting
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Sharing Your Information</h2>
                  <p>We may share your information in the following situations:</p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>
                      <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                      service providers, contractors, or agents who perform services for us.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all
                      or a portion of our assets, your information may be transferred as part of that transaction.
                    </li>
                    <li>
                      <strong>With Your Consent:</strong> We may disclose your information for any other purpose with
                      your consent.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> We may disclose your information to comply with applicable
                      laws and regulations, to respond to a subpoena, search warrant, or other lawful request for
                      information we receive, or to otherwise protect our rights.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Your Choices</h2>
                  <p>You have several choices regarding the use of your information:</p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>
                      <strong>Tracking Technologies:</strong> You can set your browser to refuse all or some browser
                      cookies, or to alert you when cookies are being sent.
                    </li>
                    <li>
                      <strong>Marketing Communications:</strong> You can opt out of receiving promotional emails from us
                      by following the instructions in those emails.
                    </li>
                    <li>
                      <strong>Account Information:</strong> You can review and change your personal information by
                      logging into your account settings.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Data Security</h2>
                  <p>
                    We have implemented measures designed to secure your personal information from accidental loss and
                    from unauthorized access, use, alteration, and disclosure. However, the transmission of information
                    via the internet is not completely secure. We cannot guarantee the security of your personal
                    information transmitted to our Website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Children's Privacy</h2>
                  <p>
                    Our Website is not intended for children under 13 years of age. We do not knowingly collect personal
                    information from children under 13.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                    new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                  <div className="bg-ilary-peachLight p-6 rounded-lg mt-4">
                    <p className="font-medium">Life With Style</p>
                    <p>123 Style Avenue, Suite 456</p>
                    <p>New York, NY 10001</p>
                    <p className="mt-2">
                      Email:{" "}
                      <a href="mailto:privacy@lifewithstyle.com" className="text-primary hover:underline">
                        privacy@lifewithstyle.com
                      </a>
                    </p>
                    <p>Phone: +1 (234) 567-890</p>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  )
}
