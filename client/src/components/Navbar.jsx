import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (


    <div className="fixed top-0 w-full z-50 bg-white border-b border-green-100 shadow-sm backdrop-blur-lg bg-opacity-95">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12 py-4">
        
        {/* Brand Name with Icon */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
            <span className="text-white text-xl font-bold">🌱</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight group-hover:text-green-600 transition-colors">
            SmartFarm
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">🏠 Home</a>
          <a href="/dashboard" className="text-gray-600 hover:text-green-600 font-medium transition-colors">📊 Dashboard</a>
          <a href="/soil-health" className="text-gray-600 hover:text-green-600 font-medium transition-colors">🔬 Soil Test</a>
          <a href="/disease-detection" className="text-gray-600 hover:text-green-600 font-medium transition-colors">🐛 Disease Check</a>
          <a href="/market-prices" className="text-gray-600 hover:text-green-600 font-medium transition-colors">💰 Market Prices</a>
          <a href="/weather-advisory" className="text-gray-600 hover:text-green-600 font-medium transition-colors">🌤️ Weather</a>
        </div>

        {/* Login Button */}
        <button
          onClick={() => navigate('/login')}
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-green-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
        >
          Login
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Navbar
