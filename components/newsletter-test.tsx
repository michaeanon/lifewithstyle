"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Mail, CheckCircle, AlertCircle, Settings, Bug } from "lucide-react"

export default function NewsletterTest() {
  const [testData, setTestData] = useState({
    email: "",
    firstName: "Test",
    lastName: "User",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleTest = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/newsletter/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: "Network error",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRealTest = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const data = await response.json()
      setResult({
        ...data,
        isRealTest: true,
      })
    } catch (error) {
      setResult({
        success: false,
        message: "Network error",
        error: error instanceof Error ? error.message : "Unknown error",
        isRealTest: true,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            EmailJS Newsletter Test Tool
          </CardTitle>
          <p className="text-sm text-gray-600">
            Test your newsletter EmailJS configuration to debug email delivery issues.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="First Name"
              value={testData.firstName}
              onChange={(e) => setTestData({ ...testData, firstName: e.target.value })}
            />
            <Input
              placeholder="Last Name"
              value={testData.lastName}
              onChange={(e) => setTestData({ ...testData, lastName: e.target.value })}
            />
          </div>
          <Input
            type="email"
            placeholder="Test Email Address"
            value={testData.email}
            onChange={(e) => setTestData({ ...testData, email: e.target.value })}
            required
          />

          <div className="flex gap-2">
            <Button onClick={handleTest} disabled={isLoading || !testData.email} className="flex-1">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Settings className="w-4 h-4 mr-2" />
                  Send Test Email
                </>
              )}
            </Button>

            <Button
              onClick={handleRealTest}
              disabled={isLoading || !testData.email}
              variant="outline"
              className="flex-1 bg-transparent"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <Bug className="w-4 h-4 mr-2" />
                  Test Real Subscription
                </>
              )}
            </Button>
          </div>

          {result && (
            <div className="space-y-4">
              <div
                className={`p-4 rounded-lg flex items-center gap-2 ${
                  result.success
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {result.success ? (
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                )}
                <span>{result.message}</span>
                {result.isRealTest && (
                  <Badge variant="outline" className="ml-auto">
                    Real Test
                  </Badge>
                )}
              </div>

              {result.config && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    EmailJS Configuration:
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Service ID:</span>
                      <Badge variant="outline">{result.config.service_id}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Template ID:</span>
                      <Badge variant="outline">{result.config.template_id}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>User ID:</span>
                      <Badge variant="outline">{result.config.user_id}</Badge>
                    </div>
                    {result.status && (
                      <div className="flex items-center justify-between">
                        <span>HTTP Status:</span>
                        <Badge variant={result.status === 200 ? "default" : "destructive"}>{result.status}</Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {result.response && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">EmailJS Response:</h4>
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap bg-white p-2 rounded border">
                    {result.response}
                  </pre>
                </div>
              )}

              {result.error && (
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-medium mb-2 text-red-700">Error Details:</h4>
                  <pre className="text-xs text-red-600 whitespace-pre-wrap bg-white p-2 rounded border">
                    {result.error}
                  </pre>
                </div>
              )}

              {result.debug && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-medium mb-2 text-yellow-700">Debug Information:</h4>
                  <pre className="text-xs text-yellow-600 whitespace-pre-wrap bg-white p-2 rounded border">
                    {JSON.stringify(result.debug, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Environment Variables Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p className="text-gray-600">
              Make sure these environment variables are set in your Vercel dashboard for the newsletter system:
            </p>
            <div className="bg-gray-50 p-3 rounded font-mono text-xs space-y-1">
              <div>
                <strong>Newsletter-specific variables (recommended):</strong>
              </div>
              <div>EMAILJS_NEWSLETTER_SERVICE_ID = your_service_id</div>
              <div>EMAILJS_NEWSLETTER_TEMPLATE_ID = template_o1sojhj</div>
              <div>EMAILJS_NEWSLETTER_PUBLIC_KEY = your_public_key</div>
              <div>EMAILJS_NEWSLETTER_PRIVATE_KEY = your_private_key</div>
              <br />
              <div>
                <strong>Fallback variables (if newsletter-specific not set):</strong>
              </div>
              <div>EMAILJS_SERVICE_ID = your_service_id</div>
              <div>EMAILJS_TEMPLATE_ID = template_o1sojhj</div>
              <div>EMAILJS_PUBLIC_KEY = your_public_key</div>
              <div>EMAILJS_PRIVATE_KEY = your_private_key</div>
            </div>
            <p className="text-amber-600 text-xs">
              ⚠️ Note: The system will first try newsletter-specific variables, then fall back to general ones.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
