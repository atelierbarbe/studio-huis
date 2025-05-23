import { supabase } from "../../../lib/supabaseClient";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("📦 Ontvangen body:", body); // ← Debug hier

    const { data, error } = await supabase
      .from("intakes")
      .insert([body])
      .select("id")
      .single();

    if (error || !data) {
      console.error("❌ Supabase insert error:", error); // ← Debug hier
      return new Response(JSON.stringify({ error: error?.message || "Insert failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Server error:", err); // ← Debug hier
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
