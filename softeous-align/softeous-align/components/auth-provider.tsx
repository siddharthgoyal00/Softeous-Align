"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type UserRole = "admin" | "employee" | null
type User = {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  position?: string
} | null

interface AuthContextType {
  user: User
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const MOCK_USERS = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123", // In a real app, passwords would be hashed
    role: "admin" as UserRole,
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "employee123",
    role: "employee" as UserRole,
    department: "Engineering",
    position: "Senior Developer",
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved user on initial load
  useEffect(() => {
    const savedUser = localStorage.getItem("hr-platform-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("hr-platform-user", JSON.stringify(userWithoutPassword))
    } else {
      throw new Error("Invalid email or password")
    }

    setIsLoading(false)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("hr-platform-user")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
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

