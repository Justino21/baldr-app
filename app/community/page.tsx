"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { MessageSquare, ThumbsUp, Star, Filter, Search, PlusCircle, Camera, MessageCircle, MoreVertical, Send, Share2, Heart, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import Link from "next/link"

type Post = {
  id: string
  author: {
    name: string
    avatar: string
    role: string
  }
  title: string
  content: string
  date: string
  likes: number
  comments: Comment[]
  tags: string[]
  image?: string
  beforeAfter?: {
    before: string
    after: string
  }
  gallery?: string[]
}

type Review = {
  id: number
  author: {
    name: string
    avatar: string
    role: string
  }
  rating: number
  title: string
  content: string
  date: string
  likes: number
  productName: string
  image?: string
  beforeAfter?: {
    before: string
    after: string
  }
}

interface Comment {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  likes: number
}

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("forum")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [showNewReviewForm, setShowNewReviewForm] = useState(false)
  const [postTitle, setPostTitle] = useState("")
  const [postContent, setPostContent] = useState("")
  const [postImage, setPostImage] = useState<File | null>(null)
  const [postImagePreview, setPostImagePreview] = useState<string | null>(null)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewContent, setReviewContent] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewProduct, setReviewProduct] = useState("")
  const [showNewPostDialog, setShowNewPostDialog] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [newComment, setNewComment] = useState("")
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "David Thompson",
        avatar: "/images/baldr/david.jpg",
        role: "Hair Growth Expert",
      },
      title: "My 6-Month Hair Growth Journey - From Receding Hairline to Full Coverage",
      content: "Hey guys! I'm excited to share my hair growth journey. After 6 months of following the BalDr program, I've seen incredible results with my receding hairline. Here's what worked for me:\n\n1. Daily scalp massages with essential oils\n2. High-protein diet with biotin supplements\n3. Weekly deep conditioning treatments\n4. Stress management through meditation\n\nWould love to hear your experiences and tips!",
      date: "3 hours ago",
      likes: 128,
      comments: [
        {
          id: "1",
          author: {
            name: "James Wilson",
            avatar: "/images/baldr/james.jpg",
          },
          content: "Your progress is amazing! How did you handle the initial shedding phase?",
          timestamp: "2 hours ago",
          likes: 12,
        },
        {
          id: "2",
          author: {
            name: "David Thompson",
            avatar: "/images/baldr/david.jpg",
          },
          content: "The shedding phase was tough, but I stuck with it. It lasted about 2-3 weeks for me. The key was to trust the process and keep up with the routine!",
          timestamp: "1 hour ago",
          likes: 8,
        },
      ],
      tags: ["Success Story", "Before & After", "Tips"],
      image: "/images/before-after/receding-hairline-after.jpg",
      beforeAfter: {
        before: "/images/before-after/receding-hairline-before.jpg",
        after: "/images/before-after/receding-hairline-after.jpg",
      },
    },
    {
      id: "2",
      author: {
        name: "Michael Chen",
        avatar: "/images/baldr/michael.jpg",
        role: "Community Member",
      },
      title: "Best Supplements for Male Pattern Baldness",
      content: "After trying various supplements, I've found these to be the most effective for male pattern baldness:\n\n1. DHT Blockers (Saw Palmetto)\n2. Biotin 10,000mcg daily\n3. Vitamin D3 5000IU\n4. Zinc 50mg\n5. Iron (if deficient)\n\nI've been taking these for 3 months and noticed significant improvement in hair thickness and reduced shedding. Has anyone else tried these?",
      date: "1 day ago",
      likes: 45,
      comments: [
        {
          id: "3",
          author: {
            name: "Alex Rodriguez",
            avatar: "/images/baldr/alex.jpg",
          },
          content: "The DHT blockers made a huge difference for me! How long did it take to see results?",
          timestamp: "1 day ago",
          likes: 15,
        },
      ],
      tags: ["Supplements", "Tips", "Question"],
      image: "/images/products/supplements.jpg",
    },
    {
      id: "3",
      author: {
        name: "Ryan Parker",
        avatar: "/images/baldr/ryan.jpg",
        role: "Premium Member",
      },
      title: "DIY Hair Growth Solutions for Men",
      content: "Here are my go-to DIY solutions that have helped with my hair growth:\n\n1. Onion Juice Treatment\n2. Rosemary Oil Massage\n3. Aloe Vera & Coconut Oil Mask\n\nI've included photos of the ingredients and results. Let me know if you'd like the recipes!",
      date: "2 days ago",
      likes: 89,
      comments: [],
      tags: ["DIY", "Hair Masks", "Tips"],
      image: "/images/products/onion-juice.jpg",
      gallery: [
        "/images/products/onion-juice.jpg",
        "/images/products/rosemary-oil.jpg",
        "/images/products/aloe-coconut.jpg",
      ],
    },
  ])

  const reviews: Review[] = [
    {
      id: 1,
      author: {
        name: "Chris Martinez",
        avatar: "/images/baldr/chris.jpg",
        role: "Ultimate Member",
      },
      rating: 5,
      title: "Revitalizing Shampoo for Men - Game Changer!",
      content:
        "I've tried countless products for my thinning hair, but nothing worked until I found the BalDr Revitalizing Shampoo. After just 2 months of use, my hair feels thicker and I'm seeing new growth. The formula is perfect for men's hair!",
      date: "1 week ago",
      likes: 53,
      productName: "Revitalizing Shampoo",
      beforeAfter: {
        before: "/images/before-after/shampoo-before.jpg",
        after: "/images/before-after/shampoo-after.jpg",
      },
    },
    {
      id: 2,
      author: {
        name: "Tom Anderson",
        avatar: "/images/baldr/tom.jpg",
        role: "Premium Member",
      },
      rating: 4,
      title: "Scalp Treatment Serum - Great for Male Pattern Baldness",
      content:
        "The Scalp Treatment Serum has been a game-changer for my receding hairline. My scalp feels healthier and I'm noticing less hair fall. The only reason for 4 stars instead of 5 is the slightly strong smell, but the results are worth it.",
      date: "2 weeks ago",
      likes: 41,
      productName: "Scalp Treatment Serum",
      image: "/images/products/scalp-treatment.jpg",
    },
    {
      id: 3,
      author: {
        name: "Mike Johnson",
        avatar: "/images/baldr/mike.jpg",
        role: "Ultimate Member",
      },
      rating: 5,
      title: "Hair Growth Supplements - Amazing Results!",
      content:
        "I was skeptical about supplements, but these really work! After 3 months, my hair is growing faster and feels stronger. Combined with the BalDr app recommendations, I'm seeing incredible improvement in my crown area.",
      date: "3 weeks ago",
      likes: 38,
      productName: "Hair Growth Supplements",
      image: "/images/products/supplements.jpg",
    },
    {
      id: 4,
      author: {
        name: "Steve Wilson",
        avatar: "/images/baldr/steve.jpg",
        role: "Basic Member",
      },
      rating: 3,
      title: "Protein Treatment Mask - Good but not great",
      content:
        "The mask definitely helps with breakage, but I haven't seen dramatic results yet. It's been about a month of weekly use. Will continue using to see if results improve over time.",
      date: "1 month ago",
      likes: 15,
      productName: "Protein Treatment Mask",
      image: "/images/products/protein-mask.jpg",
    },
  ]

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredReviews = reviews.filter(
    (review) =>
      review.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Separate state for different types of likes
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({})
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({})
  const [likedReviews, setLikedReviews] = useState<{ [key: string]: boolean }>({})
  const [postLikes, setPostLikes] = useState<{ [key: string]: number }>({})
  const [commentLikes, setCommentLikes] = useState<{ [key: string]: number }>({})
  const [reviewLikes, setReviewLikes] = useState<{ [key: string]: number }>({})

  const [reviewBeforeImage, setReviewBeforeImage] = useState<File | null>(null)
  const [reviewAfterImage, setReviewAfterImage] = useState<File | null>(null)
  const [reviewBeforePreview, setReviewBeforePreview] = useState<string | null>(null)
  const [reviewAfterPreview, setReviewAfterPreview] = useState<string | null>(null)

  const handleLikePost = (postId: string, currentLikes: number) => {
    const isLiked = likedPosts[postId]
    setLikedPosts(prev => ({
      ...prev,
      [postId]: !isLiked
    }))
    setPostLikes(prev => ({
      ...prev,
      [postId]: isLiked ? currentLikes : currentLikes + 1
    }))
  }

  const handleLikeComment = (commentId: string, currentLikes: number) => {
    const isLiked = likedComments[commentId]
    setLikedComments(prev => ({
      ...prev,
      [commentId]: !isLiked
    }))
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: isLiked ? currentLikes : currentLikes + 1
    }))
  }

  const handleLikeReview = (reviewId: string, currentLikes: number) => {
    const isLiked = likedReviews[reviewId]
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: !isLiked
    }))
    setReviewLikes(prev => ({
      ...prev,
      [reviewId]: isLiked ? currentLikes : currentLikes + 1
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size must be less than 10MB")
        return
      }
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }
      setPostImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPostImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReviewImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert("File size must be less than 10MB")
        return
      }
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file")
        return
      }
      if (type === 'before') {
        setReviewBeforeImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setReviewBeforePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setReviewAfterImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setReviewAfterPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleNewPost = () => {
    if (!postTitle.trim() || !postContent.trim()) return

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/images/baldr/default.jpg",
        role: "Community Member",
      },
      title: postTitle,
      content: postContent,
      date: "Just now",
      likes: 0,
      comments: [],
      tags: [],
      image: postImagePreview || undefined,
    }

    setPosts(prev => [newPost, ...prev])
    setPostTitle("")
    setPostContent("")
    setPostImage(null)
    setPostImagePreview(null)
    setShowNewPostDialog(false)
  }

  const handleNewReview = () => {
    if (reviewTitle.trim() === "" || reviewContent.trim() === "" || reviewProduct.trim() === "") return
    
    const newReview: Review = {
      id: reviews.length + 1,
      author: {
        name: "You",
        avatar: "/images/baldr/default.jpg",
        role: "Community Member",
      },
      rating: reviewRating,
      title: reviewTitle,
      content: reviewContent,
      date: "Just now",
      likes: 0,
      productName: reviewProduct,
      beforeAfter: reviewBeforePreview && reviewAfterPreview ? {
        before: reviewBeforePreview,
        after: reviewAfterPreview,
      } : undefined,
    }

    // In a real app, you would submit this to your backend
    alert("Review submitted successfully!")
    setReviewTitle("")
    setReviewContent("")
    setReviewProduct("")
    setReviewRating(5)
    setReviewBeforeImage(null)
    setReviewAfterImage(null)
    setReviewBeforePreview(null)
    setReviewAfterPreview(null)
    setShowNewReviewForm(false)
  }

  const handleNewComment = (postId: string) => {
    if (!newComment.trim()) return

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      author: {
        name: "You",
        avatar: "/images/baldr/default.jpg",
      },
      content: newComment,
      timestamp: "Just now",
      likes: 0,
    }

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [newCommentObj, ...post.comments],
            likes: post.likes // Preserve the likes count
          }
        : post
    ))
    setNewComment("")
  }

  // Add this new component for the star rating
  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className="focus:outline-none"
            type="button"
          >
            <Star
              className={`h-6 w-6 transition-colors ${
                star <= rating ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">BalDr Community</h1>
          <p className="text-gray-500">Connect with others, share your journey, and learn from experiences</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hover:text-baldr-yellow transition-colors">
            <Button variant="ghost" className="text-white hover:text-baldr-yellow">
              Log In
            </Button>
          </Link>
          <Link href="/signup" className="hover:text-baldr-yellow transition-colors">
            <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="border-baldr-yellow/20 sticky top-20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Filter className="h-4 w-4 text-gray-500" />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select defaultValue="recent">
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="comments">Most Comments</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {activeTab === "forum" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Topics</label>
                    <div className="space-y-2">
                      {[
                        "All Topics",
                        "Success Stories",
                        "Male Pattern Baldness",
                        "Tips & Advice",
                        "Product Discussion",
                        "Before & After",
                        "Hair Transplant",
                        "Minoxidil Experience",
                      ].map((topic) => (
                        <div key={topic} className="flex items-center">
                          <input
                            type="checkbox"
                            id={topic.toLowerCase().replace(/\s+/g, "-")}
                            className="mr-2"
                            defaultChecked={topic === "All Topics"}
                          />
                          <label htmlFor={topic.toLowerCase().replace(/\s+/g, "-")} className="text-sm">
                            {topic}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Product Categories</label>
                    <div className="space-y-2">
                      {[
                        "All Products",
                        "Men's Shampoos",
                        "DHT Blockers",
                        "Hair Growth Supplements",
                        "Scalp Treatments",
                        "Styling Products",
                        "Hair Transplant Tools",
                      ].map((category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={category.toLowerCase().replace(/\s+/g, "-")}
                            className="mr-2"
                            defaultChecked={category === "All Products"}
                          />
                          <label htmlFor={category.toLowerCase().replace(/\s+/g, "-")} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rating</label>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`rating-${rating}`}
                            className="mr-2"
                            defaultChecked={rating === 5}
                          />
                          <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < rating ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
                                }`}
                              />
                            ))}
                            {rating === 5 && <span className="ml-1 text-xs">& up</span>}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="forum" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="forum">Forum</TabsTrigger>
              <TabsTrigger value="reviews">Product Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="forum" className="mt-0">
              {showNewPostForm ? (
                <Card className="border-baldr-yellow/20 mb-6">
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        placeholder="Enter post title"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Content</label>
                      <Textarea
                        placeholder="Share your thoughts, questions, or experiences..."
                        className="min-h-[150px]"
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Add Image (Optional)</label>
                      <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                          />
                          <Label
                            htmlFor="image-upload"
                            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-baldr-yellow transition-colors"
                          >
                            {postImagePreview ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={postImagePreview}
                                  alt="Preview"
                                  width={800}
                                  height={600}
                                  className="object-cover rounded-lg"
                                />
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    setPostImage(null)
                                    setPostImagePreview(null)
                                    const input = document.getElementById("image-upload") as HTMLInputElement
                                    if (input) input.value = ""
                                  }}
                                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="text-center">
                                <Camera className="h-8 w-8 mx-auto text-gray-400" />
                                <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                              </div>
                            )}
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tags" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="success-story">Success Story</SelectItem>
                          <SelectItem value="question">Question</SelectItem>
                          <SelectItem value="tips">Tips & Advice</SelectItem>
                          <SelectItem value="before-after">Before & After</SelectItem>
                          <SelectItem value="product">Product Discussion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90" onClick={() => setShowNewPostDialog(true)}>
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredPosts.map((post) => (
                    <Card key={post.id} className="border-baldr-yellow/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar className="h-10 w-10 ring-2 ring-baldr-yellow/20">
                            <AvatarImage 
                              src={post.author.avatar} 
                              alt={post.author.name}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/images/baldr/default.jpg";
                              }}
                            />
                            <AvatarFallback className="bg-gradient-to-r from-baldr-yellow to-orange-500 text-white">
                              {post.author.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{post.author.name}</h3>
                            <p className="text-xs text-gray-500">{post.author.role}</p>
                          </div>
                          <p className="text-xs text-gray-500 ml-auto">{post.date}</p>
                        </div>

                        <div className="space-y-4">
                          <h2 className="text-2xl font-bold bg-gradient-to-r from-baldr-yellow to-orange-500 bg-clip-text text-transparent">{post.title}</h2>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{post.content}</p>

                          {/* Single Image */}
                          {post.image && !post.beforeAfter && !post.gallery && (
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                              <Image
                                src={post.image}
                                alt="Post image"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          )}

                          {/* Before & After */}
                          {post.beforeAfter && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-500">Before</p>
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                  <Image
                                    src={post.beforeAfter.before || "/images/products/onion-juice.jpg"}
                                    alt="Before"
                                    fill
                                    className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-500">After</p>
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                  <Image
                                    src={post.beforeAfter.after || "/images/products/onion-juice.jpg"}
                                    alt="After"
                                    fill
                                    className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Image Gallery */}
                          {post.gallery && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {post.gallery.map((image, index) => (
                                <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                  <Image
                                    src={image || "/images/products/biotin-collagen-supplements.jpg"}
                                    alt={`Gallery image ${index + 1}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gradient-to-r from-baldr-yellow/10 to-orange-500/10 text-gray-800 hover:from-baldr-yellow/20 hover:to-orange-500/20 transition-colors border-baldr-yellow/20"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-8 space-y-6">
                          <h3 className="text-lg font-semibold text-gray-800">Comments</h3>
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="flex gap-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl">
                              <Avatar className="h-8 w-8">
                                <AvatarImage 
                                  src={comment.author.avatar} 
                                  alt={comment.author.name}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/baldr/default.jpg";
                                  }}
                                />
                                <AvatarFallback className="bg-gradient-to-r from-baldr-yellow to-orange-500 text-white">
                                  {comment.author.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{comment.author.name}</h4>
                                  <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">{comment.content}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button 
                                    className={`flex items-center gap-1 text-xs text-gray-500 hover:text-baldr-yellow ${
                                      likedComments[comment.id] ? "text-primary hover:text-primary/80" : ""
                                    }`}
                                    onClick={() => handleLikeComment(comment.id, comment.likes)}
                                  >
                                    <ThumbsUp className={`h-3 w-3 ${
                                      likedComments[comment.id] ? "fill-current" : ""
                                    }`} />
                                    <span>{commentLikes[comment.id] || comment.likes}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                          
                          {/* New Comment Input */}
                          <div className="flex gap-4 mt-4">
                            <Avatar className="h-8 w-8">
                              <AvatarImage 
                                src="/images/baldr/default.jpg" 
                                alt="You"
                              />
                              <AvatarFallback className="bg-gradient-to-r from-baldr-yellow to-orange-500 text-white">Y</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                              <Input
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleNewComment(post.id)
                                  }
                                }}
                              />
                              <Button 
                                size="icon"
                                className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                                onClick={() => handleNewComment(post.id)}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`text-gray-500 hover:text-baldr-yellow ${
                              likedPosts[post.id] ? "text-primary hover:text-primary/80" : ""
                            }`}
                            onClick={() => handleLikePost(post.id, post.likes)}
                          >
                            <ThumbsUp className={`h-4 w-4 mr-1 ${
                              likedPosts[post.id] ? "fill-current" : ""
                            }`} /> {postLikes[post.id] || post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-baldr-yellow">
                            <Share2 className="h-4 w-4 mr-1" /> Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              {showNewReviewForm ? (
                <Card className="border-baldr-yellow/20 mb-6">
                  <CardHeader>
                    <CardTitle>Write a Product Review</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Product</label>
                      <Select value={reviewProduct} onValueChange={setReviewProduct}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="revitalizing-shampoo">Men's Revitalizing Shampoo</SelectItem>
                          <SelectItem value="scalp-treatment">Scalp Treatment Serum</SelectItem>
                          <SelectItem value="hair-growth-supplements">Hair Growth Supplements</SelectItem>
                          <SelectItem value="protein-treatment">Protein Treatment Mask</SelectItem>
                          <SelectItem value="dht-blocker">DHT Blocker Serum</SelectItem>
                          <SelectItem value="minoxidil">Minoxidil Solution</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Rating</label>
                      <StarRating rating={reviewRating} onRatingChange={setReviewRating} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Review Title</label>
                      <Input
                        placeholder="Summarize your experience"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Review</label>
                      <Textarea
                        placeholder="Share your experience with this product..."
                        className="min-h-[150px]"
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Add Images (Optional)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">Before</p>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleReviewImageUpload(e, 'before')}
                              className="hidden"
                              id="review-before-upload"
                            />
                            <Label
                              htmlFor="review-before-upload"
                              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-baldr-yellow transition-colors"
                            >
                              {reviewBeforePreview ? (
                                <div className="relative w-full h-full">
                                  <Image
                                    src={reviewBeforePreview}
                                    alt="Before Preview"
                                    width={800}
                                    height={600}
                                    className="object-cover rounded-lg"
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setReviewBeforeImage(null)
                                      setReviewBeforePreview(null)
                                      const input = document.getElementById("review-before-upload") as HTMLInputElement
                                      if (input) input.value = ""
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Camera className="h-8 w-8 mx-auto text-gray-400" />
                                  <p className="mt-2 text-sm text-gray-500">Upload Before Image</p>
                                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-500">After</p>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleReviewImageUpload(e, 'after')}
                              className="hidden"
                              id="review-after-upload"
                            />
                            <Label
                              htmlFor="review-after-upload"
                              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-baldr-yellow transition-colors"
                            >
                              {reviewAfterPreview ? (
                                <div className="relative w-full h-full">
                                  <Image
                                    src={reviewAfterPreview}
                                    alt="After Preview"
                                    width={800}
                                    height={600}
                                    className="object-cover rounded-lg"
                                  />
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setReviewAfterImage(null)
                                      setReviewAfterPreview(null)
                                      const input = document.getElementById("review-after-upload") as HTMLInputElement
                                      if (input) input.value = ""
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Camera className="h-8 w-8 mx-auto text-gray-400" />
                                  <p className="mt-2 text-sm text-gray-500">Upload After Image</p>
                                  <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setShowNewReviewForm(false)}>
                        Cancel
                      </Button>
                      <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90" onClick={handleNewReview}>
                        Submit Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {filteredReviews.map((review) => (
                    <Card key={review.id} className="border-baldr-yellow/20">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <Avatar>
                            <AvatarImage 
                              src={review.author.avatar} 
                              alt={review.author.name}
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/images/baldr/default.jpg";
                              }}
                            />
                            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{review.author.name}</h3>
                            <p className="text-xs text-gray-500">{review.author.role}</p>
                          </div>
                          <p className="text-xs text-gray-500 ml-auto">{review.date}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-gradient-to-r from-baldr-yellow/10 to-orange-500/10 text-gray-800 border-baldr-yellow/20">
                              {review.productName}
                            </Badge>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <h2 className="text-2xl font-bold bg-gradient-to-r from-baldr-yellow to-orange-500 bg-clip-text text-transparent">
                            {review.title}
                          </h2>
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                            {review.content}
                          </p>

                          {/* Single Image */}
                          {review.image && !review.beforeAfter && (
                            <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                              <Image
                                src={review.image || "/images/products/biotin-collagen-supplements.jpg"}
                                alt="Review image"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          )}

                          {/* Before & After */}
                          {review.beforeAfter && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-500">Before</p>
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                  <Image
                                    src={review.beforeAfter.before || "/images/products/onion-juice.jpg"}
                                    alt="Before"
                                    fill
                                    className="object-cover object-[center_30%] scale-110 hover:scale-115 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-sm font-semibold text-gray-500">After</p>
                                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                                  <Image
                                    src={review.beforeAfter.after || "/images/products/onion-juice.jpg"}
                                    alt="After"
                                    fill
                                    className="object-cover object-[center_30%] hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-100">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`text-gray-500 hover:text-baldr-yellow ${
                              likedReviews[review.id.toString()] ? "text-primary hover:text-primary/80" : ""
                            }`}
                            onClick={() => handleLikeReview(review.id.toString(), review.likes)}
                          >
                            <ThumbsUp className={`h-4 w-4 mr-1 ${
                              likedReviews[review.id.toString()] ? "fill-current" : ""
                            }`} /> {reviewLikes[review.id.toString()] || review.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-baldr-yellow">
                            <Share2 className="h-4 w-4 mr-1" /> Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community.{" "}
              <Link href="/signup" className="text-baldr-yellow hover:underline">
                Sign up
              </Link>{" "}
              to post.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Give your post a title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label>Add Image (Optional)</Label>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <Label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-baldr-yellow transition-colors"
                  >
                    {postImagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={postImagePreview}
                          alt="Preview"
                          width={800}
                          height={600}
                          className="object-cover rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            setPostImage(null)
                            setPostImagePreview(null)
                            const input = document.getElementById("image-upload") as HTMLInputElement
                            if (input) input.value = ""
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Camera className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Add Tags</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="success-story">Success Story</SelectItem>
                  <SelectItem value="before-after">Before & After</SelectItem>
                  <SelectItem value="tips">Tips & Advice</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="product">Product Discussion</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowNewPostDialog(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNewPost}
                className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                disabled={!postTitle.trim() || !postContent.trim()}
              >
                <Send className="h-4 w-4 mr-2" /> Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

