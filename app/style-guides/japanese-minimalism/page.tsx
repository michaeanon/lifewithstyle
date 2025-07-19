"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { PageHero } from "@/components/page-hero"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function JapaneseMinimalismPage() {
  const { toast } = useToast()

  const handleDownload = () => {
    toast({
      title: "Style Guide Downloaded",
      description: "Your Japanese Minimalism style guide has been saved to your downloads.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Japanese Minimalism"
          subtitle="Discover the art of wabi-sabi through thoughtful design and mindful dressing"
          backgroundImage="https://images.unsplash.com/photo-1526887520775-4b14b8aed897?q=80&w=1287&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12 pb-16">
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/inspiration/minimalist-aesthetics"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Minimalist Aesthetics
            </Link>
            <Button onClick={handleDownload} className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
              <Download className="mr-2 h-4 w-4" />
              Download Guide
            </Button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Philosophy Section */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-ilary-peachLight to-ilary-peach/20 p-8 rounded-lg mb-8">
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">The Philosophy of Wabi-Sabi</h2>
                <p className="text-lg mb-4">
                  Japanese minimalism embraces the beauty of imperfection and impermanence. Rooted in Zen Buddhism and
                  the aesthetic philosophy of wabi-sabi, this style finds profound beauty in simplicity, asymmetry, and
                  the natural aging process.
                </p>
                <p className="text-lg">
                  It's about creating harmony through thoughtful design, celebrating natural materials, and finding
                  peace in the space between elements - what the Japanese call "ma" (間).
                </p>
              </div>
            </div>

            {/* Key Principles */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Core Principles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {keyPrinciples.map((principle, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-ilary-peachLight rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-ilary-button" />
                      </div>
                      <h3 className="font-medium mb-2">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground">{principle.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Silhouettes & Design */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Signature Silhouettes</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6">
                    Japanese minimalism favors oversized, architectural silhouettes that create interesting negative
                    space around the body. The focus is on the relationship between form and emptiness.
                  </p>
                  <div className="space-y-4">
                    {silhouetteFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-ilary-button mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{feature.name}</span>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1505&auto=format&fit=crop"
                    alt="Japanese minimalist silhouettes"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Color Philosophy */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Color Harmony</h2>
              <div className="bg-ilary-peachLight p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Natural Palette</h3>
                    <p className="mb-6">
                      Inspired by traditional Japanese aesthetics, the color palette draws from nature - earth, stone,
                      wood, and water. Occasional deep accent colors provide grounding.
                    </p>
                    <div className="grid grid-cols-5 gap-3">
                      {colorPalette.map((color, index) => (
                        <div key={index} className="text-center">
                          <div
                            className={`w-12 h-12 rounded-full mx-auto mb-2 ${color.class}`}
                            style={{ backgroundColor: color.hex }}
                          />
                          <p className="text-xs font-medium">{color.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=1470&auto=format&fit=crop"
                      alt="Japanese color inspiration"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Outfit Inspirations */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Style Inspirations</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {outfitExamples.map((outfit, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={outfit.image || "/placeholder.svg"}
                        alt={outfit.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white text-foreground">{outfit.occasion}</Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-medium text-white mb-1">{outfit.title}</h3>
                        <p className="text-sm text-white/80">{outfit.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-2">Key Elements:</h4>
                      <ul className="text-sm space-y-1">
                        {outfit.elements.map((element, i) => (
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

            {/* Fabric & Materials */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Materials & Textures</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {materialGuide.map((material, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-3">{material.name}</h3>
                      <p className="text-muted-foreground mb-4">{material.description}</p>
                      <div className="text-sm font-medium text-ilary-button">{material.usage}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-ilary-peach to-ilary-peachLight p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Embrace Mindful Dressing</h2>
                  <p className="mb-6">
                    Let our stylists guide you in creating a wardrobe that reflects the serene beauty and thoughtful
                    design principles of Japanese minimalism.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        Book a Consultation
                      </Button>
                    </Link>
                    <Link href="/guides/sustainable-fashion">
                      <Button variant="outline" className="border-ilary-button hover:bg-white/20">
                        Sustainable Fashion Guide
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471&auto=format&fit=crop"
                    alt="Japanese minimalist wardrobe"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Toaster />
    </div>
  )
}

// Data arrays
const keyPrinciples = [
  {
    title: "Wabi-Sabi",
    description: "Finding beauty in imperfection and the natural aging process",
  },
  {
    title: "Ma (間)",
    description: "The power of negative space and thoughtful emptiness",
  },
  {
    title: "Kanso",
    description: "Simplicity achieved through elimination of clutter",
  },
  {
    title: "Shizen",
    description: "Naturalness without pretense or artificiality",
  },
  {
    title: "Kokō",
    description: "Austere beauty that comes from age and wear",
  },
  {
    title: "Seijaku",
    description: "Tranquility and peace through mindful design",
  },
]

const silhouetteFeatures = [
  {
    name: "Oversized Proportions",
    description: "Generous cuts that create interesting shapes and shadows",
  },
  {
    name: "Asymmetrical Details",
    description: "Off-center buttons, uneven hems, and unexpected closures",
  },
  {
    name: "Layering Potential",
    description: "Pieces designed to work together in multiple combinations",
  },
  {
    name: "Architectural Lines",
    description: "Structured elements that create visual interest",
  },
]

const colorPalette = [
  { name: "Ivory", hex: "#FFFEF7", class: "bg-stone-50 border" },
  { name: "Stone", hex: "#A8A29E", class: "bg-stone-400" },
  { name: "Charcoal", hex: "#44403C", class: "bg-stone-700" },
  { name: "Indigo", hex: "#3730A3", class: "bg-indigo-700" },
  { name: "Forest", hex: "#166534", class: "bg-green-800" },
]

const outfitExamples = [
  {
    title: "Urban Zen",
    description: "City-ready comfort with architectural influence",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop",
    occasion: "Casual",
    elements: [
      "Oversized cotton shirt",
      "Wide-leg cropped pants",
      "Minimalist leather sandals",
      "Structured crossbody bag",
    ],
  },
  {
    title: "Contemplative Layers",
    description: "Thoughtful layering for changing seasons",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986&auto=format&fit=crop",
    occasion: "Transitional",
    elements: ["Long cardigan coat", "Asymmetrical tunic", "Tapered trousers", "Canvas slip-on shoes"],
  },
  {
    title: "Evening Serenity",
    description: "Elegant simplicity for special occasions",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
    occasion: "Evening",
    elements: ["Flowing midi dress", "Kimono-inspired jacket", "Wooden platform sandals", "Minimal geometric jewelry"],
  },
]

const materialGuide = [
  {
    name: "Raw Linen",
    description: "Unprocessed linen that develops character with wear and washing",
    usage: "Perfect for oversized shirts and wide-leg pants",
  },
  {
    name: "Organic Cotton",
    description: "Soft, breathable cotton in its most natural state",
    usage: "Ideal for everyday basics and layering pieces",
  },
  {
    name: "Hemp Blends",
    description: "Sustainable fiber that becomes softer with age",
    usage: "Great for structured jackets and durable bottoms",
  },
  {
    name: "Bamboo Silk",
    description: "Eco-friendly silk alternative with natural drape",
    usage: "Beautiful for flowing dresses and delicate tops",
  },
]
