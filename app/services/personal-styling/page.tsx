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

const personalStylingFAQs = [
  {
    question: "What should I expect during my first personal styling consultation?",
    answer:
      "Your first consultation will begin with a detailed discussion about your lifestyle, style preferences, and wardrobe goals. We'll assess your body type, coloring, and personal aesthetic to determine your most flattering styles. You'll receive personalized recommendations and a style guide to take home.",
  },
  {
    question: "Do I need to prepare anything before my consultation?",
    answer:
      "We recommend gathering inspiration images of styles you love, thinking about your lifestyle needs, and having a clear idea of your budget. If you have specific wardrobe challenges or goals, jot them down to discuss during our session.",
  },
  {
    question: "Can personal styling sessions be done virtually?",
    answer:
      "Yes! We offer virtual consultations via video call. You'll receive the same personalized attention and detailed style recommendations. We can review your current wardrobe virtually and provide shopping guidance online.",
  },
  {
    question: "How much should I budget for implementing your recommendations?",
    answer:
      "This varies greatly depending on your needs and preferences. We work with all budgets and can prioritize recommendations based on your spending comfort level. We'll discuss budget-friendly options and investment pieces during your consultation.",
  },
  {
    question: "What's your cancellation policy?",
    answer:
      "We require 24 hours notice for cancellations or rescheduling. Cancellations made less than 24 hours in advance will be charged 50% of the session fee. No-shows will be charged the full session fee.",
  },
  {
    question: "Do you offer follow-up sessions?",
    answer:
      "Many clients benefit from follow-up sessions to refine their style or get additional guidance as their needs evolve. Follow-up sessions are offered at a reduced rate for existing clients.",
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

export default function PersonalStylingPage() {
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
        title="Personal Styling"
        subtitle="One-on-one consultations to help you discover your unique style and build a wardrobe that reflects your personality and lifestyle."
        backgroundImage="https://images.unsplash.com/photo-1692423018664-6e1cd5046cae?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                How It Works
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-ilary-button"></span>
              </h2>
              <p className="text-lg mb-6">
                Our personal styling service is designed to help you discover and refine your unique style identity.
                Through a collaborative process, we'll work together to understand your preferences, lifestyle needs,
                and aspirations to create a wardrobe that truly reflects who you are.
              </p>
              <p className="text-lg mb-8">
                Whether you're looking to completely reinvent your style or simply need guidance on how to elevate your
                existing wardrobe, our expert stylists will provide personalized recommendations tailored to your
                specific goals.
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
                      Initial Consultation
                    </h3>
                    <p className="text-muted-foreground">
                      A comprehensive discussion about your style preferences, lifestyle, and wardrobe goals.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Style Analysis
                    </h3>
                    <p className="text-muted-foreground">
                      Assessment of your body type, coloring, and personal aesthetic to determine your most flattering
                      styles.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Personalized Recommendations
                    </h3>
                    <p className="text-muted-foreground">
                      Detailed guidance on silhouettes, colors, patterns, and specific pieces that will enhance your
                      wardrobe.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Implementation Support
                    </h3>
                    <p className="text-muted-foreground">
                      Ongoing assistance as you begin to implement your new style direction, including shopping
                      guidance.
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
                    <span className="relative z-10">Book a Consultation</span>
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
                      <p className="text-muted-foreground">Initial session: 90 minutes</p>
                      <p className="text-muted-foreground">Follow-up sessions: 60 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Users className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-muted-foreground">In-person or virtual consultations available</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Star className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Pricing</p>
                      <p className="text-muted-foreground">Starting at KES 15,000 per session</p>
                      <p className="text-muted-foreground">Package options available</p>
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
                  src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1887&auto=format&fit=crop"
                  alt="Personal styling session in progress"
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
                  "Working with the personal styling team completely transformed my relationship with my wardrobe. I now
                  have a clear understanding of what works for my body type and lifestyle, and getting dressed has
                  become a joy rather than a daily struggle."
                </p>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-ilary-peachLight">
                    <Image
                      src="https://images.unsplash.com/photo-1744964411719-b1415241cb23?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MXx8fGVufDB8fHx8fA%3D%3D"
                      alt="Tina's portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Tina</p>
                    <p className="text-sm text-muted-foreground">Marketing Director</p>
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
          <FAQSection faqs={personalStylingFAQs} />
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
            <h2 className="text-3xl font-serif tracking-wide mb-4">Book Your Session</h2>
            <div className="w-24 h-1 bg-ilary-button mx-auto"></div>
          </motion.div>
          <BookingCalendar serviceName="Personal Styling" duration="90 minutes" price="Starting at KES 15,000" />
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
            Ready to Transform Your Style?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg max-w-2xl mx-auto mb-8"
          >
            Book your personal styling consultation today and take the first step toward a wardrobe that truly reflects
            who you are.
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
