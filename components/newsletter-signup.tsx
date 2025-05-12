"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real implementation, you would send this data to your server
      // which would then add the subscriber to your newsletter list
      // and send confirmation emails from kambuchristine@gmail.com

      // Example of how this might be implemented with a server action:
      /*
      await subscribeToNewsletter({
        email,
        notificationEmail: "kambuchristine@gmail.com" // Owner gets notified of new subscribers
      });
      */

      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsLoading(false)
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      })
      setEmail("")
    } catch (error) {
      setIsLoading(false)
      toast({
        title: "Error subscribing",
        description: "There was a problem subscribing to the newsletter. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-medium mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-muted-foreground mb-6">
        Stay updated with our latest style guides, fashion tips, and exclusive content.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow"
        />
        <Button
          type="submit"
          className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover whitespace-nowrap"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
              Subscribing...
            </div>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </div>
  )
}
