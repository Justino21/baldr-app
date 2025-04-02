"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  email: string
  name: string
  avatar: string
  role: string
}

interface AuthContextType {
  user: User | null
  signUp: (email: string, password: string, name: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored token and user data
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
      // Verify token with backend
      verifyToken(token)
    } else {
      setIsLoading(false)
    }
  }, [])

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Token verification failed")
      }

      const userData = await response.json()
      setUser(userData)
    } catch (error) {
      console.error("Token verification error:", error)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      console.log("Sending signup request:", { email, name })
      const response = await fetch("http://localhost:3001/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()
      console.log("Signup response:", data)

      if (!response.ok) {
        throw new Error(data.message || data.error || "Sign up failed")
      }

      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUser(data.user)
      
      // Navigate to home page after successful signup
      router.push("/")
    } catch (error) {
      console.error("Sign up error:", error)
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Sign in failed")
      }

      const data = await response.json()
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setUser(data.user)
      
      // Navigate to home page after successful signin
      router.push("/")
    } catch (error) {
      console.error("Sign in error:", error)
      throw error
    }
  }

  const signOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 