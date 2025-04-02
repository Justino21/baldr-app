"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const planParam = searchParams.get("plan")
  const [selectedPlan, setSelectedPlan] = useState(planParam || "basic")

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Image src="/logo.png" alt="BalDr Logo" width={80} height={80} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Join BalDr</h1>
          <p className="text-gray-500">Start your personalized hair care journey today</p>
        </div>

        <Tabs defaultValue="signup" className="mb-10">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-baldr-yellow/20">
                <CardHeader>
                  <CardTitle>Create Your Account</CardTitle>
                  <CardDescription>Enter your details to create your BalDr account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" placeholder="Confirm your password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Create Account</Button>
                </CardFooter>
              </Card>

              <div>
                <h2 className="text-xl font-bold mb-4">Choose Your Plan</h2>
                <div className="space-y-4">
                  <Card
                    className={`border cursor-pointer ${
                      selectedPlan === "basic" ? "border-baldr-yellow" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPlan("basic")}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">Basic</h3>
                          <p className="text-sm text-gray-500">Free</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            selectedPlan === "basic" ? "bg-baldr-yellow border-baldr-yellow" : "border-gray-300"
                          }`}
                        >
                          {selectedPlan === "basic" && <CheckCircle className="text-black w-5 h-5" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border cursor-pointer ${
                      selectedPlan === "premium" ? "border-baldr-yellow" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPlan("premium")}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">Premium</h3>
                          <p className="text-sm text-gray-500">$9.99/month</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            selectedPlan === "premium" ? "bg-baldr-yellow border-baldr-yellow" : "border-gray-300"
                          }`}
                        >
                          {selectedPlan === "premium" && <CheckCircle className="text-black w-5 h-5" />}
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1">
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>Advanced hair analysis</span>
                        </li>
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>Unlimited progress tracking</span>
                        </li>
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>10% discount on shop products</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card
                    className={`border cursor-pointer ${
                      selectedPlan === "ultimate" ? "border-baldr-yellow" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedPlan("ultimate")}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">Ultimate</h3>
                          <p className="text-sm text-gray-500">$19.99/month</p>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border ${
                            selectedPlan === "ultimate" ? "bg-baldr-yellow border-baldr-yellow" : "border-gray-300"
                          }`}
                        >
                          {selectedPlan === "ultimate" && <CheckCircle className="text-black w-5 h-5" />}
                        </div>
                      </div>
                      <ul className="mt-2 space-y-1">
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>Comprehensive hair analysis</span>
                        </li>
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>Priority AI support 24/7</span>
                        </li>
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>Personalized diet & lifestyle plan</span>
                        </li>
                        <li className="text-xs text-gray-500 flex items-start">
                          <CheckCircle className="h-3 w-3 text-baldr-yellow mr-1 mt-0.5 shrink-0" />
                          <span>20% discount on shop products</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="login">
            <Card className="border-baldr-yellow/20 max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Welcome Back</CardTitle>
                <CardDescription>Login to your BalDr account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" placeholder="Enter your password" />
                </div>
                <div className="text-right">
                  <Link href="/forgot-password" className="text-sm text-baldr-yellow hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            By signing up, you agree to our{" "}
            <Link href="/terms" className="text-baldr-yellow hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-baldr-yellow hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

