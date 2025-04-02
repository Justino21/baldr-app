"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, User, Bot, Info } from "lucide-react"
import Image from "next/image"

type Message = {
  id: number
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content:
        "Hello! I'm your BalDr psychological support assistant. How are you feeling today about your hair journey?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isTyping, setIsTyping] = useState(false)

  const suggestedTopics = [
    "I'm worried about my thinning hair",
    "How can I improve my hair routine?",
    "I'm feeling self-conscious about my hair",
    "What products do you recommend?",
    "How can I reduce stress for better hair?",
    "Is my diet affecting my hair?",
    "I'm not seeing enough progress",
    "How can I prevent breakage?",
  ]

  const handleSuggestedTopicClick = (topic: string) => {
    setInput(topic)
    handleSend(topic)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    // Keywords to match in user messages
    const keywords = {
      thinning: [
        "I understand your concern about thinning hair. This is a common issue that can be caused by various factors including genetics, stress, and nutritional deficiencies. Our analysis of your progress photos shows some improvement in density. Would you like me to suggest some specific treatments that might help?",
        "Hair thinning can be emotionally challenging. Many of our users have reported good results with our Revitalizing Shampoo combined with the Scalp Treatment Serum. Have you been consistent with your current regimen?",
        "I see you're concerned about thinning hair. Based on your profile, I notice you might benefit from our Hair Growth Supplements. They contain key ingredients like biotin, zinc, and vitamin D that support healthy hair growth. Would you like to learn more about how these supplements work?",
      ],
      breakage: [
        "Hair breakage is often a sign of damage or protein deficiency. Based on your profile, I'd recommend our Protein Treatment Mask once a week. Also, try to minimize heat styling and use a silk pillowcase to reduce friction while you sleep.",
        "I see you're concerned about breakage. Looking at your recent uploads, there's been a 15% reduction in breakage since you started. That's great progress! Continue with the protein treatments and consider adding our Hair Growth Supplements for additional support.",
        "To address breakage, I recommend focusing on three key areas: 1) Using our Protein Treatment Mask weekly, 2) Avoiding heat styling tools, and 3) Sleeping on a silk pillowcase. Would you like me to explain how each of these helps prevent breakage?",
      ],
      confidence: [
        "Hair issues can definitely impact confidence. Remember that you're taking positive steps by using BalDr, and our data shows that 87% of users report improved confidence after 3 months. Would you like to see some success stories from our community?",
        "It's completely normal to feel that way about your appearance. Hair is deeply connected to our self-image. Have you tried joining our community forums? Many users find that sharing their journey and seeing others' progress helps with the emotional aspects.",
        "I understand how hair concerns can affect self-esteem. Based on your progress photos, I can see definite improvements in your hair health. Would you like me to point out the specific positive changes I'm noticing? This can help boost your confidence in your journey.",
      ],
      progress: [
        "Based on your latest uploads, I can see definite improvement in your hair health! The density has increased by about 15% and there's better shine and texture. Your consistency with the recommended routine is really paying off.",
        "Your progress is actually ahead of the typical timeline we see. The combination of products you're using and your dietary changes are working well together. Would you like me to analyze which specific factors are contributing most to your success?",
        "Looking at your progress photos, I notice significant improvements in hair thickness and texture. The changes are particularly noticeable in your crown area. Would you like me to show you a side-by-side comparison of your progress?",
      ],
      diet: [
        "Diet plays a crucial role in hair health. Your profile shows you might benefit from more biotin-rich foods like eggs, nuts, and sweet potatoes. Our analysis suggests that increasing your protein and omega-3 intake could accelerate your results by up to 20%.",
        "I notice from your food diary that you've been consistent with the nutritional recommendations. The improved scalp health we're seeing is likely connected to your increased intake of zinc and vitamin E. Would you like more specific meal suggestions?",
        "Based on your dietary preferences, I can suggest some hair-friendly meal options that are rich in essential nutrients. Would you like me to share some recipes that are specifically designed to support hair growth?",
      ],
      stress: [
        "Stress can significantly impact hair health by increasing cortisol levels, which can push hair follicles into a resting phase. Have you been practicing the stress-reduction techniques in your personalized plan? Even 5 minutes of daily meditation can make a difference.",
        "I understand that stress management can be challenging. Based on your profile, I'd recommend trying our guided audio meditations specifically designed for hair health. Many users find that the evening scalp massage routine also helps reduce stress while promoting circulation.",
        "Let's work on managing stress together. I can guide you through a quick 5-minute meditation that's proven to help with hair health. Would you like to try it now? It's particularly effective when done before bedtime.",
      ],
      products: [
        "Looking at your hair type and concerns, I would recommend our Revitalizing Shampoo paired with the Nourishing Conditioner. For weekly treatment, the Protein Treatment Mask would address your breakage concerns. Would you like me to explain how to use these together?",
        "Based on your recent product questions, I think you might benefit from our Hair Growth Supplements alongside your topical treatments. The combination of internal and external support typically yields 30% better results than topical treatments alone.",
        "I've analyzed your hair profile and current routine. Here are my top 3 product recommendations that would work best for your specific needs. Would you like me to explain why each product is particularly suitable for you?",
      ],
      routine: [
        "A consistent routine is key to seeing results. For your specific hair type, I recommend washing with our sulfate-free shampoo 2-3 times weekly, using conditioner on mid-lengths to ends, and applying the Scalp Treatment Serum daily. Weekly deep conditioning will help with moisture balance.",
        "Looking at your routine logs, you've been very consistent! One suggestion to enhance your results would be to add a 5-minute scalp massage when applying your serum. This can increase absorption by up to 30% and stimulate blood flow to the follicles.",
        "I notice you're asking about hair routines. Based on your hair type and concerns, I can suggest a personalized daily and weekly routine that would work best for you. Would you like me to break it down step by step?",
      ],
      "not seeing enough progress": [
        "I understand your frustration about the progress. Let's analyze your current routine together. Sometimes small adjustments can make a big difference. Would you like me to review your recent progress photos and suggest specific changes?",
        "Progress can take time, but we can optimize your results. Based on your profile, I notice a few areas where we could enhance your routine. Would you like me to suggest some adjustments that might help speed up your progress?",
        "Let's look at what might be holding back your progress. I can see from your routine logs that we might be able to optimize your product usage and timing. Would you like me to analyze this in detail?",
      ],
      "self-conscious": [
        "It's completely normal to feel self-conscious about your hair. Many of our users have shared similar feelings. Would you like to hear some success stories from others who started in a similar situation?",
        "I understand how you're feeling. Remember that you're taking positive steps by using BalDr. Our community is full of supportive people who understand exactly what you're going through. Would you like to connect with them?",
        "Your feelings are valid. Let's focus on the progress you're making. I can see from your recent photos that there are positive changes happening. Would you like me to highlight these improvements to help boost your confidence?",
      ],
    }

    // Check for keywords in the user message
    for (const [key, responses] of Object.entries(keywords)) {
      if (userMessage.toLowerCase().includes(key)) {
        return responses[Math.floor(Math.random() * responses.length)]
      }
    }

    // Default responses if no keywords match
    const defaultResponses = [
      "Thank you for sharing that with me. Based on your hair profile and recent progress photos, I can see you're making good progress. Is there a specific aspect of your hair care journey you'd like to discuss today?",
      "I appreciate you opening up about your experience. Many BalDr users have similar concerns. Our data shows that consistent use of your personalized regimen typically shows visible results within 2-3 months. How are you feeling about your progress so far?",
      "That's valuable information for your hair care journey. Have you noticed any changes since starting your BalDr regimen? Even small improvements in texture or reduced shedding are positive signs.",
      "I understand how important this is to you. Looking at your recent uploads and progress data, I can see some positive changes beginning to happen. Would you like me to highlight the specific improvements I'm noticing?",
      "Based on what you've shared and your recent activity in the app, I'd recommend focusing on consistency with your current regimen for the next few weeks. Small, consistent steps often yield the best long-term results for hair health.",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = (messageText?: string) => {
    const textToSend = messageText || input
    if (textToSend.trim() === "") return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: textToSend,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Show typing indicator
    setIsTyping(true)

    // Get contextual response based on user input
    const aiResponseText = getAIResponse(textToSend)

    // Simulate AI response with typing effect
    setTimeout(() => {
      setIsTyping(false)

      const aiMessage: Message = {
        id: messages.length + 2,
        content: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Psychological Support Chat</h1>
        <p className="text-gray-500 mb-8">
          Talk about your emotional well-being and receive guidance to boost confidence
        </p>

        <Card className="border-baldr-yellow/20 mb-6">
          <CardContent className="p-0">
            <div className="bg-gray-900 p-4 flex items-center gap-3 border-b border-gray-800">
              <Avatar>
                <AvatarImage src="/logo.png" alt="BalDr AI" />
                <AvatarFallback className="bg-baldr-yellow text-black">AI</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-white">BalDr Support Assistant</h3>
                <p className="text-xs text-gray-400">Online • Responds instantly</p>
              </div>
            </div>

            <div className="h-[500px] overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex mb-4 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className="flex-shrink-0 mt-1">
                      {message.sender === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-baldr-yellow flex items-center justify-center">
                          <User className="h-4 w-4 text-black" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-baldr-yellow" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div
                        className={`p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-baldr-yellow text-black"
                            : "bg-gray-200 dark:bg-gray-800 text-foreground"
                        }`}
                      >
                        {message.content}
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : ""}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex mb-4 justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-baldr-yellow" />
                      </div>
                    </div>
                    <div>
                      <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-foreground">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSend()} className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-sm text-gray-600 dark:text-gray-300 hover:bg-baldr-yellow/10 hover:text-baldr-yellow"
                      onClick={() => handleSuggestedTopicClick(topic)}
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-baldr-yellow/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-baldr-yellow/10 p-2 rounded-full">
                  <Info className="h-5 w-5 text-baldr-yellow" />
                </div>
                <h3 className="font-semibold">How This Helps You</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Our AI assistant is trained to provide empathetic responses to help you navigate the emotional aspects
                of hair loss and recovery. Research shows that addressing the psychological impact of hair issues
                significantly improves treatment outcomes.
              </p>
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <Image src="/images/chat/support-illustration.png" alt="Psychological Support" fill className="object-cover object-center" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-baldr-yellow/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Suggested Topics</h3>
              <div className="space-y-3">
                <div 
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSuggestedTopicClick("I'm feeling anxious about my hair loss")}
                >
                  <p className="font-medium mb-1">Dealing with hair loss anxiety</p>
                  <p className="text-sm text-gray-500">Strategies to manage emotional responses to hair changes</p>
                </div>
                <div 
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSuggestedTopicClick("I need help building confidence during treatment")}
                >
                  <p className="font-medium mb-1">Building confidence during treatment</p>
                  <p className="text-sm text-gray-500">Tips for maintaining self-esteem while waiting for results</p>
                </div>
                <div 
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSuggestedTopicClick("How can I manage stress for better hair health?")}
                >
                  <p className="font-medium mb-1">Stress management techniques</p>
                  <p className="text-sm text-gray-500">Reduce stress that can contribute to hair issues</p>
                </div>
                <div 
                  className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSuggestedTopicClick("I want to celebrate my progress")}
                >
                  <p className="font-medium mb-1">Celebrating small victories</p>
                  <p className="text-sm text-gray-500">How to recognize and appreciate progress in your journey</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-baldr-yellow/20">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-4">Benefits of Psychological Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Emotional Support</h3>
                <p className="text-sm text-gray-500">
                  Our AI assistant is trained to provide empathetic responses to help you navigate the emotional aspects
                  of hair loss and recovery.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Confidence Building</h3>
                <p className="text-sm text-gray-500">
                  Receive guidance and affirmations to boost your self-esteem and confidence throughout your hair care
                  journey.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Stress Management</h3>
                <p className="text-sm text-gray-500">
                  Learn techniques to reduce stress, which can be a contributing factor to hair loss and slow recovery.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

