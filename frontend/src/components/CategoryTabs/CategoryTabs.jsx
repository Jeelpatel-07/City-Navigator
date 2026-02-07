import { useState } from 'react'
import { 
  FiHome, 
  FiCoffee, 
  FiScissors, 
  FiZap, 
  FiDroplet, 
  FiTool,
  FiGrid 
} from 'react-icons/fi'
import './CategoryTabs.css'

const CategoryTabs = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const categories = [
    { id: 'all', name: 'All Rajkot', icon: <FiGrid size={24} /> },
    { id: 'hotel', name: 'Hotels', icon: <FiHome size={24} /> },
    { id: 'restaurant', name: 'Restaurants', icon: <FiCoffee size={24} /> },
    { id: 'salon', name: 'Salons', icon: <FiScissors size={24} /> },
    { id: 'electrician', name: 'Electricians', icon: <FiZap size={24} /> },
    { id: 'plumber', name: 'Plumbers', icon: <FiDroplet size={24} /> },
    { id: 'cleaning', name: 'Cleaning', icon: <div className="text-2xl">🧹</div> },
    { id: 'mechanic', name: 'Mechanics', icon: <FiTool size={24} /> },
  ]

  const handleClick = (categoryId) => {
    setActiveCategory(categoryId)
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleClick(category.id)}
          className={`flex flex-col items-center justify-center w-24 h-24 rounded-xl transition-all duration-300 ${
            activeCategory === category.id
              ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg transform -translate-y-1'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 shadow hover:shadow-md hover:border-2 hover:border-blue-300 dark:hover:border-blue-700'
          }`}
        >
          <div className="text-2xl mb-2">
            {category.icon}
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  )
}

export default CategoryTabs