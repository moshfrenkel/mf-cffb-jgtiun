-- MoshFit · Supabase schema (MVP, personal use)
-- Run this once in the Supabase SQL editor.
-- A single key/value table mirrors the app's local state to the cloud (backup + multi-device).

create table if not exists public.app_state (
  device   text        not null,
  key      text        not null,
  value    jsonb,
  updated  timestamptz not null default now(),
  primary key (device, key)
);

-- MVP access: anon key may read/write its own device rows.
-- (Personal single-user app. Tighten later with real auth before opening to subscribers.)
alter table public.app_state enable row level security;

drop policy if exists "anon all" on public.app_state;
create policy "anon all" on public.app_state
  for all
  to anon
  using (true)
  with check (true);
