import { supabase } from "../../../lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
    .from("intakes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Fout bij ophalen intakes:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
