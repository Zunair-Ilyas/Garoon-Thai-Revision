-- Supabase schema for Garoon Thai dashboard
-- Run this in the Supabase SQL Editor for your project.

-- Enable UUID generation
create extension if not exists "pgcrypto" with schema public;

-- Helper to auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Subscriptions: newsletter signups
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- Messages: contact form submissions
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Contact settings: single row editable in dashboard
create table if not exists public.contact_settings (
  id integer primary key,
  phone text,
  email text,
  address text,
  updated_at timestamptz not null default now()
);

create trigger contact_settings_set_updated
before update on public.contact_settings
for each row execute procedure public.set_updated_at();

-- Restaurants: editable list in dashboard
create table if not exists public.restaurants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger restaurants_set_updated
before update on public.restaurants
for each row execute procedure public.set_updated_at();

-- Row Level Security
alter table public.subscriptions enable row level security;
alter table public.messages enable row level security;
alter table public.contact_settings enable row level security;
alter table public.restaurants enable row level security;

-- Policies
-- Subscriptions: Anyone can insert (public newsletter), only authenticated can read/update/delete
create policy "subscriptions_insert_public" on public.subscriptions
  for insert to anon, authenticated
  with check (true);

create policy "subscriptions_read_auth" on public.subscriptions
  for select to authenticated
  using (true);

create policy "subscriptions_modify_auth" on public.subscriptions
  for update to authenticated
  using (true)
  with check (true);

create policy "subscriptions_delete_auth" on public.subscriptions
  for delete to authenticated
  using (true);

-- Messages: Anyone can insert, only authenticated can read
create policy "messages_insert_public" on public.messages
  for insert to anon, authenticated
  with check (true);

create policy "messages_read_auth" on public.messages
  for select to authenticated
  using (true);

-- Allow admins (authenticated) to delete messages from the dashboard
create policy "messages_delete_auth" on public.messages
  for delete to authenticated
  using (true);

-- Contact settings: Only authenticated can read or modify
create policy "contact_read_auth" on public.contact_settings
  for select to authenticated
  using (true);

-- Split modify policy into separate operations to avoid syntax error at commas
create policy "contact_insert_auth" on public.contact_settings
  for insert to authenticated
  with check (true);

create policy "contact_update_auth" on public.contact_settings
  for update to authenticated
  using (true)
  with check (true);

create policy "contact_delete_auth" on public.contact_settings
  for delete to authenticated
  using (true);

-- Restaurants: Only authenticated can read/modify
create policy "restaurants_read_auth" on public.restaurants
  for select to authenticated
  using (true);

-- Split modify policy into separate operations to avoid syntax error at commas
create policy "restaurants_insert_auth" on public.restaurants
  for insert to authenticated
  with check (true);

create policy "restaurants_update_auth" on public.restaurants
  for update to authenticated
  using (true)
  with check (true);

create policy "restaurants_delete_auth" on public.restaurants
  for delete to authenticated
  using (true);

-- Optional seeds
insert into public.contact_settings (id, phone, email, address)
values (1, null, null, null)
on conflict (id) do nothing;

-- Example restaurants (optional)
-- insert into public.restaurants (name, address, description) values
--   ('Easy Go Thai', 'Mount Maunganui', 'Authentic Thai street food.'),
--   ('Asian Fusion', 'Bethlehem', 'Modern fusion cuisine.');
