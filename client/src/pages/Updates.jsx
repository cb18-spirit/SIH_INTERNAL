
import React , {useState}from 'react'

import { useNavigate } from 'react-router-dom';

const Updates = () => {

  const navigate = useNavigate();


  const [menuOpen, setMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  return (
    <div className="bg-[#E5F6DF]">
    <nav className="bg-blue-900 flex items-center justify-between px-4 py-1 shadow-md">
    
    {/* Logo */}
    <a
      href="/"
      className="text-white text-xl font-semibold no-underline"
    >
      AgriSmart
    </a>

    {/* Mobile Toggle */}
    <img
      className="w-6 h-6 cursor-pointer md:hidden"
      src={menuOpen ? "/UpdatesNavbar/wrongmark.svg" : "/UpdatesNavbar/bars.svg"}
      onClick={() => setMenuOpen(!menuOpen)}
      alt="menu toggle"
    />
           <li>
            <button onClick={()=>navigate('/Profile')} className="text-white text-xl no-underline">
             profile
            </button>
          </li>

           <li>
            <a  className="text-white text-xl no-underline">
               logout
            </a>
          </li>

    {/* Menu */}
    <ul
      onClick={() => setMenuOpen(false)}
      className={`absolute right-4 top-14 flex-col items-center gap-3 rounded-md
        bg-blue-900 p-4 shadow-md 
        md:static md:flex md:flex-row md:gap-8 md:bg-transparent md:shadow-none
        transition-all duration-300 ${menuOpen ? "flex" : "hidden md:flex"}`}
    >
      <li>
        <button onClick={() => navigate('/AI-Assistant')} className="text-white text-base no-underline hover:text-green-300">
          AI Assistant
        </button>
      </li>
      <li>
        <button onClick={() => navigate('/Disease-Detection')} className="text-white text-base no-underline hover:text-green-300">
          Disease Detection
        </button>
      </li>
      <li>
        <a className="text-white text-base no-underline hover:text-red-400 cursor-pointer">
          Logout
        </a>
      </li>
    </ul>

  </nav>
    {/*hero section*/}


    <div>
      <div className="p-6 ">
        <h2 className="text-xl font-bold text-gray-800 ">Welcome,</h2>
        <p className="mb-7 text-gray-600">
          Here's what happening in your farm today
        </p>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Soil Health Box */}
          <div
            onClick={() => setOpenModal("soil")}
            className="bg-white rounded-xl shadow p-4 text-center cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-600">Soil Health</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">85%</p>
            <div className="text-green-600 mt-1">Good condition</div>
          </div>

          {/* Weather Alert Box */}
          <div
            onClick={() => setOpenModal("weather")}
            className="bg-white rounded-xl shadow p-4 text-center cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-medium text-gray-600">Weather Alert</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">24°C</p>
            <div className="text-blue-600 mt-1">Perfect for farming</div>
          </div>
        </div>
      </div>

      {/* posts section */}
      <div className="p-6 bg-[#E5F6DF] ">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Marketplace</h2>

        {/* Grid for posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Post Card */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <img
              src="/images/wheat.jpg"
              alt="Wheat"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">Fresh Wheat</h3>
            <p className="text-sm text-gray-600 mb-3">
              High-quality organic wheat from local farms.
            </p>
            <div className="mt-auto flex justify-between gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                Buy
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
                Add to Cart
              </button>
            </div>
          </div>

          {/* Repeat Post Cards */}
          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <img
              src="/images/rice.jpg"
              alt="Rice"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">Premium Rice</h3>
            <p className="text-sm text-gray-600 mb-3">
              Soft and fresh rice, perfect for daily meals.
            </p>
            <div className="mt-auto flex justify-between gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                Buy
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <img
              src="/images/corn.jpg"
              alt="Corn"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">Golden Corn</h3>
            <p className="text-sm text-gray-600 mb-3">
              Sweet corn freshly harvested, ready to cook.
            </p>
            <div className="mt-auto flex justify-between gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                Buy
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <img
              src="/images/tomato.jpg"
              alt="Tomato"
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">Fresh Tomatoes</h3>
            <p className="text-sm text-gray-600 mb-3">
              Juicy red tomatoes straight from the farm.
            </p>
            <div className="mt-auto flex justify-between gap-2">
              <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm">
                Buy
              </button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
            {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-[#E5F6DF] bg-opacity-90">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[400px] relative">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
              ✖
            </button>

            {openModal === "soil" && (
              <>
                <h2 className="text-xl font-bold mb-2">Soil Health Report</h2>
                <p className="text-gray-700">Moisture: <b>70%</b></p>
                <p className="text-gray-700">pH Level: <b>6.5</b> (Neutral)</p>
                <p className="text-gray-700">Nutrient Status: <b>Good</b></p>
                <p className="text-gray-700">Recommendation: Add compost in 2 weeks.</p>
              </>
            )}

            {openModal === "weather" && (
              <>
                <h2 className="text-xl font-bold mb-2">Weather Forecast</h2>
                <p className="text-3xl font-bold text-yellow-600">☀ 24°C</p>
                <p className="text-gray-700 mb-2">Sunny, perfect for outdoor work</p>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>👁 10km</span>
                  <span>💧 45%</span>
                  <span>💨 12km/h</span>
                </div>
                <h3 className="font-semibold text-gray-800 mt-2">5-Day Forecast</h3>
                <ul className="text-gray-700 text-sm mt-1">
                  <li>Today - ☀ 28° / 18°</li>
                  <li>Tomorrow - 🌧 22° / 15°</li>
                  <li>Wednesday - ☁ 25° / 16°</li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}

    </div>

    </div>
  )
}

export default Updates





















// // import React, { useState } from "react";

// // const Updates= () => {
// //   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     //  <nav className="relative flex flex-col md:flex-row items-start md:items-center justify-between pt-[47px] mx-[4%] z-20">
//     //   {/* Logo */}
//     //   <a href="/" className="text-white text-2xl md:text-3xl font-semibold no-underline">
//     //     Portfoli0
//     //   </a>
// {/*     
//     <div className={styles.menu}>
//         <img className={styles.menubtn} src={menuOpen?'public/nav/wrongmark.svg':'public/nav/bars.svg'} onClick={()=>setMenuOpen(!menuOpen)} />
//         <ul className={`${styles.items} ${menuOpen&&styles.menuopen}`} onClick={()=>setMenuOpen(false)} >
//             <li><a href="/about">About</a></li>
//             <li><a href="/Projects">Projects</a></li>
//             <li><a href="/blogs">Blogs</a></li>
//             <li><a href="/contact">Contact</a></li>
//         </ul>
//     </div> */}
// //    </nav>

        
  
// //   )
// // }

// export default Updates;
