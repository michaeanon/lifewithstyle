"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Waves } from "lucide-react"
import { motion } from "framer-motion"
import { PageHero } from "@/components/page-hero"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function CoastalMinimalismPage() {
  const { toast } = useToast()

  const handleDownload = () => {
    toast({
      title: "Style Guide Downloaded",
      description: "Your Coastal Minimalism style guide has been saved to your downloads.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Coastal Minimalism"
          subtitle="Embrace the serene beauty of seaside living through effortless, breezy style"
          backgroundImage="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop"
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
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">The Essence of Coastal Living</h2>
                <p className="text-lg mb-4">
                  Coastal minimalism captures the relaxed elegance of seaside living - where natural light, ocean
                  breezes, and endless horizons inspire a sense of freedom and tranquility. This style embraces the
                  beauty of natural textures and weathered materials.
                </p>
                <p className="text-lg">
                  It's about creating looks that feel effortless yet refined, comfortable yet sophisticated - perfect
                  for those who want to carry the serenity of coastal living into their everyday wardrobe.
                </p>
              </div>
            </div>

            {/* Core Elements */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Coastal Elements</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coastalElements.map((element, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-ilary-peachLight rounded-full flex items-center justify-center mb-4">
                        <Waves className="h-6 w-6 text-ilary-button" />
                      </div>
                      <h3 className="font-medium mb-2">{element.title}</h3>
                      <p className="text-sm text-muted-foreground">{element.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Color Inspiration */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Ocean-Inspired Palette</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6">
                    The coastal palette draws from the natural beauty of the seaside - soft sand tones, weathered
                    driftwood, sea glass blues, and the warm glow of sunset. These colors create a sense of calm and
                    connection to nature.
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
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1473&auto=format&fit=crop"
                    alt="Coastal color inspiration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Fabric & Texture Guide */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Natural Textures</h2>
              <div className="bg-ilary-peachLight p-8 rounded-lg">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-4">Signature Fabrics</h3>
                    <p className="mb-6">
                      Coastal minimalism celebrates natural, breathable fabrics that move with the body and improve with
                      age. Think sun-bleached linens, soft cottons, and weathered denims.
                    </p>
                    <div className="space-y-4">
                      {fabricGuide.map((fabric, index) => (
                        <div key={index} className="border-l-4 border-ilary-button pl-4">
                          <h4 className="font-medium">{fabric.name}</h4>
                          <p className="text-sm text-muted-foreground">{fabric.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop"
                      alt="Natural fabric textures"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal Styling */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Seasonal Coastal Looks</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {seasonalLooks.map((season, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={season.image || "/placeholder.svg"}
                        alt={season.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white text-foreground">{season.season}</Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-medium text-white mb-2">{season.title}</h3>
                        <p className="text-sm text-white/80">{season.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-2">Key Pieces:</h4>
                      <ul className="text-sm space-y-1">
                        {season.pieces.map((piece, i) => (
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

            {/* Lifestyle Integration */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Coastal Lifestyle Looks</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {lifestyleLooks.map((look, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={look.image || "/placeholder.svg"}
                        alt={look.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white text-foreground">{look.occasion}</Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-medium text-white mb-1">{look.title}</h3>
                        <p className="text-sm text-white/80">{look.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-2">The Look:</h4>
                      <ul className="text-sm space-y-1">
                        {look.elements.map((element, i) => (
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

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-ilary-peach to-ilary-peachLight p-8 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">
                    Bring Coastal Serenity to Your Wardrobe
                  </h2>
                  <p className="mb-6">
                    Ready to embrace the relaxed elegance of coastal living? Our stylists can help you create a wardrobe
                    that captures the effortless beauty of seaside style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        Book a Consultation
                      </Button>
                    </Link>
                    <Link href="/guides/seasonal-transitions">
                      <Button variant="outline" className="border-ilary-button hover:bg-white/20">
                        Seasonal Style Guide
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1470&auto=format&fit=crop"
                    alt="Coastal wardrobe styling"
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
const coastalElements = [
  {
    title: "Natural Textures",
    description: "Linen, cotton, and weathered materials that tell a story",
  },
  {
    title: "Relaxed Silhouettes",
    description: "Flowing, comfortable cuts that move with ocean breezes",
  },
  {
    title: "Ocean-Inspired Colors",
    description: "Soft blues, sandy neutrals, and sun-bleached whites",
  },
  {
    title: "Effortless Layering",
    description: "Easy pieces that adapt to changing coastal weather",
  },
]

const colorPalette = [
  { name: "Sea Salt", hex: "#F8F9FA", class: "bg-gray-50 border" },
  { name: "Driftwood", hex: "#D6CCC2", class: "bg-stone-300" },
  { name: "Sea Glass", hex: "#A7C4BC", class: "bg-teal-200" },
  { name: "Ocean Blue", hex: "#4A90A4", class: "bg-cyan-600" },
]

const fabricGuide = [
  {
    name: "Linen",
    description: "The ultimate coastal fabric - breathable, relaxed, and beautiful when wrinkled",
  },
  {
    name: "Cotton Voile",
    description: "Lightweight and airy, perfect for layering and warm weather",
  },
  {
    name: "Chambray",
    description: "Soft denim alternative that gets better with age and wear",
  },
  {
    name: "Organic Cotton",
    description: "Sustainable comfort that aligns with coastal environmental values",
  },
]

const seasonalLooks = [
  {
    title: "Summer Breeze",
    description: "Light, airy pieces for warm coastal days",
    season: "Summer",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
    pieces: ["Linen button-down shirt", "Wide-leg cotton pants", "Woven sandals", "Straw sun hat", "Canvas tote bag"],
  },
  {
    title: "Coastal Layers",
    description: "Comfortable layering for cooler ocean evenings",
    season: "Transitional",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
    pieces: ["Chunky knit cardigan", "Soft cotton tee", "Relaxed denim", "Canvas sneakers", "Lightweight scarf"],
  },
]

const lifestyleLooks = [
  {
    title: "Beach Walk",
    description: "Comfortable elegance for seaside strolls",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop",
    occasion: "Casual",
    elements: ["Flowing maxi dress", "Denim jacket", "Flat sandals", "Crossbody bag", "Delicate jewelry"],
  },
  {
    title: "Seaside Dining",
    description: "Elevated casual for waterfront restaurants",
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986&auto=format&fit=crop",
    occasion: "Dining",
    elements: ["Linen blazer", "Silk camisole", "Tailored shorts", "Espadrille wedges", "Statement earrings"],
  },
  {
    title: "Harbor Sunset",
    description: "Romantic elegance for evening by the water",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1170&auto=format&fit=crop",
    occasion: "Evening",
    elements: ["Flowing midi skirt", "Soft knit top", "Light cardigan", "Strappy sandals", "Minimal accessories"],
  },
]
