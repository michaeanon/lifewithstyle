"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cookie, Settings } from "lucide-react"
import Link from "next/link"

function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Show consent banner after a short delay
      const timer = setTimeout(() => {
        setShowConsent(true)
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
    setTimeout(() => setShowConsent(false), 300)
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
    setTimeout(() => setShowConsent(false), 300)
  }

  if (!showConsent) return null

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <Card className="mx-auto max-w-4xl border shadow-lg bg-white/95 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Cookie className="h-6 w-6 text-rose-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">We use cookies</h3>
                <p className="text-sm text-gray-600">
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. By clicking "Accept All", you consent to our use of cookies.{" "}
                  <Link href="/cookies" className="text-rose-600 hover:text-rose-700 underline">
                    Learn more
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Link href="/cookies/preferences">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <Settings className="h-4 w-4" />
                  Preferences
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleDecline}>
                Decline
              </Button>
              <Button size="sm" onClick={handleAccept} className="bg-rose-500 hover:bg-rose-600 text-white">
                Accept All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CookieConsent
export { CookieConsent }
