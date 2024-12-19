



async function fetchTicketsData() {

    const url = 'http://localhost:1338/api/formal-tickets?populate=*';
    //const url = 'http://localhost:1337/api/formal-tickets?populate=buyerUser,sellerUser,*';
    //const url = 'http://localhost:1337/api/formal-tickets?populate=buyerUser,sellerUser,formalTicketCollegeBackgroundImage,formalTicketQRCode';
    //'?populate=*' is required to return media

    //implement 'pending/failed/successful' hooks, so when pending is true you can display a load icon in container body
   
   try {
   const response = await fetch(url, {
     method: "GET",
     headers: {
         "Content-type": "application/json",
     },
   });
 
   if (!response.ok) {
     const errorData = await response.json();
     throw new Error(errorData.message || "Network response was not ok");
   }
 
   const jsonResponse = await response.json();
     const entries = jsonResponse.data; // Accessing the 'data' array
     console.log("Data retrieved:", entries);
     return entries;
  } catch (error) {
    console.log("Error:", error);
  }
}

async function setTicketBought(ticket, jwtToken) {

    const documentId = ticket.documentId; 

    try {
        const response = await fetch(`http://localhost:1338/api/formal-tickets/${documentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwtToken}`
          },
          body: JSON.stringify({
            data: {
              bought: true
            }
          })
        });
    
        if (!response.ok) {
          throw new Error(`Failed to update ticket: ${response.statusText}`);
        }
    
        const updatedTicket = await response.json();
        console.log('Ticket updated successfully:', updatedTicket);
        return updatedTicket;
      } catch (error) {
        console.error('Error updating ticket:', error);
        throw error;
      }
}

async function fetchTicketIdByFilter(ticketId, jwtToken) {
    const url = `http://localhost:1338/api/formal-tickets?filters[id][$eq]=${ticketId}`;
    
    console.log('Fetching ticket with ID:', ticketId);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch ticket: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data);
      if (data.data.length === 0) {
        throw new Error('Ticket not found');
      }
  
      return data.data[0].id;
    } catch (error) {
      console.error('Error fetching ticket:', error);
      throw error;
    }
  }

  async function updateBuyerUser(ticket, user) {
  
    const ticketDocumentId = ticket.documentId;
    const userDocumentId = user.user.documentId; //needs to be user.user.documentId
    const token = user.token;
    //console.log("the userDocumentId is: ", userDocumentId);

    try {
        const response = await fetch(`http://localhost:1338/api/formal-tickets/${ticketDocumentId}?populate=buyerUser`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    //bought: true, // Set bought to true
                    buyerUser: userDocumentId, // Assign the user's documentId to buyerUser
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update ticket: ${response.statusText}`);
        }

        const updatedTicketData = await response.json();
        console.log('Ticket updated successfully:', updatedTicketData);
        return updatedTicketData; // Return the updated ticket data
    } catch (error) {
        console.error("Error updating ticket buyer:", error);
        throw error; // Rethrow the error for further handling if needed
    }

  }
  
  async function updateUserTicketsBought(user, ticket) {

    const ticketDocumentId = ticket.documentId;
    const userDocumentId = user.user.documentId;
    const userId = user.user.id;

    try {
        // Fetch the user data first to get the current MyTicketsBought
        const userResponse = await fetch(`http://localhost:1338/api/users/me?populate=*`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
        });

        if (!userResponse.ok) {
            throw new Error(`Failed to fetch user data: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();

        // Update the user's MyTicketsBought to include the new ticket
        const updateResponse = await fetch(`http://localhost:1338/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`, // Include JWT token for authentication
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    myTicketsBought: [...(userData.MyTicketsBought || []), ticketDocumentId], // Add the new ticket ID
                },
            }),
        });

        if (!updateResponse.ok) {
            throw new Error(`Failed to update user: ${updateResponse.statusText}`);
        }

        const updatedUserData = await updateResponse.json();
        console.log('User updated successfully:', updatedUserData);
        return updatedUserData; // Return the updated user data
    } catch (error) {
        console.error("Error updating user tickets bought:", error);
        throw error; // Rethrow the error for further handling if needed
    }
};

async function createNewTicket(newTicket, user) {
    console.log("API call initiated: createNewTicket");

    const url = 'http://localhost:1338/api/formal-tickets';
    const token = user.token; //- check this is the correct path?
    console.log("the token you are using is: ", token);
    console.log("the ticket you are trying to add is: ", newTicket);

    const ticketData = { data: newTicket };

    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(ticketData),
    })
        //const data = response.json();
        //return data;
        return response;
        console.log("this is the response abotu to be returned: ", response);
    } catch (error) {
        console.log(error);
    }
}



export { fetchTicketsData, setTicketBought, fetchTicketIdByFilter, updateBuyerUser, updateUserTicketsBought, createNewTicket };