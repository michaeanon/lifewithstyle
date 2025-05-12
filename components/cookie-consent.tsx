"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookieConsent")

    // If no choice has been made, show the consent popup after a short delay
    if (cookieConsent === null) {
      const timer = setTimeout(() => {
        setShowConsent(true)
      }, 1500) // Delay showing the popup by 1.5 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowConsent(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setShowConsent(false)
  }

  const handleManagePreferences = () => {
    router.push("/cookies/preferences")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[#f5f8f5] rounded-3xl shadow-lg p-6 w-[320px]">
        <div className="flex items-center gap-2 mb-4">
          <div className="text-2xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#FFC107" />
              <circle cx="8" cy="10" r="1.5" fill="#5D4037" />
              <circle cx="12" cy="15" r="1.5" fill="#5D4037" />
              <circle cx="16" cy="9" r="1.5" fill="#5D4037" />
              <circle cx="15" cy="13" r="1.5" fill="#5D4037" />
              <circle cx="9" cy="14" r="1.5" fill="#5D4037" />
            </svg>
          </div>
          <h3 className="text-xl font-bold">Cookie Notice</h3>
        </div>

        <p className="text-sm mb-2">
          We use cookies to ensure that we give you the best experience on our website.{" "}
          <Link href="/cookies" className="text-blue-600 hover:underline">
            Read cookies policies
          </Link>
          .
        </p>

        <button className="text-blue-600 hover:underline text-sm mb-6 block" onClick={handleManagePreferences}>
          Manage preferences
        </button>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleDecline}
            className="px-6 py-2 text-red-600 font-medium bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition-colors flex-1 text-center"
          >
            DECLINE
          </button>
          <button
            onClick={handleAccept}
            className="px-6 py-2 text-green-600 font-medium bg-gray-100 rounded-xl shadow-sm hover:bg-gray-200 transition-colors flex-1 text-center"
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  )
}
