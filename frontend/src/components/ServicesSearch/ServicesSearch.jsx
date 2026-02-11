import { useState, useEffect } from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

const ServicesSearch = ({
  categories = [],
  areas = [],
  onChange = () => {},
  initial = {}
}) => {
  const [keyword, setKeyword] = useState(initial.keyword || '')
  const [category, setCategory] = useState(initial.category || 'all')
  const [area, setArea] = useState(initial.area || 'all')
  const [minRating, setMinRating] = useState(initial.minRating || 0)
  const [serviceType, setServiceType] = useState(initial.serviceType || 'all')

  useEffect(() => {
    // Debounce-like: notify parent on changes
    const t = setTimeout(() => {
      onChange({ keyword, category, area, minRating, serviceType })
    }, 200)
    return () => clearTimeout(t)
  }, [keyword, category, area, minRating, serviceType])

  const handleClear = () => {
    setKeyword('')
    setCategory('all')
    setArea('all')
    setMinRating(0)
    setServiceType('all')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 lg:p-6 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 items-center">
        <div className="lg:col-span-3 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search services, places or keywords..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <select className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(c => (
            <option key={c.id || c} value={c.id || c}>{c.name || c}</option>
          ))}
        </select>

        <select className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800" value={area} onChange={e => setArea(e.target.value)}>
          <option value="all">All Areas</option>
          {areas.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <select className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800" value={minRating} onChange={e => setMinRating(Number(e.target.value))}>
          <option value={0}>Any rating</option>
          <option value={3}>3.0+</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
        </select>

        <select className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800" value={serviceType} onChange={e => setServiceType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="place">Place</option>
          <option value="local-service">Vendor</option>
        </select>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <button onClick={() => onChange({ keyword, category, area, minRating, serviceType })} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Search</button>
        <button onClick={handleClear} className="px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2"><FiX /> Clear</button>
        <div className="ml-auto text-sm text-gray-500">Showing filters: <span className="font-medium">{category !== 'all' ? category : 'All'}</span>, <span className="font-medium">{area !== 'all' ? area : 'All areas'}</span></div>
      </div>
    </div>
  )
}

export default ServicesSearch
