"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InterieurToolIntake() {
  const [style, setStyle] = useState("");
  const [file, setFile] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stijlParam = encodeURIComponent(style);
    router.push(`/interieur/resultaat?stijl=${stijlParam}`);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        Interieurvoorstel op maat
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Plattegrondupload */}
        <div>
          <label className="block mb-2 font-semibold">Upload je plattegrond (PDF of afbeelding)</label>
          <input
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileChange}
            className="block w-full bg-white rounded border border-gray-300 px-4 py-2"
          />
        </div>

        {/* Stijlkeuze */}
        <div>
          <label className="block mb-2 font-semibold">Kies je stijl</label>
          <div className="flex gap-4 flex-wrap">
            {[
              "Modern",
              "Scandinavisch",
              "Industrieel",
              "Warm natuurlijk",
              "Minimalistisch"
            ].map((optie) => (
              <button
                type="button"
                key={optie}
                onClick={() => setStyle(optie)}
                className={`px-4 py-2 rounded border ${
                  style === optie
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-blue-600 border-blue-300 hover:bg-blue-50"
                }`}
              >
                {optie}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
          disabled={!style}
        >
          Genereer mijn voorstel
        </button>
      </form>
    </div>
  );
}
