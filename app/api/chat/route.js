// app/api/chat/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY missing on server." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const lastText =
      messages
        .filter((m) => m?.role && m?.content)
        .map((m) => ({ role: m.role, content: String(m.content) })) ?? [];

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are Carys, a warm, concise and helpful UK helpline assistant. Be friendly, practical, and use short paragraphs.",
          },
          ...lastText,
        ],
        temperature: 0.7,
      }),
    });

    const data = await r.json();
    if (!r.ok) {
      const msg =
        data?.error?.message ||
        data?.message ||
        `OpenAI ${r.status}: ${r.statusText}`;
      return NextResponse.json({ error: msg }, { status: r.status });
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "I couldn’t generate a response.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Carys API error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
