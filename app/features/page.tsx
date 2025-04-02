import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, CheckCircle, Calendar, MessageSquare, ShoppingBag, Brain, Heart, BookOpen } from "lucide-react"
import Link from "next/link"

export default function FeaturesPage() {
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Get instant, accurate analysis of your hair condition using our advanced AI technology. Upload photos and receive detailed insights about your hair health.",
      icon: <Brain className="h-10 w-10 text-baldr-yellow" />,
      image: "/images/guide/hair-analysis.png",
      link: "/progress",
      linkText: "Try AI Analysis"
    },
    {
      title: "Progress Tracking",
      description: "Track your hair journey with our visual timeline. Upload photos regularly and see your transformation over time with detailed progress metrics.",
      icon: <Camera className="h-10 w-10 text-baldr-yellow" />,
      image: "/images/features/progress-tracking.png",
      link: "/progress",
      linkText: "Start Tracking"
    },
    {
      title: "Psychological Support",
      description: "Access our AI companion 24/7 for emotional support and guidance. Get personalized advice and encouragement throughout your hair care journey.",
      icon: <Heart className="h-10 w-10 text-baldr-yellow" />,
      image: "/images/features/psychological-support.png",
      link: "/chat",
      linkText: "Get Support"
    },
    {
      title: "Product Recommendations",
      description: "Receive personalized product recommendations based on your hair type, condition, and goals. Save time and money by choosing the right products.",
      icon: <ShoppingBag className="h-10 w-10 text-baldr-yellow" />,
      image: "/images/products/product-7.jpg",
      link: "/ask",
      linkText: "Get Recommendations"
    },
    {
      title: "Personalized Guide",
      description: "Get a customized hair care plan including diet recommendations, stress management techniques, and lifestyle tips tailored to your needs.",
      icon: <BookOpen className="h-10 w-10 text-baldr-yellow" />,
      image: "/images/features/personalized-guide.png",
      link: "/guide",
      linkText: "View Your Guide"
    },
    {
      title: "Community Support",
      description: "Join our supportive community of users on similar journeys. Share experiences, tips, and celebrate progress together.",
      icon: <MessageSquare className="h-10 w-10 text-baldr-yellow" />,
      image: "/images/chat/support-illustration.png",
      link: "/community",
      linkText: "Join Community"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-baldr-black to-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Our <span className="text-baldr-yellow">Features</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Explore the comprehensive tools and support systems designed to help you achieve your hair care goals
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card border-baldr-yellow/20 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        {feature.icon}
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-gray-500 mb-4">{feature.description}</p>
                      <Link href={feature.link}>
                        <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                          {feature.linkText}
                        </Button>
                      </Link>
                    </div>
                    <div className="bg-gray-100 aspect-square relative">
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-baldr-black">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Start Your <span className="text-baldr-yellow">Journey</span>?
          </h2>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their hair care routine with BalDr
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
} 