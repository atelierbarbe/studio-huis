"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function IntakePagina() {
  const [form, setForm] = useState({
    naam: "",
    woningtype: "",
    bouwjaar: "",
    verwarmingssysteem: "",
    epc: "",
    interesse: [],
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const interesse = checked
        ? [...prev.interesse, value]
        : prev.interesse.filter((i) => i !== value);
      return { ...prev, interesse };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      email: "",     // optioneel veld voor nu
      telefoon: "",  // optioneel veld voor nu
    };

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok && result.id) {
        router.push(`/bedankt?id=${result.id}`);
      } else {
        console.error("Fout bij opslaan intake");
      }
    } catch (err) {
      console.error("Netwerkfout:", err);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Linkerzijde */}
      <div className="bg-white text-blue-600 flex flex-col justify-center px-8 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Renovatieadvies op maat</h1>
          <p className="text-lg">
            Vul dit korte formulier in en ontvang een helder adviesrapport afgestemd op jouw woning. We houden rekening met isolatienormen, premies én esthetiek.
          </p>
        </div>
      </div>

      {/* Rechterzijde */}
      <div className="bg-blue-600 text-white flex flex-col justify-center px-8 py-16">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-2xl font-semibold mb-6">Start je intake</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium">Naam</label>
              <input
                type="text"
                name="naam"
                value={form.naam}
                onChange={handleChange}
                className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                placeholder="Voornaam en naam"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Woningtype</label>
              <select
                name="woningtype"
                value={form.woningtype}
                onChange={handleChange}
                className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                required
              >
                <option value="">Maak een keuze</option>
                <option value="rijwoning">Rijwoning</option>
                <option value="appartement">Appartement</option>
                <option value="halfopen">Halfopen bebouwing</option>
                <option value="open">Vrijstaande woning</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Bouwjaar woning</label>
              <input
                type="text"
                name="bouwjaar"
                value={form.bouwjaar}
                onChange={handleChange}
                className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                placeholder="bv. 1972"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Verwarmingssysteem</label>
              <select
                name="verwarmingssysteem"
                value={form.verwarmingssysteem}
                onChange={handleChange}
                className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
              >
                <option value="">Maak een keuze</option>
                <option value="gas">Aardgas</option>
                <option value="mazout">Mazout</option>
                <option value="elektrisch">Elektrisch</option>
                <option value="warmtepomp">Warmtepomp</option>
                <option value="andere">Andere</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Heb je een EPC-score?</label>
              <input
                type="text"
                name="epc"
                value={form.epc}
                onChange={handleChange}
                className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                placeholder="bv. 365 of label D"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Waarin ben je geïnteresseerd?</label>
              <div className="space-y-2">
                {["Isolatie", "Ventilatie", "Verwarming", "Zonnepanelen", "Interieur"].map((optie) => (
                  <div key={optie} className="flex items-center">
                    <input
                      type="checkbox"
                      value={optie}
                      checked={form.interesse.includes(optie)}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    <span>{optie}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-blue-100"
              disabled={!form.naam || !form.woningtype}
            >
              Genereer mijn advies
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
