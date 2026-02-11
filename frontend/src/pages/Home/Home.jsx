import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Search bar removed from Home page per request
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs.jsx'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import Loader from '../../components/Common/Loader.jsx'
import api from '../../services/api.js'
import {
  FiArrowRight,
  FiChevronDown
} from 'react-icons/fi'
import './Home.css'

const Home = () => {
  const [allServices, setAllServices] = useState([])
  const [filteredServices, setFilteredServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')

  useEffect(() => {
    loadServices()
  }, [])

  // ==================== LOAD REAL DATA FROM BACKEND API ====================
  const loadServices = async () => {
    setLoading(true)
    
    try {
      // Fetch real data from your backend API
      const response = await api.get('/services')
      
      // Check if response is an array
      const services = Array.isArray(response) ? response : response.services || []
      
      setAllServices(services)
      setFilteredServices(services)
    } catch (error) {
      console.error('Error loading services from API:', error)
      
      // Fallback: If API fails, use serviceService from api.js
      try {
        const { serviceService } = await import('../../services/api.js')
        const result = await serviceService.getAllServices()
        const services = result.services || []
        
        // Transform serviceService data to match ServiceCard structure
        const transformedServices = services.map(service => ({
        _id: service.id || encodeURIComponent(service.name || ''),
          serviceType: ['plumber', 'electrician', 'painter', 'cleaning', 'mechanic'].includes(service.category) 
            ? 'local-service' 
            : 'place',
          name: service.name,
          category: service.category,
          address: service.location,
          city: 'Rajkot',
          state: 'Gujarat',
          rating: service.rating,
          ratingCount: service.vendor?.reviews || 0,
          phone: service.vendor?.contact || '+91 XXXXX XXXXX',
          price: service.price ? `₹${service.price}` : 'Contact for Price',
          priceRange: service.price ? `₹${service.price}` : 'Contact for Price',
          experience: service.vendor?.experience || 'Experience not specified',
          verified: service.isVerified || false,
          image: service.image,
          features: service.features || [],
          extraDetails: {
            services: service.features || [],
            emergencyService: service.category === 'plumber' || service.category === 'electrician',
            areaCovered: [service.area || 'Rajkot']
          },
          openingHours: service.timings || 'Timing not available',
          responseTime: service.responseTime || 'Response time not specified'
        }))
        
        setAllServices(transformedServices)
        setFilteredServices(transformedServices)
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError)
        // Set empty arrays if both methods fail
        setAllServices([])
        setFilteredServices([])
      }
    } finally {
      setLoading(false)
    }
  }

  // ==================== CATEGORY FILTER ====================
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setLoading(true)
    
    setTimeout(() => {
      if (categoryId === 'all') {
        setFilteredServices(allServices)
      } else {
        const filtered = allServices.filter(
          service => service.category === categoryId
        )
        setFilteredServices(filtered)
      }
      setLoading(false)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)'
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-20 pt-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Local
              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Services in Rajkot
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl">
              Find trusted vendors and explore essential places across Rajkot.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Explore All Services</span>
                <FiArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search section removed from Home page */}

      {/* ==================== BROWSE CATEGORIES ==================== */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3 dark:text-white">
              Browse by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore popular services and places in Rajkot
            </p>
          </div>
          
          {/* Dynamic Categories Component with only 6 best categories */}
          <CategoryTabs 
            onCategoryChange={handleCategoryChange} 
            activeCategory={activeCategory}
          />
        </div>
      </section>

      {/* ==================== FEATURED SERVICES ==================== */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 dark:text-white">
              {activeCategory === 'all' 
                ? 'Featured Services in Rajkot' 
                : `Featured ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}s`}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Top-rated and verified services based on customer reviews
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader />
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">No services found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No services available for this category.
              </p>
              <button
                onClick={() => handleCategoryChange('all')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Show All Services
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.slice(0, 6).map(service => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          )}
          
          {/* View All Services Button */}
          {filteredServices.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View All Services
                <FiArrowRight />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home