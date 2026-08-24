import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Artist Scouts - Connecting Talent. Creating Opportunities.',
  description: 'Professional platform connecting artists and scouts. Discover talent, showcase your work, and create opportunities.',
  keywords: 'artists, scouts, music, talent discovery, portfolio, TikTok-style',
  authors: [{ name: 'Artist Scouts' }],
  openGraph: {
    title: 'Artist Scouts',
    description: 'Connecting Talent. Creating Opportunities.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
