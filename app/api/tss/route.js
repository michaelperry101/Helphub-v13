// app/api/tts/route.js
import { NextResponse } from "next/server";

const OPENAI_TTS_URL = "https://api.openai.com/v1/audio/speech";

// Optional: pick your default OpenAI voice here
const DEFAULT_VOICE = "alloy"; // try: "alloy", "verse", "copper"
const DEFAULT_MODEL = "gpt-4o-mini-tts"; // OpenAI TTS model

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    const { text, voice = DEFAULT_VOICE, format = "mp3" } = await req.json();
    if (!text || !text.trim()) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const r = await fetch(OPENAI_TTS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        voice,
        input: text,
        format, // "mp3" | "wav" | "opus" (mp3 is smallest + universal)
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json({ error: errText || "TTS request failed" }, { status: 500 });
    }

    const arrayBuf = await r.arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuf), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e?.message || "TTS error" }, { status: 500 });
  }
}
