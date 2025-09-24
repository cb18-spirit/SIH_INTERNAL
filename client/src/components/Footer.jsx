// src/components/Footer.jsx
export default function Footer() {
  return (

    <footer className="bg-white border-t border-green-100 py-12 px-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg font-bold">🌱</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">SmartFarm</h2>
          </div>
          <p className="text-gray-600 text-sm">
            Growing with nature. Smart agricultural solutions for sustainable farming and a better tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li><a href="#weather" className="hover:text-green-600 transition-colors">Weather Alerts</a></li>
            <li><a href="#pest-detection" className="hover:text-green-600 transition-colors">Pest Detection</a></li>
            <li><a href="#market-prices" className="hover:text-green-600 transition-colors">Market Prices</a></li>
            <li><a href="#soil-health" className="hover:text-green-600 transition-colors">Soil Health</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span>📧</span> info@smartfarm.com
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span> Agricultural Hub, India
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Stay Updated</h3>
          <p className="text-sm text-gray-600 mb-4">Get the latest agricultural insights and weather updates</p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg border border-green-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 font-semibold transition-colors">
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
