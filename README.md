# NOVA — AI-Powered Commerce Platform

NOVA is a resume-grade full-stack e-commerce portfolio project designed to demonstrate modern product engineering: Next.js, TypeScript, responsive UX, AI integration, payments architecture, real-time support architecture, PostgreSQL/Prisma data modeling, RBAC, analytics, and performance-minded UI.

> **Important:** The repository is intentionally runnable without external credentials. The storefront, cart, checkout demo, dashboard and NOVA AI fallback work locally. Stripe/OpenAI/Auth/Cloudinary are represented by secure server-side integration points so you can add credentials when deploying.

## Highlights

- Premium responsive storefront with light/dark mode
- Motion and micro-interactions with Framer Motion
- Product search, category filtering and sorting
- Product details, variants, wishlist and cart persistence
- Checkout flow with demo confirmation
- NOVA AI assistant UI + `/api/ai` abstraction
- Admin revenue/product/customer analytics dashboard
- PostgreSQL + Prisma production data model
- Stripe webhook endpoint scaffold
- Customer account workspace
- Mobile-first accessible navigation and empty/loading/error-friendly patterns
- 48 realistic local product records generated from a reusable catalog model

## Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + Lucide React
- Framer Motion
- Zustand
- Prisma + PostgreSQL
- Zod + React Hook Form
- Recharts
- Auth.js / Stripe / OpenAI / Cloudinary integration-ready environment variables

## Run locally

### 1. Requirements

Node.js 20+ and npm. PostgreSQL is only required when you want to activate the Prisma persistence layer; the storefront demo itself does not require a database.

### 2. Install

```bash
npm install
```

### 3. Environment

```bash
copy .env.example .env.local
```

On macOS/Linux:

```bash
cp .env.example .env.local
```

The demo works with the empty optional API keys.

### 4. Start

```bash
npm run dev
```

Open http://localhost:3000

### 5. Optional PostgreSQL + Prisma

Set `DATABASE_URL` in `.env.local`, then:

```bash
npm run prisma:generate
npm run db:push
npm run db:seed
```

## Main routes

- `/` — landing / storefront home
- `/shop` — catalog, search, category filters and sorting
- `/product/1` — product details example
- `/cart` — persistent cart
- `/checkout` — checkout demo
- `/account` — customer workspace
- `/admin` — analytics dashboard
- `/api/ai` — AI abstraction endpoint
- `/api/stripe/webhook` — Stripe webhook scaffold

## Production integrations

### OpenAI
Set `OPENAI_API_KEY` and replace the demo branch in `app/api/ai/route.ts` with your chosen OpenAI SDK workflow. Keep the key server-side only. Add structured tool/function calling for product search, order lookup and analytics rather than allowing the model to invent database facts.

### Stripe
Set the Stripe secret/publishable/webhook values. The recommended production flow is: create Checkout Session on the server → redirect customer → verify `checkout.session.completed` webhook → create/update Payment + Order records transactionally.

### Authentication
Add Auth.js credentials/OAuth providers and enforce RBAC in server-side route handlers. Roles in the Prisma schema are `CUSTOMER`, `ADMIN`, and `SUPPORT`.

### Real-time support
The Prisma schema contains Conversation + ChatMessage. Connect Socket.IO or Supabase Realtime to publish messages, typing state, presence and AI-to-human handoff events.

### Cloudinary
Use signed server-generated upload parameters for admin product image uploads. Never expose the Cloudinary API secret to the browser.

## Architecture

```text
Next.js App Router
  ├── Presentation: responsive pages + reusable UI
  ├── State: Zustand cart/wishlist
  ├── Server boundary: Route Handlers / Server Actions
  ├── Domain: products, orders, payments, recommendations, support
  ├── AI adapter: NOVA AI → product search / recommendations / summaries
  ├── Payment adapter: Stripe Checkout + verified webhooks
  ├── Realtime adapter: Socket.IO/Supabase Realtime
  └── Data: PostgreSQL ← Prisma
```

## Resume bullets

- Built a production-style AI-powered commerce platform with Next.js, TypeScript, PostgreSQL and Prisma, implementing product discovery, cart, checkout, customer accounts and admin analytics.
- Designed an AI shopping assistant architecture with natural-language product discovery, recommendation and business-insight workflows backed by application data.
- Integrated secure payment and webhook architecture with Stripe, role-based access patterns, validation and server-side credential handling.
- Designed a real-time support domain with conversations, chat messages, support roles and AI-to-human escalation.

## Interview talking points

1. Why server-side payment verification matters: the client success screen is not proof of payment; verified webhooks are the source of truth.
2. Why AI should call tools/database queries: LLM output is probabilistic, business metrics and inventory must come from deterministic application data.
3. Why Prisma indexes exist: product category/price and user activity queries are common access paths.
4. How to scale chat: separate realtime transport from durable message storage and use presence/events independently.
5. How to protect admin APIs: authentication + role authorization at the server boundary, not merely hiding UI buttons.

## License

Portfolio project. Replace the fictional NOVA branding/data before commercial use.
