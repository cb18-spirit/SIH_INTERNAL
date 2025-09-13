import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'



const Login = () => {

const navigate = useNavigate()

  const[state,setState]=useState('sign Up');

  return (
    <div className='flex bg-gradient-to-l from-[#4f6cea] to  to-purple-300 text-center items-center justify-center min-h-screen px-6 sm:px-0 '>
      <div className='border-2 border-black rounded-3xl p-6 sm:p-12 w-full max-w-md bg-[#252b31] text-white '> 
        <h2 className='text-3xl mb-7'>{(state==='sign Up')?'Create account':'login '}</h2>
        <p className='text-blue-500'>{(state==='sign Up')? 'Create your Account': 'login  Account'}</p>

         <form>
          
           <div className='mb-4 flex items-center justify-center  gap-4  w-full px-5 py-2.5 rounded-full border-2 border-black mt-4 bg-[#495057] '>
            <span className="material-symbols-outlined">
               person
              </span>
          
        <input   type="text" placeholder='username' className='bg-transparent outline-none '/>
           </div>

          <div className='mb-4 flex items-center justify-center  gap-4  w-full px-5 py-2.5 rounded-full border-2 border-black mt-4 '>
            <span className="material-symbols-outlined">
               mail
              </span>
          
        <input   type="email" placeholder='Email' className='bg-transparent outline-none '/>
           </div>

           <div className='mb-4 flex items-center justify-center  gap-4  w-full px-5 py-2.5 rounded-full border-2 border-black mt-4 '>
            <span className="material-symbols-outlined">
               lock
              </span>
          
        <input   type="password" placeholder='Password' className='bg-transparent outline-none '/>
           </div>

           <div>
            <button onClick={()=>navigate('/updates')}>signup</button>
           </div>

      </form>
      </div>

     
    </div>
  )
}

export default Login
