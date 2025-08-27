// app/api/chat/route.js
import { NextResponse } from "next/server";

// Works on Vercel/Netlify (Node/serverless)
export const dynamic = "force-dynamic";
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// Health check
export async function GET() {
  return NextResponse.json({
    ok: true,
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    model: MODEL,
  });
}

export async function POST(req) {
  const fallbackReply = (msg) =>
    NextResponse.json({ reply: `🤖 Carys (debug): ${msg}` }); // <-- always returns 200 with a reply

  try {
    if (!process.env.OPENAI_API_KEY) {
      return fallbackReply("OPENAI_API_KEY missing on server.");
    }

    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const payload = {
      model: MODEL,
      messages: messages.length
        ? messages
        : [{ role: "user", content: "Say hello as Carys." }],
      temperature: 0.7,
    };

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const raw = await apiRes.text();

    if (!apiRes.ok) {
      // Return a readable reply instead of 500 so UI always shows something
      return fallbackReply(`OpenAI ${apiRes.status}: ${raw.slice(0, 400)}`);
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return fallbackReply(`Invalid JSON from OpenAI: ${raw.slice(0, 400)}`);
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return fallbackReply("No content in OpenAI response.");
    }

    return NextResponse.json({ reply });
  } catch (err) {
    return fallbackReply(`Server error: ${err?.message || String(err)}`);
  }
}
