# Artist Scouts - Professional Talent Discovery Platform

**Connecting Talent. Creating Opportunities.**

A premium platform where artists showcase their talent and scouts discover, evaluate, follow, shortlist and contact artists. Features a TikTok-style vertical video feed with professional discovery tools.

## 🎯 Core Features

### For Artists
- Professional artist profiles with portfolio
- Upload short videos, music, photos
- Real-time engagement (likes, comments, shares)
- Follow system with notifications
- Get Scouted submissions
- Artist analytics dashboard
- Content management system

### For Scouts
- TikTok-style vertical discovery feed
- Advanced search and filtering (genre, location, trending)
- Artist shortlists and collections
- Private scouting notes
- Artist tracking and history
- Direct messaging with artists
- Scout analytics dashboard

### Platform Features
- Full authentication and authorization
- Subscription system (Artist R50/month, Scout R100/month)
- Stripe payment processing
- Admin dashboard with full control
- Reporting and content moderation
- Opportunities marketplace
- Real-time notifications
- Private messaging system
- Mobile-first responsive design

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Video Hosting**: Cloudinary
- **Payments**: Stripe
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account
- Cloudinary account

### Installation

```bash
# Clone repository
git clone https://github.com/davesandile1-svg/artist-scout-2.git
cd artist-scout-2

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## 📋 Environment Variables

Create `.env.local` with the required credentials from `.env.example`

## 🎨 Branding

- **Primary Color**: Gold (#D4AF37)
- **Secondary**: White (#FFFFFF)
- **Accent**: Black (#000000)
- **Tagline**: Connecting Talent. Creating Opportunities.

## 🔐 Security

- Server-side subscription validation
- Protected API endpoints
- Secure password hashing
- Private data encryption
- CSRF protection
- Rate limiting

## 📱 Mobile-First Design

- Full-screen vertical video feed
- Touch-friendly interface
- Responsive for all devices
- Bottom navigation

## 📄 License

Proprietary - Artist Scouts Platform
