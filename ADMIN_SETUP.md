# Admin Section Setup Guide

The admin dashboard is now scaffolded and ready to configure. Follow these steps to get it running.

## Stack Overview

- **Database:** PostgreSQL on Render (free tier)
- **Authentication:** NextAuth.js with email/password
- **API:** Next.js API routes
- **File Storage:** Supabase Storage (free tier)
- **Admin UI:** React components in Next.js

## Setup Steps

### 1. Create Render PostgreSQL Database

1. Go to [render.com](https://render.com) and sign up (free)
2. Create a new PostgreSQL database:
   - Click "New" → "PostgreSQL"
   - Name: `gongsound-db`
   - Region: Choose closest to you
   - PostgreSQL Version: Latest
   - Plan: **Free tier**
3. Wait for the database to provision (~5 min)
4. Copy the **External Database URL** (looks like `postgresql://...`)

### 2. Create Supabase Account (Optional - for file uploads)

1. Go to [supabase.com](https://supabase.com) and sign up (free)
2. Create a new project:
   - Project name: `gongsound`
   - Region: Choose closest to you
   - Plan: **Free tier**
3. Wait for provisioning (~2 min)
4. Go to Settings → API
5. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Go to Settings → Database and copy the connection string for the service role key → `SUPABASE_SERVICE_KEY` (or ask in Supabase docs)

Note: For now, you can use image URLs directly and skip Supabase setup. Image uploads can be added later.

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in `.env.local`:
   ```env
   # Database URL from Render
   DATABASE_URL="postgresql://user:password@host:5432/dbname"

   # Generate with: openssl rand -base64 32
   NEXTAUTH_SECRET="your-generated-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # Supabase (optional)
   NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_SERVICE_KEY="your-service-key"
   ```

### 4. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Paste the output into `NEXTAUTH_SECRET` in `.env.local`

### 5. Initialize Prisma & Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio to see your database
npx prisma studio
```

### 6. Create First Admin User

In Prisma Studio (or via a script), create your first admin:

```prisma
// In Prisma Studio, go to "User" table and create:
{
  email: "admin@gongsound.com"
  password: "hashed_password" (use bcryptjs)
  name: "Admin"
  role: "admin"
}
```

Or create a seed script. For now, use this quick Node script:

```bash
node -e "
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  const hashed = bcrypt.hashSync('your-password', 10);
  await prisma.user.create({
    data: {
      email: 'admin@gongsound.com',
      password: hashed,
      name: 'Admin',
      role: 'admin'
    }
  });
  console.log('Admin user created!');
  process.exit(0);
})();
"
```

### 7. Test Admin Login

```bash
npm run dev
```

Visit `http://localhost:3000/login` and log in with:
- Email: `admin@gongsound.com`
- Password: (whatever you set above)

You should see the admin dashboard!

## Features Available

Once logged in, admins can:

- **Tours & Events** - Create, edit, delete tour dates
- **News & Articles** - Post articles with tags, dates, authors
- **Artists** - Manage artist roster with bios
- **Featured Album** - Update album info
- **Users** - (Coming soon) Manage admin accounts

## Connecting to Database in Production

When deploying to Vercel:

1. Add environment variables in Vercel dashboard
2. For Render: Keep the external connection string
3. For Supabase: Create a separate Vercel deployment with the same credentials

## Migrating from Hardcoded Content

The frontend still reads from `lib/content.ts`. To switch to the database:

1. Update pages to fetch from API instead:
   ```typescript
   const tours = await fetch('/api/tours').then(r => r.json())
   ```
2. Remove hardcoded data from `lib/content.ts`
3. Populate the database via admin dashboard

## Troubleshooting

- **"Unauthorized" on admin pages:** Make sure you're logged in via `/admin/login`
- **Database connection error:** Check `DATABASE_URL` in `.env.local`
- **Prisma errors:** Run `npx prisma generate` again
- **Image uploads:** For now, paste image URLs. Full Supabase integration coming next.

## Next Steps

1. Set up Render PostgreSQL ✓
2. Configure .env.local ✓
3. Run Prisma migrations ✓
4. Create first admin user ✓
5. Log in and test admin dashboard ✓
6. Populate content via admin UI ✓
7. Connect frontend to API (update `lib/content.ts` usage)
8. Deploy to Vercel
