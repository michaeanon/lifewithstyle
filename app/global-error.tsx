"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 to-purple-50">
          <div className="text-center space-y-6 p-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">Something went wrong!</h1>
              <p className="text-gray-600 max-w-md mx-auto">We encountered an unexpected error. Please try again.</p>
            </div>

            <Button onClick={() => reset()} className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          </div>
        </div>
      </body>
    </html>
  )
}
