# HelpHub247 — v13 (almost real)

**Features**
- Next.js 14 App Router
- Centered header logo + left hamburger
- Bubble sidebar with icons (closes on click or backdrop)
- Chat with sticky bottom input + colorful upload icons + Web Speech TTS (UK voice)
- OpenAI API route `/api/chat` (set `OPENAI_API_KEY`)
- Stripe Checkout + Billing Portal routes (set Stripe env vars)
- PWA: manifest + service worker (installable on mobile)
- Pages: Home, Chat, About, Terms, Privacy, Subscribe, Settings, Reviews (paginated)
- Test page: `/test-openai`

## Run locally
```bash
npm install
export OPENAI_API_KEY=sk-...
export NEXT_PUBLIC_BASE_URL=http://localhost:3000
# Stripe (optional for local test with test keys)
export STRIPE_SECRET_KEY=sk_test_...
export STRIPE_PRICE_ID=price_...
export STRIPE_TEST_CUSTOMER_ID=cus_...
npm run dev
```

## Deploy (Vercel/Netlify)
Set environment variables:
- `OPENAI_API_KEY`
- `NEXT_PUBLIC_BASE_URL` (e.g. https://yourdomain.vercel.app)
- `STRIPE_SECRET_KEY` (optional until you go live)
- `STRIPE_PRICE_ID` (optional)
- `STRIPE_TEST_CUSTOMER_ID` (optional)

Then deploy.
