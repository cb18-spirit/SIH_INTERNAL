import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {


  const navigate = useNavigate()

  return (
    
    <div>
      {/*<div>
        <div>
          <a href="#"><img src={logo} clt="logo"/></a>
        </div>
      </div>*/}
      {/*search bar and order button*/}
      
    <div className='w-full flex justify-between items-center p-4 sm:p-4 sm:px-18 absolute top-0 bg-[#003049] text-white'>
      <h1 className='text-2xl font-bold'>NAME</h1>

      <button onClick={()=>navigate('/login')} className='flex gap-2 border-3 border-gray-500 rounded-full px-3 py- items-center  hover:bg-green-400 hover:text-xl transition-all duration-400'>login <span className="material-symbols-outlined">
       arrow_forward
      </span>
      
   
</button>
    </div>
    <div>
      {/*footer section*/}
    </div>
    
    </div>

    
  )
}

export default Navbar
