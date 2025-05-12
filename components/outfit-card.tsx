import Image from "next/image"
import Link from "next/link"
import { Card, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface OutfitCardProps {
  title: string
  description: string
  imageSrc: string
  category: string
  slug: string
}

export function OutfitCard({ title, description, imageSrc, category, slug }: OutfitCardProps) {
  return (
    <Card className="overflow-hidden border border-ilary-border shadow-sm group">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Badge className="absolute top-4 left-4 bg-white text-foreground">{category}</Badge>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-4 right-4 rounded-full bg-white/80 hover:bg-white text-foreground"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-base sm:text-lg font-medium text-white mb-1">{title}</h3>
          <p className="text-xs sm:text-sm text-white/80 line-clamp-2">{description}</p>
        </div>
      </div>
      <CardFooter className="p-3 sm:p-4">
        <Link href={`/outfits/${slug}`} className="w-full">
          <Button className="w-full bg-ilary-button text-foreground hover:bg-ilary-buttonHover">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
