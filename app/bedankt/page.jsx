"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";

function SearchParamsWrapper({ onDataReady }) {
  const searchParams = useSearchParams();
  const data = {
    naam: searchParams.get("naam") || "",
    woningtype: searchParams.get("woningtype") || "",
    bouwjaar: searchParams.get("bouwjaar") || "",
    verwarmingssysteem: searchParams.get("verwarmingssysteem") || "",
    epc: searchParams.get("epc") || "",
    interesse: searchParams.getAll("interesse") || [],
  };

  useEffect(() => {
    onDataReady(data);
  }, []);

  return null;
}

export default function BedanktPagina() {
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [toestemming, setToestemming] = useState(false);
  const [intakeData, setIntakeData] = useState(null);
  const [advies, setAdvies] = useState("");
  const [foutmelding, setFoutmelding] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFoutmelding(null);

    if (!intakeData) {
      setFoutmelding("Intakegegevens ontbreken");
      return;
    }

    try {
      const res = await fetch("/api/generate-advies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...intakeData })
      });

      if (!res.ok) {
        throw new Error(`Serverfout: ${res.status}`);
      }

      const data = await res.json();
      if (!data.advies) {
        throw new Error("Geen advies ontvangen uit API");
      }
      setAdvies(data.advies);

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Persoonlijk Renovatieadvies", 20, 20);

      doc.setFontSize(12);
      doc.text(`E-mail: ${email}`, 20, 35);
      doc.text(`Telefoon: ${telefoon || "Niet opgegeven"}`, 20, 42);

      doc.text(`\nWoningtype: ${intakeData.woningtype}`, 20, 55);
      doc.text(`Bouwjaar: ${intakeData.bouwjaar}`, 20, 62);
      doc.text(`Verwarming: ${intakeData.verwarmingssysteem}`, 20, 69);
      doc.text(`EPC-score: ${intakeData.epc}`, 20, 76);

      doc.text(`\nInteresses: ${intakeData.interesse.join(", ")}`, 20, 90);
      doc.text("\nAdvies:", 20, 105);

      const lines = doc.splitTextToSize(data.advies, 170);
      doc.text(lines, 20, 115);

      doc.save("adviesrapport.pdf");
    } catch (err) {
      console.error("Fout bij advies ophalen:", err);
      setFoutmelding("Er is iets misgelopen bij het genereren van je advies. Probeer het later opnieuw.");
    }
  };

  return (
    <>
      <Suspense fallback={<p className="text-white">Gegevens worden geladen...</p>}>
        <SearchParamsWrapper onDataReady={setIntakeData} />
      </Suspense>

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
        <div className="bg-white text-blue-600 flex flex-col justify-center px-8 py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4">Bedankt voor je aanvraag!</h1>
            <p className="text-lg">
              We stellen je adviesrapport samen. Laat hieronder nog even je contactgegevens achter. Na bevestiging start de download automatisch.
            </p>
            {foutmelding && (
              <p className="mt-4 text-red-600 font-medium">⚠️ {foutmelding}</p>
            )}
          </div>
        </div>

        <div className="bg-blue-600 text-white flex flex-col justify-center px-8 py-16">
          <div className="max-w-md mx-auto w-full">
            <h2 className="text-2xl font-semibold mb-6">Contactgegevens</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">E-mailadres</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Telefoon (optioneel)</label>
                <input
                  type="tel"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                  className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={toestemming}
                  onChange={(e) => setToestemming(e.target.checked)}
                  className="mr-2 mt-1"
                />
                <span className="text-sm">
                  Ik geef toestemming om mijn gegevens te gebruiken voor marketing- en opvolgingsdoeleinden.
                </span>
              </div>

              <button
                type="submit"
                className="bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-blue-100"
                disabled={!email || !toestemming || !intakeData}
              >
                Genereer en download mijn rapport
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
