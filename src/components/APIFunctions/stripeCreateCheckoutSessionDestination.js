//import redirectToStripeCheckout from "./stripeRedirectToCheckout";
import { loadStripe } from '@stripe/stripe-js';


export default async function stripeCreateCheckoutSessionDestination(ticket, user) {


    //const connectedAccountId = 'acct_1QZhoTQAEiW5zVa4'
    const connectedAccountId = ticket.sellerUser.connectedAccountId;
    //const connectedAccountId = 'acct_1QaRMQ4fOg1LtcNe';

    console.log("thsi should be the connectedAccountId needed for the sellerUser inside of the stripeCreateCheckoutSession:", connectedAccountId);

    //should be able to make this dynamic now

     // Initialize Stripe.js with the connected account
  /*const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA', {
    stripeAccount: connectedAccountId,  // Pass the connected account to Stripe.js
  });*/

  const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');
   
  const ticketAndUser = [ ticket, user];

    console.log("this is what ticket is inside the stripeCreateCheckoutSession function:", ticket);

    const url = 'http://localhost:5001/create-checkout-session-destination';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketAndUser),
    })
    
    //const jsonedResponse = await response.json();

    const session  = await response.json();
    console.log("session in the frontend is:", session );

    const sessionId = session.id;
    console.log("sessionId in stripeCreateCheckoutSession is:", sessionId);
    const altSessionId = JSON.stringify(sessionId);
    console.log("altSessionid is:", altSessionId);

    console.log("connectedAccountId just before stripe.redirectToCheckout is:", connectedAccountId);

    if (!sessionId) {
        console.error('Session ID not received.');
        return;
      }
      
      //const stripePromise = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');
      //const stripe = await stripePromise;  // Ensure stripePromise is loaded correctly

      console.log("Redirecting to checkout with sessionId:", altSessionId);

      if (!stripe) {
        console.error('Stripe.js failed to load');
        return;
      }

      

     
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe Checkout redirection error:', error.message);
      }

    

}

