import * as React from 'react';
import { useLocation } from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');




export default function EmbeddedCheckoutPage(/*{clientSecret}*/){

    const location = useLocation();
  const { clientSecret } = location.state || {};

  if (!clientSecret) {
    return <div>Error: No client secret provided.</div>;
  }

  //const options = {
    /*clientSecret,
    appearance: {
      theme: 'flat',
      variables: {
        colorPrimary: '#5c67f2',
        colorBackground: '#ffffff',
      },
    },
  };*/


  const options = {clientSecret};

  
  
  
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <div style={{ height: '500px', overflowY: 'auto' }}>
        <EmbeddedCheckout />
      </div>
    </EmbeddedCheckoutProvider>
  </div>
  )
}