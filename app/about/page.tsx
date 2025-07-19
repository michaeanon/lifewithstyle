"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import FloatingBusinessCard from "@/components/floating-business-card"

export default function AboutPage() {
  return (
    <>
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-ilary-peachLight">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl md:text-5xl font-serif tracking-wide mb-6">Our Story</h1>
                <p className="text-lg mb-6">
                  Life With Style was founded with a simple yet powerful vision: to help people express their unique
                  identity through thoughtful, intentional fashion choices.
                </p>
                <p className="text-lg mb-6">
                  Our founder, Christine Kambu, has always believed that style is more than just following trends—it's
                  about understanding yourself, your lifestyle, and creating a wardrobe that truly reflects who you are.
                </p>
                <Link href="/contact">
                  <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">Get in Touch</Button>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1721190167637-fb49b48c2417?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Founder portrait"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Philosophy Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                At Life With Style, we believe that true style is:
              </p>
            </div>

            <div className="prose max-w-none">
              <ul className="list-disc pl-6 mb-6">
                <li>Personal and authentic to you</li>
                <li>Sustainable and mindful</li>
                <li>Versatile and practical for your lifestyle</li>
                <li>Timeless rather than trend-focused</li>
                <li>An expression of your unique identity</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-16 md:py-24 bg-ilary-peachLight">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Our Approach</h2>
            </div>

            <div className="prose max-w-none">
              <p className="mb-4">
                We take a holistic approach to style, considering not just how clothes look, but how they make you feel,
                how they function in your daily life, and how they align with your values.
              </p>
              <p className="mb-4">
                Through our curated collections, style guides, and personalized recommendations, we aim to simplify the
                process of building a wardrobe that truly works for you.
              </p>
            </div>
          </div>
        </section>

        {/* Meet the Team Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Meet the Team</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our team of style enthusiasts brings diverse expertise and perspectives to help you navigate your
                personal style journey.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border border-ilary-border shadow-sm">
                    <div className="relative aspect-square">
                      <Image
                        src={member.imageSrc || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                      <p className="text-muted-foreground mb-4">{member.role}</p>
                      <p className="text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey Section */}
        <section className="py-16 md:py-24 bg-ilary-peach">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Our Journey</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                From humble beginnings to a thriving style community, our path has been shaped by a passion for helping
                others discover their personal aesthetic.
              </p>
            </div>

            <div className="space-y-12">
              {journeyMilestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } gap-8 items-center`}
                >
                  <div className="md:w-1/2">
                    <div className="relative h-[300px] rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={milestone.imageSrc || "/placeholder.svg"}
                        alt={milestone.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-ilary-peachLight inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-medium mb-4">{milestone.title}</h3>
                    <p className="text-muted-foreground mb-6">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA Section */}
        <section className="py-16 md:py-24 bg-ilary-peach">
          <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">Join Our Style Community</h2>
              <p className="text-lg mb-8">
                Become part of our growing community of style enthusiasts. Get personalized recommendations, exclusive
                content, and connect with like-minded individuals on their own style journeys.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/join-us">
                  <Button size="lg" className="bg-white text-foreground hover:bg-gray-100">
                    Join Us
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Floating Business Card Button */}
      <FloatingBusinessCard />
    </>
  )
}

const journeyMilestones = [
  {
    year: "November 2024",
    title: "The Beginning",
    description:
      "Life With Style launched as a modern fashion platform where Tina shared her styling expertise and curated outfit ideas, quickly gaining a dedicated following of style enthusiasts seeking practical advice.",
    imageSrc: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    year: "Early 2025",
    title: "Expanding the Team",
    description:
      "As our community grew, we welcomed our first team members, each bringing unique expertise in different aspects of fashion and personal styling.",
    imageSrc: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    year: "Mid 2025",
    title: "Launch of Style Guides",
    description:
      "We introduced our comprehensive style guides, offering structured approaches to building versatile wardrobes and developing personal style.",
    imageSrc: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop",
  },
  {
    year: "Late 2025",
    title: "Community Platform",
    description:
      "We launched our interactive platform, allowing members to share their style journeys, get personalized recommendations, and connect with like-minded fashion enthusiasts.",
    imageSrc: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop",
  },
  {
    year: "2026",
    title: "Looking Forward",
    description:
      "As we continue to grow and evolve, we remain focused on our core mission of making personal style accessible and enjoyable for everyone.",
    imageSrc: "https://images.unsplash.com/photo-1490489944761-15a19d654956?q=80&w=2070&auto=format&fit=crop",
  },
]

// Update the teamMembers array with stylish images
const teamMembers = [
  {
    name: "Christine Kambu",
    role: "Founder & Lead Stylist",
    bio: "With over a decade of experience in fashion styling, Tina founded Life With Style to share her passion for helping others discover their unique aesthetic.",
    imageSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
  },
  {
    name: "Marcus Chen",
    role: "Style Consultant",
    bio: "Marcus specializes in menswear and minimalist aesthetics, bringing a fresh perspective to classic styling principles.",
    imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Sophia Williams",
    role: "Content Director",
    bio: "A former fashion editor, Sophia curates our style guides and ensures all content is both inspiring and practical.",
    imageSrc: "https://images.unsplash.com/photo-1580489944762-4301cf35b7e4?q=80&w=1961&auto=format&fit=crop",
  },
  {
    name: "Michael Mshila",
    role: "Website Developer",
    bio: "Michael brings technical expertise and creative vision to our digital presence, crafting seamless user experiences that showcase our fashion content beautifully.",
    imageSrc: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=1964&auto=format&fit=crop",
  },
  {
    name: "James Rodriguez",
    role: "Sustainable Fashion Expert",
    bio: "James advocates for ethical fashion choices and helps our community make more environmentally conscious style decisions.",
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Aisha Patel",
    role: "Personal Shopper",
    bio: "With an eye for finding hidden gems, Aisha helps clients build wardrobes that are both stylish and budget-friendly.",
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
  },
  {
    name: "Leo Kim",
    role: "Trend Analyst",
    bio: "Leo keeps our community informed about emerging trends and how to incorporate them into a timeless wardrobe.",
    imageSrc: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop",
  },
]
