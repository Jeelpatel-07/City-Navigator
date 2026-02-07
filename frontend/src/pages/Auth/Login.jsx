// frontend/src/pages/Auth/Login.jsx - USER ONLY LOGIN ENABLED
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiShoppingBag, FiHome } from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Button from '../../components/Common/Button.jsx'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'customer',
    remember: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await login(
        formData.email,
        formData.password,
        formData.userType
      )

      if (result.success) {
        navigate(formData.userType === 'vendor' ? '/vendor' : '/')
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-xl">
            <span className="text-3xl text-white">🔐</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Sign in to access your account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Login Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Form Header */}
              <div className="p-8 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Sign In
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">New here?</span>
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Create account
                    </Link>
                  </div>
                </div>

                {/* User Type Selection */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-4">
                    <label className={`flex-1 min-w-[140px] cursor-pointer ${formData.userType === 'customer' ? 'opacity-100' : 'opacity-70'}`}>
                      <input
                        type="radio"
                        name="userType"
                        value="customer"
                        checked={formData.userType === 'customer'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 text-center transition-all ${formData.userType === 'customer' 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                        <div className="flex flex-col items-center">
                          <FiUser className="text-2xl mb-2" />
                          <span className="font-medium">Customer</span>
                          <span className="text-xs text-gray-500 mt-1">Find Services</span>
                        </div>
                      </div>
                    </label>

                    <label className={`flex-1 min-w-[140px] cursor-pointer ${formData.userType === 'vendor' ? 'opacity-100' : 'opacity-70'}`}>
                      <input
                        type="radio"
                        name="userType"
                        value="vendor"
                        checked={formData.userType === 'vendor'}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-4 rounded-xl border-2 text-center transition-all ${formData.userType === 'vendor' 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                        <div className="flex flex-col items-center">
                          <FiShoppingBag className="text-2xl mb-2" />
                          <span className="font-medium">Vendor</span>
                          <span className="text-xs text-gray-500 mt-1">Provide Services</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Password
                      </label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-blue-600 hover:text-blue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                        className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-700 dark:text-gray-300">
                        Remember me
                      </span>
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full py-4 text-lg font-semibold rounded-xl"
                    loading={loading}
                  >
                    Sign In
                  </Button>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                        Quick Login
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            {/* Info Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white shadow-xl">
              <div className="mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                  <FiHome className="text-2xl" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {formData.userType === 'vendor' ? 'Vendor Benefits' : 'Customer Benefits'}
                </h3>
                <p className="opacity-90">
                  {formData.userType === 'vendor' 
                    ? 'Manage your services, track bookings, and grow your business.'
                    : 'Book services, save favorites, and track your bookings.'}
                </p>
              </div>
              <ul className="space-y-3">
                {formData.userType === 'vendor' ? (
                  <>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Dashboard Analytics
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Service Management
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Customer Reviews
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Payment Tracking
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Easy Booking
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Service Tracking
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Reviews & Ratings
                    </li>
                    <li className="flex items-center">
                      <span className="mr-3">✓</span>
                      Secure Payments
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Sign Up Card */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                New to City Navigator?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Join our community to discover or provide amazing services.
              </p>
              <div className="space-y-4">
                <Link
                  to="/register"
                  className="block w-full text-center py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all"
                >
                  Sign Up as Customer
                </Link>
                <Link
                  to="/vendor/join"
                  className="block w-full text-center py-3 border-2 border-green-600 text-green-600 dark:border-green-500 dark:text-green-500 rounded-xl font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
                >
                  Become a Vendor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login