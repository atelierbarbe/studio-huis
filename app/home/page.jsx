import { Ruler, ClipboardList, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <div className="font-sans">
      {/* Split Hero */}
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* Linkerzijde */}
        <div className="bg-blue-600 text-white flex flex-col justify-between px-8 py-10">
          <div>
            <h2 className="text-white text-2xl font-bold tracking-wide mb-6">Studio Huis</h2>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-4xl font-bold mb-4">Jouw renovatie, helder en doordacht.</h1>
            <p className="text-lg mb-6">
              Studio Huis helpt je om de juiste keuzes te maken — van isolatie tot interieur. Duurzaam, begrijpelijk en stijlvol.
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/90">
              <li>Gratis intake en adviesrapport</li>
              <li>Technisch én esthetisch afgestemd</li>
              <li>Advies op jouw tempo, in jouw stijl</li>
            </ul>
          </div>
        </div>

        {/* Rechterzijde */}
        <div className="bg-white text-gray-800 flex flex-col justify-center px-8 py-20">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Start vandaag nog</h2>
          <p className="mb-6">
            Beantwoord enkele eenvoudige vragen en ontvang een helder adviesrapport op maat van jouw woning.
          </p>
          <a
            href="/intake"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300 ease-in-out w-max"
          >
            Start je intake
          </a>
        </div>
      </div>

      {/* Sectie: Hoe werkt het */}
      <section className="bg-gray-50 py-16 px-6 md:px-16">
        <h2 className="text-3xl font-semibold text-center text-blue-600 mb-10">Hoe werkt Studio Huis?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Ruler className="text-blue-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">1. Vertel ons over je woning</h3>
            <p>Wat wil je aanpakken? Hoe oud is je woning? Heb je een EPC? Wij luisteren.</p>
          </div>
          <div className="flex flex-col items-center">
            <ClipboardList className="text-blue-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">2. Wij analyseren en combineren</h3>
            <p>Techniek, subsidies en esthetiek: alles wordt overzichtelijk gebundeld.</p>
          </div>
          <div className="flex flex-col items-center">
            <FileText className="text-blue-600 w-10 h-10 mb-4" />
            <h3 className="text-xl font-semibold mb-2">3. Jij ontvangt een helder rapport</h3>
            <p>Download je advies in PDF-formaat en ga met vertrouwen aan de slag.</p>
          </div>
        </div>
      </section>

      {/* Sectie: Voorbeeld adviesrapport */}
      <section className="py-16 px-6 md:px-16 bg-white text-center">
        <h2 className="text-3xl font-semibold text-blue-600 mb-6">Benieuwd naar een voorbeeldrapport?</h2>
        <p className="text-gray-700 mb-8">Download een demo-versie en ontdek hoe helder ons advies eruitziet.</p>
        <a
          href="/voorbeeld-rapport.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
        >
          Download voorbeeldrapport
        </a>
      </section>

      {/* Footer CTA + Info */}
      <footer className="bg-blue-600 text-white py-16 px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Nieuwsbrief */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Blijf op de hoogte</h3>
            <p className="mb-4 text-white/90">Schrijf je in voor onze nieuwsbrief en ontvang tips, premies en advies rechtstreeks in je inbox.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Jouw e-mailadres"
                className="px-4 py-2 rounded bg-transparent border border-white text-white placeholder-white w-full sm:w-auto focus:outline-none focus:border-blue-300 transition"
              />
              <button
                type="submit"
                className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100"
              >
                Inschrijven
              </button>
            </form>
          </div>

          {/* Navigatie */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Studio Huis</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
              <li><a href="/privacy" className="hover:underline">Privacy & GDPR</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-white/80 text-sm">
          © Studio Huis – 2025
        </div>
      </footer>
    </div>
  );
}
