import React from 'react'

const Header = () => {
  return (
     <div>
   <img className="w-full sm:h-170 h-80" src="./public/p1.jpg" />

<div className="flex flex-col md:flex-row justify-around items-center mt-10 gap-6">
  {/* Left side text */}
  <div className="w-full  text-center md:text-left px-4">
    <h1 className="font-[900] text-3xl">WELCOME TO</h1>
    <p className="pt-6">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugit molestiae sed numquam,
      ipsum accusantium nam aperiam eos suscipit dolorem sint voluptates nostrum aut eum aliquam blanditiis
      iure placeat eligendi!
    </p>
  </div>

  {/* Right side circle */}
  <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0">
    <div className="relative grid border-10 aspect-square border-green-500 rounded-full 
                    w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[300px] md:h-[300px]">
      <h3 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center sm:text-lg text-xl ">
        Lorem, ipsum dolor.
      </h3>

      {/* Images floating around */}
      <img className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full top-[-40px] left-1/2 -translate-x-1/2" src="fertilizer1.jpg" />
      <img className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bottom-[-30px] left-[10%]" src="fertilizer2.jpg" />
      <img className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bottom-[-30px] right-[10%]" src="fertilizer3.webp" />
    </div>
  </div>
</div>
    </div>
  )
}

export default Header
