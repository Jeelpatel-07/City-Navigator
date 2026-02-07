import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong'
    
    // Auto logout on 401
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    
    // Simple alert instead of toast
    // if (error.response?.status !== 401) {
    //   alert(message)
    // }
    
    return Promise.reject(new Error(message))
  }
)

// ALL RAJKOT SERVICES DATA
const rajkotServices = [
  {
    id: '695a57bcfcfdb9737bfd9ac8',
    name: 'Looks Salon',
    category: 'salon',
    rating: 4.3,
    location: 'Kalawad Road, Rajkot',
    description: 'Premium unisex salon with expert stylists and modern amenities. We offer hair styling, spa treatments, nail art, and bridal makeup services.',
    price: 500,
    features: ['Hair Styling', 'Spa Treatments', 'Nail Art', 'Bridal Makeup', 'Hair Coloring', 'Skin Care'],
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Looks Salon Group',
      rating: 4.7,
      reviews: 128,
      experience: '8 years',
      contact: '+91-95100-33445'
    },
    timings: '9:00 AM - 9:00 PM',
    area: 'Kalawad Road',
    isVerified: true
  },
  {
    id: 'salon2',
    name: 'Enrich Salon & Spa',
    category: 'salon',
    rating: 4.1,
    location: 'Shoppers Stop, Kalawad Road',
    description: 'Luxury salon with international quality services and experienced stylists. Specialized in hair care, skin treatments, and massage therapies.',
    price: 400,
    features: ['Hair Care', 'Skin Treatments', 'Massage Therapy', 'Waxing', 'Facials', 'Body Spa'],
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Enrich Beauty',
      rating: 4.5,
      reviews: 94,
      experience: '6 years',
      contact: '+91-98985-22334'
    },
    timings: '10:00 AM - 8:00 PM',
    area: 'Kalawad Road',
    isVerified: true
  },
  {
    id: 'rest1',
    name: 'Madhuban Restaurant',
    category: 'restaurant',
    rating: 4.6,
    location: 'Race Course Road, Rajkot',
    description: 'Fine dining restaurant serving authentic Gujarati and North Indian cuisine. Perfect for family dinners and special occasions.',
    price: 800,
    features: ['Pure Veg', 'Family Dining', 'Banquet Hall', 'Valet Parking', 'Live Music', 'Outdoor Seating'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Madhuban Group',
      rating: 4.8,
      reviews: 245,
      experience: '12 years',
      contact: '+91-281-2456789'
    },
    timings: '11:00 AM - 11:00 PM',
    area: 'Race Course',
    isVerified: true
  },
  {
    id: 'rest2',
    name: 'The Grand Thakar',
    category: 'restaurant',
    rating: 4.4,
    location: '150ft Ring Road, Rajkot',
    description: 'Traditional Gujarati thali and continental dishes in a luxurious setting. Known for buffet and outdoor seating.',
    price: 600,
    features: ['Buffet', 'Outdoor Seating', 'Live Kitchen', 'Party Hall', 'Bar', 'Dessert Counter'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Thakar Hospitality',
      rating: 4.6,
      reviews: 187,
      experience: '10 years',
      contact: '+91-281-9988776'
    },
    timings: '10:00 AM - 11:30 PM',
    area: 'Ring Road',
    isVerified: true
  },
  {
    id: 'hotel1',
    name: 'Regency Lagoon Resort',
    category: 'hotel',
    rating: 4.5,
    location: 'Kalawad Road, Rajkot',
    description: 'Luxury resort with swimming pool, spa, and conference facilities. Ideal for business stays and family vacations.',
    price: 2500,
    features: ['Swimming Pool', 'Spa', 'Restaurant', 'Conference Room', 'Gym', 'Room Service'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Regency Hotels',
      rating: 4.7,
      reviews: 312,
      experience: '15 years',
      contact: '+91-281-1234567'
    },
    timings: '24/7',
    area: 'Kalawad Road',
    isVerified: true
  },
  {
    id: 'hotel2',
    name: 'The Grand Bhagwati',
    category: 'hotel',
    rating: 4.3,
    location: '150ft Ring Road, Rajkot',
    description: 'Business hotel with premium amenities in city center. Offers WiFi, gym, restaurant, and room service.',
    price: 3000,
    features: ['WiFi', 'Gym', 'Restaurant', 'Room Service', 'Laundry', 'Business Center'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Bhagwati Group',
      rating: 4.5,
      reviews: 198,
      experience: '8 years',
      contact: '+91-281-2233445'
    },
    timings: '24/7',
    area: 'Ring Road',
    isVerified: true
  },
  {
    id: 'plumber1',
    name: 'Rajkot Plumbing Experts',
    category: 'plumber',
    rating: 4.7,
    location: 'Mavdi, Rajkot',
    description: '24/7 emergency plumbing services with modern equipment. Specialized in water tank cleaning and pipeline repair.',
    price: 300,
    features: ['Emergency Service', 'Water Tank Cleaning', 'Pipeline Repair', 'Free Estimate', 'Leak Detection', 'Installation'],
    image: 'https://images.unsplash.com/photo-1621961482235-ae412550b76e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Rajkot Plumbing Services',
      rating: 4.8,
      reviews: 156,
      experience: '10 years',
      contact: '+91-98251-11223'
    },
    timings: '24/7',
    area: 'Mavdi',
    isVerified: true,
    responseTime: '30 mins'
  },
  {
    id: 'plumber2',
    name: 'Quick Fix Plumbing',
    category: 'plumber',
    rating: 4.5,
    location: 'University Road, Rajkot',
    description: 'Reliable plumbing solutions for residential and commercial properties. Quick response and quality service.',
    price: 250,
    features: ['Leak Repair', 'Bathroom Fittings', 'Drain Cleaning', 'Installation', 'Water Heater Repair', 'Pipe Replacement'],
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Quick Fix Services',
      rating: 4.6,
      reviews: 89,
      experience: '7 years',
      contact: '+91-98765-43210'
    },
    timings: '8:00 AM - 10:00 PM',
    area: 'University Road',
    isVerified: true,
    responseTime: '45 mins'
  },
  {
    id: 'electrician1',
    name: 'Rajkot Electric Solutions',
    category: 'electrician',
    rating: 4.8,
    location: 'Gandhigram, Rajkot',
    description: 'Licensed electricians for all electrical work. Specialized in wiring, MCB repair, and home automation.',
    price: 400,
    features: ['Wiring', 'MCB Repair', 'Inverter Setup', 'Home Automation', 'Electrical Safety', 'Lighting Installation'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Electric Solutions Rajkot',
      rating: 4.9,
      reviews: 203,
      experience: '12 years',
      contact: '+91-97270-55667'
    },
    timings: '9:00 AM - 9:00 PM',
    area: 'Gandhigram',
    isVerified: true,
    responseTime: '1 hour'
  },
  {
    id: 'painter1',
    name: 'Color World Painting',
    category: 'painter',
    rating: 4.6,
    location: 'Nana Mava Road, Rajkot',
    description: 'Professional painting services for homes and offices. Expert in wall painting, texture work, and waterproofing.',
    price: 15,
    features: ['Wall Painting', 'Texture Work', 'Waterproofing', 'Color Consultation', 'Exterior Painting', 'Polish Work'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Color World Painters',
      rating: 4.7,
      reviews: 145,
      experience: '9 years',
      contact: '+91-98989-77665'
    },
    timings: '8:00 AM - 7:00 PM',
    area: 'Nana Mava',
    isVerified: true
  },
  {
    id: 'cleaning1',
    name: 'Sparkle Clean Rajkot',
    category: 'cleaning',
    rating: 4.4,
    location: 'Karanpara, Rajkot',
    description: 'Complete home and office cleaning services using eco-friendly products. Deep cleaning and post-construction cleaning.',
    price: 1500,
    features: ['Deep Cleaning', 'Carpet Cleaning', 'Sofa Cleaning', 'Post Construction', 'Kitchen Cleaning', 'Bathroom Sanitization'],
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Sparkle Clean Services',
      rating: 4.5,
      reviews: 112,
      experience: '5 years',
      contact: '+91-95123-44556'
    },
    timings: '8:00 AM - 8:00 PM',
    area: 'Karanpara',
    isVerified: true
  },
  {
    id: 'mechanic1',
    name: 'Rajkot Auto Care',
    category: 'mechanic',
    rating: 4.7,
    location: '150ft Ring Road, Rajkot',
    description: 'Complete car and bike repair services with experienced mechanics. Specialized in engine repair and AC service.',
    price: 500,
    features: ['Engine Repair', 'AC Service', 'Denting Painting', 'Battery Replacement', 'General Service', 'Brake Repair'],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Auto Care Rajkot',
      rating: 4.8,
      reviews: 178,
      experience: '11 years',
      contact: '+91-98250-99887'
    },
    timings: '9:00 AM - 7:00 PM',
    area: 'Ring Road',
    isVerified: true
  },
  {
    id: 'ac1',
    name: 'Cool Care AC Services',
    category: 'electrician',
    rating: 4.5,
    location: 'Jagnath Plot, Rajkot',
    description: 'Professional AC installation, repair and maintenance services. Gas filling and regular service available.',
    price: 600,
    features: ['AC Installation', 'Gas Filling', 'Service', 'Repair', 'Maintenance', 'Cleaning'],
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Cool Care Services',
      rating: 4.6,
      reviews: 134,
      experience: '8 years',
      contact: '+91-98765-11223'
    },
    timings: '9:00 AM - 8:00 PM',
    area: 'Jagnath Plot',
    isVerified: true,
    responseTime: '2 hours'
  },
  {
    id: 'mechanic2',
    name: 'City Garage',
    category: 'mechanic',
    rating: 4.5,
    location: 'University Road, Rajkot',
    description: 'Multi-brand car service center with skilled mechanics. Wheel alignment and general service available.',
    price: 400,
    features: ['General Service', 'Brake Repair', 'Wheel Alignment', 'Oil Change', 'Tire Replacement', 'Electrical Repair'],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'City Garage Rajkot',
      rating: 4.6,
      reviews: 123,
      experience: '6 years',
      contact: '+91-98766-55443'
    },
    timings: '8:00 AM - 8:00 PM',
    area: 'University Road',
    isVerified: true
  },
  {
    id: 'electrician2',
    name: 'Safe Electricals',
    category: 'electrician',
    rating: 4.6,
    location: 'Jagnath Plot, Rajkot',
    description: 'Specialized in home and industrial electrical work. Solar installation and rewiring services available.',
    price: 350,
    features: ['Home Automation', 'Solar Installation', 'Rewiring', 'Electrical Safety', 'Panel Installation', 'Troubleshooting'],
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    vendor: {
      name: 'Safe Electrical Services',
      rating: 4.7,
      reviews: 134,
      experience: '9 years',
      contact: '+91-98255-66778'
    },
    timings: '9:00 AM - 7:00 PM',
    area: 'Jagnath Plot',
    isVerified: true,
    responseTime: '2 hours'
  }
]

