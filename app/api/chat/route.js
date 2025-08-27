// app/api/chat/route.js
import { NextResponse } from "next/server";

export const runtime = "edge"; // faster & no cold Node deps

export async function GET() {
  // simple health check so you can hit /api/chat in the browser
  return NextResponse.json({ ok: true });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY on the server." },
        { status: 500 }
      );
    }

    // Call OpenAI Chat Completions (no extra libs needed)
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // reliable, fast, cost-effective
        messages: messages.length
          ? messages
          : [{ role: "user", content: "Say hello as Carys." }],
        temperature: 0.7,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json(
        { error: `OpenAI error: ${resp.status} ${text}` },
        { status: 500 }
      );
    }

    const data = await resp.json();
    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn't generate a response.";
    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json(
      { error: `Server error: ${err?.message || String(err)}` },
      { status: 500 }
    );
  }
}
