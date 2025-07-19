"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { Check, Clock, Users, Star } from "lucide-react"
import { FAQSection } from "@/components/faq-section"
import { BookingCalendar } from "@/components/booking-calendar"
import { motion, useInView, useAnimation } from "framer-motion"

const wardrobeAuditFAQs = [
  {
    question: "How should I prepare for my wardrobe audit?",
    answer:
      "Please ensure your entire wardrobe is accessible - this includes clothes in closets, dressers, and any seasonal storage. Have a full-length mirror available and good lighting in the space. We recommend setting aside 3-4 hours for the complete process.",
  },
  {
    question: "What happens to the clothes we decide to remove?",
    answer:
      "We'll help you sort items into categories: donate, sell, alter, or discard. I can provide recommendations for local donation centers and consignment shops. Items that need alterations will be clearly identified with specific recommendations.",
  },
  {
    question: "Will you help me organize my closet?",
    answer:
      "Yes! Organization is a key part of the audit process. We'll reorganize your closet for maximum visibility and accessibility, grouping similar items together and ensuring your most-worn pieces are easily accessible.",
  },
  {
    question: "Do you provide a shopping list after the audit?",
    answer:
      "You'll receive a detailed list of recommended additions to fill any gaps we identify. This list will be prioritized by importance and include specific style details to guide your future shopping.",
  },
  {
    question: "Can you do a wardrobe audit virtually?",
    answer:
      "While in-person audits are most effective, we can do virtual audits where you show me your wardrobe via video call. This works best for smaller wardrobes or when distance is a factor.",
  },
  {
    question: "How often should I have a wardrobe audit?",
    answer:
      "Most clients benefit from an audit every 2-3 years, or after major life changes like weight fluctuations, career changes, or lifestyle shifts. Some clients prefer annual mini-audits to stay on track.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function WardrobeAuditPage() {
  const controls = useAnimation()
  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.3 })

  useEffect(() => {
    if (featuresInView) {
      controls.start("visible")
    }
  }, [controls, featuresInView])

  return (
    <>
      <PageHero
        title="Wardrobe Audit"
        subtitle="A comprehensive review of your current wardrobe to identify gaps, remove items that no longer serve you, and optimize what you already own."
        backgroundImage="https://images.unsplash.com/photo-1732992132965-9435621795e8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <section className="py-16 md:py-24 overflow-hidden">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-serif tracking-wide mb-6 relative">
                The Wardrobe Audit Process
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-ilary-button"></span>
              </h2>
              <p className="text-lg mb-6">
                Our wardrobe audit service is designed to help you make the most of what you already own while
                identifying strategic additions that will maximize your outfit possibilities. We'll work together to
                create a more functional, cohesive wardrobe that aligns with your lifestyle and personal style.
              </p>
              <p className="text-lg mb-8">
                This hands-on process will transform your closet from overwhelming to organized, making daily outfit
                selection effortless and enjoyable.
              </p>

              <motion.div
                ref={featuresRef}
                variants={staggerContainer}
                initial="hidden"
                animate={controls}
                className="space-y-6 mb-8"
              >
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Comprehensive Assessment
                    </h3>
                    <p className="text-muted-foreground">
                      A thorough evaluation of every item in your wardrobe to determine what works and what doesn't.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Strategic Organization
                    </h3>
                    <p className="text-muted-foreground">
                      Reorganization of your closet for maximum visibility and accessibility of your most-worn items.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Gap Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Identification of missing key pieces that would enhance your existing wardrobe's versatility.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Outfit Creation
                    </h3>
                    <p className="text-muted-foreground">
                      Development of multiple outfit combinations using your existing pieces to maximize your wardrobe.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Link href="/contact">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover relative overflow-hidden group">
                    <span className="relative z-10">Schedule Your Audit</span>
                    <span className="absolute inset-0 bg-ilary-buttonHover transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-ilary-peachLight to-white rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-medium mb-4">Service Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Clock className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-muted-foreground">3-4 hours (depending on wardrobe size)</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Users className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-muted-foreground">In-person service at your home</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Star className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Pricing</p>
                      <p className="text-muted-foreground">Starting at KES 25,000 per session</p>
                      <p className="text-muted-foreground">Follow-up sessions available at reduced rates</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1770&auto=format&fit=crop"
                  alt="Organized wardrobe after audit"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-ilary-button"
              >
                <h3 className="text-xl font-medium mb-4">Client Testimonial</h3>
                <p className="italic text-muted-foreground mb-4">
                  "The wardrobe audit was exactly what I needed. I was holding onto so many items that didn't fit or
                  flatter me. Now my closet is streamlined with pieces I actually wear, and I discovered combinations I
                  never would have thought of on my own."
                </p>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-ilary-peachLight">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop"
                      alt="Client portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Alex T.</p>
                    <p className="text-sm text-muted-foreground">Finance Professional</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif tracking-wide mb-4">Frequently Asked Questions</h2>
            <div className="w-24 h-1 bg-ilary-button mx-auto"></div>
          </motion.div>
          <FAQSection faqs={wardrobeAuditFAQs} />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24"
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif tracking-wide mb-4">Schedule Your Audit</h2>
            <div className="w-24 h-1 bg-ilary-button mx-auto"></div>
          </motion.div>
          <BookingCalendar serviceName="Wardrobe Audit" duration="3-4 hours" price="Starting at KES 25,000" />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-20 bg-gradient-to-r from-ilary-peachLight to-white"
      >
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-serif tracking-wide mb-6"
          >
            Ready for a Wardrobe Reset?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg max-w-2xl mx-auto mb-8"
          >
            Book your wardrobe audit today and discover the potential hiding in your closet.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 bg-ilary-buttonHover transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
