"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real implementation, you would send this data to your server
      // which would then forward it to kambuchristine@gmail.com

      // Example of how this might be implemented with a server action:
      /*
      await sendContactEmail({
        to: "kambuchristine@gmail.com",
        from: formData.email,
        subject: `[Life With Style] ${formData.subject}`,
        name: formData.name,
        message: formData.message,
        inquiryType: formData.inquiryType
      });
      */

      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsLoading(false)
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Toaster />
      <main className="pt-24">
        {/* Hero Section - Completely isolated with its own background */}
        <div className="bg-ilary-peachLight">
          <div className="relative py-16 md:py-24 overflow-hidden isolate">
            {/* Background image container with strict containment */}
            <div
              className="absolute inset-0 opacity-20 z-0"
              style={{
                clipPath: "inset(0)",
                isolation: "isolate",
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop"
                alt="Stylish fashion background"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content */}
            <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto"
              >
                <h1 className="text-4xl md:text-5xl font-serif tracking-wide mb-6">Get in Touch</h1>
                <p className="text-lg text-muted-foreground">
                  Have questions about our style guides, services, or just want to say hello? We'd love to hear from
                  you. Fill out the form below or reach out through any of our contact channels.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Clear divider to ensure separation */}
        <div className="h-2 bg-white w-full shadow-md"></div>

        {/* Contact Form and Info Section - With solid background */}
        <section className="py-16 md:py-24 bg-white relative">
          {/* Solid background overlay to ensure no transparency */}
          <div className="absolute inset-0 bg-white" style={{ zIndex: -1 }}></div>

          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form - Wrapped in a card with solid background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
              >
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type</Label>
                    <RadioGroup
                      value={formData.inquiryType}
                      onValueChange={handleRadioChange}
                      className="flex flex-wrap gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="general" id="general" />
                        <Label htmlFor="general">General Inquiry</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="styling" id="styling" />
                        <Label htmlFor="styling">Styling Services</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="collaboration" id="collaboration" />
                        <Label htmlFor="collaboration">Collaboration</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="support" id="support" />
                        <Label htmlFor="support">Support</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Please provide details about your inquiry..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="bg-white"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Contact Information</h2>
                  <p className="text-muted-foreground mb-8">
                    We aim to respond to all inquiries within 24-48 hours during business days. For urgent matters,
                    please contact us directly by phone.
                  </p>
                </div>

                <div className="grid gap-6">
                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10">
                      <Image
                        src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1974&auto=format&fit=crop"
                        alt="Email background"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex items-start space-x-4 relative bg-white bg-opacity-80">
                      <div className="bg-ilary-peachLight p-3 rounded-full">
                        <Mail className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-muted-foreground mb-2">For general inquiries and support</p>
                        <a href="mailto:kambuchristine@gmail.com" className="text-foreground hover:underline">
                          kambuchristine@gmail.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10">
                      <Image
                        src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070&auto=format&fit=crop"
                        alt="Phone background"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex items-start space-x-4 relative bg-white bg-opacity-80">
                      <div className="bg-ilary-peachLight p-3 rounded-full">
                        <Phone className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className="text-muted-foreground mb-2">Monday to Friday, 9am to 5pm EAT</p>
                        <a href="tel:+254702015605" className="text-foreground hover:underline">
                          +254 702 015605
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10">
                      <Image
                        src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1974&auto=format&fit=crop"
                        alt="Office background"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex items-start space-x-4 relative bg-white bg-opacity-80">
                      <div className="bg-ilary-peachLight p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Office</h3>
                        <p className="text-muted-foreground mb-2">Our studio location</p>
                        <address className="not-italic text-foreground">
                          Lonrho House, 7th Floor
                          <br />
                          Kenyatta Avenue, Nairobi CBD
                          <br />
                          Kenya
                        </address>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10">
                      <Image
                        src="https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=2070&auto=format&fit=crop"
                        alt="Clock background"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 flex items-start space-x-4 relative bg-white bg-opacity-80">
                      <div className="bg-ilary-peachLight p-3 rounded-full">
                        <Clock className="h-6 w-6 text-foreground" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Business Hours</h3>
                        <p className="text-muted-foreground mb-2">When we're available</p>
                        <ul className="space-y-1 text-foreground">
                          <li>Monday - Friday: 9:00 AM - 5:00 PM EAT</li>
                          <li>Saturday: By appointment only</li>
                          <li>Sunday: Closed</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 bg-ilary-peachLight relative">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
              alt="FAQ background"
              fill
              className="object-cover"
            />
          </div>
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Find answers to our most commonly asked questions. If you can't find what you're looking for, please
                don't hesitate to contact us.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-medium mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Visit Our Studio</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We welcome in-person consultations at our studio in Nairobi CBD. Please contact us in advance to
                schedule an appointment.
              </p>
            </motion.div>

            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
              {/* Real image of Nairobi CBD, Kenyatta Avenue */}
              <Image
                src="https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=1974&auto=format&fit=crop"
                alt="Nairobi CBD, Kenyatta Avenue"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-end p-8">
                <div className="bg-white/90 p-4 rounded-lg shadow-lg max-w-md text-center">
                  <h3 className="font-medium text-lg mb-2">Lonrho House</h3>
                  <p>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Lonrho+House+Kenyatta+Avenue+Nairobi+CBD+Kenya"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline flex items-center justify-center"
                    >
                      Kenyatta Avenue, Nairobi CBD, Kenya
                      <MapPin className="h-4 w-4 ml-1 inline-block" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

const faqs = [
  {
    question: "How do I book a personal styling session?",
    answer:
      "You can book a personal styling session by filling out the contact form on this page or by calling our office directly. We'll get back to you within 24-48 hours to schedule your appointment.",
  },
  {
    question: "Do you offer virtual styling consultations?",
    answer:
      "Yes, we offer virtual styling consultations via video call for clients who cannot visit our studio in person. These sessions are just as comprehensive as our in-person consultations.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require at least 24 hours notice for cancellations. Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee of 50% of the service cost.",
  },
  {
    question: "Can I get a refund if I'm not satisfied with the service?",
    answer:
      "We strive for 100% client satisfaction. If you're not completely satisfied with our services, please contact us within 7 days of your appointment to discuss your concerns and possible solutions.",
  },
  {
    question: "Do you work with clients outside of Nairobi?",
    answer:
      "Yes, we work with clients throughout Kenya and internationally through our virtual styling services. For in-person services in other cities, please contact us to discuss arrangements.",
  },
  {
    question: "How much do your services cost?",
    answer:
      "Our service fees vary depending on the type of service and duration. Please contact us for a personalized quote based on your specific needs and goals.",
  },
]
