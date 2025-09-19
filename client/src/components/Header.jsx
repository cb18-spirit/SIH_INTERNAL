import React from 'react'

const Header = () => {
  return (
     <div>
       <img className='w-full h-152' src="./public/p1.jpg"/>
       <div className='flex justify-around mt-10'>
        <div >
          <h1 className='font-[900] text-3xl'>WELLCOME TO</h1>
          <p className='pt-14'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio fugit molestiae sed numquam, ipsum accusantium nam aperiam eos suscipit dolorem sint voluptates nostrum aut eum aliquam blanditiis iure placeat eligendi!</p>
        </div>

        <div className='relative grid gap-4 border-17 aspect-ratio-1/1 border-green-500 rounded-[50%] mr-10 items-center justify-center w-[400px] h-[300px]'>
          <h3 className='absolute w-65 text-center justify-center'> Hemp Seeding Growth</h3>
          <div ><img className='absolute w-25 h-25 rounded-[50%] top-[-50px] left-[100px]' src="fertilizer1.jpg"/></div>
          <div><img className='absolute w-25 h-25 rounded-[50%]  bottom-[-3px] left-[-20px] ' src="fertilizer2.jpg" /></div>
          <div><img className='absolute w-25 h-25 rounded-[50%] bottom-[20px] right-[-20px]' src="fertilizer3.webp"/></div>
        </div>
       </div>
    </div>
  )
}

export default Header
