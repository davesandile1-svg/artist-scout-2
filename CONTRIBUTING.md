# Contribution Guide

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/davesandile1-svg/artist-scout-2.git
cd artist-scout-2

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Update .env.local with your credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
artist-scout-2/
├── app/                    # Next.js app router
│   ├── (auth)/             # Authentication pages
│   ├── api/                # Backend API routes
│   ├── admin/              # Admin dashboard
│   ├── feed/               # Main feed
│   ├── discover/           # Discovery/search
│   ├── profile/            # User profiles
│   ├── messages/           # Messaging
│   ├── shortlists/         # Scout shortlists
│   ├── notifications/      # Notifications
│   ├── create/             # Content creation
│   └── pricing/            # Pricing page
├── components/             # Reusable React components
├── lib/                    # Utilities and helpers
├── prisma/                 # Database schema
├── public/                 # Static files
├── styles/                 # Global CSS
└── types/                  # TypeScript types
```

## Coding Standards

- Use TypeScript for all new code
- Follow the existing code style
- Use functional components and hooks
- Add PropTypes or TypeScript interfaces
- Write meaningful commit messages

## Testing

```bash
# Run tests
npm run test

# Run end-to-end tests
npm run test:e2e

# Check linting
npm run lint
```

## Deployment

The application is deployed on Vercel and automatically builds and deploys on pushes to main.

## Database Migrations

```bash
# Create a new migration
npm run db:migrate -- --name migration_name

# Push schema changes
npm run db:push

# Open Prisma Studio
npm run db:studio
```

## Reporting Issues

Please report bugs and feature requests on the GitHub issues page.

## Pull Requests

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request with a clear description
5. Wait for review and approval

---

Thank you for contributing to Artist Scouts!
