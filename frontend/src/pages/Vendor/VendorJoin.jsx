// frontend/src/pages/Vendor/VendorJoin.jsx - UPDATED WITH AUTH INTEGRATION
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from "../../contexts/AuthContext";

const VendorJoin = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    address: '',
    serviceCategory: '',
    businessName: '',
    description: '',
    serviceAreas: [],
    pricingType: 'hourly',
    hourlyRate: '',
    agreeTerms: false,
    agreeCommission: false
  })
  const [loading, setLoading] = useState(false)

  // Service categories
  const serviceCategories = [
    { id: 'electrician', name: 'Electrician ⚡', icon: '⚡' },
    { id: 'plumber', name: 'Plumber 🚰', icon: '🚰' },
    { id: 'painter', name: 'Painter 🎨', icon: '🎨' },
    { id: 'carpenter', name: 'Carpenter 🔨', icon: '🔨' },
    { id: 'mechanic', name: 'Mechanic 🔧', icon: '🔧' },
    { id: 'ac', name: 'AC Repair ❄️', icon: '❄️' },
    { id: 'cleaning', name: 'Cleaning 🧹', icon: '🧹' },
    { id: 'salon', name: 'Salon & Spa 💇', icon: '💇' },
    { id: 'catering', name: 'Catering 🍲', icon: '🍲' },
    { id: 'laundry', name: 'Laundry 👕', icon: '👕' },
    { id: 'pest', name: 'Pest Control 🐛', icon: '🐛' },
    { id: 'other', name: 'Other Service 📦', icon: '📦' }
  ]

  // Service areas
  const serviceAreas = [
    'Race Course', 'Kalawad Road', 'University Road', '150ft Ring Road',
    'Nana Mava Road', 'Mavdi', 'Gandhigram', 'Karanpara', 'Jagnath Plot',
    'Sadar', 'Bhaktinagar', 'Mahika', 'All Areas'
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const toggleServiceArea = (area) => {
    setFormData(prev => {
      const areas = prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter(a => a !== area)
        : [...prev.serviceAreas, area]
      return { ...prev, serviceAreas: areas }
    })
  }

  const validateStep = (stepNum) => {
    switch(stepNum) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone) {
          alert('Please fill all required fields')
          return false
        }
        return true
      case 2:
        if (!formData.serviceCategory) {
          alert('Please select a service category')
          return false
        }
        return true
      case 3:
        if (!formData.businessName || !formData.description) {
          alert('Please fill business details')
          return false
        }
        return true
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setStep(prev => prev - 1)
    window.scrollTo(0, 0)
  }

  
