# Icednd Full-Stack Task Plan

This plan is intentionally limited to a user-facing portfolio demonstration.

## Phase 0 - Project preparation

- [ ] Fix malformed character encoding in catalog content.
- [ ] Confirm the final booking flow and required checkout fields.
- [ ] Create a Supabase project.
- [ ] Add local environment variables without committing secrets.
- [ ] Document the Supabase project setup in the README.

## Phase 1 - Backend foundation

- [x] Install the Supabase client packages.
- [x] Create server-side and browser-side Supabase helpers.
- [x] Create the initial database migration.
- [ ] Add the `bookings` table with a price snapshot and booking status.
- [ ] Add Row Level Security policies.
- [ ] Add a small seed or setup script for local verification.

## Phase 2 - Real booking submission

- [x] Define the booking input and database types.
- [x] Add server-side validation for customer details, dates, guests, and selected products.
- [x] Recalculate the booking total on the server.
- [x] Replace local-only confirmation with a server action or Route Handler.
- [x] Generate a unique booking reference on the server.
- [x] Handle duplicate submissions and failed requests safely.
- [ ] Show the persisted booking on the confirmation page.

## Phase 3 - Optional account experience (deferred)

- [ ] Add Supabase email authentication only if the portfolio scope expands.
- [ ] Associate authenticated bookings with the current user.
- [ ] Add a sign-in/sign-out experience.
- [ ] Add a “My bookings” page.
- [ ] Enforce user ownership in the database and server queries.

## Phase 4 - Portfolio polish

- [ ] Add clear simulated-payment messaging at checkout.
- [ ] Add loading, validation, error, and empty states.
- [ ] Add booking flow tests.
- [ ] Add basic accessibility checks.
- [ ] Add production environment variables in Vercel.
- [ ] Deploy and verify the complete browse-to-confirmation flow.
- [ ] Update the README with architecture, setup, and demo limitations.

## Deferred work

The following should remain out of scope unless the project direction changes:

- Stripe or other real payment providers.
- Admin tooling.
- Supplier APIs and live inventory.
- Email delivery.
- Reviews and ratings stored in the database.
- Dynamic catalog editing.
- Advanced cancellation and refund workflows.
