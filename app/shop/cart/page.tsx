"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Heart, Tag } from "lucide-react"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

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
  if (typeof window === "undefined") return []
  const storedCart = localStorage.getItem("cart")
  return storedCart ? JSON.parse(storedCart) : []
}

const saveCartToLocalStorage = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart))
  }
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]) // Initialize as empty
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load cart items from localStorage on mount
  useEffect(() => {
    const loadedCart = getCartFromLocalStorage()
    setCartItems(loadedCart)
    setIsLoading(false)
  }, [])

  // Save cart items to localStorage whenever cartItems state changes
  useEffect(() => {
    if (!isLoading) {
      // Only save after initial load to prevent overwriting
      saveCartToLocalStorage(cartItems)
    }
  }, [cartItems, isLoading])

  const updateQuantity = (cartEntryId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((prev) => {
      const updated = prev.map((item) => (item.cartEntryId === cartEntryId ? { ...item, quantity: newQuantity } : item))
      return updated
    })
    toast({
      title: "Cart Updated",
      description: "Item quantity has been updated.",
    })
  }

  const removeItem = (cartEntryId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.cartEntryId !== cartEntryId)
      return updated
    })
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    })
  }

  const applyPromoCode = () => {
    const validCodes = {
      SAVE10: 10,
      WELCOME15: 15,
      STYLE20: 20,
    }

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setDiscount(validCodes[promoCode as keyof typeof validCodes])
      toast({
        title: "Promo Code Applied",
        description: `You saved ${validCodes[promoCode as keyof typeof validCodes]}%!`,
      })
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number.parseFloat(item.price.replace("KES ", "").replace(",", ""))
      return total + price * item.quantity
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 20000 ? 0 : 500 // Free shipping over KES 20,000
  const tax = (subtotal - discountAmount) * 0.16 // 16% VAT
  const total = subtotal - discountAmount + shipping + tax

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-white">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your cart...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/shop/featured-collection">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link href="/shop/featured-collection">
                <Button className="bg-rose-600 hover:bg-rose-700 text-white">Start Shopping</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.cartEntryId} // Use cartEntryId as key
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="relative w-24 h-24 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-medium text-lg line-clamp-2">{item.title}</h3>
                                <Badge variant="outline" className="mt-1">
                                  {item.category}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.cartEntryId)} // Use cartEntryId
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              {item.size && <span>Size: {item.size}</span>}
                              {item.color && <span>Color: {item.color}</span>}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.cartEntryId, item.quantity - 1)} // Use cartEntryId
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-12 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.cartEntryId, item.quantity + 1)} // Use cartEntryId
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-lg">{item.price}</p>
                                {item.quantity > 1 && (
                                  <p className="text-sm text-muted-foreground">{item.price} each</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Saved for Later Section */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Saved for Later
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center py-4">
                        No items saved for later. Items you save will appear here.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="sticky top-4">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Promo Code */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Promo Code</label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Enter code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                          />
                          <Button variant="outline" onClick={applyPromoCode}>
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                        {discount > 0 && <p className="text-sm text-green-600">Promo code applied! {discount}% off</p>}
                      </div>

                      <Separator />

                      {/* Price Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal</span>
                          <span>KES {subtotal.toLocaleString()}</span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount}%)</span>
                            <span>-KES {discountAmount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Shipping</span>
                          <span>{shipping === 0 ? "Free" : `KES ${shipping.toLocaleString()}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax (16%)</span>
                          <span>KES {tax.toLocaleString()}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>KES {total.toLocaleString()}</span>
                        </div>
                      </div>

                      {shipping > 0 && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-700">
                            Add KES {(20000 - subtotal).toLocaleString()} more for free shipping!
                          </p>
                        </div>
                      )}

                      <Button
                        className="w-full bg-rose-600 hover:bg-rose-700 text-white"
                        size="lg"
                        onClick={() => (window.location.href = "https://lifewithstylepayments.vercel.app/")}
                      >
                        Proceed to Checkout
                      </Button>

                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Secure checkout powered by Stripe</p>
                      </div>

                      {/* Payment Methods */}
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium mb-2">We Accept</p>
                        <div className="flex gap-2">
                          <div className="bg-gray-100 p-2 rounded text-xs font-medium">VISA</div>
                          <div className="bg-gray-100 p-2 rounded text-xs font-medium">M-PESA</div>
                          <div className="bg-gray-100 p-2 rounded text-xs font-medium">PAYPAL</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Recently Viewed */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recently Viewed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          {
                            title: "Leather Crossbody Bag",
                            price: "KES 15,500",
                            image:
                              "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
                          },
                          {
                            title: "High-Waisted Tailored Trousers",
                            price: "KES 9,200",
                            image:
                              "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1770&auto=format&fit=crop",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-2">{item.title}</p>
                              <p className="text-sm text-rose-600 font-semibold">{item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
