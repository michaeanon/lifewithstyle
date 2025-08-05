"use client"

import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Package,
  Truck,
  XCircle,
  Search,
  ArrowLeft,
  Download,
  Repeat,
  Star,
  MessageSquare,
  Clock,
  MapPin,
  PackageCheck,
  CreditCard,
  Calendar,
  Eye,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface OrderItem {
  id: string
  name: string
  image: string
  price: string
  quantity: number
  size?: string
  color?: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled"
  total: string
  items: OrderItem[]
  shippingAddress: {
    name: string
    street: string
    city: string
    zip: string
    country: string
  }
  trackingNumber?: string
  deliveryEstimate?: string
  paymentMethod: string
  reviews?: { productId: string; rating: number; comment: string }[]
}

const mockOrders: Order[] = [
  {
    id: "o1",
    orderNumber: "LWS-2024001",
    date: "2024-07-20",
    status: "Delivered",
    total: "KES 32,000",
    items: [
      {
        id: "p1",
        name: "Silk Midi Dress with Belt",
        image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1888&auto=format&fit=crop",
        price: "KES 18,500",
        quantity: 1,
        size: "M",
        color: "Navy",
      },
      {
        id: "p2",
        name: "Cashmere Blend Sweater",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop",
        price: "KES 12,800",
        quantity: 1,
        size: "L",
        color: "Grey",
      },
    ],
    shippingAddress: {
      name: "Jane Doe",
      street: "123 Fashion St",
      city: "Nairobi",
      zip: "00100",
      country: "Kenya",
    },
    trackingNumber: "TRK123456789",
    deliveryEstimate: "Delivered on 2024-07-25",
    paymentMethod: "M-Pesa",
    reviews: [{ productId: "p1", rating: 5, comment: "Absolutely love this dress!" }],
  },
  {
    id: "o2",
    orderNumber: "LWS-2024002",
    date: "2024-07-22",
    status: "Shipped",
    total: "KES 8,900",
    items: [
      {
        id: "p3",
        name: "Street Style Denim Jacket",
        image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=1887&auto=format&fit=crop",
        price: "KES 8,900",
        quantity: 1,
        size: "S",
        color: "Light Blue",
      },
    ],
    shippingAddress: {
      name: "John Smith",
      street: "456 Style Ave",
      city: "Mombasa",
      zip: "80100",
      country: "Kenya",
    },
    trackingNumber: "TRK987654321",
    deliveryEstimate: "Expected by 2024-07-29",
    paymentMethod: "Credit Card",
  },
  {
    id: "o3",
    orderNumber: "LWS-2024003",
    date: "2024-07-25",
    status: "Processing",
    total: "KES 15,500",
    items: [
      {
        id: "p4",
        name: "Celebrity Style Sunglasses",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop",
        price: "KES 15,500",
        quantity: 1,
      },
    ],
    shippingAddress: {
      name: "Alice Johnson",
      street: "789 Chic Rd",
      city: "Kisumu",
      zip: "40100",
      country: "Kenya",
    },
    paymentMethod: "PayPal",
  },
  {
    id: "o4",
    orderNumber: "LWS-2024004",
    date: "2024-07-18",
    status: "Cancelled",
    total: "KES 10,000",
    items: [
      {
        id: "p5",
        name: "Summer Linen Shirt",
        image: "/placeholder.svg?height=100&width=100",
        price: "KES 5,000",
        quantity: 2,
      },
    ],
    shippingAddress: {
      name: "Bob Brown",
      street: "101 Cancel Ln",
      city: "Nairobi",
      zip: "00100",
      country: "Kenya",
    },
    paymentMethod: "M-Pesa",
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const getStatusBadgeVariant = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "default"
      case "Shipped":
        return "secondary"
      case "Processing":
        return "outline"
      case "Cancelled":
        return "destructive"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "Shipped":
        return <Truck className="h-4 w-4 text-yellow-500" />
      case "Delivered":
        return <PackageCheck className="h-4 w-4 text-green-500" />
      case "Cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getProgressValue = (status: Order["status"]) => {
    switch (status) {
      case "Processing":
        return 33
      case "Shipped":
        return 66
      case "Delivered":
        return 100
      case "Cancelled":
        return 0 // Or a specific value for cancelled
      default:
        return 0
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status === activeTab
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesTab && matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative h-[30vh] overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="h-8 w-8 text-purple-500" />
              <h1 className="text-4xl md:text-6xl font-serif tracking-wide text-gray-800">My Orders</h1>
              <Truck className="h-8 w-8 text-indigo-500" />
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Track your purchases and manage your order history
            </p>
          </motion.div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
          {/* Header and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/shop/featured-collection">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Shop
                </Button>
              </Link>
              <div>
                <h2 className="text-2xl font-bold">Your Orders</h2>
                <p className="text-muted-foreground text-sm">{orders.length} total orders</p>
              </div>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by order number or product"
                className="pl-9 w-full sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Order Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="Processing">Processing</TabsTrigger>
              <TabsTrigger value="Shipped">Shipped</TabsTrigger>
              <TabsTrigger value="Delivered">Delivered</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-4">
              {/* Content for All Orders */}
            </TabsContent>
            <TabsContent value="Processing" className="mt-4">
              {/* Content for Processing Orders */}
            </TabsContent>
            <TabsContent value="Shipped" className="mt-4">
              {/* Content for Shipped Orders */}
            </TabsContent>
            <TabsContent value="Delivered" className="mt-4">
              {/* Content for Delivered Orders */}
            </TabsContent>
          </Tabs>

          {/* Orders List */}
          <AnimatePresence mode="wait">
            {filteredOrders.length === 0 ? (
              <motion.div
                key="no-orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchTerm
                    ? "Your search did not match any orders."
                    : activeTab === "all"
                      ? "You haven't placed any orders yet."
                      : `No orders currently in "${activeTab}" status.`}
                </p>
                <Link href="/shop/featured-collection">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Start Shopping</Button>
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="order-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {filteredOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
                    }}
                    className="rounded-lg overflow-hidden"
                  >
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                        <div>
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            Order #{order.orderNumber}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {order.date}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(order.status)} className="flex items-center gap-1">
                          {getStatusIcon(order.status)}
                          {order.status}
                        </Badge>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium mb-2">Items ({order.items.length})</p>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <Image
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    className="rounded-md object-cover"
                                  />
                                  <div>
                                    <p className="text-sm font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.quantity} x {item.price}
                                      {item.size && ` / Size: ${item.size}`}
                                      {item.color && ` / Color: ${item.color}`}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Total</p>
                            <p className="text-xl font-bold text-purple-600">{order.total}</p>
                            <p className="text-sm font-medium mt-4 mb-2">Shipping Address</p>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.name}
                              <br />
                              {order.shippingAddress.street}
                              <br />
                              {order.shippingAddress.city}, {order.shippingAddress.zip}
                              <br />
                              {order.shippingAddress.country}
                            </p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        {/* Order Progress */}
                        {order.status !== "Cancelled" && (
                          <div className="mb-4">
                            <p className="text-sm font-medium mb-2">Order Progress</p>
                            <Progress value={getProgressValue(order.status)} className="w-full h-2" />
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>Processing</span>
                              <span>Shipped</span>
                              <span>Delivered</span>
                            </div>
                          </div>
                        )}

                        {/* Tracking Info */}
                        {order.trackingNumber && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Truck className="h-4 w-4" />
                            <span>Tracking: {order.trackingNumber}</span>
                            {order.deliveryEstimate && <span>({order.deliveryEstimate})</span>}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-wrap gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Order Details #{selectedOrder?.orderNumber}</DialogTitle>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-4">
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm text-muted-foreground">Order Date: {selectedOrder.date}</p>
                                    <Badge
                                      variant={getStatusBadgeVariant(selectedOrder.status)}
                                      className="flex items-center gap-1"
                                    >
                                      {getStatusIcon(selectedOrder.status)}
                                      {selectedOrder.status}
                                    </Badge>
                                  </div>

                                  <h4 className="font-semibold text-lg">Items Ordered</h4>
                                  <div className="space-y-3">
                                    {selectedOrder.items.map((item) => (
                                      <div key={item.id} className="flex gap-4 items-center">
                                        <Image
                                          src={item.image || "/placeholder.svg"}
                                          alt={item.name}
                                          width={64}
                                          height={64}
                                          className="rounded-md object-cover"
                                        />
                                        <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-muted-foreground">
                                            {item.quantity} x {item.price}
                                            {item.size && ` / Size: ${item.size}`}
                                            {item.color && ` / Color: ${item.color}`}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>

                                  <Separator />

                                  <h4 className="font-semibold text-lg">Order Summary</h4>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span>Subtotal</span>
                                      <span>{selectedOrder.total}</span> {/* Simplified for mock */}
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Shipping</span>
                                      <span>Free</span> {/* Simplified for mock */}
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Tax</span>
                                      <span>Calculated</span> {/* Simplified for mock */}
                                    </div>
                                    <div className="flex justify-between font-bold text-base">
                                      <span>Total</span>
                                      <span>{selectedOrder.total}</span>
                                    </div>
                                  </div>

                                  <Separator />

                                  <h4 className="font-semibold text-lg">Shipping Information</h4>
                                  <div className="text-sm text-muted-foreground space-y-1">
                                    <p className="flex items-center gap-2">
                                      <MapPin className="h-4 w-4" />
                                      {selectedOrder.shippingAddress.name}
                                    </p>
                                    <p className="ml-6">{selectedOrder.shippingAddress.street}</p>
                                    <p className="ml-6">
                                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.zip}
                                    </p>
                                    <p className="ml-6">{selectedOrder.shippingAddress.country}</p>
                                    {selectedOrder.trackingNumber && (
                                      <p className="flex items-center gap-2 mt-2">
                                        <Truck className="h-4 w-4" />
                                        Tracking Number: {selectedOrder.trackingNumber}
                                      </p>
                                    )}
                                    {selectedOrder.deliveryEstimate && (
                                      <p className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        Delivery Estimate: {selectedOrder.deliveryEstimate}
                                      </p>
                                    )}
                                  </div>

                                  <Separator />

                                  <h4 className="font-semibold text-lg">Payment Information</h4>
                                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <CreditCard className="h-4 w-4" />
                                    Method: {selectedOrder.paymentMethod}
                                  </p>

                                  {/* Reviews Section in Detail Modal */}
                                  {selectedOrder.status === "Delivered" && (
                                    <>
                                      <Separator />
                                      <h4 className="font-semibold text-lg">Your Reviews</h4>
                                      {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="border-b pb-3 mb-3 last:border-b-0 last:pb-0">
                                          <div className="flex items-center gap-3 mb-2">
                                            <Image
                                              src={item.image || "/placeholder.svg"}
                                              alt={item.name}
                                              width={40}
                                              height={40}
                                              className="rounded-md object-cover"
                                            />
                                            <p className="font-medium text-sm">{item.name}</p>
                                          </div>
                                          {selectedOrder.reviews?.find((r) => r.productId === item.id) ? (
                                            <div className="ml-12">
                                              <div className="flex items-center gap-1 mb-1">
                                                {[...Array(5)].map((_, i) => (
                                                  <Star
                                                    key={i}
                                                    className={`h-3 w-3 ${
                                                      i <
                                                      (
                                                        selectedOrder.reviews?.find((r) => r.productId === item.id)
                                                          ?.rating || 0
                                                      )
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                    }`}
                                                  />
                                                ))}
                                              </div>
                                              <p className="text-sm text-muted-foreground">
                                                "{selectedOrder.reviews?.find((r) => r.productId === item.id)?.comment}"
                                              </p>
                                            </div>
                                          ) : (
                                            <Button variant="outline" size="sm" className="ml-12 bg-transparent">
                                              <Star className="h-3 w-3 mr-1" />
                                              Write a Review
                                            </Button>
                                          )}
                                        </div>
                                      ))}
                                    </>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          {order.status === "Delivered" && (
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                          )}
                          {order.status === "Delivered" && (
                            <Button variant="outline" size="sm">
                              <Repeat className="h-4 w-4 mr-2" />
                              Reorder
                            </Button>
                          )}
                          {order.status === "Delivered" && !order.reviews?.length && (
                            <Button variant="outline" size="sm">
                              <Star className="h-4 w-4 mr-2" />
                              Review Items
                            </Button>
                          )}
                          {order.status !== "Cancelled" && (
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Support
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Newsletter Section */}
          <motion.div
            className="mt-16 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-serif mb-4">Stay Updated on Your Orders</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Subscribe to get real-time updates on your order status and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