const { registerVendor } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.agreeTerms || !formData.agreeCommission) {
    alert("Please accept terms");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/vendor/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: "vendor@123", // later make real password step
        businessName: formData.businessName,
        serviceCategory: formData.serviceCategory,
        description: formData.description,
        serviceAreas: formData.serviceAreas,
        pricingType: formData.pricingType,
        hourlyRate: formData.hourlyRate,
        experience: formData.experience
      })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    alert("Vendor registered successfully. Please login.");
    window.location.href = "/login";
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};



  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Service Type', icon: '🛠️' },
    { number: 3, title: 'Business Details', icon: '🏢' },
    { number: 4, title: 'Confirmation', icon: '✓' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl mb-6 shadow-xl">
            <span className="text-3xl">🏪</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            Join as a Service Provider
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Grow your business by reaching thousands of customers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">24h</div>
            <div className="text-gray-600 dark:text-gray-400">Verification</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">15%</div>
            <div className="text-gray-600 dark:text-gray-400">Commission</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Active Vendors</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow text-center">
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">₹5L+</div>
            <div className="text-gray-600 dark:text-gray-400">Monthly Earnings</div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex justify-between relative">
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

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Personal Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tell us about yourself
                  </p>
                </div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Years of Experience
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Full address with landmark"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Service Category */}
            {step === 2 && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Select Your Service
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Choose your primary service category
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {serviceCategories.map((category) => (
                    <label
                      key={category.id}
                      className={`relative cursor-pointer transition-all duration-300 ${
                        formData.serviceCategory === category.id
                          ? 'transform scale-105'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="serviceCategory"
                        value={category.id}
                        checked={formData.serviceCategory === category.id}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div className={`p-6 rounded-xl border-2 flex flex-col items-center justify-center transition-all h-full ${
                        formData.serviceCategory === category.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                          : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}>
                        <div className="text-3xl mb-3">
                          {category.icon}
                        </div>
                        <span className="font-bold text-gray-800 dark:text-gray-300 text-center">
                          {category.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Business Details */}
            {step === 3 && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Business Details
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Tell customers about your business
                  </p>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Business/Service Name *
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Expert Plumbing Services"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Service Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe your services in detail..."
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                      Service Areas (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {serviceAreas.map((area) => (
                        <label
                          key={area}
                          className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <input
                            type="checkbox"
                            checked={formData.serviceAreas.includes(area)}
                            onChange={() => toggleServiceArea(area)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-gray-700 dark:text-gray-300">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Pricing Type
                      </label>
                      <select
                        name="pricingType"
                        value={formData.pricingType}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                      >
                        <option value="hourly">Hourly Rate</option>
                        <option value="fixed">Fixed Price</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        {formData.pricingType === 'hourly' ? 'Hourly Rate (₹)' : 'Service Charge (₹)'}
                      </label>
                      <input
                        type="number"
                        name="hourlyRate"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                        placeholder="e.g., 500"
                        min="0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Review & Submit
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Review your information and submit
                  </p>
                </div>
                <div className="space-y-8">
                  {/* Application Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6">
                    <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                      Application Summary
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                          <p className="font-medium">{formData.fullName || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                          <p className="font-medium">{formData.email || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                          <p className="font-medium">{formData.phone || "Not provided"}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Service</p>
                          <p className="font-medium">
                            {serviceCategories.find(c => c.id === formData.serviceCategory)?.name || "Not selected"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Business</p>
                          <p className="font-medium">{formData.businessName || "Not provided"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Service Areas</p>
                          <p className="font-medium">
                            {formData.serviceAreas.length > 0
                              ? formData.serviceAreas.join(', ')
                              : "Not selected"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                        className="h-5 w-5 text-blue-600 rounded mt-1"
                      />
                      <label htmlFor="agreeTerms" className="ml-3 text-gray-700 dark:text-gray-300">
                        I agree to the{' '}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="agreeCommission"
                        checked={formData.agreeCommission}
                        onChange={(e) => setFormData({...formData, agreeCommission: e.target.checked})}
                        className="h-5 w-5 text-blue-600 rounded mt-1"
                      />
                      <label htmlFor="agreeCommission" className="ml-3 text-gray-700 dark:text-gray-300">
                        I agree to the 15% service commission on all bookings
                      </label>
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                        <span className="text-2xl">✓</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark:text-white">
                          What happens next?
                        </h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                          <li>✓ Verification within 24 hours</li>
                          <li>✓ Welcome email with dashboard access</li>
                          <li>✓ Start accepting bookings</li>
                          <li>✓ Dedicated support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                  >
                    ← Previous
                  </button>
                ) : (
                  <div></div>
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-900 transition-all shadow-md"
                  >
                    Continue to Step {step + 1} →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-10 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg text-lg disabled:opacity-50"
                  >
                    {loading ? 'Submitting...' : '🚀 Submit Application'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-8 rounded-2xl shadow-lg border border-blue-100 dark:border-blue-800">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                Verified Badge
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get verified badge to build trust. Verified vendors get 5x more bookings.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 p-8 rounded-2xl shadow-lg border border-green-100 dark:border-green-800">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                Earn More
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Top vendors earn ₹50,000+ monthly. We handle payments and marketing.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-8 rounded-2xl shadow-lg border border-purple-100 dark:border-purple-800">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl text-white">🛠️</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">
                Business Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Free dashboard to manage bookings, payments, reviews, and customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorJoin