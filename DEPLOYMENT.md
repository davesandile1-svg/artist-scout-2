# Deployment Guide

## Prerequisites

- GitHub account with repository access
- Vercel account (free tier available)
- PostgreSQL database (managed service like Railway, Supabase, or AWS RDS)
- Stripe account for payments
- Cloudinary account for video/image hosting

## Environment Variables Required

### Database
```
DATABASE_URL=postgresql://user:password@host:5432/artist_scouts
```

### Authentication
```
NEXTAUTH_SECRET=your-secret-key-min-32-chars
NEXTAUTH_URL=https://yourdomain.com
GITHUB_ID=your-github-oauth-id
GITHUB_SECRET=your-github-oauth-secret
```

### Stripe
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Cloudinary
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Deploy to Vercel

This is a Next.js application with server-rendered routes, API routes, middleware, and Prisma. Deploy it to a Next.js-capable host such as Vercel. GitHub Pages is not supported for this project: it only serves static files and will render the repository README through Jekyll instead of running the application.

### Option 1: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import the `artist-scout-2` repository
5. Add all environment variables
6. Click "Deploy"

The repository includes `vercel.json` so Vercel uses the Next.js framework, `npm ci`, and `npm run build` automatically.

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

After deployment, use the Vercel production URL as the application URL. Set `NEXTAUTH_URL` to that URL in the Vercel project environment variables, then redeploy.

## Database Setup

### Using Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Copy the PostgreSQL connection string
4. Add to Vercel environment variables as `DATABASE_URL`
5. Run migrations: `npm run db:push`

### Using Railway

1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Add to Vercel environment variables
5. Run migrations: `npm run db:push`

## Stripe Setup

1. Go to [stripe.com](https://stripe.com)
2. Create a business account
3. Get API keys from Dashboard
4. Create products for Artist Pro (R50/month) and Scout Pro (R100/month)
5. Add keys to environment variables

## Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Get API credentials from Settings
4. Add to environment variables

## Post-Deployment

1. Test all authentication flows
2. Test payment processing with Stripe test keys
3. Test video uploads to Cloudinary
4. Verify database connections
5. Check email notifications
6. Monitor error logs in Vercel dashboard

## Production Checklist

- [ ] All environment variables configured
- [ ] Database migrations applied
- [ ] Stripe live keys configured
- [ ] Cloudinary production account active
- [ ] CORS properly configured
- [ ] Security headers enabled
- [ ] Rate limiting configured
- [ ] Backup strategy in place
- [ ] Monitoring and logging set up
- [ ] Error tracking configured

## Custom Domain

1. In Vercel Dashboard, go to Project Settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS records as per Vercel instructions
5. Wait for DNS propagation (usually 24-48 hours)

## Monitoring

- Vercel Analytics: Built-in performance monitoring
- Sentry: Error tracking
- LogRocket: Session replay and debugging
- Stripe Dashboard: Payment monitoring

---

For support, reach out to the team or check the documentation.
