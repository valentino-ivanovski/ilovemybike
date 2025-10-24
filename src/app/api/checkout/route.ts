import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2025-09-30.clover',
    })
  : null;

type CheckoutPayload = {
  items?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    section?: string;
    variantId?: number;
    variantName?: string;
  }>;
};

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured.' }, { status: 500 });
  }

  let payload: CheckoutPayload;
  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const items = Array.isArray(payload.items) ? payload.items : [];
  const inStockItems = items.filter((item) => item.section === 'in-stock');

  if (inStockItems.length === 0) {
    return NextResponse.json({ error: 'Only in-stock items can be purchased with Stripe.' }, { status: 400 });
  }

  const headerList = await headers();
  const origin = headerList.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  try {
    const lineItems = inStockItems.map((item) => {
      const quantity = Number.isFinite(item.quantity) && item.quantity > 0 ? Math.floor(item.quantity) : 1;
      const unitAmount = Math.round((Number(item.price) || 0) * 100);
      const variantName = typeof item.variantName === 'string' ? item.variantName.trim() : '';
      const productName = variantName ? `${item.name} (${variantName})` : item.name;

      if (unitAmount <= 0) {
        throw new Error(`Invalid price for item ${item.id}`);
      }

      const metadata: Record<string, string> = {
        id: item.id,
        section: 'in-stock',
      };

      if (variantName) {
        metadata.variantName = variantName;
      }

      if (item.variantId !== undefined && item.variantId !== null) {
        metadata.variantId = String(item.variantId);
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: productName,
            metadata,
            ...(item.image ? { images: [item.image] } : {}),
          },
          unit_amount: unitAmount,
        },
        quantity,
      } satisfies Stripe.Checkout.SessionCreateParams.LineItem;
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `${origin}/shop?section=in-stock&checkout=success`,
      cancel_url: `${origin}/shop?section=in-stock&checkout=cancelled`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Invalid price')) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error('Failed to create Stripe checkout session', error);
    return NextResponse.json({ error: 'Unable to create checkout session.' }, { status: 500 });
  }
}
