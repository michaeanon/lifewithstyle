import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { CookieConsent } from "@/components/cookie-consent"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"
import { BackToTop } from "@/components/back-to-top"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export const metadata: Metadata = {
  title: "Life with Style by Tina - Personal Styling & Fashion Advice",
  description:
    "Discover your personal style with curated outfit combinations, expert styling advice, and personalized fashion guidance. Transform your wardrobe with Life with Style by Tina.",
  keywords:
    "personal styling, fashion advice, outfit combinations, wardrobe styling, capsule wardrobe, style consultant, fashion tips, personal shopper",
  authors: [{ name: "Tina", url: "https://lifewithstyle.com" }],
  creator: "Tina - Life with Style",
  publisher: "Life with Style",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lifewithstyle.com",
    title: "Life with Style by Tina - Personal Styling & Fashion Advice",
    description:
      "Discover your personal style with curated outfit combinations, expert styling advice, and personalized fashion guidance.",
    siteName: "Life with Style",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Life with Style by Tina Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Life with Style by Tina - Personal Styling & Fashion Advice",
    description: "Discover your personal style with curated outfit combinations and expert styling advice.",
    images: ["/logo.jpg"],
    creator: "@lifewithstyle",
  },
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "16x16", type: "image/jpeg" },
      { url: "/logo.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "/logo.jpg", sizes: "96x96", type: "image/jpeg" },
    ],
    apple: [{ url: "/logo.jpg", sizes: "180x180", type: "image/jpeg" }],
    shortcut: "/logo.jpg",
  },
  manifest: "/manifest.json",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f43f5e" },
    { media: "(prefers-color-scheme: dark)", color: "#be123c" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpg" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#f43f5e" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ScrollToTopProvider>
            <div className="relative flex min-h-screen flex-col">
              <Navigation />
              <main className="flex-1">{children}</main>
              <Footer />
              <BackToTop />
            </div>
            <Toaster />
            <CookieConsent />
          </ScrollToTopProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
