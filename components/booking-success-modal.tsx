"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  CheckCircle2,
  Sparkles,
  Heart,
  Star,
  Gift,
  PartyPopper,
} from "lucide-react"
import { motion } from "framer-motion"

interface BookingData {
  bookingId: string
  serviceName: string
  selectedDate: string
  selectedTime: string
  selectedFormat: "in-person" | "virtual"
  duration: string
  price: string
  clientInfo: {
    name: string
    email: string
    phone: string
    notes: string
  }
}

interface BookingSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  bookingData: BookingData
}

export function BookingSuccessModal({ isOpen, onClose, bookingData }: BookingSuccessModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatSessionType = (format: "in-person" | "virtual") => {
    return format === "in-person" ? "In-Person Session" : "Virtual Session"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4 pb-6">
          {/* Animated Success Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              duration: 0.8,
            }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <CheckCircle2 className="w-10 h-10 text-white" />
          </motion.div>

          {/* Floating Celebration Elements */}
          <div className="relative">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-20, -60, -100],
                  x: [0, i % 2 === 0 ? 20 : -20, i % 2 === 0 ? 40 : -40],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                className="absolute"
                style={{
                  left: `${20 + i * 10}%`,
                  top: "50%",
                }}
              >
                {i % 4 === 0 && <Sparkles className="w-4 h-4 text-yellow-400" />}
                {i % 4 === 1 && <Heart className="w-4 h-4 text-pink-400" />}
                {i % 4 === 2 && <Star className="w-4 h-4 text-purple-400" />}
                {i % 4 === 3 && <Gift className="w-4 h-4 text-blue-400" />}
              </motion.div>
            ))}
          </div>

          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Booking Confirmed! 🎉
          </DialogTitle>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            Your style journey begins now! We're excited to work with you.
          </motion.p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Details Card */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <Card className="border-2 border-purple-100 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <PartyPopper className="w-5 h-5 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Booking Details</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-semibold text-gray-800">{bookingData.serviceName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-semibold text-gray-800">{formatDate(bookingData.selectedDate)}</p>
                        <p className="text-sm text-blue-600 font-medium">{bookingData.selectedTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Session Format</p>
                        <Badge variant="outline" className="mt-1">
                          {formatSessionType(bookingData.selectedFormat)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold text-gray-800">{bookingData.duration}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Investment</p>
                        <p className="font-semibold text-green-600 text-lg">{bookingData.price}</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
                      <p className="text-sm text-muted-foreground mb-1">Booking ID</p>
                      <p className="font-mono text-sm font-semibold text-purple-700 bg-white px-2 py-1 rounded border">
                        {bookingData.bookingId}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <Separator className="my-6" />

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              What Happens Next?
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  <strong>Confirmation Email:</strong> You'll receive a detailed confirmation email at{" "}
                  <span className="text-blue-600 font-medium">{bookingData.clientInfo.email}</span>
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  <strong>Calendar Reminder:</strong> Add this appointment to your calendar so you don't miss it!
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  <strong>Preparation:</strong> Think about your style goals and any questions you'd like to discuss.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="text-gray-700">
                  <strong>Contact Us:</strong> Need to make changes? Email us at{" "}
                  <a href="mailto:lifewithstyleinfo1@gmail.com" className="text-pink-600 font-medium hover:underline">
                    lifewithstyleinfo1@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 pt-4"
          >
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Perfect! I'm Ready ✨
            </Button>

            <Button
              variant="outline"
              onClick={() => window.open("mailto:lifewithstyleinfo1@gmail.com", "_blank")}
              className="flex-1 border-2 border-purple-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Us
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
