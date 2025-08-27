import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const price = process.env.STRIPE_PRICE_ID;
    if (!price) throw new Error('Missing STRIPE_PRICE_ID');
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: process.env.NEXT_PUBLIC_BASE_URL + '/success',
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + '/cancel',
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
