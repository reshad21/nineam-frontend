import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    shops: ["", "", ""],
  })
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleShopChange = (index: number, value: string) => {
    const newShops = [...formData.shops]
    newShops[index] = value
    setFormData((prev) => ({
      ...prev,
      shops: newShops,
    }))
  }

  const addShop = () => {
    setFormData((prev) => ({
      ...prev,
      shops: [...prev.shops, ""],
    }))
  }

  const removeShop = (index: number) => {
    if (formData.shops.length > 3) {
      const newShops = formData.shops.filter((_, i) => i !== index)
      setFormData((prev) => ({
        ...prev,
        shops: newShops,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Filter out empty shop names
    const filteredShops = formData.shops.filter((shop) => shop.trim() !== "")

    if (filteredShops.length < 3) {
      alert("Please provide at least 3 shop names")
      setLoading(false)
      return
    }

    const result = await signup({
      ...formData,
      shops: filteredShops,
    })

    if (result.success) {
      navigate("/dashboard")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Password (8+ chars, 1 number, 1 special char)"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shop Names (minimum 3 required)</label>
              {formData.shops.map((shop, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Shop ${index + 1}`}
                    value={shop}
                    onChange={(e) => handleShopChange(index, e.target.value)}
                  />
                  {formData.shops.length > 3 && (
                    <button
                      type="button"
                      onClick={() => removeShop(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addShop}
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Add Shop
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          <div className="text-center">
            <Link to="/signin" className="text-blue-600 hover:text-blue-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
