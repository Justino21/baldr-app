"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Camera, Search, CheckCircle, XCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AskPage() {
  const [activeTab, setActiveTab] = useState("product-check")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<null | {
    suitable: boolean
    productName: string
    reasons: string[]
  }>(null)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const handleProductAnalysis = () => {
    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisResult({
        suitable: Math.random() > 0.5, // Randomly determine if suitable
        productName: "Nourishing Shampoo",
        reasons: [
          "Contains biotin which supports hair growth",
          "Free from harsh sulfates that can damage hair",
          "Has natural oils that promote scalp health",
          "pH balanced formula suitable for sensitive scalps",
        ],
      })
    }, 2000)
  }

  const handleQuestionSubmit = () => {
    if (question.trim() === "") return

    // Simulate AI response
    setAnswer("")
    const fullAnswer =
      "Based on your hair profile and the information you've provided, I recommend focusing on protein-rich treatments. Your hair shows signs of protein deficiency, which can lead to breakage and thinning. Look for products containing keratin, collagen, or wheat protein. Apply a protein treatment once a week, but be careful not to overdo it as too much protein can make hair brittle. Balance protein treatments with moisturizing products to maintain optimal hair health."

    let i = 0
    const interval = setInterval(() => {
      setAnswer(fullAnswer.substring(0, i))
      i++
      if (i > fullAnswer.length) {
        clearInterval(interval)
      }
    }, 20)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setShowCamera(true)
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access camera. Please make sure you have granted camera permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setShowCamera(false)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "camera-photo.jpg", { type: "image/jpeg" })
          setSelectedImage(file)
          setPreviewUrl(URL.createObjectURL(file))
        }
      }, "image/jpeg")
    }
    stopCamera()
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Ask BalDr</h1>
        <p className="text-gray-500 mb-8">Get instant feedback on products or ask any hair-related questions</p>

        <Tabs defaultValue="product-check" className="mb-10" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="product-check">Product Check</TabsTrigger>
            <TabsTrigger value="hair-questions">Hair Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="product-check">
            <Card className="border-baldr-yellow/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Check if a product is suitable for you</h2>
                <p className="text-gray-500 mb-6">
                  Upload a photo of any hair product to get instant AI feedback on whether it's suitable for your hair
                  type and concerns.
                </p>

                {!analysisResult ? (
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-md h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 mb-4">
                      {previewUrl ? (
                        <div className="relative w-full h-full">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewUrl}
                            alt="Product preview"
                            className="w-full h-full object-contain"
                          />
                          <Button
                            variant="outline"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setSelectedImage(null)
                              setPreviewUrl(null)
                            }}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : showCamera ? (
                        <div className="relative w-full h-full">
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            <Button
                              variant="outline"
                              onClick={stopCamera}
                              className="bg-white/80 hover:bg-white"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={capturePhoto}
                              className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                            >
                              Capture
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Camera className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500 mb-2">Take a photo or upload an image of the product</p>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline"
                              onClick={startCamera}
                            >
                              <Camera className="h-4 w-4 mr-2" /> Take Photo
                            </Button>
                            <Button 
                              className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                              onClick={handleUploadClick}
                            >
                              <Upload className="h-4 w-4 mr-2" /> Upload
                            </Button>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileUpload}
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <Button
                      onClick={handleProductAnalysis}
                      disabled={isAnalyzing || !selectedImage}
                      className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Product"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{analysisResult.productName}</h3>
                        {analysisResult.suitable ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-1" />
                            <span>Suitable</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="h-5 w-5 mr-1" />
                            <span>Not Recommended</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Analysis:</h4>
                        <ul className="space-y-2">
                          {analysisResult.reasons.map((reason, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-baldr-yellow mr-2 mt-0.5 shrink-0" />
                              <span className="text-sm">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!analysisResult.suitable && (
                        <div>
                          <h4 className="font-medium mb-2">Alternative Recommendations:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {[1, 2].map((item) => (
                              <div key={item} className="bg-white p-2 rounded border border-gray-200 flex items-center">
                                <div className="w-10 h-10 bg-gray-200 rounded mr-2"></div>
                                <div>
                                  <p className="text-xs font-medium">Alternative {item}</p>
                                  <p className="text-xs text-gray-500">Better match</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Button onClick={() => setAnalysisResult(null)} variant="outline">
                      Check Another Product
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hair-questions">
            <Card className="border-baldr-yellow/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Ask Any Hair Question</h2>
                <p className="text-gray-500 mb-6">
                  Get expert advice on any hair-related concerns or questions you might have.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask a question about your hair..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleQuestionSubmit}
                      className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>

                  {answer && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">Answer:</h3>
                      <p className="text-sm">{answer}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold mb-2">Common Questions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "How often should I wash my hair?",
                        "What causes hair thinning?",
                        "Are natural oils good for my hair?",
                        "How can I reduce hair breakage?",
                      ].map((q, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="justify-start h-auto py-2 px-3 text-left"
                          onClick={() => {
                            setQuestion(q)
                            handleQuestionSubmit()
                          }}
                        >
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="border-baldr-yellow/20 bg-gradient-to-r from-gray-900 to-black text-white">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4 text-baldr-yellow">Why Use BalDr Ask?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Personalized Advice</h3>
                <p className="text-sm text-gray-400">
                  Get recommendations tailored to your specific hair type, concerns, and goals.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Save Money</h3>
                <p className="text-sm text-gray-400">
                  Avoid purchasing products that won't work for your hair, saving you time and money.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Expert Knowledge</h3>
                <p className="text-sm text-gray-400">
                  Access AI-powered insights based on the latest hair care research and expertise.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

