"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Star, PlusCircle, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

type Product = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  rating: number
  recommended?: boolean
  bestseller?: boolean
  new?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Growth Shampoo",
    description: "Natural ingredients for healthy hair growth",
    price: 24.99,
    rating: 4.5,
    recommended: true,
    bestseller: true,
    image: "/images/products/product-1.jpg"
  },
  {
    id: "2",
    name: "Hydrating Conditioner",
    description: "Deep moisture for dry, damaged hair",
    price: 19.99,
    rating: 4.8,
    recommended: true,
    image: "/images/products/product-2.jpg"
  },
  {
    id: "3",
    name: "Scalp Treatment",
    description: "Soothes and nourishes the scalp",
    price: 29.99,
    rating: 4.2,
    new: true,
    image: "/images/products/product-3.jpg"
  },
  {
    id: "4",
    name: "Hair Growth Kit",
    description: "Complete solution for hair growth",
    price: 49.99,
    rating: 4.9,
    bestseller: true,
    image: "/images/products/product-4.jpg"
  },
  {
    id: "5",
    name: "Hair Growth Serum",
    description: "Advanced formula for maximum hair growth",
    price: 34.99,
    rating: 4.4,
    new: true,
    image: "/images/products/product-5.jpg"
  },
  {
    id: "6",
    name: "Scalp Care Oil",
    description: "Natural oils for scalp health and growth",
    price: 27.99,
    rating: 4.3,
    image: "/images/products/product-6.jpg"
  },
  {
    id: "7",
    name: "Hair Repair Mask",
    description: "Intensive repair treatment for damaged hair",
    price: 32.99,
    rating: 4.6,
    image: "/images/products/product-7.jpg"
  },
  {
    id: "8",
    name: "Hair Growth Bundle",
    description: "Complete hair growth starter kit",
    price: 19.99,
    rating: 4.2,
    image: "/images/products/product-8.jpg"
  }
]

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recommended")
  const { addItem } = useCart()

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">BalDr Shop</h1>
          <p className="text-gray-500">Discover products tailored to your specific hair care needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
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
                      placeholder="Search products..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Categories</label>
                  <div className="space-y-2">
                    {["All", "Shampoo", "Conditioner", "Treatment", "Supplements", "Tools", "Styling"].map(
                      (category) => (
                        <div key={category} className="flex items-center">
                          <input
                            type="checkbox"
                            id={category.toLowerCase()}
                            className="mr-2"
                            defaultChecked={category === "All"}
                          />
                          <label htmlFor={category.toLowerCase()} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                </div>

                <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">Apply Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="recommended">Recommended For You</TabsTrigger>
              <TabsTrigger value="bestsellers">Bestsellers</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="border-baldr-yellow/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="aspect-square relative bg-gray-100">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        {product.recommended && (
                          <Badge className="absolute top-2 right-2 bg-baldr-yellow text-black">Recommended</Badge>
                        )}
                        {product.bestseller && (
                          <Badge className="absolute top-2 left-2 bg-red-500 text-white">Bestseller</Badge>
                        )}
                        {product.new && <Badge className="absolute top-2 left-2 bg-green-500 text-white">New</Badge>}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                        <div className="flex items-center mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                          <Button
                            size="sm"
                            className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                            onClick={() => handleAddToCart(product)}
                          >
                            <PlusCircle className="h-4 w-4 mr-2" /> Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter((p) => p.recommended)
                  .map((product) => (
                    <Card key={product.id} className="border-baldr-yellow/20 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="aspect-square relative bg-gray-100">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-baldr-yellow text-black">Recommended</Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                              onClick={() => handleAddToCart(product)}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" /> Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="bestsellers" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter((p) => p.bestseller)
                  .map((product) => (
                    <Card key={product.id} className="border-baldr-yellow/20 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="aspect-square relative bg-gray-100">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-red-500 text-white">Bestseller</Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                              onClick={() => handleAddToCart(product)}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" /> Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts
                  .filter((p) => p.new)
                  .map((product) => (
                    <Card key={product.id} className="border-baldr-yellow/20 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="aspect-square relative bg-gray-100">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-green-500 text-white">New</Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating) ? "text-baldr-yellow fill-baldr-yellow" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90"
                              onClick={() => handleAddToCart(product)}
                            >
                              <PlusCircle className="h-4 w-4 mr-2" /> Add
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

