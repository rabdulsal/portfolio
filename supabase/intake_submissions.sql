-- Advisory-hour intake submissions (rashadsalaam.com/intake)
--
-- Run this once in the SQL Editor of the NEW Supabase project created
-- for the portfolio site (not the Boss Man project):
--   Supabase dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- The /intake Netlify function reads and writes this table through the
-- Supabase REST API using the service role key, which bypasses row
-- level security. RLS is enabled with NO policies on purpose: the anon
-- and authenticated roles get no access at all, so the table is not
-- reachable from the browser or any public key.

create table if not exists public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  booking_ref text not null default '',
  q1_decision text,
  q2_links text,
  q3_outcome text,
  q4_budget text,
  q5_deciders text,
  status text not null default 'started',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz,
  constraint intake_submissions_email_booking_key unique (email, booking_ref)
);

alter table public.intake_submissions enable row level security;

-- No policies are created. Service role access only.
