"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Terms of Service</h1>
            <div className="prose prose-stone max-w-none">
              <p className="text-lg text-muted-foreground mb-8">Last Updated: April 16, 2025</p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-medium mb-4">Introduction</h2>
                  <p>
                    Welcome to Life With Style. These Terms of Service ("Terms") govern your access to and use of the
                    Life With Style website, services, and applications (collectively, the "Services").
                  </p>
                  <p>
                    By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to
                    these Terms, you may not access or use the Services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Using Our Services</h2>
                  <p>
                    You must follow any policies made available to you within the Services. You may use our Services
                    only as permitted by law. We may suspend or stop providing our Services to you if you do not comply
                    with our terms or policies or if we are investigating suspected misconduct.
                  </p>
                  <p>
                    Using our Services does not give you ownership of any intellectual property rights in our Services
                    or the content you access. You may not use content from our Services unless you obtain permission
                    from its owner or are otherwise permitted by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Your Account</h2>
                  <p>
                    You may need to create an account to use some of our Services. You are responsible for safeguarding
                    your account, so use a strong password and limit its use to this account. We cannot and will not be
                    liable for any loss or damage arising from your failure to comply with the above.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Privacy and Copyright Protection</h2>
                  <p>
                    Our{" "}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>{" "}
                    explains how we treat your personal data and protect your privacy when you use our Services. By
                    using our Services, you agree that Life With Style can use such data in accordance with our privacy
                    policies.
                  </p>
                  <p>
                    We respond to notices of alleged copyright infringement and terminate accounts of repeat infringers
                    according to the process set out in the U.S. Digital Millennium Copyright Act.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Your Content in Our Services</h2>
                  <p>
                    Some of our Services allow you to upload, submit, store, send or receive content. You retain
                    ownership of any intellectual property rights that you hold in that content.
                  </p>
                  <p>
                    When you upload, submit, store, send or receive content to or through our Services, you give Life
                    With Style (and those we work with) a worldwide license to use, host, store, reproduce, modify,
                    create derivative works, communicate, publish, publicly perform, publicly display and distribute
                    such content. The rights you grant in this license are for the limited purpose of operating,
                    promoting, and improving our Services, and to develop new ones.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Modifying and Terminating Our Services</h2>
                  <p>
                    We are constantly changing and improving our Services. We may add or remove functionalities or
                    features, and we may suspend or stop a Service altogether.
                  </p>
                  <p>
                    You can stop using our Services at any time, although we'll be sorry to see you go. Life With Style
                    may also stop providing Services to you, or add or create new limits to our Services at any time.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Our Warranties and Disclaimers</h2>
                  <p>
                    We provide our Services using a commercially reasonable level of skill and care and we hope that you
                    will enjoy using them. But there are certain things that we don't promise about our Services.
                  </p>
                  <p className="font-medium">
                    OTHER THAN AS EXPRESSLY SET OUT IN THESE TERMS OR ADDITIONAL TERMS, NEITHER LIFE WITH STYLE NOR ITS
                    SUPPLIERS OR DISTRIBUTORS MAKE ANY SPECIFIC PROMISES ABOUT THE SERVICES. FOR EXAMPLE, WE DON'T MAKE
                    ANY COMMITMENTS ABOUT THE CONTENT WITHIN THE SERVICES, THE SPECIFIC FUNCTIONS OF THE SERVICES, OR
                    THEIR RELIABILITY, AVAILABILITY, OR ABILITY TO MEET YOUR NEEDS. WE PROVIDE THE SERVICES "AS IS".
                  </p>
                  <p className="font-medium">
                    SOME JURISDICTIONS PROVIDE FOR CERTAIN WARRANTIES, LIKE THE IMPLIED WARRANTY OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. TO THE EXTENT PERMITTED BY LAW, WE EXCLUDE
                    ALL WARRANTIES.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Liability for Our Services</h2>
                  <p className="font-medium">
                    WHEN PERMITTED BY LAW, LIFE WITH STYLE, AND LIFE WITH STYLE'S SUPPLIERS AND DISTRIBUTORS, WILL NOT
                    BE RESPONSIBLE FOR LOST PROFITS, REVENUES, OR DATA, FINANCIAL LOSSES OR INDIRECT, SPECIAL,
                    CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES.
                  </p>
                  <p className="font-medium">
                    TO THE EXTENT PERMITTED BY LAW, THE TOTAL LIABILITY OF LIFE WITH STYLE, AND ITS SUPPLIERS AND
                    DISTRIBUTORS, FOR ANY CLAIMS UNDER THESE TERMS, INCLUDING FOR ANY IMPLIED WARRANTIES, IS LIMITED TO
                    THE AMOUNT YOU PAID US TO USE THE SERVICES (OR, IF WE CHOOSE, TO SUPPLYING YOU THE SERVICES AGAIN).
                  </p>
                  <p className="font-medium">
                    IN ALL CASES, LIFE WITH STYLE, AND ITS SUPPLIERS AND DISTRIBUTORS, WILL NOT BE LIABLE FOR ANY LOSS
                    OR DAMAGE THAT IS NOT REASONABLY FORESEEABLE.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Business Uses of Our Services</h2>
                  <p>
                    If you are using our Services on behalf of a business, that business accepts these terms. It will
                    hold harmless and indemnify Life With Style and its affiliates, officers, agents, and employees from
                    any claim, suit or action arising from or related to the use of the Services or violation of these
                    terms, including any liability or expense arising from claims, losses, damages, suits, judgments,
                    litigation costs and attorneys' fees.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">About These Terms</h2>
                  <p>
                    We may modify these terms or any additional terms that apply to a Service to, for example, reflect
                    changes to the law or changes to our Services. You should look at the terms regularly. We'll post
                    notice of modifications to these terms on this page.
                  </p>
                  <p>
                    If you do not agree to the modified terms for a Service, you should discontinue your use of that
                    Service.
                  </p>
                  <p>
                    If there is a conflict between these terms and the additional terms, the additional terms will
                    control for that conflict.
                  </p>
                  <p>
                    These terms control the relationship between Life With Style and you. They do not create any third
                    party beneficiary rights.
                  </p>
                  <p>
                    If you do not comply with these terms, and we don't take action right away, this doesn't mean that
                    we are giving up any rights that we may have (such as taking action in the future).
                  </p>
                  <p>
                    If it turns out that a particular term is not enforceable, this will not affect any other terms.
                  </p>
                  <p>
                    The laws of New York, U.S.A., excluding New York's conflict of laws rules, will apply to any
                    disputes arising out of or relating to these terms or the Services.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-medium mb-4">Contact Us</h2>
                  <p>If you have any questions about these Terms, please contact us at:</p>
                  <div className="bg-ilary-peachLight p-6 rounded-lg mt-4">
                    <p className="font-medium">Life With Style</p>
                    <p>123 Style Avenue, Suite 456</p>
                    <p>New York, NY 10001</p>
                    <p className="mt-2">
                      Email:{" "}
                      <a href="mailto:legal@lifewithstyle.com" className="text-primary hover:underline">
                        legal@lifewithstyle.com
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
