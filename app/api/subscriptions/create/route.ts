import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    // TODO: Get user from session
    // TODO: Check if user already has active subscription

    const prices = {
      'ARTIST_PRO': 'price_artist_pro', // Configure in Stripe
      'SCOUT_PRO': 'price_scout_pro',   // Configure in Stripe
    };

    const priceId = prices[plan as keyof typeof prices];
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    // TODO: Create checkout session
    // const session = await stripe.checkout.sessions.create({
    //   customer_email: user.email,
    //   line_items: [{
    //     price: priceId,
    //     quantity: 1,
    //   }],
    //   mode: 'subscription',
    //   success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${process.env.NEXTAUTH_URL}/pricing`,
    // });

    return NextResponse.json(
      {
        sessionId: 'checkout_session_id',
        // url: session.url,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
