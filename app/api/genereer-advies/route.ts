import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const { naam, woningtype, bouwjaar, verwarmingssysteem, epc } = body;

    // ✅ interesse veilig omzetten naar array
    const interesse = Array.isArray(body.interesse)
      ? body.interesse
      : typeof body.interesse === "string"
      ? body.interesse.split(",").map((s) => s.trim())
      : [];

    const prompt = `
Je bent een ervaren renovatieadviseur. Genereer een helder, gestructureerd adviesrapport voor de klant "${naam || "onbekend"}". Houd rekening met:

Woningtype: ${woningtype}
Bouwjaar: ${bouwjaar}
Verwarmingssysteem: ${verwarmingssysteem}
EPC-score: ${epc}
Interessegebieden: ${interesse.length > 0 ? interesse.join(", ") : "onbekend"}

📄 Structuur van je antwoord:
1. Situatieschets woning
2. Persoonlijk renovatieadvies (3-5 heldere stappen)
3. Mogelijke subsidies
4. Concrete aanbeveling of vervolgstap

Gebruik een toegankelijke, menselijke stijl. Vermijd technische overload, en spreek de klant gerust rechtstreeks aan.
    `;

    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });
    const advies = chat.choices?.[0]?.message?.content || "TEST: hier komt normaal het advies.";
   
    return NextResponse.json({ advies });
  } catch (err) {
    console.error("API fout:", err);
    return NextResponse.json(
      { error: "Er is iets misgelopen bij het genereren van je advies." },
      { status: 500 }
    );
  }
}
