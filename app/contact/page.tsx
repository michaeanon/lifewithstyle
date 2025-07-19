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
import { PageHero } from "@/components/page-hero"
import Script from "next/script"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "general",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiryType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setIsLoading(true)

    try {
      // Send to website email via Formspree
      const adminForm = new FormData()
      adminForm.append("_subject", `New Contact Form Message from ${formData.name}`)
      adminForm.append("name", formData.name)
      adminForm.append("email", formData.email)
      adminForm.append("subject", formData.subject)
      adminForm.append("message", formData.message)
      adminForm.append("inquiryType", formData.inquiryType)
      adminForm.append("_replyto", formData.email)

      const adminResponse = await fetch("https://formspree.io/f/mnndklvg", {
        method: "POST",
        body: adminForm,
        headers: {
          Accept: "application/json",
        },
      })

      if (!adminResponse.ok) {
        throw new Error("Failed to send message to admin")
      }

      // Send confirmation email to sender
      const confirmationForm = new FormData()
      confirmationForm.append("_subject", "Thank you for contacting Life with Style!")
      confirmationForm.append("_template", "basic")
      confirmationForm.append("name", formData.name)
      confirmationForm.append("inquiry_type", formData.inquiryType)
      confirmationForm.append("subject", formData.subject)
      confirmationForm.append("_replyto", "lifewithstyleinfo1@gmail.com")
      confirmationForm.append("_cc", formData.email)

      // Create beautiful confirmation message
      const confirmationMessage = `
Dear ${formData.name},

Thank you for reaching out to Life with Style! ✨

We've successfully received your message regarding "${formData.subject}" and truly appreciate you taking the time to contact us.

📋 Your Message Details:
• Inquiry Type: ${formData.inquiryType.charAt(0).toUpperCase() + formData.inquiryType.slice(1)}
• Subject: ${formData.subject}
• Submitted: ${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })}

⏰ What happens next?
Our styling team will review your message and respond within 24-48 hours during business days. For urgent styling consultations, please call us directly at +254702015605.

💫 In the meantime, feel free to:
• Explore our style guides at lifewithstyle.com/guides
• Browse our latest inspiration at lifewithstyle.com/inspiration
• Follow us on social media for daily style tips

Thank you for choosing Life with Style for your fashion journey!

Best regards,
The Life with Style Team

---
Life with Style
Professional Styling Services
📧 lifewithstyleinfo1@gmail.com
📞 +254702015605
🌐 lifewithstyle.com

This is an automated confirmation. Please do not reply to this email.
    `

      confirmationForm.append("message", confirmationMessage)

      // Send confirmation email (using a different Formspree endpoint for confirmations)
      await fetch("https://formspree.io/f/mnndklvg", {
        method: "POST",
        body: confirmationForm,
        headers: {
          Accept: "application/json",
        },
      })

      // Show success modal
      setShowSuccessModal(true)

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "general",
      })

      setIsLoading(false)

      // Auto-hide success modal after 8 seconds
      setTimeout(() => {
        setShowSuccessModal(false)
      }, 8000)
    } catch (err) {
      setError("There was an error submitting your message. Please try again.")
      setIsLoading(false)
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Chatbase Chat Widget Script - Only loads on contact page */}
      <Script
        id="chatbase-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              if(!window.chatbase||window.chatbase("getState")!=="initialized"){
                window.chatbase=(...arguments)=>{
                  if(!window.chatbase.q){window.chatbase.q=[]}
                  window.chatbase.q.push(arguments)
                };
                window.chatbase=new Proxy(window.chatbase,{
                  get(target,prop){
                    if(prop==="q"){return target.q}
                    return(...args)=>target(prop,...args)
                  }
                })
              }
              const onLoad=function(){
                const script=document.createElement("script");
                script.src="https://www.chatbase.co/embed.min.js";
                script.id="Dp2Fl5A6umFOk2sYVc6Kj";
                script.domain="www.chatbase.co";
                document.body.appendChild(script)
              };
              if(document.readyState==="complete"){
                onLoad()
              }else{
                window.addEventListener("load",onLoad)
              }
            })();
          `,
        }}
      />
      {/* Custom CSS to position chat widget above back-to-top button */}
      <style jsx global>{`
        #chatbase-bubble-button {
          bottom: 120px !important;
          right: 24px !important;
          z-index: 9970 !important;
        }
        
        #chatbase-bubble-window {
          bottom: 180px !important;
          right: 24px !important;
          z-index: 9970 !important;
        }
        
        /* Ensure chat widget doesn't conflict with other floating elements */
        .chatbase-chat-bubble {
          bottom: 120px !important;
          right: 24px !important;
          z-index: 9970 !important;
        }
      `}</style>

      <Toaster />
      <PageHero
        title="Contact Us"
        subtitle="Have questions about our style guides or services? We'd love to hear from you."
        backgroundImage="https://images.unsplash.com/photo-1740560051533-3acef26ace95?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <main>
        {/* Contact Form and Info Section - With solid background */}
        <section className="py-16 md:py-24 bg-white relative">
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
                    onClick={(e) => {
                      // Prevent the default Button navigation behavior
                      e.stopPropagation()
                    }}
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
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
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
                        <a href="mailto:lifewithstyleinfo1@gmail.com" className="text-foreground hover:underline">
                          lifewithstyleinfo1@gmail.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
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
                          +254702015605
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
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
                          Fashion Studio Building, 7th Floor
                          <br />
                          Main Avenue, Fashion District
                          <br />
                          Nairobi, Kenya
                        </address>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-ilary-border shadow-sm overflow-hidden bg-white">
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
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
          <div className="absolute inset-0 opacity-10 pointer-events-none">
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
                className="object-cover pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-end p-8">
                <div className="bg-white/90 p-4 rounded-lg shadow-lg max-w-md text-center relative z-10">
                  <h3 className="font-medium text-lg mb-2">Fashion Studio Building</h3>
                  <p>
                    <a
                      href="https://www.google.com/maps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline flex items-center justify-center"
                    >
                      Main Avenue, Fashion District, Nairobi, Kenya
                      <MapPin className="h-4 w-4 ml-1 inline-block" />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-50"></div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-20"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-emerald-100 rounded-full opacity-20"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Success Icon */}
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Success Message */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">Message Sent Successfully! ✨</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Thank you for reaching out to Life with Style! We've received your message and will respond within
                    <span className="font-semibold text-green-600"> 24-48 hours</span>.
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-3 mb-6"
                >
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Confirmation email sent to your inbox</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Our team has been notified</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Priority response within 24-48 hours</span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Continue Browsing
                  </Button>
                  <button
                    onClick={() => {
                      setShowSuccessModal(false)
                      window.location.href = "/services"
                    }}
                    className="w-full text-green-600 hover:text-green-700 font-medium py-2 transition-colors"
                  >
                    Explore Our Services →
                  </button>
                </motion.div>

                {/* Close button */}
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        )}
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
