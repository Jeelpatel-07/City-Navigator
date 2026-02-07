// frontend/src/pages/Home/Home.jsx - WITH OLD HERO SECTION + CITY BACKGROUND
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/SearchBar/SearchBar.jsx'
import CategoryTabs from '../../components/CategoryTabs/CategoryTabs.jsx'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import Loader from '../../components/Common/Loader.jsx'
import {
  FiArrowRight,
  FiChevronDown,
  FiStar,
  FiMapPin,
  FiCheckCircle,
  FiTrendingUp,
  FiUsers,
  FiAward
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

  // ==================== ENHANCED RAJKOT SERVICES DATA ====================
  const loadServices = async () => {
    setLoading(true)
    
    const enhancedRajkotServices = [
      // Salons
      {
        id: '695a57bcfcfdb9737bfd9ac8',
        name: 'Looks Salon',
        category: 'salon',
        address: '2nd Floor, Crystal Mall, Kalawad Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.3,
        price: '₹500-1500',
        phone: '+91-95100-33445',
        image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Premium unisex salon with expert stylists and modern amenities',
        features: ['Hair Styling', 'Spa', 'Nail Art', 'Bridal Makeup'],
        area: 'Kalawad Road',
        reviews: 128,
        isVerified: true
      },
      {
        id: 'salon2',
        name: 'Enrich Salon & Spa',
        category: 'salon',
        address: '1st Floor, Shoppers Stop, Kalawad Road',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.1,
        price: '₹400-1200',
        phone: '+91-98985-22334',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Luxury salon with international quality services',
        features: ['Hair Care', 'Skin Treatments', 'Massage', 'Waxing'],
        area: 'Kalawad Road',
        reviews: 94,
        isVerified: true
      },

      // Restaurants
      {
        id: 'rest1',
        name: 'Madhuban Restaurant',
        category: 'restaurant',
        address: 'Race Course Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.6,
        price: '₹800-2500',
        phone: '+91-281-2456789',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Fine dining with Gujarati and North Indian cuisine',
        features: ['Pure Veg', 'Family Dining', 'Banquet Hall', 'Valet Parking'],
        area: 'Race Course',
        reviews: 245,
        isVerified: true
      },
      {
        id: 'rest2',
        name: 'The Grand Thakar',
        category: 'restaurant',
        address: '150ft Ring Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.4,
        price: '₹600-1800',
        phone: '+91-281-9988776',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Traditional Gujarati thali and continental dishes',
        features: ['Buffet', 'Outdoor Seating', 'Live Kitchen', 'Party Hall'],
        area: 'Ring Road',
        reviews: 187,
        isVerified: true
      },

      // Hotels
      {
        id: 'hotel1',
        name: 'Regency Lagoon Resort',
        category: 'hotel',
        address: 'Kalawad Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.5,
        price: '₹2500-8000',
        phone: '+91-281-1234567',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Luxury resort with swimming pool and conference facilities',
        features: ['Swimming Pool', 'Spa', 'Restaurant', 'Conference Room'],
        area: 'Kalawad Road',
        reviews: 312,
        isVerified: true
      },
      {
        id: 'hotel2',
        name: 'The Grand Bhagwati',
        category: 'hotel',
        address: '150ft Ring Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.3,
        price: '₹3000-10000',
        phone: '+91-281-2233445',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Business hotel with premium amenities in city center',
        features: ['WiFi', 'Gym', 'Restaurant', 'Room Service'],
        area: 'Ring Road',
        reviews: 198,
        isVerified: true
      },

      // Plumbers
      {
        id: 'plumber1',
        name: 'Rajkot Plumbing Experts',
        category: 'plumber',
        address: 'Mavdi, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.7,
        price: '₹300-800',
        phone: '+91-98251-11223',
        image: 'https://images.unsplash.com/photo-1621961482235-ae412550b76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: '24/7 emergency plumbing services with modern equipment',
        features: ['Emergency Service', 'Water Tank Cleaning', 'Pipeline Repair', 'Free Estimate'],
        area: 'Mavdi',
        reviews: 156,
        isVerified: true,
        responseTime: '30 mins'
      },
      {
        id: 'plumber2',
        name: 'Quick Fix Plumbing',
        category: 'plumber',
        address: 'University Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.5,
        price: '₹250-700',
        phone: '+91-98765-43210',
        image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Reliable plumbing solutions for residential and commercial',
        features: ['Leak Repair', 'Bathroom Fittings', 'Drain Cleaning', 'Installation'],
        area: 'University Road',
        reviews: 89,
        isVerified: true,
        responseTime: '45 mins'
      },

      // Electricians
      {
        id: 'electrician1',
        name: 'Rajkot Electric Solutions',
        category: 'electrician',
        address: 'Gandhigram, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.8,
        price: '₹400-1200',
        phone: '+91-97270-55667',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Licensed electricians for all electrical work',
        features: ['Wiring', 'MCB Repair', 'Inverter Setup', 'Home Automation'],
        area: 'Gandhigram',
        reviews: 203,
        isVerified: true,
        responseTime: '1 hour'
      },

      // Painters
      {
        id: 'painter1',
        name: 'Color World Painting',
        category: 'painter',
        address: 'Nana Mava Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.6,
        price: '₹15-25/sq.ft',
        phone: '+91-98989-77665',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Professional painting services for homes and offices',
        features: ['Wall Painting', 'Texture Work', 'Waterproofing', 'Color Consultation'],
        area: 'Nana Mava',
        reviews: 145,
        isVerified: true
      },

      // Cleaning Services
      {
        id: 'cleaning1',
        name: 'Sparkle Clean Rajkot',
        category: 'cleaning',
        address: 'Karanpara, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.4,
        price: '₹1500-5000',
        phone: '+91-95123-44556',
        image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Complete home and office cleaning services',
        features: ['Deep Cleaning', 'Carpet Cleaning', 'Sofa Cleaning', 'Post Construction'],
        area: 'Karanpara',
        reviews: 112,
        isVerified: true
      },

      // Mechanics
      {
        id: 'mechanic1',
        name: 'Rajkot Auto Care',
        category: 'mechanic',
        address: '150ft Ring Road, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.7,
        price: '₹500-5000',
        phone: '+91-98250-99887',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Complete car and bike repair services',
        features: ['Engine Repair', 'AC Service', 'Denting Painting', 'Battery Replacement'],
        area: 'Ring Road',
        reviews: 178,
        isVerified: true
      },

      // AC Repair
      {
        id: 'ac1',
        name: 'Cool Care AC Services',
        category: 'electrician', // Using electrician category for AC
        address: 'Jagnath Plot, Rajkot',
        city: 'Rajkot',
        state: 'Gujarat',
        rating: 4.5,
        price: '₹600-2500',
        phone: '+91-98765-11223',
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        description: 'Professional AC installation, repair and maintenance',
        features: ['AC Installation', 'Gas Filling', 'Service', 'Repair'],
        area: 'Jagnath Plot',
        reviews: 134,
        isVerified: true,
        responseTime: '2 hours'
      }
    ]

    // Simulate API delay
    setTimeout(() => {
      setAllServices(enhancedRajkotServices)
      setFilteredServices(enhancedRajkotServices)
      setLoading(false)
    }, 800)
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
    <div className="min-h-screen">
      {/* ==================== HERO SECTION (ORIGINAL WITH CITY BACKGROUND) ==================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10"></div>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)'
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 relative z-20 pt-16">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Discover Local
              <span className="block bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Services in Your City
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl">
              Find trusted hotels, restaurants, salons, electricians, plumbers, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Explore Services
                <FiArrowRight className="ml-3" />
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById('search-section')
                    .scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-xl bg-white/10 text-white border border-white/30 hover:bg-white/20"
              >
                <FiChevronDown className="mr-3" />
                Search Your Area
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SEARCH SECTION ==================== */}
      <section id="search-section" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-12">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">
                Find Services in Your City
              </h2>
              <p className="text-gray-600">
                Search for general places or local vendor services across cities
              </p>
            </div>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* ==================== BROWSE CATEGORIES ==================== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Browse by Category
          </h2>
          <CategoryTabs onCategoryChange={handleCategoryChange} />
        </div>
      </section>

      {/* ==================== FEATURED SERVICES ==================== */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2">
              {activeCategory === 'all'
                ? 'Popular Services in Rajkot'
                : `Popular ${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}s in Rajkot`}
            </h2>
            <p className="text-gray-600">
              Verified local businesses with trusted customer ratings
            </p>
          </div>
          {loading ? (
            <Loader />
          ) : filteredServices.length === 0 ? (
            <p className="text-gray-600 text-center">
              No services found for this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home