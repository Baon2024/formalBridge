import { loadStripe } from "@stripe/stripe-js";



export default async function stripeCreateCheckoutSessionDestinationMultiple(cart, totalCartIds, user) {


    const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');

    console.log("cart inside of stripeCreateCheckoutSessionMultiple is:", cart);

    //just pas totalCartIds to backend with cart, and then put them in successUrl

    const cartAndTotalCartIdsAndUser = [ cart, totalCartIds, user ];

    const response = await fetch('http://localhost:5001/create-checkout-session-multiple', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( cartAndTotalCartIdsAndUser ),
      });
    
      const { url } = await response.json();
    
      if (url) {
        window.location.href = url; // Redirect to Stripe-hosted page
      } else {
        console.error('Error creating checkout session');
      }


}