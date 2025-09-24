import React from 'react'
import { Link } from 'react-router-dom'
import WeatherCard from './WeatherCard'
import AIAssistantChat from './AIAssistantChat'

const Header = () => {
  return (
    <div className='bg-gradient-to-br from-green-50 to-emerald-50 min-h-screen'>
      {/* Hero Section */}
      <div className='text-center py-20'>
        <div className='max-w-4xl mx-auto px-6'>
          <h1 className='text-5xl font-bold text-green-800 mb-6'>
            🌾 SmartFarm AI Assistant
          </h1>
          <p className='text-xl text-green-700 mb-8 leading-relaxed'>
            AI-powered agricultural advisory platform for farmers<br/>
            <span className='text-lg text-green-600'>
              Get expert farming advice, soil analysis, disease detection & market prices
            </span>
          </p>
          
          {/* Key Stats */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
            <div className='bg-white rounded-xl p-6 shadow-md border border-green-100'>
              <div className='text-3xl font-bold text-green-600'>86%</div>
              <div className='text-sm text-gray-600'>Small & Marginal Farmers in India</div>
            </div>
            <div className='bg-white rounded-xl p-6 shadow-md border border-green-100'>
              <div className='text-3xl font-bold text-green-600'>20-30%</div>
              <div className='text-sm text-gray-600'>Yield Increase with ICT Advisory</div>
            </div>
            <div className='bg-white rounded-xl p-6 shadow-md border border-green-100'>
              <div className='text-3xl font-bold text-green-600'>6+</div>
              <div className='text-sm text-gray-600'>Regional Languages Supported</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Features Grid */}
      <div className='max-w-7xl mx-auto px-6 pb-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* AI Assistant */}
                      <div>
              <h2 className='text-2xl font-bold text-green-800 flex items-center gap-3 mb-4'>
                🤖 AI Agricultural Assistant
              </h2>
              <p className='text-green-700 mb-4'>
                Get real-time farming advice with AI-powered expert recommendations
              </p>
              <AIAssistantChat />
            </div>

          {/* Weather & Tools */}
          <div className='space-y-6'>
            {/* Weather Card */}
            <div>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-2xl font-bold text-green-800 flex items-center gap-3'>
                  🌤️ Weather Advisory
                </h2>
                <Link to="/weather-advisory" className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm font-medium'>
                  Full Advisory
                </Link>
              </div>
              <WeatherCard />
            </div>

            {/* Quick Tools */}
            <div className='grid grid-cols-2 gap-4'>
              <a href='/soil-health' className='bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow cursor-pointer block'>
                <div className='text-3xl mb-3'>🔬</div>
                <h3 className='font-bold text-green-800'>Soil Health</h3>
                <p className='text-sm text-gray-600'>Test & analyze your soil</p>
              </a>
              
              <a href='/disease-detection' className='bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow cursor-pointer block'>
                <div className='text-3xl mb-3'>🐛</div>
                <h3 className='font-bold text-green-800'>Disease Detection</h3>
                <p className='text-sm text-gray-600'>Upload crop photos</p>
              </a>
              
              <a href='/market-prices' className='bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow cursor-pointer block'>
                <div className='text-3xl mb-3'>💰</div>
                <h3 className='font-bold text-green-800'>Market Prices</h3>
                <p className='text-sm text-gray-600'>Track crop rates</p>
              </a>
              
              <a href='/dashboard' className='bg-white rounded-xl p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow cursor-pointer block'>
                <div className='text-3xl mb-3'>📊</div>
                <h3 className='font-bold text-green-800'>Dashboard</h3>
                <p className='text-sm text-gray-600'>Your farming insights</p>
              </a>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className='mt-16'>
          <h2 className='text-3xl font-bold text-center text-green-800 mb-12'>
            Complete Agricultural Solution Platform
          </h2>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <div className='text-center p-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🗣️</span>
              </div>
              <h3 className='font-bold text-green-800 mb-2'>Voice Support</h3>
              <p className='text-sm text-gray-600'>Speak your questions and get audio responses</p>
            </div>
            
            <div className='text-center p-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🤖</span>
              </div>
              <h3 className='font-bold text-green-800 mb-2'>AI-Powered</h3>
              <p className='text-sm text-gray-600'>Advanced AI for accurate farming advice</p>
            </div>
            
            <div className='text-center p-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>📱</span>
              </div>
              <h3 className='font-bold text-green-800 mb-2'>Mobile Friendly</h3>
              <p className='text-sm text-gray-600'>Access anywhere, anytime on any device</p>
            </div>
            
            <div className='text-center p-6'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-2xl'>🎯</span>
              </div>
              <h3 className='font-bold text-green-800 mb-2'>Personalized</h3>
              <p className='text-sm text-gray-600'>Tailored advice for your specific crops</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
