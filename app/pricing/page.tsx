"use client";

import React from "react";
import { Check, Euro, CheckCircle, FileText } from "lucide-react";
import { motion } from "framer-motion";

const PriceCard = ({ title, price, aiChat, huisbezoek, description }) => (
  <motion.div
    className="bg-white border border-[#D6E1F2] shadow rounded-lg p-6 space-y-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
    <p className="text-2xl font-bold text-blue-900">{price}</p>
    <ul className="space-y-1 text-sm">
      <li className="flex items-center">
        <Check className="w-4 h-4 text-green-600 mr-2" /> AI-chat: {aiChat}
      </li>
      <li className="flex items-center">
        <Check className="w-4 h-4 text-green-600 mr-2" /> Huisbezoek: {huisbezoek}
      </li>
    </ul>
    <p className="text-sm text-gray-600 italic">{description}</p>
  </motion.div>
);

export default function Prijzen() {
  const diensten = [
    {
      title: "Standaardrapport",
      price: "GRATIS",
      aiChat: "Niet inbegrepen",
      huisbezoek: "Nee",
      description: "Leadgeneratie / eerste contact",
    },
    {
      title: "Renovatiedossier (online)",
      price: "€125 (incl. 1 maand AI-chat)",
      aiChat: "1 maand gratis",
      huisbezoek: "Nee",
      description: "Volledig advies op basis van intake & documenten",
    },
    {
      title: "Renovatiedossier + huisbezoek",
      price: "€350 (incl. AI-chat + bezoek)",
      aiChat: "1 maand gratis",
      huisbezoek: "Ja",
      description: "Advies met fysieke inspectie + digitaal dossier",
    },
    {
      title: "Interieurvoorstel",
      price: "€350",
      aiChat: "Optioneel",
      huisbezoek: "Optioneel",
      description: "Professioneel interieurvoorstel met sfeer & indeling",
    },
    {
      title: "Renovatiecoördinatie",
      price: "€350 opstart + 10% op verbouwbudget",
      aiChat: "Optioneel",
      huisbezoek: "Ja",
      description: "Begeleiding van A tot Z voor een renovatieproject",
    },
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-sans">
      {/* Linkerzijde */}
      <div className="bg-white text-blue-800 flex flex-col px-8 py-16 sticky top-0 h-fit self-start">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-8 h-8 mr-2 text-blue-600" />
            <h1 className="text-3xl font-bold">Prijsoverzicht</h1>
          </div>
          <p className="text-lg mb-6 text-blue-700">
            Hier vind je een overzicht van onze pakketten en bijhorende tarieven. Je kiest zelf hoe uitgebreid je advies wordt.
          </p>
        </div>
      </div>

      {/* Rechterzijde */}
      <div className="bg-blue-50 text-blue-900 flex flex-col justify-start px-8 py-16">
        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-6 flex items-center text-blue-700">
            <FileText className="w-6 h-6 mr-2" /> Onze formules
          </h2>
          <div className="grid gap-6 grid-cols-1">
            {diensten.map((d, index) => (
              <PriceCard key={index} {...d} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}