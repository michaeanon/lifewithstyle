"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  CalendarIcon,
  Mail,
  Phone,
  CheckCircle,
  Sparkles,
  Heart,
  Star,
  ArrowDown,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import { BookingSuccessModal } from "./booking-success-modal"

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingCalendarProps {
  serviceName: string
  duration: string
  price: string
}

interface ClientInfo {
  name: string
  email: string
  phone: string
  notes: string
}

export function BookingCalendar({ serviceName, duration, price }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [selectedFormat, setSelectedFormat] = useState<"in-person" | "virtual">("in-person")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showClientForm, setShowClientForm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [bookingId, setBookingId] = useState<string>("")
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const { toast } = useToast()

  // Refs for smooth scrolling
  const bookingRef = useRef<HTMLDivElement>(null)
  const appointmentRef = useRef<HTMLDivElement>(null)

  // Scroll to booking section when component mounts
  useEffect(() => {
    if (bookingRef.current) {
      bookingRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }
  }, [])

  // Generate next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip Sundays (day 0)
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
        })
      }
    }
    return dates
  }

  // Generate time slots based on selected date
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const baseSlots = [
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ]

    const dateNum = Number.parseInt(date.replace(/\D/g, "").slice(0, 8))

    return baseSlots.map((time) => ({
      time,
      available: (dateNum + time.charCodeAt(0)) % 3 !== 0,
    }))
  }

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const dates = generateDates()

  useEffect(() => {
    if (selectedDate) {
      setTimeSlots(generateTimeSlots(selectedDate))
      setSelectedTime("")
    }
  }, [selectedDate])

  // Smooth scroll to appointment section when time is selected
  useEffect(() => {
    if (selectedDate && selectedTime && appointmentRef.current) {
      setTimeout(() => {
        appointmentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        })
      }, 300)
    }
  }, [selectedDate, selectedTime])

  const handleProceedToBooking = () => {
    if (selectedDate && selectedTime) {
      setShowClientForm(true)
      // Scroll to the client form section after it's rendered
      setTimeout(() => {
        const clientFormElement = document.querySelector("[data-client-form]")
        if (clientFormElement) {
          clientFormElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          })
        }
      }, 100) // Small delay to ensure the form is rendered
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const triggerCelebration = () => {
    setShowCelebration(true)
    setTimeout(() => {
      setShowSuccessModal(true)
    }, 1500) // Show modal after celebration
    setTimeout(() => {
      setShowCelebration(false)
    }, 4000) // Hide celebration after 4 seconds
  }

  const handleBooking = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    console.log("🚀 Booking button clicked!")

    // Validation
    if (!clientInfo.name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your full name.",
        variant: "destructive",
      })
      return
    }

    if (!clientInfo.email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    if (!validateEmail(clientInfo.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Incomplete Booking",
        description: "Please select both a date and time for your appointment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      console.log("📋 Submitting booking with data:", {
        serviceName,
        selectedDate,
        selectedTime,
        selectedFormat,
        duration,
        price,
        clientInfo,
      })

      // Submit booking to server (API handles all email sending)
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName,
          selectedDate,
          selectedTime,
          selectedFormat,
          duration,
          price,
          clientInfo: {
            name: clientInfo.name.trim(),
            email: clientInfo.email.trim(),
            phone: clientInfo.phone.trim() || "Not provided",
            notes: clientInfo.notes.trim() || "None",
          },
        }),
      })

      console.log("📡 Server response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown server error" }))
        console.error("❌ Server error:", errorData)
        throw new Error(errorData.error || `Server error: ${response.status}`)
      }

      const result = await response.json()
      console.log("✅ Booking result:", result)

      if (result.success) {
        const newBookingId = result.bookingId || `LWS-${Date.now()}`
        setBookingId(newBookingId)

        setIsSubmitting(false)

        // Trigger celebration - emails are handled by API
        triggerCelebration()
      } else {
        throw new Error(result.error || "Booking failed")
      }
    } catch (error) {
      console.error("❌ Booking error:", error)
      setIsSubmitting(false)

      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      toast({
        title: "Booking Failed",
        description: `Error: ${errorMessage}. Please try again or contact us directly at lifewithstyleinfo1@gmail.com`,
        variant: "destructive",
      })
    }
  }

  const handleClientInfoChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleModalClose = () => {
    setShowSuccessModal(false)
    setShowCelebration(false)
    // Reset form
    setSelectedDate("")
    setSelectedTime("")
    setShowClientForm(false)
    setClientInfo({ name: "", email: "", phone: "", notes: "" })
    setBookingId("")
  }

  // Enhanced time slot click handler
  const handleTimeSlotClick = (time: string, available: boolean) => {
    if (available) {
      setSelectedTime(time)
      // Add a small vibration effect for mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
  }

  // Celebration Component
  const CelebrationOverlay = () => (
    <AnimatePresence>
      {showCelebration && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{ zIndex: 9999 }}
        >
          {/* Confetti Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(150)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 1,
                  y: -100,
                  x: Math.random() * window.innerWidth,
                  rotate: 0,
                  scale: Math.random() * 0.8 + 0.2,
                }}
                animate={{
                  opacity: 0,
                  y: window.innerHeight + 100,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  transition: {
                    duration: Math.random() * 3 + 2,
                    delay: Math.random() * 1,
                    ease: "easeOut",
                  },
                }}
                className="absolute"
                style={{
                  width: `${Math.random() * 12 + 4}px`,
                  height: `${Math.random() * 12 + 4}px`,
                  backgroundColor: [
                    "#ff6b9d",
                    "#c44569",
                    "#f8b500",
                    "#40739e",
                    "#487eb0",
                    "#ffeaa7",
                    "#fab1a0",
                    "#fd79a8",
                    "#6c5ce7",
                    "#00b894",
                  ][Math.floor(Math.random() * 10)],
                  borderRadius: Math.random() > 0.5 ? "50%" : "0%",
                }}
              />
            ))}
          </div>

          {/* Firework Bursts */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`firework-${i}`}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [1, 1, 0],
                transition: {
                  duration: 2,
                  delay: i * 0.2,
                  ease: "easeOut",
                },
              }}
              className="absolute rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${20 + Math.random() * 40}%`,
                width: "60px",
                height: "60px",
                background: `radial-gradient(circle, ${
                  [
                    "#ff6b9d",
                    "#c44569",
                    "#f8b500",
                    "#40739e",
                    "#487eb0",
                    "#ffeaa7",
                    "#fab1a0",
                    "#fd79a8",
                    "#6c5ce7",
                    "#00b894",
                  ][i]
                } 0%, transparent 70%)`,
              }}
            />
          ))}

          {/* Central Success Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [180, 0, 0],
                opacity: [0, 1, 1],
                transition: {
                  duration: 1.5,
                  ease: "easeOut",
                },
              }}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 rounded-3xl p-8 shadow-2xl text-white text-center relative overflow-hidden"
            >
              {/* Animated Background Pattern */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 opacity-10"
              >
                <Sparkles className="w-full h-full" />
              </motion.div>

              {/* Floating Hearts */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`heart-${i}`}
                  animate={{
                    y: [-20, -40, -20],
                    x: [0, 10, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="absolute text-pink-200"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${10 + (i % 2) * 70}%`,
                  }}
                >
                  <Heart className="w-4 h-4" />
                </motion.div>
              ))}

              {/* Rotating Stars */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`star-${i}`}
                  animate={{
                    rotate: 360,
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute text-yellow-200"
                  style={{
                    left: `${10 + i * 25}%`,
                    top: `${5 + i * 20}%`,
                  }}
                >
                  <Star className="w-5 h-5" />
                </motion.div>
              ))}

              <div className="relative z-10">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-4xl font-bold mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  Booking Confirmed!
                </h2>
                <p className="text-xl opacity-90 mb-2">Your style journey begins now</p>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="text-sm"
                >
                  ✨ Confirmation emails sent ✨
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Sparkle Effects */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: 360,
                transition: {
                  duration: 1.5,
                  delay: Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: Math.random() * 3,
                },
              }}
              className="absolute text-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <div ref={bookingRef} className="scroll-mt-20">
        <Card className="w-full max-w-4xl mx-auto shadow-lg border-0 overflow-hidden bg-white">
          <CardHeader className="bg-gradient-to-r from-ilary-peachLight to-white p-6">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <CalendarIcon className="h-6 w-6 text-ilary-button" />
              Book Your {serviceName} Session
            </CardTitle>
            <CardDescription className="text-base">
              Select your preferred date, time, and format for your consultation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <AnimatePresence mode="wait">
              {showClientForm ? (
                <motion.div
                  data-client-form
                  initial={{
                    opacity: 0,
                    x: "100%",
                    rotateY: 45,
                    transformPerspective: 1000,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                      opacity: { duration: 0.6, delay: 0.2 },
                      x: { duration: 0.8 },
                      rotateY: { duration: 0.8, delay: 0.1 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: "-100%",
                    rotateY: -45,
                    transition: { duration: 0.6 },
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-medium">Your Information</h3>
                    <Button variant="outline" onClick={() => setShowClientForm(false)} className="text-sm">
                      ← Back to Calendar
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name" className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={clientInfo.name}
                          onChange={(e) => handleClientInfoChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={clientInfo.email}
                          onChange={(e) => handleClientInfoChange("email", e.target.value)}
                          placeholder="Enter your email address"
                          required
                          className="mt-1"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          You'll receive a confirmation email from lifewithstyleinfo1@gmail.com
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          Phone Number (Optional)
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={clientInfo.phone}
                          onChange={(e) => handleClientInfoChange("phone", e.target.value)}
                          placeholder="Enter your phone number"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="notes">Additional Notes (Optional)</Label>
                        <Textarea
                          id="notes"
                          value={clientInfo.notes}
                          onChange={(e) => handleClientInfoChange("notes", e.target.value)}
                          placeholder="Any specific requests, goals, or questions about your styling session?"
                          rows={6}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-r from-ilary-peachLight/50 to-white rounded-lg p-6 border border-ilary-peachLight/30">
                    <h3 className="font-medium mb-4 flex items-center gap-2 text-lg">
                      <CalendarIcon className="h-5 w-5 text-ilary-button" />
                      Booking Summary
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Service:</span>
                          <span className="font-medium">{serviceName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span className="font-medium">
                            {new Date(selectedDate).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Time:</span>
                          <span className="font-medium">{selectedTime}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Format:</span>
                          <span className="font-medium capitalize">{selectedFormat}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration:</span>
                          <span className="font-medium">{duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Investment:</span>
                          <span className="font-medium">{price}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleBooking}
                    disabled={isSubmitting || !clientInfo.name.trim() || !clientInfo.email.trim()}
                    className="w-full bg-ilary-button hover:bg-ilary-buttonHover relative overflow-hidden group text-lg py-6 cursor-pointer"
                    type="button"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Confirming Booking & Sending Emails...
                      </div>
                    ) : (
                      <>
                        <span className="relative z-10">Confirm Booking & Send Confirmation 📧</span>
                        <span className="absolute inset-0 bg-ilary-buttonHover transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                      </>
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8">
                  {/* Service Format Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5 text-ilary-button" />
                      Session Format
                    </h3>
                    <div className="flex gap-3">
                      <Button
                        variant={selectedFormat === "in-person" ? "default" : "outline"}
                        onClick={() => setSelectedFormat("in-person")}
                        className={`relative overflow-hidden transition-all duration-300 ${
                          selectedFormat === "in-person"
                            ? "bg-ilary-button hover:bg-ilary-buttonHover"
                            : "hover:border-ilary-button"
                        }`}
                      >
                        {selectedFormat === "in-person" && (
                          <motion.span
                            layoutId="formatHighlight"
                            className="absolute inset-0 bg-ilary-button opacity-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <span className="relative z-10">In-Person</span>
                      </Button>
                      <Button
                        variant={selectedFormat === "virtual" ? "default" : "outline"}
                        onClick={() => setSelectedFormat("virtual")}
                        className={`relative overflow-hidden transition-all duration-300 ${
                          selectedFormat === "virtual"
                            ? "bg-ilary-button hover:bg-ilary-buttonHover"
                            : "hover:border-ilary-button"
                        }`}
                      >
                        {selectedFormat === "virtual" && (
                          <motion.span
                            layoutId="formatHighlight"
                            className="absolute inset-0 bg-ilary-button opacity-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                            transition={{ duration: 0.3 }}
                          />
                        )}
                        <span className="relative z-10">Virtual</span>
                      </Button>
                    </div>
                  </motion.div>

                  {/* Date Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-medium mb-3 flex items-center gap-2 text-lg">
                      <Calendar className="h-5 w-5 text-ilary-button" />
                      Select Date
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                      {dates.map((date, index) => (
                        <motion.div
                          key={date.date}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * index, duration: 0.3 }}
                        >
                          <Button
                            variant="outline"
                            onClick={() => setSelectedDate(date.date)}
                            className={`h-auto p-3 w-full flex flex-col relative overflow-hidden transition-all duration-300 ${
                              selectedDate === date.date
                                ? "border-ilary-button text-foreground"
                                : "hover:border-ilary-button hover:bg-ilary-peachLight/20"
                            }`}
                          >
                            {selectedDate === date.date && (
                              <motion.span
                                layoutId="dateHighlight"
                                className="absolute inset-0 bg-ilary-peachLight"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.5 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            <span className="text-xs font-normal relative z-10">{date.display.split(" ")[0]}</span>
                            <span className="text-sm font-medium relative z-10">
                              {date.display.split(" ")[1]} {date.display.split(" ")[2]}
                            </span>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Enhanced Time Selection with Scale In + Fade + Bounce */}
                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          scale: 0.3,
                          y: -30,
                          transformOrigin: "center top",
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.34, 1.56, 0.64, 1], // Custom bounce easing
                            opacity: { duration: 0.4, ease: "easeOut" },
                            scale: {
                              duration: 0.6,
                              ease: [0.34, 1.56, 0.64, 1], // Bounce effect
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                            },
                            y: { duration: 0.5, ease: "easeOut" },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.3,
                          y: -20,
                          transition: {
                            duration: 0.3,
                            ease: "easeIn",
                          },
                        }}
                        className="transform-gpu" // Hardware acceleration
                      >
                        <motion.h3
                          initial={{ opacity: 0, x: -30, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                            transition: {
                              delay: 0.2,
                              duration: 0.5,
                              type: "spring",
                              stiffness: 150,
                              damping: 12,
                            },
                          }}
                          className="font-medium mb-3 flex items-center gap-2 text-lg"
                        >
                          <motion.div
                            initial={{ rotate: -180, scale: 0 }}
                            animate={{
                              rotate: 0,
                              scale: 1,
                              transition: {
                                delay: 0.3,
                                duration: 0.6,
                                type: "spring",
                                stiffness: 200,
                                damping: 10,
                              },
                            }}
                          >
                            <Clock className="h-5 w-5 text-ilary-button" />
                          </motion.div>
                          Available Times
                          <motion.div
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{
                              scale: 1,
                              rotate: 0,
                              transition: {
                                delay: 0.4,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 180,
                                damping: 8,
                              },
                            }}
                          >
                            <Zap className="h-4 w-4 text-yellow-500 ml-2" />
                          </motion.div>
                        </motion.h3>

                        <motion.div
                          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            transition: {
                              delay: 0.3,
                              duration: 0.5,
                              ease: "easeOut",
                              staggerChildren: 0.08, // Stagger each time slot
                            },
                          }}
                        >
                          {timeSlots.map((slot, index) => (
                            <motion.div
                              key={slot.time}
                              initial={{
                                opacity: 0,
                                scale: 0.4,
                                y: 20,
                                rotateX: -90,
                              }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                rotateX: 0,
                                transition: {
                                  delay: 0.4 + index * 0.05, // Progressive delay
                                  duration: 0.5,
                                  type: "spring",
                                  stiffness: 150,
                                  damping: 12,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                },
                              }}
                              whileHover={{
                                scale: slot.available ? 1.08 : 1,
                                y: slot.available ? -2 : 0,
                                transition: { duration: 0.2, type: "spring", stiffness: 300 },
                              }}
                              whileTap={{
                                scale: slot.available ? 0.95 : 1,
                                transition: { duration: 0.1 },
                              }}
                            >
                              <Button
                                variant="outline"
                                onClick={() => handleTimeSlotClick(slot.time, slot.available)}
                                disabled={!slot.available}
                                className={`w-full relative overflow-hidden transition-all duration-300 h-14 ${
                                  selectedTime === slot.time
                                    ? "border-2 border-ilary-button bg-ilary-peachLight text-foreground shadow-lg"
                                    : slot.available
                                      ? "hover:border-ilary-button hover:bg-ilary-peachLight/20 hover:shadow-md"
                                      : "opacity-50"
                                }`}
                              >
                                {selectedTime === slot.time && (
                                  <>
                                    <motion.span
                                      layoutId="timeHighlight"
                                      className="absolute inset-0 bg-gradient-to-r from-ilary-peachLight to-ilary-peachLight/50"
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{
                                        opacity: 0.8,
                                        scale: 1,
                                        transition: { duration: 0.3, type: "spring" },
                                      }}
                                    />
                                    <motion.div
                                      initial={{ scale: 0, rotate: -180 }}
                                      animate={{
                                        scale: [0, 1.3, 1],
                                        rotate: [180, 0, 0],
                                        transition: {
                                          duration: 0.6,
                                          type: "spring",
                                          stiffness: 200,
                                          damping: 10,
                                        },
                                      }}
                                      className="absolute top-1 right-1 text-ilary-button"
                                    >
                                      <CheckCircle className="w-4 h-4" />
                                    </motion.div>
                                  </>
                                )}
                                <span className="relative z-10 font-medium">{slot.time}</span>
                                {!slot.available && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{
                                      opacity: 1,
                                      scale: 1,
                                      transition: { delay: 0.2, duration: 0.3 },
                                    }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="ml-2 text-xs absolute right-2 top-1/2 transform -translate-y-1/2"
                                    >
                                      Booked
                                    </Badge>
                                  </motion.div>
                                )}
                              </Button>
                            </motion.div>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Page Flip Selected Appointment */}
                  <AnimatePresence>
                    {selectedDate && selectedTime && (
                      <motion.div
                        ref={appointmentRef}
                        initial={{
                          opacity: 0,
                          rotateY: -90,
                          transformPerspective: 1000,
                          scale: 0.8,
                        }}
                        animate={{
                          opacity: 1,
                          rotateY: 0,
                          scale: 1,
                          transition: {
                            duration: 0.8,
                            ease: "easeOut",
                            opacity: { duration: 0.6, delay: 0.2 },
                            rotateY: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
                            scale: { duration: 0.6, delay: 0.3 },
                          },
                        }}
                        exit={{
                          opacity: 0,
                          rotateY: 90,
                          scale: 0.8,
                          transition: { duration: 0.5 },
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="bg-gradient-to-r from-ilary-peachLight/50 via-white to-ilary-peachLight/30 rounded-xl p-6 border-2 border-ilary-peachLight/50 shadow-xl relative overflow-hidden"
                      >
                        {/* Animated Background Elements */}
                        <motion.div
                          animate={{
                            x: [0, 100, 0],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                          className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ilary-button/20 to-transparent rounded-full"
                        />

                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                          className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-ilary-peachLight/30 to-transparent rounded-full"
                        />

                        <div className="relative z-10">
                          <motion.h3
                            initial={{ x: -50, opacity: 0 }}
                            animate={{
                              x: 0,
                              opacity: 1,
                              transition: { delay: 0.5, duration: 0.6 },
                            }}
                            className="font-medium mb-4 flex items-center gap-2 text-xl"
                          >
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <CalendarIcon className="h-6 w-6 text-ilary-button" />
                            </motion.div>
                            Selected Appointment
                            <motion.div
                              animate={{ y: [-2, 2, -2] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ArrowDown className="h-5 w-5 text-ilary-button ml-2" />
                            </motion.div>
                          </motion.h3>

                          <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{
                              y: 0,
                              opacity: 1,
                              transition: {
                                delay: 0.6,
                                duration: 0.6,
                                staggerChildren: 0.1,
                              },
                            }}
                            className="grid md:grid-cols-2 gap-6 text-sm mb-6"
                          >
                            <div className="space-y-3">
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: { delay: 0.7 },
                                }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex justify-between p-3 bg-white/50 rounded-lg shadow-sm"
                              >
                                <span className="text-muted-foreground">Service:</span>
                                <span className="font-semibold text-ilary-button">{serviceName}</span>
                              </motion.div>
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: { delay: 0.8 },
                                }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex justify-between p-3 bg-white/50 rounded-lg shadow-sm"
                              >
                                <span className="text-muted-foreground">Date:</span>
                                <span className="font-semibold">
                                  {new Date(selectedDate).toLocaleDateString("en-US", {
                                    weekday: "short",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </motion.div>
                              <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: { delay: 0.9 },
                                }}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="flex justify-between p-3 bg-white/50 rounded-lg shadow-sm"
                              >
                                <span className="text-muted-foreground">Time:</span>
                                <span className="font-semibold text-ilary-button">{selectedTime}</span>
                              </motion.div>
                            </div>
                            <div className="space-y-3">
                              <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: { delay: 1.0 },
                                }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                className="flex justify-between p-3 bg-white/50 rounded-lg shadow-sm"
                              >
                                <span className="text-muted-foreground">Format:</span>
                                <span className="font-semibold capitalize">{selectedFormat}</span>
                              </motion.div>
                              <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: { delay: 1.1 },
                                }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                className="flex justify-between p-3 bg-white/50 rounded-lg shadow-sm"
                              >
                                <span className="text-muted-foreground">Duration:</span>
                                <span className="font-semibold">{duration}</span>
                              </motion.div>
                              <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                  transition: { delay: 1.2 },
                                }}
                                whileHover={{ scale: 1.02, x: -5 }}
                                className="flex justify-between p-3 bg-white/50 rounded-lg shadow-sm"
                              >
                                <span className="text-muted-foreground">Investment:</span>
                                <span className="font-semibold text-green-600">{price}</span>
                              </motion.div>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ y: 30, opacity: 0, scale: 0.9 }}
                            animate={{
                              y: 0,
                              opacity: 1,
                              scale: 1,
                              transition: { delay: 1.3, duration: 0.5 },
                            }}
                          >
                            <Button
                              onClick={handleProceedToBooking}
                              className="w-full bg-gradient-to-r from-ilary-button to-ilary-buttonHover hover:from-ilary-buttonHover hover:to-il ary-button text-white font-medium py-4 text-lg relative overflow-hidden group shadow-lg"
                            >
                              <motion.span
                                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                whileHover={{ scale: 1.05 }}
                              />
                              <span className="relative z-10 flex items-center justify-center gap-2">
                                Proceed to Booking
                                <motion.div
                                  animate={{ x: [0, 5, 0] }}
                                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                                >
                                  <ArrowDown className="h-5 w-5 rotate-[-90deg]" />
                                </motion.div>
                              </span>
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>

      {/* Celebration Overlay */}
      <CelebrationOverlay />

      {/* Success Modal */}
      <BookingSuccessModal
        isOpen={showSuccessModal}
        onClose={handleModalClose}
        bookingData={{
          bookingId,
          serviceName,
          selectedDate,
          selectedTime,
          selectedFormat,
          duration,
          price,
          clientInfo,
        }}
      />
    </>
  )
}
