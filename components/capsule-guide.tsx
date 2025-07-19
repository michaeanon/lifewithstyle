"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CapsuleGuide() {
  const [activeTab, setActiveTab] = useState("essentials")

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

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Capsule Wardrobe Guide</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Build a versatile wardrobe with these carefully selected pieces that mix and match effortlessly, reducing
            decision fatigue while maximizing style options.
          </p>
        </div>

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
                    <Image src={item.imageSrc || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
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
                    <Image src={item.imageSrc || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
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
                    <Image src={item.imageSrc || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
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
    </section>
  )
}
