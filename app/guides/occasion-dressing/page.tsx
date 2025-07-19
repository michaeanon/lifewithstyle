"use client"

import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download } from "lucide-react"
import { motion } from "framer-motion"
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
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />
      <Toaster />
      <main className="flex-1">
        <PageHero
          title="Occasion Dressing"
          subtitle="Style guides for different events and occasions"
          backgroundImage="https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?q=80&w=1740&auto=format&fit=crop"
        />

        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-12">
          <div className="mb-8">
            <Link
              href="/inspiration/minimalist-aesthetics"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Minimalist Aesthetics
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
                  src="https://images.unsplash.com/photo-1600091166886-c7a68d63d5cb?q=80&w=1887&auto=format&fit=crop"
                  alt="Elegant occasion dressing"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Professional Minimalism Section */}
            <section id="professional-minimalism" className="mb-16 scroll-mt-24">
              <div className="bg-gradient-to-r from-slate-50 to-white p-8 rounded-lg mb-8">
                <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Professional Minimalism</h2>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  Command respect and confidence through sophisticated, minimalist professional attire that speaks
                  volumes through its restraint.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1632149877166-f75d49000351?q=80&w=1064&auto=format&fit=crop"
                    alt="Professional minimalist style"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-medium mb-4">The Power of Restraint</h3>
                  <p className="text-lg mb-6">
                    Professional minimalism brings sophistication and authority to the workplace through carefully
                    curated, high-quality pieces that command respect while maintaining comfort and personal style. It's
                    about making a statement through what you don't wear as much as what you do.
                  </p>
                  <h4 className="text-xl font-medium mb-3">Core Philosophy:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-slate-600 rounded-full flex-shrink-0"></span>
                      <span>Impeccable tailoring over trendy details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-slate-600 rounded-full flex-shrink-0"></span>
                      <span>Quality fabrics that maintain their structure</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-slate-600 rounded-full flex-shrink-0"></span>
                      <span>Cohesive color palette for effortless coordination</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 w-2 h-2 bg-slate-600 rounded-full flex-shrink-0"></span>
                      <span>Minimal, high-impact accessories</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Wardrobe Essentials:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Perfectly tailored blazer in navy or charcoal</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>High-quality trousers with clean lines</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Crisp white button-down shirts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Minimalist leather accessories</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Quality footwear in classic styles</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-ilary-border shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-medium mb-4">Styling Tips:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Stick to a cohesive color palette</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Invest in impeccable tailoring</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Choose one statement piece per outfit</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Maintain clean, pressed appearance</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Select minimal, quality jewelry</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {professionalEssentials.map((item, index) => (
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
                <h2 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">Master Every Occasion</h2>
                <p className="text-lg max-w-2xl mx-auto">
                  From boardroom presentations to evening galas, learn to dress with confidence and sophistication for
                  any professional or social occasion.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Book Styling Session
                  </Button>
                </Link>
                <Link href="/guides/capsule-wardrobe">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Capsule Wardrobe Guide
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

const professionalEssentials = [
  {
    title: "Tailored Blazer",
    description: "Structured sophistication in premium wool",
    imageSrc: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1336&auto=format&fit=crop",
  },
  {
    title: "Classic Trousers",
    description: "Perfectly fitted with clean lines",
    imageSrc: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1480&auto=format&fit=crop",
  },
  {
    title: "Crisp White Shirt",
    description: "Timeless foundation piece",
    imageSrc: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?q=80&w=1287&auto=format&fit=crop",
  },
  {
    title: "Leather Briefcase",
    description: "Professional elegance in every detail",
    imageSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1374&auto=format&fit=crop",
  },
  {
    title: "Classic Pumps",
    description: "Sophisticated comfort for long days",
    imageSrc: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
  },
  {
    title: "Minimal Watch",
    description: "Understated luxury on your wrist",
    imageSrc: "https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?q=80&w=1287&auto=format&fit=crop",
  },
]
