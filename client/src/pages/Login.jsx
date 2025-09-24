import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import axios from 'axios';



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
    <div className='flex bg-gradient-to-l from-[#4f6cea] to  to-purple-300 text-center items-center justify-center min-h-screen px-6 sm:px-0 '>
      <div className='border-2 border-black rounded-3xl p-6 sm:p-12 w-full max-w-md bg-[#252b31] text-white '> 
        <h2 className='text-3xl mb-7'>{(state==='signup')?'Create account':'login'}</h2>
        <p className='text-blue-500'>{(state==='signup')? 'Create your Account': 'login Account'}</p>


         <form onSubmit={onsubmitHandler}>
          {state==='signup' && (<div className='mb-4 flex items-center justify-center  gap-4  w-full px-5 py-2.5 rounded-full border-2 border-black mt-4 bg-[#495057] '>
            <span className="material-symbols-outlined">
               person
              </span>
          
        <input onChange={e=>setUsername(e.target.value)}  value={username} type="text" placeholder='username' className='bg-transparent outline-none '/>
           </div>)}
           

          <div className='mb-4 flex items-center justify-center  gap-4  w-full px-5 py-2.5 rounded-full border-2 border-black mt-4   bg-[#495057]'>
            <span className="material-symbols-outlined">
               mail
              </span>
        <input  onChange={e=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='bg-transparent outline-none'/>
           </div>


           <div className='mb-4 flex items-center justify-center  gap-4  w-full px-5 py-2.5 rounded-full border-2 border-black mt-4  bg-[#495057] '>
            <span className="material-symbols-outlined">
               lock
              </span>
        <input   onChange={e=>setPassword(e.target.value)}  value={password}  type="password" placeholder='Password' className='bg-transparent outline-none '/>
           </div>

           <p onClick={()=>navigate('/reset-password')} className='mb-4 text-left pl-3 text-blue-500'>Forgot Password</p>

        
            <button type="submit"
            className='w-full py-3 rounded-full bg-gradient-to-l from-indigo-500 to-indigo-900 hover:' >{state}</button>
      </form>

      
      {state==='signup' ? (<p className='text-gray-300 mt-5 '>
        Already have an Account? 
        <span className='px-2 text-blue-500 cursor-pointer underline' onClick={()=>setState(state==='signup'?'login':'signup')}>
          Login Here
        </span>
      </p>):(<p className='text-gray-300 mt-5 '>
        Don't have an Account? 
        <span className='px-2 text-blue-500 cursor-pointer underline' onClick={()=>setState(state==='signup'?'login':'signup')}>
          SignUp Here
        </span>
      </p>)}
  

    
      </div>

     
    </div>
  )
}

export default Login
