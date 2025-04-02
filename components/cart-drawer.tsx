"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Plus, Minus, X } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface CartDrawerProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, itemCount, subtotal } = useCart()
  const [isOpen, setIsOpen] = useState(open || false)

  // Update internal state when prop changes
  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  // Handle internal state changes
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  // Close drawer when escape key is pressed
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleOpenChange(false)
      }
    }
    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [onOpenChange])

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                <ShoppingBag className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="font-medium mb-1">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-4">Looks like you haven't added any products yet.</p>
              <Button className="bg-baldr-yellow text-black hover:bg-baldr-yellow/90" onClick={() => handleOpenChange(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-3 border-b">
                  <div className="relative w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">${item.price.toFixed(2)}</p>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <div className="w-10 h-8 flex items-center justify-center border-t border-b">{item.quantity}</div>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-auto">
            <div className="space-y-4">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-baldr-yellow text-black hover:bg-baldr-yellow/90">
                Proceed to Checkout
              </Button>
              <Button variant="outline" className="w-full" onClick={() => handleOpenChange(false)}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

