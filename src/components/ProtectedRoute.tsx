import { Navigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

import { ReactNode } from "react"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/signin" />
}

export default ProtectedRoute
