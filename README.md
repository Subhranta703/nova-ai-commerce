# NOVA — AI-Powered Commerce Platform

> A modern, full-stack e-commerce platform built with **Next.js, TypeScript, PostgreSQL, Prisma, Supabase, AI, Stripe, and real-time support architecture**.

NOVA is an e-commerce platform designed to demonstrate modern full-stack product engineering rather than a simple CRUD shopping cart.

The platform combines a premium shopping experience with AI-assisted product discovery, recommendations, customer accounts, analytics, payment architecture, and real-time customer-support capabilities.

---

## ✨ Features

### 🛍️ Modern E-Commerce

- Premium responsive storefront
- Product discovery and search
- Category filtering
- Product sorting
- Product details and variants
- Wishlist
- Persistent shopping cart
- Quantity management
- Checkout experience
- Order confirmation
- Responsive mobile experience
- Light / dark mode

### 🤖 NOVA AI

NOVA includes an AI assistant architecture designed for commerce use cases.

- AI shopping assistant
- Natural-language product discovery
- Product recommendations
- Product comparison
- Budget-based recommendations
- Product question answering
- AI-ready review summarization
- AI-ready business insights
- Server-side AI API abstraction

The AI layer is designed so that the model can work with deterministic application data instead of inventing inventory, pricing, orders, or analytics.

### 💳 Payments

Stripe integration architecture includes:

- Secure server-side payment handling
- Stripe Checkout integration point
- Payment status handling
- Webhook endpoint
- Order creation after verified payment
- Refund-ready architecture

Secret credentials are never intended to be exposed to the client.

### 💬 Customer Support

The application includes a support domain designed for realtime communication:

- Customer conversations
- Chat messages
- Support roles
- Conversation history
- AI-to-human support handoff architecture
- Socket.IO / Supabase Realtime integration point

### 📊 Admin Dashboard

The admin workspace provides a portfolio-ready analytics experience with:

- Revenue overview
- Order metrics
- Customer metrics
- Product metrics
- Sales analytics
- Top products
- Inventory insights
- Recent orders
- Business KPI cards

### 👤 Customer Workspace

Customers can access:

- Profile
- Orders
- Order history
- Wishlist
- Saved addresses
- Payment history
- AI recommendations
- Support conversations
- Account settings

---

# 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| UI Icons | Lucide React |
| Animation | Framer Motion |
| State Management | Zustand |
| Forms | React Hook Form |
| Validation | Zod |
| Database | PostgreSQL |
| Database Platform | Supabase |
| ORM | Prisma |
| Charts | Recharts |
| Payments | Stripe |
| AI | OpenAI API |
| Realtime | Supabase Realtime / Socket.IO |
| Image Storage | Cloudinary |
| Authentication | Auth.js |
| Deployment | Vercel |

---

# 🏗️ Architecture

```text
                         NOVA
                          │
              ┌───────────┴───────────┐
              │                       │
          Next.js UI             Admin Workspace
              │                       │
              └───────────┬───────────┘
                          │
                    Server Boundary
                          │
             ┌────────────┼────────────┐
             │            │            │
          Products       AI         Payments
             │            │            │
             │       OpenAI API       Stripe
             │
       Recommendations
             │
       Orders / Cart
             │
        Customer Data
             │
             ▼
          Prisma
             │
             ▼
       PostgreSQL
             │
             ▼
          Supabase
```

### Supporting services

```text
NOVA
 │
 ├── Authentication → Auth.js
 │
 ├── AI → OpenAI
 │
 ├── Payments → Stripe
 │
 ├── Database → PostgreSQL / Supabase
 │
 ├── Realtime → Supabase Realtime / Socket.IO
 │
 └── Images → Cloudinary
```

---

# 🚀 Run Locally

## 1. Requirements

Install:

- Node.js 20+
- npm
- Git

For the complete persistence layer:

- Supabase PostgreSQL project

The storefront can run in demo mode without external API credentials.

---

## 2. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/nova-ai-commerce.git

