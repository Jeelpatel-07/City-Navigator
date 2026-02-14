import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiX } from 'react-icons/fi'
import Loader from '../../components/Common/Loader.jsx'
import ServiceCard from '../../components/ServiceCard/ServiceCard.jsx'
import { serviceService } from '../../services/api.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import './SavedServices.css'

const SavedServices = () => {
  const { user } = useAuth()
  const [savedServices, setSavedServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSavedServices()
  }, [])

  const fetchSavedServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await serviceService.getSavedServices()
      const services = result.services || []
      setSavedServices(services)
    } catch (error) {
      console.error('Error fetching saved services:', error)
      setError('Failed to load saved services')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveSaved = async (serviceId) => {
    try {
      await serviceService.unsaveService(serviceId)
      setSavedServices(savedServices.filter(s => (s._id || s.id) !== serviceId))
    } catch (error) {
      console.error('Error removing saved service:', error)
      alert('Failed to remove service')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/services" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <FiArrowLeft className="mr-2" size={20} />
            Back to Services
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            ❤️ Saved Services
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {savedServices.length === 0 
              ? 'No services saved yet. Start saving your favorites!' 
              : `You have ${savedServices.length} service${savedServices.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-32">
            <Loader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && savedServices.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-20 text-center border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="text-8xl mb-8 opacity-30">💔</div>
            <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              No saved services yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto text-lg">
              Save your favorite services to access them later. Click the ❤️ heart icon on any service to save it.
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Browse Services
            </Link>
          </div>
        )}

        {/* Services Grid */}
        {!loading && savedServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedServices.map(service => (
              <div key={service._id || service.id} className="relative group">
                <ServiceCard service={service} />
                
                {/* Remove Button - Overlay on top of card */}
                <button
                  onClick={() => handleRemoveSaved(service._id || service.id)}
                  className="absolute top-8 right-8 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-lg shadow-lg transition-all hover:scale-110 z-10"
                  title="Remove from saved"
                >
                  <FiX size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Back to Top Button */}
        {!loading && savedServices.length > 0 && (
          <div className="text-center mt-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-md hover:shadow-lg"
            >
              <FiArrowLeft className="rotate-90" size={18} />
              <span>Back to Top</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedServices
