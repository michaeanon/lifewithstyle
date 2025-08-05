"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openItems, setOpenItems] = useState<number[]>([0]) // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className={`border rounded-lg overflow-hidden transition-all duration-300 ${
            openItems.includes(index)
              ? "border-ilary-button shadow-md bg-white"
              : "border-gray-200 hover:border-ilary-peachLight"
          }`}
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center transition-colors"
            aria-expanded={openItems.includes(index)}
            aria-controls={`faq-answer-${index}`}
          >
            <span
              className={`font-medium text-lg transition-colors duration-300 ${openItems.includes(index) ? "text-ilary-button" : ""}`}
            >
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`rounded-full p-1 ${openItems.includes(index) ? "bg-ilary-peachLight text-ilary-button" : "text-gray-500"}`}
            >
              <ChevronDown className="h-5 w-5" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {openItems.includes(index) && (
              <motion.div
                id={`faq-answer-${index}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-5 pt-0">
                  <motion.p
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {faq.answer}
                  </motion.p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  )
}
