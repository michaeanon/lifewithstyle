"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Download, Palette } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { OutfitCard } from "@/components/outfit-card"
import { ActionButtons } from "@/components/action-buttons"
import { CapsuleGuide } from "@/components/capsule-guide"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface OutfitPageProps {
  params: {
    slug: string
  }
}

export default function OutfitPage({ params }: OutfitPageProps) {
  const guideRef = useRef<HTMLElement>(null)
  const { toast } = useToast()

  // In a real app, you would fetch the outfit data based on the slug
  const outfit = {
    title: "Summer Casual Elegance",
    description:
      "A light and breezy ensemble perfect for warm summer days, combining comfort with sophisticated style.",
    longDescription:
      "This carefully curated outfit brings together lightweight fabrics and neutral tones to create a versatile look that transitions seamlessly from day to evening. The flowing silhouette offers both comfort and elegance, while thoughtfully selected accessories add a touch of refinement without overwhelming the overall aesthetic.",
    category: "Summer",
    date: "June 15, 2025",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1170&auto=format&fit=crop",
    ],
    stylingTips: [
      "Pair with minimal gold jewelry for an elevated daytime look",
      "Add a structured blazer for cooler evenings or more formal settings",
      "Choose neutral-toned sandals to elongate the silhouette",
      "A small crossbody bag in a complementary tone keeps the look practical yet polished",
    ],
    colorPalette: ["#E8D2C3", "#C8A992", "#8A6552", "#F5EEE8", "#D9C5B4"],
  }

  // Similar outfits would be fetched from a database in a real app
  const similarOutfits = [
    {
      title: "Breezy Summer Day",
      description: "Light fabrics with neutral tones for warm days",
      imageSrc: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1160&auto=format&fit=crop",
      category: "Summer",
      slug: "outfit-1",
    },
    {
      title: "Summer Evening",
      description: "Elegant yet comfortable for summer nights",
      imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
      category: "Summer",
      slug: "outfit-2",
    },
    {
      title: "Beach Resort Style",
      description: "Vacation-ready look for seaside destinations",
      imageSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
      category: "Summer",
      slug: "outfit-3",
    },
  ]

  const handleDownloadGuide = () => {
    toast({
      title: "Color Guide Downloaded",
      description: "The color guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  const handleOpenColorWheel = () => {
    toast({
      title: "Color Wheel Tool",
      description: "Opening the interactive color wheel tool.",
    })
    // In a real app, this would open a color wheel tool or modal
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1 pt-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Link
            href="/outfits"
            className="inline-flex items-center text-sm font-medium hover:underline underline-offset-4 mb-8"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Outfits
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                <Image
                  src={outfit.imageSrc || "/placeholder.svg"}
                  alt={outfit.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                {outfit.additionalImages.map((src, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-md">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`${outfit.title} detail ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-sm text-muted-foreground">{outfit.date}</div>
                  <div className="text-sm px-2.5 py-0.5 rounded-full bg-ilary-peachLight font-medium">
                    {outfit.category}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{outfit.title}</h1>
                <p className="text-muted-foreground text-lg mb-6">{outfit.description}</p>
                <p className="mb-8">{outfit.longDescription}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Styling Tips</h2>
                <ul className="space-y-3">
                  {outfit.stylingTips.map((tip, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 rounded-full bg-ilary-button w-5 h-5 flex items-center justify-center text-xs text-foreground mt-0.5">
                        {i + 1}
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
                <div className="flex space-x-2 mb-4">
                  {outfit.colorPalette.map((color, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border border-ilary-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button
                    onClick={handleDownloadGuide}
                    className="flex items-center gap-2 bg-ilary-button hover:bg-ilary-buttonHover text-foreground"
                  >
                    <Download className="h-4 w-4" />
                    Download Color Guide
                  </Button>
                  <Button
                    onClick={handleOpenColorWheel}
                    variant="outline"
                    className="flex items-center gap-2 border-ilary-button text-foreground hover:bg-ilary-peachLight"
                  >
                    <Palette className="h-4 w-4" />
                    Color Wheel Tool
                  </Button>
                </div>
              </div>

              <Separator className="bg-ilary-border" />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="sm:flex-1 bg-ilary-button hover:bg-ilary-buttonHover text-foreground">
                  Save to Collection
                </Button>
                <Button variant="outline" className="sm:flex-1 border-ilary-button hover:bg-ilary-peachLight">
                  Share Outfit
                </Button>
              </div>
            </div>
          </div>

          <section className="mt-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Similar Outfits</h2>
                <p className="text-muted-foreground max-w-2xl">Explore more outfits in a similar style or category</p>
              </div>
              <Link href="/outfits" className="mt-4 md:mt-0 text-sm font-medium underline-offset-4 hover:underline">
                View All Outfits
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {similarOutfits.map((outfit, i) => (
                <OutfitCard
                  key={i}
                  title={outfit.title}
                  description={outfit.description}
                  imageSrc={outfit.imageSrc}
                  category={outfit.category}
                  slug={outfit.slug}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Action Buttons Section */}
        <ActionButtons guideRef={guideRef} className="mt-16" />

        {/* Capsule Guide Section */}
        <section ref={guideRef}>
          <CapsuleGuide />
        </section>
      </main>
      <Footer />
    </div>
  )
}
