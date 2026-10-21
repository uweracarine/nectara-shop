# Nectara Jewels - Quick Start Guide

**TL;DR**: 3 steps to get running

---

## 1️⃣ Install & Setup (5 min)

```bash
# Navigate to project
cd nectara-jewels

# Install dependencies
npm install --legacy-peer-deps

# Setup environment
cp .env.example .env.local
```

---

## 2️⃣ Configure Supabase (35 min)

### Option A: Quick Setup (Recommended)
```bash
# Follow the visual guide
cat SUPABASE_SETUP.md

# Step 1: Create Supabase account + project
# Step 2: Copy credentials to .env.local
# Step 3: Link & push database
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
supabase db seed
```

### Option B: Manual (Skip CLI)
- Go to supabase.com → create project
- SQL Editor → Run migrations from supabase/migrations/
- Copy API keys to .env.local

---

## 3️⃣ Start Development

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
```

---

## Common Commands

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Testing
npm test

# Build
npm run build
npm start
```

---

## Project Structure

```
nectara-jewels/
├── app/                 # Next.js pages & routes
├── src/
│   ├── components/      # Reusable UI components
│   ├── features/        # Business logic (auth, products, orders)
│   ├── lib/            # Utilities, validation, Supabase clients
│   └── types/          # TypeScript types
├── supabase/           # Database migrations & seed data
└── tests/              # Test files
```

---

## Key Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (git-ignored) |
| `.env.example` | Template for .env.local |
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `supabase/migrations/` | Database schema |

---

## What's Already Done ✅

- ✅ Next.js 16 + React 19 + TypeScript + Tailwind CSS
- ✅ Database schema with 24 tables
- ✅ Authentication service
- ✅ Product catalog service
- ✅ Order management service
- ✅ 200+ dependencies installed
- ✅ Beautiful homepage
- ✅ Responsive design

---

## What's Next 🚀

**Phase 3: Frontend**
- Auth pages (register, login, password reset)
- Product listing & detail pages
- Shopping cart
- User dashboard

---

## Need Help?

| Document | For... |
|----------|--------|
| `SUPABASE_SETUP.md` | Detailed Supabase setup |
| `DEVELOPMENT.md` | Development guidelines |
| `PHASE_3_PLAN.md` | Next phase roadmap |
| `PHASE_2_COMPLETION.md` | What's been built |

---

## Troubleshooting

### Port 3000 in use?
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti :3000 | xargs kill -9
```

### Dependencies failing?
```bash
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

### TypeScript errors?
```bash
npm run type-check
```

### Supabase issues?
```bash
supabase status
supabase logout
supabase login
```

---

**Status**: Phase 2 Complete, Phase 3 Ready  
**Last Updated**: October 19, 2026
