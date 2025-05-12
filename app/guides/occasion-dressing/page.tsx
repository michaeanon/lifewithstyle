"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { PageHero } from "@/components/page-hero"

export default function OccasionDressingPage() {
  const [activeTab, setActiveTab] = useState("formal")
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The occasion dressing guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Occasion Dressing"
          subtitle="Style guides for different events and occasions"
          backgroundImage="https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Occasion Dressing Guide</h2>
                <p className="text-lg mb-6">
                  Dressing appropriately for different occasions can be challenging. This comprehensive guide will help
                  you navigate dress codes and create perfect outfits for any event, from formal galas to casual
                  gatherings.
                </p>
                <p className="text-lg mb-8">
                  Learn how to interpret dress codes, select appropriate attire, and add personal touches that express
                  your unique style while respecting the occasion's requirements.
                </p>
                <Button
                  onClick={handleDownloadGuide}
                  className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Complete Guide
                </Button>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1600091166886-c7a68d63d5cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Elegant occasion dressing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Understanding Dress Codes</h2>
              <p className="text-lg mb-8">
                Dress codes provide guidance on what to wear for specific events. Here's a breakdown of common dress
                codes and what they typically mean:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dressCodes.map((code, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <div className="relative aspect-[3/2] overflow-hidden">
                      <Image src={code.imageSrc || "/placeholder.svg"} alt={code.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{code.title}</h3>
                      <p className="text-muted-foreground mb-4">{code.description}</p>
                      <h4 className="font-medium mb-2">Key Elements:</h4>
                      <ul className="text-sm space-y-1">
                        {code.keyElements.map((element, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{element}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Outfit Ideas by Occasion</h2>
              <p className="text-lg mb-8">
                Browse our curated outfit suggestions for different occasions to inspire your next event look:
              </p>

              <Tabs defaultValue="formal" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="grid min-w-max grid-cols-5 bg-ilary-peachLight">
                    <TabsTrigger value="formal" className="data-[state=active]:bg-ilary-button">
                      Formal Events
                    </TabsTrigger>
                    <TabsTrigger value="business" className="data-[state=active]:bg-ilary-button">
                      Business
                    </TabsTrigger>
                    <TabsTrigger value="cocktail" className="data-[state=active]:bg-ilary-button">
                      Cocktail
                    </TabsTrigger>
                    <TabsTrigger value="casual" className="data-[state=active]:bg-ilary-button">
                      Smart Casual
                    </TabsTrigger>
                    <TabsTrigger value="special" className="data-[state=active]:bg-ilary-button">
                      Special Occasions
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="formal" className={cn(activeTab === "formal" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formalOutfits.map((outfit, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={outfit.imageSrc || "/placeholder.svg"}
                            alt={outfit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
                          <h4 className="text-sm font-medium mb-1">Includes:</h4>
                          <ul className="text-xs space-y-1">
                            {outfit.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="business" className={cn(activeTab === "business" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {businessOutfits.map((outfit, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={outfit.imageSrc || "/placeholder.svg"}
                            alt={outfit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
                          <h4 className="text-sm font-medium mb-1">Includes:</h4>
                          <ul className="text-xs space-y-1">
                            {outfit.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="cocktail" className={cn(activeTab === "cocktail" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cocktailOutfits.map((outfit, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={outfit.imageSrc || "/placeholder.svg"}
                            alt={outfit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
                          <h4 className="text-sm font-medium mb-1">Includes:</h4>
                          <ul className="text-xs space-y-1">
                            {outfit.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="casual" className={cn(activeTab === "casual" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {casualOutfits.map((outfit, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={outfit.imageSrc || "/placeholder.svg"}
                            alt={outfit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
                          <h4 className="text-sm font-medium mb-1">Includes:</h4>
                          <ul className="text-xs space-y-1">
                            {outfit.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="special" className={cn(activeTab === "special" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {specialOutfits.map((outfit, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={outfit.imageSrc || "/placeholder.svg"}
                            alt={outfit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
                          <h4 className="text-sm font-medium mb-1">Includes:</h4>
                          <ul className="text-xs space-y-1">
                            {outfit.items.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">
                Essential Tips for Occasion Dressing
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Research the Venue</h3>
                    <p className="mb-4">
                      The location of an event can provide important clues about appropriate attire. Consider these
                      factors:
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Indoor vs. outdoor (weather considerations)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Formality of the venue (luxury hotel vs. backyard)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Practical concerns (grass, sand, stairs, etc.)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Cultural or religious considerations</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Consider the Time of Day</h3>
                    <p className="mb-4">The timing of an event significantly influences appropriate attire:</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Daytime events: Lighter colors, less formal fabrics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Evening events: Darker colors, more luxurious fabrics</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Multi-part events: Consider outfit transitions or layers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Seasonal considerations for time-appropriate fabrics</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">When in Doubt</h3>
                    <p className="mb-4">If you're uncertain about the dress code or appropriate attire:</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Ask the host for clarification</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>It's better to be slightly overdressed than underdressed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Bring layers or accessories that can dress an outfit up or down</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Consider versatile pieces that work across formality levels</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Personal Expression</h3>
                    <p className="mb-4">Finding the balance between dress codes and personal style:</p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Express yourself through subtle details and accessories</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Choose colors and silhouettes that flatter your body type</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Incorporate signature elements that reflect your personal style</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Remember that confidence is the most important accessory</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

const dressCodes = [
  {
    title: "Formal / Black Tie",
    description: "The highest level of formality. Expect floor-length gowns and tuxedos.",
    imageSrc: "https://www.shutterstock.com/shutterstock/photos/193059866/display_1500/stock-photo-black-tie-on-a-white-background-193059866.jpg",
    keyElements: ["Floor-length gown", "Tuxedo", "Elegant jewelry", "Heels"],
  },
  {
    title: "Semi-Formal",
    description:
      "A step down from formal, but still requires dressing up. Cocktail dresses and dressy separates are appropriate.",
    imageSrc: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=983&auto=format&fit=crop",
    keyElements: ["Cocktail dress", "Dressy separates", "Suit or blazer", "Heels or dressy flats"],
  },
  {
    title: "Business Professional",
    description: "Conservative and professional attire suitable for a traditional office environment.",
    imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361&auto=format&fit=crop",
    keyElements: ["Suit", "Button-down shirt", "Pencil skirt or trousers", "Closed-toe shoes"],
  },
  {
    title: "Business Casual",
    description: "A more relaxed version of business attire, allowing for more casual separates and comfortable shoes.",
    imageSrc: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1473&auto=format&fit=crop",
    keyElements: ["Blazer", "Sweater", "Khakis or chinos", "Loafers or flats"],
  },
  {
    title: "Casual",
    description: "Relaxed and comfortable clothing suitable for everyday activities.",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    keyElements: ["Jeans", "T-shirt", "Sneakers", "Sandals"],
  },
]

const formalOutfits = [
  {
    title: "Classic Black Gown",
    description: "A timeless choice for any formal event.",
    imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
    items: ["Black gown", "Diamond earrings", "Clutch", "Heels"],
  },
  {
    title: "Elegant Red Dress",
    description: "Make a statement with a bold red dress.",
    imageSrc: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1446&auto=format&fit=crop",
    items: ["Red dress", "Gold necklace", "Clutch", "Heels"],
  },
  {
    title: "Sophisticated Navy Gown",
    description: "A chic and understated option for formal occasions.",
    imageSrc: "https://plus.unsplash.com/premium_photo-1661346155109-b3c30085c744?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    items: ["Navy gown", "Pearl earrings", "Clutch", "Heels"],
  },
]

const businessOutfits = [
  {
    title: "Power Suit",
    description: "Command attention in a classic power suit.",
    imageSrc: "https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop",
    items: ["Blazer", "Trousers", "Button-down shirt", "Heels"],
  },
  {
    title: "Pencil Skirt and Blouse",
    description: "A polished and professional look for the office.",
    imageSrc: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=987&auto=format&fit=crop",
    items: ["Pencil skirt", "Blouse", "Cardigan", "Flats"],
  },
  {
    title: "Sheath Dress and Blazer",
    description: "A versatile and stylish option for business meetings.",
    imageSrc: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1473&auto=format&fit=crop",
    items: ["Sheath dress", "Blazer", "Necklace", "Heels"],
  },
]

const cocktailOutfits = [
  {
    title: "Little Black Dress",
    description: "A wardrobe staple for cocktail parties.",
    imageSrc: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986&auto=format&fit=crop",
    items: ["Little black dress", "Statement earrings", "Clutch", "Heels"],
  },
  {
    title: "Sequin Dress",
    description: "Add some sparkle to your cocktail attire.",
    imageSrc: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?q=80&w=1287&auto=format&fit=crop",
    items: ["Sequin dress", "Delicate necklace", "Clutch", "Heels"],
  },
  {
    title: "Jumpsuit",
    description: "A modern and chic alternative to a dress.",
    imageSrc: "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1287&auto=format&fit=crop",
    items: ["Jumpsuit", "Bold bracelet", "Clutch", "Heels"],
  },
]

const casualOutfits = [
  {
    title: "Jeans and T-Shirt",
    description: "A comfortable and classic casual look.",
    imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1288&auto=format&fit=crop",
    items: ["Jeans", "T-shirt", "Sneakers", "Backpack"],
  },
  {
    title: "Sundress",
    description: "A breezy and effortless option for warm weather.",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    items: ["Sundress", "Sandals", "Sunglasses", "Tote bag"],
  },
  {
    title: "Shorts and Tank Top",
    description: "A relaxed and casual outfit for summer days.",
    imageSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470&auto=format&fit=crop",
    items: ["Shorts", "Tank top", "Sandals", "Hat"],
  },
]

const specialOutfits = [
  {
    title: "Lace Dress",
    description: "A romantic and elegant choice for special occasions.",
    imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
    items: ["Lace dress", "Pearl necklace", "Clutch", "Heels"],
  },
  {
    title: "Velvet Dress",
    description: "A luxurious and sophisticated option for formal events.",
    imageSrc: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1446&auto=format&fit=crop",
    items: ["Velvet dress", "Diamond bracelet", "Clutch", "Heels"],
  },
  {
    title: "Statement Gown",
    description: "Make a lasting impression with a unique and eye-catching gown.",
    imageSrc: "https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?q=80&w=1287&auto=format&fit=crop",
    items: ["Statement gown", "Elegant earrings", "Clutch", "Heels"],
  },
]
