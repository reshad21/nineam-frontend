/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"
import toast from "react-hot-toast"

type AuthContextType = {
  user: any
  loading: boolean
  signup: (userData: any) => Promise<{ success: boolean; error?: string }>
  signin: (credentials: any) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signup: async (_userData: any) => ({ success: false }),
  signin: async (_credentials: any) => ({ success: false }),
  logout: () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

import { PropsWithChildren } from "react"

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const API_URL = "http://localhost:5000/api"

  // Set up axios defaults
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    }
  }, [])

  // Verify token on app load
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/verify`)
          setUser(response.data.user)
        } catch (error) {
          localStorage.removeItem("token")
          delete axios.defaults.headers.common["Authorization"]
        }
      }
      setLoading(false)
    }

    verifyToken()
  }, [])

  const signup = async (userData: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, userData)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(user)

      toast.success("Account created successfully!")
      return { success: true }
    } catch (error) {
      let message = "Signup failed"
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const signin = async (credentials: any) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signin`, credentials)
      const { token, user } = response.data

      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setUser(user)

      toast.success("Login successful!")
      return { success: true }
    } catch (error) {
      let message = "Login failed"
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message
      }
      toast.error(message)
      return { success: false, error: message }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    toast.success("Logged out successfully!")
  }

  const value = {
    user,
    loading,
    signup,
    signin,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
