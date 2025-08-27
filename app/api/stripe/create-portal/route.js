import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' });
    const customer = process.env.STRIPE_TEST_CUSTOMER_ID;
    if (!customer) throw new Error('Missing STRIPE_TEST_CUSTOMER_ID');
    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url: process.env.NEXT_PUBLIC_BASE_URL + '/settings',
    });
    return NextResponse.json({ url: session.url });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
