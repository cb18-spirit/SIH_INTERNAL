import React, { useState } from 'react'

const SoilHealthAnalysis = () => {
  const [formData, setFormData] = useState({
    location: '',
    cropType: '',
    soilType: '',
    lastCrop: '',
    irrigationMethod: '',
    problems: []
  })
  
  const [results, setResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const cropTypes = [
    'गेहूं (Wheat)', 'चावल (Rice)', 'मक्का (Corn)', 'बाजरा (Millet)',
    'टमाटर (Tomato)', 'आलू (Potato)', 'प्याज (Onion)', 'गन्ना (Sugarcane)',
    'कपास (Cotton)', 'सरसों (Mustard)', 'मूंगफली (Groundnut)', 'सोयाबीन (Soybean)'
  ]

  const soilTypes = [
    'काली मिट्टी (Black Soil)', 'लाल मिट्टी (Red Soil)', 'जलोढ़ मिट्टी (Alluvial Soil)',
    'दोमट मिट्टी (Loamy Soil)', 'बलुई मिट्टी (Sandy Soil)', 'चिकनी मिट्टी (Clay Soil)'
  ]

  const irrigationMethods = [
    'बारिश (Rain-fed)', 'नलकूप (Tube well)', 'ड्रिप सिंचाई (Drip)', 
    'स्प्रिंकलर (Sprinkler)', 'फव्वारा (Fountain)', 'नहर (Canal)'
  ]

  const commonProblems = [
    'पत्ते पीले होना', 'फसल धीमी बढ़ना', 'मिट्टी सख्त होना', 'जल जमाव',
    'कीड़े-मकोड़े', 'खरपतवार', 'मिट्टी की नमी कम', 'पोषक तत्वों की कमी'
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleProblemToggle = (problem) => {
    setFormData(prev => ({
      ...prev,
      problems: prev.problems.includes(problem)
        ? prev.problems.filter(p => p !== problem)
        : [...prev.problems, problem]
    }))
  }

  const analyzeSoil = () => {
    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const recommendations = generateRecommendations(formData)
      setResults(recommendations)
      setIsAnalyzing(false)
    }, 2000)
  }

  const generateRecommendations = (data) => {
    const recommendations = {
      soilHealth: 'Good',
      phLevel: '6.8',
      nutrients: {
        nitrogen: 'Medium',
        phosphorus: 'Low',
        potassium: 'High'
      },
      recommendations: [],
      fertilizers: [],
      warnings: []
    }

    // Generate recommendations based on crop and soil type
    if (data.cropType.includes('गेहूं')) {
      recommendations.recommendations.push('गेहूं के लिए नाइट्रोजन और फॉस्फोरस की अधिक जरूरत')
      recommendations.fertilizers.push('यूरिया 120 किलो/हेक्टेयर', 'DAP 100 किलो/हेक्टेयर')
    }

    if (data.soilType.includes('काली मिट्टी')) {
      recommendations.recommendations.push('काली मिट्टी में जल निकासी का विशेष ध्यान रखें')
      recommendations.recommendations.push('कैल्शियम और मैग्नीशियम की मात्रा अच्छी है')
    }

    if (data.problems.includes('पत्ते पीले होना')) {
      recommendations.warnings.push('नाइट्रोजन की कमी के संकेत')
      recommendations.fertilizers.push('यूरिया का छिड़काव तुरंत करें')
    }

    if (data.problems.includes('मिट्टी सख्त होना')) {
      recommendations.recommendations.push('जैविक खाद और कंपोस्ट का उपयोग बढ़ाएं')
      recommendations.recommendations.push('गहरी जुताई करें')
    }

    return recommendations
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-green-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-green-800 flex items-center justify-center gap-3">
          🔬 Soil Health Analysis | मिट्टी स्वास्थ्य जांच | ಮಣ್ಣಿನ ಆರೋಗ್ಯ ವಿಶ್ಲೇಷಣೆ
        </h2>
        <p className="text-green-600 mt-2">
          Get personalized soil recommendations for better crop yield<br/>
          बेहतर फसल के लिए व्यक्तिगत मिट्टी सिफारिशें प्राप्त करें<br/>
          ಉತ್ತಮ ಬೆಳೆ ಇಳುವರಿಗಾಗಿ ವೈಯಕ್ತಿಕ ಮಣ್ಣಿನ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ
        </p>
      </div>

      {!results ? (
        <div className="space-y-6">
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📍 Location | स्थान
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter your village/city | अपना गाँव/शहर लिखें"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Crop Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌾 Current/Next Crop | वर्तमान/अगली फसल
            </label>
            <select
              value={formData.cropType}
              onChange={(e) => handleInputChange('cropType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Crop | फसल चुनें</option>
              {cropTypes.map((crop, index) => (
                <option key={index} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Soil Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🏔️ Soil Type | मिट्टी का प्रकार
            </label>
            <select
              value={formData.soilType}
              onChange={(e) => handleInputChange('soilType', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Soil Type | मिट्टी का प्रकार चुनें</option>
              {soilTypes.map((soil, index) => (
                <option key={index} value={soil}>{soil}</option>
              ))}
            </select>
          </div>

          {/* Last Crop */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌱 Last Crop | पिछली फसल
            </label>
            <select
              value={formData.lastCrop}
              onChange={(e) => handleInputChange('lastCrop', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Last Crop | पिछली फसल चुनें</option>
              {cropTypes.map((crop, index) => (
                <option key={index} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Irrigation Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              💧 Irrigation Method | सिंचाई की विधि
            </label>
            <select
              value={formData.irrigationMethod}
              onChange={(e) => handleInputChange('irrigationMethod', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Method | विधि चुनें</option>
              {irrigationMethods.map((method, index) => (
                <option key={index} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {/* Problems */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ⚠️ Current Problems | वर्तमान समस्याएं
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {commonProblems.map((problem, index) => (
                <label key={index} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.problems.includes(problem)}
                    onChange={() => handleProblemToggle(problem)}
                    className="rounded border-gray-300 text-green-500 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{problem}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeSoil}
            disabled={!formData.cropType || !formData.soilType || isAnalyzing}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Soil... | मिट्टी की जांच हो रही है...
              </div>
            ) : (
              '🔬 Analyze Soil Health | मिट्टी की जांच करें'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Results Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Analysis Results | जांच परिणाम
            </h3>
            <p className="text-gray-600">Based on your inputs | आपकी जानकारी के आधार पर</p>
          </div>

          {/* Soil Health Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800">Overall Health</h4>
              <div className="text-2xl font-bold text-green-600">{results.soilHealth}</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800">pH Level</h4>
              <div className="text-2xl font-bold text-blue-600">{results.phLevel}</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h4 className="font-semibold text-orange-800">Status</h4>
              <div className="text-lg font-bold text-orange-600">Suitable</div>
            </div>
          </div>

          {/* Nutrients */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">🧪 Nutrient Levels | पोषक तत्व</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Nitrogen | नाइट्रोजन</div>
                <div className="font-bold text-lg text-yellow-600">{results.nutrients.nitrogen}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Phosphorus | फॉस्फोरस</div>
                <div className="font-bold text-lg text-red-600">{results.nutrients.phosphorus}</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Potassium | पोटेशियम</div>
                <div className="font-bold text-lg text-green-600">{results.nutrients.potassium}</div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">💡 Recommendations | सिफारिशें</h4>
            <div className="space-y-2">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-green-800">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fertilizer Recommendations */}
          {results.fertilizers.length > 0 && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">🌱 Fertilizer Guide | खाद गाइड</h4>
              <div className="space-y-2">
                {results.fertilizers.map((fert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-500 mt-1">🧪</span>
                    <span className="text-blue-800">{fert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Warnings */}
          {results.warnings.length > 0 && (
            <div>
              <h4 className="text-xl font-bold text-gray-800 mb-4">⚠️ Warnings | चेतावनी</h4>
              <div className="space-y-2">
                {results.warnings.map((warning, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                    <span className="text-red-500 mt-1">⚠️</span>
                    <span className="text-red-800">{warning}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setResults(null)}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              🔄 New Analysis | नई जांच
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              📄 Print Report | रिपोर्ट प्रिंट करें
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SoilHealthAnalysis