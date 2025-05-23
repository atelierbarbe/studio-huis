"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { CheckCircle, FileText, Scale, Euro, Hammer, Home } from "lucide-react";

export default function RapportPagina() {
  const searchParams = useSearchParams();
  const intakeId = searchParams.get("id");

  const [advies, setAdvies] = useState("");
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({ email: "", telefoon: "" });
  const [actiefTab, setActiefTab] = useState("1. Normen en verplichtingen");

  useEffect(() => {
    const fetchAdvies = async () => {
      if (!intakeId) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("intakes")
          .select("*")
          .eq("id", intakeId)
          .single();

        if (error || !data) {
          console.error("❌ Supabase-fout:", error);
          setLoading(false);
          return;
        }

        const contact = {
          email: data.email || "",
          telefoon: data.telefoon || "",
        };

        console.log("📦 Verstuur naar AI:", data);

        const res = await fetch("/api/genereer-advies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        console.log("📡 API status:", res.status);

        let result;
        try {
          result = await res.json();
          console.log("✅ Ontvangen advies:", result.advies);
        } catch (err) {
          console.error("❌ JSON fout:", err);
          result = { advies: "⚠️ Geen geldig AI-antwoord ontvangen." };
        }

        setAdvies(result.advies || "⚠️ Geen advies gevonden.");
        setContact(contact);
        localStorage.setItem("advies", result.advies || "");
        localStorage.setItem("contact", JSON.stringify(contact));
      } catch (err) {
        console.error("❌ Algemeen probleem bij ophalen/genereren:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvies();
  }, [intakeId]);

  const downloadPdf = () => {
    const blob = new Blob([advies], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "renovatieadvies.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const extractTabSections = (tekst) => {
    const secties = tekst.split(/\n(?=\d\.\s)/g);
    const parsed = {};
    secties.forEach((blok, index) => {
      const titel = blok.split("\n")[0].trim();
      const inhoud = blok.split("\n").slice(1).join("\n").trim();
      parsed[index === 0 ? "Home" : titel] = inhoud;
    });
    return parsed;
  };

  const secties = extractTabSections(advies);
  const tabTitels = Object.keys(secties);

  const getIcon = (titel) => {
    if (titel === "Home") return <Home className="w-4 h-4 mr-2" />;
    if (titel.startsWith("1.")) return <Hammer className="w-4 h-4 mr-2" />;
    if (titel.startsWith("2.")) return <Scale className="w-4 h-4 mr-2" />;
    if (titel.startsWith("3.")) return <Euro className="w-4 h-4 mr-2" />;
    return <FileText className="w-4 h-4 mr-2" />;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-white text-blue-600 flex flex-col px-8 py-16 sticky top-0 h-screen justify-start">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-4">
              <CheckCircle className="w-8 h-8 mr-2" />
              <h1 className="text-3xl font-bold">Jouw Renovatieadvies</h1>
            </div>
            <p className="text-lg mb-6">
              Op basis van je antwoorden en situatie hebben we een eerste analyse gegenereerd.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 text-blue-900 flex flex-col justify-start px-8 py-16">
          <div className="max-w-2xl mx-auto w-full">
            <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-600">
              <FileText className="w-6 h-6 mr-2" /> Adviesrapport
            </h2>

            {loading ? (
              <p className="text-blue-800">Even geduld… we genereren je rapport.</p>
            ) : advies ? (
              <>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tabTitels.map((titel) => (
                    <button
                      key={titel}
                      onClick={() => setActiefTab(titel)}
                      className={`flex items-center px-4 py-2 rounded-md border transition-all text-sm font-medium shadow-sm ${
                        actiefTab === titel
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-blue-800 border-blue-300 hover:bg-blue-100"
                      }`}
                    >
                      {getIcon(titel)}
                      {titel.replace(/^\d\.\s/, "")}
                    </button>
                  ))}
                </div>

                <div className="bg-white text-blue-800 p-6 rounded shadow whitespace-pre-wrap leading-relaxed">
                  {secties[actiefTab]?.split("\n\n").map((blok, i) => (
                    <div key={i} className="mb-10">
                      {blok.split("\n").map((lijn, j) => (
                        <p key={j} className="mb-2">{lijn}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <button
                  onClick={downloadPdf}
                  className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
                >
                  Download als PDF
                </button>
              </>
            ) : (
              <p className="text-red-600">⚠️ Geen advies gevonden. Probeer het later opnieuw.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
