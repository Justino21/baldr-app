"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { Salad, Brain, Dumbbell, Moon, Download, ArrowRight, Heart, Activity, Leaf, Sparkles, Wind, Sun, Waves, Clock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function GuidePage() {
  const router = useRouter()
  const [showFullPlan, setShowFullPlan] = useState(false)
  const [showTechniques, setShowTechniques] = useState(false)
  const [concerns, setConcerns] = useState<string[]>([])
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleConcernSelect = (concern: string) => {
    setConcerns(prev => {
      if (prev.includes(concern)) {
        return prev.filter(c => c !== concern)
      }
      return [...prev, concern]
    })
  }

  const nutritionPlans = {
    thinning: {
      title: "Nutrition Plan for Thinning Hair",
      description: "Focus on foods that promote hair growth and density",
      meals: [
        {
          name: "Breakfast",
          items: [
            "Oatmeal with chia seeds and berries",
            "Greek yogurt with honey and almonds",
            "Green smoothie with spinach and banana"
          ]
        },
        {
          name: "Lunch",
          items: [
            "Quinoa bowl with chickpeas and avocado",
            "Grilled salmon with sweet potato",
            "Mediterranean salad with olive oil"
          ]
        },
        {
          name: "Dinner",
          items: [
            "Lean chicken with brown rice",
            "Lentil soup with vegetables",
            "Tofu stir-fry with broccoli"
          ]
        },
        {
          name: "Snacks",
          items: [
            "Mixed nuts and seeds",
            "Hard-boiled eggs",
            "Fresh fruits and vegetables"
          ]
        }
      ]
    },
    breakage: {
      title: "Nutrition Plan for Hair Breakage",
      description: "Focus on protein-rich foods to strengthen hair",
      meals: [
        {
          name: "Breakfast",
          items: [
            "Protein smoothie with whey powder",
            "Eggs with whole grain toast",
            "Protein-rich granola with milk"
          ]
        },
        {
          name: "Lunch",
          items: [
            "Tuna salad with whole grain crackers",
            "Turkey wrap with vegetables",
            "Protein bowl with quinoa and beans"
          ]
        },
        {
          name: "Dinner",
          items: [
            "Grilled fish with vegetables",
            "Lean beef with sweet potato",
            "Tempeh stir-fry with brown rice"
          ]
        },
        {
          name: "Snacks",
          items: [
            "Protein bars",
            "Greek yogurt with granola",
            "Edamame"
          ]
        }
      ]
    },
    stress: {
      title: "Nutrition Plan for Stress-Related Hair Issues",
      description: "Focus on stress-reducing foods and nutrients",
      meals: [
        {
          name: "Breakfast",
          items: [
            "Overnight oats with banana",
            "Chamomile tea with honey",
            "Whole grain toast with avocado"
          ]
        },
        {
          name: "Lunch",
          items: [
            "Spinach salad with walnuts",
            "Brown rice bowl with vegetables",
            "Lentil soup with turmeric"
          ]
        },
        {
          name: "Dinner",
          items: [
            "Baked salmon with asparagus",
            "Vegetable curry with brown rice",
            "Grilled chicken with roasted vegetables"
          ]
        },
        {
          name: "Snacks",
          items: [
            "Dark chocolate",
            "Green tea with honey",
            "Mixed berries"
          ]
        }
      ]
    }
  }

  const techniques = {
    thinning: {
      title: "Meditation & Breathing Techniques for Hair Growth",
      description: "Focus on techniques that promote circulation and reduce stress",
      exercises: [
        {
          name: "Scalp Circulation Meditation",
          steps: [
            "Sit in a comfortable position with your back straight",
            "Close your eyes and take deep breaths",
            "Focus on your scalp, imagining increased blood flow",
            "Continue for 5-10 minutes"
          ]
        },
        {
          name: "Stress Reduction Breathing",
          steps: [
            "Inhale for 4 counts",
            "Hold for 4 counts",
            "Exhale for 4 counts",
            "Repeat for 10 cycles"
          ]
        },
        {
          name: "Mindful Hair Care",
          steps: [
            "Focus on each stroke of brushing",
            "Be present during washing",
            "Notice sensations without judgment"
          ]
        }
      ]
    },
    breakage: {
      title: "Meditation & Breathing Techniques for Hair Strength",
      description: "Focus on techniques that promote hair health and reduce tension",
      exercises: [
        {
          name: "Hair Strengthening Visualization",
          steps: [
            "Sit comfortably and close your eyes",
            "Visualize your hair becoming stronger",
            "Imagine each strand being nourished",
            "Continue for 5-10 minutes"
          ]
        },
        {
          name: "Tension Release Breathing",
          steps: [
            "Inhale deeply through your nose",
            "Exhale slowly through your mouth",
            "Release tension with each exhale",
            "Repeat for 10 cycles"
          ]
        },
        {
          name: "Gentle Hair Care Meditation",
          steps: [
            "Practice gentle brushing techniques",
            "Focus on being gentle with your hair",
            "Maintain awareness of pressure"
          ]
        }
      ]
    },
    stress: {
      title: "Meditation & Breathing Techniques for Stress Relief",
      description: "Focus on techniques that reduce stress and promote relaxation",
      exercises: [
        {
          name: "Stress Relief Meditation",
          steps: [
            "Find a quiet space and sit comfortably",
            "Focus on your breath",
            "Release thoughts as they arise",
            "Continue for 10-15 minutes"
          ]
        },
        {
          name: "Calming Breath Exercise",
          steps: [
            "Inhale for 4 counts",
            "Hold for 7 counts",
            "Exhale for 8 counts",
            "Repeat for 10 cycles"
          ]
        },
        {
          name: "Progressive Relaxation",
          steps: [
            "Tense and release each muscle group",
            "Start from your toes",
            "Work up to your scalp",
            "Focus on releasing tension"
          ]
        }
      ]
    }
  }

  const getNutritionPlan = () => {
    if (concerns.includes("thinning")) return nutritionPlans.thinning
    if (concerns.includes("breakage")) return nutritionPlans.breakage
    if (concerns.includes("stress")) return nutritionPlans.stress
    return nutritionPlans.thinning // default
  }

  const getTechniques = () => {
    if (concerns.includes("thinning")) return techniques.thinning
    if (concerns.includes("breakage")) return techniques.breakage
    if (concerns.includes("stress")) return techniques.stress
    return techniques.thinning // default
  }

  const handleDownloadPlan = async () => {
    setIsLoading(true)
    try {
      // Show purchase dialog directly
      setShowPurchaseDialog(true)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePurchasePlan = async () => {
    setIsLoading(true)
    try {
      // Create a one-time purchase for the 30-day plan
      const response = await fetch('/api/purchases/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: '30-day-plan',
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

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Your Personalized Guide</h1>
        <p className="text-gray-500 mb-8">
          A customized plan designed specifically for your hair health and overall well-being
        </p>

        <Tabs defaultValue="overview">
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="diet">Diet</TabsTrigger>
            <TabsTrigger value="stress">Stress Management</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="bg-gradient-to-r from-baldr-yellow/20 to-transparent p-6 rounded-lg border-2 border-baldr-yellow mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-baldr-yellow/10 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-baldr-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-baldr-yellow mb-1">Limited Preview Available</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The content below is just a small sample of our comprehensive hair health program. Unlock the full potential of your hair journey with our complete subscription plan, featuring detailed routines, personalized tracking, and expert guidance.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-baldr-yellow/20 mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/3">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src="/images/guide/hair-analysis.png"
                        alt="Hair Analysis"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-xl font-bold mb-4">Your Hair Analysis</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-1">Hair Type</h3>
                        <p className="text-sm text-gray-500">
                          Fine to medium thickness with moderate density. Your hair shows signs of thinning at the crown
                          and temples.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Key Concerns</h3>
                        <p className="text-sm text-gray-500">
                          Thinning, breakage, and lack of volume. Our analysis indicates potential nutritional
                          deficiencies and stress-related factors.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Goals</h3>
                        <p className="text-sm text-gray-500">
                          Increase hair density, reduce breakage, and improve overall hair health within 3-6 months.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="border-baldr-yellow/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-baldr-yellow/10 p-3 rounded-full">
                      <Salad className="h-6 w-6 text-baldr-yellow" />
                    </div>
                    <h3 className="text-lg font-semibold">Nutrition Plan</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Your personalized anti-inflammatory diet plan focuses on foods rich in biotin, zinc, and omega-3
                    fatty acids to support hair growth.
                  </p>
                  <div className="relative mb-4">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                        LIMITED PREVIEW
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setShowFullPlan(true)}>
                      View Full Plan
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-red-500/10 to-baldr-yellow/10 rounded-lg border-2 border-red-500/20">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-500/10 p-2 rounded-full">
                        <Sparkles className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-500 mb-1">Limited Time Offer!</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          This is just a small sample of our comprehensive nutrition program. Unlock the full potential with our complete subscription plan, featuring detailed meal plans, personalized tracking, and expert guidance.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-baldr-yellow/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-baldr-yellow/10 p-3 rounded-full">
                      <Brain className="h-6 w-6 text-baldr-yellow" />
                    </div>
                    <h3 className="text-lg font-semibold">Stress Management</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    Tailored meditation and breathing exercises to reduce cortisol levels that can contribute to hair
                    loss.
                  </p>
                  <div className="relative mb-4">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold animate-pulse">
                        LIMITED PREVIEW
                      </div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setShowTechniques(true)}>
                      View Techniques
                    </Button>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-red-500/10 to-baldr-yellow/10 rounded-lg border-2 border-red-500/20">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-500/10 p-2 rounded-full">
                        <Sparkles className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-red-500 mb-1">Limited Time Offer!</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          These are just a few techniques from our comprehensive stress management program. Get access to our full library of guided meditations, breathing exercises, and expert support with our subscription plan.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-baldr-yellow/20 bg-gradient-to-r from-gray-900 to-black text-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 text-baldr-yellow">Your 30-Day Plan</h2>
                <p className="mb-6">
                  We've created a comprehensive 30-day plan to kickstart your hair recovery journey. Follow this plan
                  consistently for best results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Morning Routine</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Protein-rich breakfast</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>5-minute scalp massage</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Hair supplements with food</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Evening Routine</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Anti-inflammatory dinner</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>10-minute stress reduction</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Hair treatment (2x weekly)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Weekly Focus</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Deep conditioning treatment</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Progress photo upload</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span>Plan adjustment check-in</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Button 
                    className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                    onClick={handleDownloadPlan}
                    disabled={isLoading}
                  >
                    <Download className="h-4 w-4 mr-2" /> 
                    {isLoading ? 'Processing...' : 'Download Full Plan'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="diet">
            <div className="bg-gradient-to-r from-baldr-yellow/20 to-transparent p-6 rounded-lg border-2 border-baldr-yellow mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-baldr-yellow/10 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-baldr-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-baldr-yellow mb-1">Limited Preview Available</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The content below is just a small sample of our comprehensive nutrition program. Unlock the full potential of your hair journey with our complete subscription plan, featuring detailed meal plans, personalized tracking, and expert guidance.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-baldr-yellow/20 mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Anti-Inflammatory Diet Plan</h2>
                <p className="text-gray-500 mb-6">
                  Your personalized diet focuses on reducing inflammation and providing essential nutrients for hair
                  growth.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-3">Foods to Include</h3>
                    <ul className="space-y-2">
                      {[
                        "Fatty fish (salmon, mackerel) rich in omega-3",
                        "Eggs for biotin and protein",
                        "Berries for antioxidants",
                        "Nuts and seeds for zinc and vitamin E",
                        "Leafy greens for iron and folate",
                        "Sweet potatoes for beta-carotene",
                        "Avocados for healthy fats",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Foods to Limit</h3>
                    <ul className="space-y-2">
                      {[
                        "Processed foods with artificial additives",
                        "Refined sugars and high-glycemic foods",
                        "Excessive alcohol consumption",
                        "Trans fats and fried foods",
                        "Excessive caffeine",
                        "Dairy (if sensitivity is detected)",
                        "Gluten (if sensitivity is detected)",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="font-semibold mb-3">Sample Meal Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Breakfast</h4>
                      <p className="text-sm text-gray-500">
                        Spinach and mushroom omelet with avocado toast on whole grain bread
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Lunch</h4>
                      <p className="text-sm text-gray-500">
                        Grilled salmon salad with mixed greens, walnuts, and olive oil dressing
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Dinner</h4>
                      <p className="text-sm text-gray-500">
                        Baked sweet potato with grilled chicken and steamed broccoli
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Supplements Recommendation</h3>
                  <ul className="space-y-2">
                    {[
                      "Biotin (5000mcg daily)",
                      "Vitamin D3 (2000 IU daily)",
                      "Zinc (15mg daily)",
                      "Omega-3 fatty acids (1000mg daily)",
                      "Iron (if deficiency is detected in blood work)",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                onClick={handleDownloadPlan}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" /> 
                {isLoading ? 'Processing...' : 'Download Complete Diet Guide'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="stress">
            <div className="bg-gradient-to-r from-baldr-yellow/20 to-transparent p-6 rounded-lg border-2 border-baldr-yellow mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-baldr-yellow/10 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-baldr-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-baldr-yellow mb-1">Limited Preview Available</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The content below is just a small sample of our comprehensive stress management program. Unlock the full potential of your hair journey with our complete subscription plan, featuring guided meditations, breathing exercises, and expert support.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-baldr-yellow/20 mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Stress Management Techniques</h2>
                <p className="text-gray-500 mb-6">
                  Chronic stress can significantly impact hair health by increasing cortisol levels. These techniques
                  are tailored to help you manage stress effectively.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="flex flex-col">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src="/images/guide/guided-meditation.png"
                        alt="Guided Meditation"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">Guided Meditation</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Our 10-minute guided meditation specifically designed to reduce stress hormones that can affect
                      hair growth.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={handleDownloadPlan}
                      disabled={isLoading}
                    >
                      Start Meditation <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  <div className="flex flex-col">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-4">
                      <Image
                        src="/images/guide/breathing-techniques.png"
                        alt="Breathing Techniques"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="font-semibold mb-2">Breathing Techniques</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Simple 5-minute breathing exercises you can do anywhere to instantly reduce stress and anxiety.
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-auto"
                      onClick={handleDownloadPlan}
                      disabled={isLoading}
                    >
                      Learn Techniques <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>

                <h3 className="font-semibold mb-4">Daily Stress Management Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-baldr-yellow" />
                        <h4 className="font-medium">Morning</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-500">5-minute mindfulness meditation</li>
                        <li className="text-xs text-gray-500">Gratitude journaling (3 items)</li>
                        <li className="text-xs text-gray-500">Deep breathing during commute</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-baldr-yellow" />
                        <h4 className="font-medium">Afternoon</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-500">2-minute desk stretching</li>
                        <li className="text-xs text-gray-500">Short walk outside if possible</li>
                        <li className="text-xs text-gray-500">Stress-relief pressure points</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="h-4 w-4 text-baldr-yellow" />
                        <h4 className="font-medium">Evening</h4>
                      </div>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-500">10-minute guided meditation</li>
                        <li className="text-xs text-gray-500">Digital detox 1 hour before bed</li>
                        <li className="text-xs text-gray-500">Relaxing scalp massage</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Stress-Hair Connection</h3>
                  <p className="text-sm text-gray-500">
                    Chronic stress triggers the release of cortisol, which can push hair follicles into a resting phase,
                    leading to increased shedding. Additionally, stress can cause inflammation and disrupt nutrient
                    absorption, both critical for healthy hair growth. Our stress management techniques are designed to
                    specifically target these pathways.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                onClick={handleDownloadPlan}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" /> 
                {isLoading ? 'Processing...' : 'Download Stress Management Guide'}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="lifestyle">
            <div className="bg-gradient-to-r from-baldr-yellow/20 to-transparent p-6 rounded-lg border-2 border-baldr-yellow mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-baldr-yellow/10 p-3 rounded-full">
                  <Sparkles className="h-6 w-6 text-baldr-yellow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-baldr-yellow mb-1">Limited Preview Available</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    The content below is just a small sample of our comprehensive lifestyle program. Unlock the full potential of your hair journey with our complete subscription plan, featuring personalized routines, progress tracking, and expert guidance.
                  </p>
                </div>
              </div>
            </div>

            <Card className="border-baldr-yellow/20 mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Lifestyle Recommendations</h2>
                <p className="text-gray-500 mb-6">
                  Small daily habits can have a significant impact on your hair health. These lifestyle adjustments are
                  tailored to your specific needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-baldr-yellow/10 p-2 rounded-full">
                        <Dumbbell className="h-5 w-5 text-baldr-yellow" />
                      </div>
                      <h3 className="font-semibold">Exercise Recommendations</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Regular exercise improves circulation, which helps deliver nutrients to hair follicles. However,
                      excessive high-intensity workouts can increase stress hormones.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "30 minutes of moderate cardio 3-4 times weekly",
                        "Yoga or gentle stretching to reduce stress",
                        "Strength training 2-3 times weekly",
                        "Avoid excessive sweating without proper scalp cleansing",
                        "Stay hydrated during workouts",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-baldr-yellow/10 p-2 rounded-full">
                        <Moon className="h-5 w-5 text-baldr-yellow" />
                      </div>
                      <h3 className="font-semibold">Sleep Optimization</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Quality sleep is essential for hair growth as it's when your body repairs and regenerates cells,
                      including hair follicles.
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Aim for 7-8 hours of uninterrupted sleep",
                        "Maintain a consistent sleep schedule",
                        "Use a silk or satin pillowcase to reduce friction",
                        "Keep bedroom cool and dark",
                        "Avoid screens 1 hour before bedtime",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-baldr-yellow mr-2">•</span>
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h3 className="font-semibold mb-4">Daily Hair Care Routine</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Morning</h4>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-500">Gentle finger detangling</li>
                        <li className="text-xs text-gray-500">5-minute scalp massage</li>
                        <li className="text-xs text-gray-500">Minimal heat styling</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Washing Days (2-3x weekly)</h4>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-500">Sulfate-free shampoo</li>
                        <li className="text-xs text-gray-500">Conditioner on mid-lengths to ends</li>
                        <li className="text-xs text-gray-500">Cool water final rinse</li>
                      </ul>
                    </CardContent>
                  </Card>
                  <Card className="border-gray-200">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Evening</h4>
                      <ul className="space-y-1">
                        <li className="text-xs text-gray-500">Loose hairstyle for sleeping</li>
                        <li className="text-xs text-gray-500">Apply recommended serum</li>
                        <li className="text-xs text-gray-500">Scalp massage with essential oils (2x weekly)</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Environmental Factors</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Protect your hair from these environmental stressors that can contribute to damage and thinning:
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Use UV protection for hair when in direct sunlight",
                      "Wear a hat in extreme weather conditions",
                      "Filter shower water to remove chlorine and heavy metals",
                      "Minimize exposure to pollution with protective hair products",
                      "Maintain indoor humidity between 40-60% to prevent dryness",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-baldr-yellow mr-2">•</span>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                onClick={handleDownloadPlan}
                disabled={isLoading}
              >
                <Download className="h-4 w-4 mr-2" /> 
                {isLoading ? 'Processing...' : 'Download Lifestyle Guide'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showFullPlan} onOpenChange={setShowFullPlan}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-baldr-yellow">{getNutritionPlan().title}</DialogTitle>
            <DialogDescription className="text-lg">{getNutritionPlan().description}</DialogDescription>
            <div className="mt-4 p-4 bg-gradient-to-r from-baldr-yellow/10 to-transparent rounded-lg border border-baldr-yellow/20">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-baldr-yellow">Limited Preview:</span> This is just a small sample of our comprehensive nutrition program. Unlock the full potential with our complete subscription plan, featuring detailed meal plans, personalized tracking, and expert guidance.
              </p>
            </div>
          </DialogHeader>
          <div className="space-y-8">
            {getNutritionPlan().meals.map((meal, index) => (
              <div key={index} className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-baldr-yellow/10 p-2 rounded-full">
                    <Salad className="h-5 w-5 text-baldr-yellow" />
                  </div>
                  <h4 className="font-semibold text-xl">{meal.name}</h4>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {meal.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <span className="text-baldr-yellow">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTechniques} onOpenChange={setShowTechniques}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-baldr-yellow">{getTechniques().title}</DialogTitle>
            <DialogDescription className="text-lg">{getTechniques().description}</DialogDescription>
            <div className="mt-4 p-4 bg-gradient-to-r from-baldr-yellow/10 to-transparent rounded-lg border border-baldr-yellow/20">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-semibold text-baldr-yellow">Limited Preview:</span> These are just a few techniques from our comprehensive stress management program. Get access to our full library of guided meditations, breathing exercises, and expert support with our subscription plan.
              </p>
            </div>
          </DialogHeader>
          <div className="space-y-8">
            {getTechniques().exercises.map((exercise, index) => (
              <div key={index} className="space-y-4 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-baldr-yellow/10 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-baldr-yellow" />
                  </div>
                  <h4 className="font-semibold text-xl">{exercise.name}</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium mb-2 text-gray-700 dark:text-gray-300">Steps:</h5>
                    <ol className="space-y-2">
                      {exercise.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                          <span className="text-baldr-yellow font-medium">{stepIndex + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-32 h-32 bg-baldr-yellow/10 rounded-full flex items-center justify-center">
                      {exercise.name.toLowerCase().includes("circulation") && <Heart className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("stress") && <Leaf className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("mindful") && <Sparkles className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("strengthening") && <Activity className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("tension") && <Wind className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("gentle") && <Sun className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("relief") && <Waves className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("calming") && <Clock className="w-16 h-16 text-baldr-yellow" />}
                      {exercise.name.toLowerCase().includes("progressive") && <Activity className="w-16 h-16 text-baldr-yellow" />}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
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
            <DialogTitle className="text-2xl font-bold text-baldr-yellow text-center">Choose Your Plan</DialogTitle>
            <DialogDescription className="text-center text-lg">
              Select the plan that best fits your needs
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
                  <span>30-day personalized plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-baldr-yellow">✓</span>
                  <span>Progress tracking templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-baldr-yellow">✓</span>
                  <span>Printable PDF format</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-baldr-yellow">✓</span>
                  <span>Lifetime access to updates</span>
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
                    <span>Basic hair analysis</span>
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
                    <span>Advanced hair analysis</span>
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
  )
}

