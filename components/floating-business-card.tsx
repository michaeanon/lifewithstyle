"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import BusinessCard from "@/components/business-card"

export default function FloatingBusinessCard() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleCard = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Click outside to close */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />}
      {/* Floating Button */}
      <Button
        onClick={toggleCard}
        className="fixed bottom-40 right-6 z-40 rounded-full w-14 h-14 p-0 shadow-lg bg-gradient-to-tr from-amber-200 to-rose-300 hover:from-amber-300 hover:to-rose-400 text-gray-800 border border-white/30"
        aria-label="Open Business Card"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="relative z-10"
        >
          <CreditCard className="h-6 w-6" />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full opacity-70"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(251, 191, 36, 0)",
              "0 0 0 10px rgba(251, 191, 36, 0.1)",
              "0 0 0 0 rgba(251, 191, 36, 0)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </Button>

      {/* Compact Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="fixed bottom-56 right-6 z-50 bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden max-w-sm w-80 shadow-2xl border border-white/20"
            style={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Decorative Top Border */}
            <div className="h-1.5 w-full bg-gradient-to-r from-amber-300 via-rose-300 to-amber-300" />

            {/* Close Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-3 right-3 z-10"
            >
              <Button
                onClick={() => setIsOpen(false)}
                className="h-7 w-7 rounded-full p-0 bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                size="icon"
                aria-label="Close"
              >
                <X className="h-3 w-3 text-gray-700" />
              </Button>
            </motion.div>

            {/* Card Container */}
            <div className="p-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative mb-3"
              >
                <h2 className="text-lg font-serif text-center text-gray-800">Digital Business Card</h2>
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 w-0 bg-gradient-to-r from-transparent via-amber-300 to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="transform scale-75 origin-center"
              >
                <BusinessCard />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
