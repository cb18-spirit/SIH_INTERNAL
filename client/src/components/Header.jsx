import React from 'react'

const Header = () => {
  return (
    <div className='bg-[#bbb089b3]'>
    
   {/*<img className="w-full sm:h-170 h-80" src="./public/p1.jpg" />*/}

<div className="flex flex-col md:flex-row justify-around items-center mt-16 gap-12 px-6">
  
  {/* Left side text */}
  <div className="w-full md:w-1/2 text-center md:text-left ml-30 mt-20">
  <div className="bg-[#051732] text-white p-10 rounded-2xl shadow-xl">
    <h1 className="font-extrabold text-2xl md:text-5xl text-white drop-shadow-lg">
      WELCOME TO <span className="text-[#285ca8]">SMART FARMING</span>
    </h1>
    <p className="pt-6 text-gray-300 md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
      Empowering farmers with <span className="font-semibold text-[#285ca8]">modern technology </span> 
      to grow smarter, healthier, and more sustainable crops.  
      From weather alerts to soil guidance, we’re here to make farming 
      simpler and more productive for you.
    </p>
  </div>
</div>


   

  {/* Right side circle */}
<<<<<<< HEAD
  <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-5">
    <div className="relative grid border-10 aspect-square border-green-500 rounded-full 
              w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[300px] md:h-[300px]">
      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center sm:text-lg text-xl ">
        Lorem, ipsum dolor.
=======
  <div className="w-full md:w-1/2 flex justify-center mt-20">
    <div className="relative grid border-[12px] aspect-square text-[#285ca8] rounded-full 
                    w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[340px] md:h-[340px]
                    bg-gradient-to-br from-[#051732] to-[#0a2345] shadow-xl">
      
      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     text-center text-white font-semibold text-lg sm:text-xl">
        Smarter Farming,<br/>Better Future 🌱
>>>>>>> 0e8598f20d385784844096fc5cc0e16e4a227494
      </h3>

      {/* Floating images with animation */}
      <img className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full top-[-40px] left-1/2 -translate-x-1/2 " src="fertilizer1.jpg" />
      <img className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bottom-[-40px] left-[10%] " src="fertilizer2.jpg" />
      <img className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bottom-[-40px] right-[10%] " src="fertilizer3.webp" />
    </div>
  </div>
</div>

  
  {/*hero section*/}
  <div>
   <section className="  text-black min-h-screen flex items-center justify-center">
      <div className="text-center px-6 max-w-6xl">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-12">
          Smart Farming Assistance
        </h1>

        {/* Features in Boxes */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-[#285ca8]  backdrop-blur-lg p-6 rounded-2xl shadow-lg text-left hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">🌦 Weather-based alerts</h2>
            <p className="text-gray-200">
              Get real-time updates and predictive forecasts to plan your farming activities better.
            </p>
          </div>

          <div className="bg-[#285ca8]  backdrop-blur-lg p-6 rounded-2xl shadow-lg text-left hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">🐛 Pest & disease detection</h2>
            <p className="text-gray-200">
              Upload crop images to identify pests or diseases early and receive timely advice.
            </p>
          </div>

          <div className="bg-[#285ca8]  backdrop-blur-lg p-6 rounded-2xl shadow-lg text-left hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">💹 Market price tracking</h2>
            <p className="text-gray-200">
              Stay updated with daily market prices to make informed selling and buying decisions.
            </p>
          </div>

          <div className="bg-[#285ca8]  backdrop-blur-lg p-6 rounded-2xl shadow-lg text-left hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">🎙 Voice support</h2>
            <p className="text-gray-200">     
              Access features with simple voice commands, designed for low-literate users.
            </p>
          </div>

          <div className="bg-[#285ca8] backdrop-blur-lg p-6 rounded-2xl shadow-lg text-left hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">📊 Feedback & improvement</h2>
            <p className="text-gray-200">
              Share your experiences to improve services and get smarter recommendations over time.
            </p>
          </div>
          <div className="bg-[#285ca8]  backdrop-blur-lg p-6 rounded-2xl shadow-lg text-left hover:scale-105 transition">
            <h2 className="text-2xl font-semibold mb-2">💹 Soil health recommendationsand guidance</h2>
            <p className="text-gray-200">
              Stay updated with daily market prices to make informed selling and buying decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
    
    </div>
  )
}

export default Header
