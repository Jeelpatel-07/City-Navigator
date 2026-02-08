import { useState } from 'react'
import { 
  FiSearch, 
  FiMapPin, 
  FiGrid, 
  FiBriefcase,
  FiChevronDown
} from 'react-icons/fi'
import { HiLocationMarker } from 'react-icons/hi'
import Button from '../Common/Button.jsx'
import './SearchBar.css'

const SearchBar = () => {
  const [searchData, setSearchData] = useState({
    city: 'rajkot',
    serviceType: '',
    category: ''
  })

  // 6 Popular Cities
  const cities = [
    { value: 'rajkot', label: 'Rajkot', emoji: '🏙️', state: 'Gujarat' },
    { value: 'ahmedabad', label: 'Ahmedabad', emoji: '🏛️', state: 'Gujarat' },
    { value: 'surat', label: 'Surat', emoji: '💎', state: 'Gujarat' },
    { value: 'vadodara', label: 'Vadodara', emoji: '🎨', state: 'Gujarat' },
    { value: 'mumbai', label: 'Mumbai', emoji: '🌊', state: 'Maharashtra' },
    { value: 'delhi', label: 'Delhi', emoji: '🇮🇳', state: 'Delhi' }
  ]

  // Service types
  const serviceTypes = [
    { value: '', label: 'Select Service Type', emoji: '📋' },
    { value: 'place', label: 'General Places', emoji: '🏢' },
    { value: 'local-service', label: 'Local Services', emoji: '👷' }
  ]

  // All categories from your database
  const allCategories = [
    // LOCAL SERVICES
    { value: 'plumber', label: 'Plumber', emoji: '🚰', type: 'local-service' },
    { value: 'electrician', label: 'Electrician', emoji: '⚡', type: 'local-service' },
    { value: 'carpenter', label: 'Carpenter', emoji: '🔨', type: 'local-service' },
    { value: 'ac-repair', label: 'AC Repair', emoji: '❄️', type: 'local-service' },
    { value: 'ro-water-purifier-service', label: 'RO Service', emoji: '💧', type: 'local-service' },
    { value: 'pest-control', label: 'Pest Control', emoji: '🐛', type: 'local-service' },
    { value: 'car-repair', label: 'Car Repair', emoji: '🚗', type: 'local-service' },
    { value: 'bike-vehicle-repair', label: 'Bike Repair', emoji: '🏍️', type: 'local-service' },
    { value: 'pack-move', label: 'Pack & Move', emoji: '📦', type: 'local-service' },
    { value: 'cleaning-services', label: 'Cleaning', emoji: '🧹', type: 'local-service' },
    
    // PLACES
    { value: 'airport', label: 'Airport', emoji: '✈️', type: 'place' },
    { value: 'railway-station', label: 'Railway Station', emoji: '🚉', type: 'place' },
    { value: 'bus-station', label: 'Bus Station', emoji: '🚌', type: 'place' },
    { value: 'police-station', label: 'Police Station', emoji: '👮', type: 'place' },
    { value: 'fire-station', label: 'Fire Station', emoji: '🚒', type: 'place' },
    { value: 'banks', label: 'Banks', emoji: '🏦', type: 'place' },
    { value: 'atms', label: 'ATMs', emoji: '💳', type: 'place' },
    { value: 'petrol-pumps', label: 'Petrol Pumps', emoji: '⛽', type: 'place' },
    { value: 'hospital', label: 'Hospital', emoji: '🏥', type: 'place' },
    { value: 'medical-stores-pharmacies', label: 'Medical Store', emoji: '💊', type: 'place' },
    { value: 'school', label: 'School', emoji: '🏫', type: 'place' },
    { value: 'university-college', label: 'College', emoji: '🎓', type: 'place' },
    { value: 'hostels', label: 'Hostel', emoji: '🛏️', type: 'place' },
    { value: 'restaurant', label: 'Restaurant', emoji: '🍽️', type: 'place' },
    { value: 'bakery', label: 'Bakery', emoji: '🥐', type: 'place' },
    { value: 'dairy', label: 'Dairy', emoji: '🥛', type: 'place' },
    { value: 'general-store', label: 'General Store', emoji: '🛒', type: 'place' },
    { value: 'food-courts', label: 'Food Court', emoji: '🍱', type: 'place' },
    { value: 'stationery-book-store', label: 'Book Store', emoji: '📚', type: 'place' },
    { value: 'salon', label: 'Salon', emoji: '💇', type: 'place' },
    { value: 'gym', label: 'Gym', emoji: '💪', type: 'place' },
    { value: 'hotels', label: 'Hotel', emoji: '🏨', type: 'place' },
    { value: 'tourist-places', label: 'Tourist Place', emoji: '🗺️', type: 'place' },
    { value: 'gardens-parks', label: 'Park', emoji: '🌳', type: 'place' },
    { value: 'zoo', label: 'Zoo', emoji: '🐘', type: 'place' },
    { value: 'stadium', label: 'Stadium', emoji: '🏟️', type: 'place' },
    { value: 'movie-theatre', label: 'Movie Theatre', emoji: '🎬', type: 'place' },
    { value: 'temple', label: 'Temple', emoji: '🛕', type: 'place' },
    { value: 'religious-tourist-places', label: 'Religious Place', emoji: '🙏', type: 'place' }
  ]

  // Get filtered categories based on service type
  const getFilteredCategories = () => {
    if (!searchData.serviceType) {
      return [{ value: '', label: 'Select type first', emoji: '⏳' }]
    }
    
    const filtered = allCategories.filter(cat => cat.type === searchData.serviceType)
    return [
      { value: '', label: `Select ${searchData.serviceType === 'place' ? 'Place' : 'Service'}`, emoji: '🔍' },
      ...filtered
    ]
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'serviceType') {
      setSearchData(prev => ({
        ...prev,
        category: ''
      }))
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    
    if (!searchData.city) {
      alert('Please select a city')
      return
    }
    
    if (!searchData.serviceType) {
      alert('Please select service type')
      return
    }
    
    if (!searchData.category) {
      alert('Please select a category')
      return
    }

    // Redirect to services page with filters
    window.location.href = `/services?city=${searchData.city}&type=${searchData.serviceType}&category=${searchData.category}`
  }

  return (
    <div className="w-full">
      {/* Main Search Form */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSearch} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* City Selection - Proper Size */}
            <div className="lg:col-span-4">
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-base font-semibold text-gray-800 dark:text-white">
                  <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <HiLocationMarker className="text-white" size={18} />
                  </div>
                  <span>Select City</span>
                </label>
                <div className="relative group">
                  <select
                    name="city"
                    value={searchData.city}
                    onChange={handleChange}
                    className="w-full px-5 py-4 pl-14 pr-12 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-blue-500"
                  >
                    {cities.map(city => (
                      <option key={city.value} value={city.value} className="text-base py-2">
                        {city.emoji} {city.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiMapPin className="text-blue-500" size={20} />
                  </div>
                  <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Service Type Selection - Proper Size */}
            <div className="lg:col-span-3">
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-base font-semibold text-gray-800 dark:text-white">
                  <div className="w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FiGrid className="text-white" size={18} />
                  </div>
                  <span>Service Type</span>
                </label>
                <div className="relative group">
                  <select
                    name="serviceType"
                    value={searchData.serviceType}
                    onChange={handleChange}
                    className="w-full px-5 py-4 pl-14 pr-12 text-base rounded-xl border-2 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white cursor-pointer transition-all duration-300 group-hover:border-blue-400 dark:group-hover:border-blue-500"
                  >
                    {serviceTypes.map(type => (
                      <option key={type.value} value={type.value} className="text-base py-2">
                        {type.emoji} {type.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiGrid className="text-purple-500" size={20} />
                  </div>
                  <FiChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Category Selection - Proper Size */}
            <div className="lg:col-span-3">
              <div className="space-y-2">
                <label className="flex items-center gap-3 text-base font-semibold text-gray-800 dark:text-white">
                  <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <FiBriefcase className="text-white" size={18} />
                  </div>
                  <span>Select Category</span>
                </label>
                <div className="relative group">
                  <select
                    name="category"
                    value={searchData.category}
                    onChange={handleChange}
                    disabled={!searchData.serviceType}
                    className={`w-full px-5 py-4 pl-14 pr-12 text-base rounded-xl border-2 appearance-none cursor-pointer transition-all duration-300 ${
                      !searchData.serviceType
                        ? 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 group-hover:border-blue-400 dark:group-hover:border-blue-500'
                    }`}
                  >
                    {getFilteredCategories().map(cat => (
                      <option key={cat.value} value={cat.value} className="text-base py-2">
                        {cat.emoji} {cat.label}
                      </option>
                    ))}
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FiBriefcase className={!searchData.serviceType ? "text-gray-400" : "text-green-500"} size={20} />
                  </div>
                  <FiChevronDown className={`absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                    !searchData.serviceType ? "text-gray-400" : "text-gray-500"
                  }`} size={20} />
                </div>
              </div>
            </div>

            {/* Search Button - Proper Size */}
            <div className="lg:col-span-2 flex items-end">
              <Button
                type="submit"
                className="w-full h-[60px] bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 text-base"
              >
                <div className="flex items-center justify-center gap-3">
                  <FiSearch size={20} />
                  <span className="font-bold">SEARCH</span>
                </div>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar