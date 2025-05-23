"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPagina() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [intakes, setIntakes] = useState([]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/login");
        return;
      }

      setUser(session.user);

      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setIntakes(data);
      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <p className="p-8 text-gray-600">Laden...</p>;
  }

  return (
    <div className="p-8 font-sans">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Overzicht aanvragen</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          Log uit
        </button>
      </div>

      <p className="mb-4 text-sm text-gray-600">Ingelogd als: {user.email}</p>

      <table className="w-full table-auto border border-gray-200">
        <thead className="bg-blue-100 text-blue-900 text-left">
          <tr>
            <th className="p-3">Naam</th>
            <th className="p-3">Woningtype</th>
            <th className="p-3">Bouwjaar</th>
            <th className="p-3">Datum</th>
          </tr>
        </thead>
        <tbody>
          {intakes.map((i) => (
            <tr key={i.id} className="border-t hover:bg-blue-50">
              <td className="p-3">{i.naam}</td>
              <td className="p-3">{i.woningtype}</td>
              <td className="p-3">{i.bouwjaar}</td>
              <td className="p-3">
                {new Date(i.created_at).toLocaleDateString("nl-BE")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
