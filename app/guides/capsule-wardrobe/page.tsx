"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { PageHero } from "@/components/page-hero"

export default function CapsuleWardrobePage() {
  const [activeTab, setActiveTab] = useState("essentials")
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The capsule wardrobe guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Capsule Wardrobe"
          subtitle="Build a timeless collection of versatile pieces that work perfectly together."
          backgroundImage="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop"
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Capsule Wardrobe Guide</h2>
                <p className="text-lg mb-6">
                  A capsule wardrobe is a curated collection of versatile, timeless pieces that can be mixed and matched
                  to create numerous outfits with minimal items. This approach simplifies your daily choices while
                  maximizing style options.
                </p>
                <p className="text-lg mb-8">
                  Our comprehensive guide will help you build a functional capsule wardrobe tailored to your personal
                  style, lifestyle needs, and seasonal requirements.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleDownloadGuide}
                    className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Complete Guide
                  </Button>
                  <Link href="/order">
                    <Button variant="outline" className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Book Styling Session
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop"
                  alt="Capsule wardrobe collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Benefits of a Capsule Wardrobe</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Simplifies Decision Making</h3>
                    <p className="text-muted-foreground">
                      Reduces decision fatigue by limiting choices to items that work well together, making getting
                      dressed quicker and less stressful.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Saves Money</h3>
                    <p className="text-muted-foreground">
                      Encourages thoughtful purchasing of quality pieces rather than impulse buying of trendy items that
                      quickly go out of style.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Environmentally Friendly</h3>
                    <p className="text-muted-foreground">
                      Promotes sustainable fashion by reducing consumption and focusing on quality items that last
                      longer.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Building Your Capsule Wardrobe</h2>
              <div className="bg-ilary-peachLight p-8 rounded-lg">
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="bg-ilary-button rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Assess Your Lifestyle</h3>
                      <p>
                        Consider how you spend most of your time. Do you work in a formal office, a casual environment,
                        or from home? Do you attend many social events? Your capsule should reflect your actual needs.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-ilary-button rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Define Your Personal Style</h3>
                      <p>
                        Identify colors, silhouettes, and styles that make you feel confident and comfortable. Create a
                        mood board if it helps visualize your aesthetic.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-ilary-button rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Audit Your Current Wardrobe</h3>
                      <p>
                        Sort through your clothes and keep only what fits, what you love, and what aligns with your
                        defined style. Donate or sell the rest.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-ilary-button rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-medium">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Identify Gaps</h3>
                      <p>
                        Determine what essential pieces you're missing to complete versatile outfits. Focus on quality
                        basics that can be mixed and matched.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="bg-ilary-button rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="font-medium">5</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">Shop Mindfully</h3>
                      <p>
                        Invest in high-quality pieces that will last. Consider versatility, fabric quality, and
                        construction when making new purchases.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Capsule Wardrobe Essentials</h2>
              <p className="text-lg mb-8">
                While your specific capsule will depend on your lifestyle and preferences, here are some timeless pieces
                that form the foundation of a versatile wardrobe:
              </p>

              <Tabs defaultValue="essentials" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-3 bg-ilary-peachLight">
                    <TabsTrigger value="essentials" className="data-[state=active]:bg-ilary-button">
                      Essentials
                    </TabsTrigger>
                    <TabsTrigger value="seasonal" className="data-[state=active]:bg-ilary-button">
                      Seasonal
                    </TabsTrigger>
                    <TabsTrigger value="accessories" className="data-[state=active]:bg-ilary-button">
                      Accessories
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="essentials" className={cn(activeTab === "essentials" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {essentials.map((item, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-square">
                          <Image
                            src={item.imageSrc || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="seasonal" className={cn(activeTab === "seasonal" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seasonal.map((item, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-square">
                          <Image
                            src={item.imageSrc || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="accessories" className={cn(activeTab === "accessories" ? "block" : "hidden")}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {accessories.map((item, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-square">
                          <Image
                            src={item.imageSrc || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Sample Outfit Combinations</h2>
              <p className="text-lg mb-8">
                Here are some examples of how you can mix and match your capsule wardrobe pieces to create different
                looks:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {outfitCombinations.map((outfit, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={outfit.imageSrc || "/placeholder.svg"}
                        alt={outfit.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{outfit.title}</h3>
                      <p className="text-muted-foreground mb-4">{outfit.description}</p>
                      <h4 className="font-medium mb-2">Includes:</h4>
                      <ul className="text-sm space-y-1">
                        {outfit.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Maintenance Tips</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Seasonal Refresh</h3>
                    <p className="mb-4">
                      Review your capsule every 3-4 months to adjust for seasonal changes. You don't need to completely
                      overhaul it—simply swap out a few pieces as needed.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Store off-season items properly to maintain their quality</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Assess what worked well and what didn't from the previous season</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Identify any gaps or replacement needs before the new season begins</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Quality Care</h3>
                    <p className="mb-4">
                      Proper garment care extends the life of your capsule pieces and maintains their appearance.
                    </p>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Follow care instructions on garment labels</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Invest in proper hangers to maintain garment shape</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Address stains and repairs promptly</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Consider professional cleaning for high-quality pieces</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Need Personalized Help?</h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Building the perfect capsule wardrobe can be challenging. Our professional stylists can help you
                  create a personalized plan tailored to your lifestyle, body type, and preferences.
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

const essentials = [
  {
    title: "White Button-Down Shirt",
    description: "A crisp white shirt works for both casual and formal occasions.",
    imageSrc: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Dark Wash Jeans",
    description: "Versatile jeans that can be dressed up or down.",
    imageSrc: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Black Blazer",
    description: "A structured blazer instantly elevates any outfit.",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
  },
  {
    title: "Little Black Dress",
    description: "The ultimate versatile piece for any occasion.",
    imageSrc: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "White Sneakers",
    description: "Clean, minimal sneakers that go with everything.",
    imageSrc: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Neutral Tote Bag",
    description: "A practical everyday bag in a versatile color.",
    imageSrc: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1287&auto=format&fit=crop",
  },
]

const seasonal = [
  {
    title: "Lightweight Cardigan",
    description: "Perfect for layering during transitional seasons.",
    imageSrc: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1305&auto=format&fit=crop",
  },
  {
    title: "Linen Shirt",
    description: "Breathable fabric ideal for warm weather.",
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1288&auto=format&fit=crop",
  },
  {
    title: "Wool Coat",
    description: "A timeless investment piece for colder months.",
    imageSrc: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Printed Midi Skirt",
    description: "Adds personality to your seasonal wardrobe.",
    imageSrc: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1364&auto=format&fit=crop",
  },
  {
    title: "Leather Jacket",
    description: "Adds edge to any outfit during cooler seasons.",
    imageSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1335&auto=format&fit=crop",
  },
  {
    title: "Ankle Boots",
    description: "Versatile footwear for fall and winter.",
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
  },
]

const accessories = [
  {
    title: "Gold Hoop Earrings",
    description: "Timeless earrings that complement any outfit.",
    imageSrc: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Silk Scarf",
    description: "Adds color and can be styled multiple ways.",
    imageSrc: "https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Leather Belt",
    description: "Defines the waist and adds polish to looks.",
    imageSrc: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Statement Necklace",
    description: "Elevates simple outfits for special occasions.",
    imageSrc: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Classic Watch",
    description: "A functional accessory that adds sophistication.",
    imageSrc: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Quality Sunglasses",
    description: "Protects your eyes while completing your look.",
    imageSrc: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1280&auto=format&fit=crop",
  },
]

const outfitCombinations = [
  {
    title: "Casual Friday",
    description: "Perfect for a relaxed office environment or weekend brunch",
    items: ["White button-down shirt", "Dark wash jeans", "Black blazer", "White sneakers", "Minimal gold jewelry"],
    imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
  },
  {
    title: "Evening Elegance",
    description: "Sophisticated look for dinner dates or formal events",
    items: ["Little black dress", "Statement earrings", "Classic heels", "Clutch purse", "Red lipstick"],
    imageSrc: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986&auto=format&fit=crop",
  },
  {
    title: "Weekend Getaway",
    description: "Comfortable yet stylish for travel and exploration",
    items: ["Linen shirt", "Dark wash jeans", "White sneakers", "Leather belt", "Quality sunglasses"],
    imageSrc: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470&auto=format&fit=crop",
  },
]
