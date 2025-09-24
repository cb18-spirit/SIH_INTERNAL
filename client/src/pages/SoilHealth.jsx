import React from 'react'
import SoilHealthAnalysis from '../components/SoilHealthAnalysis'
import BackNavigation from '../components/BackNavigation'

const SoilHealth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <BackNavigation title="Back" />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <SoilHealthAnalysis />
      </div>
    </div>
  )
}

export default SoilHealth