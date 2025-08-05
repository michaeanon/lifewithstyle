"use client"

import { Card } from "@/components/ui/card"

import { Navigation } from "@/components/navigation"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

export default function OrdersLoadingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navigation />

      {/* Hero Section Skeleton */}
      <div className="relative h-[30vh] overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Skeleton className="h-10 w-64 mb-4 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </motion.div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12">
          {/* Header and Search Skeletons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-32" />
              <div>
                <Skeleton className="h-8 w-48 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-10 w-full sm:w-[300px]" />
          </div>

          {/* Order Tabs Skeleton */}
          <Skeleton className="h-10 w-full mb-8" />

          {/* Orders List Skeletons */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <div className="flex items-center gap-3 mb-2">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-40" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-6 w-32 mb-4" />
                      <Skeleton className="h-4 w-28 mb-2" />
                      <Skeleton className="h-3 w-48" />
                      <Skeleton className="h-3 w-40" />
                      <Skeleton className="h-3 w-36" />
                    </div>
                  </div>
                  <Skeleton className="h-2 w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-28" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section Skeleton */}
          <motion.div
            className="mt-16 rounded-lg p-8 text-center bg-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Skeleton className="h-8 w-64 mb-4 mx-auto" />
            <Skeleton className="h-5 w-96 mb-6 mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Skeleton className="flex-1 h-10" />
              <Skeleton className="h-10 w-24" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
