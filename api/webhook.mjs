import { setTicketBought, updateBuyerUser, setTicketBoughtMultiple, updateBuyerUserMultiple } from "../backend/APIFunctionsForBackend.js";
import Stripe from 'stripe';
//const Stripe = require('stripe');
//const { setTicketBought, updateBuyerUser, setTicketBoughtMultiple, updateBuyerUserMultiple } = require('../backend/APIFunctionsForBackend');

// The secret key for Stripe webhook verification
const endpointSecret = 'whsec_d841e887e13b7130ce9da8227aafc1a2c38c9289b03f48f955943ed25a67adc6';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default async (req, res) => {
  // Ensure the request is POST
  if (req.method === 'POST') {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
      // Verifying the webhook signature to confirm it is from Stripe
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.log(`⚠️ Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    // Handle different event types from Stripe
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount_received} was successful!`);
        // Further logic for handling payment intent success
        break;

      case 'checkout.session.completed':
        console.log("Checkout session completed");

        const session = event.data.object;
        console.log("Session object:", session);

        // Assuming you have some globalUser and globalTicket values set earlier
        const jwtToken = globalUser?.token;
        if (globalTicket && globalUser) {
          setTicketBought(globalTicket, jwtToken);
          updateBuyerUser(globalTicket, globalUser, jwtToken);
        }

        // Handle metadata for multiple ticket IDs
        const metadata = session.metadata;
        if (metadata) {
          const ticketIds = metadata.ticketIds.split(',').map(id => id);
          const buyerUserId = session.metadata.buyerUserId;

          ticketIds.forEach((ticketId) => {
            setTicketBoughtMultiple(ticketId, jwtToken);
            updateBuyerUserMultiple(ticketId, buyerUserId, jwtToken);
          });
        }
        break;

      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        console.log("Payment method attached:", paymentMethod);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Respond with a success status to acknowledge receipt of the event
    return res.status(200).json({ received: true });
  } else {
    // Return 405 if method is not POST
    return res.status(405).send('Method Not Allowed');
  }
};
