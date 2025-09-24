import React, { useState, useRef, useEffect } from 'react'

const AIAssistantChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your agricultural advisor. You can ask me anything about crops, soil, fertilizers, pests, and farming practices. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const sampleQuestions = [
    "My crop leaves are turning yellow, what should I do?",
    "What is the right time to plant wheat?",
    "How do I test my soil quality?",
    "What fertilizer is best for tomatoes?",
    "How to protect crops from pests?"
  ]

  const cropAdviceResponses = {
    'yellow leaves': 'Yellow leaves can have several causes:\n• Nitrogen deficiency - Apply urea fertilizer\n• Overwatering - Improve drainage\n• Nutrient deficiency - Use NPK fertilizer\n• Fungal infection - Apply fungicide',
    'wheat planting': 'Best time for wheat planting:\n• North India: November 15 - December 15\n• South India: December - January\n• Seed rate: 100-125 kg per hectare\n• Row spacing: 20-22.5 cm',
    'soil testing': 'For soil testing:\n• Take soil samples from 6 inch depth\n• Mix samples from different locations\n• Test at agriculture center\n• Check pH, nitrogen, phosphorus, potash levels',
    'tomato fertilizer': 'Best fertilizers for tomatoes:\n• Base fertilizer: 10-10-10 NPK\n• Growth stage: High nitrogen (20-10-10)\n• Flowering: Balanced (10-10-10)\n• Fruiting: High potassium (10-10-20)\n• Apply every 2-3 weeks',
    'pest protection': 'Crop pest protection methods:\n• Use neem oil spray (organic)\n• Install yellow sticky traps\n• Companion planting (marigold, basil)\n• Regular crop inspection\n• Integrated Pest Management (IPM)\n• Biological controls like ladybugs'
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase()
    
    // Simple keyword matching for demo
    for (const [key, response] of Object.entries(cropAdviceResponses)) {
      if (message.includes(key.toLowerCase()) || message.includes(key.replace(' ', ''))) {
        return response
      }
    }

    // Check for common farming keywords
    if (message.includes('yellow') || message.includes('leaves')) {
      return cropAdviceResponses['yellow leaves']
    }
    if (message.includes('wheat') || message.includes('plant')) {
      return cropAdviceResponses['wheat planting']
    }
    if (message.includes('soil') || message.includes('test')) {
      return cropAdviceResponses['soil testing']
    }
    if (message.includes('tomato') || message.includes('fertilizer')) {
      return cropAdviceResponses['tomato fertilizer']
    }
    if (message.includes('pest') || message.includes('insects') || message.includes('bugs')) {
      return cropAdviceResponses['pest protection']
    }

    return 'I understand your concern. Please provide more details or consult with a local agricultural expert. You can also try our other tools like soil testing and disease detection for more specific analysis.'
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const newUserMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.lang = 'en-US'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onstart = () => setIsListening(true)
      recognition.onend = () => setIsListening(false)
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setInputText(transcript)
      }

      recognition.start()
    } else {
      alert('Voice input not supported in your browser')
    }
  }

  const handleQuestionClick = (question) => {
    setInputText(question)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-green-100 h-96 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              🤖
            </div>
            <div>
              <h3 className="font-semibold">Agricultural AI Assistant</h3>
              <p className="text-xs opacity-90">24/7 Available • Expert Farming Advice</p>
            </div>
          </div>
          <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-lg">
            🇺🇸 English
          </div>
        </div>
      </div>

      {/* Sample Questions */}
      <div className="p-3 border-b border-gray-100">
        <p className="text-xs text-gray-600 mb-2">Quick Questions:</p>
        <div className="flex flex-wrap gap-1">
          {sampleQuestions.slice(0, 3).map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionClick(question)}
              className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-lg hover:bg-green-100 transition-colors"
            >
              {question.length > 25 ? question.substring(0, 25) + '...' : question}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg ${
              message.isBot 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-green-500 text-white'
            }`}>
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-3 py-2 rounded-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask your farming question..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <button
            onClick={handleVoiceInput}
            className={`px-3 py-2 rounded-lg transition-colors ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Voice Input"
          >
            🎤
          </button>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIAssistantChat