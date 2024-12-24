export default async function emailFunctionTest(email, name) {

  console.log("email value passed to test email function os:", email);
  console.log("name value passed to test email function os:", name);


    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        //setSuccessMessage(data.message);
      } else {
        //setErrorMessage(data.error?.message || 'Something went wrong.');
      }
    } catch (error) {
      //setErrorMessage('Something went wrong.');
      console.error('Error sending email:', error);
    }
}

export async function sendEmailToNotifySeller(ticket) {

    console.log("ticket value passed to test email function os:", ticket);
    //console.log("name value passed to test email function os:", name);
    const email = ticket.sellerUser.email;
  
    //const type = 'notify seller that their ticket has been bought';

      try {
        const response = await fetch('http://localhost:5001/api/confirm-ticket-sold', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ticket,
            email
          }),
        });
  
        const data = await response.json();
  
        if (data.success) {
          //setSuccessMessage(data.message);
        } else {
          //setErrorMessage(data.error?.message || 'Something went wrong.');
        }
      } catch (error) {
        //setErrorMessage('Something went wrong.');
        console.error('Error sending email:', error);
      }
  }