create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  reference text not null unique,
  customer_name text not null,
  customer_email text not null,
  hotel_id text,
  room_id text,
  package_id text,
  activity_ids text[] not null default '{}',
  check_in date not null,
  check_out date not null,
  guests integer not null check (guests > 0),
  total_price integer not null check (total_price >= 0),
  currency text not null default 'NOK',
  status text not null default 'confirmed' check (status in ('confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  constraint bookings_valid_dates check (check_out > check_in)
);

create index if not exists bookings_user_id_idx on public.bookings(user_id);
create index if not exists bookings_email_idx on public.bookings(customer_email);

alter table public.bookings enable row level security;

create policy "Users can view their own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create their own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);
