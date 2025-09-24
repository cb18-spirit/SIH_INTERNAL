
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Emailverify from './pages/Emailverify'
import ResetPassword from './pages/ResetPassword'
import Updates from './pages/Updates'
import AIAssistant from './pages/AIAssistant'
import DiseaseDetection from './pages/DiseaseDetection' 
import Profile from './pages/profile'
import SoilHealth from './pages/SoilHealth'
import MarketPrices from './pages/MarketPrices'
import WeatherAdvisory from './pages/WeatherAdvisory'
import FarmerDashboard from './pages/FarmerDashboard'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
         <Route path='/email-verify' element={<Emailverify/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/updates' element={<Updates/>}/>
          <Route path='/AI-Assistant' element={<AIAssistant/>}/>
          <Route path='/Disease-Detection' element={<DiseaseDetection/>}/>
          <Route path='/disease-detection' element={<DiseaseDetection/>}/>
          <Route path='/soil-health' element={<SoilHealth/>}/>
          <Route path='/market-prices' element={<MarketPrices/>}/>
          <Route path='/weather-advisory' element={<WeatherAdvisory/>}/>
          <Route path='/dashboard' element={<FarmerDashboard/>}/>
          <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}


export default App