cd nova-ai-commerce
```

---

## 3. Install dependencies

```bash
npm install
```

---

## 4. Configure environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="your_supabase_database_url"

NEXT_PUBLIC_APP_URL="http://localhost:3000"

OPENAI_API_KEY=""

STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

> **Never commit `.env` to GitHub.**

Use `.env.example` as the public template.

---

# 🗄️ Supabase + Prisma

NOVA uses PostgreSQL hosted through Supabase and Prisma as the ORM.

After configuring `DATABASE_URL`:

### Generate Prisma Client

```bash
npx prisma generate
```

### Validate the schema

```bash
npx prisma validate
```

### Push the schema to Supabase

```bash
npx prisma db push
```

### Seed the database

```bash
npm run db:seed
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

# ▶️ Start Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧭 Main Routes

| Route | Description |
|---|---|
| `/` | NOVA storefront |
| `/shop` | Product catalog |
| `/product/[id]` | Product details |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/account` | Customer dashboard |
| `/admin` | Admin dashboard |
| `/api/ai` | AI service endpoint |
| `/api/stripe/webhook` | Stripe webhook endpoint |

---

# 🔐 Environment Variables

### Required for database functionality

```env
DATABASE_URL=
```

### Optional integrations

```env
OPENAI_API_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Cloudinary

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# 🤖 AI Architecture

The AI layer is intentionally separated from the presentation layer.

```text
Customer
   │
   ▼
NOVA AI Assistant
   │
   ▼
/api/ai
   │
   ▼
AI Service Layer
   │
   ├── Product Search
   ├── Recommendations
   ├── Product Comparison
   ├── Review Analysis
   ├── Order Lookup
   └── Business Analytics
```

The production implementation should use structured tool/function calling so the model retrieves factual information from the application rather than generating business-critical data itself.

For example:

```text
User:
"Show me black running shoes under ₹10,000."

        ↓

NOVA AI

        ↓

Product Search Tool

        ↓

PostgreSQL / Prisma

        ↓

Matching Products

        ↓

AI formats the response
```

---

# 💳 Stripe Architecture

The recommended payment flow is:

```text
Customer
   │
   ▼
Checkout
   │
   ▼
Server creates Stripe Checkout Session
   │
   ▼
Stripe
   │
   ▼
Customer completes payment
   │
   ▼
Stripe Webhook
   │
   ▼
Verify webhook signature
   │
   ▼
Update Payment
   │
   ▼
Create / Update Order
   │
   ▼
Update inventory
```

The client-side success page is **not** treated as proof of payment.

The verified Stripe webhook is the source of truth.

---

# 💬 Realtime Support Architecture

NOVA's support domain is designed around durable database storage and a separate realtime transport layer.

```text
Customer
   │
   ▼
Chat Interface
   │
   ├───────────────┐
   │               │
   ▼               ▼
Supabase        PostgreSQL
Realtime          Prisma
   │               │
   │               ▼
   │          ChatMessage
   │
   ▼
Support Agent
```

This separation allows realtime events such as:

- New messages
- Typing indicators
- Online presence
- Support handoff

while PostgreSQL remains the durable source of conversation history.

---

# 🗃️ Database

The Prisma data model includes entities for:

```text
User
Category
Product
ProductVariant
Cart
CartItem
Wishlist
WishlistItem
Order
OrderItem
Payment
Address
Review
Coupon
Conversation
ChatMessage
ProductView
Recommendation
Notification
```

The schema includes:

- Relationships
- Foreign keys
- Unique constraints
- Indexes
- Cascading relationships
- Created/updated timestamps

---

# 🎨 UI / UX

NOVA follows a modern product-design approach rather than a basic dashboard template.

### Design principles

- Minimal visual hierarchy
- Consistent spacing
- Responsive layouts
- Mobile-first design
- Clear typography
- Accessible interactions
- Dark/light mode
- Smooth transitions
- Micro-interactions
- Loading states
- Empty states
- Error states
- Hover interactions
- Reduced animation complexity where appropriate

Animations are primarily used to communicate state and interaction rather than purely for decoration.

---

# 📈 Performance Considerations

The architecture is designed with common production concerns in mind:

- Next.js App Router
- Server-side rendering where appropriate
- Database indexing
- Lazy loading
- Image optimization
- Pagination-ready architecture
- Optimistic UI patterns
- Server-side API boundaries
- Environment-based secrets
- Validation with Zod

---

# 🔒 Security

Security considerations include:

