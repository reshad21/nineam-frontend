/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

const Dashboard = () => {
  const { user, logout } = useAuth()
  const [showProfile, setShowProfile] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const handleShopClick = (shopName:any) => {
    // Redirect to subdomain
    const currentPort = window.location.port
    const protocol = window.location.protocol
    const newUrl = `${protocol}//${shopName}.localhost:${currentPort}`
    window.open(newUrl, "_blank")
  }

  const handleLogout = () => {
    logout()
    setShowLogoutConfirm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{user?.username?.charAt(0).toUpperCase()}</span>
                </div>
                <span>Profile</span>
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm font-medium text-gray-900">Welcome, {user?.username}!</p>
                  </div>

                  <div className="px-4 py-3">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Your Shops:</h3>
                    <div className="space-y-2">
                      {user?.shops?.map((shop: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => handleShopClick(shop)}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          {shop}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t px-4 py-3">
                    <button
                      onClick={() => setShowLogoutConfirm(true)}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to your Dashboard!</h2>
              <p className="text-gray-600 mb-6">
                Click on the profile icon above to view your shops and navigate to them.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {user?.shops?.map((shop: string, index: number) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleShopClick(shop)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{shop}</h3>
                    <p className="text-gray-600 text-sm">Click to visit your shop</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Confirm Logout</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">Are you sure you want to logout?</p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
