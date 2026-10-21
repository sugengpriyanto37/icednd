# IceDnD

IceDnD is a polished travel-booking portfolio project for curated winter stays and polar-night journeys across the Norwegian Arctic.

The project demonstrates a complete guest booking flow: browse the catalog, choose a hotel or package, configure dates and guests, submit checkout details, persist the booking in Supabase, and receive a confirmation reference.

## Live experience

The application is intentionally designed as a focused customer experience rather than a full hotel-management platform.

### Included

- Hotel discovery with region, price, and feature filters
- Hotel detail pages with room selection and activities
- Curated package journeys with included experiences
- Currency switching for displayed prices
- Guest checkout with responsive form interactions
- Server-side validation and total recalculation
- Supabase booking persistence
- Confirmation page with a unique booking reference
- Loading, error, empty, and invalid-selection states

### Deliberately out of scope

- Admin dashboard
- Supplier or inventory integrations
- User accounts and booking history
- Real payment processing
- Email delivery
- Dynamic catalog editing

Checkout payment is simulated for demonstration. No card is charged.

## Tech stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Supabase PostgreSQL
- Next.js Server Actions
- Framer Motion
- Lucide React
- Vercel-ready deployment

## Getting started

### Requirements

- Node.js 20 or newer
- A Supabase project

### Install

```bash
npm install
```

### Configure Supabase

Copy the environment template:

```bash
copy .env.example .env.local
```

Fill in these values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SECRET_KEY=your-server-only-secret-key
```

Run [`supabase/migrations/0001_create_bookings.sql`](supabase/migrations/0001_create_bookings.sql) in the Supabase SQL Editor before testing checkout.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm test          # Run booking-rule tests
npm run build     # Create a production build
npm start         # Start the production server
```

## Architecture

The catalog is local and intentionally lightweight:

```text
data/catalog.js
        |
        v
Next.js client components
        |
        v
Guest checkout form
        |
        v
app/actions/booking.js
        |
        +-- validates customer and booking input
        +-- recalculates the total from catalog data
        +-- creates a unique booking reference
        v
Supabase bookings table
```

The browser never determines the final booking total. The server action resolves the selected catalog records, validates the dates and guest count, recalculates the price, and then writes the booking using the server-only Supabase key.

## Project structure

```text
app/                    Next.js routes and server actions
components/             User-facing UI components
data/catalog.js         Hotels, rooms, activities, and packages
lib/                    Booking rules, contexts, and Supabase clients
supabase/migrations/    Database schema and row-level security
tests/                  Booking-rule tests
docs/                   Scope rules and implementation plan
```

## Portfolio notes

This project favors a small, understandable architecture over production-scale infrastructure. Guest checkout keeps the demo frictionless, while the database schema retains a nullable `user_id` so authentication can be added later without redesigning bookings.

The content is fictional and the payment flow is simulated. The project is intended to demonstrate product thinking, responsive UI implementation, server-side validation, and a real persisted user journey.
