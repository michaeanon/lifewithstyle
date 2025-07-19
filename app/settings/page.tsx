"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useIntroLoader } from "@/components/intro-loader-provider"
import { RefreshCw, Volume2, VolumeX } from "lucide-react"

export default function SettingsPage() {
  const { resetIntroExperience } = useIntroLoader()
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const handleResetIntro = () => {
    resetIntroExperience()
    // Show confirmation
    alert("Intro experience has been reset. You'll see the intro animation next time you visit the site.")
  }

  return (
    <div className="container max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-serif mb-8">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how Life With Style looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
              </div>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sound & Media</CardTitle>
            <CardDescription>Control audio and media settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5 flex items-center gap-2">
                <Label htmlFor="audio-enabled">Audio</Label>
                {audioEnabled ? (
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <VolumeX className="h-4 w-4 text-muted-foreground" />
                )}
                <p className="text-sm text-muted-foreground">Enable or disable sound effects</p>
              </div>
              <Switch id="audio-enabled" checked={audioEnabled} onCheckedChange={setAudioEnabled} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive updates about new styles and collections</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
            <CardDescription>Reset or customize your browsing experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Intro Animation</Label>
                <p className="text-sm text-muted-foreground">
                  Reset the welcome animation to see it again on your next visit
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={handleResetIntro} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            Resetting the intro will show the welcome animation the next time you visit the website.
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
