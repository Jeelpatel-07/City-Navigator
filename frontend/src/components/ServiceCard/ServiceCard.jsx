import { 
  FiStar, FiMapPin, FiPhone, FiClock, 
  FiExternalLink, FiCalendar, FiZap, FiShield, 
  FiUsers, FiDollarSign, FiHeart, FiCheck,
  FiNavigation, FiBookmark
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './ServiceCard.css';

const ServiceCard = ({ service }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Safely check if service exists
  if (!service) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 text-center">
        <div className="text-gray-500 dark:text-gray-400">No service data available</div>
      </div>
    );
  }

  // Safely access properties with fallbacks
  const {
    _id = '',
    id: fallbackId = '',
    name = 'Unnamed Service',
    category = 'unknown',
    image = 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    rating = 4.0,
    ratingCount = 0,
    address = 'Address not available',
    city = 'Rajkot',
    phone = '+91 XXXXX XXXXX',
    price = '',
    priceRange = '',
    experience = '',
    responseTime = '',
    verified = false,
    availability = '',
    openingHours = '',
    serviceType = 'place',
    website = null,
    features = [],
    extraDetails = {}
  } = service;

  // Prefer backend `_id` but fall back to `id` (mock/normalized) or service name
  // Encode the name for safe URL usage; Express will decode params for server lookup
  const serviceId = _id || fallbackId || encodeURIComponent(name || '')

  // Determine if it's a local service (vendor)
  const isLocalService = serviceType === 'local-service' || [
    'plumber', 'electrician', 'carpenter', 'ac-repair', 'ro-water-purifier-service',
    'pest-control', 'car-repair', 'bike-vehicle-repair', 'pack-move', 'cleaning-services'
  ].includes(category);

  // Category icons mapping
  const categoryIcons = {
    // LOCAL SERVICES
    'plumber': '🚰', 'electrician': '⚡', 'carpenter': '🔨', 
    'ac-repair': '❄️', 'ro-water-purifier-service': '💧', 'pest-control': '🐛',
    'car-repair': '🚗', 'bike-vehicle-repair': '🏍️', 'pack-move': '📦', 
    'cleaning-services': '🧹',
    
    // PLACES
    'airport': '✈️', 'railway-station': '🚉', 'bus-station': '🚌',
    'police-station': '👮', 'fire-station': '🚒', 'banks': '🏦',
    'atms': '💳', 'petrol-pumps': '⛽', 'hospital': '🏥',
    'medical-stores-pharmacies': '💊', 'school': '🏫', 
    'university-college': '🎓', 'hostels': '🛏️', 'restaurant': '🍽️',
    'bakery': '🥐', 'dairy': '🥛', 'general-store': '🛒',
    'food-courts': '🍱', 'stationery-book-store': '📚', 'salon': '💇',
    'gym': '💪', 'hotels': '🏨', 'tourist-places': '🗺️',
    'gardens-parks': '🌳', 'zoo': '🐘', 'stadium': '🏟️',
    'movie-theatre': '🎬', 'temple': '🛕', 'religious-tourist-places': '🙏'
  };

  // Category names mapping
  const categoryNames = {
    'plumber': 'Plumber', 'electrician': 'Electrician', 'carpenter': 'Carpenter',
    'ac-repair': 'AC Repair', 'ro-water-purifier-service': 'RO Service',
    'pest-control': 'Pest Control', 'car-repair': 'Car Repair',
    'bike-vehicle-repair': 'Bike Repair', 'pack-move': 'Pack & Move',
    'cleaning-services': 'Cleaning', 'airport': 'Airport',
    'railway-station': 'Railway Station', 'bus-station': 'Bus Station',
    'police-station': 'Police Station', 'fire-station': 'Fire Station',
    'banks': 'Bank', 'atms': 'ATM', 'petrol-pumps': 'Petrol Pump',
    'hospital': 'Hospital', 'medical-stores-pharmacies': 'Medical Store',
    'school': 'School', 'university-college': 'College', 'hostels': 'Hostel',
    'restaurant': 'Restaurant', 'bakery': 'Bakery', 'dairy': 'Dairy',
    'general-store': 'General Store', 'food-courts': 'Food Court',
    'stationery-book-store': 'Book Store', 'salon': 'Salon',
    'gym': 'Gym', 'hotels': 'Hotel', 'tourist-places': 'Tourist Place',
    'gardens-parks': 'Park', 'zoo': 'Zoo', 'stadium': 'Stadium',
    'movie-theatre': 'Movie Theatre', 'temple': 'Temple',
    'religious-tourist-places': 'Religious Place'
  };

  const categoryIcon = categoryIcons[category] || '📍';
  const categoryName = categoryNames[category] || category;

  // Handle image error
  const handleImageError = () => setImageError(true);
  
  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  // Determine price display
  const displayPrice = priceRange || price || 'Contact for Price';

  // Rating display (max 5 stars, min 0)
  const displayRating = Math.min(5, Math.max(0, rating || 4.0));

  // Format rating for display (show one decimal)
  const formatRating = (rate) => {
    const parsed = parseFloat(rate);
    return isNaN(parsed) ? '4.0' : parsed.toFixed(1);
  };

  // Render star component
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((star) => (
      <FiStar
        key={star}
        size={14}
        className={star <= Math.floor(displayRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  // Get display features (max 3)
  const getDisplayFeatures = () => {
    const featuresToShow = [];
    
    // Add features array items
    if (Array.isArray(features)) {
      featuresToShow.push(...features.slice(0, 3));
    }
    
    // Add extra details facilities/amenities
    if (extraDetails?.facilities?.[0]) {
      featuresToShow.push(extraDetails.facilities[0]);
    }
    if (extraDetails?.amenities?.[0]) {
      featuresToShow.push(extraDetails.amenities[0]);
    }
    
    return featuresToShow.slice(0, 3);
  };

  // Check if emergency service is available
  const hasEmergencyService = extraDetails?.emergencyService || false;

  // LOCAL SERVICE CARD (With Book Now)
  if (isLocalService) {
    return (
      <div className="service-card group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-1 service-card-animate">
        {/* Card Header */}
        <div className="relative h-48 overflow-hidden">
          {/* Image with fallback */}
          {!imageError ? (
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-5xl opacity-80">{categoryIcon}</span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
              <span className="text-lg">{categoryIcon}</span>
              <span>Local Service</span>
            </div>
            {verified && (
              <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FiShield size={10} />
                Verified
              </div>
            )}
          </div>
          
          {/* Favorite Button */}
          <button 
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center hover:scale-105 transition-all favorite-active"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FiHeart className={`${isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-600'}`} size={18} />
          </button>
          
          {/* Emergency Badge */}
          {hasEmergencyService && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <FiZap size={12} />
              <span>24/7 EMERGENCY</span>
            </div>
          )}
          
          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 bg-white/95 dark:bg-gray-900 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full font-bold text-sm shadow">
            {displayPrice}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          {/* Service Name */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          
          {/* Rating and Location Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars()}
                <span className="ml-1 font-bold text-gray-700 dark:text-gray-300 text-sm">
                  {formatRating(rating)}
                </span>
              </div>
              {ratingCount > 0 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({ratingCount})
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <FiMapPin size={12} />
              <span>{city}</span>
            </div>
          </div>

          {/* Quick Details */}
          <div className="space-y-2 mb-4">
            {/* Experience */}
            {experience && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-300">{experience} Experience</span>
              </div>
            )}
            
            {/* Response Time */}
            {responseTime && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-gray-600 dark:text-gray-300">{responseTime} Response</span>
              </div>
            )}
            
            {/* Availability */}
            {availability && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                <span className="text-gray-600 dark:text-gray-300">{availability}</span>
              </div>
            )}
          </div>

          {/* Features/Services */}
          {getDisplayFeatures().length > 0 && (
            <div className="mb-5">
              <div className="flex flex-wrap gap-2">
                {getDisplayFeatures().map((item, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 items-center service-card-actions">
            <button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
              <FiCalendar size={16} />
              Book Now
            </button>

            <a 
              href={`tel:${phone}`}
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label={`Call ${name}`}
            >
              <FiPhone size={18} />
            </a>

            {website ? (
              <a href={website} target="_blank" rel="noopener noreferrer" className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" aria-label={`Visit website of ${name}`}>
                <FiExternalLink size={18} />
              </a>
            ) : (
              <Link 
                to={`/services/${serviceId}`}
                className="w-12 h-12 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                aria-label={`View details of ${name}`}
              >
                <FiExternalLink size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }

  // PLACE CARD (Without Book Now)
  return (
    <div className="service-card group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:-translate-y-1 service-card-animate">
      {/* Card Header */}
      <div className="relative h-48 overflow-hidden">
        {/* Image with fallback */}
        {!imageError ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-5xl opacity-80">{categoryIcon}</span>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <div className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            <span className="text-lg">{categoryIcon}</span>
            <span>{categoryName}</span>
          </div>
          {displayPrice !== 'Contact for Price' && (
            <div className="bg-black/40 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold">
              {displayPrice}
            </div>
          )}
        </div>
        
        {/* Favorite Button */}
        <button 
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900 w-10 h-10 rounded-lg flex items-center justify-center hover:scale-105 transition-all favorite-active"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart className={`${isFavorite ? 'fill-red-600 text-red-600' : 'text-gray-600'}`} size={18} />
        </button>
        
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-gray-900 px-4 py-2.5 rounded-xl shadow-lg border border-white/30">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {renderStars()}
            </div>
            <div>
              <div className="font-bold text-gray-800 text-sm">{formatRating(rating)}</div>
              {ratingCount > 0 && (
                <div className="text-xs text-gray-600">{ratingCount} reviews</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Place Name */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {name}
        </h3>

        {/* Location */}
        <div className="mb-3 flex items-start gap-2">
          <FiMapPin className="text-gray-400 mt-0.5 flex-shrink-0" size={16} />
          <span className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {address.split(',')[0] || address}
          </span>
        </div>

        {/* Place Details */}
        <div className="space-y-2 mb-4">
          {/* Opening Hours */}
          {openingHours && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
              <span className="text-gray-600 dark:text-gray-300">{openingHours}</span>
            </div>
          )}
          
          {/* Type */}
          {extraDetails.type && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-300">{extraDetails.type}</span>
            </div>
          )}
          
          {/* Features */}
          {extraDetails.amenities?.[0] && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-gray-600 dark:text-gray-300">{extraDetails.amenities[0]}</span>
            </div>
          )}
        </div>

        {/* Features/Facilities */}
        {getDisplayFeatures().length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {getDisplayFeatures().map((item, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 items-center service-card-actions">
          <Link 
            to={`/services/${serviceId}`}
            className="flex-1 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
          >
            <FiExternalLink size={16} />
            View Details
          </Link>
          <a 
            href={`tel:${phone}`}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 text-indigo-600 rounded-lg hover:bg-gray-50 transition-colors"
            aria-label={`Call ${name}`}
          >
            <FiPhone size={18} />
          </a>
          {website && (
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Visit website of ${name}`}
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
