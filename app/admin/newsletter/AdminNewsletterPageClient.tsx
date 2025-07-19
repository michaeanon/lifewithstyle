"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NewsletterContentManager from "@/components/newsletter-content-manager"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Users, TrendingUp, FileText, Settings, BarChart3, PlusCircle } from "lucide-react"

export default function AdminNewsletterPageClient() {
  const [activeTab, setActiveTab] = useState("create")

  // Mock data for analytics
  const analytics = {
    totalSubscribers: 1247,
    openRate: 68.5,
    clickRate: 12.3,
    recentGrowth: 8.2,
  }

  const templates = [
    {
      id: "1",
      name: "Weekly Style Tips",
      description: "Regular weekly newsletter with styling advice",
      category: "Weekly",
    },
    {
      id: "2",
      name: "Seasonal Trends",
      description: "Quarterly newsletter about seasonal fashion trends",
      category: "Seasonal",
    },
    {
      id: "3",
      name: "Product Spotlight",
      description: "Monthly newsletter featuring curated products",
      category: "Promotional",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Life with Style Newsletter Management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Last login: Today</p>
              </div>
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl py-8">
          <div className="mb-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.totalSubscribers}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Open Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.openRate}%</p>
                    </div>
                    <Mail className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Click Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{analytics.clickRate}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                      <p className="text-2xl font-bold text-gray-900">+{analytics.recentGrowth}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="create" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create Newsletter
                </TabsTrigger>
                <TabsTrigger value="manage" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Manage
                </TabsTrigger>
                <TabsTrigger value="templates" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Templates
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                <NewsletterContentManager />
              </TabsContent>

              <TabsContent value="manage" className="space-y-6">
                <NewsletterContentManager />
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Newsletter Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {templates.map((template) => (
                        <Card
                          key={template.id}
                          className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                                <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                                <Badge variant="secondary">{template.category}</Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                Preview
                              </Button>
                              <Button size="sm" className="flex-1">
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscriber Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                          <p>Analytics chart would go here</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Engagement Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Open Rate</span>
                          <span className="text-sm text-gray-600">{analytics.openRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${analytics.openRate}%` }}
                          ></div>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Click Rate</span>
                          <span className="text-sm text-gray-600">{analytics.clickRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${analytics.clickRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <p>&copy; 2024 Life with Style. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="/privacy" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-gray-700">
                Terms of Service
              </a>
              <a href="/contact" className="hover:text-gray-700">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
