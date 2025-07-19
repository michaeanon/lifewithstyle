"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Mail,
  Sparkles,
  Calendar,
  ShoppingBag,
  Search,
  Building2,
} from "lucide-react"

// Define the component
function Footer() {
  const router = useRouter()

  // Handle navigation with scroll to top
  const handleNavigation = (href: string) => {
    router.push(href)
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
  }

  return (
    <footer className="bg-ilary-peachLight py-8 md:py-12" id="main-footer" data-component="main-footer">
      <style jsx>{`
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(400%); }
  }
  .animate-shimmer {
    animation: shimmer 3s ease-in-out infinite;
  }
`}</style>
      <div className="container">
        <div className="grid gap-6 md:gap-8 lg:grid-cols-6 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col items-start gap-2 mb-6" onClick={() => window.scrollTo(0, 0)}>
              <div className="relative py-4 transition-all duration-300 group">
                {/* Content */}
                <div className="relative z-10">
                  <h2
                    className="text-lg md:text-xl font-serif tracking-wide bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-bold italic mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Life with Style
                  </h2>

                  {/* Animated decorative line */}
                  <div className="relative w-full h-[1px] mb-2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/30 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/80 to-transparent w-8 animate-shimmer"></div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-rose-400 rounded-full opacity-80"></div>
                  </div>

                  <p className="text-xs tracking-[0.2em] text-center w-full bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent font-medium">
                    BY TINA
                  </p>
                </div>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs text-sm">
              Curated fashion inspiration and style guides for the modern fashion enthusiast.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/life_withstyle24?igsh=MWxtMDA2N3l3dWRmdA=="
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://x.com/christinekeymbu?t=nnVVT5oG9YTFa51WUi1A5A&s=08"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61566828433640&mibextid=ZbWKwL"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://youtube.com/@lifewithstyle-u8x?si=wQy_W2R8lhJGhJhJ"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="mailto:lifewithstyleinfo1@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:col-span-3">
            <div>
              <h3 className="font-medium text-base mb-3">Collections</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/featured")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Featured Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/summer")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Summer Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/autumn")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Autumn Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/winter")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Winter Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/spring")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Spring Collection
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-base mb-3">Style Guides</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/capsule-wardrobe")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Capsule Wardrobe
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/color-coordination")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Color Coordination
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/occasion-dressing")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Occasion Dressing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/seasonal-transitions")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Seasonal Transitions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/sustainable-fashion")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Sustainable Fashion
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-base mb-3">Inspiration</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/street-style")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Street Style
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/runway-trends")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Runway Trends
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/celebrity-looks")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Celebrity Looks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/vintage-revival")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Vintage Revival
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/minimalist-aesthetics")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Minimalist Aesthetics
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Featured Services Section */}
          <div className="lg:col-span-1">
            <div className="relative bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 rounded-xl p-5 border border-rose-200/50 dark:border-rose-800/30 shadow-sm h-fit">
              <div className="absolute top-3 right-3 text-rose-300 dark:text-rose-700">
                <Sparkles className="h-4 w-4" />
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-base text-rose-900 dark:text-rose-100 mb-1">Our Services</h3>
                <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
                  Transform your style with personalized fashion services
                </p>
              </div>

              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="flex items-center gap-2 text-rose-800 dark:text-rose-200 hover:text-rose-900 dark:hover:text-rose-100 transition-colors text-left group w-full"
                  >
                    <div className="w-1.5 h-1.5 bg-rose-400 rounded-full group-hover:bg-rose-500 transition-colors"></div>
                    <span className="text-sm font-medium">All Services</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services/personal-styling")}
                    className="flex items-center gap-2 text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 transition-colors text-left group w-full"
                  >
                    <Sparkles className="h-3 w-3 text-rose-400 group-hover:text-rose-500 transition-colors" />
                    <span className="text-xs">Personal Styling</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services/wardrobe-audit")}
                    className="flex items-center gap-2 text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 transition-colors text-left group w-full"
                  >
                    <Search className="h-3 w-3 text-rose-400 group-hover:text-rose-500 transition-colors" />
                    <span className="text-xs">Wardrobe Audit</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services/shopping-assistance")}
                    className="flex items-center gap-2 text-rose-700 dark:text-rose-300 hover:text-rose-900 dark:hover:text-rose-100 transition-colors text-left group w-full"
                  >
                    <ShoppingBag className="h-3 w-3 text-rose-400 group-hover:text-rose-500 transition-colors" />
                    <span className="text-xs">Shopping Assistance</span>
                  </button>
                </li>
              </ul>

              <div className="mt-3 pt-3 border-t border-rose-200/50 dark:border-rose-800/30">
                <button
                  onClick={() => handleNavigation("/services")}
                  className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-800 dark:hover:text-rose-200 transition-colors group"
                >
                  <Calendar className="h-3 w-3" />
                  <span>Book Consultation</span>
                  <div className="w-1 h-1 bg-rose-400 rounded-full group-hover:w-2 transition-all duration-200"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Compact Company Section */}
          <div className="lg:col-span-1">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200/50 dark:border-slate-800/30 h-fit">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100">Company</h3>
              </div>

              <ul className="space-y-2.5">
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left group w-full"
                  >
                    <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:w-1.5 transition-all duration-200"></div>
                    <span className="text-sm">About Us</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left group w-full"
                  >
                    <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:w-1.5 transition-all duration-200"></div>
                    <span className="text-sm">Contact</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/join-us")}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left group w-full"
                  >
                    <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:w-1.5 transition-all duration-200"></div>
                    <span className="text-sm">Join Us</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/privacy")}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left group w-full"
                  >
                    <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:w-1.5 transition-all duration-200"></div>
                    <span className="text-sm">Privacy Policy</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/terms")}
                    className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-left group w-full"
                  >
                    <div className="w-1 h-1 bg-slate-400 rounded-full group-hover:w-1.5 transition-all duration-200"></div>
                    <span className="text-sm">Terms of Service</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Horizontal line separator */}
        <div className="w-full h-px bg-foreground/20 mb-6"></div>

        {/* Bottom footer section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-4">
          <a
            href="https://anonymiketech.wegic.app/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Designed by ANONYMIKE
          </a>
          <p className="text-sm text-foreground/80 my-3 md:my-0">
            &copy; {new Date().getFullYear()} LIFE WITH STYLE. All rights reserved.
          </p>
          <button
            onClick={() => handleNavigation("/privacy")}
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  )
}

// Export as both named and default
export { Footer }
export default Footer
