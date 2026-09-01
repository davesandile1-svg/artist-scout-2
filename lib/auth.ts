import jwt from 'jsonwebtoken';

export const AUTH_COOKIE = 'artist_scout_token';

type AuthToken = {
  userId: string;
  email: string;
  role: string;
};

function getAuthSecret() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('NEXTAUTH_SECRET must be set to at least 32 characters');
  }
  return secret;
}

export function createAuthToken(user: AuthToken) {
  return jwt.sign(user, getAuthSecret(), { expiresIn: '7d' });
}

export function verifyAuthToken(token: string): AuthToken | null {
  try {
    return jwt.verify(token, getAuthSecret()) as AuthToken;
  } catch {
    return null;
  }
}