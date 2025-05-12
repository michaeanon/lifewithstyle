"use client"

import { useState } from "react"
import { MediaUploadForm } from "@/components/media-upload-form"
import { MediaCarousel } from "@/components/media-carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MediaManagementPage() {
  const [mediaItems, setMediaItems] = useState<Array<{ type: string; src: string; alt: string }>>([])

  const handleUploadComplete = (newItems: Array<{ type: string; src: string; alt: string }>) => {
    setMediaItems((prev) => [...prev, ...newItems])
  }

  return (
    <div className="container py-10">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Media Management</h1>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upload">Upload Media</TabsTrigger>
          <TabsTrigger value="preview">Preview Carousel</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-6">
          <MediaUploadForm onUploadComplete={handleUploadComplete} />
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Carousel Preview</CardTitle>
              <CardDescription>Preview how your media carousel will appear on the homepage.</CardDescription>
            </CardHeader>
            <CardContent>
              {mediaItems.length > 0 ? (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  <MediaCarousel
                    mediaItems={mediaItems.map((item) => ({
                      type: item.type === "image" ? "image" : "video",
                      src: item.src,
                      alt: item.alt,
                    }))}
                    interval={5000}
                    overlay={true}
                    overlayOpacity={0.3}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-10 text-center border rounded-lg bg-muted/20">
                  <p className="text-muted-foreground mb-4">No media items uploaded yet.</p>
                  <Button variant="outline" onClick={() => document.querySelector('[data-value="upload"]')?.click()}>
                    Upload Media
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
