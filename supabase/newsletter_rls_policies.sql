-- RLS policies pour public.newsletter_subscribers
-- Compatible avec:
-- - SUPABASE_SERVICE_ROLE_KEY: bypass RLS cote serveur
-- - SUPABASE_ANON_KEY: INSERT autorise, lecture bloquee

alter table public.newsletter_subscribers enable row level security;

revoke all on public.newsletter_subscribers from anon;
revoke all on public.newsletter_subscribers from authenticated;

grant select, insert, update, delete on public.newsletter_subscribers to service_role;

grant insert on public.newsletter_subscribers to anon;

drop policy if exists "Anyone can subscribe to newsletter"
  on public.newsletter_subscribers;

create policy "Anyone can subscribe to newsletter"
on public.newsletter_subscribers
for insert
to anon
with check (
  email is not null
  and status = 'subscribed'
  and source in ('homepage', 'footer', 'studio')
);

-- Important: ne cree pas de policy SELECT pour anon/authenticated.
-- Comme ca, personne ne peut lister les emails via l'API publique.
