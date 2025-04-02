import { notFound } from "next/navigation"

const validCategories = [
  "shampoo",
  "conditioner",
  "treatment",
  "supplements",
  "bundles"
]

const categoryTitles = {
  shampoo: "Shampoos",
  conditioner: "Conditioners",
  treatment: "Treatments",
  supplements: "Supplements",
  bundles: "Bundles & Kits"
}

export default async function ShopCategoryPage({ params }: { params: { category: string } }) {
  const category = params.category.toLowerCase()
  
  if (!validCategories.includes(category)) {
    notFound()
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">{categoryTitles[category as keyof typeof categoryTitles]}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Placeholder for product grid */}
        <div className="text-center py-12">
          <p className="text-gray-500">Products coming soon!</p>
        </div>
      </div>
    </div>
  )
} 