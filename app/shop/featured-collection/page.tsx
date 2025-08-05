"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ShoppingCart, Filter, Star, Sparkles, Eye, Plus, Minus, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

interface Product {
  id: string
  title: string
  price: string
  originalPrice?: string
  image: string
  category: string
  subcategory: string
  rating: number
  reviews: number
  isFeatured?: boolean
  discount?: number
  description: string
  sizes: string[]
  colors: string[]
  materials: string[]
  careInstructions: string[]
  userReviews: Review[]
}

// Define a consistent CartItem interface for localStorage
interface CartItem {
  cartEntryId: string // Unique ID for this specific cart entry (product + size + color)
  productId: string // Original product ID
  title: string
  price: string
  image: string
  category: string
  size: string
  color: string
  quantity: number
}

// Helper functions for localStorage
const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [] // Ensure it runs only on client-side
  const storedCart = localStorage.getItem("cart")
  return storedCart ? JSON.parse(storedCart) : []
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export default function ShopFeaturedCollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSubcategory, setSelectedSubcategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [totalCartItems, setTotalCartItems] = useState(0) // State to track total items for badge
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [showReviews, setShowReviews] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })
  const { toast } = useToast()

  // Update totalCartItems from localStorage on mount
  useEffect(() => {
    setTotalCartItems(getCartFromLocalStorage().reduce((sum, item) => sum + item.quantity, 0))
  }, [])

  const addToCart = (product: Product, size?: string, color?: string, qty = 1) => {
    const currentCart = getCartFromLocalStorage()
    const cartEntryId = `${product.id}-${size || "default"}-${color || "default"}`

    let updatedCart: CartItem[]
    const existingItemIndex = currentCart.findIndex((item) => item.cartEntryId === cartEntryId)

    if (existingItemIndex > -1) {
      // Update quantity of existing item
      updatedCart = currentCart.map((item, index) =>
        index === existingItemIndex ? { ...item, quantity: item.quantity + qty } : item,
      )
    } else {
      // Add new item
      updatedCart = [
        ...currentCart,
        {
          cartEntryId: cartEntryId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          size: size || "",
          color: color || "",
          quantity: qty,
        },
      ]
    }

    saveCartToLocalStorage(updatedCart)
    setTotalCartItems(updatedCart.reduce((sum, item) => sum + item.quantity, 0)) // Update badge count
    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
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

  const submitReview = () => {
    if (!selectedProduct || !newReview.comment.trim()) return

    const review: Review = {
      id: Date.now().toString(),
      userId: "current-user",
      userName: "You",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString(),
      verified: true,
    }

    // In a real app, this would be sent to your backend
    toast({
      title: "Review Submitted",
      description: "Thank you for your review!",
    })

    setNewReview({ rating: 5, comment: "" })
  }

  const getSubcategories = (category: string) => {
    switch (category) {
      case "collections":
        return ["featured", "summer", "autumn", "winter", "spring"]
      case "inspiration":
        return ["street-style", "runway-trends", "celebrity-looks", "vintage-revival", "minimalist", "bold-expressions"]
      case "style-guides":
        return [
          "capsule-wardrobe",
          "color-coordination",
          "occasion-dressing",
          "seasonal-transitions",
          "body-types",
          "sustainable-fashion",
        ]
      default:
        return []
    }
  }

  const filteredProducts = allProducts.filter((product) => {
    const categoryMatch = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory
    const subcategoryMatch = selectedSubcategory === "all" || product.subcategory.toLowerCase() === selectedSubcategory
    return categoryMatch && subcategoryMatch
  })

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
      <div className="relative h-[40vh] overflow-hidden mt-8">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
          alt="Featured Collection Shop"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-yellow-400" />
              <h1 className="text-4xl md:text-6xl font-serif tracking-wide">Featured Collection</h1>
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Curated pieces that define contemporary elegance and timeless style
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
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSelectedSubcategory("all")
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="collections">Collections</SelectItem>
                    <SelectItem value="inspiration">Inspiration</SelectItem>
                    <SelectItem value="style-guides">Style Guides</SelectItem>
                    <SelectItem value="dresses">Dresses</SelectItem>
                    <SelectItem value="tops">Tops</SelectItem>
                    <SelectItem value="bottoms">Bottoms</SelectItem>
                    <SelectItem value="outerwear">Outerwear</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Subcategory Dropdown */}
              {selectedCategory !== "all" && getSubcategories(selectedCategory).length > 0 && (
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="All Subcategories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subcategories</SelectItem>
                    {getSubcategories(selectedCategory).map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub
                          .split("-")
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

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
              <Link href="/shop/cart">
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {totalCartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {totalCartItems}
                    </Badge>
                  )}
                </Button>
              </Link>
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
                    {product.isFeatured && (
                      <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-600">Featured</Badge>
                    )}
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">-{product.discount}%</Badge>
                    )}
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-8 w-8 p-0 rounded-full"
                            onClick={() => {
                              setSelectedProduct(product)
                              setSelectedSize("")
                              setSelectedColor("")
                              setQuantity(1)
                              setShowReviews(false)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedProduct?.title}</DialogTitle>
                          </DialogHeader>
                          {selectedProduct && (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              <div className="relative aspect-square overflow-hidden rounded-lg">
                                <Image
                                  src={selectedProduct.image || "/placeholder.svg"}
                                  alt={selectedProduct.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="space-y-4">
                                <div className="flex items-center gap-1 mb-2">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < selectedProduct.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-muted-foreground ml-2">
                                    ({selectedProduct.reviews} reviews)
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowReviews(!showReviews)}
                                    className="ml-2"
                                  >
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    {showReviews ? "Hide" : "Show"} Reviews
                                  </Button>
                                </div>

                                {showReviews ? (
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                                    <div className="max-h-60 overflow-y-auto space-y-3">
                                      {selectedProduct.userReviews.map((review) => (
                                        <div key={review.id} className="border-b pb-3">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="font-medium text-sm">{review.userName}</span>
                                            {review.verified && (
                                              <Badge variant="secondary" className="text-xs">
                                                Verified
                                              </Badge>
                                            )}
                                            <span className="text-xs text-muted-foreground">{review.date}</span>
                                          </div>
                                          <div className="flex items-center gap-1 mb-2">
                                            {[...Array(5)].map((_, i) => (
                                              <Star
                                                key={i}
                                                className={`h-3 w-3 ${
                                                  i < review.rating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                }`}
                                              />
                                            ))}
                                          </div>
                                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Add Review Form */}
                                    <div className="border-t pt-4">
                                      <h4 className="font-medium mb-3">Write a Review</h4>
                                      <div className="space-y-3">
                                        <div>
                                          <label className="text-sm font-medium mb-2 block">Rating</label>
                                          <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                              <button
                                                key={i}
                                                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                                                className="p-0 border-none bg-transparent"
                                              >
                                                <Star
                                                  className={`h-5 w-5 ${
                                                    i < newReview.rating
                                                      ? "fill-yellow-400 text-yellow-400"
                                                      : "text-gray-300"
                                                  }`}
                                                />
                                              </button>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium mb-2 block">Comment</label>
                                          <Textarea
                                            placeholder="Share your thoughts about this product..."
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                            className="min-h-[80px]"
                                          />
                                        </div>
                                        <Button onClick={submitReview} size="sm">
                                          Submit Review
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-center gap-2 mb-4">
                                      <span className="text-2xl font-bold">{selectedProduct.price}</span>
                                      {selectedProduct.originalPrice && (
                                        <span className="text-lg text-muted-foreground line-through">
                                          {selectedProduct.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-muted-foreground">{selectedProduct.description}</p>

                                    {/* Size Selection */}
                                    {selectedProduct.sizes.length > 0 && (
                                      <div>
                                        <label className="text-sm font-medium mb-2 block">Size</label>
                                        <div className="flex gap-2 flex-wrap">
                                          {selectedProduct.sizes.map((size) => (
                                            <Button
                                              key={size}
                                              variant={selectedSize === size ? "default" : "outline"}
                                              size="sm"
                                              onClick={() => setSelectedSize(size)}
                                            >
                                              {size}
                                            </Button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Color Selection */}
                                    {selectedProduct.colors.length > 0 && (
                                      <div>
                                        <label className="text-sm font-medium mb-2 block">Color</label>
                                        <div className="flex gap-2 flex-wrap">
                                          {selectedProduct.colors.map((color) => (
                                            <Button
                                              key={color}
                                              variant={selectedColor === color ? "default" : "outline"}
                                              size="sm"
                                              onClick={() => setSelectedColor(color)}
                                            >
                                              {color}
                                            </Button>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Quantity */}
                                    <div>
                                      <label className="text-sm font-medium mb-2 block">Quantity</label>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <span className="px-4 py-2 border rounded">{quantity}</span>
                                        <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>

                                    {/* Materials */}
                                    {selectedProduct.materials.length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-medium mb-2">Materials</h4>
                                        <ul className="text-sm text-muted-foreground">
                                          {selectedProduct.materials.map((material, i) => (
                                            <li key={i}>• {material}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    {/* Care Instructions */}
                                    {selectedProduct.careInstructions.length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-medium mb-2">Care Instructions</h4>
                                        <ul className="text-sm text-muted-foreground">
                                          {selectedProduct.careInstructions.map((instruction, i) => (
                                            <li key={i}>• {instruction}</li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}

                                    <div className="flex gap-2 pt-4">
                                      <Button
                                        className="flex-1 bg-ilary-button hover:bg-ilary-buttonHover text-foreground"
                                        onClick={() => {
                                          addToCart(selectedProduct, selectedSize, selectedColor, quantity)
                                          setSelectedProduct(null)
                                        }}
                                      >
                                        Add to Cart
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => toggleWishlist(selectedProduct.id, selectedProduct.title)}
                                      >
                                        <Heart
                                          className={`h-4 w-4 ${wishlist.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`}
                                        />
                                      </Button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
                      onClick={() => addToCart(product)}
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

const allProducts: Product[] = [
  // Featured Collection Products
  {
    id: "1",
    title: "Silk Midi Dress with Belt",
    price: "KES 18,500",
    originalPrice: "KES 24,000",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1888&auto=format&fit=crop",
    category: "collections",
    subcategory: "featured",
    rating: 5,
    reviews: 42,
    isFeatured: true,
    discount: 23,
    description: "Elegant silk midi dress with adjustable belt. Perfect for both casual and formal occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    materials: ["100% Silk", "Adjustable belt included"],
    careInstructions: ["Dry clean only", "Store on hanger", "Avoid direct sunlight"],
    userReviews: [
      {
        id: "r1",
        userId: "u1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Absolutely gorgeous dress! The silk quality is exceptional and the fit is perfect.",
        date: "2024-01-15",
        verified: true,
      },
      {
        id: "r2",
        userId: "u2",
        userName: "Emma K.",
        rating: 5,
        comment: "Love this dress! Wore it to a wedding and received so many compliments.",
        date: "2024-01-10",
        verified: true,
      },
    ],
  },
  {
    id: "2",
    title: "Cashmere Blend Sweater",
    price: "KES 12,800",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "collections",
    subcategory: "winter",
    rating: 5,
    reviews: 28,
    isFeatured: true,
    description: "Luxurious cashmere blend sweater for ultimate comfort and style.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Grey", "Camel"],
    materials: ["70% Cashmere", "30% Wool"],
    careInstructions: ["Hand wash cold", "Lay flat to dry", "Store folded"],
    userReviews: [
      {
        id: "r3",
        userId: "u3",
        userName: "Lisa R.",
        rating: 5,
        comment: "So soft and warm! Perfect for winter days.",
        date: "2024-01-12",
        verified: true,
      },
    ],
  },
  {
    id: "3",
    title: "Linen Summer Blazer",
    price: "KES 14,200",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "collections",
    subcategory: "summer",
    rating: 4,
    reviews: 35,
    description: "Lightweight linen blazer perfect for summer professional looks.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Beige", "Light Blue"],
    materials: ["100% Linen", "Unlined for breathability"],
    careInstructions: ["Machine wash cold", "Iron while damp", "Hang to dry"],
    userReviews: [
      {
        id: "r4",
        userId: "u4",
        userName: "Maria S.",
        rating: 4,
        comment: "Great for summer office wear. Breathable and stylish.",
        date: "2024-01-08",
        verified: true,
      },
    ],
  },
  {
    id: "4",
    title: "Autumn Wool Coat",
    price: "KES 28,900",
    originalPrice: "KES 35,000",
    image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1887&auto=format&fit=crop",
    category: "collections",
    subcategory: "autumn",
    rating: 5,
    reviews: 19,
    isFeatured: true,
    discount: 17,
    description: "Classic wool coat with modern tailoring for autumn elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Camel", "Black", "Navy"],
    materials: ["80% Wool", "20% Polyester", "Satin lining"],
    careInstructions: ["Dry clean only", "Professional pressing recommended"],
    userReviews: [
      {
        id: "r5",
        userId: "u5",
        userName: "Anna T.",
        rating: 5,
        comment: "Beautiful coat! The quality is outstanding and it's so warm.",
        date: "2024-01-05",
        verified: true,
      },
    ],
  },
  {
    id: "5",
    title: "Spring Floral Dress",
    price: "KES 11,500",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1888&auto=format&fit=crop",
    category: "collections",
    subcategory: "spring",
    rating: 4,
    reviews: 52,
    description: "Feminine floral dress perfect for spring occasions.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Pink Floral", "Blue Floral", "Yellow Floral"],
    materials: ["100% Cotton", "Lined bodice"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on medium"],
    userReviews: [
      {
        id: "r6",
        userId: "u6",
        userName: "Sophie L.",
        rating: 4,
        comment: "Love the floral pattern! Perfect for spring events.",
        date: "2024-01-03",
        verified: true,
      },
    ],
  },

  // Inspiration Products
  {
    id: "6",
    title: "Street Style Denim Jacket",
    price: "KES 8,900",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1887&auto=format&fit=crop",
    category: "inspiration",
    subcategory: "street-style",
    rating: 4,
    reviews: 67,
    description: "Classic denim jacket inspired by street style fashion. Perfect for layering.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Light Blue", "Dark Blue", "Black"],
    materials: ["100% Cotton Denim", "Metal buttons"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron if needed"],
    userReviews: [
      {
        id: "r7",
        userId: "u7",
        userName: "Jake M.",
        rating: 4,
        comment: "Great quality denim jacket. Goes with everything!",
        date: "2024-01-01",
        verified: true,
      },
    ],
  },
  {
    id: "7",
    title: "Runway Inspired Blazer",
    price: "KES 22,000",
    originalPrice: "KES 28,000",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "inspiration",
    subcategory: "runway-trends",
    rating: 5,
    reviews: 19,
    isFeatured: true,
    discount: 21,
    description: "Structured blazer inspired by latest runway trends. Features modern tailoring.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Beige"],
    materials: ["Wool blend", "Structured shoulders", "Satin lining"],
    careInstructions: ["Dry clean only", "Professional pressing recommended"],
    userReviews: [
      {
        id: "r8",
        userId: "u8",
        userName: "Rachel P.",
        rating: 5,
        comment: "This blazer is a statement piece! Love the structured shoulders.",
        date: "2023-12-28",
        verified: true,
      },
    ],
  },
  {
    id: "8",
    title: "Celebrity Style Sunglasses",
    price: "KES 15,500",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop",
    category: "inspiration",
    subcategory: "celebrity-looks",
    rating: 5,
    reviews: 89,
    description: "Oversized sunglasses inspired by celebrity fashion. UV protection included.",
    sizes: ["One Size"],
    colors: ["Black", "Tortoiseshell", "Gold"],
    materials: ["Acetate frame", "UV400 lenses", "Protective case included"],
    careInstructions: ["Clean with microfiber cloth", "Store in case", "Avoid extreme temperatures"],
    userReviews: [
      {
        id: "r9",
        userId: "u9",
        userName: "Olivia H.",
        rating: 5,
        comment: "These sunglasses make me feel like a celebrity! Great quality.",
        date: "2023-12-25",
        verified: true,
      },
    ],
  },
  {
    id: "9",
    title: "Vintage Revival Handbag",
    price: "KES 19,800",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
    category: "inspiration",
    subcategory: "vintage-revival",
    rating: 4,
    reviews: 34,
    description: "Classic handbag with vintage-inspired design and modern functionality.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Burgundy"],
    materials: ["Genuine leather", "Vintage-style hardware", "Multiple compartments"],
    careInstructions: ["Clean with leather conditioner", "Store in dust bag", "Avoid water exposure"],
    userReviews: [
      {
        id: "r10",
        userId: "u10",
        userName: "Grace W.",
        rating: 4,
        comment: "Beautiful vintage-style bag. The leather quality is excellent.",
        date: "2023-12-22",
        verified: true,
      },
    ],
  },
  {
    id: "10",
    title: "Minimalist White Tee",
    price: "KES 3,800",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    category: "inspiration",
    subcategory: "minimalist",
    rating: 5,
    reviews: 156,
    description: "Perfect minimalist white tee with clean lines and premium cotton.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Off-White", "Cream"],
    materials: ["100% Organic Cotton", "Pre-shrunk"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on low heat"],
    userReviews: [
      {
        id: "r11",
        userId: "u11",
        userName: "Alex C.",
        rating: 5,
        comment: "The perfect basic tee! Soft, comfortable, and well-made.",
        date: "2023-12-20",
        verified: true,
      },
    ],
  },
  {
    id: "11",
    title: "Bold Statement Earrings",
    price: "KES 7,200",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1770&auto=format&fit=crop",
    category: "inspiration",
    subcategory: "bold-expressions",
    rating: 4,
    reviews: 28,
    description: "Eye-catching statement earrings for bold fashion expressions.",
    sizes: ["One Size"],
    colors: ["Gold", "Silver", "Rose Gold"],
    materials: ["Brass with gold plating", "Hypoallergenic posts"],
    careInstructions: ["Store in jewelry box", "Clean with soft cloth", "Avoid water and perfume"],
    userReviews: [
      {
        id: "r12",
        userId: "u12",
        userName: "Zoe B.",
        rating: 4,
        comment: "These earrings are gorgeous! They really make a statement.",
        date: "2023-12-18",
        verified: true,
      },
    ],
  },

  // Style Guides Products
  {
    id: "12",
    title: "Capsule Wardrobe Essential Tee",
    price: "KES 3,200",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop",
    category: "style-guides",
    subcategory: "capsule-wardrobe",
    rating: 4,
    reviews: 156,
    description: "Essential basic tee perfect for building a capsule wardrobe. Versatile and comfortable.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Grey", "Navy", "Beige"],
    materials: ["100% Organic Cotton", "Pre-shrunk"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on low heat"],
    userReviews: [
      {
        id: "r13",
        userId: "u13",
        userName: "Maya J.",
        rating: 4,
        comment: "Great basic tee for everyday wear. Good quality cotton.",
        date: "2023-12-15",
        verified: true,
      },
    ],
  },
  {
    id: "13",
    title: "Color Coordinated Scarf Set",
    price: "KES 6,800",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1780&auto=format&fit=crop",
    category: "style-guides",
    subcategory: "color-coordination",
    rating: 5,
    reviews: 43,
    description: "Set of three coordinated scarves to master color coordination in your outfits.",
    sizes: ["One Size"],
    colors: ["Neutral Tones", "Warm Tones", "Cool Tones"],
    materials: ["Silk blend", "Lightweight fabric"],
    careInstructions: ["Hand wash cold", "Air dry", "Iron on silk setting"],
    userReviews: [
      {
        id: "r14",
        userId: "u14",
        userName: "Nina F.",
        rating: 5,
        comment: "Love this scarf set! Perfect for learning color coordination.",
        date: "2023-12-12",
        verified: true,
      },
    ],
  },
  {
    id: "14",
    title: "Occasion Dress - Cocktail",
    price: "KES 16,500",
    image: "https://images.unsplash.com/photo-1566479179817-c0b5b4b4b1e5?q=80&w=1780&auto=format&fit=crop",
    category: "style-guides",
    subcategory: "occasion-dressing",
    rating: 5,
    reviews: 78,
    description: "Perfect cocktail dress for special occasions. Elegant and sophisticated design.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Emerald", "Burgundy"],
    materials: ["Polyester blend", "Stretch fabric", "Hidden zipper"],
    careInstructions: ["Dry clean recommended", "Steam to remove wrinkles"],
    userReviews: [
      {
        id: "r15",
        userId: "u15",
        userName: "Isabella M.",
        rating: 5,
        comment: "Perfect dress for cocktail events! Fits beautifully.",
        date: "2023-12-10",
        verified: true,
      },
    ],
  },
  {
    id: "15",
    title: "Seasonal Transition Cardigan",
    price: "KES 9,500",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "style-guides",
    subcategory: "seasonal-transitions",
    rating: 4,
    reviews: 62,
    description: "Versatile cardigan perfect for transitioning between seasons.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Beige", "Grey", "Navy", "Cream"],
    materials: ["Cotton blend", "Lightweight knit"],
    careInstructions: ["Machine wash cold", "Lay flat to dry", "Iron on low"],
    userReviews: [
      {
        id: "r16",
        userId: "u16",
        userName: "Chloe D.",
        rating: 4,
        comment: "Great for layering! Perfect weight for spring and fall.",
        date: "2023-12-08",
        verified: true,
      },
    ],
  },
  {
    id: "16",
    title: "Body-Flattering A-Line Skirt",
    price: "KES 7,800",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?q=80&w=1887&auto=format&fit=crop",
    category: "style-guides",
    subcategory: "body-types",
    rating: 4,
    reviews: 91,
    description: "Universally flattering A-line skirt designed to complement all body types.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Navy", "Grey", "Burgundy"],
    materials: ["Ponte knit", "Stretch waistband"],
    careInstructions: ["Machine wash cold", "Tumble dry low", "Iron on medium"],
    userReviews: [
      {
        id: "r17",
        userId: "u17",
        userName: "Ava L.",
        rating: 4,
        comment: "So flattering! The A-line cut is perfect for my body type.",
        date: "2023-12-05",
        verified: true,
      },
    ],
  },
  {
    id: "17",
    title: "Sustainable Bamboo Blouse",
    price: "KES 8,200",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
    category: "style-guides",
    subcategory: "sustainable-fashion",
    rating: 5,
    reviews: 37,
    description: "Eco-friendly blouse made from sustainable bamboo fiber.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Sage Green", "Dusty Pink"],
    materials: ["95% Bamboo fiber", "5% Spandex", "Biodegradable"],
    careInstructions: ["Machine wash cold", "Air dry preferred", "Iron on low"],
    userReviews: [
      {
        id: "r18",
        userId: "u18",
        userName: "Luna G.",
        rating: 5,
        comment: "Love that this is sustainable! So soft and comfortable too.",
        date: "2023-12-03",
        verified: true,
      },
    ],
  },

  // Traditional Categories
  {
    id: "18",
    title: "High-Waisted Tailored Trousers",
    price: "KES 9,200",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1770&auto=format&fit=crop",
    category: "bottoms",
    subcategory: "all",
    rating: 4,
    reviews: 35,
    isFeatured: true,
    description: "Classic high-waisted trousers with tailored fit. Perfect for professional settings.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Grey", "Camel"],
    materials: ["Wool blend", "Stretch waistband"],
    careInstructions: ["Dry clean preferred", "Iron on medium heat"],
    userReviews: [
      {
        id: "r19",
        userId: "u19",
        userName: "Victoria S.",
        rating: 4,
        comment: "Great fit and quality! Perfect for work.",
        date: "2023-12-01",
        verified: true,
      },
    ],
  },
  {
    id: "19",
    title: "Leather Crossbody Bag",
    price: "KES 15,500",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
    category: "accessories",
    subcategory: "all",
    rating: 5,
    reviews: 67,
    isFeatured: true,
    description: "Premium leather crossbody bag with adjustable strap. Perfect for everyday use.",
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tan", "Burgundy"],
    materials: ["Genuine leather", "Adjustable strap", "Multiple compartments"],
    careInstructions: ["Clean with leather conditioner", "Store in dust bag", "Avoid water exposure"],
    userReviews: [
      {
        id: "r20",
        userId: "u20",
        userName: "Sophia R.",
        rating: 5,
        comment: "Beautiful bag! The leather quality is amazing.",
        date: "2023-11-28",
        verified: true,
      },
    ],
  },
  {
    id: "20",
    title: "Elegant Evening Gown",
    price: "KES 32,000",
    originalPrice: "KES 40,000",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1888&auto=format&fit=crop",
    category: "dresses",
    subcategory: "all",
    rating: 5,
    reviews: 23,
    isFeatured: true,
    discount: 20,
    description: "Stunning evening gown for special occasions and formal events.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Emerald", "Burgundy"],
    materials: ["Silk chiffon", "Beaded details", "Full lining"],
    careInstructions: ["Dry clean only", "Professional storage recommended"],
    userReviews: [
      {
        id: "r21",
        userId: "u21",
        userName: "Charlotte K.",
        rating: 5,
        comment: "Absolutely stunning gown! Felt like a princess wearing it.",
        date: "2023-11-25",
        verified: true,
      },
    ],
  },
]
