-- MMIRE Website — Supabase Schema
-- Run once in the Supabase SQL editor

-- ── Owner requests (homepage Find Your Mate) ──────────────────────────────────
create table if not exists mate_requests (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text,
  email      text not null,
  suburb     text not null,
  status     text not null default 'new', -- new | contacted | matched
  created_at timestamptz not null default now()
);
create index on mate_requests (status, created_at desc);
alter table mate_requests enable row level security;
create policy "anon_insert_mate_requests" on mate_requests
  for insert to anon with check (true);

-- ── Mates interest (agent registration) ──────────────────────────────────────
create table if not exists mates_interest (
  id         uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name  text not null,
  email      text not null,
  phone      text not null,
  area       text,
  status     text not null default 'new', -- new | reviewed | approved | declined
  created_at timestamptz not null default now()
);
create index on mates_interest (status, created_at desc);
create index on mates_interest (email);
alter table mates_interest enable row level security;
create policy "anon_insert_mates" on mates_interest
  for insert to anon with check (true);

-- ── Referrer interest (platform partner registration) ─────────────────────────
create table if not exists referrer_interest (
  id           uuid primary key default gen_random_uuid(),
  contact_name text not null,
  company      text not null,
  email        text not null,
  phone        text,
  status       text not null default 'new', -- new | contacted | active | declined
  created_at   timestamptz not null default now()
);
create index on referrer_interest (status, created_at desc);
create index on referrer_interest (email);
alter table referrer_interest enable row level security;
create policy "anon_insert_referrers" on referrer_interest
  for insert to anon with check (true);

-- ── Notes ─────────────────────────────────────────────────────────────────────
-- All tables: anon role can INSERT only (form submissions).
-- SELECT requires service role key — use only server-side, never in browser.
-- Manage records via Supabase dashboard → Table Editor.
-- Update 'status' field to track progress on each registration.
