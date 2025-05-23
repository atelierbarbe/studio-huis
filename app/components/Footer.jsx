// components/Footer.jsx
export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-10 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Branding + tagline */}
          <div>
            <h2 className="text-xl font-bold text-blue-400 mb-2">Studio Huis</h2>
            <p className="text-sm text-gray-400">Slim renovatieadvies op maat</p>
          </div>
  
          {/* Navigatie */}
          <div className="flex flex-col gap-2">
            <a href="/" className="hover:underline">Home</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/over-ons" className="hover:underline">Over ons</a>
          </div>
  
          {/* Nieuwsbrief */}
          <div>
            <p className="mb-2 font-semibold">Blijf op de hoogte</p>
            <form className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Je naam"
                className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="E-mailadres"
                className="px-3 py-2 rounded bg-gray-800 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold"
              >
                Inschrijven
              </button>
            </form>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 mt-10">
          © {new Date().getFullYear()} Studio Huis – Alle rechten voorbehouden
        </div>
      </footer>
    );
  }
  