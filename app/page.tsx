'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session');
        if (res.ok) {
          router.push('/feed');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-black to-black">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Logo */}
          <div className="mb-8 animate-bounce">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent mb-2">
              ARTIST
            </h1>
            <h1 className="text-6xl md:text-7xl font-bold text-white">
              SCOUT
            </h1>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-light tracking-wide">
            Connecting Talent. Creating Opportunities.
          </p>

          {/* Description */}
          <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg">
            Discover emerging talent, showcase your art, and connect with the right people. Whether you're an artist or a scout, find your next opportunity on Artist Scouts.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?role=artist">
              <button className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                Register as Artist
              </button>
            </Link>
            <Link href="/auth/register?role=scout">
              <button className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
                Register as Scout
              </button>
            </Link>
          </div>

          {/* Login Link */}
          <div className="mt-8">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-yellow-500 hover:text-yellow-400 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 z-10 animate-bounce">
          <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why <span className="text-yellow-500">Artist Scouts</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎬',
                title: 'TikTok-Style Feed',
                description: 'Discover talent through an addictive, fast-paced vertical video feed.'
              },
              {
                icon: '⭐',
                title: 'Professional Profiles',
                description: 'Showcase your portfolio, music, and achievements with a professional profile.'
              },
              {
                icon: '🎯',
                title: 'Smart Discovery',
                description: 'Find artists by genre, location, trending, and more with advanced filters.'
              },
              {
                icon: '📋',
                title: 'Shortlists',
                description: 'Create multiple lists to organize and track your favorite artists.'
              },
              {
                icon: '💬',
                title: 'Direct Messaging',
                description: 'Connect directly with artists or scouts through private messaging.'
              },
              {
                icon: '🏆',
                title: 'Opportunities',
                description: 'Discover auditions, collaborations, and music industry opportunities.'
              },
            ].map((feature, idx) => (
              <div key={idx} className="card text-center hover:border-yellow-500 transition-colors">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            Affordable <span className="text-yellow-500">Pricing</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="card border-gray-600">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <div className="text-3xl font-bold text-yellow-500 mb-6">R0/mo</div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ Browse feed</li>
                <li>✓ View artist profiles</li>
                <li>✓ Basic search</li>
                <li>✗ Advanced filters</li>
                <li>✗ Upload content</li>
              </ul>
              <button className="btn-secondary w-full">Get Started</button>
            </div>

            {/* Artist Pro */}
            <div className="card border-yellow-500 border-2 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-semibold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Artist Pro</h3>
              <p className="text-gray-400 mb-6">For content creators</p>
              <div className="text-3xl font-bold text-yellow-500 mb-6">R50<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ Everything in Free</li>
                <li>✓ Upload videos & music</li>
                <li>✓ Artist profile</li>
                <li>✓ Analytics</li>
                <li>✓ Get Scouted submissions</li>
              </ul>
              <button className="btn-primary w-full">Subscribe Now</button>
            </div>

            {/* Scout Pro */}
            <div className="card border-gray-600">
              <h3 className="text-2xl font-bold mb-2">Scout Pro</h3>
              <p className="text-gray-400 mb-6">For talent scouts</p>
              <div className="text-3xl font-bold text-yellow-500 mb-6">R100<span className="text-lg text-gray-400">/mo</span></div>
              <ul className="space-y-3 mb-8 text-gray-300">
                <li>✓ Advanced discovery</li>
                <li>✓ Unlimited shortlists</li>
                <li>✓ Private scouting notes</li>
                <li>✓ Artist tracking</li>
                <li>✓ Messaging</li>
              </ul>
              <button className="btn-secondary w-full">Subscribe Now</button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-b from-black to-yellow-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-xl text-gray-300 mb-8">Start discovering talent or showcase your work today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register?role=artist">
              <button className="btn-primary px-8 py-4 text-lg w-full sm:w-auto">
                Sign Up as Artist
              </button>
            </Link>
            <Link href="/auth/register?role=scout">
              <button className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
                Sign Up as Scout
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-yellow-500 font-bold mb-4">Artist Scouts</h3>
              <p className="text-gray-400 text-sm">Connecting talent. Creating opportunities.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-yellow-500">Browse Artists</Link></li>
                <li><Link href="#" className="hover:text-yellow-500">Discover</Link></li>
                <li><Link href="#" className="hover:text-yellow-500">Opportunities</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-yellow-500">About</Link></li>
                <li><Link href="#" className="hover:text-yellow-500">Contact</Link></li>
                <li><Link href="#" className="hover:text-yellow-500">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="#" className="hover:text-yellow-500">Privacy</Link></li>
                <li><Link href="#" className="hover:text-yellow-500">Terms</Link></li>
                <li><Link href="#" className="hover:text-yellow-500">Cookies</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 Artist Scouts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
