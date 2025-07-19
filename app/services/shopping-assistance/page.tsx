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

const shoppingAssistanceFAQs = [
  {
    question: "What stores do you typically visit during shopping sessions?",
    answer:
      "Store selection depends on your budget, style preferences, and specific needs. We can visit department stores, boutiques, outlet centers, or specialty shops. I'll recommend the best options based on your goals and budget during our pre-shopping consultation.",
  },
  {
    question: "Do I have to buy anything during our shopping session?",
    answer:
      "Absolutely not! There's no pressure to purchase anything. The goal is to find pieces that truly work for you. If we don't find the right items, we can plan another session or explore different stores.",
  },
  {
    question: "How does virtual shopping assistance work?",
    answer:
      "For virtual sessions, we'll video chat while you browse online stores or I can create curated shopping lists with links to specific items. I can also provide real-time feedback if you're shopping in-store via video call.",
  },
  {
    question: "What should I bring to an in-person shopping session?",
    answer:
      "Bring a well-fitting bra, comfortable shoes for trying things on, and any specific undergarments you might need. I also recommend bringing photos of items in your current wardrobe that you want to coordinate with new purchases.",
  },
  {
    question: "Can you help me shop for special occasions?",
    answer:
      "Yes! Whether you need an outfit for a wedding, job interview, vacation, or any special event, I can help you find the perfect pieces. Just let me know the occasion and any specific requirements during our consultation.",
  },
  {
    question: "What if I don't like something we purchased together?",
    answer:
      "I'll help you understand return policies before purchasing, and we'll discuss any concerns during the fitting process. Most stores have return policies, and I'm always available to help you make exchanges if needed.",
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

export default function ShoppingAssistancePage() {
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
        title="Shopping Assistance"
        subtitle="Guided shopping experiences to help you select quality pieces that complement your existing wardrobe and align with your style goals."
        backgroundImage="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/personal%20shopping%202.jfif-LLtQjxbDpNgPIZfCZW3CW592lljGkz.jpeg"
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
                Guided Shopping Experience
                <span className="absolute -bottom-2 left-0 w-16 h-1 bg-ilary-button"></span>
              </h2>
              <p className="text-lg mb-6">
                Our shopping assistance service takes the stress and guesswork out of shopping for clothes. Whether
                you're looking to fill specific gaps in your wardrobe or completely refresh your style, our expert
                stylists will guide you through the process with personalized recommendations.
              </p>
              <p className="text-lg mb-8">
                We'll help you make confident purchasing decisions, ensuring that each new addition to your wardrobe is
                versatile, high-quality, and aligned with your personal style and budget.
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
                      Pre-Shopping Consultation
                    </h3>
                    <p className="text-muted-foreground">
                      Discussion of your style goals, budget, and specific items you're looking to add to your wardrobe.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Curated Store Selection
                    </h3>
                    <p className="text-muted-foreground">
                      Carefully selected shopping destinations based on your style preferences and budget.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Expert Guidance
                    </h3>
                    <p className="text-muted-foreground">
                      Professional advice on fit, quality, versatility, and how new items will integrate with your
                      existing wardrobe.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp} className="flex items-start group">
                  <div className="rounded-full bg-ilary-peachLight p-2 mr-4 mt-1 flex-shrink-0 transition-all duration-300 group-hover:bg-ilary-button">
                    <Check className="h-5 w-5 text-ilary-button group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg group-hover:text-ilary-button transition-colors duration-300">
                      Virtual Options Available
                    </h3>
                    <p className="text-muted-foreground">
                      Online shopping assistance for those who prefer to shop from home or have limited local options.
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
                    <span className="relative z-10">Book Shopping Session</span>
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
                      <p className="text-muted-foreground">3-4 hours of in-person shopping</p>
                      <p className="text-muted-foreground">1-2 hours for virtual sessions</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Users className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-muted-foreground">In-person shopping trips or virtual consultations</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="rounded-full bg-white p-2 mr-3 flex-shrink-0 shadow-sm">
                      <Star className="h-5 w-5 text-ilary-button" />
                    </div>
                    <div>
                      <p className="font-medium">Pricing</p>
                      <p className="text-muted-foreground">Starting at KES 20,000 per session</p>
                      <p className="text-muted-foreground">Additional hours available at hourly rate</p>
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
                  src="https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?q=80&w=1931&auto=format&fit=crop"
                  alt="Shopping assistance session"
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
                  "Shopping used to be overwhelming and frustrating for me. With the shopping assistance service, I was
                  able to find pieces that actually fit me properly and work together. The stylist helped me step
                  outside my comfort zone while still staying true to my personal style."
                </p>
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3 border-2 border-ilary-peachLight">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop"
                      alt="Client portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">Jamie K.</p>
                    <p className="text-sm text-muted-foreground">Healthcare Professional</p>
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
          <FAQSection faqs={shoppingAssistanceFAQs} />
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
            <h2 className="text-3xl font-serif tracking-wide mb-4">Book Your Shopping Session</h2>
            <div className="w-24 h-1 bg-ilary-button mx-auto"></div>
          </motion.div>
          <BookingCalendar serviceName="Shopping Assistance" duration="3-4 hours" price="Starting at KES 20,000" />
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
            Ready to Elevate Your Shopping Experience?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg max-w-2xl mx-auto mb-8"
          >
            Book your guided shopping session today and invest in pieces you'll love for years to come.
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
