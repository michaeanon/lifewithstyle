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

export default function BodyTypesPage() {
  const [activeTab, setActiveTab] = useState("rectangle")
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The body types guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Body Types Guide"
          subtitle="Find styles that complement your unique body shape"
          backgroundImage="https://plus.unsplash.com/premium_photo-1680111700123-8759aae3b5b0?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Understanding Your Body Type</h2>
                <p className="text-lg mb-6">
                  Understanding your body type is the foundation of building a flattering wardrobe. This guide will help
                  you identify your natural silhouette and learn which styles, cuts, and proportions work best for you.
                </p>
                <p className="text-lg mb-8">
                  Remember that these are guidelines, not rules. The most important aspect of style is feeling confident
                  and comfortable in what you wear, regardless of "fashion rules."
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
                  src="https://plus.unsplash.com/premium_photo-1664886098887-a55ddcce4d3a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Body types illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Identifying Your Body Type</h2>
              <p className="text-lg mb-8">
                Body types are determined by your bone structure, muscle distribution, and where you naturally carry
                weight. Take measurements of your shoulders, bust, waist, and hips to help identify your shape.
              </p>

              <Tabs defaultValue="hourglass" className="w-full" onValueChange={setActiveTab}>
                <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="grid min-w-max grid-cols-5 bg-ilary-peachLight">
                    <TabsTrigger value="hourglass" className="data-[state=active]:bg-ilary-button">
                      Hourglass
                    </TabsTrigger>
                    <TabsTrigger value="pear" className="data-[state=active]:bg-ilary-button">
                      Pear
                    </TabsTrigger>
                    <TabsTrigger value="apple" className="data-[state=active]:bg-ilary-button">
                      Apple
                    </TabsTrigger>
                    <TabsTrigger value="rectangle" className="data-[state=active]:bg-ilary-button">
                      Rectangle
                    </TabsTrigger>
                    <TabsTrigger value="inverted" className="data-[state=active]:bg-ilary-button">
                      Inverted Triangle
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="hourglass" className={cn(activeTab === "hourglass" ? "block" : "hidden")}>
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1665931501377-c77e06e25d9b?q=80&w=1665&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Hourglass body type"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Hourglass Shape</h3>
                      <p className="mb-4">
                        The hourglass figure is characterized by a well-defined waist with balanced shoulders and hips.
                        Your bust and hip measurements are roughly the same, with a significantly smaller waist.
                      </p>
                      <h4 className="font-medium mb-2">Styling Tips:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Highlight your waist:</span> Wrap dresses, belted styles, and
                            fitted tops that accentuate your natural curves.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Balance proportions:</span> Fitted clothing that follows your
                            natural shape rather than oversized or boxy styles.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Showcase your curves:</span> V-necks, scoop necks, and
                            sweetheart necklines flatter your upper body.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {hourglassOutfits.map((outfit, index) => (
                      <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={
                              outfit.imageSrc ||
                              "https://images.unsplash.com/photo-1583333001978-8c57d752ce5b?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt={outfit.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-lg mb-1">{outfit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{outfit.description}</p>
                          <h4 className="text-sm font-medium mb-1">Key Pieces:</h4>
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

                {/* Similar content for other body types */}
                <TabsContent value="pear" className={cn(activeTab === "pear" ? "block" : "hidden")}>
                  {/* Pear body type content */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1719847396996-2df71d699cc0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Pear body type"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Pear Shape</h3>
                      <p className="mb-4">
                        The pear shape features hips that are wider than the shoulders, with a defined waist. Your hip
                        measurement is larger than your bust, creating a triangle-like silhouette.
                      </p>
                      <h4 className="font-medium mb-2">Styling Tips:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Balance proportions:</span> Draw attention to your upper body
                            with statement necklines, structured shoulders, and eye-catching tops.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Create definition:</span> A-line skirts and dresses that skim
                            over hips without clinging.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Choose the right pants:</span> Straight or wide-leg styles
                            that create a balanced silhouette.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="apple" className={cn(activeTab === "apple" ? "block" : "hidden")}>
                  {/* Apple body type content */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=1335&auto=format&fit=crop"
                        alt="Apple body type"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Apple Shape</h3>
                      <p className="mb-4">
                        The apple shape carries weight primarily in the midsection, with a less defined waist. Your
                        shoulders and hips are typically in proportion, with a fuller bust and midsection.
                      </p>
                      <h4 className="font-medium mb-2">Styling Tips:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Create vertical lines:</span> V-necks, open collars, and
                            vertical details draw the eye up and down.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Define your silhouette:</span> Empire waistlines and A-line
                            dresses that flow from under the bust.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Showcase your legs:</span> Straight or slim pants paired with
                            longer tops that hit at the hip.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rectangle" className={cn(activeTab === "rectangle" ? "block" : "hidden")}>
                  {/* Rectangle body type content */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1287&auto=format&fit=crop"
                        alt="Rectangle body type"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Rectangle Shape</h3>
                      <p className="mb-4">
                        The rectangle shape has shoulders, waist, and hips of similar measurements, creating a straight
                        silhouette. Your figure is balanced but may lack natural curves.
                      </p>
                      <h4 className="font-medium mb-2">Styling Tips:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Create curves:</span> Peplum tops, wrap dresses, and belted
                            styles to define the waist.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Add dimension:</span> Ruffles, pleats, and textured fabrics
                            add volume where desired.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Layer strategically:</span> Cropped jackets and cardigans that
                            hit at the waist create shape.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="inverted" className={cn(activeTab === "inverted" ? "block" : "hidden")}>
                  {/* Inverted Triangle body type content */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                      <Image
                        src="https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1287&auto=format&fit=crop"
                        alt="Inverted Triangle body type"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-4">Inverted Triangle Shape</h3>
                      <p className="mb-4">
                        The inverted triangle shape features shoulders that are broader than the hips, often with a
                        larger bust and less defined waist. Your upper body is proportionally wider than your lower
                        body.
                      </p>
                      <h4 className="font-medium mb-2">Styling Tips:</h4>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Balance proportions:</span> Full skirts, wide-leg pants, and
                            details at the hip create balance.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">De-emphasize shoulders:</span> V-necks, scoop necks, and
                            raglan sleeves soften the shoulder line.
                          </div>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 font-bold">•</span>
                          <div>
                            <span className="font-medium">Create curves:</span> Defined waistlines and hip-enhancing
                            details add feminine curves.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Universal Styling Principles</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Proportion & Balance</h3>
                    <p className="text-muted-foreground">
                      Creating visual balance is key for all body types. If you wear something voluminous on top,
                      balance it with something more fitted on the bottom, and vice versa.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Strategic Color Placement</h3>
                    <p className="text-muted-foreground">
                      Darker colors visually minimize areas while lighter colors and patterns draw attention. Use this
                      principle to highlight your favorite features.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Proper Fit</h3>
                    <p className="text-muted-foreground">
                      Well-fitted clothing that skims the body without pulling or sagging is flattering for all body
                      types. Consider tailoring key pieces for a custom fit.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">
                  Ready for Personalized Style Advice?
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Book a personal styling session with our experts who can provide tailored recommendations for your
                  unique body type and personal style preferences.
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

const hourglassOutfits = [
  {
    title: "Classic Wrap Dress",
    description: "A universally flattering style that accentuates the waist",
    imageSrc: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1173&auto=format&fit=crop",
    items: [
      "Wrap dress in solid color or print",
      "Pointed-toe heels or flats",
      "Delicate necklace",
      "Structured handbag",
    ],
  },
  {
    title: "High-Waisted Ensemble",
    description: "Highlights your natural waistline and balanced proportions",
    imageSrc: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1160&auto=format&fit=crop",
    items: ["Fitted top or blouse", "High-waisted wide-leg pants", "Statement belt", "Heeled sandals"],
  },
  {
    title: "Belted Blazer Look",
    description: "Professional style that maintains feminine curves",
    imageSrc: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=987&auto=format&fit=crop",
    items: ["Tailored blazer with belt", "Pencil skirt or slim pants", "V-neck blouse or shell", "Classic pumps"],
  },
]
