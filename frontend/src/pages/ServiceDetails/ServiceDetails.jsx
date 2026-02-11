// Replace the entire ServiceDetails.jsx with this:

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FiStar, FiMapPin, FiClock, FiCheckCircle, FiPhone, FiArrowLeft } from 'react-icons/fi'
import Loader from '../../components/Common/Loader.jsx'
import Button from '../../components/Common/Button.jsx'
import { serviceService } from '../../services/api.js'

const ServiceDetails = () => {
  const { id } = useParams()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedServices, setRelatedServices] = useState([])

  useEffect(() => {
    fetchService()
  }, [id])

  const fetchService = async () => {
    try {
      setLoading(true)
      const data = await serviceService.getServiceById(id)

      // Normalize id for backend (_id) or mock (id)
      const normalized = { ...data, id: data?._id || data?.id }
      setService(normalized)

      // Fetch related services (same category) and normalize their ids
      const allServices = await serviceService.getAllServices()
      const all = allServices.services || []
      const related = all
        .filter(s => (s.category === normalized.category) && ((s._id || s.id) !== (normalized._id || normalized.id)))
        .slice(0, 3)
        .map(s => ({ ...s, id: s._id || s.id }))
      setRelatedServices(related)
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to load service details')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Loader />

  if (!service) return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl text-gray-600 dark:text-gray-400">Service not found</h2>
      <Link to="/services" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
        ← Back to Services
      </Link>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/services" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <FiArrowLeft className="mr-2" />
            Back to Services
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Service Image */}
              <div className="h-64 md:h-80 relative">
                <img
                  src={service.image || 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80'}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium capitalize">
                    {service.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(service.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="ml-2 font-bold">{service.rating}</span>
                  <span className="ml-2 text-gray-600">({service.vendor?.reviews || 0} reviews)</span>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                      {service.name}
                    </h1>
                    <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                          <FiMapPin className="mr-2 flex-shrink-0" />
                          <span>{service.address || service.location || service.area || `${service.city || ''}${service.area ? ', ' + service.area : ''}`}</span>
                        </div>
                  </div>
                  <div className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-4 md:mt-0">
                    <div className="text-3xl font-bold">₹{service.price}</div>
                    <div className="text-sm opacity-90">Starting Price</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                    Features & Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {service.features?.map((feature, index) => (
                      <div key={index} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 py-4 text-lg">
                    <FiPhone className="inline mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="flex-1 py-4 text-lg">
                    Save for Later
                  </Button>
                </div>
              </div>
            </div>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <div className="mt-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
                  Related Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedServices.map(related => (
                    <Link 
                      key={related.id} 
                      to={`/services/${related.id}`}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      <div className="h-40 relative">
                        <img
                          src={related.image}
                          alt={related.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
                          {related.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-gray-800 dark:text-white truncate">
                          {related.name}
                        </h4>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <FiStar className="text-yellow-400 mr-1" />
                          <span>{related.rating}</span>
                          <span className="mx-2">•</span>
                          <span>₹{related.price}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vendor Info */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Vendor Information
              </h3>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4">
                  {service.vendor?.name?.charAt(0) || 'V'}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{service.vendor?.name || 'Vendor Name'}</h4>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                    <span>{service.vendor?.rating || 4.5}</span>
                    <span className="mx-2">•</span>
                    <span>{service.vendor?.reviews || 100} reviews</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                View Vendor Profile
              </Button>
            </div>

            {/* Service Details */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                Service Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Category</span>
                  <span className="font-medium capitalize">{service.category}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                  <span className="font-medium text-green-600 flex items-center">
                    <FiClock className="mr-2" />
                    Within 24 hours
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">Availability</span>
                  <span className="font-medium text-green-600">Available Now</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Service Area</span>
                  <span className="font-medium">{service.address || service.location || service.area || service.city}</span>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Need Help?</h3>
              <p className="mb-6 opacity-90">
                Contact our support team for assistance with booking or questions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    📞
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Call Support</div>
                    <div className="font-bold">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                    ✉️
                  </div>
                  <div>
                    <div className="text-sm opacity-80">Email Support</div>
                    <div className="font-bold">support@citynavigator.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetails