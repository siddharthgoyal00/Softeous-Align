"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type UserRole = "admin" | "employee" | null
type User = {
  _id: string
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

    // Seed initial users if needed
    const seedUsers = async () => {
      try {
        await fetch("/api/seed", { method: "POST" })
      } catch (error) {
        console.error("Error seeding users:", error)
      }
    }

    seedUsers()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Authentication failed")
      }

      const data = await response.json()
      setUser(data.user)
      localStorage.setItem("hr-platform-user", JSON.stringify(data.user))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
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

