import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  try {
    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

    const completion = await openai.chat.completions.create({
      model,
      temperature: 0.7,
      messages: messages.length ? messages : [
        { role:'system', content:'You are Carys, a friendly British assistant for HelpHub247. Keep replies concise and helpful.' },
        { role:'user', content:'Say hello.' }
      ]
    });

    const reply = (completion.choices?.[0]?.message?.content || '').trim() || "I couldn't generate a response.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Carys API error:', err);
    const msg = err?.response?.data?.error?.message || err?.message || 'Server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(){
  return NextResponse.json({ ok: true });
}
