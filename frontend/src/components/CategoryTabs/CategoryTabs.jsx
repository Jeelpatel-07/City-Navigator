import './CategoryTabs.css'

const CategoryTabs = ({ onCategoryChange, activeCategory }) => {
  // Alternative professional arrangement - 3 Local Services, 3 Places
  const professionalCategories = [
    // Essential Home Services
    { id: 'plumber', name: 'Plumbers', icon: '🚰', type: 'local-service' },
    { id: 'electrician', name: 'Electricians', icon: '⚡', type: 'local-service' },
    { id: 'cleaning-services', name: 'Cleaning', icon: '🧹', type: 'local-service' },
    
    // Popular Places
    { id: 'restaurant', name: 'Restaurants', icon: '🍽️', type: 'place' },
    { id: 'hotels', name: 'Hotels', icon: '🏨', type: 'place' },
    { id: 'gym', name: 'Gyms', icon: '💪', type: 'place' }
  ]

  // Add "All" category at the beginning
  const categories = [
    { id: 'all', name: 'All', icon: '📍', type: 'all' },
    ...professionalCategories
  ]

  const handleClick = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
              activeCategory === category.id
                ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl transform -translate-y-1'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="text-3xl mb-2">
              {category.icon}
            </div>
            <span className="text-xs font-semibold text-center leading-tight">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryTabs