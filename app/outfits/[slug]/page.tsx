import { notFound } from "next/navigation"
import OutfitPageClient from "./OutfitPageClient"

// Define the outfit data
const outfitData: Record<string, any> = {
  "summer-breeze": {
    id: "summer-breeze",
    title: "Summer Breeze",
    description: "Light and airy outfit perfect for warm summer days",
    image: "/placeholder.svg?height=600&width=400",
    category: "Summer",
    tags: ["Casual", "Light", "Comfortable"],
    pieces: [
      { name: "Linen Shirt", price: "$45", image: "/placeholder.svg?height=200&width=200" },
      { name: "Cotton Shorts", price: "$35", image: "/placeholder.svg?height=200&width=200" },
      { name: "Canvas Sneakers", price: "$65", image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  "elegant-evening": {
    id: "elegant-evening",
    title: "Elegant Evening",
    description: "Sophisticated look for special occasions",
    image: "/placeholder.svg?height=600&width=400",
    category: "Evening",
    tags: ["Elegant", "Formal", "Sophisticated"],
    pieces: [
      { name: "Silk Dress", price: "$120", image: "/placeholder.svg?height=200&width=200" },
      { name: "Heeled Sandals", price: "$85", image: "/placeholder.svg?height=200&width=200" },
      { name: "Statement Necklace", price: "$45", image: "/placeholder.svg?height=200&width=200" },
    ],
  },
  "casual-chic": {
    id: "casual-chic",
    title: "Casual Chic",
    description: "Effortlessly stylish for everyday wear",
    image: "/placeholder.svg?height=600&width=400",
    category: "Casual",
    tags: ["Chic", "Comfortable", "Versatile"],
    pieces: [
      { name: "Denim Jacket", price: "$75", image: "/placeholder.svg?height=200&width=200" },
      { name: "White Tee", price: "$25", image: "/placeholder.svg?height=200&width=200" },
      { name: "Black Jeans", price: "$55", image: "/placeholder.svg?height=200&width=200" },
    ],
  },
}

// Generate static params for known outfits
export async function generateStaticParams() {
  return Object.keys(outfitData).map((slug) => ({
    slug: slug,
  }))
}

// Add metadata generation
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const outfit = outfitData[params.slug]

  if (!outfit) {
    return {
      title: "Outfit Not Found - Life with Style by Tina",
      description: "The requested outfit could not be found.",
    }
  }

  return {
    title: `${outfit.title} - Life with Style by Tina`,
    description: outfit.description,
  }
}

interface OutfitPageProps {
  params: {
    slug: string
  }
}

export default function OutfitPage({ params }: OutfitPageProps) {
  const outfit = outfitData[params.slug]

  if (!outfit) {
    notFound()
  }

  return <OutfitPageClient params={params} />
}
