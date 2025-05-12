"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Instagram, Twitter, Facebook, Youtube, Mail } from "lucide-react"

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
    <footer className="bg-ilary-peachLight py-8 md:py-12 lg:py-16" id="main-footer" data-component="main-footer">
      <div className="container">
        <div className="grid gap-8 md:gap-12 lg:grid-cols-4 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col items-start gap-2 mb-6" onClick={() => window.scrollTo(0, 0)}>
              <div className="relative">
                <h2 className="text-2xl font-serif tracking-wide text-foreground">LIFE WITH STYLE</h2>
                <div className="w-full h-[1px] bg-foreground/30 my-2"></div>
                <p className="text-xs tracking-widest text-foreground/80 text-center w-full">BY TINA</p>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Curated fashion inspiration and style guides for the modern fashion enthusiast.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.instagram.com/life_withstyle24?igsh=MWxtMDA2N3l3dWRmdA=="
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://x.com/christinekeymbu?t=nnVVT5oG9YTFa51WUi1A5A&s=08"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">X (Twitter)</span>
              </Link>
              <Link
                href="https://facebook.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://youtube.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
              <Link
                href="mailto:kambuchristine@gmail.com"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:col-span-3">
            <div>
              <h3 className="font-medium text-base md:text-lg mb-3 md:mb-4">Collections</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/featured")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Featured
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/summer")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Summer
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/autumn")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Autumn
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/winter")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Winter
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/collections/spring")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Spring
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-base md:text-lg mb-3 md:mb-4">Style Guides</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/capsule-wardrobe")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Capsule Wardrobe
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/color-coordination")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Color Coordination
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/occasion-dressing")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Occasion Dressing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/seasonal-transitions")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Seasonal Transitions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/guides/sustainable-fashion")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Sustainable Fashion
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-base md:text-lg mb-3 md:mb-4">Inspiration</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/street-style")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Street Style
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/runway-trends")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Runway Trends
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/celebrity-looks")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Celebrity Looks
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/vintage-revival")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Vintage Revival
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/inspiration/minimalist-aesthetics")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Minimalist Aesthetics
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-base md:text-lg mb-3 md:mb-4">Company</h3>
              <ul className="space-y-2 md:space-y-3">
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/join-us")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Join Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/privacy")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/terms")}
                    className="text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Horizontal line separator */}
        <div className="w-full h-px bg-foreground/20 mb-8"></div>

        {/* Bottom footer section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-6">
          <a
            href="https://anonymiketech.wegic.app/home"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Designed by ANONYMIKE
          </a>
          <p className="text-sm text-foreground/80 my-4 md:my-0">
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
