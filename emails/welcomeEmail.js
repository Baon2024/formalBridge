// emails/WelcomeEmail.jsx

import { Html, Head, Body, Container, Text, Button } from "@react-email/components";

const WelcomeEmail = ({ name}) => {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "Arial, sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
          <Text style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
            Welcome, {name}!
          </Text>
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
            Thank you for joining us at our website. We're excited to have you on board.
          </Text>
          <Text style={{ fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
            To get started, visit our site and explore the features we offer:
          </Text>
          <Button
            pX={20}
            pY={10}
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              borderRadius: "5px",
              textDecoration: "none",
              display: "inline-block",
              marginTop: "20px",
            }}
           
          >
            Visit Now
          </Button>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;
