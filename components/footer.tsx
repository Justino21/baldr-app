import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Footer = () => {
  return (
    <footer className="bg-baldr-black text-white">
      <div className="container py-12">
        {/* Newsletter Section */}
        <div className="bg-gray-900 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-2 text-baldr-yellow">Stay Updated</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest hair care tips, product updates, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-gray-800 border-gray-700 text-white" />
              <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Image src="/logo.png" alt="BalDr Logo" width={50} height={50} />
              <span className="text-2xl font-bold text-baldr-yellow">BalDr</span>
            </div>
            <p className="text-sm text-gray-400">
              Holistic, budget-friendly hair care solution powered by AI. Our 24/7 virtual assistant provides real-time,
              personalized recommendations and instant support.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-baldr-yellow">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-baldr-yellow">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-baldr-yellow">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-baldr-yellow">
                <Youtube size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-baldr-yellow">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-baldr-yellow">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/progress" className="text-gray-400 hover:text-baldr-yellow">
                  Progress Tracking
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-gray-400 hover:text-baldr-yellow">
                  Psychological Support
                </Link>
              </li>
              <li>
                <Link href="/ask" className="text-gray-400 hover:text-baldr-yellow">
                  Ask Section
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-400 hover:text-baldr-yellow">
                  Personalized Guide
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-400 hover:text-baldr-yellow">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-baldr-yellow">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-baldr-yellow">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-baldr-yellow">
                  Shampoos
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-baldr-yellow">
                  Conditioners
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-baldr-yellow">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-baldr-yellow">
                  Supplements
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-baldr-yellow">
                  Bundles & Kits
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-baldr-yellow">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-baldr-yellow">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-baldr-yellow">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-baldr-yellow">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-baldr-yellow">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-baldr-yellow">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} BalDr. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