export const serviceService = {
  getAllServices: async (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredServices = [...rajkotServices]
        
        if (filters.category && filters.category !== 'all') {
          filteredServices = filteredServices.filter(
            service => service.category.toLowerCase() === filters.category.toLowerCase()
          )
        }
        
        if (filters.search) {
          const searchTerm = filters.search.toLowerCase()
          filteredServices = filteredServices.filter(
            service => 
              service.name.toLowerCase().includes(searchTerm) ||
              service.description.toLowerCase().includes(searchTerm) ||
              service.category.toLowerCase().includes(searchTerm)
          )
        }
        
        if (filters.area && filters.area !== 'all') {
          filteredServices = filteredServices.filter(
            service => service.area && service.area.toLowerCase().includes(filters.area.toLowerCase())
          )
        }
        
        if (filters.minRating) {
          filteredServices = filteredServices.filter(
            service => service.rating >= filters.minRating
          )
        }
        
        resolve({ 
          services: filteredServices, 
          total: filteredServices.length,
          filters: filters 
        })
      }, 300) // Reduced delay for better UX
    })
  },

  getServiceById: async (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Try to find exact match
        let service = rajkotServices.find(s => s.id === id)
        
        // If not found, try case-insensitive match
        if (!service) {
          service = rajkotServices.find(s => 
            s.id.toLowerCase() === id.toLowerCase() || 
            s.name.toLowerCase().includes(id.toLowerCase())
          )
        }
        
        // If still not found, try to find by numeric ID
        if (!service && !isNaN(id)) {
          const index = parseInt(id) - 1
          if (index >= 0 && index < rajkotServices.length) {
            service = rajkotServices[index]
          }
        }
        
        if (service) {
          resolve(service)
        } else {
          // Return a default service instead of rejecting
          resolve({
            id: id,
            name: 'Service Details',
            category: 'general',
            rating: 4.5,
            location: 'Rajkot, Gujarat',
            description: 'This service provides quality work with experienced professionals.',
            price: 500,
            features: ['Professional Service', 'Quality Work', 'Timely Completion', 'Customer Support'],
            image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
            vendor: {
              name: 'City Navigator Vendor',
              rating: 4.5,
              reviews: 100,
              experience: '5 years',
              contact: '+91-98765-43210'
            },
            timings: '9:00 AM - 7:00 PM',
            area: 'Rajkot',
            isVerified: true
          })
        }
      }, 200) // Fast response for better UX
    })
  },

  searchServices: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = rajkotServices.filter(
          service =>
            service.name.toLowerCase().includes(query.toLowerCase()) ||
            service.category.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase()) ||
            (service.area && service.area.toLowerCase().includes(query.toLowerCase()))
        )
        resolve(results)
      }, 300)
    })
  },

  getServicesByCategory: async (category) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = rajkotServices.filter(
          service => service.category.toLowerCase() === category.toLowerCase()
        )
        resolve(results)
      }, 300)
    })
  },

  getFeaturedServices: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return services with highest ratings
        const featured = [...rajkotServices]
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6)
        resolve(featured)
      }, 300)
    })
  }
}

  export const authService = {
  login: async (email, password) => {
    const data = await api.post('/auth/login', {
      email,
      password
    })
    return data; // { user, token }
  },

  register: async (userData) => {
    const data = await api.post('/auth/register', userData)
    return data; // { user, token }
  },

  getCurrentUser: async () => {
    const data = await api.get('/auth/me')
    return data; // real logged-in user
  },

  logout: async () => {
    localStorage.removeItem('token')
    return { success: true }
  }
}



