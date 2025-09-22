
import React , {useState}from 'react'

const Updates = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-blue-900 relative flex flex-row md:flex-row items-start md:items-center justify-between">

     <a
        href="/"
        className="text-white text-2xl md:text-3xl font-semibold no-underline mb-4 md:mb-0"
      >
        AgriSmart
      </a>

       <img
        className="w-[55px] h-[30px] cursor-pointer md:hidden mb-4 md:mb-0"
        src={menuOpen ? "/UpdatesNavbar/wrongmark.svg" : "/UpdatesNavbar/bars.svg"}
        onClick={() => setMenuOpen(!menuOpen)}
        alt="menu toggle"
      />

      <ul
          onClick={() => setMenuOpen(false)}
          className={`absolute right-6 top-20 flex-col items-center gap-3 rounded-lg
            bg-gradient-to-t from-[rgba(25,55,109,0.2)] to-[rgba(25,55,109,1)] p-6 shadow-md 
            md:static md:flex md:flex-row md:gap-[50px] pr-20
            transition-all duration-300 ${menuOpen ? "flex" : "hidden md:flex"}`}
        >

          <li>
            <a href="/Projects" className="text-white text-xl no-underline">
             AI Assistant
            </a>
          </li>
          <li>
            <a href="/blogs" className="text-white text-xl no-underline pr-180">
              Disease Detection
            </a>
          </li>
    

           <li>
            <a href="/contact" className="text-white text-xl no-underline">
               logout
            </a>
          </li>

          </ul>
      
    </nav>
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
