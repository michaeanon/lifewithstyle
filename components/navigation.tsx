"use client"
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
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, ChevronDown } from "lucide-react"

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

function Navigation() {
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
          ? "bg-gradient-to-r from-purple-900/90 via-pink-900/90 to-indigo-900/90 backdrop-blur-md shadow-lg py-3"
          : "bg-gradient-to-b from-black/50 to-transparent py-5",
        isVisible ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex flex-col items-start" onClick={() => window.scrollTo(0, 0)}>
          <div className="relative group">
            <div className="relative z-10">
              <h1
                className={cn(
                  "text-xl md:text-2xl font-serif tracking-wide transition-colors duration-300",
                  "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-bold italic",
                )}
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Life with Style
              </h1>
              <div className="relative w-full h-[1px] my-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent w-8 animate-color-flow"></div>
              </div>
              <p
                className={cn(
                  "text-xs tracking-[0.2em] text-center w-full transition-colors duration-300",
                  "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-medium",
                )}
              >
                BY TINA
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center space-x-2">
            {/* Collections Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-base font-medium transition-all duration-300",
                      "hover:text-pink-300 relative overflow-hidden group",
                      "text-white font-semibold",
                      "bg-transparent hover:bg-pink-500/20 rounded-md px-3 py-2",
                    )}
                  >
                    Collections
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-purple-900/95 backdrop-blur-md rounded-md border border-pink-400/20">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-pink-500/20 to-purple-500/20 p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg"
                            href="/collections/featured"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Featured Collection</div>
                            <p className="text-sm leading-tight text-white/70">
                              Explore our latest curated collection of seasonal styles and timeless pieces
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {collectionsItems.slice(1).map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white text-white/90"
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
              </NavigationMenuList>
            </NavigationMenu>

            {/* Style Guides Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-base font-medium transition-all duration-300",
                      "hover:text-purple-300 relative overflow-hidden group",
                      "text-white font-semibold",
                      "bg-transparent hover:bg-purple-500/20 rounded-md px-3 py-2",
                    )}
                  >
                    Style Guides
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-indigo-900/95 backdrop-blur-md rounded-md border border-purple-400/20">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500/20 to-indigo-500/20 p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg"
                            href="/guides/capsule-wardrobe"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Capsule Wardrobe</div>
                            <p className="text-sm leading-tight text-white/70">
                              Build a versatile wardrobe with fewer, high-quality pieces
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {styleGuides.slice(1, 5).map((guide) => (
                        <li key={guide.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={guide.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white text-white/90"
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
              </NavigationMenuList>
            </NavigationMenu>

            {/* Inspiration Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-base font-medium transition-all duration-300",
                      "hover:text-indigo-300 relative overflow-hidden group",
                      "text-white font-semibold",
                      "bg-transparent hover:bg-indigo-500/20 rounded-md px-3 py-2",
                    )}
                  >
                    Inspiration
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 bg-pink-900/95 backdrop-blur-md rounded-md border border-indigo-400/20">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500/20 to-pink-500/20 p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg"
                            href="/inspiration/street-style"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">Street Style</div>
                            <p className="text-sm leading-tight text-white/70">
                              Real-world fashion inspiration from global street style
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {inspirationItems.slice(1, 5).map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white text-white/90"
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
              </NavigationMenuList>
            </NavigationMenu>

            {/* Services Menu */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      "text-base font-medium transition-all duration-300",
                      "hover:text-yellow-300 relative overflow-hidden group",
                      "text-white font-semibold",
                      "bg-transparent hover:bg-yellow-500/20 rounded-md px-3 py-2",
                    )}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-1 bg-orange-900/95 backdrop-blur-md rounded-md border border-yellow-400/20">
                      <li className="row-span-1">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-yellow-500/20 to-orange-500/20 p-6 no-underline outline-none focus:shadow-md transition-all duration-300 hover:shadow-lg"
                            href="/services"
                            onClick={() => window.scrollTo(0, 0)}
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">All Services</div>
                            <p className="text-sm leading-tight text-white/70">
                              Explore our complete range of styling services
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      {[
                        {
                          title: "Personal Styling",
                          href: "/services/personal-styling",
                          description: "One-on-one consultations to discover your unique style",
                        },
                        {
                          title: "Wardrobe Audit",
                          href: "/services/wardrobe-audit",
                          description: "Comprehensive review and optimization of your wardrobe",
                        },
                        {
                          title: "Shopping Assistance",
                          href: "/services/shopping-assistance",
                          description: "Guided shopping experiences for quality pieces",
                        },
                      ].map((service) => (
                        <li key={service.title}>
                          <NavigationMenuLink asChild>
                            <a
                              href={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white text-white/90"
                              onClick={() => window.scrollTo(0, 0)}
                            >
                              <div className="text-sm font-medium leading-none">{service.title}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-white/70">{service.description}</p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* About and Contact links */}
            <Link
              href="/about"
              className={cn(
                "text-base font-medium px-4 py-2 transition-all duration-300 relative overflow-hidden group",
                "hover:text-pink-300",
                "text-white font-semibold",
                "hover:bg-pink-500/20 rounded-md",
              )}
              onClick={() => window.scrollTo(0, 0)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={cn(
                "text-base font-medium px-4 py-2 transition-all duration-300 relative overflow-hidden group",
                "hover:text-purple-300",
                "text-white font-semibold",
                "hover:bg-purple-500/20 rounded-md",
              )}
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact
            </Link>
          </div>

          {/* SHOP button */}
          <Link href="/shop/featured-collection" onClick={() => window.scrollTo(0, 0)}>
            <Button
              className={cn(
                "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all duration-300",
                "hover:scale-105 shadow-md hover:shadow-lg",
                "border border-pink-400/50 hover:border-pink-300/70",
                "px-6 py-2 rounded-lg font-semibold",
              )}
            >
              SHOP
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden relative overflow-hidden group",
                "hover:bg-pink-500/20 transition-all duration-300",
                "border border-pink-400/30 hover:border-pink-300/60",
                "backdrop-blur-sm rounded-lg",
                "hover:scale-105 active:scale-95",
                "shadow-lg hover:shadow-xl",
                isMobileMenuOpen && "bg-pink-500/20 border-pink-300/60 scale-105",
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X
                  className={cn(
                    "h-6 w-6 text-white transition-all duration-300",
                    "group-hover:text-pink-300 group-hover:scale-110",
                  )}
                />
              ) : (
                <Menu
                  className={cn(
                    "h-6 w-6 text-white transition-all duration-300",
                    "group-hover:text-pink-300 group-hover:scale-110",
                  )}
                />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] sm:w-[400px] p-0 bg-gradient-to-b from-purple-900/95 via-pink-900/95 to-indigo-900/95 backdrop-blur-md border-l border-pink-400/20"
          >
            <MobileNav onClose={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

// Mobile Navigation Component
function MobileNav({ onClose }: { onClose: () => void }) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})
  const router = useRouter()

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }))
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose()
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-gradient-to-b from-purple-900/95 via-pink-900/95 to-indigo-900/95 backdrop-blur-md py-4 text-white">
      <div className="flex items-center justify-between px-4 pb-4 border-b border-pink-400/20">
        <div className="flex flex-col items-start">
          <h1
            className="text-xl font-serif tracking-wide bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent font-bold italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Life with Style
          </h1>
          <div className="relative w-full h-[1px] mb-2 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-400 to-transparent w-8 animate-color-flow"></div>
          </div>
          <p className="text-xs tracking-[0.2em] text-center w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent font-medium">
            BY TINA
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-pink-500/20">
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4">
        {/* Collections */}
        <div className="relative">
          <button
            className={cn(
              "flex w-full items-center justify-between text-lg font-medium transition-all duration-300",
              "hover:text-pink-300 relative overflow-hidden group",
              "py-3 px-4 rounded-lg hover:bg-pink-500/10",
            )}
            onClick={() => toggleMenu("collections")}
          >
            <span>Collections</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openMenus.collections ? "rotate-180" : "")} />
          </button>

          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all",
              openMenus.collections ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {collectionsItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "block py-2 px-3 rounded-md transition-all duration-300 w-full text-left",
                  "hover:bg-white/10 hover:text-white text-white/80",
                )}
              >
                <div className="text-sm font-medium">{item.title}</div>
                <p className="text-xs text-white/60 mt-1">{item.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Style Guides */}
        <div className="relative">
          <button
            className={cn(
              "flex w-full items-center justify-between text-lg font-medium transition-all duration-300",
              "hover:text-purple-300 relative overflow-hidden group",
              "py-3 px-4 rounded-lg hover:bg-purple-500/10",
            )}
            onClick={() => toggleMenu("guides")}
          >
            <span>Style Guides</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openMenus.guides ? "rotate-180" : "")} />
          </button>

          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all",
              openMenus.guides ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {styleGuides.map((guide) => (
              <button
                key={guide.title}
                onClick={() => handleNavigation(guide.href)}
                className={cn(
                  "block py-2 px-3 rounded-md transition-all duration-300 w-full text-left",
                  "hover:bg-white/10 hover:text-white text-white/80",
                )}
              >
                <div className="text-sm font-medium">{guide.title}</div>
                <p className="text-xs text-white/60 mt-1">{guide.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Inspiration */}
        <div className="relative">
          <button
            className={cn(
              "flex w-full items-center justify-between text-lg font-medium transition-all duration-300",
              "hover:text-indigo-300 relative overflow-hidden group",
              "py-3 px-4 rounded-lg hover:bg-indigo-500/10",
            )}
            onClick={() => toggleMenu("inspiration")}
          >
            <span>Inspiration</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openMenus.inspiration ? "rotate-180" : "")} />
          </button>

          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all",
              openMenus.inspiration ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {inspirationItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "block py-2 px-3 rounded-md transition-all duration-300 w-full text-left",
                  "hover:bg-white/10 hover:text-white text-white/80",
                )}
              >
                <div className="text-sm font-medium">{item.title}</div>
                <p className="text-xs text-white/60 mt-1">{item.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="relative">
          <button
            className={cn(
              "flex w-full items-center justify-between text-lg font-medium transition-all duration-300",
              "hover:text-yellow-300 relative overflow-hidden group",
              "py-3 px-4 rounded-lg hover:bg-yellow-500/10",
            )}
            onClick={() => toggleMenu("services")}
          >
            <span>Services</span>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openMenus.services ? "rotate-180" : "")} />
          </button>

          <div
            className={cn(
              "mt-3 ml-4 space-y-3 overflow-hidden transition-all",
              openMenus.services ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
            )}
          >
            {[
              {
                title: "All Services",
                href: "/services",
                description: "Explore our complete range of styling services",
              },
              {
                title: "Personal Styling",
                href: "/services/personal-styling",
                description: "One-on-one consultations to discover your unique style",
              },
              {
                title: "Wardrobe Audit",
                href: "/services/wardrobe-audit",
                description: "Comprehensive review and optimization of your wardrobe",
              },
              {
                title: "Shopping Assistance",
                href: "/services/shopping-assistance",
                description: "Guided shopping experiences for quality pieces",
              },
            ].map((service) => (
              <button
                key={service.title}
                onClick={() => handleNavigation(service.href)}
                className={cn(
                  "block py-2 px-3 rounded-md transition-all duration-300 w-full text-left",
                  "hover:bg-white/10 hover:text-white text-white/80",
                )}
              >
                <div className="text-sm font-medium">{service.title}</div>
                <p className="text-xs text-white/60 mt-1">{service.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Direct Links */}
        <div className="space-y-2 pt-4 border-t border-pink-400/20">
          <button
            onClick={() => handleNavigation("/about")}
            className={cn(
              "block w-full text-left py-3 px-4 text-lg font-medium transition-all duration-300",
              "hover:text-pink-300 hover:bg-pink-500/10 rounded-lg",
            )}
          >
            About
          </button>
          <button
            onClick={() => handleNavigation("/contact")}
            className={cn(
              "block w-full text-left py-3 px-4 text-lg font-medium transition-all duration-300",
              "hover:text-purple-300 hover:bg-purple-500/10 rounded-lg",
            )}
          >
            Contact
          </button>
        </div>

        {/* Shop Button */}
        <div className="pt-6">
          <Button
            onClick={() => handleNavigation("/shop/featured-collection")}
            className={cn(
              "w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white hover:from-pink-400 hover:via-purple-400 hover:to-indigo-400 transition-all duration-300",
              "hover:scale-105 shadow-md hover:shadow-lg",
              "border border-pink-400/50 hover:border-pink-300/70",
              "py-3 rounded-lg font-semibold text-lg",
            )}
          >
            SHOP
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Navigation
export { Navigation }
