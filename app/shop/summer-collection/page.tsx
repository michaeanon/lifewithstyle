"use client"

import Image from "next/image"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ShoppingCart, Filter, Star, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export default function ShopSummerCollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [cartItems, setCartItems] = useState<string[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const { toast } = useToast()

  const addToCart = (itemId: string, itemName: string) => {
    setCartItems((prev) => [...prev, itemId])
    toast({
      title: "Added to Cart",
      description: `${itemName} has been added to your cart.`,
    })
  }

  const toggleWishlist = (itemId: string, itemName: string) => {
    setWishlist((prev) => {
      const isInWishlist = prev.includes(itemId)
      if (isInWishlist) {
        toast({
          title: "Removed from Wishlist",
          description: `${itemName} has been removed from your wishlist.`,
        })
        return prev.filter((id) => id !== itemId)
      } else {
        toast({
          title: "Added to Wishlist",
          description: `${itemName} has been added to your wishlist.`,
        })
        return [...prev, itemId]
      }
    })
  }

  const filteredProducts = summerProducts.filter(
    (product) => selectedCategory === "all" || product.category.toLowerCase() === selectedCategory,
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          Number.parseFloat(a.price.replace("KES ", "").replace(",", "")) -
          Number.parseFloat(b.price.replace("KES ", "").replace(",", ""))
        )
      case "price-high":
        return (
          Number.parseFloat(b.price.replace("KES ", "").replace(",", "")) -
          Number.parseFloat(a.price.replace("KES ", "").replace(",", ""))
        )
      case "name":
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
          alt="Summer Collection Shop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sun className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl md:text-6xl font-serif tracking-wide">Summer Collection</h1>
              <Sun className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Light, breezy, and effortlessly chic pieces for the warmest days
            </p>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
          {/* Filters and Sorting */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="swimwear">Swimwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{sortedProducts.length} products</span>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">New</Badge>
                    )}
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => toggleWishlist(product.id, product.title)}
                      >
                        <Heart
                          className={`h-4 w-4 ${wishlist.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
                    </div>
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.title}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <Button
                      className="w-full bg-ilary-button hover:bg-ilary-buttonHover text-foreground"
                      size="sm"
                      onClick={() => addToCart(product.id, product.title)}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-ilary-peachLight to-white rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Be the first to know about new arrivals, exclusive offers, and styling tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ilary-button"
              />
              <Button className="bg-ilary-button hover:bg-ilary-buttonHover text-foreground">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

const summerProducts = [
  {
    id: "1",
    title: "Flowing Maxi Dress in Sunset Orange",
    price: "KES 8,500",
    originalPrice: "KES 12,000",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1888&auto=format&fit=crop",
    category: "Dresses",
    rating: 5,
    reviews: 24,
    isNew: true,
    discount: 29,
  },
  {
    id: "2",
    title: "Linen Button-Up Shirt in Natural",
    price: "KES 4,200",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "Tops",
    rating: 4,
    reviews: 18,
    isNew: false,
  },
  {
    id: "3",
    title: "High-Waisted Linen Shorts",
    price: "KES 3,500",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1770&auto=format&fit=crop",
    category: "Bottoms",
    rating: 4,
    reviews: 12,
    isNew: false,
  },
  {
    id: "4",
    title: "Striped One-Piece Swimsuit",
    price: "KES 6,800",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1770&auto=format&fit=crop",
    category: "Swimwear",
    rating: 5,
    reviews: 31,
    isNew: true,
  },
  {
    id: "5",
    title: "Woven Straw Sun Hat",
    price: "KES 2,800",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?q=80&w=1770&auto=format&fit=crop",
    category: "Accessories",
    rating: 4,
    reviews: 8,
    isNew: false,
  },
  {
    id: "6",
    title: "Wrap Midi Dress in Floral Print",
    price: "KES 7,200",
    originalPrice: "KES 9,600",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1915&auto=format&fit=crop",
    category: "Dresses",
    rating: 5,
    reviews: 19,
    isNew: false,
    discount: 25,
  },
  {
    id: "7",
    title: "Cropped Linen Blazer",
    price: "KES 9,500",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "Tops",
    rating: 4,
    reviews: 15,
    isNew: true,
  },
  {
    id: "8",
    title: "Wide-Leg Palazzo Pants",
    price: "KES 5,500",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "Bottoms",
    rating: 4,
    reviews: 22,
    isNew: false,
  },
]
