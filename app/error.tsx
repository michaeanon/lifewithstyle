"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-purple-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Oops! Something went wrong</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            We encountered an unexpected error. Don't worry, it's not your fault!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => reset()} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
