"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ActionButtons } from "@/components/action-buttons"
import { CapsuleGuide } from "@/components/capsule-guide"
import { OutfitCard } from "@/components/outfit-card"
import { ArrowRight, Sparkles } from "lucide-react"
import { SectionLoader } from "@/components/section-loader"
import { CircleLoader } from "@/components/circle-loader"
import { MediaCarousel } from "@/components/media-carousel"
import { WelcomeAnimation } from "@/components/welcome-animation"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(true)
  const guideRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // We'll handle loading state differently with the welcome animation
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  // Media items for the carousel with the new videos and image
  const heroMediaItems = [
    // First video from provided URL
    {
      type: "video",
      src: "https://videocdn.cdnpk.net/videos/07953112-7b6a-589a-baa8-0cedac9d3897/horizontal/previews/clear/large.mp4?token=exp=1746942995~hmac=71e1469423f177dda47d1cc53693c367a99d2cfbe916e8e99d15a9342c8fc19a",
      alt: "Fashion video showcase 1",
      poster: "/images/fashion-poster.png", // Using the uploaded image as poster
    },
    // Second video from provided URL
    {
      type: "video",
      src: "https://videocdn.cdnpk.net/videos/310b3f85-34d8-412c-9971-42af25b51c2c/horizontal/previews/clear/large.mp4?token=exp=1746944020~hmac=171614d4c8396c022479c85531051e9b37d9ac46c924d5a650eb01bd406b5343",
      alt: "Fashion video showcase 2",
      poster: "/images/fashion-poster.png", // Using the uploaded image as poster
    },
    // Third video from provided URL
    {
      type: "video",
      src: "https://videocdn.cdnpk.net/videos/9858ed79-c245-4386-afb5-f48d646d0794/horizontal/previews/clear/large.mp4?token=exp=1746955689~hmac=e5da8fba1e413ed7db0dfa1bd800e8c2b51a099ef8e71a755909817768900c42",
      alt: "Fashion video showcase 3",
      poster: "/images/fashion-poster.png", // Using the uploaded image as poster
    },
    // Uploaded image
    {
      type: "image",
      src: "/images/fashion-poster.png",
      alt: "Woman in denim jacket fashion",
    },
    // Fallback images in case the videos don't work
    {
      type: "image",
      src: "https://img.freepik.com/free-photo/happy-good-looking-black-woman-wearing-grey-leather-coat-posing-beige-background-autumn-winter-fashion-concept_273443-127.jpg?uid=R199621456&ga=GA1.1.1251309074.1742490229&semt=ais_hybrid&w=740",
      alt: "Woman in grey leather coat",
    },
  ]

  // Sample featured outfits data
  const featuredOutfits = [
    {
      title: "Summer Casual Elegance",
      description: "Light fabrics with neutral tones for warm days",
      imageSrc: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1020&auto=format&fit=crop",
      category: "Summer",
      slug: "outfit-1",
    },
    {
      title: "Office Power Look",
      description: "Professional and confident for important meetings",
      imageSrc: "https://images.unsplash.com/photo-1548123378-bde4eca81d2d?q=80&w=987&auto=format&fit=crop",
      category: "Work",
      slug: "outfit-2",
    },
    {
      title: "Weekend Getaway",
      description: "Comfortable yet stylish for travel and exploration",
      imageSrc: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=988&auto=format&fit=crop",
      category: "Casual",
      slug: "outfit-3",
    },
  ]

  if (loading) {
    return <CircleLoader />
  }

  return (
    <>
      {/* Welcome Animation */}
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}

      {/* Hero Section with Media Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <MediaCarousel
          mediaItems={heroMediaItems}
          interval={6000}
          overlay={true}
          overlayOpacity={0.6}
          showControls={false}
        />

        {/* Content Layer */}
        <div className="container relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-30">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide text-white mb-6 drop-shadow-md">
              Don't know what to wear?
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md">
              Discover your personal style with curated outfit combinations and expert styling advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary Button with Enhanced Animation */}
              <div className="relative group">
                {/* Animated background effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

                <Button
                  size="lg"
                  className="relative bg-gradient-to-r from-rose-400 to-orange-300 text-black font-medium 
                  hover:from-orange-300 hover:to-rose-400 transition-all duration-500 border-none 
                  shadow-[0_0_15px_rgba(255,170,150,0.5)] hover:shadow-[0_0_25px_rgba(255,170,150,0.8)] 
                  transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner
                  overflow-hidden group/btn z-10"
                  onClick={() => guideRef.current?.scrollIntoView({ behavior: "smooth" })}
                >
                  {/* Sparkle icon with animation */}
                  <Sparkles className="w-4 h-4 mr-2 opacity-70 group-hover/btn:animate-ping absolute -left-1 top-1/2 -translate-y-1/2" />

                  {/* Button text with shine effect */}
                  <span className="relative inline-block">
                    <span className="relative z-10">Explore Capsule Guide</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30 blur-sm group-hover/btn:animate-shine"></span>
                  </span>

                  {/* Animated particles */}
                  <span className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg opacity-0 group-hover/btn:opacity-100">
                    <span className="absolute w-1 h-1 bg-white rounded-full top-[10%] left-[10%] animate-float1"></span>
                    <span className="absolute w-1 h-1 bg-white rounded-full top-[20%] left-[20%] animate-float2"></span>
                    <span className="absolute w-1 h-1 bg-white rounded-full top-[30%] left-[30%] animate-float3"></span>
                    <span className="absolute w-1 h-1 bg-white rounded-full top-[40%] left-[40%] animate-float4"></span>
                    <span className="absolute w-1 h-1 bg-white rounded-full top-[50%] left-[50%] animate-float5"></span>
                  </span>
                </Button>
              </div>

              {/* Secondary Button with Enhanced Animation */}
              <div className="relative group">
                {/* Animated border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-rose-400 rounded-lg opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                <Link href="/outfit-combinations" className="relative z-10 block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="relative w-full backdrop-blur-sm bg-black/30 border-orange-300/70 text-white 
                    hover:bg-black/50 hover:border-orange-300 transition-all duration-500 
                    shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,170,150,0.4)] 
                    transform hover:-translate-y-1 active:translate-y-0 active:shadow-inner
                    overflow-hidden group/btn"
                  >
                    {/* Button text with reveal animation */}
                    <span className="relative inline-flex overflow-hidden">
                      <span className="relative z-10 group-hover/btn:translate-y-0 translate-y-0 transition-transform duration-500">
                        View Outfit Combinations
                      </span>
                      <span className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center text-orange-300 transform translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500">
                        View Outfit Combinations
                      </span>
                    </span>

                    {/* Animated background ripple */}
                    <span className="absolute inset-0 w-full h-full">
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 rounded-full bg-orange-300/20 group-hover/btn:w-[300%] group-hover/btn:h-[300%] transition-all duration-700"></span>
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Outfits Section with Loader */}
      <SectionLoader className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Featured Outfits</h2>
              <p className="text-muted-foreground max-w-2xl">
                Explore our curated selection of versatile outfits designed to inspire your personal style journey.
              </p>
            </div>
            <Link
              href="/outfits"
              className="mt-4 md:mt-0 inline-flex items-center text-sm font-medium hover:underline underline-offset-4"
            >
              View All Outfits
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredOutfits.map((outfit, i) => (
              <OutfitCard
                key={i}
                title={outfit.title}
                description={outfit.description}
                imageSrc={outfit.imageSrc}
                category={outfit.category}
                slug={outfit.slug}
              />
            ))}
          </div>
        </div>
      </SectionLoader>

      {/* Style Philosophy Section */}
      <section className="py-16 md:py-24 bg-ilary-peachLight">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Our Style Philosophy</h2>
              <p className="text-lg mb-6">
                We believe that style is a form of self-expression that should be accessible to everyone. Our approach
                focuses on versatility, quality, and timeless design rather than fleeting trends.
              </p>
              <p className="text-lg mb-8">
                By building a thoughtful wardrobe of well-chosen pieces, you can create countless outfits that make you
                feel confident and authentic every day.
              </p>
              <Link href="/about">
                <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">Learn More</Button>
              </Link>
            </div>
            <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-lg">
              <Image
                src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1170&auto=format&fit=crop"
                alt="Style philosophy illustration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Style Services Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover how we can help you refine your personal style and build a wardrobe that works for your
              lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-ilary-border shadow-sm">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop"
                  alt="Personal styling session"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Personal Styling</h3>
                <p className="text-muted-foreground mb-4">
                  One-on-one consultations to help you discover your unique style and build a wardrobe that reflects
                  your personality and lifestyle.
                </p>
                <Link href="/services/personal-styling">
                  <Button
                    variant="outline"
                    className="w-full border-ilary-button hover:bg-ilary-peachLight text-foreground"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-ilary-border shadow-sm">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074&auto=format&fit=crop"
                  alt="Wardrobe audit session"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Wardrobe Audit</h3>
                <p className="text-muted-foreground mb-4">
                  A comprehensive review of your current wardrobe to identify gaps, remove items that no longer serve
                  you, and optimize what you already own.
                </p>
                <Link href="/services/wardrobe-audit">
                  <Button
                    variant="outline"
                    className="w-full border-ilary-button hover:bg-ilary-peachLight text-foreground"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-ilary-border shadow-sm">
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=1170&auto=format&fit=crop"
                  alt="Shopping assistance session"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-medium mb-2">Shopping Assistance</h3>
                <p className="text-muted-foreground mb-4">
                  Guided shopping experiences to help you select quality pieces that complement your existing wardrobe
                  and align with your style goals.
                </p>
                <Link href="/services/shopping-assistance">
                  <Button
                    variant="outline"
                    className="w-full border-ilary-button hover:bg-ilary-peachLight text-foreground"
                  >
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-ilary-peachLight">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-4">Client Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from clients who have transformed their style and confidence with our guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-ilary-border shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1061&auto=format&fit=crop"
                      alt="Sarah Johnson portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">Marketing Executive</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The capsule wardrobe guidance completely transformed how I approach getting dressed each morning.
                  I've never felt more confident in my style choices."
                </p>
              </CardContent>
            </Card>

            <Card className="border border-ilary-border shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop"
                      alt="Michael Chen portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Michael Chen</h3>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "I never thought I could care about fashion until I discovered these outfit combinations. Now I
                  actually enjoy putting together looks that feel like me."
                </p>
              </CardContent>
            </Card>

            <Card className="border border-ilary-border shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=988&auto=format&fit=crop"
                      alt="Amara Wilson portrait"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Amara Wilson</h3>
                    <p className="text-sm text-muted-foreground">Small Business Owner</p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "The personal styling session was worth every penny. I now have a wardrobe that works for my busy
                  lifestyle while still feeling polished and put-together."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Action Buttons Section */}
      <ActionButtons guideRef={guideRef} />

      {/* Capsule Guide Section */}
      <section ref={guideRef}>
        <CapsuleGuide />
      </section>
    </>
  )
}
