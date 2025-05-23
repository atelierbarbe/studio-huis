import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { naam, woningtype, bouwjaar, verwarmingssysteem, epc, interesse } = body;

  const prompt = `
Je bent een AI-renovatiecoach gespecialiseerd in Vlaamse wetgeving en subsidies. Op basis van onderstaande gegevens geef je een gestructureerd advies:

Naam: ${naam}
Woningtype: ${woningtype}
Bouwjaar: ${bouwjaar}
Verwarmingssysteem: ${verwarmingssysteem}
EPC-score of label: ${epc}
Interesse in: ${interesse?.join(', ')}

Geef advies in drie duidelijke delen:
1. Normen en verplichtingen
2. Mogelijke subsidies (zoals Mijn VerbouwPremie, EPC-labelpremie)
3. Aanbevolen volgorde van werken en extra tips

Antwoord in het Nederlands, begrijpelijk voor een particulier.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
  });

  const advies = completion.choices[0].message?.content;
  return NextResponse.json({ advies });
}
