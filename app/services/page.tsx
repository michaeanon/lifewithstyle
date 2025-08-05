import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      title: "Personal Styling",
      description:
        "One-on-one consultations to help you discover your unique style and build a wardrobe that reflects your personality and lifestyle.",
      imageSrc: "https://images.unsplash.com/photo-1601929313684-da2b6db5f277?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      link: "/services/personal-styling",
    },
    {
      title: "Wardrobe Audit",
      description:
        "A comprehensive review of your current wardrobe to identify gaps, remove items that no longer serve you, and optimize what you already own.",
      imageSrc: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074&auto=format&fit=crop",
      link: "/services/wardrobe-audit",
    },
    {
      title: "Shopping Assistance",
      description:
        "Guided shopping experiences to help you select quality pieces that complement your existing wardrobe and align with your style goals.",
      imageSrc: "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?q=80&w=1170&auto=format&fit=crop",
      link: "/services/shopping-assistance",
    },
  ]

  return (
    <>
      <PageHero
        title="Our Services"
        subtitle="Discover how we can help you refine your personal style and build a wardrobe that works for your lifestyle."
        backgroundImage="https://images.unsplash.com/photo-1614179572870-3761277ae7d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8T3VyJTIwU2VydmljZXMlMjBmYXNoaW9ufGVufDB8MHwwfHx8MA%3D%3D"
      />

      <section className="py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6">How We Can Help You</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our services are designed to help you develop a personal style that feels authentic, build a functional
              wardrobe that serves your lifestyle, and gain the confidence to express yourself through your clothing
              choices.
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  <h3 className="text-2xl md:text-3xl font-serif tracking-wide mb-4">{service.title}</h3>
                  <p className="text-lg mb-6">{service.description}</p>
                  <Link href={service.link}>
                    <Button className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg ${index % 2 === 1 ? "md:order-1" : ""}`}
                >
                  <Image
                    src={service.imageSrc || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-ilary-peachLight">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-serif tracking-wide mb-6">Ready to Transform Your Style?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Contact us today to discuss how our services can help you achieve your style goals.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-ilary-button text-foreground hover:bg-ilary-buttonHover">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}
