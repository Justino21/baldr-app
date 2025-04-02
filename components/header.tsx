"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBag } from "lucide-react"
import { usePathname } from "next/navigation"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/contexts/AuthContext"

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount } = useCart()
  const { user, signOut } = useAuth()

  // Simplified navigation with dropdown categories
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    {
      name: "Features",
      href: "#",
      dropdown: [
        { name: "Progress Tracker", href: "/progress" },
        { name: "AI Chat", href: "/chat" },
        { name: "Ask BalDr", href: "/ask" },
        { name: "Personalized Guide", href: "/guide" },
      ],
    },
    { name: "Community", href: "/community" },
    { name: "Contact", href: "/contact" },
  ]

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="BalDr Logo" width={40} height={40} />
            <span className="text-xl font-bold text-baldr-yellow">BalDr</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <div key={item.name} className="relative group">
              {item.dropdown ? (
                <>
                  <button
                    className={`text-sm font-medium transition-colors hover:text-baldr-yellow flex items-center ${
                      pathname.startsWith(item.href) ? "text-baldr-yellow" : "text-foreground"
                    }`}
                    onClick={() => toggleDropdown(item.name)}
                  >
                    {item.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  {activeDropdown === item.name && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className={`block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              pathname === subItem.href
                                ? "text-baldr-yellow font-medium"
                                : "text-gray-700 dark:text-gray-200"
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-baldr-yellow ${
                    pathname === item.href ? "text-baldr-yellow" : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Cart button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-baldr-yellow text-xs font-medium flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          {/* Auth buttons */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">
                Welcome, {user.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="text-sm"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div>
                    <button
                      className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-foreground hover:text-baldr-yellow"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      {item.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`ml-2 h-4 w-4 transition-transform ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </button>
                    {activeDropdown === item.name && (
                      <div className="pl-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-baldr-yellow"
                            onClick={() => {
                              setActiveDropdown(null)
                              setIsMenuOpen(false)
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-foreground hover:text-baldr-yellow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </header>
  )
}

export default Header

