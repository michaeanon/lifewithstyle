"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Send, Users, Mail, Calendar, BarChart3, Eye, Edit, Trash2, Copy } from "lucide-react"

interface Newsletter {
  id: string
  title: string
  subject: string
  content: string
  status: "draft" | "scheduled" | "sent"
  scheduledDate?: string
  sentDate?: string
  recipients: number
  openRate?: number
  clickRate?: number
}

interface Template {
  id: string
  name: string
  description: string
  content: string
  category: "welcome" | "weekly" | "seasonal" | "promotional"
}

export default function AdminNewsletterPage() {
  const [activeTab, setActiveTab] = useState("create")
  const [newsletters, setNewsletters] = useState<Newsletter[]>([
    {
      id: "1",
      title: "Welcome to Life with Style",
      subject: "Your Style Journey Begins Here! 🌟",
      content: "Welcome to our fashion community...",
      status: "sent",
      sentDate: "2024-01-15",
      recipients: 1250,
      openRate: 68.5,
      clickRate: 12.3,
    },
    {
      id: "2",
      title: "Spring Fashion Trends 2024",
      subject: "🌸 Spring Trends You Need to Know",
      content: "Discover the hottest spring trends...",
      status: "scheduled",
      scheduledDate: "2024-01-20",
      recipients: 1250,
    },
    {
      id: "3",
      title: "Weekly Style Tips #1",
      subject: "Weekly Style Inspiration ✨",
      content: "This week's styling tips...",
      status: "draft",
      recipients: 0,
    },
  ])

  const [templates] = useState<Template[]>([
    {
      id: "1",
      name: "Weekly Newsletter",
      description: "Regular weekly content template",
      category: "weekly",
      content: `Hi {{first_name}},

Welcome to this week's style inspiration!

This week we're focusing on:
• Seasonal color palettes
• Mix and match basics
• Accessory styling tips

Featured Look:
[Insert featured outfit description]

Style Tip of the Week:
[Insert weekly tip]

Best regards,
The Life with Style Team`,
    },
    {
      id: "2",
      name: "Seasonal Collection",
      description: "Template for seasonal launches",
      category: "seasonal",
      content: `Hi {{first_name}},

The new {{season}} collection is here!

Discover our latest pieces designed for the season:
• [Collection highlights]
• [Key pieces]
• [Styling suggestions]

Shop the Collection:
[Insert collection link]

Limited time: Get 15% off with code SEASON15

Best regards,
The Life with Style Team`,
    },
    {
      id: "3",
      name: "Promotional Campaign",
      description: "Template for sales and promotions",
      category: "promotional",
      content: `Hi {{first_name}},

Special offer just for you! 🎉

{{offer_details}}

Use code: {{promo_code}}
Valid until: {{expiry_date}}

Shop Now:
[Insert shop link]

Don't miss out on these amazing deals!

Best regards,
The Life with Style Team`,
    },
  ])

  const [newNewsletter, setNewNewsletter] = useState({
    title: "",
    subject: "",
    content: "",
    scheduledDate: "",
  })

  const handleCreateNewsletter = () => {
    const newsletter: Newsletter = {
      id: Date.now().toString(),
      title: newNewsletter.title,
      subject: newNewsletter.subject,
      content: newNewsletter.content,
      status: newNewsletter.scheduledDate ? "scheduled" : "draft",
      scheduledDate: newNewsletter.scheduledDate || undefined,
      recipients: 0,
    }

    setNewsletters([newsletter, ...newsletters])
    setNewNewsletter({ title: "", subject: "", content: "", scheduledDate: "" })
  }

  const getStatusColor = (status: Newsletter["status"]) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: Template["category"]) => {
    switch (category) {
      case "welcome":
        return "bg-purple-100 text-purple-800"
      case "weekly":
        return "bg-blue-100 text-blue-800"
      case "seasonal":
        return "bg-green-100 text-green-800"
      case "promotional":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Newsletter Management</h1>
              <p className="text-gray-600">Create, manage, and analyze your newsletter campaigns</p>
            </div>
            <Button onClick={() => setActiveTab("create")} className="bg-pink-600 hover:bg-pink-700">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Newsletter
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <PlusCircle className="w-4 h-4" />
              Create
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Manage
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Copy className="w-4 h-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Newsletter</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Newsletter Title</label>
                    <Input
                      placeholder="e.g., Weekly Style Tips #5"
                      value={newNewsletter.title}
                      onChange={(e) => setNewNewsletter({ ...newNewsletter, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Subject</label>
                    <Input
                      placeholder="e.g., This Week's Style Inspiration ✨"
                      value={newNewsletter.subject}
                      onChange={(e) => setNewNewsletter({ ...newNewsletter, subject: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea
                    placeholder="Write your newsletter content here..."
                    rows={12}
                    value={newNewsletter.content}
                    onChange={(e) => setNewNewsletter({ ...newNewsletter, content: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Schedule Date (Optional)</label>
                    <Input
                      type="datetime-local"
                      value={newNewsletter.scheduledDate}
                      onChange={(e) => setNewNewsletter({ ...newNewsletter, scheduledDate: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={handleCreateNewsletter} className="bg-pink-600 hover:bg-pink-700">
                    <Send className="w-4 h-4 mr-2" />
                    {newNewsletter.scheduledDate ? "Schedule Newsletter" : "Save as Draft"}
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Newsletters</p>
                      <p className="text-2xl font-bold">{newsletters.length}</p>
                    </div>
                    <Mail className="w-8 h-8 text-pink-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subscribers</p>
                      <p className="text-2xl font-bold">1,250</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                      <p className="text-2xl font-bold">68.5%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Newsletters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsletters.map((newsletter) => (
                    <div key={newsletter.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium">{newsletter.title}</h3>
                            <Badge className={getStatusColor(newsletter.status)}>{newsletter.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{newsletter.subject}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {newsletter.recipients} recipients
                            </span>
                            {newsletter.sentDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Sent {newsletter.sentDate}
                              </span>
                            )}
                            {newsletter.scheduledDate && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                Scheduled {newsletter.scheduledDate}
                              </span>
                            )}
                            {newsletter.openRate && <span>Open Rate: {newsletter.openRate}%</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Templates</CardTitle>
                <p className="text-sm text-gray-600">Pre-built templates to speed up your newsletter creation</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">{template.name}</h3>
                          <Badge className={getCategoryColor(template.category)}>{template.category}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                        <div className="bg-gray-50 p-3 rounded text-xs font-mono mb-4 max-h-32 overflow-y-auto">
                          {template.content.substring(0, 200)}...
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1 bg-pink-600 hover:bg-pink-700">
                            <Copy className="w-3 h-3 mr-1" />
                            Use Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Sent</p>
                      <p className="text-2xl font-bold">15,750</p>
                    </div>
                    <Send className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Open Rate</p>
                      <p className="text-2xl font-bold">68.5%</p>
                    </div>
                    <Mail className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+5.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Click Rate</p>
                      <p className="text-2xl font-bold">12.3%</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+2.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subscribers</p>
                      <p className="text-2xl font-bold">1,250</p>
                    </div>
                    <Users className="w-8 h-8 text-pink-600" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">+85 new this month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsletters
                    .filter((n) => n.status === "sent")
                    .map((newsletter) => (
                      <div key={newsletter.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">{newsletter.title}</h3>
                          <span className="text-sm text-gray-500">{newsletter.sentDate}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Recipients:</span>
                            <span className="ml-2 font-medium">{newsletter.recipients}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Open Rate:</span>
                            <span className="ml-2 font-medium text-green-600">{newsletter.openRate}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Click Rate:</span>
                            <span className="ml-2 font-medium text-blue-600">{newsletter.clickRate}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
