"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Leaf } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SustainableFashionPage() {
  const { toast } = useToast()

  const handleDownloadGuide = () => {
    toast({
      title: "Guide Downloaded",
      description: "The sustainable fashion guide PDF has been downloaded to your device.",
    })
    // In a real app, this would trigger a file download
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Sustainable Fashion"
          subtitle="Style choices that are good for you and the planet"
          backgroundImage="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop"
          height="h-[500px]"
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
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Embracing Sustainable Style</h2>
                <p className="text-lg mb-6">
                  Sustainable fashion is about making mindful choices that reduce environmental impact and support
                  ethical practices in the fashion industry. It's a holistic approach that considers the entire
                  lifecycle of garments—from design and production to use and disposal.
                </p>
                <p className="text-lg mb-8">
                  This guide will help you navigate the world of sustainable fashion, offering practical tips for
                  building an eco-conscious wardrobe without sacrificing style or quality.
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
                  src="https://images.unsplash.com/photo-1556905200-279565513a2d?q=80&w=2070&auto=format&fit=crop"
                  alt="Sustainable fashion collection"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Why Sustainable Fashion Matters</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-ilary-peachLight p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <Leaf className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">Environmental Impact</h3>
                    <p className="text-muted-foreground">
                      The fashion industry is one of the largest polluters globally, responsible for significant water
                      pollution, carbon emissions, and textile waste. Sustainable practices help reduce this footprint.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-ilary-peachLight p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-3">Social Responsibility</h3>
                    <p className="text-muted-foreground">
                      Ethical fashion ensures fair wages, safe working conditions, and respect for workers' rights
                      throughout the supply chain, promoting social justice in the global fashion industry.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <div className="bg-ilary-peachLight p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-foreground"
                      >
                        <path d="M12 2v6a2 2 0 0 0 2 2h6"></path>
                        <path d="M22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-3">Quality Over Quantity</h3>
                    <p className="text-muted-foreground">
                      Sustainable fashion encourages investing in well-made, timeless pieces that last longer, reducing
                      the cycle of constant consumption and disposal associated with fast fashion.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Building a Sustainable Wardrobe</h2>
              <p className="text-lg mb-8">
                Transitioning to a more sustainable wardrobe doesn't mean replacing everything at once. Instead, it's
                about making thoughtful choices moving forward and gradually incorporating more sustainable practices.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Mindful Consumption</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Assess before purchasing:</span> Ask yourself if you truly need
                          the item and if it will integrate well with your existing wardrobe.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Quality over quantity:</span> Invest in well-made pieces that
                          will last longer rather than cheaper items that need frequent replacement.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Versatility:</span> Choose versatile items that can be styled
                          multiple ways and worn across seasons.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">30-wear test:</span> Before buying, ask yourself if you'll wear
                          the item at least 30 times to ensure it's a worthwhile addition.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Sustainable Materials</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Organic cotton:</span> Grown without harmful pesticides and
                          chemicals, reducing environmental impact.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Linen:</span> Made from flax plants that require minimal water
                          and pesticides to grow.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Recycled fibers:</span> Materials made from post-consumer waste,
                          such as recycled polyester from plastic bottles.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Tencel/Lyocell:</span> Made from sustainably harvested wood pulp
                          in a closed-loop process that reuses water and solvents.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Ethical Brands & Second-Hand</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Research brands:</span> Look for transparency in supply chains,
                          fair labor practices, and environmental commitments.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Certifications:</span> Look for standards like Fair Trade, GOTS
                          (Global Organic Textile Standard), or B Corp certification.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Thrifting:</span> Explore second-hand shops, vintage stores, and
                          online resale platforms for unique, pre-loved items.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Clothing swaps:</span> Organize or participate in clothing
                          exchanges with friends or community groups.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Care & Maintenance</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Wash less frequently:</span> Many items don't need washing after
                          every wear, reducing water usage and extending garment life.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Cold water washing:</span> Use cold water cycles and
                          eco-friendly detergents to reduce energy consumption and chemical pollution.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Air dry:</span> Skip the dryer when possible to save energy and
                          prevent fabric damage.
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 font-bold">•</span>
                        <div>
                          <span className="font-medium">Repair:</span> Learn basic mending skills or find a good tailor
                          to extend the life of your clothes.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-6">Sustainable Style Inspiration</h2>
              <p className="text-lg mb-8">
                Sustainable fashion doesn't mean compromising on style. Here are some outfit ideas that combine
                eco-friendly materials, ethical brands, and timeless design:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sustainableOutfits.map((outfit, index) => (
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
            </div>

            {/* Japanese Minimalism Section */}
            <section id="japanese-minimalism" className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-r from-stone-50 to-white p-8 rounded-lg mb-8">
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Japanese Minimalism</h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Discover the profound beauty of wabi-sabi and ma - finding perfection in imperfection and power in
                  negative space.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1526887520775-4b14b8aed897?q=80&w=1287&auto=format&fit=crop"
                    alt="Japanese minimalist style"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-4">The Philosophy of Less</h3>
                  <p className="text-lg mb-6">
                    Japanese minimalism goes beyond aesthetics to embrace a philosophy of mindful living. Inspired by
                    traditional Japanese concepts like wabi-sabi (finding beauty in imperfection) and ma (the power of
                    negative space), this approach to dressing emphasizes quality, intentionality, and respect for
                    craftsmanship.
                  </p>
                  <h4 className="text-xl font-medium mb-3">Core Principles:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-stone-600 rounded-full flex-shrink-0"></span>
                      <span>Oversized yet structured silhouettes with thoughtful proportions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-stone-600 rounded-full flex-shrink-0"></span>
                      <span>Natural and technical fabrics working in harmony</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-stone-600 rounded-full flex-shrink-0"></span>
                      <span>Asymmetrical details and unexpected design elements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-stone-600 rounded-full flex-shrink-0"></span>
                      <span>Muted color palette with occasional deep accent colors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-stone-600 rounded-full flex-shrink-0"></span>
                      <span>Respect for traditional craftsmanship and sustainable practices</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {japaneseEssentials.map((item, index) => (
                  <Card key={index} className="overflow-hidden border border-ilary-border shadow-sm group">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={item.imageSrc || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <div className="bg-ilary-peach rounded-lg p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">
                  Join Our Sustainable Style Community
                </h2>
                <p className="text-lg max-w-2xl mx-auto">
                  Connect with like-minded individuals, discover ethical brands, and learn more about incorporating
                  sustainable practices into your personal style journey.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Join Community
                  </Button>
                </Link>
                <Link href="/outfit-combinations">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    View Sustainable Outfits
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

const sustainableOutfits = [
  {
    title: "Timeless Minimalist",
    description: "Classic pieces in organic and natural materials",
    imageSrc: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=1286&auto=format&fit=crop",
    items: [
      "Organic cotton white button-down",
      "Tencel wide-leg trousers",
      "Recycled gold jewelry",
      "Vegetable-tanned leather loafers",
    ],
  },
  {
    title: "Eco-Casual Weekend",
    description: "Relaxed sustainable style for everyday wear",
    imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1288&auto=format&fit=crop",
    items: ["Recycled denim jeans", "Organic cotton t-shirt", "Upcycled textile tote bag", "Fair-trade sneakers"],
  },
  {
    title: "Conscious Elegance",
    description: "Sophisticated sustainable style for special occasions",
    imageSrc: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=986&auto=format&fit=crop",
    items: ["Peace silk wrap dress", "Vintage statement jewelry", "Vegan leather clutch", "Second-hand designer heels"],
  },
]

const japaneseEssentials = [
  {
    title: "Oversized Kimono Jacket",
    description: "Modern interpretation of traditional silhouettes",
    imageSrc: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1335&auto=format&fit=crop",
  },
  {
    title: "Asymmetrical Tunic",
    description: "Unexpected details in flowing fabrics",
    imageSrc: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1288&auto=format&fit=crop",
  },
  {
    title: "Wide-Leg Trousers",
    description: "Comfortable elegance with clean lines",
    imageSrc: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1480&auto=format&fit=crop",
  },
  {
    title: "Minimalist Sandals",
    description: "Simple design with superior craftsmanship",
    imageSrc: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1364&auto=format&fit=crop",
  },
  {
    title: "Natural Fiber Bag",
    description: "Handcrafted beauty in sustainable materials",
    imageSrc: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Organic Cotton Basics",
    description: "Pure, undyed fabrics in perfect proportions",
    imageSrc: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop",
  },
]
