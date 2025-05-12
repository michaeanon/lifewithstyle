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

export default function SeasonalTransitionsPage() {
  const [activeTab, setActiveTab] = useState("spring-summer")
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The seasonal transitions guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Seasonal Transitions"
          subtitle="How to adapt your wardrobe between seasons"
          backgroundImage="https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop"
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Seasonal Transitions Guide</h2>
                <p className="text-lg mb-6">
                  Navigating the changing seasons with style can be challenging. This guide will help you seamlessly
                  transition your wardrobe between seasons, maximizing the versatility of your clothing while staying
                  comfortable and fashionable.
                </p>
                <p className="text-lg mb-8">
                  Learn how to layer effectively, which pieces to invest in for year-round wear, and how to adapt your
                  existing wardrobe for changing weather conditions.
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
                  src="https://images.unsplash.com/photo-1511963211013-83bba110595d?q=80&w=1170&auto=format&fit=crop"
                  alt="Seasonal fashion transitions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">The Art of Layering</h2>
              <p className="text-lg mb-8">
                Mastering the art of layering is essential for navigating seasonal transitions. Layering allows you to
                adapt to temperature changes throughout the day while creating visually interesting outfits.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Base Layers</h3>
                    <p className="text-muted-foreground mb-4">
                      Start with lightweight, breathable fabrics that sit close to the skin and provide a foundation for
                      your outfit.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Thin cotton t-shirts and tanks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Lightweight long-sleeve tees</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Silk or cotton camisoles</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Fitted bodysuits</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Mid Layers</h3>
                    <p className="text-muted-foreground mb-4">
                      These provide insulation and can be added or removed as temperatures change throughout the day.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Lightweight sweaters and cardigans</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Button-down shirts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Vests and sleeveless knits</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Lightweight blazers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Outer Layers</h3>
                    <p className="text-muted-foreground mb-4">
                      The final layer provides protection from the elements and completes your look.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Trench coats and lightweight jackets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Denim or leather jackets</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Oversized cardigans or "coatigans"</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Structured blazers</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Seasonal Transition Strategies</h2>
              <p className="text-lg mb-8">
                Each seasonal shift presents unique challenges and opportunities for your wardrobe. Here are strategies
                for the major transitions:
              </p>

              <Tabs defaultValue="spring-summer" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-2 bg-ilary-peachLight">
                    <TabsTrigger value="spring-summer" className="data-[state=active]:bg-ilary-button">
                      Spring to Summer
                    </TabsTrigger>
                    <TabsTrigger value="fall-winter" className="data-[state=active]:bg-ilary-button">
                      Fall to Winter
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="spring-summer" className={cn(activeTab === "spring-summer" ? "block" : "hidden")}>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop"
                        alt="Spring to summer transition outfits"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Spring to Summer Transition</h3>
                      <p className="mb-4">
                        As temperatures rise, focus on gradually lightening your layers and incorporating more
                        breathable fabrics while maintaining versatility for unpredictable weather.
                      </p>
                      <h4 className="font-medium mb-2">Key Strategies:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Lighten your color palette:</span> Transition from deeper
                            spring tones to brighter summer hues.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Switch to lighter fabrics:</span> Replace heavier cottons with
                            linen and other breathable materials.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Incorporate versatile pieces:</span> Lightweight cardigans and
                            jackets that can be removed as the day warms up.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Adjust your accessories:</span> Swap closed-toe shoes for
                            sandals and lighter scarves for statement jewelry.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {springSummerOutfits.map((outfit, index) => (
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

                <TabsContent value="fall-winter" className={cn(activeTab === "fall-winter" ? "block" : "hidden")}>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1287&auto=format&fit=crop"
                        alt="Fall to winter transition outfits"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Fall to Winter Transition</h3>
                      <p className="mb-4">
                        As temperatures drop, focus on adding warmth through strategic layering while maintaining style
                        and comfort.
                      </p>
                      <h4 className="font-medium mb-2">Key Strategies:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Layer for warmth:</span> Add thermal base layers under your
                            regular clothing for added insulation.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Incorporate heavier fabrics:</span> Transition to wool,
                            cashmere, and other insulating materials.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Add weather-appropriate accessories:</span> Scarves, gloves,
                            and hats not only add warmth but also style.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Switch to winter footwear:</span> Replace lighter shoes with
                            boots and weather-resistant options.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {fallWinterOutfits.map((outfit, index) => (
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
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Year-Round Wardrobe Essentials</h2>
              <p className="text-lg mb-8">
                These versatile pieces form the foundation of a wardrobe that can transition seamlessly between seasons:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {yearRoundEssentials.map((item, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <div className="relative aspect-square">
                      <Image src={item.imageSrc || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">
                Fabric Guide for Seasonal Transitions
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Warm Weather Fabrics</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Linen:</span> Extremely breathable and lightweight, perfect for
                          hot weather. Wrinkles easily but this adds to its casual charm.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Cotton:</span> Versatile, breathable, and comfortable. Lighter
                          weaves like voile and lawn are ideal for summer.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Rayon/Viscose:</span> Semi-synthetic fabric that's lightweight
                          and drapes beautifully. Absorbs moisture and stays cool.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Silk:</span> Natural protein fiber that regulates temperature,
                          keeping you cool in summer and warm in winter.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Cool Weather Fabrics</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Wool:</span> Excellent insulator that regulates temperature and
                          wicks moisture. Merino wool is less itchy and works for transitional weather.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Cashmere:</span> Luxurious, soft, and incredibly warm despite
                          being lightweight. Perfect for layering.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Flannel:</span> Brushed cotton that traps air for insulation.
                          Soft and cozy for fall and winter.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Corduroy:</span> Ribbed cotton fabric that provides warmth and
                          texture. Available in different weights for various temperatures.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Need Personalized Advice?</h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Our professional stylists can help you create a versatile wardrobe that transitions seamlessly between
                  seasons, tailored to your lifestyle, preferences, and local climate.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Book a Consultation
                  </Button>
                </Link>
                <Link href="/outfit-combinations">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Outfit Combinations
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

const springSummerOutfits = [
  {
    title: "Light Layers Look",
    description: "Perfect for unpredictable spring days that warm up by afternoon",
    imageSrc: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1286&auto=format&fit=crop",
    items: [
      "Lightweight cotton t-shirt",
      "Linen button-down (worn open)",
      "Cropped chinos",
      "White sneakers",
      "Straw hat for sun protection",
    ],
  },
  {
    title: "Spring Evening Transition",
    description: "Elegant yet comfortable for cooler spring evenings",
    imageSrc: "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1064&auto=format&fit=crop",
    items: [
      "Silk camisole",
      "Lightweight cardigan",
      "Midi skirt",
      "Block heel sandals",
      "Light scarf (optional for cooler evenings)",
    ],
  },
  {
    title: "Early Summer Casual",
    description: "Breathable and stylish for warming temperatures",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    items: [
      "Linen shorts",
      "Cotton-blend t-shirt",
      "Light denim jacket (for morning/evening)",
      "Espadrilles",
      "Minimal jewelry",
    ],
  },
]

const fallWinterOutfits = [
  {
    title: "Early Fall Layers",
    description: "Adaptable outfit for fluctuating fall temperatures",
    imageSrc: "https://images.unsplash.com/photo-1551833726-b6e7210a2d7d?q=80&w=1287&auto=format&fit=crop",
    items: [
      "Lightweight turtleneck",
      "Utility jacket or shacket",
      "Straight-leg jeans",
      "Ankle boots",
      "Lightweight scarf",
    ],
  },
  {
    title: "Cozy Winter Transition",
    description: "Warm and stylish for colder days",
    imageSrc: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1287&auto=format&fit=crop",
    items: [
      "Thermal base layer",
      "Chunky knit sweater",
      "Wool coat",
      "Insulated boots",
      "Warm accessories (hat, gloves, scarf)",
    ],
  },
  {
    title: "Indoor-Outdoor Balance",
    description: "Adaptable for heated interiors and cold exteriors",
    imageSrc: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop",
    items: [
      "Lightweight merino wool sweater",
      "Button-down shirt",
      "Wool trousers",
      "Waterproof chelsea boots",
      "Packable down vest",
    ],
  },
]

const yearRoundEssentials = [
  {
    title: "White Button-Down Shirt",
    description: "Layer under sweaters in winter, wear alone or rolled up in summer.",
    imageSrc: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Dark Wash Jeans",
    description: "Pair with boots and layers in winter, t-shirts in summer.",
    imageSrc: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Lightweight Blazer",
    description: "A structured layer for air-conditioned spaces or cool evenings year-round.",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
  },
  {
    title: "Midi Skirt",
    description: "Wear with tights and boots in winter, sandals in summer.",
    imageSrc: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1364&auto=format&fit=crop",
  },
  {
    title: "Versatile Dress",
    description: "Layer with tights, boots, and cardigans or wear alone as temperatures change.",
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
  },
  {
    title: "Lightweight Knit Sweater",
    description: "Perfect alone in fall or as a layer in winter.",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
  },
  {
    title: "Ankle Boots",
    description: "Work with jeans, dresses, and skirts across multiple seasons.",
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
  },
  {
    title: "Trench Coat",
    description: "Classic outerwear that works for rain in spring or layering in fall.",
    imageSrc: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1472&auto=format&fit=crop",
  },
]
