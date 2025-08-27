// app/api/chat/route.js
import { NextResponse } from "next/server";

// Use Node runtime (works on Vercel & Netlify)
export const dynamic = "force-dynamic";

// Set your default model (can override via env OPENAI_MODEL)
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export async function GET() {
  // health check: open /api/chat in the browser
  return NextResponse.json({
    ok: true,
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    model: MODEL,
  });
}

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY is missing on the server." },
        { status: 500 }
      );
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

    const raw = await apiRes.text(); // always read raw so we can surface errors
    if (!apiRes.ok) {
      return NextResponse.json(
        { error: `OpenAI ${apiRes.status}: ${raw}` },
        { status: 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from OpenAI.", body: raw.slice(0, 400) },
        { status: 502 }
      );
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "No content in OpenAI response.", body: data },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: `Server error: ${err?.message || String(err)}` },
      { status: 500 }
    );
  }
}
