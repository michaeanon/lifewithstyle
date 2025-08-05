"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Palette } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { PageHero } from "@/components/page-hero"

export default function ColorCoordinationPage() {
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The color coordination guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Color Coordination"
          subtitle="Master the art of combining colors for harmonious outfits"
          backgroundImage="https://images.unsplash.com/photo-1517472292914-9570a594783b?q=80&w=1666&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Color Coordination Guide</h2>
                <p className="text-lg mb-6">
                  Understanding color theory and how to coordinate colors is essential for creating harmonious and
                  visually appealing outfits. This guide will help you master the art of combining colors to express
                  your personal style with confidence.
                </p>
                <p className="text-lg mb-8">
                  Whether you prefer bold, vibrant combinations or subtle, monochromatic looks, these principles will
                  help you make intentional color choices that enhance your wardrobe.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleDownloadGuide}
                    className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download Color Guide
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                      toast({
                        title: "Color Wheel Tool",
                        description: "FEATURE COMING SOON!",
                      })
                    }}
                  >
                    <Palette className="h-4 w-4" />
                    Interactive Color Wheel
                  </Button>
                </div>
              </div>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1534119428213-bd2626145164?q=80&w=1287&auto=format&fit=crop"
                  alt="Color coordination fashion"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Color Theory Basics</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-medium mb-4">The Color Wheel</h3>
                  <p className="mb-4">
                    The color wheel is a circular arrangement of colors based on their chromatic relationship. It's
                    divided into three categories:
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Primary Colors:</span> Red, blue, and yellow. These cannot be
                        created by mixing other colors.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Secondary Colors:</span> Green, orange, and purple. Created by
                        mixing primary colors.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Tertiary Colors:</span> Created by mixing primary and secondary
                        colors (e.g., red-orange, blue-green).
                      </div>
                    </li>
                  </ul>
                  <div className="relative aspect-square max-w-xs mx-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1541140134513-85a161dc4a00?q=80&w=1287&auto=format&fit=crop"
                      alt="Color wheel"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-4">Color Properties</h3>
                  <p className="mb-4">Understanding these properties helps you make more nuanced color choices:</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Hue:</span> The pure color itself (red, blue, etc.).
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Saturation:</span> The intensity or purity of a color. High
                        saturation means vibrant; low saturation appears more muted or gray.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Value:</span> The lightness or darkness of a color. Adding white
                        creates a tint; adding black creates a shade.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Temperature:</span> How warm (reds, oranges, yellows) or cool
                        (blues, greens, purples) a color appears.
                      </div>
                    </li>
                  </ul>
                  <div className="relative aspect-video max-w-md mx-auto">
                    <Image
                      src="https://images.unsplash.com/photo-1513267048331-5611cad62e41?q=80&w=2070&auto=format&fit=crop"
                      alt="Color properties demonstration"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Color Harmony Schemes</h2>
              <p className="text-lg mb-8">
                Color harmony creates visual balance and aesthetic appeal. Here are the most common color schemes used
                in fashion:
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {colorSchemes.map((scheme, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={scheme.imageSrc || "/placeholder.svg"}
                        alt={scheme.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{scheme.title}</h3>
                      <p className="text-muted-foreground mb-4">{scheme.description}</p>
                      <div className="flex space-x-2">
                        {scheme.colorSamples.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border border-ilary-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">
                Finding Your Personal Color Palette
              </h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="mb-4">
                    Your personal color palette should complement your natural coloring—skin tone, hair color, and eye
                    color. Colors that harmonize with your natural features can enhance your appearance and make you
                    look more vibrant.
                  </p>
                  <h3 className="text-xl font-medium mb-3">Determining Your Undertone</h3>
                  <p className="mb-4">Skin undertones generally fall into three categories:</p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Warm:</span> Yellow, peachy, or golden undertones. Look best in
                        earthy colors like olive, rust, coral, and cream.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Cool:</span> Pink, red, or bluish undertones. Look best in jewel
                        tones, bright blues, pinks, and pure white.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 font-bold">•</span>
                      <div>
                        <span className="font-medium">Neutral:</span> A balance of warm and cool. Can wear most colors
                        successfully.
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1503236823255-94609f598e71?q=80&w=1469&auto=format&fit=crop"
                    alt="Color analysis demonstration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Practical Color Coordination Tips</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">The 60-30-10 Rule</h3>
                    <p className="text-muted-foreground">
                      Distribute colors in your outfit following this ratio: 60% dominant color (main pieces), 30%
                      secondary color (smaller pieces), and 10% accent color (accessories). This creates visual balance
                      and interest.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Neutrals as a Foundation</h3>
                    <p className="text-muted-foreground">
                      Build your wardrobe around neutral colors (black, white, gray, navy, beige) as they pair easily
                      with almost everything. Add pops of color through accessories or statement pieces.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-3">Consider the Occasion</h3>
                    <p className="text-muted-foreground">
                      Brighter colors and bold combinations work well for casual settings, while more subdued or
                      monochromatic palettes are often appropriate for formal or professional environments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Example Outfit Color Combinations</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {outfitExamples.map((outfit, index) => (
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
                      <div className="flex space-x-2 mb-4">
                        {outfit.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full border border-ilary-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
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

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">
                  Ready to Transform Your Wardrobe?
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Book a personal color analysis session with our expert stylists to discover your most flattering
                  colors and learn how to create harmonious outfits that enhance your natural beauty.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Book a Color Analysis
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

const colorSchemes = [
  {
    title: "Monochromatic",
    description: "Different shades, tints, and tones of a single color for a sophisticated, cohesive look.",
    imageSrc: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1287&auto=format&fit=crop",
    colorSamples: ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"],
  },
  {
    title: "Analogous",
    description: "Colors that are adjacent to each other on the color wheel, creating a harmonious, cohesive look.",
    imageSrc: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?q=80&w=1472&auto=format&fit=crop",
    colorSamples: ["#d9ed92", "#b5e48c", "#99d98c", "#76c893", "#52b69a"],
  },
  {
    title: "Complementary",
    description: "Colors opposite each other on the color wheel, creating a high-contrast, vibrant look.",
    imageSrc: "https://images.unsplash.com/photo-1549062572-544a64fb0c56?q=80&w=1287&auto=format&fit=crop",
    colorSamples: ["#5f0f40", "#9a031e", "#fb8b24", "#e36414", "#0f4c5c"],
  },
  {
    title: "Triadic",
    description:
      "Three colors equally spaced around the color wheel, offering vibrant contrast while maintaining balance.",
    imageSrc: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?q=80&w=1287&auto=format&fit=crop",
    colorSamples: ["#588b8b", "#ffffff", "#ffd5c2", "#f28f3b", "#c8553d"],
  },
  {
    title: "Split-Complementary",
    description:
      "A base color plus the two colors adjacent to its complement, offering high contrast with less tension.",
    imageSrc: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1446&auto=format&fit=crop",
    colorSamples: ["#ffd166", "#06d6a0", "#118ab2", "#073b4c", "#ef476f"],
  },
  {
    title: "Neutral with Pop",
    description: "Primarily neutral colors with one vibrant accent color for visual interest and focal point.",
    imageSrc: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1470&auto=format&fit=crop",
    colorSamples: ["#ede0d4", "#e6ccb2", "#ddb892", "#7f5539", "#9c6644"],
  },
]

const outfitExamples = [
  {
    title: "Classic Monochrome",
    description: "Sophisticated black and white combination with textural interest",
    imageSrc: "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?q=80&w=1287&auto=format&fit=crop",
    colors: ["#000000", "#333333", "#ffffff", "#eeeeee"],
    items: [
      "Black tailored blazer",
      "White silk blouse",
      "Black tapered trousers",
      "White leather sneakers",
      "Silver minimal jewelry",
    ],
  },
  {
    title: "Earthy Neutrals",
    description: "Warm, natural tones that work beautifully together",
    imageSrc: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1287&auto=format&fit=crop",
    colors: ["#e6ccb2", "#ddb892", "#b08968", "#7f5539"],
    items: [
      "Camel cashmere sweater",
      "Chocolate brown leather jacket",
      "Beige wide-leg pants",
      "Cognac leather boots",
      "Gold-tone accessories",
    ],
  },
  {
    title: "Bold Complementary",
    description: "High-impact look using colors opposite on the color wheel",
    imageSrc: "https://images.unsplash.com/photo-1589465885857-44edb59bbff2?q=80&w=1287&auto=format&fit=crop",
    colors: ["#0077b6", "#00b4d8", "#e76f51", "#f4a261"],
    items: [
      "Cobalt blue dress",
      "Coral statement necklace",
      "Tan leather belt",
      "Coral heeled sandals",
      "Gold minimal earrings",
    ],
  },
]
