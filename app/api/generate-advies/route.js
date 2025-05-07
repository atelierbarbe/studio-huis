import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { naam, woningtype, bouwjaar, verwarmingssysteem, epc, interesse } = body;

    console.log("[Mock AI] Ontvangen gegevens:", body);

    const advies = `Beste ${naam || "verbouwer"},

Gezien je woningtype (${woningtype}) en bouwjaar (${bouwjaar}) is het zeker interessant om te starten met dakisolatie. Dit heeft vaak de grootste impact op je energieverbruik. 

Je verwarmt momenteel met ${verwarmingssysteem}, wat in veel gevallen vervangen kan worden door een warmtepomp of een hybride oplossing.

Verder merken we dat je interesse hebt in: ${interesse.join(", ")}. Overweeg zeker om je EPC-score (${epc || "onbekend"}) te verbeteren, zodat je in aanmerking komt voor extra premies.

Succes met je renovatie!
— Studio Huis`;

    return NextResponse.json({ advies });

  } catch (error) {
    console.error("❌ Mock API fout:", error);
    return NextResponse.json({ error: "Er ging iets mis op de server." }, { status: 500 });
  }
}
