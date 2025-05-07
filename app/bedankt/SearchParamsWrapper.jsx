"use client";

import { useSearchParams } from "next/navigation";

export default function SearchParamsWrapper({ onDataReady }) {
  const searchParams = useSearchParams();

  const data = {
    naam: searchParams.get("naam") || "",
    woningtype: searchParams.get("woningtype") || "",
    bouwjaar: searchParams.get("bouwjaar") || "",
    verwarmingssysteem: searchParams.get("verwarmingssysteem") || "",
    epc: searchParams.get("epc") || "",
    interesse: searchParams.getAll("interesse") || [],
  };

  onDataReady(data);
  return null;
}
