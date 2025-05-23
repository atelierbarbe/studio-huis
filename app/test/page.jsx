"use client";

import { useState } from "react";

export default function TestAgentPage() {
  const [vraag, setVraag] = useState("");
  const [antwoord, setAntwoord] = useState("");
  const [laadt, setLaadt] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vraag.trim()) return;

    setLaadt(true);
    setAntwoord("Bezig met analyseren...");

    try {
      const res = await fetch("/api/agent-analyse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            assistantId: "asst_j8iy69pgZkf7UcKooa0fuXIE", // ← Jouw Assistant ID hier
            fileId: "file-KidynTgM82yAMeVtHyTJnB",      // ← Jouw bestand ID hier
          vraag,
        }),
      });

      const data = await res.json();
      setAntwoord(data.antwoord || data.error || "Geen respons ontvangen van de agent.");
    } catch (err) {
      setAntwoord("Er ging iets mis bij het versturen van je vraag.");
    } finally {
      setLaadt(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-6 text-blue-700">Test je AI-agent</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 border rounded shadow text-blue-900"
          rows={3}
          value={vraag}
          onChange={(e) => setVraag(e.target.value)}
          placeholder="Stel een vraag over het EPC-bestand..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={laadt}
        >
          {laadt ? "AI denkt na..." : "Stel vraag aan renovatiecoach"}
        </button>
      </form>

      {typeof antwoord === "string" && antwoord.trim().length > 0 && (
        <div className="mt-8 p-4 bg-white border rounded shadow text-blue-900 whitespace-pre-wrap">
          {antwoord}
        </div>
      )}
    </div>
  );
}

       