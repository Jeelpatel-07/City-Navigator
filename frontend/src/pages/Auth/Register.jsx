// frontend/src/pages/Auth/Register.jsx - BACKEND CONNECTED
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiUser, FiMail, FiLock, FiCheck, FiPhone, FiMapPin, FiShoppingBag } from 'react-icons/fi'
import Button from '../../components/Common/Button.jsx'
import { authService } from '../../services/api.js'
import './Auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    subscribe: true
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validateStep = (stepNum) => {
    const newErrors = {}

    if (stepNum === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid email required'
      if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits'
    }

    if (stepNum === 2) {
      if (formData.password.length < 6) newErrors.password = 'Min 6 characters'
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = 'Passwords do not match'
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => validateStep(step) && setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  // ================= REGISTER USER =================
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('REGISTER SUBMIT CLICKED');
    if (!validateStep(2)) return

    try {
      setLoading(true)

      await authService.register({
        fullName: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      })

      alert('🎉 Registration successful! Please login.')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }
  const steps = [
  { number: 1, title: 'Personal Info', icon: '👤' },
  { number: 2, title: 'Account Setup', icon: '🔐' }
]

  /* 🔽 UI BELOW IS 100% UNCHANGED 🔽 */
  return (
    /* —— KEEP YOUR EXISTING JSX EXACTLY —— */
    /* (NO UI REMOVED – already validated) */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-xl">
            <span className="text-3xl text-white">🚀</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-3">
            Join City Navigator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Create your account to discover amazing services
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Progress Steps */}
          <div className="p-8 border-b border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Create Customer Account
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  Step {step} of 2: {steps[step - 1]?.title}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Already have account?</span>
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>

            <div className="flex justify-between relative max-w-md mx-auto">
              {steps.map((stepItem) => (
                <div key={stepItem.number} className="flex flex-col items-center z-10">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${
                    step >= stepItem.number
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg scale-110'
                      : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400'
                  }`}>
                    <span className="text-xl">{stepItem.icon}</span>
                  </div>
                  <span className={`mt-3 text-sm font-medium ${
                    step >= stepItem.number
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {stepItem.title}
                  </span>
                </div>
              ))}
              {/* Progress line */}
              <div className="absolute top-7 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 -z-10">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500 rounded-full"
                  style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                        placeholder="John Doe"
                      />
                    </div>
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="9876543210"
                          maxLength="10"
                        />
                      </div>
                      {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Address
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute left-4 top-4 transform -translate-y-1/2 text-gray-400" />
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        placeholder="Your address (optional)"
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Password *
                      </label>
                      <div className="relative">
                        <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password}</p>}
                      <p className="mt-2 text-xs text-gray-500">Minimum 6 characters</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <FiCheck className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-4 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                          }`}
                          placeholder="••••••••"
                        />
                      </div>
                      {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-5 w-5 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                          Privacy Policy
                        </Link>
                        {errors.agreeTerms && <span className="block text-red-600 mt-1">{errors.agreeTerms}</span>}
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        name="subscribe"
                        checked={formData.subscribe}
                        onChange={handleChange}
                        className="h-5 w-5 mt-1 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        Subscribe to newsletter for updates and offers
                      </span>
                    </label>
                  </div>

                  {/* Benefits */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">
                      🎉 Welcome Benefits
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        Get ₹100 credit on first booking
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        Priority customer support
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        Save favorite services
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">✓</span>
                        Track booking history
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    ← Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 2 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all"
                  >
                    Continue →
                  </button>
                ) : (
                  <Button
                    type="submit"
                    loading={loading}
                    className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all text-lg"
                  >
                    🚀 Create Account
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Vendor CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Want to provide services and grow your business?
          </p>
          <Link
            to="/vendor/join"
            className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 dark:border-green-500 dark:text-green-500 rounded-xl font-medium hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"
          >
            <FiShoppingBag className="mr-2" />
            Become a Vendor
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register