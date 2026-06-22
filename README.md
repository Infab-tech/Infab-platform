# Infab Platform

INFAB Semiconductor website and client portal built with Next.js, Supabase, and Prisma.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

Copy `.env.example` (or see `.env`) and fill in:

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anon/public key
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (admin operations)
- `DATABASE_URL` — Postgres connection string (port 6543 + `?pgbouncer=true` on Vercel)
- `DIRECT_URL` — Direct Postgres connection (port 5432, used by Prisma migrations)
- `ADMIN_EMAILS` — Comma-separated list of admin email addresses
- `NEXT_PUBLIC_SITE_URL` — Production URL (e.g. `https://infab-tech.com`)
- `RESEND_API_KEY` — Resend API key for transactional email
- `RESEND_FROM_EMAIL` — Sender address (e.g. `INFAB <no-reply@infab-tech.com>`)