- Server-side validation
- Zod schemas
- Role-based access control
- Protected server endpoints
- Environment variables
- Server-side API credentials
- Stripe webhook verification
- Database constraints
- AI endpoint protection
- No client-side exposure of secret API keys

---

# 📦 Demo Data

The project includes a reusable product catalog with realistic local product records covering fashion, lifestyle and technology categories.

The demo dataset allows the storefront to be explored without immediately configuring external services.

---

# 🛣️ Development Roadmap

### Phase 1 — Core Platform

- [x] Responsive storefront
- [x] Product discovery
- [x] Cart
- [x] Wishlist
- [x] Checkout demo
- [x] Admin dashboard
- [x] Customer workspace

### Phase 2 — Backend

- [ ] Supabase PostgreSQL
- [ ] Prisma persistence
- [ ] Authentication
- [ ] RBAC
- [ ] Product CRUD
- [ ] Order management

### Phase 3 — AI

- [ ] OpenAI integration
- [ ] Natural-language product search
- [ ] AI recommendations
- [ ] Review summarization
- [ ] AI business assistant
- [ ] Tool/function calling

### Phase 4 — Commerce

- [ ] Stripe Checkout
- [ ] Payment webhooks
- [ ] Refund workflow
- [ ] Inventory management
- [ ] Coupon system

### Phase 5 — Support

- [ ] Supabase Realtime
- [ ] Agent dashboard
- [ ] Presence
- [ ] Typing indicators
- [ ] AI-to-human handoff

### Phase 6 — Production

- [ ] Automated tests
- [ ] Rate limiting
- [ ] Error monitoring
- [ ] Analytics
- [ ] Performance optimization
- [ ] Vercel deployment

---

# 📌 Resume Highlights

### Full-Stack Development

> Built a production-style AI-powered e-commerce platform using Next.js, TypeScript, PostgreSQL, Prisma and Supabase with product discovery, cart, checkout, customer accounts and administrative analytics.

### AI Engineering

> Designed an AI commerce architecture supporting natural-language product discovery, recommendations and business insights using server-side AI workflows backed by application data.

### Backend & Database

> Designed a relational PostgreSQL data model with Prisma covering products, variants, carts, orders, payments, reviews, recommendations, conversations and notifications.

### Payments

> Designed a secure Stripe payment architecture using server-side Checkout Sessions and verified webhooks as the payment source of truth.

### Realtime Systems

> Designed a realtime customer-support architecture combining persistent PostgreSQL chat storage with Supabase Realtime / WebSocket-based event delivery.

---

# 🎯 Interview Talking Points

### 1. Why use Stripe webhooks?

The client-side success page cannot be trusted as proof of payment.

Stripe's verified webhook event should update the application's payment and order state.

### 2. Why should AI use database tools?

LLMs are probabilistic.

Inventory, prices, orders and revenue are deterministic business data and should come from the application's database.

### 3. Why Prisma?

Prisma provides:

- Type-safe database access
- Schema management
- Relationships
- Migrations
- Developer-friendly queries

### 4. Why Supabase?

Supabase provides managed PostgreSQL infrastructure and can additionally provide services such as authentication, storage and realtime capabilities.

### 5. How would you scale realtime chat?

Separate:

```text
Realtime transport
```

from:

```text
Durable message storage
```

Realtime infrastructure handles delivery, presence and typing events while PostgreSQL remains the persistent source of truth.

### 6. How do you protect admin APIs?

Don't rely on hiding admin buttons.

Authorization should be enforced at the server boundary using:

```text
Authentication
      +
Role Authorization
      +
Server-side validation
```

---

# 🚀 Deployment

The recommended deployment architecture is:

```text
                    GitHub
                       │
                       ▼
                    Vercel
                       │
          ┌────────────┼────────────┐
          │            │            │
       Next.js       API        Server Logic
          │
          ├──────────────► Supabase
          │                   │
          │                PostgreSQL
          │
          ├──────────────► OpenAI
          │
          ├──────────────► Stripe
          │
          └──────────────► Cloudinary
```

Environment variables should be configured through the deployment platform rather than committed to the repository.

---

# 📄 License

Portfolio project created for educational and professional demonstration purposes.

NOVA is a fictional brand and the included product data is intended for demonstration.

Replace the fictional branding and demo data before using the platform commercially.