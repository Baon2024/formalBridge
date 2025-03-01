import { loadStripe } from "@stripe/stripe-js";



export default async function stripeCreateCheckoutSessionDestinationMultipleEmbedded(cart, totalCartIds, user) {


    const stripe = await loadStripe('pk_test_51QNlAaG7WeMIf1DGKqMw0dAcSmjfnBlJNH3wr8fjyCqmZazDvpOEaNv7yHuHXlEHv3CL9BpTE3kv0JVA7F5lVIhy00EwL9mhQA');

    console.log("cart inside of stripeCreateCheckoutSessionMultiple is:", cart);

    //just pas totalCartIds to backend with cart, and then put them in successUrl

    const cartAndTotalCartIdsAndUser = [ cart, totalCartIds, user ];

    const response = await fetch('http://localhost:5001/create-checkout-session-multiple-embedded', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( cartAndTotalCartIdsAndUser ),
      });
    
      const session = await response.json();

      /* <tr>
              <td className="sticky left-0 bg-background px-6 py-4 font-medium">Scholarships</td>
              {schoolsToCompare.map((school) => (
                <td key={school.schoolName} className="px-6 py-4">
                  {school.scholarships.available ? (
                    <span>
                      Available
                      {school.scholarships.percentageOfFees !== 0 && (
                        <span className="text-muted-foreground"> (up to {school.scholarships.percentageOfFees}%)</span>
                      )}
                    </span>
                  ) : (
                    "Not available"
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky left-0 bg-background px-6 py-4 font-medium">Bursaries</td>
              {schoolsToCompare.map((school) => (
                <td key={school.schoolName} className="px-6 py-4">
                  {school.Bursaries.BursariesAvailable ? (
                    <span>
                      Available
                      {Array.isArray(school.Bursaries?.percentageOfFees) && (
                        <span className="text-muted-foreground">
                          {" "}
                          ({school.Bursaries?.percentageOfFees[0]}-{school.Bursaries?.percentageOfFees[1]}%)
                        </span>
                      )}
                    </span>
                  ) : (
                    "Not available"
                  )}
                </td>
              ))}
            </tr>*/ 

      const secondSession = session.session;
      const clientSecret = secondSession.client_secret;
      
      if (!clientSecret) {
        console.error('Client Secret not received.');
        return;
      }
  
    console.log("Redirecting to /embeddedCheckoutPage with clientSecret:", clientSecret);
    
    return clientSecret;



      /*if (url) {
        window.location.href = url; // Redirect to Stripe-hosted page
      } else {
        console.error('Error creating checkout session');
      }*/


}