export const vendorService = {
  getAllVendors: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Extract unique vendors from services
        const vendors = rajkotServices.map(service => ({
          id: service.vendor.name.toLowerCase().replace(/\s+/g, '-'),
          name: service.vendor.name,
          rating: service.vendor.rating,
          services: Math.floor(Math.random() * 20) + 5,
          category: service.category,
          image: service.image,
          experience: service.vendor.experience
        }))
        
        // Remove duplicates
        const uniqueVendors = Array.from(new Map(vendors.map(v => [v.id, v])).values())
        
        resolve(uniqueVendors)
      }, 500)
    })
  },

  getVendorById: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const vendorServices = rajkotServices.filter(service => 
          service.vendor.name.toLowerCase().replace(/\s+/g, '-') === id
        )
        
        if (vendorServices.length > 0) {
          const vendor = {
            id: id,
            name: vendorServices[0].vendor.name,
            rating: vendorServices[0].vendor.rating,
            reviews: vendorServices[0].vendor.reviews,
            experience: vendorServices[0].vendor.experience,
            contact: vendorServices[0].vendor.contact,
            services: vendorServices,
            totalServices: vendorServices.length,
            categories: [...new Set(vendorServices.map(s => s.category))]
          }
          resolve(vendor)
        } else {
          resolve({
            id: id,
            name: 'Sample Vendor',
            rating: 4.5,
            reviews: 100,
            experience: '5 years',
            contact: '+91 98765 43210',
            services: rajkotServices.slice(0, 3),
            totalServices: 3,
            categories: ['salon', 'restaurant', 'hotel']
          })
        }
      }, 500)
    })
  },
  changePassword: async (currentPassword, newPassword) => {
  return api.put("/vendor/change-password", {
    currentPassword,
    newPassword
  });
},


  registerVendor: async (vendorData) => {
  const data = await api.post('/vendor/register', vendorData);
  return data;
},

