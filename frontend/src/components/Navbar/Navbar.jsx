// frontend/src/components/Navbar/Navbar.jsx - COMPLETE UPDATED VERSION
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  FiSun, 
  FiMoon, 
  FiMenu, 
  FiX, 
  FiUser, 
  FiLogOut, 
  FiShoppingBag,
  FiHome,
  FiGrid,
  FiInfo,
  FiMail,
  FiBriefcase
} from 'react-icons/fi'
import logo from '../../assets/images/logo.png'
import './Navbar.css'

const Navbar = () => {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, isVendor, logout } = useAuth()
  const navigate = useNavigate()
  

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check theme on mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true'
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    document.documentElement.classList.toggle('dark')
  }

  const handleLogout = () => {
    logout()
    setIsProfileMenuOpen(false)
    setIsMenuOpen(false)
    navigate('/')
  }

  const navLinks = [
    { name: 'Home', path: '/', icon: <FiHome /> },
    { name: 'Services', path: '/services', icon: <FiGrid /> },
    { name: 'About', path: '/about', icon: <FiInfo /> },
    { name: 'Contact', path: '/contact', icon: <FiMail /> }
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white dark:bg-gray-900 shadow-md'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-4 hover:opacity-90 transition-opacity">
            <div className="relative">
              <img 
                src={logo} 
                alt="City Navigator Logo"
                className="h-14 w-14 rounded-xl object-cover shadow-md border border-gray-200 dark:border-gray-700"
                onError={(e) => {
                  e.target.style.display = 'none'
                  const fallback = document.getElementById('logo-fallback')
                  if (fallback) fallback.style.display = 'flex'
                }}
              />
              
              <div 
                id="logo-fallback"
                className="h-14 w-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md"
                style={{ display: 'none' }}
              >
                <span className="text-white font-bold text-xl">CN</span>
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white leading-tight">
                City Navigator
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block mt-1">
                Find Local Services
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors relative group"
              >
                <span className="mr-2 opacity-80">{link.icon}</span>
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            
            {/* Vendor Join Link (only show if not vendor) */}
            {(!isVendor || !user) && (
              <Link
                to="/vendor/join"
                className="flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
              >
                <FiBriefcase className="mr-2" />
                Become Vendor
              </Link>
            )}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Toggle theme"
            >
              {isDark ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                      <FiUser size={20} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div className="text-left">
                    <div className="font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400">
                     {user?.fullName || user?.name || 'User'}
                  </div>
                   <div className="text-xs text-gray-500">
                     {isVendor ? 'Verified Vendor' : 'Premium Member'}
                   </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                    {/* Header */}
                    <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <FiUser size={24} />
                        </div>
                        <div>
                          <p className="font-bold">{user?.fullName || user?.name}</p>
                          <p className="text-sm opacity-90">{user?.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/profile"
                        className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <FiUser className="mr-3 text-gray-500" />
                        Profile
                      </Link>
                      
                      {isVendor ? (
                        <>
                          <Link
                            to="/vendor"
                            className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <FiShoppingBag className="mr-3 text-gray-500" />
                            Vendor Dashboard
                          </Link>
                          <Link
                            to="/vendor/join"
                            className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <FiBriefcase className="mr-3 text-gray-500" />
                            Add New Service
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link
                            to="/bookings"
                            className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <FiGrid className="mr-3 text-gray-500" />
                            My Bookings
                          </Link>
                          <Link
                            to="/favorites"
                            className="flex items-center px-5 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <FiShoppingBag className="mr-3 text-gray-500" />
                            Saved Services
                          </Link>
                        </>
                      )}
                      
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <FiLogOut className="mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-xl font-medium transition-all duration-300 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 hover:shadow-md"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-7 py-2.5 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Sign Up Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300 shadow-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 py-6">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
              
              {/* Vendor Join in Mobile */}
              {(!isVendor || !user) && (
                <Link
                  to="/vendor/join"
                  className="flex items-center py-3 px-4 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiBriefcase className="mr-3" />
                  Become Vendor
                </Link>
              )}

              <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                {/* Theme Toggle */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Theme</span>
                  <button
                    onClick={toggleTheme}
                    className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-800 transition-all duration-300"
                  >
                    {isDark ? <FiSun size={22} /> : <FiMoon size={22} />}
                  </button>
                </div>

                {/* Auth Section */}
                {user ? (
                  <div className="space-y-3">
                    {/* User Info */}
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
                          <FiUser size={24} />
                        </div>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500">
                            {isVendor ? 'Vendor Account' : 'Customer Account'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Links */}
                    <Link
                      to="/profile"
                      className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FiUser className="mr-3" />
                      Profile
                    </Link>

                    {isVendor ? (
                      <>
                        <Link
                          to="/vendor"
                          className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FiShoppingBag className="mr-3" />
                          Vendor Dashboard
                        </Link>
                        <Link
                          to="/vendor/join"
                          className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FiBriefcase className="mr-3" />
                          Add Service
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/bookings"
                          className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FiGrid className="mr-3" />
                          My Bookings
                        </Link>
                        <Link
                          to="/favorites"
                          className="flex items-center py-3 px-4 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <FiShoppingBag className="mr-3" />
                          Saved Services
                        </Link>
                      </>
                    )}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center py-3 px-4 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiLogOut className="mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Link
                      to="/login"
                      className="block py-3 px-4 text-center text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block py-3 px-4 text-center text-white bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 rounded-lg shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar