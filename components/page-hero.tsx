import Image from "next/image"

interface PageHeroProps {
  title: string
  subtitle?: string
  backgroundImage: string
  height?: string
}

export function PageHero({ title, subtitle, backgroundImage, height = "h-[400px]" }: PageHeroProps) {
  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={
            backgroundImage ||
            "https://images.unsplash.com/photo-1614179572870-3761277ae7d0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8T3VyJTIwU2VydmljZXMlMjBmYXNoaW9ufGVufDB8MHwwfHx8MA%3D%3D" ||
            "/placeholder.svg" ||
            "/placeholder.svg"
          }
          alt={title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide text-white mb-3 md:mb-4">
          {title}
        </h1>
        {subtitle && <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl px-4">{subtitle}</p>}
      </div>
    </section>
  )
}
