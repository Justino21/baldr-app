import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  name: string
  image: string
  quote: string
  rating: number
}

const TestimonialCard = ({ name, image, quote, rating }: TestimonialCardProps) => {
  return (
    <Card className="border-baldr-yellow/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 relative w-16 h-16 rounded-full overflow-hidden">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div className="flex mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-gray-500 italic mb-4">"{quote}"</p>
          <h4 className="font-semibold">{name}</h4>
        </div>
      </CardContent>
    </Card>
  )
}

export default TestimonialCard

