'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Free',
      price: 'R0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Browse full feed',
        'View artist profiles',
        'Basic search',
        'Like and comment',
        '❌ Upload content',
        '❌ Advanced filters',
        '❌ Shortlists',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Artist Pro',
      price: 'R50',
      period: '/month',
      description: 'For content creators',
      features: [
        'Everything in Free',
        'Upload videos & music',
        'Artist profile',
        'Analytics dashboard',
        'Get Scouted submissions',
        'Increased visibility',
        'Profile customization',
      ],
      cta: 'Subscribe Now',
      highlighted: true,
    },
    {
      name: 'Scout Pro',
      price: 'R100',
      period: '/month',
      description: 'For talent scouts',
      features: [
        'Advanced discovery',
        'Unlimited shortlists',
        'Private scouting notes',
        'Artist tracking',
        'Direct messaging',
        'Scouting analytics',
        'Premium discovery tools',
      ],
      cta: 'Subscribe Now',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black pb-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Simple, Transparent <span className="text-yellow-500">Pricing</span>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Choose the perfect plan for your talent journey
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                billing === 'monthly'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('annual')}
              className={`px-6 py-2 rounded-lg font-semibold transition relative ${
                billing === 'annual'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Annual
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`card relative transition transform hover:scale-105 ${
                plan.highlighted
                  ? 'border-yellow-500 border-2 md:scale-105 md:shadow-2xl'
                  : 'border-gray-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-yellow-500">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>

              <button
                className={`w-full mb-8 py-3 font-semibold rounded-lg transition ${
                  plan.highlighted
                    ? 'btn-primary'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </button>

              <div className="border-t border-gray-700 pt-6">
                <p className="font-semibold text-sm mb-4">What's included:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="text-sm text-gray-300">
                      <span className="mr-2">
                        {feature.startsWith('❌') ? '❌' : '✓'}
                      </span>
                      {feature.replace('❌', '').replace('✓', '').trim()}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked <span className="text-yellow-500">Questions</span>
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I cancel my subscription anytime?',
                a: 'Yes, you can cancel your subscription at any time. Your access continues until the end of your billing period.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayFast for South African users, and other payment methods through Stripe.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes, all paid plans come with a 7-day free trial. No credit card required to start.',
              },
              {
                q: 'Can I change my plan?',
                a: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
              },
            ].map((item, idx) => (
              <div key={idx} className="card">
                <h4 className="font-semibold text-lg mb-2">{item.q}</h4>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="text-gray-400 mb-8">Join thousands of artists and scouts on Artist Scouts</p>
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
    </div>
  );
}
