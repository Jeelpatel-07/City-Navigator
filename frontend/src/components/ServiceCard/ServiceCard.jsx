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

  // Get category icon and name
  const categoryIcon = categoryIcons[category] || '📍';
  const categoryName = categoryNames[category] || 
    category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  // Calculate display price
  const displayPrice = price || priceRange || 'Contact for Price';

  // Format rating
  const formatRating = (rating) => {
    return typeof rating === 'number' ? rating.toFixed(1) : '4.0';
  };

  // Render stars
  const renderStars = () => {
    const numericRating = typeof rating === 'number' ? rating : 4.0;
    const stars = [];
    
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(numericRating)) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-yellow-400" size={14} />);
      } else if (i === Math.ceil(numericRating) && numericRating % 1 >= 0.5) {
        stars.push(<FiStar key={i} className="text-yellow-400 fill-yellow-400" size={14} />);
      } else {
        stars.push(<FiStar key={i} className="text-gray-300 dark:text-gray-600" size={14} />);
      }
    }
    return stars;
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };

  // Handle favorite click
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Get features to display
  const getDisplayFeatures = () => {
    if (features && features.length > 0) return features.slice(0, 3);
    if (extraDetails.services && extraDetails.services.length > 0) 
      return extraDetails.services.slice(0, 3);
    if (extraDetails.facilities && extraDetails.facilities.length > 0) 
      return extraDetails.facilities.slice(0, 3);
    return [];
  };

  // Check if emergency service is available
  const hasEmergencyService = extraDetails?.emergencyService || false;

  // LOCAL SERVICE CARD (With Book Now)
  if (isLocalService) {
    return (
      <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1">
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
            className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <FiHeart className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} size={18} />
          </button>
          
          {/* Emergency Badge */}
          {hasEmergencyService && (
            <div className="absolute bottom-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg">
              <FiZap size={12} />
              <span>24/7 EMERGENCY</span>
            </div>
          )}
          
          {/* Price Badge */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-xl font-bold text-lg shadow-lg border border-white/30">
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
          <div className="flex gap-2">
            <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
              <FiCalendar size={16} />
              Book Now
            </button>
            <a 
              href={`tel:${phone}`}
              className="w-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Call ${name}`}
            >
              <FiPhone size={18} />
            </a>
            <Link 
              to={`/services/${_id}`}
              className="w-12 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label={`View details of ${name}`}
            >
              <FiExternalLink size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PLACE CARD (Without Book Now)
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-1">
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
          className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm w-9 h-9 rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-110"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <FiHeart className={`${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} size={18} />
        </button>
        
        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-xl shadow-lg border border-white/30">
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
                  className="px-2.5 py-1.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link 
            to={`/services/${_id}`}
            className="flex-1 border-2 border-purple-600 text-purple-600 dark:border-purple-500 dark:text-purple-500 py-3 rounded-lg font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <FiExternalLink size={16} />
            View Details
          </Link>
          <a 
            href={`tel:${phone}`}
            className="w-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
            aria-label={`Call ${name}`}
          >
            <FiPhone size={18} />
          </a>
          {website && (
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 flex items-center justify-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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