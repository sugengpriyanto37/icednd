# Icednd Full-Stack Project Rules

## Purpose

Icednd is a portfolio project demonstrating a polished user-facing travel booking experience. The full-stack work should make the customer journey real without turning the project into a complete hotel-management platform.

## Product scope

The application supports these user-facing capabilities:

- Browse hotels, activities, and travel packages.
- View detail pages.
- Build a booking with dates, guests, and selected products.
- Submit customer details through checkout.
- Persist a booking in the backend.
- Show a booking confirmation with a unique reference.
- Complete checkout as a guest.

## Explicit non-goals

The project will not include:

- An in-app admin dashboard.
- Hotel or supplier management.
- Real-time inventory synchronization with external providers.
- Real payment processing for the portfolio demo.
- Complex pricing, coupons, refunds, or commissions.
- Multi-tenant or staff permissions.

## Technical rules

- Keep Next.js as the only application framework.
- Use Supabase for PostgreSQL and optional user authentication.
- Use Next.js Server Actions or Route Handlers for backend mutations.
- Keep catalog content in the existing local data files initially.
- Persist only user-generated booking data in Supabase.
- Validate checkout input on the server.
- Recalculate booking totals on the server; never trust totals from the browser.
- Use Row Level Security for user-owned booking records.
- Keep secrets in environment variables and out of source control.
- Prefer the smallest implementation that demonstrates a real end-to-end flow.
- Preserve the existing visual design unless a change is required for usability or correctness.

## Booking rules

- Every confirmed booking receives a unique human-readable reference.
- A booking stores a price snapshot so later catalog changes do not alter its history.
- The demo checkout represents a successful payment but must be clearly treated as simulated.
- A failed or invalid submission must not create a booking.
- Users may only view bookings associated with their own authenticated account.
- Guest checkout is the only account mode for the current portfolio scope.
- Guest bookings are confirmed on-screen and are not exposed through a booking-history page.

## Quality rules

- Keep TypeScript and JavaScript conventions consistent with the existing project until migration is intentional.
- Add tests for pricing, booking creation, validation, and reference generation.
- Verify loading, empty, error, and success states for every new user-facing flow.
- Do not add infrastructure or dependencies without a clear portfolio benefit.
- Update the task document when scope or implementation decisions change.
