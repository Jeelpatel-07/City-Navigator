// frontend/src/pages/UserGuide/UserGuide.jsx
import { useState } from 'react';
import { 
  FiSearch, 
  FiMapPin, 
  FiUser, 
  FiCheckCircle, 
  FiClock,
  FiStar,
  FiMessageCircle,
  FiCreditCard,
  FiShield,
  FiSmartphone,
  FiHelpCircle,
  FiVideo,
  FiDownload,
  FiBookOpen,
  FiTarget,
  FiTrendingUp,
  FiAward
} from 'react-icons/fi';
import { HiOutlineDocumentText, HiOutlineUserGroup } from 'react-icons/hi';

const UserGuide = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: <FiTarget />, color: 'from-blue-500 to-cyan-500' },
    { id: 'search-booking', title: 'Search & Booking', icon: <FiSearch />, color: 'from-green-500 to-emerald-500' },
    { id: 'vendor', title: 'For Vendors', icon: <FiUser />, color: 'from-purple-500 to-pink-500' },
    { id: 'account', title: 'Account & Settings', icon: <FiUser />, color: 'from-orange-500 to-red-500' },
    { id: 'safety', title: 'Safety & Security', icon: <FiShield />, color: 'from-indigo-500 to-blue-500' }
  ];

  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Search for the service, select your preferred provider, choose a time slot, and confirm booking. You\'ll receive instant confirmation.'
    },
    {
      question: 'Can I cancel or reschedule a booking?',
      answer: 'Yes, you can cancel or reschedule up to 2 hours before the appointment through your bookings dashboard.'
    },
    {
      question: 'How are service providers verified?',
      answer: 'All providers undergo background checks, document verification, and quality assessments before being listed.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, UPI, net banking, and popular digital wallets. All payments are secure.'
    },
    {
      question: 'How do I contact customer support?',
      answer: 'Use the in-app chat, call our 24/7 helpline, or email support@citynavigator.com'
    }
  ];

  const guides = {
    'getting-started': [
      {
        title: 'Create Your Account',
        steps: [
          'Click Sign Up and enter your details',
          'Verify your email address',
          'Complete your profile for better recommendations'
        ],
        icon: <FiUser />,
        time: '2 minutes'
      },
      {
        title: 'Set Your Location',
        steps: [
          'Allow location access for accurate results',
          'Manually enter your city if preferred',
          'Save frequently visited locations'
        ],
        icon: <FiMapPin />,
        time: '1 minute'
      },
      {
        title: 'Explore Services',
        steps: [
          'Browse categories or use search',
          'Filter by rating, price, or distance',
          'Save favorites for quick access'
        ],
        icon: <FiSearch />,
        time: '3 minutes'
      }
    ],
    'search-booking': [
      {
        title: 'Finding Services',
        steps: [
          'Use smart search with filters',
          'Read reviews and ratings',
          'Compare prices and services'
        ],
        icon: <FiSearch />,
        time: '2 minutes'
      },
      {
        title: 'Booking Process',
        steps: [
          'Select service and provider',
          'Choose date and time',
          'Add special instructions if needed'
        ],
        icon: <FiCheckCircle />,
        time: '3 minutes'
      },
      {
        title: 'Payment & Confirmation',
        steps: [
          'Select preferred payment method',
          'Review booking details',
          'Get instant confirmation'
        ],
        icon: <FiCreditCard />,
        time: '2 minutes'
      }
    ],
    'vendor': [
      {
        title: 'Vendor Registration',
        steps: [
          'Submit registration form',
          'Upload required documents',
          'Complete verification process'
        ],
        icon: <FiUser />,
        time: '10 minutes'
      },
      {
        title: 'Service Management',
        steps: [
          'Add and manage services',
          'Set availability calendar',
          'Update pricing and packages'
        ],
        icon: <FiTrendingUp />,
        time: '5 minutes'
      },
      {
        title: 'Booking Management',
        steps: [
          'Receive and confirm bookings',
          'Manage calendar and appointments',
          'Handle customer communication'
        ],
        icon: <FiClock />,
        time: '3 minutes'
      }
    ]
  };

  const features = [
    {
      title: 'Smart Search',
      description: 'AI-powered recommendations based on your preferences',
      icon: <FiSearch />,
      color: 'bg-blue-500'
    },
    {
      title: 'Verified Providers',
      description: 'All service providers undergo strict verification',
      icon: <FiShield />,
      color: 'bg-green-500'
    },
    {
      title: 'Instant Booking',
      description: 'Book services instantly with real-time availability',
      icon: <FiCheckCircle />,
      color: 'bg-purple-500'
    },
    {
      title: 'Secure Payments',
      description: 'Multiple secure payment options with encryption',
      icon: <FiCreditCard />,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-grid-white/10"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FiBookOpen className="text-yellow-400" />
              <span className="text-sm">Complete User Guide</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Complete <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Guide</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Everything you need to know about using City Navigator like a pro
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="#quick-start" 
                className="px-6 py-3 bg-white text-blue-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Quick Start
              </a>
              <a 
                href="#video-tutorials" 
                className="px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                <FiVideo className="inline mr-2" />
                Watch Tutorials
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">5 min</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Avg. Setup Time</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support Available</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">10K+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">Guide Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        activeSection === section.id
                          ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>

                {/* Download Guide */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all">
                    <FiDownload />
                    Download PDF Guide
                  </button>
                </div>
              </div>

              {/* Quick Help */}
              <div className="mt-6 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white">
                <HiOutlineUserGroup className="text-3xl mb-4" />
                <h4 className="font-bold text-lg mb-2">Need Immediate Help?</h4>
                <p className="text-sm opacity-90 mb-4">Our support team is available 24/7</p>
                <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Current Section Guide */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${sections.find(s => s.id === activeSection)?.color} text-white`}>
                  {sections.find(s => s.id === activeSection)?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {sections.find(s => s.id === activeSection)?.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Step-by-step instructions</p>
                </div>
              </div>

              <div className="space-y-6">
                {guides[activeSection]?.map((guide, index) => (
                  <div key={index} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white">
                          {guide.icon}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{guide.title}</h3>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                        {guide.time}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {guide.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <FiCheckCircle className="text-green-600 dark:text-green-400" size={14} />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Key Features Explained</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-white`}>
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-800 dark:text-white">{feature.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                      Learn more →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <FiHelpCircle className="text-2xl text-blue-600 dark:text-blue-400" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full p-5 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200 pr-4">
                        {faq.question}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {openFaqIndex === index ? '−' : '+'}
                      </span>
                    </button>
                    
                    {openFaqIndex === index && (
                      <div className="px-5 pb-5 animate-fade-in">
                        <p className="text-gray-600 dark:text-gray-400">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <FiMessageCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <span className="font-semibold">Still have questions?</span> Our support team is ready to help you 24/7.
                  </p>
                </div>
              </div>
            </div>

            {/* Video Tutorials */}
            <div id="video-tutorials" className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Video Tutorials</h3>
                <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2">
                  <FiVideo />
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: 'Getting Started Guide', duration: '5:30', thumbnail: '🎬' },
                  { title: 'Booking Services', duration: '4:15', thumbnail: '📅' },
                  { title: 'Vendor Dashboard', duration: '7:20', thumbnail: '🏪' },
                ].map((video, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-all">
                    <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-5xl">
                      {video.thumbnail}
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-800 dark:text-white mb-2">{video.title}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{video.duration}</span>
                        <button className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                          Watch Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;