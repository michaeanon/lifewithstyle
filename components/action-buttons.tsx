"use client"

import type React from "react"
import Link from "next/link"
import { ArrowDown, ShoppingBag, Grid, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActionButtonsProps {
  className?: string
  guideRef?: React.RefObject<HTMLElement>
}

export function ActionButtons({ className, guideRef }: ActionButtonsProps) {
  const handleScrollToGuide = () => {
    if (typeof window !== "undefined" && guideRef?.current) {
      guideRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className={cn("py-6 sm:py-8 bg-white", className)}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-wide mb-3 sm:mb-4">Elevate Your Style</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            Discover curated fashion inspiration, personalized styling advice, and outfit combinations designed to
            enhance your wardrobe and express your unique style.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <Button
            onClick={handleScrollToGuide}
            variant="outline"
            className="group h-auto py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-ilary-peachLight"
          >
            <ArrowDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
            <span className="text-sm sm:text-base font-medium">View Capsule Guide</span>
          </Button>

          <Link href="/contact" className="w-full">
            <Button className="w-full h-auto py-6 px-4 flex flex-col items-center justify-center gap-3 bg-ilary-button text-foreground hover:bg-ilary-buttonHover transition-all duration-300 hover:shadow-md">
              <ShoppingBag className="h-5 w-5" />
              <span className="text-base font-medium">Make an Order</span>
            </Button>
          </Link>

          <Link href="/outfit-combinations" className="w-full">
            <Button
              variant="outline"
              className="w-full h-auto py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-ilary-peachLight"
            >
              <Grid className="h-5 w-5" />
              <span className="text-base font-medium">See 10 Outfit Combinations</span>
            </Button>
          </Link>

          <Link href="/outfits" className="w-full">
            <Button
              variant="outline"
              className="w-full h-auto py-6 px-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:bg-ilary-peachLight"
            >
              <Eye className="h-5 w-5" />
              <span className="text-base font-medium">Browse All Outfits</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ActionButtons
