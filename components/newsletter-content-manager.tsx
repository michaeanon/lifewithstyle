"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Save, Send, Eye, Calendar, FileText, ImageIcon, Link, Bold, Italic, List } from "lucide-react"

interface NewsletterContent {
  id: string
  title: string
  subject: string
  content: string
  status: "draft" | "scheduled" | "sent"
  scheduledDate?: string
  createdAt: string
  updatedAt: string
}

export default function NewsletterContentManager() {
  const [activeContent, setActiveContent] = useState<NewsletterContent>({
    id: "new",
    title: "",
    subject: "",
    content: "",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const [savedContents, setSavedContents] = useState<NewsletterContent[]>([
    {
      id: "1",
      title: "Weekly Style Tips #1",
      subject: "Your Weekly Dose of Style Inspiration ✨",
      content: `Hi {{first_name}},

Welcome to your weekly style inspiration!

This Week's Focus: Transitional Dressing
As we move between seasons, here are some key pieces to help you transition your wardrobe:

🧥 Layering Essentials:
• Lightweight cardigans
• Versatile blazers
• Transitional jackets

👗 Key Pieces:
• Midi dresses that work with tights
• Comfortable knits
• Classic trousers

💡 Style Tip of the Week:
Mix textures to add visual interest to your outfits. Try pairing a chunky knit with smooth leather accessories.

Featured Look:
[Describe this week's featured outfit with styling tips]

Shop the Look:
[Include relevant product links]

Questions? Reply to this email - we love hearing from you!

Best regards,
The Life with Style Team

---
Follow us: Instagram | Facebook | Pinterest
Unsubscribe: [unsubscribe_link]`,
      status: "draft",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
    },
  ])

  const handleSave = () => {
    const updatedContent = {
      ...activeContent,
      updatedAt: new Date().toISOString(),
    }

    if (activeContent.id === "new") {
      const newContent = {
        ...updatedContent,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      setSavedContents([newContent, ...savedContents])
      setActiveContent({
        id: "new",
        title: "",
        subject: "",
        content: "",
        status: "draft",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    } else {
      setSavedContents(savedContents.map((content) => (content.id === activeContent.id ? updatedContent : content)))
    }
  }

  const handleSchedule = () => {
    const scheduledContent = {
      ...activeContent,
      status: "scheduled" as const,
      scheduledDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
      updatedAt: new Date().toISOString(),
    }

    if (activeContent.id === "new") {
      const newContent = {
        ...scheduledContent,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      }
      setSavedContents([newContent, ...savedContents])
    } else {
      setSavedContents(savedContents.map((content) => (content.id === activeContent.id ? scheduledContent : content)))
    }
  }

  const loadContent = (content: NewsletterContent) => {
    setActiveContent(content)
  }

  const insertTemplate = (template: string) => {
    setActiveContent({
      ...activeContent,
      content: activeContent.content + template,
    })
  }

  const templates = [
    {
      name: "Greeting",
      content: "Hi {{first_name}},\n\n",
    },
    {
      name: "Weekly Focus",
      content: "This Week's Focus: [TOPIC]\n\n",
    },
    {
      name: "Style Tip",
      content: "💡 Style Tip of the Week:\n[Insert tip here]\n\n",
    },
    {
      name: "Featured Look",
      content: "Featured Look:\n[Describe outfit and styling tips]\n\n",
    },
    {
      name: "Shop Section",
      content: "Shop the Look:\n[Include product links]\n\n",
    },
    {
      name: "Signature",
      content:
        "Best regards,\nThe Life with Style Team\n\n---\nFollow us: Instagram | Facebook | Pinterest\nUnsubscribe: [unsubscribe_link]",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Newsletter Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    placeholder="Newsletter title..."
                    value={activeContent.title}
                    onChange={(e) => setActiveContent({ ...activeContent, title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email Subject</label>
                  <Input
                    placeholder="Email subject line..."
                    value={activeContent.subject}
                    onChange={(e) => setActiveContent({ ...activeContent, subject: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <div className="border rounded-lg">
                  <div className="border-b p-2 flex gap-2 bg-gray-50">
                    <Button size="sm" variant="outline" onClick={() => insertTemplate("**Bold Text**")}>
                      <Bold className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => insertTemplate("*Italic Text*")}>
                      <Italic className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => insertTemplate("\n• List item\n")}>
                      <List className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => insertTemplate("[Link Text](URL)")}>
                      <Link className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => insertTemplate("![Image Alt](Image URL)")}>
                      <ImageIcon className="w-3 h-3" />
                    </Button>
                  </div>
                  <Textarea
                    placeholder="Write your newsletter content here..."
                    rows={20}
                    value={activeContent.content}
                    onChange={(e) => setActiveContent({ ...activeContent, content: e.target.value })}
                    className="border-0 resize-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSave} variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Save Draft
                </Button>
                <Button onClick={handleSchedule} className="bg-blue-600 hover:bg-blue-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Send className="w-4 h-4 mr-2" />
                  Send Now
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {templates.map((template, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => insertTemplate(template.content)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saved Content */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Saved Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedContents.map((content) => (
                  <div
                    key={content.id}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => loadContent(content)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{content.title || "Untitled"}</h4>
                      <Badge
                        variant="outline"
                        className={
                          content.status === "sent"
                            ? "bg-green-100 text-green-800"
                            : content.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {content.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{content.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Updated {new Date(content.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Subscribers</span>
                  <span className="font-medium">1,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Open Rate</span>
                  <span className="font-medium text-green-600">68.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Avg. Click Rate</span>
                  <span className="font-medium text-blue-600">12.3%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
