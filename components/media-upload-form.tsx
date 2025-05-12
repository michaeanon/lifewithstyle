"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, X } from "lucide-react"

interface MediaUploadFormProps {
  onUploadComplete: (mediaItems: Array<{ type: string; src: string; alt: string }>) => void
}

export function MediaUploadForm({ onUploadComplete }: MediaUploadFormProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files)

      // Validate file types (only images and videos)
      const validFiles = selectedFiles.filter(
        (file) => file.type.startsWith("image/") || file.type.startsWith("video/"),
      )

      if (validFiles.length !== selectedFiles.length) {
        setError("Only image and video files are allowed")
      } else {
        setError(null)
        setFiles((prev) => [...prev, ...validFiles])
      }
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file to upload")
      return
    }

    setUploading(true)
    setError(null)

    try {
      // This is a simplified example. In a real application, you would:
      // 1. Create a FormData object and append each file
      // 2. Send the FormData to your API endpoint
      // 3. Track upload progress
      // 4. Process the response

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval)
            return prev
          }
          return prev + 5
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(interval)
      setUploadProgress(100)

      // Simulate successful upload
      const uploadedMedia = files.map((file) => ({
        type: file.type.startsWith("image/") ? "image" : "video",
        src: URL.createObjectURL(file), // In a real app, this would be the URL from your storage service
        alt: file.name,
      }))

      onUploadComplete(uploadedMedia)

      // Reset form after successful upload
      setTimeout(() => {
        setFiles([])
        setUploading(false)
        setUploadProgress(0)
      }, 1000)
    } catch (err) {
      setError("Failed to upload files. Please try again.")
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Media</CardTitle>
        <CardDescription>
          Upload images and videos for your hero carousel. Supported formats: JPG, PNG, GIF, MP4, WebM.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="media">Images & Videos</Label>
            <div className="flex items-center gap-2">
              <Input
                id="media"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                disabled={uploading}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => document.getElementById("media")?.click()}
                disabled={uploading}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Files</Label>
              <div className="max-h-40 overflow-y-auto space-y-2 border rounded-md p-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between text-sm p-1 bg-muted/50 rounded">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-primary">
                        {file.type.startsWith("image/") ? "IMG" : "VID"}
                      </div>
                      <span className="truncate">{file.name}</span>
                      <span className="text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                      className="h-6 w-6"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setFiles([])} disabled={uploading || files.length === 0}>
          Clear All
        </Button>
        <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            "Upload Files"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
