import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"


import { AuthProvider, useAuth } from "./contexts/AuthContext"
import ShopDashboard from "./components/ShopDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import Dashboard from "./components/Dashboard"
import Signup from "./components/Signup"
import Signin from "./components/Signin"

function AppRoutes() {
  
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Check if we're on a subdomain
  const hostname = window.location.hostname
  const isSubdomain = hostname !== "localhost" && hostname.includes("localhost")

  if (isSubdomain) {
    const shopName = hostname.split(".")[0]
    return <ShopDashboard shopName={shopName} />
  }

  return (
    <Routes>
      <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
      <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <Signin />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to={user ? "/dashboard" : "/signin"} />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
