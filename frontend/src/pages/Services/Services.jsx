// frontend/src/pages/Services/Services.jsx - BACKEND CONNECTED VERSION
import { useState, useEffect } from 'react'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import ServicesSearch from '../../components/ServicesSearch/ServicesSearch.jsx'
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

      // Use the frontend service which returns { services, total, filters }
      const data = await serviceService.getAllServices()
      const response = data.services || []

      // Normalize backend/mock data for frontend components
      const normalized = response.map(service => ({
        id: service._id || service.id || encodeURIComponent(service.name || ''),
        name: service.name,
        category: (service.category || '').toLowerCase(),
        city: service.city,
        state: service.state,
        area: service.area || '',
        // Provide address for ServiceCard (backend uses `address` for places)
        address: service.address || service.location || service.area || 'Address not available',
        openingHours: service.openingHours || service.timings || '',
        priceRange: service.priceRange || service.price || '',
        // Pass through features and extraDetails so ServiceCard can render them
        features: service.features || [],
        extraDetails: service.extraDetails || {},
        // Contact and web fields so Action buttons render (call / website)
        phone: service.phone || service.vendor?.contact || '',
        website: service.website || '',
        // serviceType: backend uses 'place' or 'local', normalize to expected values
        serviceType: (service.serviceType || (['plumber','electrician','carpenter','ac-repair','ro-water-purifier-service','pest-control','car-repair','bike-vehicle-repair','pack-move','cleaning-services'].includes((service.category || '').toLowerCase()) ? 'local-service' : 'place')),
        responseTime: service.responseTime || service.response || '',
        verified: service.verified || service.isVerified || false,
        ratingCount: service.ratingCount || service.vendor?.reviews || 0,
        rating: service.rating || 4,
        price: service.price || 0,
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
        <ServicesSearch
          categories={categories}
          areas={areas}
          initial={{ category: selectedCategory, area: selectedArea, minRating }}
          onChange={({ keyword, category, area, minRating, serviceType }) => {
            setSearchQuery(keyword || '')
            setSelectedCategory(category || 'all')
            setSelectedArea(area || 'all')
            setMinRating(minRating || 0)
            // if serviceType is used later to filter by vendor/place, store it
            // (we can add state and use it in filtering)
          }}
        />

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