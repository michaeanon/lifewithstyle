"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Info, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function CookiePreferences() {
  const router = useRouter()
  const [preferences, setPreferences] = useState({
    necessary: true, // Always enabled
    functional: false,
    analytics: false,
    marketing: false,
  })
  const [saved, setSaved] = useState(false)

  // Load saved preferences on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem("cookiePreferences")
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences)
        setPreferences({
          ...parsed,
          necessary: true, // Always ensure necessary cookies are enabled
        })
      } catch (e) {
        console.error("Error parsing saved cookie preferences", e)
      }
    }
  }, [])

  const handleToggle = (category) => {
    if (category === "necessary") return // Can't toggle necessary cookies

    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))

    // Reset saved state when changes are made
    setSaved(false)
  }

  const handleSave = () => {
    // Save preferences to localStorage
    localStorage.setItem("cookiePreferences", JSON.stringify(preferences))

    // Also update the main consent flag
    localStorage.setItem("cookieConsent", "customized")

    // Show saved confirmation
    setSaved(true)

    // Hide saved message after 3 seconds
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  const handleAcceptAll = () => {
    const allEnabled = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }

    setPreferences(allEnabled)
    localStorage.setItem("cookiePreferences", JSON.stringify(allEnabled))
    localStorage.setItem("cookieConsent", "accepted")
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-pink-500 hover:text-pink-600 transition-colors mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-serif font-medium mb-2">Cookie Preferences</h1>
        <p className="text-foreground/70">
          Customize your cookie preferences for our website. Some cookies are necessary for the website to function
          properly.
        </p>
      </div>

      <div className="space-y-6">
        {/* Necessary Cookies */}
        <div
          className={`border rounded-xl p-6 ${preferences.necessary ? "border-pink-200 bg-pink-50/30 dark:bg-zinc-800/50 dark:border-zinc-700" : "border-gray-200"}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium mb-1">Necessary Cookies</h2>
              <p className="text-sm text-foreground/70 mb-3">
                These cookies are required for the website to function properly. They cannot be disabled.
              </p>
            </div>
            <div className="relative inline-block w-12 h-6 mt-1">
              <input type="checkbox" className="opacity-0 w-0 h-0" checked={preferences.necessary} readOnly />
              <span
                className={`absolute cursor-not-allowed top-0 left-0 right-0 bottom-0 rounded-full transition-colors bg-pink-500`}
              ></span>
              <span
                className={`absolute h-5 w-5 left-0.5 top-0.5 bg-white rounded-full transition-transform transform ${preferences.necessary ? "translate-x-6" : ""}`}
              ></span>
            </div>
          </div>
          <div className="mt-2 text-xs bg-foreground/5 p-3 rounded-lg">
            <div className="flex items-start">
              <Info size={14} className="text-foreground/70 mr-2 mt-0.5" />
              <p>Includes cookies for session management, authentication, and security.</p>
            </div>
          </div>
        </div>

        {/* Functional Cookies */}
        <div
          className={`border rounded-xl p-6 ${preferences.functional ? "border-pink-200 bg-pink-50/30 dark:bg-zinc-800/50 dark:border-zinc-700" : "border-gray-200"}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium mb-1">Functional Cookies</h2>
              <p className="text-sm text-foreground/70 mb-3">
                These cookies enable personalized features and functionality.
              </p>
            </div>
            <div
              className="relative inline-block w-12 h-6 mt-1 cursor-pointer"
              onClick={() => handleToggle("functional")}
            >
              <input type="checkbox" className="opacity-0 w-0 h-0" checked={preferences.functional} readOnly />
              <span
                className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${preferences.functional ? "bg-pink-500" : "bg-gray-300 dark:bg-zinc-600"}`}
              ></span>
              <span
                className={`absolute h-5 w-5 left-0.5 top-0.5 bg-white rounded-full transition-transform transform ${preferences.functional ? "translate-x-6" : ""}`}
              ></span>
            </div>
          </div>
          <div className="mt-2 text-xs bg-foreground/5 p-3 rounded-lg">
            <div className="flex items-start">
              <Info size={14} className="text-foreground/70 mr-2 mt-0.5" />
              <p>Includes cookies for remembering your preferences, theme settings, and personalized content.</p>
            </div>
          </div>
        </div>

        {/* Analytics Cookies */}
        <div
          className={`border rounded-xl p-6 ${preferences.analytics ? "border-pink-200 bg-pink-50/30 dark:bg-zinc-800/50 dark:border-zinc-700" : "border-gray-200"}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium mb-1">Analytics Cookies</h2>
              <p className="text-sm text-foreground/70 mb-3">
                These cookies help us understand how visitors interact with our website.
              </p>
            </div>
            <div
              className="relative inline-block w-12 h-6 mt-1 cursor-pointer"
              onClick={() => handleToggle("analytics")}
            >
              <input type="checkbox" className="opacity-0 w-0 h-0" checked={preferences.analytics} readOnly />
              <span
                className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${preferences.analytics ? "bg-pink-500" : "bg-gray-300 dark:bg-zinc-600"}`}
              ></span>
              <span
                className={`absolute h-5 w-5 left-0.5 top-0.5 bg-white rounded-full transition-transform transform ${preferences.analytics ? "translate-x-6" : ""}`}
              ></span>
            </div>
          </div>
          <div className="mt-2 text-xs bg-foreground/5 p-3 rounded-lg">
            <div className="flex items-start">
              <Info size={14} className="text-foreground/70 mr-2 mt-0.5" />
              <p>
                Includes cookies for tracking page views, traffic sources, and user behavior to improve our service.
              </p>
            </div>
          </div>
        </div>

        {/* Marketing Cookies */}
        <div
          className={`border rounded-xl p-6 ${preferences.marketing ? "border-pink-200 bg-pink-50/30 dark:bg-zinc-800/50 dark:border-zinc-700" : "border-gray-200"}`}
        >
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-medium mb-1">Marketing Cookies</h2>
              <p className="text-sm text-foreground/70 mb-3">
                These cookies are used to display relevant advertisements and marketing campaigns.
              </p>
            </div>
            <div
              className="relative inline-block w-12 h-6 mt-1 cursor-pointer"
              onClick={() => handleToggle("marketing")}
            >
              <input type="checkbox" className="opacity-0 w-0 h-0" checked={preferences.marketing} readOnly />
              <span
                className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors ${preferences.marketing ? "bg-pink-500" : "bg-gray-300 dark:bg-zinc-600"}`}
              ></span>
              <span
                className={`absolute h-5 w-5 left-0.5 top-0.5 bg-white rounded-full transition-transform transform ${preferences.marketing ? "translate-x-6" : ""}`}
              ></span>
            </div>
          </div>
          <div className="mt-2 text-xs bg-foreground/5 p-3 rounded-lg">
            <div className="flex items-start">
              <Info size={14} className="text-foreground/70 mr-2 mt-0.5" />
              <p>Includes cookies for targeted advertising, ad measurement, and social media sharing.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-medium"
          >
            Save Preferences
          </button>
          <button
            onClick={handleAcceptAll}
            className="px-6 py-3 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 dark:hover:bg-zinc-800 transition-colors font-medium"
          >
            Accept All
          </button>
        </div>

        {saved && (
          <div className="flex items-center text-green-600 animate-fade-in">
            <Check size={16} className="mr-1" />
            <span>Preferences saved successfully</span>
          </div>
        )}
      </div>

      <div className="mt-12 border-t pt-6">
        <h3 className="text-lg font-medium mb-2">About Our Cookies</h3>
        <p className="text-sm text-foreground/70 mb-4">
          We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our
          traffic. By clicking "Accept All", you consent to our use of cookies.
        </p>
        <Link href="/cookies" className="text-pink-500 hover:text-pink-600 text-sm">
          Read our full Cookie Policy
        </Link>
      </div>
    </div>
  )
}
