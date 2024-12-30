import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Resend } from "resend";
import Stripe from "stripe"; // Correct way to import Stripe in ES modules
import cors from 'cors';
import { render } from "@react-email/render";

//import APIFunctionsForBackend from '../backend/APIFunctionsForBackend.js';
//const APIFunctionsForBackend = import('./APIFunctionsForBackend'); 
//import { setTicketBought } from "../src/components/APIFunctions/APIFunctions.js";
//import { updateBuyerUser } from "../src/components/APIFunctions/APIFunctions.js";
//import WelcomeEmail from "../emails/welcomeEmail";
import { setTicketBought, updateBuyerUser } from "./APIFunctionsForBackend.js";

//const setTicketBought = APIFunctionsForBackend;
//const updateBuyerUser = APIFunctionsForBackend;

//const { setTicketBought, updateBuyerUser } = APIFunctionsForBackend;

dotenv.config(); // Load environment variables

let globalUser, globalTicket;

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

//console.log(process.env.RESEND_API_KEY); // Check if the API key is loaded
//const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = 'whsec_d841e887e13b7130ce9da8227aafc1a2c38c9289b03f48f955943ed25a67adc6';
  //replace this with the secret from the webhooks section of the Stripe Dashbord when you switch from 'test' to 'live'

// Middleware
//app.use(bodyParser.json());
app.use(cors());
//app.use('/webhook', bodyParser.raw({ type: 'application/json' }));

/*app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // Skip JSON body parsing for /webhook
  } else {
    bodyParser.json()(req, res, next); // Apply JSON parsing to other routes
  }
});*/
app.use('/webhook', bodyParser.raw({ type: 'application/json' }));
app.use(bodyParser.json());


// API endpoint to send an email
app.post("/api/send-email", async (req, res) => {
    console.log(req.body)
    //stdout.write(req.body); 
if (!req.body.type) {
  const { email, name } = req.body;

  try {
    // Render the email template using React Email
    //const emailHtml = render(<WelcomeEmail name={name} />);

    if (!email || !name) {
        return res.status(400).json({ success: false, message: "Email and name are required." });
      }
    

    const emailHtml = `
    <html>
      <body>
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for joining us at our website. We're excited to have you!</p>
      </body>
    </html>
  `;


    // Send the email using Resend API
    const response = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Verify your email",
      html: emailHtml,
    });

    res.status(200).json({ success: true, message: "Email sent!", response });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}

});

app.post('/api/confirm-ticket-sold', async (req, res) => {

    const { ticket, email } = req.body;

    const emailHtml = `
      <html>
        <body>
          <h1>Your ticket has been bought!</h1>
          <p>${ticket.formalEventName} has been bought!</p>
        </body>
      </html>
    `;

try {
    // Send the email using Resend API
    const response = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "your ticket has been sold",
        html: emailHtml,
      });
  
      res.status(200).json({ success: true, message: "Email sent!", response });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    }


})




// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*const stripe = import("stripe")(
    // This is your test secret API key.
    'sk_test_51QNlAaG7WeMIf1DGWcfnC8nYS9rHZVfB55lhSFZ0fNFWjsbkjIpsPYAaeQmK2GyOOJL8FI32LlW926jtwyq4nsuV000FAqeymS',
    {
      apiVersion: "2023-10-16",
    }
  );*/
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  });

  app.post("/account_link", async (req, res) => {
    try {
      const { account } = req.body;
  
      const accountLink = await stripe.accountLinks.create({
        account: account,
        return_url: `http://localhost:3006/`,
        refresh_url: `http://localhost:3006/refresh/${account}`,
        type: "account_onboarding",
      });

      console.log("yje accountLink object returned is:", accountLink);
  
      res.json(accountLink);
    } catch (error) {
      console.error(
        "An error occurred when calling the Stripe API to create an account link:",
        error
      );
      res.status(500);
      res.send({ error: error.message });
    }
  });


  app.post("/account", async (req, res) => {
    try {
      const account = await stripe.accounts.create({
        controller: {
          stripe_dashboard: {
            type: "none",
          },
          fees: {
            payer: "application"
          },
          losses: {
            payments: "application", // Specify who controls losses for payments
          },
          requirement_collection: "application",
        },
        capabilities: {
            card_payments: {requested: true},
          transfers: {requested: true}
        },
        country: "GB",
      });
      
      console.log("Stripe function to create account returned this:", account); // Log before sending the response
      res.json({
        account: account.id,
      });
    } catch (error) {
      console.error(
        "An error occurred when calling the Stripe API to create an account",
        error
      );
      res.status(500);
      res.send({ error: error.message });
    }
  });


  app.post('/create-checkout-session', async (req, res) => {


    //i think i need to get the ticket details by sending them in the call
    console.log("this is what has been recieved form the stripeCreateCheckoutSession function:", req.body);

    //const ticket = req.body;

    //rebuild that array, to contain the ticket and user
    const ticketAndUser = req.body;
    const ticket = ticketAndUser[0];
    console.log("ticket is:", ticket);
    globalTicket = ticket;
    const user = ticketAndUser[1];
    
    console.log("user is:", user);
    globalUser = user;


    const { formalEventName, formalTicketPrice, id, documentId } = ticket;
    const connectedAccountId = ticket.sellerUser.connectedAccountId;
    console.log("connectedAccountId taken from req.body is:", connectedAccountId);
    //const connectedAccountId  = ticket.sellerUser.connectedAccountId;
    console.log("thsi is what connectedAccountId is:", connectedAccountId);
    console.log("this is what formalEventName, formalTictePrice and id are in server.js backend:", formalEventName, formalTicketPrice, id);

    //const productName = req.body.formalEventName;
    //const connectedAccountId = 'acct_1QaRMQ4fOg1LtcNe';

    //const connectedAccountId = 'acct_1QZhoTQAEiW5zVa4' //this is one user, to let me make this stripe api function work first

    //if this works, then need to find out how to pass the neccessary details on correctly

    //access connectedAccountId as a property of the sellerUser, accessed through the ticket
  try {
  const session = await stripe.checkout.sessions.create(
    {
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: formalEventName,
            },
            unit_amount: 1000, //this is the price
          },
          quantity: 1,
        },
      ],
      payment_intent_data: {
        application_fee_amount: 1, //this is my cut
      },
      mode: 'payment',
      success_url: `http://localhost:3006/successPage/${documentId}`, //rdirect to /successpage/${documentId}
      //need to redirect customer to the above url returned in response
      //and then id should enable correct ticket to be selected, and display qr/download
      //and could then update buyerUser and bought status in that page instead?
    },
    {
      stripeAccount: connectedAccountId, //this is the seller - presumably i get this info from ticket, so modify uploadTickjt to add stripe accountConnectedId??
    }
  );
  console.log("stripeAccount is:", connectedAccountId);
  console.log("Stripe session created:", session);
    console.log("id for sessionId is:", session.id);
  res.json({ id: session.id });

  } catch (error) {
    console.error("Error creating Stripe Checkout session:", error.message);
    res.status(500).send("Error creating Stripe Checkout session");
  }

})

app.post('/webhook', express.raw({type: 'application/json'}), (req, res) => { 

  let event = req.body;
  //let eventTrial = req.body;
  console.log("webhook event is:", event);

  const signature = req.headers['stripe-signature'];

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      endpointSecret
    );
  } catch (err) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return res.sendStatus(400);
  }

  //console.log("webhook event after constructEvent is:", event);

  //console.log("the value of eventTrial is:", eventTrial);
  //if this works fine, can replace the simple event assignement, with this safe/protected version;

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      // setTicketBought
      // updateBuyerUser
      
      
      break;
    case 'checkout.session.completed':
      console.log("this is the stage to add updateBuyerUser and setTicketBought");

      console.log("the value of user within the checkout.session.completed condition is:", globalUser);
      console.log("the value of ticket within the checkout.session.completed condition is:", globalTicket);

      const jwtToken = globalUser.token;
      console.log("value of token from globalUser,token is:", jwtToken);

      if (globalTicket && globalUser) {
      
      setTicketBought(globalTicket, jwtToken);
      updateBuyerUser(globalTicket, globalUser, jwtToken);
      }

      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();


})



/*app.post('/create-checkout-session-multiple', async (req, res) => {
    
    
    const { cart } = req.body;
    console.log("the cart object recieved in the server in create-checkout-session-multiple endpoint is:", cart);
  
    try {
      // Calculate total price for the cart
      const totalAmount = cart.reduce((total, item) => total + item.formalTicketPrice, 0);
  
      // Create a single PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalAmount, // Total amount in cents
        currency: 'gbp',
        payment_method_types: ['card'],
      });
  
      // After the payment is successful, distribute the funds
      const transferResults = await Promise.all(
        cart.map(async (item) => {
          return stripe.transfers.create({
            amount: item.formalTicketPrice, // Amount for each ticket
            currency: 'gbp',
            destination: item.sellerUser.connectedAccountId, // Connected account for the seller
          });
        })
      );
  
      res.json({ clientSecret: paymentIntent.client_secret, transferResults });
    } catch (error) {
      console.error('Error creating checkout session for multiple tickets:', error);
      res.status(500).send('Internal Server Error');
    }
  });*/