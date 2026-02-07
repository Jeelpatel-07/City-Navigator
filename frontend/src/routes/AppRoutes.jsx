// src/routes/AppRoutes.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import Home from '../pages/Home/Home.jsx'
import Services from '../pages/Services/Services.jsx'
import ServiceDetails from '../pages/ServiceDetails/ServiceDetails.jsx'
import VendorDashboard from '../pages/Vendor/VendorDashboard.jsx'
import VendorJoin from '../pages/Vendor/VendorJoin.jsx' // Add this
import Login from '../pages/Auth/Login.jsx'
import Register from '../pages/Auth/Register.jsx'
import About from '../pages/About/About.jsx'
import Contact from '../pages/Contact/Contact.jsx'
import NotFound from '../pages/NotFound/NotFound.jsx'

function AppRoutes() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="/vendor" element={<VendorDashboard />} />
            <Route path="/vendor/join" element={<VendorJoin />} /> {/* Add this */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default AppRoutes