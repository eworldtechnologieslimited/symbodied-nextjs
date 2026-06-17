-- ============================================================
-- profiles
-- ============================================================
create table if not exists profiles (
  id          uuid references auth.users on delete cascade primary key,
  first_name  text,
  last_name   text,
  role        text not null default 'user'
                check (role in ('user', 'vendor', 'admin')),
  avatar_url  text,
  created_at  timestamptz default now()
);

alter table profiles enable row level security;

-- users can read and update their own row (but cannot change their role)
create policy "own profile: select"
  on profiles for select
  using (auth.uid() = id);

create policy "own profile: update"
  on profiles for update
  using (auth.uid() = id)
  with check (
    role = (select role from profiles where id = auth.uid())
  );

-- admins can read every profile
create policy "admin: select all"
  on profiles for select
  using (
    exists (
      select 1 from profiles where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- auto-create profile on signup
-- ============================================================
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
