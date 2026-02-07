// frontend/src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext.jsx'

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import Home from './pages/Home/Home.jsx'
import Services from './pages/Services/Services.jsx'
import ServiceDetails from './pages/ServiceDetails/ServiceDetails.jsx'
import VendorDashboard from './pages/Vendor/VendorDashboard.jsx'
import VendorJoin from './pages/Vendor/VendorJoin.jsx'
import Profile from './pages/Profile/Profile.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import About from './pages/About/About.jsx'
import Contact from './pages/Contact/Contact.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import UserGuide from './pages/UserGuide/UserGuide.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy.jsx'
import './App.css'

// Protected Route
const ProtectedRoute = ({ children, requireVendor = false }) => {
  const { user, isVendor, loading } = useAuth()

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  if (requireVendor && !isVendor) {
    return <Navigate to="/vendor/join" />
  }

  return children
}

// Public only route
const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) return <div className="p-10 text-center">Loading...</div>
  if (user) return <Navigate to="/" />

  return children
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/vendor/join" element={<VendorJoin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guide" element={<UserGuide />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route
            path="/login"
            element={
              <PublicOnlyRoute>
                <Login />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicOnlyRoute>
                <Register />
              </PublicOnlyRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/vendor"
            element={
              <ProtectedRoute requireVendor>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
