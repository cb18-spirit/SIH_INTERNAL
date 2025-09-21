
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Emailverify from './pages/Emailverify'
import ResetPassword from './pages/ResetPassword'
import Updates from './pages/Updates'



const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
         <Route path='/email-verify' element={<Emailverify/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/updates' element={<Updates/>}/>
      </Routes>
    </div>
  )
}


export default App
