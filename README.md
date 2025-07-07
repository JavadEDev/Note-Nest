This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Environment Variables for Auth.js v5 + Neon

Add the following to your `.env.local`:

```
# Neon Postgres
DATABASE_URL=postgresql://username:password@ep-something.region.aws.neon.tech/database_name?sslmode=require
NEXTAUTH_SECRET=your-random-secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# LinkedIn OAuth
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Email Provider
EMAIL_SERVER=smtp://user:pass@smtp.mail.com:587
EMAIL_FROM=your@email.com
```

- For Google, GitHub, and LinkedIn, create OAuth apps in their respective developer consoles and set the callback URLs to `http://localhost:3000/api/auth/callback/{provider}`.
- For Email, use a real SMTP server for production.

# Database Schema for Auth.js v5 + Neon

Run this SQL in your Neon dashboard or psql to set up the required tables:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (managed by Auth.js)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  email_verified TIMESTAMP,
  image TEXT,
  role VARCHAR(50) DEFAULT 'student' CHECK (role IN ('student', 'teacher'))
);

-- Accounts table (managed by Auth.js)
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(255),
  provider VARCHAR(255),
  provider_account_id VARCHAR(255),
  refresh_token TEXT,
  access_token TEXT,
  expires_at BIGINT,
  token_type VARCHAR(255),
  scope TEXT,
  id_token TEXT,
  session_state TEXT
);

-- Sessions table (managed by Auth.js)
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) UNIQUE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP
);

-- Verification tokens (for email sign-in)
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255),
  token VARCHAR(255),
  expires TIMESTAMP
);

-- Notes table (app-specific)
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user UUID REFERENCES users(id) ON DELETE SET NULL,
  to_user UUID REFERENCES users(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_from_user ON notes(from_user);
CREATE INDEX IF NOT EXISTS idx_notes_to_user ON notes(to_user);
CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at);
```

- All user references in your app should use the `id` field from the `users` table (UUID).
- The `notes` table links notes to users by their UUIDs.
- The `role` field supports 'student' and 'teacher' roles for role-based access control.
- Teachers can access the teacher feed and have additional permissions.
