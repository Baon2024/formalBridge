import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



//need to get the checkoutId from query params, check the checkoutId to see if transaction was successs
//then decide where to send user - whether to successPage (and how to pass the documentId of ticket bought)


export default function DestinationPage() {

    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const Navigate = useNavigate();

    const { ids } = useParams(); //or the get----byParams one.
    console.log("the ids are: ", ids);

    //const checkoutSessionId =

    //if transaction has processed correctly, then re-direct to successPage, use ids
    // Navigate('/successPage/${ids});

    const location = useLocation(); // Use this to get the current URL
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Use URLSearchParams to parse the query string and get session_id
    const params = new URLSearchParams(location.search);
    const id = params.get('session_id'); // Get session_id from the URL query string
    if (id) {
      setSessionId(id); // Store it in state or handle the next steps
    }
  }, [location]);

  useEffect(() => {
    if (sessionId) {
      // You can now use the sessionId to check the status of the payment
      // Example: Call your backend API to verify the payment status
      console.log('Checkout session ID:', sessionId);
      
      // Call an API or Stripe API to verify the payment status
      // You can use the session ID to retrieve the session details from your backend
      // or from Stripe to determine whether the transaction was successful.
      fetch('http://localhost:5001/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setPaymentStatus('Payment successful!');
            Navigate(`/successPage/${ids}`);
          } else {
            setPaymentStatus('Payment failed or pending.');
          }
        })
        .catch((error) => setError(error.message));
    
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Checkout Complete</h1>
      {sessionId ? (
        <p>Session ID: {sessionId}</p>
      ) : (
        <p>No session ID found in the URL.</p>
      )}
    </div>
  );
};
