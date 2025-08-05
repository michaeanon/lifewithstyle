"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, CheckCircle, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { PageHero } from "@/components/page-hero"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ModernProfessionalPage() {
  const { toast } = useToast()

  const handleDownload = () => {
    toast({
      title: "Style Guide Downloaded",
      description: "Your Modern Professional style guide has been saved to your downloads.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <main className="flex-1">
        <PageHero
          title="Modern Professional"
          subtitle="Elevate your career with sophisticated minimalism and contemporary elegance"
          backgroundImage="https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop"
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
            {/* Introduction */}
            <div className="mb-16">
              <div className="bg-gradient-to-r from-ilary-peachLight to-ilary-peach/20 p-8 rounded-lg mb-8">
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">
                  The Power of Professional Presence
                </h2>
                <p className="text-lg mb-4">
                  Modern professional style transcends traditional corporate dress codes, embracing contemporary
                  minimalism while maintaining authority and sophistication. It's about creating a powerful presence
                  through thoughtful design choices.
                </p>
                <p className="text-lg">
                  This aesthetic combines architectural tailoring with innovative fabrics, creating looks that are both
                  commanding and comfortable for today's dynamic workplace.
                </p>
              </div>
            </div>

            {/* Core Elements */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Professional Essentials</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {professionalEssentials.map((essential, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-ilary-peachLight rounded-full flex items-center justify-center mb-4">
                        <Briefcase className="h-6 w-6 text-ilary-button" />
                      </div>
                      <h3 className="font-medium mb-2">{essential.title}</h3>
                      <p className="text-sm text-muted-foreground">{essential.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Power Dressing Principles */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Power Dressing Reimagined</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <p className="text-lg mb-6">
                    Modern power dressing isn't about rigid suits and uncomfortable shoes. It's about strategic choices
                    that communicate competence, creativity, and confidence while allowing for personal expression.
                  </p>
                  <div className="space-y-4">
                    {powerPrinciples.map((principle, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-ilary-button mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-medium">{principle.title}</span>
                          <p className="text-sm text-muted-foreground">{principle.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=1287&auto=format&fit=crop"
                    alt="Modern professional styling"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Wardrobe Building */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">
                Building Your Professional Wardrobe
              </h2>
              <div className="bg-ilary-peachLight p-8 rounded-lg">
                <div className="grid md:grid-cols-3 gap-8">
                  {wardrobeCategories.map((category, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-medium mb-4">{category.title}</h3>
                      <ul className="space-y-3">
                        {category.items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-ilary-button mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outfit Formulas */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Professional Outfit Formulas</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {outfitFormulas.map((formula, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={formula.image || "/placeholder.svg"}
                        alt={formula.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-white text-foreground">{formula.occasion}</Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg font-medium text-white mb-1">{formula.title}</h3>
                        <p className="text-sm text-white/80">{formula.description}</p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h4 className="font-medium mb-2">The Formula:</h4>
                      <ul className="text-sm space-y-1">
                        {formula.pieces.map((piece, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2">+</span>
                            <span>{piece}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Fabric & Quality Guide */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-8">Investment Fabrics</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {fabricGuide.map((fabric, index) => (
                  <Card key={index} className="border border-ilary-border shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-3">{fabric.name}</h3>
                      <p className="text-muted-foreground mb-4">{fabric.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-ilary-button">{fabric.bestFor}</span>
                        <Badge variant="outline">{fabric.season}</Badge>
                      </div>
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
                    Elevate Your Professional Image
                  </h2>
                  <p className="mb-6">
                    Ready to transform your professional wardrobe? Our expert stylists specialize in creating powerful,
                    modern looks that command respect while reflecting your personal style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                        Book Professional Styling
                      </Button>
                    </Link>
                    <Link href="/services/wardrobe-audit">
                      <Button variant="outline" className="border-ilary-button hover:bg-white/20">
                        Wardrobe Audit Service
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop"
                    alt="Professional wardrobe consultation"
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
const professionalEssentials = [
  {
    title: "Architectural Tailoring",
    description: "Clean lines with contemporary proportions that create a powerful silhouette",
  },
  {
    title: "Quality Fabrics",
    description: "Investment pieces in wool, silk, and technical blends that maintain their shape",
  },
  {
    title: "Versatile Color Palette",
    description: "Sophisticated neutrals with strategic accent colors for maximum mixing potential",
  },
  {
    title: "Statement Accessories",
    description: "Minimal yet impactful pieces that elevate any outfit",
  },
]

const powerPrinciples = [
  {
    title: "Fit is Everything",
    description: "Perfect tailoring communicates attention to detail and professionalism",
  },
  {
    title: "Quality Over Quantity",
    description: "Invest in fewer, better pieces that will serve you for years",
  },
  {
    title: "Comfort Equals Confidence",
    description: "Choose pieces that allow you to move and work comfortably",
  },
  {
    title: "Personal Expression",
    description: "Incorporate elements that reflect your personality within professional boundaries",
  },
]

const wardrobeCategories = [
  {
    title: "Foundation Pieces",
    items: [
      "Well-fitted blazer in navy or charcoal",
      "Tailored trousers in wool or ponte",
      "Classic white button-down shirt",
      "Little black dress with interesting details",
      "Quality leather pumps or loafers",
    ],
  },
  {
    title: "Modern Updates",
    items: [
      "Knit blazer for comfort and style",
      "Wide-leg trousers in technical fabric",
      "Silk blouse with architectural details",
      "Midi skirt with contemporary cut",
      "Block heel shoes for all-day comfort",
    ],
  },
  {
    title: "Statement Pieces",
    items: [
      "Structured coat in a bold color",
      "Interesting textured sweater",
      "Printed scarf or pocket square",
      "Quality leather handbag",
      "Minimal jewelry with impact",
    ],
  },
]

const outfitFormulas = [
  {
    title: "The Power Meeting",
    description: "Command the room with sophisticated authority",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1288&auto=format&fit=crop",
    occasion: "Executive",
    pieces: [
      "Tailored blazer in navy or charcoal",
      "Matching or coordinating trousers",
      "Silk blouse in white or cream",
      "Pointed-toe pumps",
      "Structured handbag",
    ],
  },
  {
    title: "Creative Professional",
    description: "Express personality while maintaining professionalism",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1287&auto=format&fit=crop",
    occasion: "Creative",
    pieces: [
      "Knit blazer in interesting texture",
      "Wide-leg trousers",
      "Statement blouse or sweater",
      "Comfortable block heels",
      "Unique accessories",
    ],
  },
  {
    title: "Client Presentation",
    description: "Polished and approachable for client-facing roles",
    image: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=1170&auto=format&fit=crop",
    occasion: "Client-Facing",
    pieces: [
      "Sheath dress with interesting details",
      "Lightweight cardigan or blazer",
      "Classic pumps or loafers",
      "Minimal jewelry",
      "Professional tote bag",
    ],
  },
]

const fabricGuide = [
  {
    name: "Wool Crepe",
    description: "Wrinkle-resistant and drapes beautifully, perfect for travel",
    bestFor: "Blazers and trousers",
    season: "Year-round",
  },
  {
    name: "Ponte Knit",
    description: "Comfortable stretch with professional appearance",
    bestFor: "Dresses and pants",
    season: "Fall/Winter",
  },
  {
    name: "Silk Blends",
    description: "Luxurious feel with easy care properties",
    bestFor: "Blouses and scarves",
    season: "Spring/Summer",
  },
  {
    name: "Technical Fabrics",
    description: "Performance features like moisture-wicking and stretch",
    bestFor: "Modern workwear",
    season: "All seasons",
  },
]