loginVendor: async (email, password) => {
  const data = await api.post('/vendor/login', {
    email,
    password
  });
  return data; // { token, user }
}

}



// Additional utility functions
export const categoryService = {
  getAllCategories: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const categories = [...new Set(rajkotServices.map(service => service.category))]
        const categoryData = categories.map(category => {
          const categoryServices = rajkotServices.filter(s => s.category === category)
          return {
            id: category,
            name: category.charAt(0).toUpperCase() + category.slice(1),
            icon: getCategoryIcon(category),
            count: categoryServices.length,
            avgRating: (categoryServices.reduce((sum, s) => sum + s.rating, 0) / categoryServices.length).toFixed(1)
          }
        })
        
        // Add 'all' category
        categoryData.unshift({
          id: 'all',
          name: 'All Services',
          icon: '📍',
          count: rajkotServices.length,
          avgRating: (rajkotServices.reduce((sum, s) => sum + s.rating, 0) / rajkotServices.length).toFixed(1)
        })
        
        resolve(categoryData)
      }, 300)
    })
  },

  getAreaList: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const areas = [...new Set(rajkotServices.map(service => service.area).filter(Boolean))]
        resolve(['All Areas', ...areas.sort()])
      }, 300)
    })
  }
}

// Helper function for category icons
const getCategoryIcon = (category) => {
  const icons = {
    salon: '💇',
    restaurant: '🍽️',
    hotel: '🏨',
    plumber: '🚰',
    electrician: '⚡',
    painter: '🎨',
    cleaning: '🧹',
    mechanic: '🔧',
    general: '📍'
  }
  return icons[category] || '📍'
}

export default api