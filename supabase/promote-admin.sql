-- Upsert the admin profile — works whether the row exists or not.
-- Replace 'your-admin@example.com' with the admin account's actual email.

INSERT INTO profiles (id, role, first_name, last_name)
SELECT
  id,
  'admin',
  raw_user_meta_data ->> 'first_name',
  raw_user_meta_data ->> 'last_name'
FROM auth.users
WHERE email = 'your-admin@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
