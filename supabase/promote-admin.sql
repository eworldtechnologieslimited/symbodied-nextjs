-- Run this in the Supabase SQL editor after creating the user in Authentication > Users.
-- Replace the email below with the admin account's email address.

update profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'your-admin@example.com'
);
