import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.trim().toLowerCase() },
        });
        if (!user?.password || !(await bcrypt.compare(credentials.password, user.password))) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name || user.username,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'github') {
        return true;
      }

      if (!user.email) {
        return '/auth/login?error=GitHubAccountNeedsEmail';
      }

      const email = user.email.trim().toLowerCase();
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: existingUser.name || user.name,
            image: user.image || existingUser.image,
          },
        });
        user.id = existingUser.id;
        return true;
      }

      const baseUsername = (user.name || email.split('@')[0])
        .toLowerCase()
        .replace(/[^a-z0-9_]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .slice(0, 24) || 'artist';
      let username = baseUsername;
      let suffix = 1;
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername.slice(0, 24 - String(suffix).length - 1)}_${suffix}`;
        suffix += 1;
      }

      const createdUser = await prisma.user.create({
        data: {
          email,
          username,
          name: user.name,
          image: user.image,
          artist: { create: { stageName: username, genres: [] } },
        },
      });
      user.id = createdUser.id;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.role = (user as typeof user & { role?: string }).role || 'ARTIST';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const sessionUser = session.user as typeof session.user & { id: string; role: string };
        sessionUser.id = String(token.userId || token.sub);
        sessionUser.role = String(token.role || 'ARTIST');
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
