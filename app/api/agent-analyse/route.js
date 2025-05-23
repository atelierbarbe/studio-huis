// app/api/agent-analyse/route.js
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { assistantId, vraag } = await req.json();

  if (!assistantId || !vraag) {
    return NextResponse.json({ error: "Verplichte velden ontbreken." }, { status: 400 });
  }

  try {
    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: vraag
    });

    const run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    // wachten tot AI klaar is
    let status;
    while (true) {
      status = await openai.beta.threads.runs.retrieve(thread.id, run.id);
      if (status.status === "completed") break;
      if (status.status === "failed") throw new Error("AI run gefaald.");
      await new Promise((r) => setTimeout(r, 1500));
    }

    const result = await openai.beta.threads.messages.list(thread.id);

    const antwoord = result.data
      .map((msg) => msg.content?.[0]?.text?.value)
      .filter(Boolean)
      .join("\n\n");

    return NextResponse.json({
      antwoord: antwoord || "Geen inhoudelijk antwoord ontvangen van de AI.",
    });
  } catch (err) {
    console.error("Fout bij agent-analyse:", err);
    return NextResponse.json({ error: err.message || "Onbekende fout" }, { status: 500 });
  }
}
