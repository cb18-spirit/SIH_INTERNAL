import React from 'react'
import BackNavigation from '../components/BackNavigation'

const EmailVerify = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <BackNavigation title="Back" />
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Email Verification</h1>
          <p className="text-gray-600 text-center">Check your email for verification instructions</p>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify
