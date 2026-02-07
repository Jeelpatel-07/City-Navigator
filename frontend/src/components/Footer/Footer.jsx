// frontend/src/components/Footer/Footer.jsx - UPDATED WITH REACT ROUTER LINKS
import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiShield, FiHelpCircle, FiFileText, FiExternalLink } from "react-icons/fi";
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-950 to-black text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6 cursor-pointer" onClick={scrollToTop}>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white font-bold text-2xl mr-4">
                CN
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">
                  City<span className="text-blue-500">Navigator</span>
                </h2>
                <p className="text-gray-400 text-sm">Find Local Services</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              City Navigator is a modern platform that helps users discover
              trusted local services while enabling vendors to grow their
              digital presence within cities.
            </p>
            <p className="text-sm text-gray-500">
              Built with passion for smart cities and local communities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Platform
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/vendor/join"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Join as Vendor
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Vendor Login
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Browse Services
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <span className="text-xs">→</span>
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-5">
              Help & Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/guide"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <FiBookOpen className="text-sm" />
                  User Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-green-500 transition-all duration-200 hover:translate-x-1"
                >
                  <FiShield className="text-sm" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <FiHelpCircle className="text-sm" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={scrollToTop}
                  className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-all duration-200 hover:translate-x-1"
                >
                  <FiFileText className="text-sm" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} City Navigator. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              Designed & Developed by{" "}
              <span className="text-blue-500 font-medium">
                Jeel & Ronak
              </span>
            </p>
            <div className="flex gap-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors p-1 hover:scale-110 transition-transform"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors p-1 hover:scale-110 transition-transform"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-colors p-1 hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 transition-colors p-1 hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;