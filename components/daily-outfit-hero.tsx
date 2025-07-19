"use client"

import { Button } from "@/components/ui/button"

import Image from "next/image"

interface DailyOutfitHeroProps {
  title?: string
  description?: string
  imageSrc: string
  date?: string
}

export function DailyOutfitHero({
  title = "Today's Featured Outfit",
  description = "Discover our stylist's pick for today: a versatile ensemble perfect for any occasion.",
  imageSrc,
  date = "May 24, 2024",
}: DailyOutfitHeroProps) {
  return (
    <section className="relative py-16 md:py-24 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="text-sm text-muted-foreground">{date}</div>
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground">{description}</p>
            <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
              View Full Outfit Details
            </Button>
          </div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
            <Image src={imageSrc || "/placeholder.svg"} alt="Daily outfit" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
