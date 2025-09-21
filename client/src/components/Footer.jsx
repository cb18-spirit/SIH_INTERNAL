// src/components/Footer.jsx
export default function Footer() {
  return (
<<<<<<< HEAD
    <footer className="bg-[#051732] text-white py-10 px-6 mt-20">
=======
    <footer className="bg-[#051732] text-white py-10 px-6">
>>>>>>> 0e8598f20d385784844096fc5cc0e16e4a227494
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">AgriWorld</h2>
          <p className="mt-3 text-sm text-gray-200">
            Growing with nature. Sustainable solutions for a better tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div >
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-200">
            <li><a href="/" className="hover:text-yellow-300">Home</a></li>
            <li><a href="#about" className="hover:text-yellow-300">About</a></li>
            <li><a href="#gallery" className="hover:text-yellow-300">Gallery</a></li>
            <li><a href="/login" className="hover:text-yellow-300">Login</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-gray-200">
            <li>Email: info@agriworld.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Location: Green Valley, Earth</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay Updated</h3>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-3 py-2 rounded-lg text-green-900 focus:outline-none"
            />
            <button className="bg-yellow-400 text-green-900 px-4 py-2 rounded-lg hover:bg-yellow-300 font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-sm text-gray-300 mt-10 border-t border-green-600 pt-6">
        © {new Date().getFullYear()} AgriWorld. All rights reserved.
      </div>
    </footer>
  );
}
