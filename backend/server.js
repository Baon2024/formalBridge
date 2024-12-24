import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Resend } from "resend";
import cors from 'cors';
import { render } from "@react-email/render";
//import WelcomeEmail from "../emails/welcomeEmail";

dotenv.config(); // Load environment variables

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

console.log(process.env.RESEND_API_KEY); // Check if the API key is loaded

// Middleware
app.use(bodyParser.json());
app.use(cors());

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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));