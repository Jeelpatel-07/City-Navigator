// frontend/src/pages/Services/Services.jsx - BACKEND CONNECTED VERSION
import { useState, useEffect } from 'react'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import Loader from '../../components/Common/Loader.jsx'
import { FiFilter, FiSearch, FiMapPin, FiStar } from 'react-icons/fi'
import { serviceService } from '../../services/api.js'

const Services = () => {
  const [services, setServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArea, setSelectedArea] = useState('all')
  const [minRating, setMinRating] = useState(0)

  // Categories
  const categories = [
    { id: 'all', name: 'All Services', icon: '📍' },
    { id: 'salon', name: 'Salons', icon: '💇' },
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️' },
    { id: 'hotel', name: 'Hotels', icon: '🏨' },
    { id: 'plumber', name: 'Plumbers', icon: '🚰' },
    { id: 'electrician', name: 'Electricians', icon: '⚡' },
    { id: 'painter', name: 'Painters', icon: '🎨' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
    { id: 'mechanic', name: 'Mechanics', icon: '🔧' }
  ]

  // Areas
  const areas = [
    'all',
    'Kalawad Road',
    'Race Course',
    'Ring Road',
    'University Road',
    'Mavdi',
    'Gandhigram',
    'Nana Mava',
    'Karanpara',
    'Jagnath Plot'
  ]

  // =========================
  // FETCH FROM BACKEND
  // =========================
  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)

      const response = await serviceService.getServices()

      // Normalize backend data for frontend
      const normalized = response.map(service => ({
        id: service._id,
        name: service.name,
        category: service.category?.toLowerCase() || '',
        city: service.city,
        state: service.state,
        area: service.area || '',
        rating: service.rating || 4,
        price: service.price,
        description: service.description || '',
        image: service.image,
        vendor: service.vendor || null
      }))

      setServices(normalized)
      setFilteredServices(normalized)
    } catch (error) {
      console.error('Failed to load services:', error)
      alert('Failed to load services from server')
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // FILTER LOGIC (UNCHANGED)
  // =========================
  useEffect(() => {
    let filtered = services

    if (searchQuery) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory)
    }

    if (selectedArea !== 'all') {
      filtered = filtered.filter(service => service.area === selectedArea)
    }

    if (minRating > 0) {
      filtered = filtered.filter(service => service.rating >= minRating)
    }

    setFilteredServices(filtered)
  }, [searchQuery, selectedCategory, selectedArea, minRating, services])

  const handleResetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedArea('all')
    setMinRating(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Services
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Browse {services.length}+ verified local services
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                className="w-full pl-12 pr-4 py-3 border rounded-lg"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category */}
            <select
              className="px-4 py-3 border rounded-lg"
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>

            {/* Area */}
            <select
              className="px-4 py-3 border rounded-lg"
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
            >
              {areas.map(area => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          {/* Rating + Reset */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {[0, 3, 4, 4.5].map(rating => (
              <button
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`px-3 py-1 rounded ${
                  minRating === rating ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {rating === 0 ? 'Any' : rating}+ ⭐
              </button>
            ))}

            <span className="ml-auto text-gray-600">
              Showing {filteredServices.length} of {services.length}
            </span>

            <button onClick={handleResetFilters} className="text-blue-600">
              Reset
            </button>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <Loader />
        ) : filteredServices.length === 0 ? (
          <p className="text-center text-gray-500">No services found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services