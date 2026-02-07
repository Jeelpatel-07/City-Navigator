// frontend/src/pages/About/About.jsx - UPDATED with fallback avatars
import { useState } from 'react';
import { 
  FiTarget, 
  FiEye, 
  FiHeart, 
  FiCheckCircle,
  FiUsers,
  FiShield,
  FiAward,
  FiCode,
  FiGlobe,
  FiStar,
  FiClock,
  FiSmartphone,
  FiServer
} from 'react-icons/fi';
import './About.css';

const About = () => {
  const [activeTab, setActiveTab] = useState('mission');

  // Mission, Vision, Values data (keep as before)
  const coreValues = [
    {
      id: 'mission',
      title: 'Our Mission',
      description: 'To revolutionize how people discover and connect with local service providers, creating a seamless bridge between quality services and community needs.',
      icon: <FiTarget className="text-4xl" />,
      color: 'from-blue-500 to-blue-700',
      details: [
        'Empowering local businesses with digital visibility',
        'Ensuring quality service discovery for every user',
        'Building trust through verified vendor networks',
        'Creating sustainable local economies'
      ]
    },
    {
      id: 'vision',
      title: 'Our Vision',
      description: 'To become the most trusted and comprehensive local services platform, transforming how communities access essential services worldwide.',
      icon: <FiEye className="text-4xl" />,
      color: 'from-purple-500 to-purple-700',
      details: [
        'Global expansion to 100+ cities',
        'AI-powered service recommendations',
        'Sustainable community partnerships',
        'Innovative service delivery solutions'
      ]
    },
    {
      id: 'values',
      title: 'Our Values',
      description: 'We are committed to integrity, innovation, and impact - creating value for users, vendors, and communities alike.',
      icon: <FiHeart className="text-4xl" />,
      color: 'from-green-500 to-green-700',
      details: [
        'Customer-centric approach',
        'Transparent operations',
        'Continuous innovation',
        'Community development focus'
      ]
    }
  ];

  // Development Team - Jeel & Ronak with fallback avatars
  const developmentTeam = [
    {
      name: 'Jeel',
      role: 'Frontend Developer & UI/UX Designer',
      specialization: 'React.js, Modern Web Design, User Experience',
      contributions: [
        'Designed and implemented the entire user interface',
        'Created responsive layouts for all screen sizes',
        'Built interactive components and animations',
        'Optimized frontend performance and loading times'
      ],
      techStack: ['React.js', 'Tailwind CSS', 'JavaScript', 'Figma', 'Vite'],
      avatar: 'jeel', // Flag for fallback avatar
      color: 'from-blue-500 to-cyan-500',
      icon: <FiSmartphone className="text-2xl" />
    },
    {
      name: 'Ronak',
      role: 'Backend Developer & System Architect',
      specialization: 'Node.js, Database Design, API Development',
      contributions: [
        'Designed and implemented the backend architecture',
        'Built secure RESTful APIs and authentication systems',
        'Optimized database performance and queries',
        'Implemented server-side logic and business rules'
      ],
      techStack: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API'],
      avatar: 'ronak', // Flag for fallback avatar
      color: 'from-green-500 to-emerald-500',
      icon: <FiServer className="text-2xl" />
    }
  ];

  // Combined Skills/Technologies
  const combinedTechnologies = [
    { name: 'React.js', description: 'Frontend Framework', icon: '⚛️' },
    { name: 'Node.js', description: 'Backend Runtime', icon: '🟢' },
    { name: 'Express.js', description: 'Backend Framework', icon: '🚀' },
    { name: 'MongoDB', description: 'Database', icon: '🍃' },
    { name: 'Tailwind CSS', description: 'Styling Framework', icon: '🎨' },
    { name: 'JWT', description: 'Authentication', icon: '🔐' },
    { name: 'Vite', description: 'Build Tool', icon: '⚡' },
    { name: 'Git', description: 'Version Control', icon: '📦' }
  ];

  // Project Achievements
  const projectAchievements = [
    {
      title: 'Complete Full-Stack Solution',
      description: 'Built from scratch with modern architecture',
      icon: '🏗️'
    },
    {
      title: 'Responsive Design',
      description: 'Perfect experience on all devices',
      icon: '📱'
    },
    {
      title: 'Secure Authentication',
      description: 'Protected user data and vendor accounts',
      icon: '🛡️'
    },
    {
      title: 'Scalable Architecture',
      description: 'Ready for growth and new features',
      icon: '📈'
    }
  ];

  // Function to get avatar URL (fallback to UI Avatars API)
  const getAvatarUrl = (member) => {
    // If you add images later, update these paths:
    // For Jeel: return require('../../assets/images/jeel.jpg')
    // For Ronak: return require('../../assets/images/ronak.jpg')
    
    // For now, use UI Avatars API as fallback
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff&size=256`;
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
              About <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">City Navigator</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              We're revolutionizing local service discovery through technology, 
              connecting communities with trusted providers in innovative ways.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <FiStar className="text-yellow-400" />
              <span>Trusted by 10,000+ users nationwide</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission, Vision, Values - Dynamic Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Principles</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Driving innovation in local service discovery through clear vision and strong values
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {coreValues.map((value) => (
              <button
                key={value.id}
                onClick={() => setActiveTab(value.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === value.id
                    ? `bg-gradient-to-r ${value.color} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {value.title}
              </button>
            ))}
          </div>

          {/* Dynamic Content */}
          {coreValues.map((value) => (
            activeTab === value.id && (
              <div key={value.id} className="max-w-6xl mx-auto">
                <div className={`bg-gradient-to-br ${value.color} rounded-3xl overflow-hidden shadow-2xl`}>
                  <div className="md:flex">
                    {/* Icon Section */}
                    <div className="md:w-1/4 p-8 md:p-12 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                        {value.icon}
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="md:w-3/4 p-8 md:p-12 bg-white/5 backdrop-blur-sm">
                      <h3 className="text-3xl font-bold text-white mb-4">{value.title}</h3>
                      <p className="text-xl text-blue-100 mb-8">{value.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {value.details.map((detail, index) => (
                          <div key={index} className="flex items-start">
                            <FiCheckCircle className="text-white mt-1 mr-3 flex-shrink-0" size={20} />
                            <span className="text-white/90">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* Development Team Section - Jeel & Ronak */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Development Team</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Two passionate developers who built City Navigator from the ground up
            </p>
          </div>

          {/* Team Members - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            {developmentTeam.map((member, index) => (
              <div 
                key={index} 
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:-translate-y-2"
              >
                {/* Member Header with Gradient */}
                <div className={`h-40 bg-gradient-to-r ${member.color} relative`}>
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden shadow-lg">
                      <img 
                        src={getAvatarUrl(member)}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="pt-20 px-6 pb-6 text-center">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="inline-flex items-center justify-center gap-2 mb-4">
                    {member.icon}
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {member.role}
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-semibold">Specialization:</span> {member.specialization}
                    </p>
                  </div>

                  {/* Key Contributions */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-left">
                      Key Contributions:
                    </h4>
                    <ul className="space-y-2 text-left">
                      {member.contributions.map((contribution, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={16} />
                          <span className="text-gray-600 dark:text-gray-400">{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2 justify-start">
                      {member.techStack.map((tech, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Combined Technologies Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-center mb-8">Technologies We Used</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {combinedTechnologies.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <span className="text-3xl mb-2">{tech.icon}</span>
                  <span className="font-medium text-center">{tech.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tech.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Achievements */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white">
            <h3 className="text-2xl font-bold text-center mb-8">Project Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectAchievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="text-3xl mb-3">{achievement.icon}</div>
                  <h4 className="font-bold mb-2">{achievement.title}</h4>
                  <p className="text-sm text-blue-100">{achievement.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Together Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How We Built City Navigator</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              A collaborative journey from concept to launch
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Frontend Development */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <FiSmartphone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Frontend Development</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">By Jeel</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Crafted an intuitive user interface with React.js, ensuring smooth navigation 
                  and engaging user experience across all devices.
                </p>
              </div>

              {/* Backend Development */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <FiServer size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Backend Development</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">By Ronak</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  Built a robust server architecture with Node.js and MongoDB, 
                  ensuring data security, fast response times, and scalability.
                </p>
              </div>
            </div>

            {/* Collaboration */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-2xl text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white mb-4">
                <FiCode size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-3">Perfect Collaboration</h3>
              <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                Through seamless communication and shared vision, we integrated frontend and backend 
                components to create a cohesive, full-stack application that delivers exceptional value to users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose City Navigator</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              We're building a platform that benefits everyone in the ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-6">
                <FiUsers size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">For Users</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Verified service providers</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Real-time availability</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Transparent pricing</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center text-white mb-6">
                <FiShield size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">For Vendors</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Digital presence & visibility</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Secure payment processing</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Customer relationship tools</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center text-white mb-6">
                <FiGlobe size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">For Communities</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Local economic growth</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Job creation opportunities</span>
                </li>
                <li className="flex items-center">
                  <FiCheckCircle className="text-green-500 mr-3" />
                  <span>Sustainable development</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-blue-200 mb-8 max-w-2xl mx-auto">
            Whether you're looking for services or providing them, City Navigator has something for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/services" 
              className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-gray-100 transition-all"
            >
              Explore Services
            </a>
            <a 
              href="/vendor/join" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all"
            >
              Become a Vendor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;