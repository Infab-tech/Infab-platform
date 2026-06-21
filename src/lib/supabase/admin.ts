import { createClient } from '@supabase/supabase-js';

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key || key === 'YOUR_SERVICE_ROLE_KEY_HERE') {
    throw new Error(
      'SUPABASE_SERVICE_ROLE_KEY is not set. ' +
      'Get it from: Supabase Dashboard → Project Settings → API → service_role'
    );
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
