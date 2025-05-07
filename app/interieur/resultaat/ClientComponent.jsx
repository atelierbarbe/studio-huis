"use client";

import { useSearchParams } from "next/navigation";

export default function InterieurResultaat() {
  const searchParams = useSearchParams();
  const gekozenStijl = searchParams.get("stijl") || "Onbekend";
  const bestand = searchParams.get("bestand") || "plattegrond-placeholder.jpg";
  const sfeerbeeld = "/sfeerbeeld-placeholder.jpg";

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Jouw Interieurvoorstel
      </h1>

      {/* Plattegrond */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Plattegrond</h2>
        <img src={`/${bestand}`} alt="Plattegrond" className="w-full rounded shadow" />
      </div>

      {/* Sfeerbeeld */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">Sfeerbeeld: {gekozenStijl}</h2>
        <img src={sfeerbeeld} alt="Sfeerbeeld" className="w-full rounded shadow" />
      </div>

      {/* Adviestekst */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Aanbevolen sfeer en materiaalgebruik</h2>
        <p className="text-gray-700">
          Voor een {gekozenStijl} interieur adviseren we lichte houttinten, zachte stoffen,
          en een harmonieus kleurenpalet dat past bij jouw stijlkeuze. Denk aan rust,
          eenvoud en evenwicht — zowel in materiaal als in indeling.
        </p>
      </div>
    </div>
  );
}
