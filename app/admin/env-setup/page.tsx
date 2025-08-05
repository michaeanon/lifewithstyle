"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, ExternalLink, Settings } from "lucide-react"

export default function EnvSetupPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [values, setValues] = useState({
    // Newsletter Variables
    EMAILJS_NEWSLETTER_SERVICE_ID: "service_bm678wj",
    EMAILJS_NEWSLETTER_TEMPLATE_ID: "template_o1sojhj",
    EMAILJS_NEWSLETTER_PUBLIC_KEY: "lPuC5fklczhQTehWl",
    EMAILJS_NEWSLETTER_PRIVATE_KEY: "Fn6fL27FubCTToqnbWVpt",

    // Booking Variables - CORRECTED TEMPLATE ID
    EMAILJS_SERVICE_ID: "service_5e6hoci",
    EMAILJS_TEMPLATE_ID: "template_tgts0qs", // CORRECTED: was template_tqts0qs, now template_tgts0qs
    EMAILJS_PUBLIC_KEY: "lPuC5fklczhQTehWl",
    EMAILJS_PRIVATE_KEY: "Fn6fL27FubCTToqnbWVpt",
  })

  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleValueChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                EmailJS Environment Variables Setup
              </h1>
              <p className="text-gray-600">Configure your EmailJS credentials for newsletter and booking systems</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <a href="https://dashboard.emailjs.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  EmailJS Dashboard
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Vercel Dashboard
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {/* Newsletter Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-700">Newsletter Variables (template_o1sojhj)</CardTitle>
              <p className="text-sm text-gray-600">
                These variables are used for newsletter subscription confirmations
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(values)
                .filter(([key]) => key.includes("NEWSLETTER"))
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-green-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Variable Name</label>
                      <div className="flex items-center gap-2">
                        <Input value={key} readOnly className="font-mono text-sm bg-white" />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(key, `${key}-name`)}>
                          {copiedKey === `${key}-name` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Variable Value</label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={value}
                          onChange={(e) => handleValueChange(key, e.target.value)}
                          className="font-mono text-sm"
                          type={key.includes("PRIVATE") ? "password" : "text"}
                        />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(value, `${key}-value`)}>
                          {copiedKey === `${key}-value` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Booking Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-blue-700">Booking Variables (template_tgts0qs)</CardTitle>
              <p className="text-sm text-gray-600">These variables are used for booking confirmations</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(values)
                .filter(([key]) => !key.includes("NEWSLETTER"))
                .map(([key, value]) => (
                  <div key={key} className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Variable Name</label>
                      <div className="flex items-center gap-2">
                        <Input value={key} readOnly className="font-mono text-sm bg-white" />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(key, `${key}-name`)}>
                          {copiedKey === `${key}-name` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Variable Value</label>
                      <div className="flex items-center gap-2">
                        <Input
                          value={value}
                          onChange={(e) => handleValueChange(key, e.target.value)}
                          className="font-mono text-sm"
                          type={key.includes("PRIVATE") ? "password" : "text"}
                        />
                        <Button size="sm" variant="outline" onClick={() => copyToClipboard(value, `${key}-value`)}>
                          {copiedKey === `${key}-value` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    1
                  </Badge>
                  <div>
                    <p className="font-medium">Copy Variable Names and Values</p>
                    <p className="text-sm text-gray-600">
                      Use the copy buttons above to copy each variable name and value
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    2
                  </Badge>
                  <div>
                    <p className="font-medium">Go to Vercel Project Settings</p>
                    <p className="text-sm text-gray-600">Navigate to your project → Settings → Environment Variables</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    3
                  </Badge>
                  <div>
                    <p className="font-medium">Add Each Variable</p>
                    <p className="text-sm text-gray-600">
                      Click "Add New" and paste the variable name and value for each environment (Production, Preview,
                      Development)
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge variant="outline" className="mt-1">
                    4
                  </Badge>
                  <div>
                    <p className="font-medium">Redeploy Your Project</p>
                    <p className="text-sm text-gray-600">
                      After adding all variables, redeploy your project for changes to take effect
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
