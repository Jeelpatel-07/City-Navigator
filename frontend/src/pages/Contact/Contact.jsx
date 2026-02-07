// frontend/src/pages/Contact/Contact.jsx - COMPLETE UPDATED VERSION WITH REACT ROUTER LINKS
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiClock,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiMessageSquare,
  FiUser,
  FiChevronDown,
  FiChevronUp,
  FiMessageCircle,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiArrowRight,
  FiBookOpen,
  FiShield
} from 'react-icons/fi';
import Button from '../../components/Common/Button.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const contactMethods = [
    {
      id: 'email',
      title: 'Email Support',
      description: 'Get detailed responses within 24 hours',
      icon: <FiMail className="text-2xl" />,
      value: 'support@citynavigator.com',
      color: 'from-blue-500 to-blue-700',
      action: () => window.location.href = 'mailto:support@citynavigator.com'
    },
    {
      id: 'phone',
      title: 'Phone Support',
      description: 'Call us for immediate assistance',
      icon: <FiPhone className="text-2xl" />,
      value: '+91 98765 43210',
      color: 'from-green-500 to-green-700',
      action: () => window.location.href = 'tel:+919876543210'
    },
    {
      id: 'visit',
      title: 'Visit Our Office',
      description: 'Meet us in person at our headquarters',
      icon: <FiMapPin className="text-2xl" />,
      value: 'Rajkot, Gujarat, India',
      color: 'from-purple-500 to-purple-700',
      action: () => window.open('https://maps.google.com/?q=Rajkot,Gujarat,India', '_blank')
    }
  ];

  const contactHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Emergency Support Only' }
  ];

  const faqs = [
    {
      question: 'How do I register as a vendor?',
      answer: 'Visit our Vendor Join page and complete the simple registration form. Our team will review your application within 24-48 hours and get back to you.'
    },
    {
      question: 'How long does service booking take?',
      answer: 'Most services can be booked instantly. Some premium services may require vendor confirmation within 2-4 hours. You\'ll receive instant confirmation for available services.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes! Our mobile app is available on both iOS and Android platforms. You can download it from the App Store or Google Play Store. Search for "City Navigator".'
    },
    {
      question: 'How do I report an issue with a service?',
      answer: 'You can report issues directly through your booking history dashboard or contact our support team via email/phone for immediate assistance. We resolve most issues within 24 hours.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All payments are secure and encrypted.'
    },
    {
      question: 'Can I cancel or reschedule a booking?',
      answer: 'Yes, you can cancel or reschedule bookings up to 2 hours before the scheduled time through your dashboard. Some services may have specific cancellation policies.'
    }
  ];

  const socialMedia = [
    {
      name: 'Twitter',
      handle: '@CityNavigator',
      icon: <FiTwitter className="text-2xl" />,
      color: 'from-sky-400 to-sky-600',
      url: 'https://twitter.com/CityNavigator'
    },
    {
      name: 'LinkedIn',
      handle: 'City Navigator',
      icon: <FiLinkedin className="text-2xl" />,
      color: 'from-blue-500 to-blue-700',
      url: 'https://linkedin.com/company/city-navigator'
    },
    {
      name: 'Facebook',
      handle: 'CityNavigatorOfficial',
      icon: <FiFacebook className="text-2xl" />,
      color: 'from-indigo-500 to-indigo-700',
      url: 'https://facebook.com/CityNavigatorOfficial'
    },
    {
      name: 'Instagram',
      handle: '@city_navigator',
      icon: <FiInstagram className="text-2xl" />,
      color: 'from-pink-500 to-pink-700',
      url: 'https://instagram.com/city_navigator'
    }
  ];

  const quickLinks = [
    { title: 'Browse Services', link: '/services', description: 'Find local services' },
    { title: 'Become Vendor', link: '/vendor/join', description: 'Join our platform' },
    { title: 'User Guide', link: '/guide', description: 'How to use platform' },
    { title: 'Privacy Policy', link: '/privacy', description: 'Your data security' },
  ];

  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (submitStatus) {
    setSubmitStatus(null);
  }
};


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
    setSubmitStatus("error");
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus(null);

  try {
    const res = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Failed to send message");
    }

    setSubmitStatus("success");
    setFormData({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};



  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-grid-white/10"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Get in <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Have questions? We're here to help. Reach out to us through any channel below.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FiMessageCircle className="text-yellow-400" />
              <span>Average response time: Under 2 hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Choose Your Preferred Contact Method</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Multiple ways to connect with our support team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method) => (
              <div 
                key={method.id}
                className={`bg-gradient-to-br ${method.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{method.title}</h3>
                    <p className="text-sm opacity-90">{method.description}</p>
                  </div>
                </div>
                <p className="text-lg font-medium mb-4">{method.value}</p>
                <button 
                  className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                  onClick={method.action}
                >
                  {method.id === 'email' ? 'Send Email' : 
                   method.id === 'phone' ? 'Call Now' : 'Get Directions'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Simplified Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-3 text-gray-800 dark:text-white">
                Send Us a Message
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Just fill in the basics and we'll get back to you ASAP.
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl animate-fade-in">
                <div className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-300">
                      Message Sent Successfully!
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl animate-fade-in">
                <div className="flex items-center">
                  <FiAlertCircle className="text-red-500 mr-3 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-300">
                      Please fill all required fields
                    </p>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                      Name, email, and message are required.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  <span className="flex items-center">
                    <FiUser className="mr-2" size={16} />
                    Your Name *
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  <span className="flex items-center">
                    <FiMail className="mr-2" size={16} />
                    Email Address *
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  <span className="flex items-center">
                    <FiMessageSquare className="mr-2" size={16} />
                    Your Message *
                  </span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-4 text-lg font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                loading={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <FiSend className="inline mr-2" />
                    Send Message
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                We respect your privacy. Your information is secure with us.
              </p>
            </form>
          </div>

          {/* Right Column - Info, Map & FAQs */}
          <div className="space-y-8">
            {/* Rajkot Map */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center text-white mr-3">
                  <FiMapPin className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Our Location in Rajkot</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Visit our headquarters</p>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="rounded-xl overflow-hidden shadow-md mb-4">
                <iframe
                  title="Rajkot Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.68201848908!2d70.75125535930645!3d22.273630792979746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-64"
                ></iframe>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiMapPin className="mr-3 text-gray-400" />
                  <span>Rajkot, Gujarat, India</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <FiPhone className="mr-3 text-gray-400" />
                  <span>+91 98765 43210</span>
                </div>
              </div>

              <button 
                onClick={() => window.open('https://maps.google.com/?q=Rajkot,Gujarat,India', '_blank')}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all hover:shadow-lg"
              >
                Open in Google Maps
              </button>
            </div>

            {/* Office Hours */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center text-white mr-3">
                  <FiClock className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Office Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">When we're available</p>
                </div>
              </div>

              <div className="space-y-3">
                {contactHours.map((hour, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">{hour.day}</span>
                    <span className={`font-medium ${hour.day.includes('Sunday') ? 'text-red-600 dark:text-red-400' : 'text-blue-600 dark:text-blue-400'}`}>
                      {hour.hours}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <span className="font-semibold">Note:</span> Emergency support available 24/7 for service-related issues.
                </p>
              </div>
            </div>

            {/* Dropdown FAQs */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center text-white mr-3">
                  <FiMessageSquare className="text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Frequently Asked Questions</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Quick answers to common questions</p>
                </div>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="font-medium text-gray-800 dark:text-gray-200 pr-4">
                        {faq.question}
                      </span>
                      {openFaqIndex === index ? (
                        <FiChevronUp className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      ) : (
                        <FiChevronDown className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
                      )}
                    </button>
                    
                    {openFaqIndex === index && (
                      <div className="px-4 pb-4 animate-fade-in">
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Still have questions? <button className="text-blue-600 dark:text-blue-400 hover:underline">Contact us directly</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Follow Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Follow Us on Social Media</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Stay updated with latest news, tips, and community updates
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {socialMedia.map((platform, index) => (
              <a
                key={index}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${platform.color} rounded-2xl p-6 text-white text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                    {platform.icon}
                  </div>
                </div>
                <h4 className="font-bold text-lg mb-1">{platform.name}</h4>
                <p className="text-sm opacity-90 mb-4">{platform.handle}</p>
                <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all duration-300">
                  Follow Us
                </button>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Join our growing community of 50,000+ followers
            </p>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Help & Resources</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Additional resources to help you get the most out of City Navigator
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Link 
              to="/guide" 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white">
                  <FiBookOpen className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">User Guide</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Complete instructions</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Step-by-step tutorials, video guides, and FAQs to help you master City Navigator
              </p>
              <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
                <span>Explore Guide</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>

            <Link 
              to="/privacy" 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center text-white">
                  <FiShield className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Privacy Policy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your data protection</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Learn how we protect your data, your privacy rights, and our security measures
              </p>
              <div className="flex items-center text-green-600 dark:text-green-400 font-medium group-hover:gap-3 transition-all">
                <span>Read Policy</span>
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200 text-sm">Support Available</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold mb-2">2h</div>
              <div className="text-blue-200 text-sm">Avg Response Time</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-200 text-sm">Satisfaction Rate</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-blue-200 text-sm">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick Links</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Need something else? Check these out.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {quickLinks.map((item, index) => (
              <Link 
                key={index}
                to={item.link}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;