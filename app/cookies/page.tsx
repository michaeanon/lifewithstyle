"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function CookiesPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1 pt-24 pb-16">
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
            <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Cookie Policy</h1>
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-muted-foreground mb-8">Last Updated: April 16, 2025</p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-medium mb-4">What Are Cookies?</h2>
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a
                    website. They are widely used to make websites work more efficiently and provide information to the
                    website owners.
                  </p>
                  <p>
                    Cookies allow a website to recognize your device and remember if you've been to the website before.
                    They can be used to store your preferences, remember what's in your shopping cart, help you navigate
                    between pages efficiently, and generally improve your browsing experience.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">How We Use Cookies</h2>
                  <p>
                    Life With Style uses cookies for a variety of purposes. Some cookies are necessary for technical
                    reasons; some enable a personalized experience for both visitors and registered users; and some
                    allow the display of advertising from selected third party networks.
                  </p>
                  <p>We use the following types of cookies:</p>

                  <Accordion type="single" collapsible className="mt-6">
                    <AccordionItem value="essential">
                      <AccordionTrigger className="text-lg font-medium">Essential Cookies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          These cookies are necessary for the website to function and cannot be switched off in our
                          systems. They are usually only set in response to actions made by you which amount to a
                          request for services, such as setting your privacy preferences, logging in, or filling in
                          forms.
                        </p>
                        <p>
                          You can set your browser to block or alert you about these cookies, but some parts of the site
                          will not then work. These cookies do not store any personally identifiable information.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="performance">
                      <AccordionTrigger className="text-lg font-medium">Performance Cookies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          These cookies allow us to count visits and traffic sources so we can measure and improve the
                          performance of our site. They help us to know which pages are the most and least popular and
                          see how visitors move around the site.
                        </p>
                        <p>
                          All information these cookies collect is aggregated and therefore anonymous. If you do not
                          allow these cookies we will not know when you have visited our site, and will not be able to
                          monitor its performance.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="functional">
                      <AccordionTrigger className="text-lg font-medium">Functional Cookies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          These cookies enable the website to provide enhanced functionality and personalization. They
                          may be set by us or by third party providers whose services we have added to our pages.
                        </p>
                        <p>
                          If you do not allow these cookies then some or all of these services may not function
                          properly.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="targeting">
                      <AccordionTrigger className="text-lg font-medium">Targeting Cookies</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          These cookies may be set through our site by our advertising partners. They may be used by
                          those companies to build a profile of your interests and show you relevant adverts on other
                          sites.
                        </p>
                        <p>
                          They do not store directly personal information, but are based on uniquely identifying your
                          browser and internet device. If you do not allow these cookies, you will experience less
                          targeted advertising.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Third-Party Cookies</h2>
                  <p>
                    In addition to our own cookies, we may also use various third-party cookies to report usage
                    statistics of the Service, deliver advertisements on and through the Service, and so on.
                  </p>
                  <div className="bg-ilary-peachLight/50 p-6 rounded-lg mt-4">
                    <h3 className="text-lg font-medium mb-2">Third-Party Services We Use</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong>Google Analytics:</strong> For website analytics and performance tracking
                      </li>
                      <li>
                        <strong>Facebook Pixel:</strong> For advertising and conversion tracking
                      </li>
                      <li>
                        <strong>Instagram:</strong> For social media integration and sharing
                      </li>
                      <li>
                        <strong>YouTube:</strong> For video content embedding
                      </li>
                      <li>
                        <strong>Stripe:</strong> For payment processing
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Managing Cookies</h2>
                  <p>
                    Most web browsers allow you to control cookies through their settings preferences. However, if you
                    limit the ability of websites to set cookies, you may worsen your overall user experience, since it
                    will no longer be personalized to you.
                  </p>
                  <p>Below you can find information on how to manage cookies in different browsers:</p>
                  <ul className="list-disc pl-6 space-y-2 my-4">
                    <li>
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Google Chrome
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Mozilla Firefox
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Safari
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Microsoft Edge
                      </a>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Cookie Consent</h2>
                  <p>
                    When you first visit our website, you will be shown a cookie banner requesting your consent to set
                    cookies. By clicking "Accept All Cookies," you consent to the use of all the cookies described in
                    this policy. You can also choose to manage your cookie preferences by clicking on "Cookie Settings."
                  </p>
                  <p>
                    You can change your cookie preferences at any time by clicking on the "Cookie Preferences" link in
                    the footer of our website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Changes to This Cookie Policy</h2>
                  <p>
                    We may update our Cookie Policy from time to time. We will notify you of any changes by posting the
                    new Cookie Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p>
                    You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie
                    Policy are effective when they are posted on this page.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
                  <p>If you have any questions about our Cookie Policy, please contact us at:</p>
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
    </div>
  )
}
