//import redirectToStripeCheckout from "./stripeRedirectToCheckout";
import { loadStripe } from '@stripe/stripe-js';


export default async function stripeCreateCheckoutSession(ticket) {


    const connectedAccountId = 'acct_1QZhoTQAEiW5zVa4'

     // Initialize Stripe.js with the connected account
  const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA', {
    stripeAccount: connectedAccountId,  // Pass the connected account to Stripe.js
  });


    console.log("this is what ticket is inside the stripeCreateCheckoutSession function:", ticket);

    const url = 'http://localhost:5001/create-checkout-session'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticket),
    })
    
    //const jsonedResponse = await response.json();

    const { id: sessionId } = await response.json();
    console.log("sessionId in the frontend is:", sessionId );

    if (!sessionId) {
        console.error('Session ID not received.');
        return;
      }
      
      //const stripePromise = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');
      //const stripe = await stripePromise;  // Ensure stripePromise is loaded correctly

      console.log("Redirecting to checkout with sessionId:", sessionId);

  
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe Checkout redirection error:', error.message);
      }

    /*console.log("jsonedResponse in stripeCreateCheckoutSession is:", jsonedResponse);
    if (jsonedResponse.id) {
        console.log("id is:", jsonedResponse.id);
        redirectToStripeCheckout(jsonedResponse.id);
    }
    return jsonedResponse;*/

}