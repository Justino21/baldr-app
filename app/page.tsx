import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Camera, MessageSquare, ShoppingBag, Calendar, Mail, Phone } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import PricingCard from "@/components/pricing-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/hero-background.png"
            alt="Hair care"
            width={1920}
            height={1080}
            className="object-cover w-full h-full opacity-40"
            priority
          />
        </div>
        <div className="container relative z-10 text-center px-4">
          <div className="flex justify-center mb-6 animate-float">
            <Image src="/logo.png" alt="BalDr Logo" width={120} height={120} />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your <span className="text-baldr-yellow">AI-Powered</span> Hair Care Journey
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            BalDr offers a holistic, budget-friendly hair care solution powered by AI. Get personalized recommendations
            and instant support 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                Start Your Journey
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="border-baldr-yellow text-baldr-yellow hover:bg-baldr-yellow hover:text-black"
              >
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-b from-baldr-black to-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How <span className="text-baldr-yellow">BalDr</span> Works
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our AI-powered platform provides a comprehensive approach to hair care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Camera className="h-10 w-10 text-baldr-yellow" />}
              title="Upload Your Photo"
              description="Start by uploading a photo of your hair to receive personalized AI analysis and recommendations."
              step={1}
            />
            <FeatureCard
              icon={<CheckCircle className="h-10 w-10 text-baldr-yellow" />}
              title="Get Your Plan"
              description="Receive a tailored regimen including product suggestions and lifestyle adjustments."
              step={2}
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-baldr-yellow" />}
              title="Track Progress"
              description="Upload photos regularly to track your hair's improvement over time."
              step={3}
            />
            <FeatureCard
              icon={<MessageSquare className="h-10 w-10 text-baldr-yellow" />}
              title="24/7 Support"
              description="Access our AI assistant anytime for questions, advice, and emotional support."
              step={4}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key <span className="text-baldr-yellow">Features</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Discover what makes BalDr the ultimate hair care companion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="feature-card border-baldr-yellow/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                    <p className="text-gray-500 mb-4">
                      Upload and view progress photos from day one, visually tracking positive changes over time.
                    </p>
                    <Link href="/progress">
                      <Button variant="link" className="text-baldr-yellow p-0">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-gray-100 aspect-square relative">
                    <Image
                      src="/images/features/progress-tracking.png"
                      alt="Progress Tracking"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card border-baldr-yellow/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2">Psychological Support</h3>
                    <p className="text-gray-500 mb-4">
                      A dedicated AI companion available to talk about emotional well-being and offer guidance.
                    </p>
                    <Link href="/chat">
                      <Button variant="link" className="text-baldr-yellow p-0">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-gray-100 aspect-square relative">
                    <Image
                      src="/images/features/psychological-support.png"
                      alt="Psychological Support"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card border-baldr-yellow/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2">Ask Section</h3>
                    <p className="text-gray-500 mb-4">
                      Upload photos of hair care products and receive instant feedback on their suitability.
                    </p>
                    <Link href="/ask">
                      <Button variant="link" className="text-baldr-yellow p-0">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-gray-100 aspect-square relative">
                    <Image
                      src="/images/features/ask-section.png"
                      alt="Ask Section"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="feature-card border-baldr-yellow/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2">Personalized Guide</h3>
                    <p className="text-gray-500 mb-4">
                      Each user receives a customized plan including diet, stress-reducing meditations, and lifestyle
                      tips.
                    </p>
                    <Link href="/guide">
                      <Button variant="link" className="text-baldr-yellow p-0">
                        Learn more
                      </Button>
                    </Link>
                  </div>
                  <div className="bg-gray-100 aspect-square relative">
                    <Image
                      src="/images/features/personalized-guide.png"
                      alt="Personalized Guide"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-gradient-to-b from-background to-baldr-black text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Our <span className="text-baldr-yellow">Community</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Connect with others on the same journey and share your experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/images/community/forum.png"
                    alt="Community Forum"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Community Forum</h3>
                <p className="text-gray-400 mb-4">
                  Connect with others, share your journey, and learn from experiences in our supportive community.
                </p>
                <Link href="/community">
                  <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Visit Forum</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/images/community/success-stories.png"
                    alt="Success Stories"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Success Stories</h3>
                <p className="text-gray-400 mb-4">
                  Read inspiring stories from users who have transformed their hair health with BalDr.
                </p>
                <Link href="/community?tab=success-stories">
                  <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Read Stories</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <div className="aspect-video relative mb-4 rounded-md overflow-hidden">
                  <Image
                    src="/images/community/product-reviews.png"
                    alt="Product Reviews"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Product Reviews</h3>
                <p className="text-gray-400 mb-4">
                  Discover which products work best for different hair types through honest user reviews.
                </p>
                <Link href="/community?tab=reviews">
                  <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">View Reviews</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-20 bg-baldr-black text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop <span className="text-baldr-yellow">Recommended Products</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Discover products tailored to your specific hair care needs
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Nioxin System Kit",
                description: "Complete hair care system for thinning hair",
                price: 49.99
              },
              {
                name: "Rogaine Foam",
                description: "FDA-approved hair regrowth treatment",
                price: 39.99
              },
              {
                name: "Biotin Supplements",
                description: "High-strength hair growth vitamins",
                price: 24.99
              },
              {
                name: "Hair Growth Shampoo",
                description: "Gentle cleansing with growth boosters",
                price: 29.99
              }
            ].map((product, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4 bg-gray-800 rounded-md overflow-hidden">
                    <Image
                      src={`/images/products/product-${index + 1}.jpg`}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1 text-white">{product.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-baldr-yellow font-bold">${product.price}</span>
                    <Button size="sm" className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                      <ShoppingBag className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/shop">
              <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-baldr-yellow">Users Say</span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Real stories from people who transformed their hair health with BalDr
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="David Johnson"
              image="/images/testimonials/user-1.png"
              quote="After 3 months with BalDr, I've seen incredible improvement in my hair thickness. The personalized recommendations really work!"
              rating={5}
            />
            <TestimonialCard
              name="Michael Chen"
              image="/images/testimonials/user-2.png"
              quote="The psychological support feature helped me deal with the emotional aspects of hair loss. This app is more than just hair care."
              rating={5}
            />
            <TestimonialCard
              name="James Rodriguez"
              image="/images/testimonials/user-3.png"
              quote="Being able to track my progress visually has been a game-changer. I can actually see the improvements week by week."
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-background to-baldr-black text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple <span className="text-baldr-yellow">Pricing</span> Plans
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your hair care journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="Free"
              description="Get started with essential hair care analysis"
              features={[
                "Initial hair analysis",
                "Basic recommendations",
                "Limited progress tracking",
                "Community access",
              ]}
              buttonText="Start Free"
              buttonLink="/signup"
              highlighted={false}
            />
            <PricingCard
              title="Premium"
              price="$9.99"
              period="per month"
              description="Enhanced features for serious hair care"
              features={[
                "Advanced hair analysis",
                "Unlimited progress tracking",
                "Personalized product recommendations",
                "Basic psychological support",
                "10% discount on shop products",
              ]}
              buttonText="Get Premium"
              buttonLink="/signup?plan=premium"
              highlighted={true}
            />
            <PricingCard
              title="Ultimate"
              price="$19.99"
              period="per month"
              description="Complete hair care solution"
              features={[
                "Comprehensive hair analysis",
                "Unlimited progress tracking",
                "Priority AI support 24/7",
                "Advanced psychological support",
                "Personalized diet & lifestyle plan",
                "20% discount on shop products",
              ]}
              buttonText="Get Ultimate"
              buttonLink="/signup?plan=ultimate"
              highlighted={false}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-baldr-black text-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Get in <span className="text-baldr-yellow">Touch</span>
              </h2>
              <p className="text-gray-400 mb-6">
                Have questions or need support? We're here to help you on your hair care journey.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-baldr-yellow/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-baldr-yellow" />
                  </div>
                  <div>
                    <p className="text-gray-300">support@baldr.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-baldr-yellow/10 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-baldr-yellow" />
                  </div>
                  <div>
                    <p className="text-gray-300">+1 (800) 123-4567</p>
                  </div>
                </div>
              </div>
              <Link href="/contact">
                <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Contact Us</Button>
              </Link>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src="/images/contact/contact-us.png" alt="Contact Us" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-baldr-black text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Hair Care Journey Today</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied users who have transformed their hair health with BalDr
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

