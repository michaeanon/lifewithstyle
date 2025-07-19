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

export default function ScandinavianSimplicityPage() {
  const { toast } = useToast()

  const handleDownload = () => {
    toast({
      title: "Style Guide Downloaded",
      description: "Your Scandinavian Simplicity style guide has been saved to your downloads.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Scandinavian Simplicity"
          subtitle="Master the art of Nordic minimalism with clean lines and natural elegance"
          backgroundImage="https://images.unsplash.com/photo-1604014237800-1c9102c219da?q=80&w=1770&auto=format&fit=crop"
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
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">The Nordic Philosophy</h2>
                <p className="text-lg mb-4">
                  Scandinavian simplicity is rooted in the concept of "lagom" - the Swedish philosophy of balance and
                  moderation. It's about finding beauty in simplicity, functionality in design, and comfort in
                  minimalism.
                </p>
                <p className="text-lg">
                  This aesthetic celebrates natural materials, neutral colors, and timeless silhouettes that transcend
                  seasonal trends while maintaining effortless elegance.
                </p>
              </div>
            </div>

            {/* Key Elements */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Essential Elements</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {keyElements.map((element, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-ilary-peachLight rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-ilary-button" />
                      </div>
                      <h3 className="font-medium mb-2">{element.title}</h3>
                      <p className="text-sm text-muted-foreground">{element.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Color Palette</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6">
                    The Scandinavian palette draws inspiration from Nordic landscapes - think snow-covered forests, pale
                    winter light, and natural wood tones.
                  </p>
                  <div className="grid grid-cols-4 gap-4">
                    {colorPalette.map((color, index) => (
                      <div key={index} className="text-center">
                        <div
                          className={`w-16 h-16 rounded-full mx-auto mb-2 ${color.class}`}
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="text-xs font-medium">{color.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1558&auto=format&fit=crop"
                    alt="Scandinavian color palette inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Outfit Examples */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Signature Looks</h2>
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
                      <h4 className="font-medium mb-2">Key Pieces:</h4>
                      <ul className="text-sm space-y-1">
                        {outfit.pieces.map((piece, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{piece}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Shopping Guide */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Shopping Essentials</h2>
              <div className="bg-ilary-peachLight p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Must-Have Pieces</h3>
                    <ul className="space-y-3">
                      {shoppingEssentials.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-ilary-button mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium">{item.piece}</span>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-4">Fabric Focus</h3>
                    <div className="space-y-4">
                      {fabricGuide.map((fabric, index) => (
                        <div key={index} className="border-l-4 border-ilary-button pl-4">
                          <h4 className="font-medium">{fabric.name}</h4>
                          <p className="text-sm text-muted-foreground">{fabric.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Styling Tips */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Pro Styling Tips</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {stylingTips.map((tip, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-3">{tip.title}</h3>
                      <p className="text-muted-foreground mb-4">{tip.description}</p>
                      <div className="text-sm font-medium text-ilary-button">{tip.tip}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-ilary-peach to-ilary-peachLight p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">
                    Ready to Embrace Scandinavian Style?
                  </h2>
                  <p className="mb-6">
                    Let our expert stylists help you curate a wardrobe that embodies the timeless elegance of Nordic
                    minimalism.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        Book a Consultation
                      </Button>
                    </Link>
                    <Link href="/services/personal-styling">
                      <Button variant="outline" className="border-ilary-button hover:bg-white/20">
                        Personal Styling Service
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1505&auto=format&fit=crop"
                    alt="Scandinavian wardrobe styling"
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
const keyElements = [
  {
    title: "Neutral Palette",
    description: "Whites, beiges, grays, and soft earth tones create a calming foundation",
  },
  {
    title: "Natural Materials",
    description: "Cotton, linen, wool, and cashmere in their purest forms",
  },
  {
    title: "Clean Lines",
    description: "Structured yet relaxed silhouettes with minimal embellishment",
  },
  {
    title: "Functional Design",
    description: "Every piece serves a purpose while maintaining aesthetic appeal",
  },
]

const colorPalette = [
  { name: "Snow White", hex: "#FEFEFE", class: "bg-white border" },
  { name: "Warm Beige", hex: "#F5F1EB", class: "bg-stone-100" },
  { name: "Soft Gray", hex: "#E5E7EB", class: "bg-gray-200" },
  { name: "Charcoal", hex: "#374151", class: "bg-gray-700" },
]

const outfitExamples = [
  {
    title: "Everyday Elegance",
    description: "Perfect for daily activities with effortless sophistication",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    occasion: "Casual",
    pieces: [
      "Oversized cream sweater",
      "High-waisted beige trousers",
      "White leather sneakers",
      "Minimalist gold jewelry",
    ],
  },
  {
    title: "Work Ready",
    description: "Professional yet comfortable for the modern workplace",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=1287&auto=format&fit=crop",
    occasion: "Professional",
    pieces: ["Tailored white blazer", "Gray wool trousers", "Silk blouse in cream", "Leather loafers"],
  },
  {
    title: "Weekend Comfort",
    description: "Relaxed styling for leisure time without compromising on style",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
    occasion: "Weekend",
    pieces: ["Chunky knit cardigan", "Linen wide-leg pants", "Canvas slip-on shoes", "Woven basket bag"],
  },
]

const shoppingEssentials = [
  {
    piece: "Cashmere Sweater",
    description: "Invest in quality cashmere in cream or light gray",
  },
  {
    piece: "White Button-Down",
    description: "Crisp cotton shirt with clean lines and perfect fit",
  },
  {
    piece: "Wool Coat",
    description: "Minimalist design in camel or gray for timeless appeal",
  },
  {
    piece: "Quality Denim",
    description: "Well-fitted jeans in classic blue or white",
  },
  {
    piece: "Leather Accessories",
    description: "Simple belt, bag, and shoes in natural leather tones",
  },
]

const fabricGuide = [
  {
    name: "Organic Cotton",
    description: "Breathable, sustainable, and perfect for everyday pieces",
  },
  {
    name: "Linen",
    description: "Natural texture and relaxed drape for effortless elegance",
  },
  {
    name: "Merino Wool",
    description: "Soft, temperature-regulating, and naturally odor-resistant",
  },
  {
    name: "Cashmere",
    description: "Luxurious warmth and softness for investment pieces",
  },
]

const stylingTips = [
  {
    title: "Layer Thoughtfully",
    description: "Build depth through texture rather than color contrast",
    tip: "Try a silk camisole under a cotton sweater with a linen blazer",
  },
  {
    title: "Embrace Negative Space",
    description: "Let your outfit breathe with strategic simplicity",
    tip: "Choose one statement piece and keep everything else minimal",
  },
  {
    title: "Focus on Fit",
    description: "Perfect proportions matter more than trendy silhouettes",
    tip: "Invest in tailoring to achieve that effortless Scandinavian look",
  },
  {
    title: "Quality Over Quantity",
    description: "Choose fewer, better pieces that will last for years",
    tip: "Calculate cost-per-wear when making investment purchases",
  },
]
