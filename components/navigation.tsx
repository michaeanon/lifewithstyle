"use client"

import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

// Define these variables before they are used in the component
const styleGuides = [
  {
    title: "Capsule Wardrobe",
    href: "/guides/capsule-wardrobe",
    description: "Build a versatile wardrobe with fewer, high-quality pieces",
  },
  {
    title: "Color Coordination",
    href: "/guides/color-coordination",
    description: "Master the art of combining colors for harmonious outfits",
  },
  {
    title: "Occasion Dressing",
    href: "/guides/occasion-dressing",
    description: "Style guides for different events and occasions",
  },
  {
    title: "Seasonal Transitions",
    href: "/guides/seasonal-transitions",
    description: "How to adapt your wardrobe between seasons",
  },
  {
    title: "Body Types",
    href: "/guides/body-types",
    description: "Find styles that complement your unique body shape",
  },
  {
    title: "Sustainable Fashion",
    href: "/guides/sustainable-fashion",
    description: "Ethical and eco-friendly fashion choices",
  },
]

const inspirationItems = [
  {
    title: "Street Style",
    href: "/inspiration/street-style",
    description: "Real-world fashion inspiration from global street style",
  },
  {
    title: "Runway Trends",
    href: "/inspiration/runway-trends",
    description: "Adaptable looks inspired by high fashion runways",
  },
  {
    title: "Celebrity Looks",
    href: "/inspiration/celebrity-looks",
    description: "Get inspired by celebrity style and fashion choices",
  },
  {
    title: "Vintage Revival",
    href: "/inspiration/vintage-revival",
    description: "Classic styles reimagined for the modern wardrobe",
  },
  {
    title: "Minimalist Aesthetics",
    href: "/inspiration/minimalist-aesthetics",
    description: "Clean, simple, and elegant minimalist style inspiration",
  },
  {
    title: "Bold Expressions",
    href: "/inspiration/bold-expressions",
    description: "Statement pieces and expressive style combinations",
  },
]

