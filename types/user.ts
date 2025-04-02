export interface User {
  id: string
  email: string
  password: string // In a real app, this would be hashed
  name: string
  avatar: string
  role: string
  createdAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
} 