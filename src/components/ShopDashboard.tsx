/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import axios from "axios"

type ShopData = {
  owner: string
  isOwner: boolean
  // add other properties as needed
}

const ShopDashboard = ({ shopName }:{shopName: any}) => {
  const { user, loading: authLoading } = useAuth()
  const [shopData, setShopData] = useState<ShopData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchShopData = async () => {
      if (!user) return

      try {
        setLoading(true)
        const response = await axios.get(`http://localhost:5000/api/shops/${shopName}`)
        setShopData(response.data.shop)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to load shop data")
        } else if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("Failed to load shop data")
        }
      } finally {
        setLoading(false)
      }
    }

    if (!authLoading && user) {
      fetchShopData()
    }
  }, [shopName, user, authLoading])

  const goBackToDashboard = () => {
    window.location.href = "http://localhost:5173/dashboard"
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading shop data...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-4">Please sign in to access this shop.</p>
          <button
            onClick={() => (window.location.href = "http://localhost:5173/signin")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={goBackToDashboard} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">{shopName} Shop</h1>
            <button
              onClick={goBackToDashboard}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">This is {shopName} shop</h2>

              {shopData && (
                <div className="mt-8 space-y-4">
                  <p className="text-lg text-gray-600">
                    Shop Owner: <span className="font-semibold">{shopData.owner}</span>
                  </p>

                  {shopData.isOwner ? (
                    <div className="bg-green-50 border border-green-200 rounded-md p-4">
                      <p className="text-green-800">✅ You are the owner of this shop</p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <p className="text-blue-800">👀 You are viewing this shop as a visitor</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Shop Features Coming Soon</h3>
                <p className="text-gray-600">
                  This is where you would manage your shop inventory, orders, and customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ShopDashboard
