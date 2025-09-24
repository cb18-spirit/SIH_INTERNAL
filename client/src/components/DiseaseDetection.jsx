import React, { useState, useRef } from 'react'

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)
  const [selectedCrop, setSelectedCrop] = useState('')
  const fileInputRef = useRef(null)

  const cropTypes = [
    'गेहूं (Wheat)', 'चावल (Rice)', 'टमाटर (Tomato)', 'आलू (Potato)',
    'प्याज (Onion)', 'मक्का (Corn)', 'कपास (Cotton)', 'गन्ना (Sugarcane)',
    'सरसों (Mustard)', 'सोयाबीन (Soybean)', 'मिर्च (Chili)', 'बैंगन (Eggplant)'
  ]

  const sampleDiseases = {
    'गेहूं': [
      { name: 'Wheat Rust | गेहूं का रतुआ रोग', severity: 'High', treatment: 'प्रोपिकोनाज़ोल छिड़काव करें' },
      { name: 'Powdery Mildew | चूर्णिल फफूंदी', severity: 'Medium', treatment: 'सल्फर का छिड़काव करें' }
    ],
    'टमाटर': [
      { name: 'Late Blight | अंगमारी रोग', severity: 'High', treatment: 'कॉपर सल्फेट छिड़काव करें' },
      { name: 'Bacterial Wilt | जीवाणु मुरझान', severity: 'High', treatment: 'संक्रमित पौधे हटा दें' }
    ],
    'आलू': [
      { name: 'Early Blight | अगेती अंगमारी', severity: 'Medium', treatment: 'मैंकोज़ेब का छिड़काव करें' },
      { name: 'Potato Scab | आलू खुरपी रोग', severity: 'Low', treatment: 'मिट्टी का pH कम करें' }
    ]
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setResults(null)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
      setResults(null)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const analyzeImage = () => {
    if (!selectedImage || !selectedCrop) return

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults = generateMockResults(selectedCrop)
      setResults(mockResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const generateMockResults = (crop) => {
    const cropKey = crop.split(' ')[0]
    const diseases = sampleDiseases[cropKey] || sampleDiseases['गेहूं']
    
    return {
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99%
      detectedDisease: diseases[Math.floor(Math.random() * diseases.length)],
      recommendations: [
        'तुरंत संक्रमित हिस्से को हटा दें',
        'उचित कवकनाशी का छिड़काव करें',
        'पौधों के बीच हवा का संचार बढ़ाएं',
        'पानी की मात्रा नियंत्रित करें',
        'नियमित निगरानी रखें'
      ],
      preventiveMeasures: [
        'बीज उपचार करके बोएं',
        'उन्नत किस्म के बीज का उपयोग करें',
        'फसल चक्र अपनाएं',
        'खेत की सफाई रखें',
        'समय पर छिड़काव करें'
      ],
      severity: diseases[0].severity
    }
  }

  const resetAnalysis = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setResults(null)
    setSelectedCrop('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-green-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-green-800 flex items-center justify-center gap-3">
          🐛 Disease Detection | रोग पहचान
        </h2>
        <p className="text-green-600 mt-2">
          Upload crop images for AI-powered disease identification
        </p>
      </div>

      {!results ? (
        <div className="space-y-6">
          {/* Crop Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🌾 Select Crop Type | फसल का प्रकार चुनें
            </label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Choose Crop | फसल चुनें</option>
              {cropTypes.map((crop, index) => (
                <option key={index} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Image Upload Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              📸 Upload Plant Image | पौधे की तस्वीर अपलोड करें
            </label>
            
            {!imagePreview ? (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-4xl mb-4">📱</div>
                <p className="text-lg text-gray-600 mb-2">
                  Drag & drop image here or click to select
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  यहाँ फोटो खींचें या क्लिक करके चुनें
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: JPG, PNG, JPEG (Max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Uploaded crop"
                  className="w-full max-h-96 object-contain rounded-lg border border-gray-300"
                />
                <button
                  onClick={resetAnalysis}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Photography Tips | फोटो खींचने के टिप्स</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Clear, well-lit photos work best | साफ और अच्छी रोशनी में फोटो लें</li>
              <li>• Focus on affected leaves/parts | रोग ग्रस्त पत्तियों/भागों पर फोकस करें</li>
              <li>• Include multiple angles if possible | संभव हो तो अलग-अलग कोण से लें</li>
              <li>• Avoid blurry or dark images | धुंधली या अंधेरे में ली गई फोटो न लें</li>
            </ul>
          </div>

          {/* Analyze Button */}
          <button
            onClick={analyzeImage}
            disabled={!selectedImage || !selectedCrop || isAnalyzing}
            className="w-full bg-green-500 text-white py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                AI Analyzing Image... | AI तस्वीर की जांच कर रहा है...
              </div>
            ) : (
              '🔍 Analyze Disease | रोग की पहचान करें'
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analysis Results Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              Analysis Complete | विश्लेषण पूर्ण
            </h3>
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg text-gray-600">Confidence Level:</span>
              <span className="text-2xl font-bold text-green-600">{results.confidence}%</span>
            </div>
          </div>

          {/* Disease Detection Result */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🦠</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-800">Detected Disease</h3>
                <p className="text-red-600">{results.detectedDisease.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                results.severity === 'High' ? 'bg-red-200 text-red-800' :
                results.severity === 'Medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                Severity: {results.severity}
              </span>
              <div className="text-sm text-red-700">
                <strong>Treatment:</strong> {results.detectedDisease.treatment}
              </div>
            </div>
          </div>

          {/* Immediate Recommendations */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">🚨 Immediate Actions | तत्काल करने योग्य</h4>
            <div className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">
                    {index + 1}
                  </div>
                  <span className="text-yellow-800 font-medium">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Prevention Measures */}
          <div>
            <h4 className="text-xl font-bold text-gray-800 mb-4">🛡️ Prevention Tips | रोकथाम के उपाय</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.preventiveMeasures.map((measure, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-500 text-lg">✓</span>
                  <span className="text-green-800">{measure}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expert Contact */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="text-lg font-bold text-blue-800 mb-3">👨‍🌾 Need Expert Help? | विशेषज्ञ सहायता चाहिए?</h4>
            <p className="text-blue-700 mb-4">
              For severe cases, consult with agricultural experts or visit your nearest agriculture center.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                📞 Call Helpline: 1800-XXX-XXXX
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                📍 Find Nearest Center
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={resetAnalysis}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              🔄 Analyze New Image | नई तस्वीर की जांच करें
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
            >
              📄 Save Report | रिपोर्ट सेव करें
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DiseaseDetection