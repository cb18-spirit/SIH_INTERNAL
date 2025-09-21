import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()

  return (


    <div className="fixed top-0 w-full z-50 bg-[#051732] text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 sm:px-12 py-4">
        
        {/* Brand Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide cursor-pointer hover:text-green-400 transition">
          SmartFarm
        </h1>


        {/* Navigation Links */}
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li className="hover:text-green-400 cursor-pointer transition">Home</li>
          <li className="hover:text-green-400 cursor-pointer transition">Features</li>
          <li className="hover:text-green-400 cursor-pointer transition">About</li>
          <li className="hover:text-green-400 cursor-pointer transition">Contact</li>
        </ul>

        {/* Login Button */}
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-green-400 px-5 py-2 rounded-full font-semibold hover:bg-green-400 hover:text-[#051732] shadow-md hover:scale-105 transition"
        >
          Login
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </div>
  )
}

export default Navbar
