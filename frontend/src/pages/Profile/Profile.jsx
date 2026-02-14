// frontend/src/pages/Profile/Profile.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, 
  FiEdit2, FiSave, FiLock, FiStar, FiCheckCircle,
  FiShoppingBag, FiTrendingUp, FiPackage, FiSettings,
  FiHeart, FiClock, FiCreditCard, FiShield
} from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext.jsx'
import Button from '../../components/Common/Button.jsx'
import './Profile.css'

const Profile = () => {
  const { user, isVendor } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)

  // User profile data
  const [userData, setUserData] = useState(null)

  // Vendor specific data
  const [vendorData, setVendorData] = useState({
    businessName: 'Expert Plumbing Services',
    category: 'Plumber',
    rating: 4.7,
    totalBookings: 156,
    earnings: '₹2,45,000',
    services: 12,
    verificationStatus: 'verified',
    businessAddress: 'Mavdi, Rajkot',
    experience: '8 years',
    taxId: 'GSTIN-24ABCDE1234F1Z5'
  })

  // Customer specific data
  const [customerData, setCustomerData] = useState({
    totalBookings: 24,
    savedServices: 8,
    loyaltyPoints: 1250,
    membership: 'Gold Member',
    paymentMethods: 3,
    upcomingBookings: 2
  })

  // Mock booking history
  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 1,
      serviceName: 'Plumbing Repair',
      vendor: 'Rajkot Plumbing Experts',
      date: '2024-03-15',
      amount: '₹800',
      status: 'Completed',
      rating: 4.5
    },
    {
      id: 2,
      serviceName: 'Salon & Spa',
      vendor: 'Looks Salon',
      date: '2024-03-10',
      amount: '₹1,200',
      status: 'Completed',
      rating: 4.8
    },
    {
      id: 3,
      serviceName: 'AC Service',
      vendor: 'Cool Care AC Services',
      date: '2024-03-18',
      amount: '₹600',
      status: 'Upcoming',
      rating: null
    }
  ])

  // Mock saved services
  const [savedServices, setSavedServices] = useState([
    {
      id: 1,
      name: 'Regency Lagoon Resort',
      category: 'Hotel',
      rating: 4.5,
      price: '₹2,500',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      name: 'Madhuban Restaurant',
      category: 'Restaurant',
      rating: 4.6,
      price: '₹800',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80'
    }
  ])

  useEffect(() => {
  if (user) {
    setUserData({
      name: user.fullName || user.name || '',
      email: user.email || '',
      phone: user.phone || user.phoneNumber || '',
      address: user.address || '',
      joinDate: user.createdAt || new Date(),
      avatar: user.avatar || 'https://via.placeholder.com/150'
    })
  }
}, [user])

  const handleSave = () => {
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('userData', JSON.stringify(userData))
      if (isVendor) {
        localStorage.setItem('vendorData', JSON.stringify(vendorData))
      } else {
        localStorage.setItem('customerData', JSON.stringify(customerData))
      }
      setIsEditing(false)
      setLoading(false)
      alert('Profile updated successfully!')
    }, 1000)
  }

  const handleCancel = () => {
  if (user) {
    setUserData({
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      joinDate: user.createdAt || new Date(),
      avatar: user.avatar || 'https://via.placeholder.com/150'
    })
  }
  setIsEditing(false)
}

  // Tabs configuration
  const customerTabs = [
    { id: 'profile', name: 'Profile', icon: <FiUser /> },
    { id: 'bookings', name: 'Bookings', icon: <FiCalendar /> },
    { id: 'favorites', name: 'Favorites', icon: <FiHeart /> },
    { id: 'payment', name: 'Payment', icon: <FiCreditCard /> },
    { id: 'security', name: 'Security', icon: <FiShield /> }
  ]

  const vendorTabs = [
    { id: 'profile', name: 'Profile', icon: <FiUser /> },
    { id: 'services', name: 'Services', icon: <FiPackage /> },
    { id: 'analytics', name: 'Analytics', icon: <FiTrendingUp /> },
    { id: 'bookings', name: 'Bookings', icon: <FiCalendar /> },
    { id: 'settings', name: 'Settings', icon: <FiSettings /> }
  ]

  const tabs = isVendor ? vendorTabs : customerTabs

  const renderStars = (rating) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      )
    }
    return stars
  }
  if (!userData) {
  return <div className="text-center py-20">Loading profile...</div>
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isVendor && vendorData.verificationStatus === 'verified' && (
                  <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-1 rounded-full">
                    <FiCheckCircle className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{userData.name}</h1>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <FiStar className="w-5 h-5 text-yellow-400 mr-1" />
                    {isVendor ? vendorData.rating : '4.8'} Rating
                  </span>
                  <span className="flex items-center">
                    <FiCalendar className="w-5 h-5 mr-1" />
                    Joined {new Date(userData.joinDate).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              {!isEditing ? (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-white/20 hover:bg-white/30 border border-white/30"
                  >
                    <FiEdit2 className="mr-2" />
                    Edit Profile
                  </Button>
                  <Link to={isVendor ? '/vendor' : '/'}>
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      {isVendor ? 'Go to Dashboard' : 'Back to Home'}
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    loading={loading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <FiSave className="mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Tabs */}
          <div className="lg:w-1/4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </div>

              {/* Stats Card */}
              <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">Quick Stats</h3>
                <div className="space-y-2">
                  {isVendor ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Bookings</span>
                        <span className="font-bold">{vendorData.totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Earnings</span>
                        <span className="font-bold text-green-600">{vendorData.earnings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Services</span>
                        <span className="font-bold">{vendorData.services}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Bookings</span>
                        <span className="font-bold">{customerData.totalBookings}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Favorites</span>
                        <span className="font-bold">{customerData.savedServices}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Loyalty Points</span>
                        <span className="font-bold text-yellow-600">{customerData.loyaltyPoints}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {/* Personal Information Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Personal Information
                    </h2>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                      {isVendor ? 'Verified Vendor' : customerData.membership}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({...userData, name: e.target.value})}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <FiUser className="text-gray-400 mr-3" />
                            <span>{userData.name}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Email Address
                        </label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({...userData, email: e.target.value})}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <FiMail className="text-gray-400 mr-3" />
                            <span>{userData.email}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={userData.phone}
                            onChange={(e) => setUserData({...userData, phone: e.target.value})}
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                          />
                        ) : (
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <FiPhone className="text-gray-400 mr-3" />
                            <span>{userData.phone}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                          Address
                        </label>
                        {isEditing ? (
                          <textarea
                            value={userData.address}
                            onChange={(e) => setUserData({...userData, address: e.target.value})}
                            rows="3"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 resize-none"
                          />
                        ) : (
                          <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <FiMapPin className="text-gray-400 mr-3 mt-1 flex-shrink-0" />
                            <span>{userData.address}</span>
                          </div>
                        )}
                      </div>

                      {/* Vendor Specific Fields */}
                      {isVendor && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                              Business Name
                            </label>
                            {isEditing ? (
                              <input
                                type="text"
                                value={vendorData.businessName}
                                onChange={(e) => setVendorData({...vendorData, businessName: e.target.value})}
                                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                              />
                            ) : (
                              <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <FiShoppingBag className="text-gray-400 mr-3" />
                                <span>{vendorData.businessName}</span>
                              </div>
                            )}
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                Category
                              </label>
                              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span className="capitalize">{vendorData.category}</span>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                Experience
                              </label>
                              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <span>{vendorData.experience}</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Info Cards */}
                {isVendor ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-3">Verification Status</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                          Verified ✓
                        </span>
                      </div>
                      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>Your business is verified and trusted by customers.</p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-3">Business Info</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Tax ID</span>
                          <span className="font-medium">{vendorData.taxId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Business Address</span>
                          <span className="font-medium">{vendorData.businessAddress}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-3">Performance</h3>
                      <div className="flex items-center mb-2">
                        {renderStars(vendorData.rating)}
                        <span className="ml-2 font-bold">{vendorData.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Based on {vendorData.totalBookings} customer reviews
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-3">Membership Benefits</h3>
                      <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-center">
                          <FiCheckCircle className="text-green-500 mr-2" />
                          Priority customer support
                        </li>
                        <li className="flex items-center">
                          <FiCheckCircle className="text-green-500 mr-2" />
                          Exclusive discounts
                        </li>
                        <li className="flex items-center">
                          <FiCheckCircle className="text-green-500 mr-2" />
                          Early access to new services
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                      <h3 className="font-bold text-gray-800 dark:text-white mb-3">Account Security</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Password</span>
                          <Link to="/change-password" className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                            Change
                          </Link>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Two-factor Auth</span>
                          <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  {isVendor ? 'Service Bookings' : 'My Bookings'}
                </h2>
                
                <div className="space-y-4">
                  {bookingHistory.map(booking => (
                    <div key={booking.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                            {booking.serviceName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">{booking.serviceName}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">With {booking.vendor}</p>
                            <div className="flex items-center mt-2 space-x-4">
                              <span className="flex items-center text-sm">
                                <FiCalendar className="mr-2" />
                                {new Date(booking.date).toLocaleDateString('en-IN', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                })}
                              </span>
                              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{booking.amount}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-4 flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          booking.status === 'Completed' 
                            ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                            : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400'
                        }`}>
                          {booking.status}
                        </span>
                        
                        {booking.rating ? (
                          <div className="flex items-center">
                            {renderStars(booking.rating)}
                            <span className="ml-2 font-medium">{booking.rating}</span>
                          </div>
                        ) : (
                          <Button size="small">Rate Service</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab (Customer only) */}
            {activeTab === 'favorites' && !isVendor && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Saved Services
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedServices.map(service => (
                    <div key={service.id} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-48 relative">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white">
                            <FiHeart className="text-red-500" />
                          </button>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                            {service.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-gray-800 dark:text-white mb-2">{service.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {renderStars(service.rating)}
                            <span className="ml-2 font-medium">{service.rating}</span>
                          </div>
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{service.price}</span>
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <Button size="small" className="flex-1">Book Now</Button>
                          <Link to={`/services/${service.id}`} className="flex-1">
                            <Button variant="outline" size="small" className="w-full">View Details</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Tab (Vendor only) */}
            {activeTab === 'services' && isVendor && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    My Services
                  </h2>
                  <Link to="/vendor/join">
                    <Button>
                      <FiEdit2 className="mr-2" />
                      Add New Service
                    </Button>
                  </Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3].map(item => (
                    <div key={item} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-800 dark:text-white">Service {item}</h3>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 rounded-full text-sm">
                          Active
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Bookings</span>
                          <span className="font-medium">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Revenue</span>
                          <span className="font-bold text-green-600">₹12,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Rating</span>
                          <div className="flex items-center">
                            {renderStars(4.5)}
                            <span className="ml-2 font-medium">4.5</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex space-x-3">
                        <Button variant="outline" size="small" className="flex-1">Edit</Button>
                        <Button variant="outline" size="small" className="flex-1">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analytics Tab (Vendor only) */}
            {activeTab === 'analytics' && isVendor && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">Total Revenue</h3>
                    <p className="text-3xl font-bold">{vendorData.earnings}</p>
                    <p className="text-sm opacity-90 mt-2">Lifetime earnings</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">Total Bookings</h3>
                    <p className="text-3xl font-bold">{vendorData.totalBookings}</p>
                    <p className="text-sm opacity-90 mt-2">Completed services</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">Active Services</h3>
                    <p className="text-3xl font-bold">{vendorData.services}</p>
                    <p className="text-sm opacity-90 mt-2">Listed services</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-6 text-white">
                    <h3 className="text-lg font-bold mb-2">Customer Rating</h3>
                    <p className="text-3xl font-bold">{vendorData.rating}</p>
                    <p className="text-sm opacity-90 mt-2">Average rating</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Performance Overview
                  </h2>
                  <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
                    <p className="text-gray-500 dark:text-gray-400">Chart visualization would go here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile