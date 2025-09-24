import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import BackNavigation from '../components/BackNavigation';



const Login = () => {

const navigate = useNavigate();

const {backend_url,  setIsLoggedIn}=useContext(AppContext);

  const[state,setState]=useState('signup');
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[username,setUsername]=useState('');

const onsubmitHandler=async(e)=>{
   try {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    if(state==='signup')
      {const { data } = await axios.post(`${backend_url}/api/auth/register`, {
        name: username,
        email,
        password,
      });
        
        if(data.success){
            setIsLoggedIn(true);
            navigate('/updates')
        }else{
            alert(data.message);  
        }
        }else{
        if(state==='login'){
        const {data}=await axios.post(`${backend_url}/api/auth/login`,{email,password})
        
        if(data.success){
            setIsLoggedIn(true);
            navigate('/updates')
        }
        else{
            alert(data.message);  
        }
    }
}

}catch(error) {
    alert("some error occured" + error.message);
}
}

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 to-blue-50'>
      <BackNavigation title="Back to Home" />
      
      <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 pt-16'>
        <div className='bg-white rounded-2xl shadow-2xl p-8 sm:p-12 w-full max-w-md border border-green-100'>
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">🌱</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">SmartFarm</h1>
            <p className="text-gray-600 text-sm">Agricultural Advisory Platform</p>
          </div>

          <div className="text-center mb-6">
            <h2 className='text-2xl font-bold text-gray-800 mb-2'>
              {(state==='signup')?'Create Account':'Welcome Back'}
            </h2>
            <p className='text-gray-600'>
              {(state==='signup')? 'Join our farming community': 'Sign in to your account'}
            </p>
          </div>


          <form onSubmit={onsubmitHandler} className="space-y-6">
            {state==='signup' && (
              <div className='relative'>
                <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent'>
                  <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <input 
                    onChange={e=>setUsername(e.target.value)}  
                    value={username} 
                    type="text" 
                    placeholder='Full Name' 
                    className='bg-transparent outline-none flex-1 text-gray-700'
                    required
                  />
                </div>
              </div>
            )}

            <div className='relative'>
              <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent'>
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input  
                  onChange={e=>setEmail(e.target.value)} 
                  value={email} 
                  type="email" 
                  placeholder='Email Address' 
                  className='bg-transparent outline-none flex-1 text-gray-700'
                  required
                />
              </div>
            </div>

            <div className='relative'>
              <div className='flex items-center bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-transparent'>
                <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <input   
                  onChange={e=>setPassword(e.target.value)}  
                  value={password}  
                  type="password" 
                  placeholder='Password' 
                  className='bg-transparent outline-none flex-1 text-gray-700'
                  required
                />
              </div>
            </div>

            {state === 'login' && (
              <div className="text-right">
                <button 
                  type="button"
                  onClick={()=>navigate('/reset-password')} 
                  className='text-green-600 hover:text-green-700 text-sm font-medium'
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button 
              type="submit"
              className='w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              {state === 'signup' ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Switch between login/signup */}
          <div className="text-center mt-6">
            {state==='signup' ? (
              <p className='text-gray-600'>
                Already have an account? 
                <button 
                  type="button"
                  className='ml-2 text-green-600 hover:text-green-700 font-medium' 
                  onClick={()=>setState('login')}
                >
                  Sign In
                </button>
              </p>
            ):(
              <p className='text-gray-600'>
                Don't have an account? 
                <button 
                  type="button"
                  className='ml-2 text-green-600 hover:text-green-700 font-medium' 
                  onClick={()=>setState('signup')}
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
