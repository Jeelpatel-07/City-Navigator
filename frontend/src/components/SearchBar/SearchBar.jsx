// frontend/src/components/SearchBar/SearchBar.jsx - UPDATED PROFESSIONAL VERSION
import { useState, useEffect } from 'react'
import { FiSearch, FiMapPin, FiGrid, FiBriefcase, FiChevronDown, FiCheck, FiNavigation } from 'react-icons/fi'
import { HiLocationMarker } from 'react-icons/hi'
import Button from '../Common/Button.jsx'
import './SearchBar.css'

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    city: '',
    serviceType: '',
    specificService: ''
  })

  const [isFocused, setIsFocused] = useState({
    city: false,
    serviceType: false,
    specificService: false
  })

  const [searchCount, setSearchCount] = useState(0)
  const [recentSearches, setRecentSearches] = useState([])

  // City options - Now with popular Indian cities
  const cities = [
    { value: '', label: ' Select Your City', emoji: '📍' },
    { value: 'rajkot', label: 'Rajkot', emoji: '🏙️' },
    { value: 'ahmedabad', label: 'Ahmedabad', emoji: '🏛️' },
    { value: 'surat', label: 'Surat', emoji: '💎' },
    { value: 'vadodara', label: 'Vadodara', emoji: '🎨' },
    { value: 'mumbai', label: 'Mumbai', emoji: '🌊' },
    { value: 'delhi', label: 'Delhi', emoji: '🏛️' },
    { value: 'bangalore', label: 'Bangalore', emoji: '🌳' },
    { value: 'hyderabad', label: 'Hyderabad', emoji: '💎' },
    { value: 'chennai', label: 'Chennai', emoji: '🎭' },
    { value: 'kolkata', label: 'Kolkata', emoji: '🎡' },
    { value: 'pune', label: 'Pune', emoji: '🎓' }
  ]

  // Service type options
  const serviceTypes = [
    { value: '', label: ' Select Service Type', emoji: '📋' },
    { value: 'general', label: 'General Places', emoji: '🏢', description: 'Restaurants, Hotels, Malls' },
    { value: 'local', label: 'Local Services', emoji: '👷', description: 'Electricians, Plumbers, Mechanics' }
  ]

  // Services based on type selection
  const generalPlaceServices = [
    { value: '', label: '🔍 Select Service', emoji: '🔍' },
    { value: 'restaurant', label: 'Restaurants', emoji: '🍽️', popular: true },
    { value: 'hotel', label: 'Hotels', emoji: '🏨', popular: true },
    { value: 'cafe', label: 'Cafes', emoji: '☕', popular: false },
    { value: 'mall', label: 'Shopping Malls', emoji: '🏬', popular: true },
    { value: 'gym', label: 'Gyms & Fitness', emoji: '🏋️', popular: false },
    { value: 'hospital', label: 'Hospitals', emoji: '🏥', popular: false },
    { value: 'pharmacy', label: 'Pharmacies', emoji: '💊', popular: false },
    { value: 'cinema', label: 'Movie Theaters', emoji: '🎬', popular: true },
    { value: 'park', label: 'Parks & Gardens', emoji: '🌳', popular: false }
  ]

  const localVendorServices = [
    { value: '', label: '🔍 Select Service', emoji: '🔍' },
    { value: 'electrician', label: 'Electrician', emoji: '⚡', popular: true },
    { value: 'plumber', label: 'Plumber', emoji: '🚰', popular: true },
    { value: 'carpenter', label: 'Carpenter', emoji: '🔨', popular: false },
    { value: 'mechanic', label: 'Mechanic', emoji: '🔧', popular: true },
    { value: 'painter', label: 'Painter', emoji: '🎨', popular: false },
    { value: 'cleaning', label: 'Cleaning Services', emoji: '🧹', popular: true },
    { value: 'salon', label: 'Salon & Spa', emoji: '💇', popular: true },
    { value: 'ac_repair', label: 'AC Repair', emoji: '❄️', popular: true },
    { value: 'laundry', label: 'Laundry Service', emoji: '👕', popular: false }
  ]

  // Get current service options based on selected type
  const getServiceOptions = () => {
    if (searchData.serviceType === 'general') {
      return generalPlaceServices
    } else if (searchData.serviceType === 'local') {
      return localVendorServices
    }
    return [{ value: '', label: 'First select service type', emoji: '⏳' }]
  }

  useEffect(() => {
    // Load recent searches from localStorage
    const savedSearches = JSON.parse(localStorage.getItem('recentSearches')) || []
    setRecentSearches(savedSearches)
    
    // Random search count for dynamic feel
    setSearchCount(Math.floor(Math.random() * 1000) + 500)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name === 'serviceType') {
      // Reset specific service when type changes
      setSearchData({
        ...searchData,
        [name]: value,
        specificService: ''
      })
    } else {
      setSearchData({
        ...searchData,
        [name]: value
      })
    }
  }

  const handleFocus = (field) => {
    setIsFocused({
      ...isFocused,
      [field]: true
    })
  }

  const handleBlur = (field) => {
    setIsFocused({
      ...isFocused,
      [field]: false
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!searchData.city || searchData.city === '') {
      alert('Please select a city')
      return
    }
    
    if (!searchData.serviceType || searchData.serviceType === '') {
      alert('Please select a service type')
      return
    }
    
    if (!searchData.specificService || searchData.specificService === '') {
      alert('Please select a specific service')
      return
    }

    // Get labels for display
    const cityLabel = cities.find(c => c.value === searchData.city)?.label || searchData.city
    const serviceTypeLabel = serviceTypes.find(s => s.value === searchData.serviceType)?.label || searchData.serviceType
    const serviceOptions = searchData.serviceType === 'general' ? generalPlaceServices : localVendorServices
    const specificServiceLabel = serviceOptions.find(s => s.value === searchData.specificService)?.label || searchData.specificService
    
    // Save to recent searches
    const searchItem = {
      city: cityLabel,
      service: specificServiceLabel,
      type: serviceTypeLabel,
      timestamp: new Date().toISOString()
    }
    
    const updatedSearches = [searchItem, ...recentSearches.slice(0, 4)]
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
    
    // Increment search count
    setSearchCount(prev => prev + 1)
    
    console.log('Searching:', searchData)
    alert(`Searching for ${specificServiceLabel} in ${cityLabel} (${serviceTypeLabel})`)
    
    // In a real app, you would redirect to services page with filters
    // window.location.href = `/services?city=${searchData.city}&type=${searchData.serviceType}&service=${searchData.specificService}`
  }

  // Quick city suggestions
  const popularCities = [
    { value: 'rajkot', label: 'Rajkot', emoji: '🏙️', isNearby: true },
    { value: 'ahmedabad', label: 'Ahmedabad', emoji: '🏛️', isNearby: true },
    { value: 'surat', label: 'Surat', emoji: '💎', isNearby: true },
    { value: 'mumbai', label: 'Mumbai', emoji: '🌊', isNearby: false }
  ]

  // Get popular services for current type
  const getPopularServices = () => {
    if (!searchData.serviceType) return []
    const services = searchData.serviceType === 'general' ? generalPlaceServices : localVendorServices
    return services.filter(service => service.popular && service.value !== '')
  }

  const handleQuickSelect = (type, value, label) => {
    setSearchData(prev => ({
      ...prev,
      [type]: value
    }))
  }

  return (
    <div className="w-full">
      {/* Dynamic Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 px-4 py-2 rounded-full mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
            {searchCount}+ searches today
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Local Excellence</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Find trusted services and premium establishments across India's top cities
        </p>
      </div>

      {/* Main Search Container */}
      <div className="relative">
        {/* Background Decoration */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
        
        <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
          {/* Quick City Suggestions */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <HiLocationMarker className="text-blue-600 dark:text-blue-400" />
                <h3 className="font-semibold text-gray-700 dark:text-gray-300">Nearby Cities</h3>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">Quick access</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {popularCities.map(city => (
                <button
                  key={city.value}
                  type="button"
                  onClick={() => handleQuickSelect('city', city.value)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                    searchData.city === city.value
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-200 dark:border-blue-700 shadow-md'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md'
                  }`}
                >
                  <span className="text-xl">{city.emoji}</span>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800 dark:text-gray-200">{city.label}</span>
                      {city.isNearby && (
                        <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                          Nearby
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {searchData.city === city.value ? 'Selected ✓' : 'Click to select'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Search Grid */}
          <form onSubmit={handleSearch} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* City Selection */}
              <div className="lg:col-span-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FiMapPin className="text-blue-600 dark:text-blue-400" />
                    Select City
                  </label>
                  <div className="relative">
                    <select
                      name="city"
                      value={searchData.city}
                      onChange={handleChange}
                      onFocus={() => handleFocus('city')}
                      onBlur={() => handleBlur('city')}
                      className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500"
                      required
                    >
                      {cities.map(city => (
                        <option key={city.value} value={city.value}>
                          {city.emoji} {city.label}
                        </option>
                      ))}
                    </select>
                    <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Service Type Selection */}
              <div className="lg:col-span-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FiGrid className="text-blue-600 dark:text-blue-400" />
                    Service Category
                  </label>
                  <div className="relative">
                    <select
                      name="serviceType"
                      value={searchData.serviceType}
                      onChange={handleChange}
                      onFocus={() => handleFocus('serviceType')}
                      onBlur={() => handleBlur('serviceType')}
                      className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-500"
                      required
                    >
                      {serviceTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.emoji} {type.label}
                        </option>
                      ))}
                    </select>
                    <FiGrid className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Specific Service Selection */}
              <div className="lg:col-span-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <FiBriefcase className="text-blue-600 dark:text-blue-400" />
                    Specific Service
                  </label>
                  <div className="relative">
                    <select
                      name="specificService"
                      value={searchData.specificService}
                      onChange={handleChange}
                      onFocus={() => handleFocus('specificService')}
                      onBlur={() => handleBlur('specificService')}
                      disabled={!searchData.serviceType}
                      className={`w-full px-4 py-3 pl-12 rounded-xl border appearance-none cursor-pointer transition-all duration-200 ${
                        !searchData.serviceType
                          ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400 dark:hover:border-blue-500'
                      }`}
                      required
                    >
                      {getServiceOptions().map(service => (
                        <option key={service.value} value={service.value}>
                          {service.emoji} {service.label}
                        </option>
                      ))}
                    </select>
                    <FiBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Popular Services Quick Select */}
            {searchData.serviceType && getPopularServices().length > 0 && (
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Popular in this category:
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Quick select
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getPopularServices().map(service => (
                    <button
                      key={service.value}
                      type="button"
                      onClick={() => handleQuickSelect('specificService', service.value)}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                        searchData.specificService === service.value
                          ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span>{service.emoji}</span>
                      <span>{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button Row */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {searchData.city && (
                    <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                      <FiCheck size={14} />
                      <span>{cities.find(c => c.value === searchData.city)?.label.replace('📍 ', '')}</span>
                    </div>
                  )}
                  {searchData.serviceType && (
                    <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                      <FiCheck size={14} />
                      <span>{serviceTypes.find(s => s.value === searchData.serviceType)?.label}</span>
                    </div>
                  )}
                  {searchData.specificService && (
                    <div className="flex items-center gap-1 text-sm text-purple-600 dark:text-purple-400">
                      <FiCheck size={14} />
                      <span>{getServiceOptions().find(s => s.value === searchData.specificService)?.label}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Button
                type="submit"
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <FiSearch size={18} />
                  <span>Search Now</span>
                </div>
              </Button>
            </div>
          </form>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Recent Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.slice(0, 3).map((search, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      // In a real app, this would trigger the same search
                      alert(`Searching ${search.service} in ${search.city}`)
                    }}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiNavigation size={12} className="text-gray-400" />
                    <span>{search.service} in {search.city}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Search Info */}
      <div className="mt-10 text-center">
        <div className="inline-flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>12+ major cities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>100% verified services</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Instant booking available</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar