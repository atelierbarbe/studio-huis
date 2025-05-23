"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

function BedanktContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const intakeId = searchParams.get("id");

  const [intakeData, setIntakeData] = useState(null);
  const [email, setEmail] = useState("");
  const [telefoon, setTelefoon] = useState("");
  const [toestemming, setToestemming] = useState(false);
  const [foutmelding, setFoutmelding] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIntake = async () => {
      if (!intakeId) return;

      const { data, error } = await supabase
        .from("intakes")
        .select("*")
        .eq("id", intakeId)
        .single();

      if (error || !data) {
        setFoutmelding("Intake niet gevonden.");
      } else {
        setIntakeData(data);
      }
    };

    fetchIntake();
  }, [intakeId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFoutmelding(null);

    if (!toestemming || !email) {
      setFoutmelding("Vul je e-mailadres in en geef toestemming om verder te gaan.");
      return;
    }

    try {
      setLoading(true);

      const intakeResponse = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...intakeData,
          email,
          telefoon,
        }),
      });

      const intakeResult = await intakeResponse.json();

      if (!intakeResult.id) {
        throw new Error("Geen ID ontvangen van Supabase.");
      }

      const adviesResponse = await fetch("/api/genereer-advies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...intakeData,
          email,
          telefoon,
        }),
      });

      const adviesResult = await adviesResponse.json();

      localStorage.setItem("advies", adviesResult.advies || "");
      localStorage.setItem("contact", JSON.stringify({ email, telefoon }));

      router.push(`/rapport?id=${intakeResult.id}`);
    } catch (err) {
      console.error("❌ Fout bij intake of advies:", err);
      setFoutmelding("Er liep iets fout bij het verwerken van je aanvraag.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow pb-30">
        {/* Linkerzijde */}
        <div className="bg-white text-blue-600 flex flex-col justify-center px-8 py-16">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl font-bold mb-4">Bedankt voor je aanvraag!</h1>
            <p className="text-lg mb-6">
              Laat nog even je contactgegevens na. Daarna kan je jouw gepersonaliseerd adviesrapport bekijken.
            </p>
            {foutmelding && <p className="text-red-600 mb-4">⚠️ {foutmelding}</p>}
          </div>
        </div>

        {/* Rechterzijde */}
        <div className="bg-blue-600 text-white flex flex-col justify-center px-8 py-16 pb-30">
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
                  placeholder="jouw@email.be"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Telefoon (optioneel)</label>
                <input
                  type="tel"
                  value={telefoon}
                  onChange={(e) => setTelefoon(e.target.value)}
                  className="block w-full bg-white text-blue-800 rounded px-4 py-2 border border-white"
                  placeholder="Optioneel"
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
                disabled={loading}
                className="w-full bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-blue-100"
              >
                {loading ? "Adviesrapport wordt gegenereerd..." : "Bekijk adviesrapport"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BedanktPagina() {
  return (
    <Suspense fallback={<p className="p-8 text-blue-600">Even geduld… laden...</p>}>
      <BedanktContent />
    </Suspense>
  );
}
