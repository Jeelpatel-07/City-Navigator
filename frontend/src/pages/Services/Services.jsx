// frontend/src/pages/Services/Services.jsx - COMPLETE WITH ALL CATEGORIES + VENDOR/PLACE FILTER
import { useState, useEffect } from 'react'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import Loader from '../../components/Common/Loader.jsx'
import { 
  FiGrid, 
  FiList,
  FiMapPin,
  FiStar,
  FiChevronRight,
  FiChevronDown,
  FiSearch,
  FiFilter,
  FiX,
  FiArrowRight,
  FiShield
} from 'react-icons/fi'
import { serviceService } from '../../services/api.js'

const Services = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArea, setSelectedArea] = useState('all')
  const [selectedServiceType, setSelectedServiceType] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [viewMode, setViewMode] = useState('grid')
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // ==================== ALL 30+ CATEGORIES FROM YOUR DATABASE ====================
  const categories = [
    { id: 'all', name: 'All Services', icon: '✨' },
    
    // 🛠️ LOCAL SERVICES (Vendors)
    { id: 'plumber', name: 'Plumbers', icon: '🚰', type: 'local-service' },
    { id: 'electrician', name: 'Electricians', icon: '⚡', type: 'local-service' },
    { id: 'carpenter', name: 'Carpenters', icon: '🔨', type: 'local-service' },
    { id: 'ac-repair', name: 'AC Repair', icon: '❄️', type: 'local-service' },
    { id: 'ro-water-purifier-service', name: 'RO Service', icon: '💧', type: 'local-service' },
    { id: 'pest-control', name: 'Pest Control', icon: '🐛', type: 'local-service' },
    { id: 'car-repair', name: 'Car Repair', icon: '🚗', type: 'local-service' },
    { id: 'bike-vehicle-repair', name: 'Bike Repair', icon: '🏍️', type: 'local-service' },
    { id: 'pack-move', name: 'Pack & Move', icon: '📦', type: 'local-service' },
    { id: 'cleaning-services', name: 'Cleaning', icon: '🧹', type: 'local-service' },
    
    // 🏙️ CITY INFRASTRUCTURE
    { id: 'airport', name: 'Airports', icon: '✈️', type: 'place' },
    { id: 'railway-station', name: 'Railway Stations', icon: '🚉', type: 'place' },
    { id: 'bus-station', name: 'Bus Stations', icon: '🚌', type: 'place' },
    { id: 'police-station', name: 'Police Stations', icon: '👮', type: 'place' },
    { id: 'fire-station', name: 'Fire Stations', icon: '🚒', type: 'place' },
    { id: 'banks', name: 'Banks', icon: '🏦', type: 'place' },
    { id: 'atms', name: 'ATMs', icon: '💳', type: 'place' },
    { id: 'petrol-pumps', name: 'Petrol Pumps', icon: '⛽', type: 'place' },
    
    // 🏥 HEALTH & EMERGENCY
    { id: 'hospital', name: 'Hospitals', icon: '🏥', type: 'place' },
    { id: 'medical-stores-pharmacies', name: 'Medical Stores', icon: '💊', type: 'place' },
    
    // 🎓 EDUCATION
    { id: 'school', name: 'Schools', icon: '🏫', type: 'place' },
    { id: 'university-college', name: 'Colleges', icon: '🎓', type: 'place' },
    { id: 'hostels', name: 'Hostels', icon: '🛏️', type: 'place' },
    
    // 🍽️ FOOD & DAILY NEEDS
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️', type: 'place' },
    { id: 'bakery', name: 'Bakeries', icon: '🥐', type: 'place' },
    { id: 'dairy', name: 'Dairy', icon: '🥛', type: 'place' },
    { id: 'general-store', name: 'General Stores', icon: '🛒', type: 'place' },
    { id: 'food-courts', name: 'Food Courts', icon: '🍱', type: 'place' },
    
    // 🛍️ SHOPPING & LIFESTYLE
    { id: 'stationery-book-store', name: 'Book Stores', icon: '📚', type: 'place' },
    { id: 'salon', name: 'Salons', icon: '💇', type: 'place' },
    { id: 'gym', name: 'Gyms', icon: '💪', type: 'place' },
    { id: 'hotels', name: 'Hotels', icon: '🏨', type: 'place' },
    
    // 🏞️ RECREATION & TOURISM
    { id: 'tourist-places', name: 'Tourist Places', icon: '🗺️', type: 'place' },
    { id: 'gardens-parks', name: 'Parks', icon: '🌳', type: 'place' },
    { id: 'zoo', name: 'Zoo', icon: '🐘', type: 'place' },
    { id: 'stadium', name: 'Stadiums', icon: '🏟️', type: 'place' },
    { id: 'movie-theatre', name: 'Movie Theatres', icon: '🎬', type: 'place' },
    
    // 🕌 RELIGIOUS & CULTURAL
    { id: 'temple', name: 'Temples', icon: '🛕', type: 'place' },
    { id: 'religious-tourist-places', name: 'Religious Places', icon: '🙏', type: 'place' }
  ]

  // Areas in Rajkot
  const areas = [
    { id: 'all', name: 'All Areas', icon: '📍' },
    { id: 'kalawad-road', name: 'Kalawad Road', icon: '🛣️' },
    { id: 'race-course', name: 'Race Course', icon: '🏁' },
    { id: 'ring-road', name: 'Ring Road', icon: '🔄' },
    { id: 'university-road', name: 'University Road', icon: '🎓' },
    { id: 'mavdi', name: 'Mavdi', icon: '🏘️' },
    { id: 'gandhigram', name: 'Gandhigram', icon: '🏛️' },
    { id: 'nana-mava', name: 'Nana Mava', icon: '🏡' },
    { id: 'karanpara', name: 'Karanpara', icon: '🏢' },
    { id: 'jagnath-plot', name: 'Jagnath Plot', icon: '🏠' },
    { id: 'hirasar', name: 'Hirasar', icon: '✈️' }
  ]

  useEffect(() => {
    fetchServices()
  }, [])

  useEffect(() => {
    applyAllFilters()
  }, [services, searchQuery, selectedCategory, selectedArea, selectedServiceType, sortBy])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const data = await serviceService.getAllServices()
      const response = data.services || data || []

      console.log('Raw services from API:', response)

      const normalized = response.map(service => {
        const serviceCategory = (service.category || '').toLowerCase()
        const localServiceCategories = [
          'plumber', 'electrician', 'carpenter', 'ac-repair', 'ro-water-purifier-service',
          'pest-control', 'car-repair', 'bike-vehicle-repair', 'pack-move', 'cleaning-services'
        ]
        
        return {
          _id: service._id || service.id,
          id: service._id || service.id,
          name: service.name || 'Service Name',
          category: serviceCategory,
          city: service.city || 'Rajkot',
          state: service.state || 'Gujarat',
          area: service.area || service.address?.split(',')[0] || 'Rajkot',
          address: service.address || service.location || 'Address not available',
          phone: service.phone || service.vendor?.contact || '',
          website: service.website || '',
          rating: service.rating || 4.0,
          ratingCount: service.ratingCount || service.vendor?.reviews || 0,
          price: service.price || 0,
          priceRange: service.priceRange || service.price || 'Contact for Price',
          description: service.description || '',
          image: service.image || 'https://images.unsplash.com/photo-1582750433449-648ed127bb54',
          features: service.features || [],
          openingHours: service.openingHours || service.timings || '',
          verified: service.verified || service.isVerified || false,
          vendor: service.vendor || null,
          serviceType: service.serviceType || (localServiceCategories.includes(serviceCategory) ? 'local-service' : 'place'),
          responseTime: service.responseTime || service.response || '',
          experience: service.experience || service.vendor?.experience || ''
        }
      })

      console.log('Normalized services:', normalized)
      setServices(normalized)
      setFilteredServices(normalized)
    } catch (error) {
      console.error('Failed to load services:', error)
    } finally {
      setLoading(false)
    }
  }

  // Helper function to extract numeric price from string with ₹ symbol
  const extractPrice = (priceValue) => {
    if (typeof priceValue === 'number') return priceValue
    
    if (typeof priceValue === 'string') {
      // Remove ₹ symbol and any non-numeric characters except hyphen
      const numericMatch = priceValue.match(/[\d,]+/g)
      if (numericMatch) {
        // For ranges like "₹300-800", take the lower price
        const prices = numericMatch.join('').replace(/,/g, '').split('-')
        return parseInt(prices[0]) || 0
      }
    }
    return 0
  }

  const applyAllFilters = () => {
    if (services.length === 0) return

    let filtered = [...services]

    // 🔍 SEARCH FILTER
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.area.toLowerCase().includes(query) ||
        (service.features && service.features.some(f => f.toLowerCase().includes(query)))
      )
    }

    // 📁 CATEGORY FILTER
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    // 📍 AREA FILTER
    if (selectedArea !== 'all') {
      const areaName = areas.find(a => a.id === selectedArea)?.name || ''
      filtered = filtered.filter(service =>
        service.area.toLowerCase() === areaName.toLowerCase() ||
        service.area.toLowerCase().includes(areaName.toLowerCase())
      )
    }

    // 🏢 SERVICE TYPE FILTER (Vendors vs Places)
    if (selectedServiceType !== 'all') {
      filtered = filtered.filter(service => service.serviceType === selectedServiceType)
    }

    // 📊 SORTING
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'rating-count') {
      filtered.sort((a, b) => b.ratingCount - a.ratingCount)
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => extractPrice(a.price) - extractPrice(b.price))
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => extractPrice(b.price) - extractPrice(a.price))
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredServices(filtered)
  }

  // ==================== SEARCH SUGGESTIONS ====================
  const updateSuggestions = (query) => {
    if (!query.trim()) {
      setSearchSuggestions([])
      return
    }

    const suggestions = []
    const lowerQuery = query.toLowerCase()

    // Category suggestions (all 30+ categories)
    categories.slice(1).forEach(cat => {
      if (cat.name.toLowerCase().includes(lowerQuery) || cat.id.includes(lowerQuery)) {
        suggestions.push({
          type: 'category',
          text: cat.name,
          icon: cat.icon,
          category: cat.id
        })
      }
    })

    // Area suggestions
    areas.slice(1).forEach(area => {
      if (area.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push({
          type: 'area',
          text: area.name,
          icon: area.icon,
          area: area.id
        })
      }
    })

    // Service type suggestions
    if ('vendor'.includes(lowerQuery) || 'local service'.includes(lowerQuery)) {
      suggestions.push({
        type: 'service-type',
        text: 'Local Services (Vendors)',
        icon: '🔧',
        serviceType: 'local-service'
      })
    }
    if ('place'.includes(lowerQuery) || 'general'.includes(lowerQuery)) {
      suggestions.push({
        type: 'service-type',
        text: 'Places',
        icon: '🏢',
        serviceType: 'place'
      })
    }

    // Service name suggestions
    services.slice(0, 5).forEach(service => {
      if (service.name?.toLowerCase().includes(lowerQuery) && 
          !suggestions.some(s => s.text === service.name)) {
        suggestions.push({
          type: 'service',
          text: service.name,
          icon: '🔍',
          category: service.category
        })
      }
    })

    setSearchSuggestions(suggestions.slice(0, 10))
  }

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    updateSuggestions(query)
    setShowSuggestions(true)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setShowSuggestions(false)
    
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section')
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false)
    
    if (suggestion.type === 'category') {
      setSelectedCategory(suggestion.category)
      setSearchQuery('')
    } else if (suggestion.type === 'area') {
      setSelectedArea(suggestion.area)
      setSearchQuery('')
    } else if (suggestion.type === 'service-type') {
      setSelectedServiceType(suggestion.serviceType)
      setSearchQuery('')
    } else {
      setSearchQuery(suggestion.text)
    }
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedArea('all')
    setSelectedServiceType('all')
    setSortBy('rating')
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedCategory !== 'all') count++
    if (selectedArea !== 'all') count++
    if (selectedServiceType !== 'all') count++
    if (searchQuery) count++
    return count
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* ==================== HERO SECTION WITH PROFESSIONAL SEARCH BAR ==================== */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-blue-200 mb-6">
              <a href="/" className="hover:text-white transition-colors text-sm">Home</a>
              <FiChevronRight className="text-blue-300" size={14} />
              <span className="text-white font-semibold text-sm">Services</span>
            </div>

            {/* Hero Content */}
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Discover Services in Rajkot
              </h1>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Browse through {services.length}+ verified local services and places
              </p>
            </div>

            {/* ==================== PROFESSIONAL SEARCH BAR WITH AREA ==================== */}
            <div className="relative" onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}>
              <form onSubmit={handleSearchSubmit} className="bg-white rounded-2xl shadow-2xl p-3 flex flex-col md:flex-row gap-3">
                {/* Search Input - Full width on mobile */}
                <div className="flex-1 relative">
                  <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search for restaurants, plumbers, airports, hospitals..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-14 pr-5 py-4 rounded-xl border-2 border-transparent focus:border-blue-500 focus:outline-none text-gray-900 placeholder-gray-400 text-base"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Category Dropdown - Shows all 30+ categories */}
                  <div className="relative min-w-[200px]">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-5 py-4 pl-5 pr-12 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none text-gray-700 bg-white appearance-none cursor-pointer text-base"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                  
                  {/* Area Dropdown */}
                  <div className="relative min-w-[160px]">
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full px-5 py-4 pl-5 pr-12 rounded-xl border-2 border-gray-100 focus:border-blue-500 focus:outline-none text-gray-700 bg-white appearance-none cursor-pointer text-base"
                    >
                      {areas.map(area => (
                        <option key={area.id} value={area.id}>{area.icon} {area.name}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />
                  </div>
                  
                  {/* Search Button */}
                  <button
                    type="submit"
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl flex items-center gap-2"
                  >
                    <FiSearch size={20} />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
                  {searchSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-6 py-4 flex items-center gap-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-left border-b last:border-b-0 border-gray-100 dark:border-gray-700"
                    >
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {suggestion.text}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 capitalize">
                          {suggestion.type === 'service-type' ? 'Service Type' : suggestion.type}
                        </div>
                      </div>
                      <FiSearch className="text-gray-400" size={16} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Popular Searches */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-blue-200">Popular:</span>
              <button
                onClick={() => {
                  setSearchQuery('restaurant')
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white transition-all"
              >
                🍽️ Restaurants
              </button>
              <button
                onClick={() => {
                  setSelectedServiceType('local-service')
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white transition-all"
              >
                🔧 Vendors
              </button>
              <button
                onClick={() => {
                  setSelectedServiceType('place')
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white transition-all"
              >
                🏢 Places
              </button>
              <button
                onClick={() => {
                  setSearchQuery('airport')
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white transition-all"
              >
                ✈️ Airport
              </button>
              <button
                onClick={() => {
                  setSearchQuery('plumber')
                  document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white transition-all"
              >
                🚰 Plumbers
              </button>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
            <path fill="white" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* ==================== RESULTS SECTION ==================== */}
      <div id="results-section" className="container mx-auto px-4 py-12 -mt-12 relative z-20">
        {/* FILTERS BAR */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Service Type Filter (Vendors vs Places) */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setSelectedServiceType('all')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedServiceType === 'all'
                      ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🔄 All
                </button>
                <button
                  onClick={() => setSelectedServiceType('place')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedServiceType === 'place'
                      ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🏢 Places
                </button>
                <button
                  onClick={() => setSelectedServiceType('local-service')}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    selectedServiceType === 'local-service'
                      ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  🔧 Vendors
                </button>
              </div>

              {/* Sort Options - FIXED PRICE SORTING */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 dark:bg-gray-700 border-0 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="rating">⭐ Top Rated</option>
                  <option value="rating-count">📊 Most Reviewed</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💰 Price: High to Low</option>
                  <option value="name">📝 Name A-Z</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Results Count */}
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                  {filteredServices.length}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredServices.length === 1 ? 'service' : 'services'}
                </span>
              </div>

              {/* Verified Badge Count */}
              <div className="flex items-center gap-1 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-lg">
                <FiShield className="text-green-600 dark:text-green-400" size={14} />
                <span className="text-xs font-medium text-green-700 dark:text-green-400">
                  {services.filter(s => s.verified).length} Verified
                </span>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <FiGrid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-md' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  <FiList size={18} />
                </button>
              </div>

              {/* Clear Filters Button */}
              {getActiveFiltersCount() > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                >
                  <FiX size={16} />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {getActiveFiltersCount() > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400">
                  {categories.find(c => c.id === selectedCategory)?.icon} {categories.find(c => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory('all')} className="ml-1 hover:text-red-500">
                    <FiX size={14} />
                  </button>
                </span>
              )}
              
              {selectedArea !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                  {areas.find(a => a.id === selectedArea)?.icon} {areas.find(a => a.id === selectedArea)?.name}
                  <button onClick={() => setSelectedArea('all')} className="ml-1 hover:text-red-500">
                    <FiX size={14} />
                  </button>
                </span>
              )}
              
              {selectedServiceType !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 dark:bg-purple-900/30 rounded-full text-xs font-medium text-purple-600 dark:text-purple-400">
                  {selectedServiceType === 'place' ? '🏢 Places' : '🔧 Vendors'}
                  <button onClick={() => setSelectedServiceType('all')} className="ml-1 hover:text-red-500">
                    <FiX size={14} />
                  </button>
                </span>
              )}
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-600 dark:text-gray-400">
                  🔍 "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-red-500">
                    <FiX size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* SERVICES GRID */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader />
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-16 text-center border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="text-8xl mb-6 opacity-30">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
              No services found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              {searchQuery ? `We couldn't find any services matching "${searchQuery}".` : 'No services match your current filters.'} 
              Try different keywords or clear filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Browse All Services
            </button>
          </div>
        ) : (
          <div className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          } gap-6 lg:gap-8 transition-all duration-300`}>
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Back to Top Button */}
        {filteredServices.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all shadow-md"
            >
              <FiArrowRight className="rotate-[-90deg]" size={18} />
              <span>Back to Top</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Services