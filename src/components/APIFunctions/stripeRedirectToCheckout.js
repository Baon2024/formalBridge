import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe.js with your publishable key
const stripePromise = loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');

export default async function redirectToStripeCheckout(sessionId) {
  const stripe = await stripePromise;
  if (!stripe) {
    console.error('Failed to load Stripe.js');
    return;
  }

  const { error } = await stripe.redirectToCheckout({
    sessionId: sessionId, // This comes from your backend response
  });

  if (error) {
    console.error('Stripe Checkout redirection failed:', error.message);
  }
}