const collectionsItems = [
  {
    title: "Featured Collection",
    href: "/collections/featured",
    description: "Explore our latest curated collection of seasonal styles and timeless pieces",
  },
  {
    title: "Summer",
    href: "/collections/summer",
    description: "Light, breathable styles for warm days",
  },
  {
    title: "Autumn",
    href: "/collections/autumn",
    description: "Layered looks for the transitional season",
  },
  {
    title: "Winter",
    href: "/collections/winter",
    description: "Cozy and elegant cold weather ensembles",
  },
  {
    title: "Spring",
    href: "/collections/spring",
    description: "Fresh and vibrant styles for the new season",
  },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()

  // Track scroll position for navigation appearance
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Determine if scrolling up or down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide navbar
        setIsVisible(false)
      } else {
        // Scrolling up or at top - show navbar
        setIsVisible(true)
      }

      setLastScrollY(currentScrollY)
      setIsScrolled(currentScrollY > 10)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  // Handle navigation with scroll to top
  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        isScrolled
          ? "bg-black/40 backdrop-blur-md shadow-lg py-3"
          : "bg-gradient-to-b from-black/50 to-transparent py-5",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start" onClick={() => window.scrollTo(0, 0)}>
          <div className="relative">
            <h1
              className={cn(
                "text-2xl md:text-3xl font-serif tracking-wide transition-colors duration-300",
                "text-white font-semibold",
              )}
              style={{
                textShadow: "0 0 10px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)",
              }}
            >
              LIFE WITH STYLE
            </h1>
            <div className={cn("w-full h-[1px] my-2 transition-colors duration-300", "bg-ilary-peach/70")}></div>
            <p
              className={cn(
                "text-xs tracking-widest text-center w-full transition-colors duration-300",
                "text-white font-medium",
              )}
              style={{
                textShadow: "0 0 10px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.3)",
              }}
            >
              BY TINA
            </p>
          </div>
        </Link>

        {/* Desktop Navigation - Simplified to match mockup */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center space-x-2">
            {/* Apply animations to each navigation item */}
            {["Collections", "Style Guides", "Inspiration"].map((item, index) => (
              <NavigationMenu key={item}>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-base font-medium transition-all duration-300",
                        "hover:text-ilary-peach relative overflow-hidden group",
                        "text-white font-semibold",
                        "navigation-menu-trigger",
                        "bg-transparent hover:bg-black/20 rounded-md",
                      )}
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fadeSlideIn 0.5s ease forwards",
                        textShadow: "0 0 10px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.3)",
                      }}
                    >
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ilary-peach transition-all duration-300 group-hover:w-full"></span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="navigation-menu-content">
                      {item === "Collections" ? (
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-black/80 backdrop-blur-md rounded-md border border-ilary-peach/20">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ilary-peachLight to-ilary-peach p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                                href="/collections/featured"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="absolute inset-0 opacity-20">
                                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1743708825952-eb9211e1765c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
                                </div>
                                <div className="relative z-10">
                                  <div className="mb-2 mt-4 text-lg font-medium">Featured Collection</div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Explore our latest curated collection of seasonal styles and timeless pieces
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/collections/summer"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="text-sm font-medium leading-none">Summer</div>
                                <p className="line-clamp-2 text-sm leading-snug text-white/70">
                                  Light, breathable styles for warm days
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/collections/autumn"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="text-sm font-medium leading-none">Autumn</div>
                                <p className="line-clamp-2 text-sm leading-snug text-white/70">
                                  Layered looks for the transitional season
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/collections/winter"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="text-sm font-medium leading-none">Winter</div>
                                <p className="line-clamp-2 text-sm leading-snug text-white/70">
                                  Cozy and elegant cold weather ensembles
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <a
                                href="/collections/spring"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="text-sm font-medium leading-none">Spring</div>
                                <p className="line-clamp-2 text-sm leading-snug text-white/70">
                                  Fresh and vibrant styles for the new season
                                </p>
                              </a>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      ) : item === "Style Guides" ? (
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-black/80 backdrop-blur-md rounded-md border border-ilary-peach/20">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ilary-peachLight to-ilary-peach p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                                href="/guides/capsule-wardrobe"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="absolute inset-0 opacity-20">
                                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1662098702119-33b73cb13484?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
                                </div>
                                <div className="relative z-10">
                                  <div className="mb-2 mt-4 text-lg font-medium">Capsule Wardrobe</div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Build a versatile wardrobe with fewer, high-quality pieces
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          {styleGuides.slice(1, 5).map((guide) => (
                            <li key={guide.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={guide.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                                  onClick={() => window.scrollTo(0, 0)}
                                >
                                  <div className="text-sm font-medium leading-none">{guide.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-white/70">{guide.description}</p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-black/80 backdrop-blur-md rounded-md border border-ilary-peach/20">
                          <li className="row-span-3">
                            <NavigationMenuLink asChild>
                              <a
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ilary-peachLight to-ilary-peach p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                                href="/inspiration/street-style"
                                onClick={() => window.scrollTo(0, 0)}
                              >
                                <div className="absolute inset-0 opacity-20">
                                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center"></div>
                                </div>
                                <div className="relative z-10">
                                  <div className="mb-2 mt-4 text-lg font-medium">Street Style</div>
                                  <p className="text-sm leading-tight text-muted-foreground">
                                    Real-world fashion inspiration from global street style
                                  </p>
                                </div>
                              </a>
                            </NavigationMenuLink>
                          </li>
                          {inspirationItems.slice(1, 5).map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink asChild>
                                <a
                                  href={item.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                                  onClick={() => window.scrollTo(0, 0)}
                                >
                                  <div className="text-sm font-medium leading-none">{item.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-white/70">{item.description}</p>
                                </a>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ))}

            {/* About and Contact links with animations */}
            <Link
              href="/about"
              className={cn(
                "text-base font-medium px-4 py-2 transition-all duration-300 relative overflow-hidden group",
                "hover:text-ilary-peach",
                "text-white font-semibold",
                "hover:bg-black/20 rounded-md",
              )}
              style={{
                animationDelay: "300ms",
                animation: "fadeSlideIn 0.5s ease forwards",
                textShadow: "0 0 10px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.3)",
              }}
              onClick={() => window.scrollTo(0, 0)}
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ilary-peach transition-all duration-300 group-hover:w-full"></span>
            </Link>

            <Link
              href="/contact"
              className={cn(
                "text-base font-medium px-4 py-2 transition-all duration-300 relative overflow-hidden group",
                "hover:text-ilary-peach",
                "text-white font-semibold",
                "hover:bg-black/20 rounded-md",
              )}
              style={{
                animationDelay: "400ms",
                animation: "fadeSlideIn 0.5s ease forwards",
                textShadow: "0 0 10px rgba(0,0,0,0.5), 0 0 5px rgba(0,0,0,0.3)",
              }}
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ilary-peach transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* JOIN US button with animation */}
          <Link href="/join-us" onClick={() => window.scrollTo(0, 0)}>
            <Button
              className={cn(
                "bg-ilary-peach text-white hover:bg-ilary-buttonHover transition-all duration-300",
                "hover:scale-105 shadow-md hover:shadow-lg",
                "border border-ilary-peach/50",
              )}
              style={{
                animationDelay: "500ms",
                animation: "fadeSlideIn 0.5s ease forwards",
                textShadow: "0 0 5px rgba(0,0,0,0.3)",
              }}
            >
              JOIN US
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] p-0 bg-black/90 backdrop-blur-md border-l border-ilary-peach/20"
          >
            <MobileNav onClose={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

function DesktopNav({ isScrolled }: { isScrolled: boolean }) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn("text-base font-medium transition-colors duration-300 hover:text-primary", "text-white")}
          >
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent className="animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-black/80 backdrop-blur-md border border-ilary-peach/20 rounded-md">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ilary-peachLight to-ilary-peach p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                    href="/collections/featured"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1743708825952-eb9211e1765c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="mb-2 mt-4 text-lg font-medium">Featured Collection</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Explore our latest curated collection of seasonal styles and timeless pieces
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/collections/summer"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="text-sm font-medium leading-none">Summer</div>
                    <p className="line-clamp-2 text-sm leading-snug text-white/70">
                      Light, breathable styles for warm days
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/collections/autumn"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="text-sm font-medium leading-none">Autumn</div>
                    <p className="line-clamp-2 text-sm leading-snug text-white/70">
                      Layered looks for the transitional season
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/collections/winter"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="text-sm font-medium leading-none">Winter</div>
                    <p className="line-clamp-2 text-sm leading-snug text-white/70">
                      Cozy and elegant cold weather ensembles
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/collections/spring"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="text-sm font-medium leading-none">Spring</div>
                    <p className="line-clamp-2 text-sm leading-snug text-white/70">
                      Fresh and vibrant styles for the new season
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn("text-base font-medium transition-colors duration-300 hover:text-primary", "text-white")}
          >
            Style Guides
          </NavigationMenuTrigger>
          <NavigationMenuContent className="animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-black/80 backdrop-blur-md border border-ilary-peach/20 rounded-md">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ilary-peachLight to-ilary-peach p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                    href="/guides/capsule-wardrobe"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1662098702119-33b73cb13484?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D')] bg-cover bg-center"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="mb-2 mt-4 text-lg font-medium">Capsule Wardrobe</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Build a versatile wardrobe with fewer, high-quality pieces
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              {styleGuides.slice(1, 5).map((guide) => (
                <li key={guide.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={guide.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <div className="text-sm font-medium leading-none">{guide.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-white/70">{guide.description}</p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn("text-base font-medium transition-colors duration-300 hover:text-primary", "text-white")}
          >
            Inspiration
          </NavigationMenuTrigger>
          <NavigationMenuContent className="animate-in fade-in-50 slide-in-from-top-5 duration-300 bg-black/80 backdrop-blur-md border border-ilary-peach/20 rounded-md">
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-ilary-peachLight to-ilary-peach p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg relative overflow-hidden"
                    href="/inspiration/street-style"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop')] bg-cover bg-center"></div>
                    </div>
                    <div className="relative z-10">
                      <div className="mb-2 mt-4 text-lg font-medium">Street Style</div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Real-world fashion inspiration from global street style
                      </p>
                    </div>
                  </a>
                </NavigationMenuLink>
              </li>
              {inspirationItems.slice(1, 5).map((item) => (
                <li key={item.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-300 hover:bg-white/10 hover:text-white focus:bg-accent focus:text-accent-foreground hover:shadow-sm text-white/90"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <div className="text-sm font-medium leading-none">{item.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-white/70">{item.description}</p>
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/about" legacyBehavior passHref>
            <NavigationMenuLink
              className={cn(
                navigationMenuTriggerStyle(),
                "text-base font-medium transition-colors duration-300 hover:text-primary",
                "text-white",
              )}
              onClick={() => window.scrollTo(0, 0)}
            >
              About
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// Update the MobileNav component to add animations
function MobileNav({ onClose }: { onClose: () => void }) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  // Handle navigation with scroll to top
  const handleNavigation = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-black/90 py-4 text-white">
      <div className="flex items-center justify-between px-4 pb-4 border-b border-ilary-peach/20">
        <div className="flex flex-col items-start">
          <h1 className="text-xl font-serif tracking-wide text-white">LIFE WITH STYLE</h1>
          <div className="w-full h-[1px] bg-ilary-peach/50 my-2"></div>
          <p className="text-xs tracking-widest text-center w-full text-white/80">BY TINA</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="transition-all duration-300 hover:rotate-90 text-white hover:bg-white/10"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <div className="flex-1 px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Collections */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <button
            className="flex w-full items-center justify-between text-lg font-medium transition-colors duration-300 hover:text-ilary-peach"
            onClick={() => toggleMenu("collections")}
          >
            Collections
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", openMenus.collections ? "rotate-180" : "")}
            />
          </button>
          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all duration-300",
              openMenus.collections ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {["Featured Collection", "Summer", "Autumn", "Winter", "Spring"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: openMenus.collections ? 1 : 0, x: openMenus.collections ? 0 : -5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleNavigation(`/collections/${item.toLowerCase().replace(" ", "-")}`)}
                  className="block py-3 transition-colors duration-300 hover:text-ilary-peach w-full text-left text-white/80 hover:text-white"
                >
                  {item}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Style Guides */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <button
            className="flex w-full items-center justify-between text-lg font-medium transition-colors duration-300 hover:text-ilary-peach"
            onClick={() => toggleMenu("guides")}
          >
            Style Guides
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", openMenus.guides ? "rotate-180" : "")}
            />
          </button>
          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all duration-300",
              openMenus.guides ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {styleGuides.map((guide, index) => (
              <motion.div
                key={guide.title}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: openMenus.guides ? 1 : 0, x: openMenus.guides ? 0 : -5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleNavigation(guide.href)}
                  className="block py-3 transition-colors duration-300 hover:text-ilary-peach w-full text-left text-white/80 hover:text-white"
                >
                  {guide.title}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Inspiration */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <button
            className="flex w-full items-center justify-between text-lg font-medium transition-colors duration-300 hover:text-ilary-peach"
            onClick={() => toggleMenu("inspiration")}
          >
            Inspiration
            <ChevronDown
              className={cn("h-4 w-4 transition-transform duration-300", openMenus.inspiration ? "rotate-180" : "")}
            />
          </button>
          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all duration-300",
              openMenus.inspiration ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {inspirationItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: openMenus.inspiration ? 1 : 0, x: openMenus.inspiration ? 0 : -5 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() => handleNavigation(item.href)}
                  className="block py-3 transition-colors duration-300 hover:text-ilary-peach w-full text-left text-white/80 hover:text-white"
                >
                  {item.title}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <button
            onClick={() => handleNavigation("/about")}
            className="block text-lg font-medium py-3 transition-colors duration-300 hover:text-ilary-peach w-full text-left"
          >
            About
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <button
            onClick={() => handleNavigation("/contact")}
            className="block text-lg font-medium py-3 transition-colors duration-300 hover:text-ilary-peach w-full text-left"
          >
            Contact
          </button>
        </motion.div>
      </div>

      {/* JOIN US button with animation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
        className="px-4 py-6 border-t border-ilary-peach/20"
      >
        <button
          onClick={() => handleNavigation("/join-us")}
          className="w-full transition-all duration-300 hover:shadow-md bg-ilary-peach text-white hover:bg-ilary-buttonHover py-2 px-4 rounded-md font-medium"
        >
          JOIN US
        </button>
      </motion.div>
    </div>
  )
}

// Update the ListItem component to include better hover animations
const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "dropdown-item block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none",
              className,
            )}
            {...props}
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export { Navigation }
