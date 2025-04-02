import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  step: number
}

const FeatureCard = ({ icon, title, description, step }: FeatureCardProps) => {
  return (
    <Card className="feature-card border-baldr-yellow/20">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 relative">
            <div className="absolute -top-2 -right-2 bg-baldr-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">
              {step}
            </div>
            <div className="bg-gray-900 p-4 rounded-full">{icon}</div>
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default FeatureCard

