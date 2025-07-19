import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Life With Style",
  description: "Discover our range of personalized styling services to elevate your wardrobe and personal style.",
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-white">{children}</div>
}
