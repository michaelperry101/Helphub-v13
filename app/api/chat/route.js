// app/api/chat/route.js
import { NextResponse } from "next/server";

// Use Node/serverless by default (works on Vercel & Netlify)
export const dynamic = "force-dynamic";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export async function GET() {
  // quick health check + confirm server has the key
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
      messages: messages.length ? messages : [{ role: "user", content: "Say hello as Carys." }],
      temperature: 0.7,
    };

    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await resp.text(); // read raw for better error surfacing
    if (!resp.ok) {
      // surface OpenAI error body to client so you know exactly what's wrong
      return NextResponse.json(
        { error: `OpenAI ${resp.status}: ${text}` },
        { status: 502 }
      );
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON from OpenAI.", body: text.slice(0, 500) },
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
