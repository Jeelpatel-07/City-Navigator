// frontend/src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import { useState } from 'react';
import { 
  FiShield, 
  FiLock, 
  FiEye, 
  FiDatabase,
  FiUserCheck,
  FiGlobe,
  FiDownload,
  FiMail,
  FiCheckCircle,
  FiAlertCircle,
  FiArrowRight
} from 'react-icons/fi';
import { HiOutlineDocumentText, HiOutlineShieldCheck } from 'react-icons/hi';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [consentGiven, setConsentGiven] = useState({
    analytics: true,
    marketing: false,
    cookies: true
  });

  const sections = [
    { id: 'overview', title: 'Overview', icon: <FiGlobe /> },
    { id: 'data-collection', title: 'Data Collection', icon: <FiDatabase /> },
    { id: 'data-use', title: 'Data Use', icon: <FiEye /> },
    { id: 'data-sharing', title: 'Data Sharing', icon: <FiUserCheck /> },
    { id: 'security', title: 'Security', icon: <FiShield /> },
    { id: 'rights', title: 'Your Rights', icon: <FiCheckCircle /> }
  ];

  const policySections = {
    overview: {
      title: 'Privacy Overview',
      lastUpdated: 'December 15, 2023',
      content: [
        'City Navigator is committed to protecting your privacy and personal data.',
        'This policy explains how we collect, use, and protect your information.',
        'By using our services, you agree to the terms outlined in this policy.'
      ],
      keyPoints: [
        'We never sell your personal data',
        'You control your privacy settings',
        'Transparent data practices',
        'GDPR and CCPA compliant'
      ]
    },
    'data-collection': {
      title: 'Data We Collect',
      content: [
        'We collect information to provide and improve our services:',
        '• Personal Information: Name, email, phone number when you register',
        '• Location Data: To find services near you (with your consent)',
        '• Usage Data: How you interact with our platform',
        '• Payment Information: Processed securely through payment gateways',
        '• Communication Data: Emails, chats with service providers'
      ],
      note: 'We only collect data necessary for service delivery.'
    },
    'data-use': {
      title: 'How We Use Your Data',
      content: [
        'Your data helps us provide better services:',
        '• Service Delivery: To connect you with local service providers',
        '• Personalization: To show relevant services and recommendations',
        '• Communication: To send important updates and notifications',
        '• Improvement: To analyze and enhance our platform',
        '• Security: To protect against fraud and abuse'
      ],
      legalBasis: [
        'Contract: Necessary for service delivery',
        'Consent: For optional features and marketing',
        'Legitimate Interest: For platform improvement and security'
      ]
    },
    'data-sharing': {
      title: 'Data Sharing',
      content: [
        'We only share data when necessary:',
        '• With Service Providers: To facilitate bookings (limited information)',
        '• Payment Processors: For transaction processing',
        '• Legal Requirements: When required by law',
        '• Business Transfers: In case of merger or acquisition'
      ],
      restrictions: [
        'Never sold to third parties',
        'Anonymized for analytics',
        'Strict data processing agreements'
      ]
    },
    security: {
      title: 'Security Measures',
      content: [
        'We implement industry-standard security:',
        '• Encryption: All data transmitted using TLS/SSL',
        '• Access Control: Limited employee access to data',
        '• Regular Audits: Security assessments and penetration testing',
        '• Data Minimization: Collect only what we need',
        '• Incident Response: 24/7 monitoring and rapid response'
      ],
      certifications: [
        'ISO 27001 Compliant',
        'GDPR Compliant',
        'Regular Security Audits'
      ]
    },
    rights: {
      title: 'Your Privacy Rights',
      content: [
        'You have control over your data:',
        '• Access: Request a copy of your personal data',
        '• Correction: Update or correct your information',
        '• Deletion: Request deletion of your data',
        '• Portability: Receive your data in machine-readable format',
        '• Objection: Object to certain data processing',
        '• Consent Withdrawal: Withdraw consent at any time'
      ],
      howToExercise: 'Contact our Data Protection Officer at privacy@citynavigator.com'
    }
  };

  const dataTypes = [
    {
      category: 'Personal Data',
      items: ['Name', 'Email', 'Phone', 'Address'],
      purpose: 'Account creation and communication',
      retention: 'Until account deletion'
    },
    {
      category: 'Usage Data',
      items: ['Search history', 'Bookings', 'Preferences'],
      purpose: 'Service improvement',
      retention: '24 months'
    },
    {
      category: 'Location Data',
      items: ['City', 'Area', 'GPS (optional)'],
      purpose: 'Local service matching',
      retention: 'Until consent withdrawal'
    },
    {
      category: 'Payment Data',
      items: ['Transaction records', 'Payment method'],
      purpose: 'Service processing',
      retention: 'As required by law'
    }
  ];

  const handleConsentChange = (type) => {
    setConsentGiven(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-grid-white/10"></div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <HiOutlineShieldCheck className="text-green-400" />
              <span className="text-sm">Your Privacy Matters</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Privacy <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Policy</span>
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Transparent, secure, and respectful of your data rights
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => document.getElementById('consent-manager').scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Manage Consent
              </button>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-all"
              >
                <FiMail className="inline mr-2" />
                Contact DPO
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Policy Status */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white mb-12 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Policy Status: Active</h3>
              <p className="text-green-100">Last updated: {policySections.overview.lastUpdated}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-300" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-300" />
                <span>CCPA Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-green-300" />
                <span>ISO 27001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-6">
                <h3 className="text-lg font-bold mb-6 text-gray-800 dark:text-white">Policy Sections</h3>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-900 transition-all">
                  <FiDownload />
                  Download Policy
                </button>
                <a 
                  href="/contact" 
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                >
                  <FiMail />
                  Privacy Questions
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Active Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  {sections.find(s => s.id === activeSection)?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {policySections[activeSection].title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">Detailed information about this aspect</p>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
                {policySections[activeSection].content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key Points */}
              {policySections[activeSection].keyPoints && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Key Points</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {policySections[activeSection].keyPoints.map((point, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <FiCheckCircle className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Legal Basis */}
              {policySections[activeSection].legalBasis && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                  <h4 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Legal Basis</h4>
                  <div className="space-y-2">
                    {policySections[activeSection].legalBasis.map((basis, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <HiOutlineDocumentText className="text-purple-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{basis}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Data Collection Overview */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Data Collection Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dataTypes.map((dataType, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                        <FiDatabase />
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white">{dataType.category}</h4>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Includes:</h5>
                      <div className="flex flex-wrap gap-2">
                        {dataType.items.map((item, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Purpose:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{dataType.purpose}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Retention:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{dataType.retention}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consent Manager */}
            <div id="consent-manager" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <FiShield className="text-2xl text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Your Consent</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Control how your data is used. You can change these settings anytime.
              </p>

              <div className="space-y-4">
                {[
                  {
                    id: 'analytics',
                    title: 'Analytics Cookies',
                    description: 'Help us understand how you use our platform to improve services',
                    required: false
                  },
                  {
                    id: 'marketing',
                    title: 'Marketing Communications',
                    description: 'Receive updates about new features and promotions',
                    required: false
                  },
                  {
                    id: 'cookies',
                    title: 'Essential Cookies',
                    description: 'Required for basic platform functionality',
                    required: true,
                    disabled: true
                  }
                ].map((setting) => (
                  <div key={setting.id} className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-gray-800 dark:text-white">{setting.title}</h4>
                        {setting.required && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{setting.description}</p>
                    </div>
                    <div className="ml-4">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consentGiven[setting.id]}
                          onChange={() => !setting.disabled && handleConsentChange(setting.id)}
                          disabled={setting.disabled}
                          className="sr-only peer"
                        />
                        <div className={`w-11 h-6 rounded-full peer ${setting.disabled ? 'bg-gray-300 dark:bg-gray-600' : 'bg-gray-200 dark:bg-gray-600'} peer-checked:bg-green-500 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 transition-colors`}>
                          <div className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${consentGiven[setting.id] ? 'translate-x-full' : ''}`}></div>
                        </div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button 
                  onClick={() => {
                    // In real app, save preferences to backend
                    alert('Consent preferences saved!');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-700 transition-all"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Data Rights */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <FiCheckCircle className="text-2xl" />
                <h3 className="text-2xl font-bold">Exercise Your Rights</h3>
              </div>
              
              <p className="mb-6 opacity-90">
                You have full control over your personal data. Here's how to exercise your rights:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { title: 'Access Data', action: 'Request copy', icon: '📋' },
                  { title: 'Correct Data', action: 'Update information', icon: '✏️' },
                  { title: 'Delete Data', action: 'Request deletion', icon: '🗑️' },
                  { title: 'Data Portability', action: 'Export data', icon: '📤' },
                  { title: 'Object', action: 'Opt-out', icon: '🚫' },
                  { title: 'Restrict', action: 'Limit processing', icon: '⏸️' },
                ].map((right, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                    <div className="text-2xl mb-2">{right.icon}</div>
                    <h4 className="font-bold mb-1">{right.title}</h4>
                    <p className="text-sm opacity-80">{right.action}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/contact" 
                  className="px-6 py-3 bg-white text-indigo-900 font-semibold rounded-xl hover:bg-gray-100 transition-all text-center"
                >
                  Contact Data Protection Officer
                </a>
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all">
                  Download Data Request Form
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div id="contact" className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Contact Our Privacy Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-4 text-gray-700 dark:text-gray-300">Data Protection Officer</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FiMail className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">privacy@citynavigator.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <HiOutlineDocumentText className="text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">DPO Request Form</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold mb-4 text-gray-700 dark:text-gray-300">Response Time</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">General Inquiries:</span>
                      <span className="font-medium">48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Data Requests:</span>
                      <span className="font-medium">30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Urgent Matters:</span>
                      <span className="font-medium">24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;