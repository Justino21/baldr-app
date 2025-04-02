"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Upload, Calendar, ChevronLeft, ChevronRight, X, CheckCircle, ZoomIn, ZoomOut } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

interface Photo {
  id: string
  url: string
  date: string
  analyzed: boolean
}

export default function ProgressPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [zoomImage, setZoomImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [activeMonth, setActiveMonth] = useState("April 2025")
  const [activeTab, setActiveTab] = useState("timeline")
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [photos, setPhotos] = useState<Photo[]>([])
  const router = useRouter()

  // Sample progress data
  const progressData = [
    {
      date: "April 1, 2025",
      title: "Starting Point",
      image: "/images/progress/starting-point.png",
      description: "Initial assessment and starting point for your hair journey.",
    },
    {
      date: "May 1, 2025",
      title: "1 Month Progress",
      image: "/images/progress/one-month-progress.png",
      description: "After one month of treatment, showing early signs of improvement in hair health.",
    },
    {
      date: "July 1, 2025",
      title: "3 Months Progress",
      image: "/images/progress/three-months-progress.png",
      description: "Significant improvement in hair density and overall hair health after three months.",
    },
    {
      date: "April 1, 2026",
      title: "1 Year Progress",
      image: "/images/progress/one-year-progress.png",
      description: "Remarkable transformation after a full year of consistent treatment and care.",
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handlePhotoUpload = async () => {
    if (!selectedImage) return

    setIsUploading(true)
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Add photo to the list
      setPhotos(prev => [...prev, {
        id: Date.now().toString(),
        url: selectedImage,
        date: new Date().toISOString(),
        analyzed: false
      }])
      
      setUploadSuccess(true)
      setSelectedImage(null)
      
      // Reset after showing success message
      setTimeout(() => {
        setUploadSuccess(false)
      }, 3000)
    } catch (error) {
      console.error('Error uploading photo:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleAnalyzePhoto = () => {
    // Show subscription dialog instead of analyzing
    setShowPurchaseDialog(true)
  }

  const handlePurchasePlan = async () => {
    setIsLoading(true)
    try {
      // Create a one-time purchase for the analysis feature
      const response = await fetch('/api/purchases/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: 'photo-analysis',
          price: 5.99,
          type: 'one-time'
        }),
      })
      
      if (response.ok) {
        // Redirect to payment page
        const data = await response.json()
        window.location.href = data.paymentUrl
      }
    } catch (error) {
      console.error('Error creating purchase:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const cancelUpload = () => {
    setSelectedImage(null)
  }

  const months = ["February 2025", "March 2025", "April 2025", "May 2025"]
  const currentMonthIndex = months.indexOf(activeMonth)

  const nextMonth = () => {
    if (currentMonthIndex < months.length - 1) {
      setActiveMonth(months[currentMonthIndex + 1])
    }
  }

  const prevMonth = () => {
    if (currentMonthIndex > 0) {
      setActiveMonth(months[currentMonthIndex - 1])
    }
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Progress Tracking</h1>
        <p className="text-gray-500 mb-8">Upload and track your hair progress over time to visualize your journey</p>

        <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
          <Tabs defaultValue="timeline" onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="timeline">Progress Timeline</TabsTrigger>
              <TabsTrigger value="upload">Upload New Photo</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="timeline">
              {/* Timeline Navigation */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Your Progress Timeline</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth} disabled={currentMonthIndex === 0}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-baldr-yellow" />
                    <span className="text-sm font-medium">{activeMonth}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextMonth}
                    disabled={currentMonthIndex === months.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="relative progress-timeline pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {progressData.map((entry, index) => (
                    <div key={index} className={`flex ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                      <Card className="w-full md:w-[98%] border-baldr-yellow/20 hover:shadow-md transition-shadow">
                        <CardContent className="p-10">
                          <div className="flex flex-col">
                            <DialogTrigger asChild>
                              <div 
                                className="aspect-[16/12] relative mb-8 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity group"
                                onClick={() => setZoomImage(entry.image)}
                              >
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <Image
                                  src={entry.image || "/placeholder.svg"}
                                  alt={entry.title}
                                  fill
                                  className={`object-cover ${
                                    entry.title === "1 Month Progress" 
                                      ? "object-[center_20%]" 
                                      : "object-[center_15%]"
                                  } scale-105`}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  priority
                                />
                              </div>
                            </DialogTrigger>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg text-baldr-yellow">{entry.title}</h3>
                              <span className="text-sm text-gray-500">{entry.date}</span>
                            </div>
                            <p className="text-sm text-gray-500">{entry.description}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload">
              {/* Upload Section */}
              <Card className="mb-10 border-baldr-yellow/20">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/*"
                      className="hidden"
                    />

                    {!selectedImage ? (
                      <div className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 mb-4">
                        <Upload className="h-10 w-10 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 mb-2">Drag and drop your photo here, or click to browse</p>
                        <Button
                          className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                          onClick={triggerFileInput}
                        >
                          Upload Photo
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full max-w-md mb-4">
                        <div className="relative">
                          <div className="aspect-video relative rounded-lg overflow-hidden mb-4">
                            <Image
                              src={selectedImage || "/placeholder.svg"}
                              alt="Preview"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                            onClick={cancelUpload}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        {uploadSuccess ? (
                          <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                            <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                            <p className="text-green-700 font-medium">Photo uploaded successfully!</p>
                            <p className="text-sm text-green-600">Our AI is analyzing your progress.</p>
                          </div>
                        ) : (
                          <Button
                            className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                            onClick={handleAnalyzePhoto}
                            disabled={isUploading}
                          >
                            {isUploading ? "Uploading..." : "Analyze Photo"}
                          </Button>
                        )}
                      </div>
                    )}

                    <div className="w-full max-w-md">
                      <h3 className="font-semibold mb-2 text-left">Photo Tips:</h3>
                      <ul className="text-sm text-gray-500 text-left space-y-1">
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span>Take photos in consistent lighting conditions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span>Capture multiple angles (front, sides, back)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span>Keep the same distance and position for accurate comparison</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span>For best results, upload photos every 2 weeks</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-baldr-yellow/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Recent Uploads</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden group">
                        <Image
                          src={item === 1 ? "/before-after-1.png" : "/placeholder.svg?height=200&width=200"}
                          alt={`Recent upload ${item}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-xs">
                            {new Date(Date.now() - item * 86400000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analysis">
              {/* AI Analysis */}
              <Card className="mb-8 border-baldr-yellow/20 bg-gradient-to-r from-gray-900 to-black text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-baldr-yellow">AI Analysis & Insights</h3>
                  <p className="mb-4">
                    Based on your progress photos, our AI has detected a 15% improvement in hair density and a 20%
                    improvement in hair shine over the past 2 months.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Density Improvement</h4>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-baldr-yellow h-2.5 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">Starting point</span>
                        <span className="text-xs text-baldr-yellow">15%</span>
                      </div>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Shine Improvement</h4>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div className="bg-baldr-yellow h-2.5 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-400">Starting point</span>
                        <span className="text-xs text-baldr-yellow">20%</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Observations</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Reduced breakage at the hair ends</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Improved scalp condition with less visible flaking</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">New hair growth visible at the temples and crown</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Enhanced natural color and shine</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Continue with your current regimen</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Add our recommended Vitamin B supplement</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Increase protein-rich foods in your diet</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">Try the weekly deep conditioning treatment</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Projected Results</h4>
                    <p className="text-sm mb-3">
                      Based on your current progress and if you follow our recommendations, here's what you can expect:
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gray-700 p-2 rounded">
                        <p className="text-xs text-gray-400">1 Month</p>
                        <p className="text-baldr-yellow font-semibold">+10%</p>
                      </div>
                      <div className="bg-gray-700 p-2 rounded">
                        <p className="text-xs text-gray-400">3 Months</p>
                        <p className="text-baldr-yellow font-semibold">+25%</p>
                      </div>
                      <div className="bg-gray-700 p-2 rounded">
                        <p className="text-xs text-gray-400">6 Months</p>
                        <p className="text-baldr-yellow font-semibold">+40%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-baldr-yellow/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Before & After Comparison</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Starting Point</p>
                        <div className="aspect-square relative rounded-lg overflow-hidden">
                          <Image 
                            src="/images/progress/starting-point.png" 
                            alt="Starting Point" 
                            fill 
                            className="object-cover object-[center_25%] scale-120" 
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">After 1 Year</p>
                        <div className="aspect-square relative rounded-lg overflow-hidden">
                          <Image 
                            src="/images/progress/one-year-progress.png" 
                            alt="After 1 Year" 
                            fill 
                            className="object-cover object-[center_15%] scale-250" 
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-baldr-yellow/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3">Hair Health Score</h3>
                    <div className="flex items-center justify-center mb-4">
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-3xl font-bold text-baldr-yellow">76</span>
                        </div>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#FFD700"
                            strokeWidth="8"
                            strokeDasharray="283"
                            strokeDashoffset="68"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Strength</span>
                          <span>72/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-baldr-yellow h-1.5 rounded-full" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Moisture</span>
                          <span>80/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-baldr-yellow h-1.5 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Scalp Health</span>
                          <span>78/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-baldr-yellow h-1.5 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Rate</span>
                          <span>68/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div className="bg-baldr-yellow h-1.5 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="absolute top-4 right-4">
              <button 
                onClick={() => setShowPurchaseDialog(false)}
                className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-baldr-yellow text-center">Unlock Photo Analysis</DialogTitle>
              <DialogDescription className="text-center text-lg">
                Get detailed analysis of your hair progress photos
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* One-Time Offer */}
              <div className="relative bg-gradient-to-br from-baldr-yellow/20 to-transparent p-6 rounded-lg border-2 border-baldr-yellow">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Limited Time Offer!
                  </span>
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-baldr-yellow mb-2">One-Time Purchase</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold">$5.99</span>
                    <span className="text-gray-500 line-through">$29.99</span>
                  </div>
                  <p className="text-sm text-red-500 font-medium mt-2">Save 80% Today!</p>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-baldr-yellow">✓</span>
                    <span>AI-powered photo analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-baldr-yellow">✓</span>
                    <span>Detailed progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-baldr-yellow">✓</span>
                    <span>Printable analysis reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-baldr-yellow">✓</span>
                    <span>Lifetime access to analysis</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                  onClick={handlePurchasePlan}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Get One-Time Access - $5.99'}
                </Button>
              </div>

              {/* Subscription Plans */}
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4">Premium Plan</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">$9.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-baldr-yellow">✓</span>
                      <span>Basic photo analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-baldr-yellow">✓</span>
                      <span>Standard support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-baldr-yellow">✓</span>
                      <span>Community access</span>
                    </li>
                  </ul>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/pricing?plan=premium')}
                  >
                    Choose Premium Plan
                  </Button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-2 border-baldr-yellow relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-baldr-yellow text-black px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">Ultimate Plan</h3>
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold">$19.99</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-baldr-yellow">✓</span>
                      <span>Advanced photo analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-baldr-yellow">✓</span>
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-baldr-yellow">✓</span>
                      <span>Exclusive community access</span>
                    </li>
                  </ul>
                  <Button 
                    className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                    onClick={() => router.push('/pricing?plan=ultimate')}
                  >
                    Choose Ultimate Plan
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                All plans include a 30-day money-back guarantee. Need help choosing? Contact our support team.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

