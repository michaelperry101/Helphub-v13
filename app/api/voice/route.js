// app/api/voice/route.js
import { NextResponse } from "next/server";

export async function GET() {
  // List voices (useful for picking the best British voice)
  try {
    const r = await fetch("https://api.elevenlabs.io/v1/voices", {
      headers: { "xi-api-key": process.env.ELEVENLABS_API_KEY },
      // Avoid caching on the edge
      cache: "no-store",
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      return NextResponse.json(
        { ok: false, error: data?.detail || "Failed to fetch voices" },
        { status: r.status }
      );
    }
    // return a compact list
    const voices = (data?.voices || []).map(v => ({
      id: v.voice_id,
      name: v.name,
      labels: v.labels || {},
      category: v.category,
      preview_url: v.preview_url,
    }));
    return NextResponse.json({ ok: true, voices });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  // Text → Speech (mp3)
  try {
    const { text, voiceId = "Rachel", modelId = "eleven_turbo_v2" } =
      await req.json();

    if (!process.env.ELEVENLABS_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "Missing ELEVENLABS_API_KEY on server" },
        { status: 500 }
      );
    }
    if (!text || !text.trim()) {
      return NextResponse.json(
        { ok: false, error: "No text provided" },
        { status: 400 }
      );
    }

    const r = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(
        voiceId
      )}?optimize_streaming_latency=2`, // lower latency
      {
        method: "POST",
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text,
          model_id: modelId,
          // Tweak to sound more natural (adjust to taste)
          voice_settings: {
            stability: 0.3,
            similarity_boost: 0.9,
            style: 0.35,
            use_speaker_boost: true,
          },
        }),
        cache: "no-store",
      }
    );

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json(
        { ok: false, error: `ElevenLabs error: ${errText}` },
        { status: r.status }
      );
    }

    const arrayBuffer = await r.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);
    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}
