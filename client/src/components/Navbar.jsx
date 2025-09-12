import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {


  const navigate = useNavigate()

  return (
    <div className='w-full flex justify-between p-4 sm:p-6 sm:px-18 absolute top-0'>
      <h1>AUTH</h1>

      <button onClick={()=>navigate('/login')} className='flex gap-2 border-3 border-gray-500 rounded-full px-6 py-2 items-center  hover:bg-green-400 hover:text-xl transition-all duration-400'>login <span className="material-symbols-outlined">
arrow_forward
</span>

</button>
    </div>
  )
}

export default Navbar
