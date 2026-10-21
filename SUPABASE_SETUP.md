# Supabase Setup Guide for Nectara Jewels

## Overview

This guide walks you through setting up the Supabase backend for the Nectara Jewels project. Supabase provides authentication, PostgreSQL database, real-time capabilities, and file storage.

---

## Prerequisites

- [Supabase CLI](https://supabase.com/docs/guides/cli) installed
  ```bash
  npm install -g supabase
  ```
- A [Supabase account](https://supabase.com)
- Node.js v20+ installed
- The project dependencies already installed (`npm install --legacy-peer-deps` completed)

---

## Step 1: Create a Supabase Project

### 1.1 Create a New Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click **"New Project"**
3. Fill in the details:
   - **Project Name**: `nectara-jewels` (or similar)
   - **Database Password**: Create a strong password (save it securely)
   - **Region**: Choose the region closest to Rwanda (EU regions like Ireland or Belgium recommended for lower latency)
   - **Pricing Plan**: Free tier is fine for development

4. Click **"Create new project"** and wait for it to provision (3-5 minutes)

### 1.2 Get Your Project Credentials

Once the project is created, navigate to **Settings → API** to find:

- **Project URL**: `https://your-ref.supabase.co`
- **Anon Key** (Publishable key): Used on the frontend
- **Service Role Key**: Used on the backend (keep secret!)

---

## Step 2: Configure Environment Variables

### 2.1 Update .env.local

Copy your credentials into `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and replace the placeholder values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Payment & Email (optional for now)
PAYMENT_PROVIDER=sandbox
EMAIL_PROVIDER=console
NEXT_PUBLIC_ADMIN_EMAIL=admin@nectara-jewels.com
```

---

## Step 3: Link Supabase CLI to Your Project

### 3.1 Login to Supabase CLI

```bash
supabase login
```

This opens a browser window to authenticate. Follow the prompts and return to the terminal.

### 3.2 Link Your Project

```bash
supabase link --project-ref your-project-ref
```

Replace `your-project-ref` with your project's reference ID (the part before `.supabase.co` in your project URL).

### 3.3 Verify Connection

```bash
supabase status
```

You should see your project information displayed.

---

## Step 4: Apply Database Migrations

### 4.1 Push Migrations

```bash
supabase db push
```

This applies the migrations from `supabase/migrations/` to your database:
- `001_init_schema.sql` - Creates all tables, types, and indexes
- `002_rls_policies.sql` - Sets up Row Level Security policies

### 4.2 Verify Migrations

Check the Supabase dashboard:
1. Go to **SQL Editor**
2. Run this query to verify tables were created:

```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

You should see tables like `profiles`, `products`, `orders`, `seller_profiles`, etc.

---

## Step 5: Seed Development Data

### 5.1 Run Seed Script

```bash
supabase db seed -- supabase/seed.sql
```

This populates the database with:
- Product categories (Rings, Bracelets, Jewelry, etc.)
- Demo products for testing
- Test data

### 5.2 Verify Seed Data

Query to check categories:

```sql
SELECT * FROM categories LIMIT 5;
```

Query to check products:

```sql
SELECT COUNT(*) as product_count FROM products;
```

---

## Step 6: Configure Authentication Settings

### 6.1 Email Configuration (Optional for Development)

1. Go to **Authentication → Providers → Email**
2. Enable **Email/Password**
3. Configure email settings (can use Supabase defaults for development)

### 6.2 Auth URLs

1. Go to **Authentication → URL Configuration**
2. Add Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/` (for development)
   - Add production URLs later

---

## Step 7: Test Database Connection

### 7.1 Create a Test File (Optional)

Create `src/lib/__tests__/supabase.test.ts`:

```typescript
import { createClient } from '@/lib/supabase-client'

export async function testConnection() {
  const supabase = createClient()

  // Test auth
  const { data: authSession, error: authError } = await supabase.auth.getSession()
  console.log('Auth Test:', authError ? 'Failed' : 'Connected')

  // Test database
  const { data: categories, error: dbError } = await supabase
    .from('categories')
    .select('*')
    .limit(1)

  console.log('Database Test:', dbError ? 'Failed' : 'Connected')
  console.log('Sample Category:', categories?.[0])
}
```

### 7.2 Run Test

```bash
npm run dev
```

Then test the API in your application or via curl:

```bash
curl http://localhost:3000/api/categories
```

---

## Step 8: Enable Row Level Security (RLS)

RLS policies are already created in `002_rls_policies.sql`, but verify they're enabled:

1. Go to **SQL Editor** in Supabase Dashboard
2. Run:

```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
ORDER BY tablename;
```

All tables should have `rowsecurity = true`.

---

## Step 9: Verify API Keys Security

✅ **In .env.local (git-ignored):**
- `NEXT_PUBLIC_SUPABASE_URL` - Public (safe to expose)
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` - Public (safe to expose)
- `SUPABASE_SERVICE_ROLE_KEY` - **PRIVATE** (never commit or expose)

✅ **In .env.example (version controlled):**
- Show placeholders only
- No real keys

✅ **In production (.env):**
- Set via environment variables (don't commit)
- Use platform secrets (Vercel, AWS, etc.)

---

## Step 10: Project Ready!

If all steps completed successfully:

✅ Supabase project created and linked  
✅ Database schema migrated  
✅ Seed data populated  
✅ Authentication configured  
✅ RLS policies enabled  
✅ Environment variables set  

---

## Troubleshooting

### Issue: "Supabase CLI not found"
```bash
npm install -g supabase
```

### Issue: "Project reference invalid"
- Check the project URL format: `https://XXXXX.supabase.co`
- The reference is the part before `.supabase.co`

### Issue: "Authentication failed"
```bash
supabase logout
supabase login
```

### Issue: "Migration failed"
1. Check migration file syntax
2. Review Supabase logs: **SQL Editor → Query History**
3. Run migrations individually in SQL Editor

### Issue: "Can't connect to database"
1. Verify network connectivity
2. Check firewall/IP whitelist
3. Confirm credentials in `.env.local`
4. Verify RLS policies aren't blocking access

### Issue: "RLS policies blocking queries"
- RLS policies can block unauthenticated access
- For development, temporarily disable RLS: Go to **Authentication → Policies** and review

---

## Next Steps

After Supabase is set up:

1. **Start development server**: `npm run dev`
2. **Test authentication**: Try registration/login flows
3. **Test database**: Verify product catalog loads
4. **Build UI**: Start Phase 3 - Frontend Foundation
5. **Integrate payments**: Add payment provider (MTN MoMo, etc.)

---

## Useful Supabase Commands

```bash
# Show project status
supabase status

# View local migrations
supabase db list migrations

# Reset local database
supabase db reset

# Pull latest schema from remote
supabase db pull

# Generate TypeScript types
supabase gen types typescript --linked > src/types/database.ts

# View logs
supabase functions list
supabase edge-functions list
```

---

## Additional Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Next.js with Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Supabase RLS Guide](https://supabase.com/docs/learn/auth-deep-dive/row-level-security)

---

**Status**: Phase 2 - Database & Authentication Setup  
**Last Updated**: October 19, 2026
