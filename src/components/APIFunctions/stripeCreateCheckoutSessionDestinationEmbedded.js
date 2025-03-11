//import redirectToStripeCheckout from "./stripeRedirectToCheckout";
import { loadStripe } from '@stripe/stripe-js';
//import { useNavigate } from 'react-router-dom';


export default async function stripeCreateCheckoutSessionDestinationEmbedded(ticket, user) {

    //const navigate = useNavigate(); // Use React Router's navigate function
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

    const url = 'http://localhost:5001/create-checkout-session-destination-embedded';

    try {

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

    const secondSession = session.session;
    console.log("secondSession is:", secondSession);

    const sessionId = session.id;
    const clientSecret = secondSession.client_secret;
    console.log("clientSecret in stripeCreateCheckoutSessionDestinationEmbedded is:", clientSecret);


    console.log("sessionId in stripeCreateCheckoutSession is:", sessionId);
    const altSessionId = JSON.stringify(sessionId);
    console.log("altSessionid is:", altSessionId);

    console.log("connectedAccountId just before stripe.redirectToCheckout is:", connectedAccountId);

   
    if (!clientSecret) {
        console.error('Client Secret not received.');
        return;
      }
  
    console.log("Redirecting to /embeddedCheckoutPage with clientSecret:", clientSecret);
    
    return clientSecret;

     // Redirect to the embedded checkout page and pass the clientSecret in state
     //navigate('/embeddedCheckoutPage', { state: { clientSecret } });
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
    

}

