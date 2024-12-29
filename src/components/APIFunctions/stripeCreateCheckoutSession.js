//import redirectToStripeCheckout from "./stripeRedirectToCheckout";
import { loadStripe } from '@stripe/stripe-js';


export default async function stripeCreateCheckoutSession(ticket, user) {


    //const connectedAccountId = 'acct_1QZhoTQAEiW5zVa4'
    const connectedAccountId = ticket.sellerUser.connectedAccountId;
    //const connectedAccountId = 'acct_1QaRMQ4fOg1LtcNe';

    console.log("thsi should be the connectedAccountId needed for the sellerUser inside of the stripeCreateCheckoutSession:", connectedAccountId);

    //should be able to make this dynamic now

     // Initialize Stripe.js with the connected account
  const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA', {
    stripeAccount: connectedAccountId,  // Pass the connected account to Stripe.js
  });
   
  const ticketAndUser = [ ticket, user];

    console.log("this is what ticket is inside the stripeCreateCheckoutSession function:", ticket);

    const url = 'http://localhost:5001/create-checkout-session'

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

    /*console.log("jsonedResponse in stripeCreateCheckoutSession is:", jsonedResponse);
    if (jsonedResponse.id) {
        console.log("id is:", jsonedResponse.id);
        redirectToStripeCheckout(jsonedResponse.id);
    }
    return jsonedResponse;*/

}

//export async function stripeCreateCheckoutSessionMultiple(cart, totalCartIds ) {


    //const connectedAccountId = 'acct_1QZhoTQAEiW5zVa4'
    //const connectedAccountId = ticket.sellerUser.connectedAccountId;
    //console.log("thsi should be the connectedAccountId needed for the sellerUser inside of the stripeCreateCheckoutSession:", connectedAccountId);

    //should be able to make this dynamic now

     // Initialize Stripe.js with the connected account
  /*const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA', {
    stripeAccount: connectedAccountId,  // Pass the connected account to Stripe.js
  });

  const dataToSend = [cart, totalCartIds];
  console.log("thsi is dataToSend in stripeCreateCheckoutSessionMultiple:", dataToSend);

    console.log("this is what ticket is inside the stripeCreateCheckoutSession function:", ticket);

    const url = 'http://localhost:5001/create-checkout-session-multiple'

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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

//}

/*export async function stripeCreateCheckoutSessionMultiple(cart, totalCartIds) {
    


    

    // Fetch the PaymentIntent client secret from the backend
    const response = await fetch('http://localhost:5001/create-checkout-session-multiple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });
  
    const { clientSecret } = await response.json();
    if (!clientSecret) {
      console.error('Client secret not received from backend');
      return;
    }
  
    // Initialize Stripe.js
    const stripe = await loadStripe('your_publishable_key');
  
    // Confirm the PaymentIntent on the frontend
    //const { error } = await stripe.confirmCardPayment(clientSecret);

    async function handlePayment() {
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret);
      
        if (error) {
          console.error('Payment confirmation error:', error.message);
          return;
        }
      
        if (paymentIntent && paymentIntent.status === 'succeeded') {
          // Redirect to success page with ticket IDs
          const ticketIds = cart.map(item => item.id).join(',');
          window.location.href = `/successPage?ticketIds=${ticketIds}`;
        }
      }
      //handlePayment(clientSecret);
  
    if (error) {
      console.error('Stripe Payment error:', error.message);
      return;
    }
  
    console.log('Payment successful');
    // Redirect or update UI after successful payment
  }*/