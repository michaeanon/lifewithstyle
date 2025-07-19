"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { motion } from "framer-motion"
import { Check, Mail, Lock, User, Eye, EyeOff } from "lucide-react"

export default function JoinUsPage() {
  const [activeTab, setActiveTab] = useState("sign-in")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    newsletter: true,
  })
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, newsletter: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: activeTab === "sign-in" ? "Welcome back!" : "Account created!",
        description:
          activeTab === "sign-in" ? "You have successfully signed in." : "Your account has been created successfully.",
      })

      // Redirect to home page after successful login/signup
      router.push("/")
    }, 1500)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Toaster />
      <div className="pt-24 pb-16">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto lg:mx-0 w-full"
            >
              <div className="text-center lg:text-left mb-8">
                <h1 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Join Our Style Community</h1>
                <p className="text-muted-foreground">
                  Create an account or sign in to access personalized style recommendations, save your favorite outfits,
                  and join our community of fashion enthusiasts.
                </p>
              </div>

              <Tabs defaultValue="sign-in" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                  <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="sign-in">
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome Back</CardTitle>
                      <CardDescription>Sign in to your account to continue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="name@example.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link
                              href="/forgot-password"
                              className="text-xs text-muted-foreground hover:text-foreground"
                            >
                              Forgot password?
                            </Link>
                          </div>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="remember" defaultChecked />
                          <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Remember me
                          </label>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                              Signing in...
                            </div>
                          ) : (
                            "Sign In"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" className="w-full">
                          Google
                        </Button>
                        <Button variant="outline" className="w-full">
                          Facebook
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="sign-up">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create an Account</CardTitle>
                      <CardDescription>Join our community of style enthusiasts</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Doe"
                              className="pl-10"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="signup-email"
                              name="email"
                              type="email"
                              placeholder="name@example.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="signup-password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="signup-password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                              id="confirm-password"
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="pl-10"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="newsletter"
                            checked={formData.newsletter}
                            onCheckedChange={handleCheckboxChange}
                          />
                          <label
                            htmlFor="newsletter"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Subscribe to our newsletter for style tips and updates
                          </label>
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="flex items-center">
                              <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent rounded-full"></div>
                              Creating account...
                            </div>
                          ) : (
                            "Create Account"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="relative w-full">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <Button variant="outline" className="w-full">
                          Google
                        </Button>
                        <Button variant="outline" className="w-full">
                          Facebook
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right side - Image and benefits */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-lg overflow-hidden h-[600px] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1601260320216-08a6c5379426?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Fashion community members at an exclusive event"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-serif text-white mb-4">Member Benefits</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="flex items-start text-white"
                      >
                        <div className="mr-2 mt-1 bg-ilary-button rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

const benefits = [
  "Personalized style recommendations based on your preferences",
  "Save and organize your favorite outfits and collections",
  "Early access to new style guides and seasonal lookbooks",
  "Exclusive member-only discounts with our partner brands",
  "Join our community events and styling workshops",
  "Track your style evolution and wardrobe inventory",
]
