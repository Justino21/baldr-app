"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [inquiryType, setInquiryType] = useState("general")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this to your backend
    console.log({ name, email, subject, message, inquiryType })
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
      setInquiryType("general")
      setIsSubmitted(false)
    }, 3000)
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
          <Image
            src="/images/contact/contact-us.png"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
            <div className="container px-4 md:px-6">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-4 text-xl text-gray-200">
                Have questions? We're here to help with your hair growth journey.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <Card className="border-baldr-yellow/20 h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Get in Touch</h2>

                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-3 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Message Sent!</h3>
                    <p className="text-center text-gray-500">
                      Thank you for reaching out. We'll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Inquiry Type</Label>
                      <RadioGroup
                        value={inquiryType}
                        onValueChange={setInquiryType}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="general" id="general" />
                          <Label htmlFor="general">General Inquiry</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="product" id="product" />
                          <Label htmlFor="product">Product Support</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="subscription" id="subscription" />
                          <Label htmlFor="subscription">Subscription Issues</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partnership" id="partnership" />
                          <Label htmlFor="partnership">Partnership Opportunities</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Enter your message"
                        className="min-h-[150px]"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                      <Send className="h-4 w-4 mr-2" /> Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-baldr-yellow/20 mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-baldr-yellow/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-baldr-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-gray-500">support@baldr.com</p>
                      <p className="text-sm text-gray-400">We aim to respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-baldr-yellow/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-baldr-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-gray-500">+1 (800) 123-4567</p>
                      <p className="text-sm text-gray-400">Mon-Fri, 9am-5pm EST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-baldr-yellow/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-baldr-yellow" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Office</h3>
                      <p className="text-gray-500">123 Hair Care Avenue</p>
                      <p className="text-gray-500">New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-baldr-yellow/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                <Tabs defaultValue="account">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  <TabsContent value="account" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold mb-1">How do I reset my password?</h3>
                      <p className="text-sm text-gray-500">
                        You can reset your password by clicking on{" "}
                        <Link href="/forgot-password" className="text-baldr-yellow hover:underline">
                          "Forgot Password"
                        </Link>{" "}
                        on the login page and following the instructions sent to your email.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Can I change my subscription plan?</h3>
                      <p className="text-sm text-gray-500">
                        Yes, you can upgrade or downgrade your subscription at any time from your{" "}
                        <Link href="/account/settings" className="text-baldr-yellow hover:underline">
                          account settings
                        </Link>
                        .
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="products" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold mb-1">Are your products cruelty-free?</h3>
                      <p className="text-sm text-gray-500">
                        Yes, all BalDr products are cruelty-free and never tested on animals.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">How long does shipping take?</h3>
                      <p className="text-sm text-gray-500">
                        Standard shipping takes 3-5 business days. Express shipping options are available at checkout.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="billing" className="space-y-4 pt-4">
                    <div>
                      <h3 className="font-semibold mb-1">How do I update my payment method?</h3>
                      <p className="text-sm text-gray-500">
                        You can update your payment method in your account settings under the "Billing" section.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Can I get a refund?</h3>
                      <p className="text-sm text-gray-500">
                        We offer a 30-day satisfaction guarantee. If you're not happy with your purchase, contact our
                        support team for a refund.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-baldr-yellow/20 bg-gradient-to-r from-gray-900 to-black text-white">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
                <p className="text-gray-600 mb-6">
                  Connect with others on their hair growth journey. Share experiences, get advice, and find support in our active community.
                </p>
                <Link href="/community">
                  <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                    Visit Community Forum
                  </Button>
                </Link>
              </div>
              <div className="relative w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/community/forum.png"
                  alt="Community Forum"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

