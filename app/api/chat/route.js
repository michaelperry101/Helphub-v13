// app/api/chat/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";          // safer with the official SDK on Vercel/Netlify
export const dynamic = "force-dynamic";   // don't cache
export const maxDuration = 30;            // seconds (Vercel/Netlify limit friendly)

// Optional: change default model via env
const DEFAULT_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const CARYS_SYSTEM = `You are Carys — the HelpHub247 assistant (UK-based).
Tone: warm, concise, professional, British English (UK spelling).
Priorities: (1) understand the user's intent, (2) summarize options,
(3) guide to the next step, (4) keep replies short unless asked for detail.
Avoid medical/financial/legal advice; if asked, provide general info + a brief
safety disclaimer and suggest speaking to a professional. Ask concise clarifying
questions when needed. Do not invent prices, policies, or legal claims.`;

function normalizeClientMessages(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(m => m && typeof m === "object" && m.role && m.content)
    .map(m => ({
      role: m.role === "assistant" || m.role === "system" ? m.role : "user",
      content: String(m.content ?? "").slice(0, 4000), // clamp length per message
    }))
    .slice(-20); // keep last 20 to control token use
}

// POST /api/chat
export async function POST(req) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY on the server." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const history = normalizeClientMessages(body.messages);

    // Always prepend Carys system prompt
    const messages = [{ role: "system", content: CARYS_SYSTEM }, ...history];

    // Require at least one user message
    const hasUser = messages.some(m => m.role === "user");
    if (!hasUser) {
      return NextResponse.json(
        { error: "No user message found. Please send a prompt." },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });
    const model = String(body.model || DEFAULT_MODEL);

    const completion = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "Sorry — I couldn’t generate a response.";

    return NextResponse.json({ reply, model });
  } catch (err) {
    console.error("Carys API error:", err);
    const msg =
      err?.response?.data?.error?.message ||
      err?.message ||
      "Unexpected server error";
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}

// GET /api/chat  -> simple health check
export async function GET() {
  return NextResponse.json({
    ok: true,
    hasKey: Boolean(process.env.OPENAI_API_KEY),
    model: DEFAULT_MODEL,
  });
}
