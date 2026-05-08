-- Postcraft newsletter subscribers
-- A coller dans Supabase > SQL Editor, puis a executer.

create extension if not exists pgcrypto;
create extension if not exists citext;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email citext not null unique,
  status text not null default 'subscribed'
    check (status in ('subscribed', 'unsubscribed')),
  source text not null default 'homepage',
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index if not exists newsletter_subscribers_status_idx
  on public.newsletter_subscribers (status);

create index if not exists newsletter_subscribers_created_at_idx
  on public.newsletter_subscribers (created_at desc);

create or replace function public.set_newsletter_subscribers_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists newsletter_subscribers_set_updated_at
  on public.newsletter_subscribers;

create trigger newsletter_subscribers_set_updated_at
before update on public.newsletter_subscribers
for each row
execute function public.set_newsletter_subscribers_updated_at();

alter table public.newsletter_subscribers enable row level security;

-- Aucune policy publique: les visiteurs ne peuvent ni lire ni lister les emails.
-- L'application insere via la route serveur /api/newsletter avec SUPABASE_SERVICE_ROLE_KEY.
-- Policies detaillees: voir supabase/newsletter_rls_policies.sql.
