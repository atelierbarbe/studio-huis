"use client";

import React, { useState, useEffect } from "react";
import { Lightbulb, Sparkles, FileText, Home as HomeIcon } from "lucide-react";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {/* Split grid hero */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Linkerzijde */}
        <div className="bg-blue-600 text-white flex flex-col justify-center px-8 py-10 relative">
          <div className="absolute top-[-6rem] md:top-[-4rem] left-8 z-10">
            <img
              src="/logo/studio_huis_logo_wit_transparant.png"
              alt="Studio Huis logo"
              className="h-60 md:h-80 w-auto max-w-full"
            />
          </div>

          <div className="flex flex-col justify-center h-full pt-60">
            <h3 className="text-4xl font-semibold mb-4">Jouw renovatie, helder en doordacht.</h3>
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
        <div className="bg-white text-gray-800 flex flex-col justify-center px-8 py-10 h-full pt-60">
          <h3 className="text-4xl font-semibold text-blue-600 mb-4">Start vandaag nog</h3>
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

      {/* Waarom Studio Huis */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Waarom kiezen voor Studio Huis?</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
          <div>
            <Lightbulb className="mx-auto text-blue-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-blue-800">Slim advies op maat</h3>
            <p className="text-sm text-gray-600">
              Geen nattevingerwerk, maar gericht advies volgens normen en subsidies.
            </p>
          </div>
          <div>
            <Sparkles className="mx-auto text-blue-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-blue-800">Snelle resultaten</h3>
            <p className="text-sm text-gray-600">
              Binnen enkele minuten een eerste rapport, dankzij onze slimme intake.
            </p>
          </div>
          <div>
            <FileText className="mx-auto text-blue-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-blue-800">Visueel interieuradvies</h3>
            <p className="text-sm text-gray-600">
              Combineer technisch inzicht met een mooi interieurvoorstel.
            </p>
          </div>
          <div>
            <HomeIcon className="mx-auto text-blue-600 w-8 h-8 mb-2" />
            <h3 className="font-semibold text-blue-800">Begeleiding bij renovatie</h3>
            <p className="text-sm text-gray-600">
              Van huisbezoek tot coördinatie, Studio Huis groeit met je project mee.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
