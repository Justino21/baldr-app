import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

interface PricingCardProps {
  title: string
  price: string
  period?: string
  description: string
  features: string[]
  buttonText: string
  buttonLink: string
  highlighted?: boolean
}

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonLink,
  highlighted = false,
}: PricingCardProps) => {
  return (
    <Card
      className={`border ${
        highlighted
          ? "border-baldr-yellow shadow-lg shadow-baldr-yellow/10 relative overflow-hidden bg-gray-900"
          : "border-gray-800 bg-gray-900"
      }`}
    >
      {highlighted && (
        <div className="absolute top-0 right-0">
          <div className="bg-baldr-yellow text-black text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
        </div>
      )}
      <CardHeader className="pb-0">
        <CardTitle className="text-xl mb-1 text-white font-bold">{title}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">{price}</span>
          {period && <span className="text-sm text-gray-200 ml-1">{period}</span>}
        </div>
        <p className="text-sm text-gray-200 mt-2">{description}</p>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-baldr-yellow mr-2 shrink-0" />
              <span className="text-sm text-gray-200">{feature}</span>
            </li>
          ))}
        </ul>
        <Link href={buttonLink}>
          <Button
            className={`w-full font-semibold ${
              highlighted 
                ? "bg-baldr-yellow text-black hover:bg-baldr-yellow/90" 
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            {buttonText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default PricingCard

