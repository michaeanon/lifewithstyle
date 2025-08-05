"use client"

import { useEffect } from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Heart,
  ShoppingCart,
  Filter,
  Star,
  ArrowLeft,
  Share2,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Gift,
  Mail,
  Copy,
  Check,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface WishlistItem {
  id: string
  product: {
    id: string
    title: string
    price: string
    originalPrice?: string
    image: string
    category: string
    rating: number
    reviews: number
    inStock: boolean
    discount?: number
  }
  dateAdded: string
  priceHistory: { date: string; price: string }[]
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [sortBy, setSortBy] = useState("recent")
  const [filterBy, setFilterBy] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [shareUrl, setShareUrl] = useState("")
  const [copied, setCopied] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const { toast } = useToast()

  // Mock wishlist data
  useEffect(() => {
    const mockWishlistItems: WishlistItem[] = [
      {
        id: "w1",
        product: {
          id: "1",
          title: "Silk Midi Dress with Belt",
          price: "KES 18,500",
          originalPrice: "KES 24,000",
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1888&auto=format&fit=crop",
          category: "Dresses",
          rating: 5,
          reviews: 42,
          inStock: true,
          discount: 23,
        },
        dateAdded: "2024-01-15",
        priceHistory: [
          { date: "2024-01-15", price: "KES 18,500" },
          { date: "2024-01-10", price: "KES 19,000" },
          { date: "2024-01-05", price: "KES 24,000" },
        ],
      },
      {
        id: "w2",
        product: {
          id: "8",
          title: "Celebrity Style Sunglasses",
          price: "KES 15,500",
          image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop",
          category: "Accessories",
          rating: 5,
          reviews: 89,
          inStock: true,
        },
        dateAdded: "2024-01-12",
        priceHistory: [{ date: "2024-01-12", price: "KES 15,500" }],
      },
      {
        id: "w3",
        product: {
          id: "19",
          title: "Leather Crossbody Bag",
          price: "KES 15,500",
          image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
          category: "Accessories",
          rating: 5,
          reviews: 67,
          inStock: false,
        },
        dateAdded: "2024-01-08",
        priceHistory: [{ date: "2024-01-08", price: "KES 15,500" }],
      },
      {
        id: "w4",
        product: {
          id: "4",
          title: "Autumn Wool Coat",
          price: "KES 28,900",
          originalPrice: "KES 35,000",
          image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1887&auto=format&fit=crop",
          category: "Outerwear",
          rating: 5,
          reviews: 19,
          inStock: true,
          discount: 17,
        },
        dateAdded: "2024-01-05",
        priceHistory: [
          { date: "2024-01-05", price: "KES 28,900" },
          { date: "2023-12-20", price: "KES 32,000" },
          { date: "2023-12-01", price: "KES 35,000" },
        ],
      },
    ]

    setTimeout(() => {
      setWishlistItems(mockWishlistItems)
      setIsLoading(false)
    }, 1000)
  }, [])

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
    toast({
      title: "Removed from Wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const addToCart = (item: WishlistItem) => {
    if (!item.product.inStock) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Added to Cart",
      description: `${item.product.title} has been added to your cart.`,
    })
  }

  const moveToCart = (itemId: string) => {
    const item = wishlistItems.find((item) => item.id === itemId)
    if (item) {
      addToCart(item)
      removeFromWishlist(itemId)
    }
  }

  const shareWishlist = () => {
    const url = `${window.location.origin}/shop/wishlist/shared/user123`
    setShareUrl(url)
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Wishlist Link Copied",
      description: "Share this link with friends and family!",
    })
  }

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const addSelectedToCart = () => {
    const availableItems = selectedItems.filter((id) => {
      const item = wishlistItems.find((item) => item.id === id)
      return item?.product.inStock
    })

    if (availableItems.length === 0) {
      toast({
        title: "No Available Items",
        description: "Selected items are out of stock.",
        variant: "destructive",
      })
      return
    }

    availableItems.forEach((id) => moveToCart(id))
    setSelectedItems([])
    toast({
      title: "Items Added to Cart",
      description: `${availableItems.length} items added to your cart.`,
    })
  }

  const filteredItems = wishlistItems.filter((item) => {
    if (filterBy === "in-stock") return item.product.inStock
    if (filterBy === "out-of-stock") return !item.product.inStock
    if (filterBy === "on-sale") return item.product.discount
    return true
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          Number.parseFloat(a.product.price.replace("KES ", "").replace(",", "")) -
          Number.parseFloat(b.product.price.replace("KES ", "").replace(",", ""))
        )
      case "price-high":
        return (
          Number.parseFloat(b.product.price.replace("KES ", "").replace(",", "")) -
          Number.parseFloat(a.product.price.replace("KES ", "").replace(",", ""))
        )
      case "name":
        return a.product.title.localeCompare(b.product.title)
      case "oldest":
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
      default: // recent
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <p className="text-muted-foreground">Loading your wishlist...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[30vh] overflow-hidden bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
              <h1 className="text-4xl md:text-6xl font-serif tracking-wide text-gray-800">My Wishlist</h1>
              <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Your curated collection of favorite pieces
            </p>
          </motion.div>
        </div>
        <motion.div
          className="absolute top-10 left-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        >
          <Sparkles className="h-6 w-6 text-rose-400" />
        </motion.div>
        <motion.div
          className="absolute bottom-10 right-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
        >
          <Sparkles className="h-8 w-8 text-pink-400" />
        </motion.div>
      </div>

      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
          {/* Header Actions */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <Link href="/shop/featured-collection">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "Item" : "Items"}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {filteredItems.filter((item) => item.product.inStock).length} available
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {selectedItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Button onClick={addSelectedToCart} className="bg-rose-600 hover:bg-rose-700 text-white">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add Selected ({selectedItems.length})
                  </Button>
                </motion.div>
              )}

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Your Wishlist</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Share your wishlist with friends and family so they know what you love!
                    </p>
                    <div className="flex gap-2">
                      <Input
                        value={shareUrl || "Click generate to create shareable link"}
                        readOnly
                        className="flex-1"
                      />
                      <Button onClick={shareWishlist} variant="outline">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Gift className="h-4 w-4 mr-2" />
                        Gift Registry
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Filters and Sorting */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <Select value={filterBy} onValueChange={setFilterBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    <SelectItem value="on-sale">On Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Added</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {sortedItems.length} of {wishlistItems.length} items
              </span>
              <Link href="/shop/cart">
                <Button variant="outline" size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Wishlist Items */}
          {sortedItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                {wishlistItems.length === 0 ? "Your wishlist is empty" : "No items match your filters"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {wishlistItems.length === 0
                  ? "Start adding items you love to see them here."
                  : "Try adjusting your filters to see more items."}
              </p>
              <Link href="/shop/featured-collection">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">Discover Items</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {sortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 relative">
                      {/* Selection Checkbox */}
                      <div className="absolute top-2 left-2 z-10">
                        <motion.button
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            selectedItems.includes(item.id)
                              ? "bg-rose-600 border-rose-600 text-white"
                              : "bg-white border-gray-300 hover:border-rose-400"
                          }`}
                          onClick={() => toggleItemSelection(item.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {selectedItems.includes(item.id) && <Check className="h-3 w-3" />}
                        </motion.button>
                      </div>

                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        {!item.product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge variant="secondary" className="bg-white text-black">
                              Out of Stock
                            </Badge>
                          </div>
                        )}

                        {item.product.discount && (
                          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
                            -{item.product.discount}%
                          </Badge>
                        )}

                        {/* Price Drop Indicator */}
                        {item.priceHistory.length > 1 && (
                          <motion.div
                            className="absolute top-12 right-2"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                              <TrendingUp className="h-3 w-3" />
                              Price Drop
                            </Badge>
                          </motion.div>
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <Button size="sm" variant="secondary" className="h-8 w-8 p-0 rounded-full">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <motion.button
                              className="h-8 w-8 p-0 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center"
                              onClick={() => removeFromWishlist(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < item.product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-xs text-muted-foreground ml-1">({item.product.reviews})</span>
                        </div>

                        <h3 className="font-medium text-sm mb-2 line-clamp-2">{item.product.title}</h3>

                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">{item.product.price}</span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-muted-foreground line-through">
                                {item.product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.product.category}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>Added {new Date(item.dateAdded).toLocaleDateString()}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white"
                            size="sm"
                            onClick={() => moveToCart(item.id)}
                            disabled={!item.product.inStock}
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            {item.product.inStock ? "Move to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Recommendations */}
          {sortedItems.length > 0 && (
            <motion.div
              className="mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-serif mb-4">You Might Also Love</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Based on your wishlist, we think you'll love these similar items
                  </p>
                  <Link href="/shop/featured-collection">
                    <Button className="bg-rose-600 hover:bg-rose-700 text-white">Discover More</Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}
