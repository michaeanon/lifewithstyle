"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BusinessCard from "@/components/business-card"

export default function BusinessCardPage() {
  const [activeTab, setActiveTab] = useState("digital")

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Business Card</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share your contact information with style. Use our digital business card for online sharing or print a
            physical copy for in-person networking.
          </p>
        </motion.div>

        <Tabs defaultValue="digital" className="mb-12" onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="digital">Digital Card</TabsTrigger>
            <TabsTrigger value="print">Printable Card</TabsTrigger>
          </TabsList>
          <TabsContent value="digital" className="mt-8">
            <div className="flex justify-center">
              <BusinessCard variant="digital" />
            </div>
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                This interactive digital business card can be shared online. Click the share button to send it to
                contacts, or download as a vCard to add to your address book.
              </p>
              <p className="text-sm text-muted-foreground">
                Flip the card to see additional information about Life With Style services.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="print" className="mt-8">
            <div className="flex justify-center print:justify-start">
              <BusinessCard variant="print" />
            </div>
            <div className="mt-8 text-center print:hidden">
              <p className="text-sm text-muted-foreground mb-4">
                This version is optimized for printing. Standard business card size (3.5" × 2").
              </p>
              <div className="flex justify-center gap-4 mt-6">
                <Button onClick={handlePrint} className="gap-2">
                  <Printer className="h-4 w-4" />
                  Print Card
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-ilary-peachLight/30 rounded-lg p-6 print:hidden"
        >
          <h2 className="text-xl font-medium mb-4">Tips for Using Your Business Card</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Digital Card</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Share via email or social media with the share button</li>
                <li>Save contact information directly to your phone contacts</li>
                <li>Copy website or email with a single click</li>
                <li>Flip the card to showcase your services</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Print Card</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Print on high-quality cardstock (100lb or higher)</li>
                <li>Consider a matte finish for an elegant look</li>
                <li>Use a paper cutter for clean edges</li>
                <li>Standard size fits in all business card holders</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-business-card,
          .print-business-card * {
            visibility: visible;
          }
          .print-business-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 3.5in;
            height: 2in;
          }
        }
      `}</style>
    </main>
  )
}
