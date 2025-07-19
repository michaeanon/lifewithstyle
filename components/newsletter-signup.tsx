"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Loader2, CheckCircle, AlertCircle, Sparkles, Heart } from "lucide-react"

export default function NewsletterSignup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setShowSuccessAnimation(false)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        setMessage(data.message)
        setFormData({ firstName: "", lastName: "", email: "" })
        setShowSuccessAnimation(true)

        // Auto-hide success message after 8 seconds
        setTimeout(() => {
          setMessage("")
          setIsSuccess(false)
          setShowSuccessAnimation(false)
        }, 8000)
      } else {
        setIsSuccess(false)
        setMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setIsSuccess(false)
      setMessage("❌ Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Animated Success Alert Overlay */}
      {showSuccessAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full transform animate-in zoom-in-95 duration-500 slide-in-from-bottom-4">
            <div className="text-center">
              {/* Animated Success Icon */}
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-white animate-bounce" />
                </div>
                {/* Sparkle effects */}
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-spin" />
                <Heart className="absolute -bottom-1 -left-2 w-5 h-5 text-pink-400 animate-pulse" />
              </div>

              {/* Success Message */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3 animate-in slide-in-from-bottom-2 duration-700">
                🎉 Welcome to Our Style Family!
              </h3>

              <p className="text-gray-600 mb-4 animate-in slide-in-from-bottom-3 duration-700">
                You're now part of our exclusive community!
              </p>

              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-4 mb-6 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Mail className="w-4 h-4 text-pink-500" />
                  <span>Check your email for a special welcome message!</span>
                </div>
              </div>

              {/* What's Next Section */}
              <div className="text-left space-y-2 mb-6 animate-in slide-in-from-bottom-5 duration-700">
                <h4 className="font-semibold text-gray-900 text-center mb-3">What's Coming Your Way:</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Weekly styling tips & trends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                    <span>Exclusive outfit inspiration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Early access to new collections</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full"></div>
                    <span>Personal styling offers</span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setShowSuccessAnimation(false)}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-medium py-2 rounded-lg transition-all duration-200 animate-in slide-in-from-bottom-6 duration-700"
              >
                Continue Exploring ✨
              </Button>
            </div>
          </div>
        </div>
      )}

      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-0">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Style Community</h3>
            <p className="text-gray-600">Get exclusive styling tips and outfit inspiration</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="bg-white border-gray-200 focus:border-pink-400 focus:ring-pink-400 disabled:opacity-50"
              />
              <Input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="bg-white border-gray-200 focus:border-pink-400 focus:ring-pink-400 disabled:opacity-50"
              />
            </div>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="bg-white border-gray-200 focus:border-pink-400 focus:ring-pink-400 disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "Subscribe to Newsletter"
              )}
            </Button>
          </form>

          {/* Regular message display for errors */}
          {message && !showSuccessAnimation && (
            <div
              className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm transition-all duration-300 animate-in slide-in-from-top-2 ${
                isSuccess
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {isSuccess ? (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span>{message}</span>
            </div>
          )}

          <div className="text-center mt-6 space-y-2">
            <p className="text-xs text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
            <p className="text-xs text-gray-400">📧 Welcome emails sent from: lifewithstyleinfo1@gmail.com</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
