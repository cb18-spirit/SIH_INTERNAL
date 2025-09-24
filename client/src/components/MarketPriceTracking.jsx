import React, { useState, useEffect } from 'react'

const MarketPriceTracking = () => {
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [priceData, setPriceData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [priceAlerts, setPriceAlerts] = useState([])

  const cropTypes = [
    { hindi: 'गेहूं', english: 'Wheat', category: 'cereal' },
    { hindi: 'चावल', english: 'Rice', category: 'cereal' },
    { hindi: 'मक्का', english: 'Corn', category: 'cereal' },
    { hindi: 'टमाटर', english: 'Tomato', category: 'vegetable' },
    { hindi: 'आलू', english: 'Potato', category: 'vegetable' },
    { hindi: 'प्याज', english: 'Onion', category: 'vegetable' },
    { hindi: 'सरसों', english: 'Mustard', category: 'oilseed' },
    { hindi: 'सोयाबीन', english: 'Soybean', category: 'oilseed' },
    { hindi: 'कपास', english: 'Cotton', category: 'cash' },
    { hindi: 'गन्ना', english: 'Sugarcane', category: 'cash' },
    { hindi: 'तुअर दाल', english: 'Tur Dal', category: 'pulses' },
    { hindi: 'चना', english: 'Gram', category: 'pulses' }
  ]

  const indianStates = [
    'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ]

  // Mock price data generator
  const generateMockPriceData = (crop, state) => {
    const basePrice = {
      'गेहूं': 2200, 'चावल': 3500, 'मक्का': 1800, 'टमाटर': 2500,
      'आलू': 1200, 'प्याज': 2000, 'सरसों': 5500, 'सोयाबीन': 4200,
      'कपास': 6500, 'गन्ना': 350, 'तुअर दाल': 7500, 'चना': 5200
    }

    const variation = (Math.random() - 0.5) * 400
    const currentPrice = Math.round((basePrice[crop] || 2000) + variation)
    const previousPrice = Math.round(currentPrice + (Math.random() - 0.5) * 300)
    const weeklyChange = ((currentPrice - previousPrice) / previousPrice * 100).toFixed(1)

    return [
      {
        market: `${state} Mandi`,
        currentPrice: currentPrice,
        previousPrice: previousPrice,
        change: weeklyChange,
        unit: 'per quintal',
        lastUpdated: new Date().toLocaleDateString('hi-IN')
      },
      {
        market: `${state} Wholesale`,
        currentPrice: Math.round(currentPrice * 0.95),
        previousPrice: Math.round(previousPrice * 0.95),
        change: ((Math.round(currentPrice * 0.95) - Math.round(previousPrice * 0.95)) / Math.round(previousPrice * 0.95) * 100).toFixed(1),
        unit: 'per quintal',
        lastUpdated: new Date().toLocaleDateString('hi-IN')
      },
      {
        market: `${state} Retail`,
        currentPrice: Math.round(currentPrice * 1.15),
        previousPrice: Math.round(previousPrice * 1.15),
        change: ((Math.round(currentPrice * 1.15) - Math.round(previousPrice * 1.15)) / Math.round(previousPrice * 1.15) * 100).toFixed(1),
        unit: 'per quintal',
        lastUpdated: new Date().toLocaleDateString('hi-IN')
      }
    ]
  }

  const fetchPrices = () => {
    if (!selectedCrop || !selectedState) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      const mockData = generateMockPriceData(selectedCrop, selectedState)
      setPriceData(mockData)
      setIsLoading(false)
    }, 1000)
  }

  const trendingCrops = [
    { name: 'गेहूं', trend: '+5.2%', price: '₹2,250', status: 'up' },
    { name: 'चावल', trend: '-2.1%', price: '₹3,400', status: 'down' },
    { name: 'टमाटर', trend: '+12.5%', price: '₹2,800', status: 'up' },
    { name: 'प्याज', trend: '-8.3%', price: '₹1,850', status: 'down' }
  ]

  const generateRecommendations = () => {
    if (!priceData.length) return []

    const avgPrice = priceData.reduce((sum, item) => sum + item.currentPrice, 0) / priceData.length
    const recommendations = []

    if (avgPrice > 3000) {
      recommendations.push({
        type: 'sell',
        message: 'अच्छा समय है बेचने का - कीमतें अधिक हैं',
        icon: '💰'
      })
    } else if (avgPrice < 2000) {
      recommendations.push({
        type: 'hold',
        message: 'रुकें - कीमतें कम हैं, बेहतर समय का इंतजार करें',
        icon: '⏳'
      })
    }

    const positiveChange = priceData.some(item => parseFloat(item.change) > 0)
    if (positiveChange) {
      recommendations.push({
        type: 'trend',
        message: 'कीमतों में तेजी का रुझान - अगले सप्ताह बेहतर दाम मिल सकते हैं',
        icon: '📈'
      })
    }

    return recommendations
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-800 flex items-center justify-center gap-3 mb-2">
          💰 Market Price Tracker | बाजार भाव ट्रैकर
        </h2>
        <p className="text-green-600">
          Real-time crop prices and market insights | वास्तविक समय के फसल भाव
        </p>
      </div>

      {/* Quick Trending Section */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Trending Today | आज के रुझान</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trendingCrops.map((crop, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <h4 className="font-semibold text-gray-800">{crop.name}</h4>
              <div className="text-lg font-bold text-gray-900">{crop.price}</div>
              <div className={`text-sm font-semibold ${
                crop.status === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {crop.status === 'up' ? '↗' : '↘'} {crop.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🔍 Search Prices | कीमत खोजें</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌾 Select Crop | फसल चुनें
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose Crop | फसल चुनें</option>
              {cropTypes.map((crop, index) => (
                <option key={index} value={crop.hindi}>
                  {crop.hindi} ({crop.english})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📍 Select State | राज्य चुनें
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose State | राज्य चुनें</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={fetchPrices}
              disabled={!selectedCrop || !selectedState || isLoading}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </div>
              ) : (
                '🔍 Get Prices'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Price Results */}
      {priceData.length > 0 && (
        <div className="space-y-6">
          {/* Price Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {priceData.map((market, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{market.market}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    parseFloat(market.change) > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {parseFloat(market.change) > 0 ? '↗' : '↘'} {market.change}%
                  </span>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      ₹{market.currentPrice.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">{market.unit}</div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    Previous: ₹{market.previousPrice.toLocaleString()}
                  </div>
                  
                  <div className="text-xs text-gray-400">
                    Updated: {market.lastUpdated}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
            <h3 className="text-xl font-bold text-yellow-800 mb-4">💡 Market Insights | बाजार सलाह</h3>
            <div className="space-y-3">
              {generateRecommendations().map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <span className="text-2xl">{rec.icon}</span>
                  <span className="text-yellow-800 font-medium">{rec.message}</span>
                </div>
              ))}
              
              <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                <span className="text-2xl">📱</span>
                <span className="text-yellow-800 font-medium">
                  किसान कॉल सेंटर: 1800-180-1551 (निःशुल्क सलाह के लिए)
                </span>
              </div>
            </div>
          </div>

          {/* Price Alerts Setup */}
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-4">🔔 Set Price Alerts | मूल्य अलर्ट सेट करें</h3>
            <p className="text-blue-700 mb-4">
              Get notified when prices reach your target | जब कीमत आपके लक्ष्य तक पहुंचे तो सूचना पाएं
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="number"
                placeholder="Target Price (₹)"
                className="border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                className="border border-blue-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Set Alert | अलर्ट सेट करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional Resources */}
      <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📚 Additional Resources | अन्य संसाधन</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="text-2xl mb-2">🏪</div>
            <h4 className="font-semibold text-gray-800">Nearby Mandis</h4>
            <p className="text-sm text-gray-600">Find local markets</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="text-2xl mb-2">📈</div>
            <h4 className="font-semibold text-gray-800">Price History</h4>
            <p className="text-sm text-gray-600">Historical trends</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="text-2xl mb-2">🚚</div>
            <h4 className="font-semibold text-gray-800">Transport Cost</h4>
            <p className="text-sm text-gray-600">Calculate logistics</p>
          </button>
          
          <button className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-left">
            <div className="text-2xl mb-2">💡</div>
            <h4 className="font-semibold text-gray-800">Selling Tips</h4>
            <p className="text-sm text-gray-600">Maximize profits</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MarketPriceTracking