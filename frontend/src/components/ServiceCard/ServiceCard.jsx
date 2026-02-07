// frontend/src/components/ServiceCard/ServiceCard.jsx - UPDATED VERSION
import { Link } from 'react-router-dom'
import { FiMapPin, FiStar, FiClock, FiCheck } from 'react-icons/fi'
import './ServiceCard.css'

const ServiceCard = ({ service }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-yellow-400" />)
      } else if (i < rating) {
        stars.push(<FiStar key={i} className="text-yellow-400" />)
      } else {
        stars.push(<FiStar key={i} className="text-gray-300 dark:text-gray-600" />)
      }
    }
    return stars
  }

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'salon': return '💇'
      case 'restaurant': return '🍽️'
      case 'hotel': return '🏨'
      case 'plumber': return '🚰'
      case 'electrician': return '⚡'
      case 'painter': return '🎨'
      case 'cleaning': return '🧹'
      case 'mechanic': return '🔧'
      default: return '📍'
    }
  }

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:-translate-y-2">
      {/* Image Header */}
      <div className="h-48 relative overflow-hidden">
        {/* Service Image */}
        <img
          src={service.image || `https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80`}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80`;
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-2">
            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <span className="text-lg">{getCategoryIcon(service.category)}</span>
              <span className="capitalize">{service.category}</span>
            </span>
            {service.isVerified && (
              <span className="bg-green-500/90 backdrop-blur-sm text-white px-2 py-1.5 rounded-full text-xs font-medium flex items-center gap-1">
                <FiCheck size={12} />
                Verified
              </span>
            )}
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center">
          {renderStars(service.rating)}
          <span className="ml-2 font-bold">{service.rating}</span>
          <span className="ml-1 text-xs text-gray-600">({service.reviews || 0})</span>
        </div>
        
        {/* Area Badge */}
        {service.area && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <FiMapPin size={14} />
              {service.area}
            </span>
          </div>
        )}

        {/* Response Time */}
        {service.responseTime && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-green-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2">
              <FiClock size={14} />
              {service.responseTime}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-1">
          {service.name}
        </h3>
        
        {/* Location */}
        <div className="flex items-center text-gray-600 dark:text-gray-400 mb-3 text-sm">
          <FiMapPin className="mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{service.address}</span>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
          {service.description}
        </p>
        
        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {service.features.slice(0, 3).map((feature, index) => (
              <span 
                key={index} 
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md flex items-center gap-1"
              >
                <FiCheck size={10} />
                {feature}
              </span>
            ))}
            {service.features.length > 3 && (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                +{service.features.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Price and CTA */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
          <div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {service.price}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              Starting price
            </div>
          </div>
          <Link 
            to={`/services/${service.id}`}
            className="px-5 py-2.5 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow hover:shadow-md"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ServiceCard