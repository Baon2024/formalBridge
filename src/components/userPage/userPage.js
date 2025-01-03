//page for all the users' detaisl - lets make this a single page, just with many components
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchUserDetails, fetchUserDetailsTrial } from "./login/relevantAPIFunctions";
import { fetchTicketsData } from "../APIFunctions/APIFunctions";
import { addInfoForStripe, createStripeAccount } from "./stripeFunctions";
import styles from './userPage.module.css';
import emailFunctionTest from "./emailFunctionTest";
import addConnectedAccountIdToUser from "./addConnectedAccountIdToUser";
import { loadConnectAndInitialize } from "@stripe/connect-js";
//import { ClassicTicket } from "./classicTicket";


//obviously use useParams() to get current user, and show their stuff
//best to get all the users in this page, by making Fetch API request here, rather than passing it down as a global state

//and will need to retrieve the 'my tickets listed' and 'my tickets bought' properties and feed them to each component

function UserPage({user, setUser}) {

  //user the id from the params to make fetch API to users collection, in order to get update to date user props.
  //const { id } = user.user;
  //const { token } = user; //I changed it, as id wasn't being used, and token can be accessed from localStorage
  //doesn't seem to cause any problems so far, and allows the user to re-load page without causing error
  const token = localStorage.getItem('jwt');
  //console.log(token);
  const [ userData, setUserData ] = useState(null);
  const [ newPrice, setNewPrice ] = useState(null);
  const [ newPriceVisibility, setNewPriceVisibility ] = useState(null);
  const [ ticketsToDisplayForBoughtTicket, setTicketsToDisplayForBoughtTickets ] = useState(null);
  const [ ticketsToDisplayForListedTickets, setTicketsToDisplayForListedTickets ] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);
  const navigate = useNavigate();
  const [accountLinkCreatePending, setAccountLinkCreatePending] = useState(false);
  const [error, setError] = useState(false);
  const [connectedAccountId, setConnectedAccountId] = useState();
const [accountCreatePending, setAccountCreatePending] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(null);

  const handleOpenModal = (documentId) => {
    setIsModalOpen(documentId);
  };

  const handleCloseModal = () => {
    setIsModalOpen(null);
  };
  
  console.log("token passed down as params is:", token);
 
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userDataToSet = await /*fetchUserDetails(token)*/ fetchUserDetailsTrial(token);
        console.log("User data retrieved:", userDataToSet);
        setUserData(userDataToSet);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const filterTicketsBought = async () => {
      if (!userData?.myTicketsBought) return;

      const results = await fetchUserDetailsTrial(token);
      console.log("here athe thres RESULTS:", results);

      const collectionOfBoughtTickets = userData.myTicketsBought;
      const collectionOfListedTickets = userData.myTicketsListed;
      const collectionOfDocumentIdsForBoughtTickets = collectionOfBoughtTickets.map(ticket => ticket.documentId);
      const collectionOfDocumentIdsForListedTickets = collectionOfListedTickets.map(ticket => ticket.documentId);

      try {
        const tickets = await fetchTicketsData();
        console.log("Tickets fetched from fetchTicketsData():", tickets);

        const normalizedDocumentIdsBought = collectionOfDocumentIdsForBoughtTickets.map(docId => docId.toString());
        const normalizedDocumentIdsListed = collectionOfDocumentIdsForListedTickets.map(docId => docId.toString());
        const ticketsToAssignBought = tickets.filter(ticket => {
          const ticketDocumentId = ticket.documentId?.toString();
          return normalizedDocumentIdsBought.includes(ticketDocumentId);
        });
        const ticketsToAssignListed = tickets.filter(ticket => {
          const ticketDocumentId = ticket.documentId?.toString();
          return normalizedDocumentIdsListed.includes(ticketDocumentId);
        });

        console.log("Filtered tickets for bought tickets:", ticketsToAssignBought);
        console.log("Filtered tickets for listed tickets:", ticketsToAssignListed);
        setTicketsToDisplayForBoughtTickets(ticketsToAssignBought); // Assign filtered tickets to state
        setTicketsToDisplayForListedTickets(ticketsToAssignListed);
      } catch (error) {
        console.error("Error filtering tickets:", error);
      }
    };

    filterTicketsBought();
  }, [userData]);

  //now get tickets, and then filter by these ids

  //probably easiest way to get tickets, is to make request to get user details with 
  //relation fields upon loading this page, and setuserData using the return result. 
  
  console.log("userData is: ", userData);

    function handleLogOut() {
      localStorage.removeItem('jwt');
      localStorage.removeItem('user');
      setUser(null);
      navigate("/");
    }

  //need to put a log-out button here, which redirects to homepage once logged out.
  const handleDownload = async (url, fileName) => {
    // Fetch the image as a Blob
    const response = await fetch(url);
    const blob = await response.blob();

    // Create an Object URL for the Blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName; // Set the filename for the download

    // Trigger the download
    link.click();
  };
  
  async function cancelTicketHandler(ticket) {
    const documentId = ticket.documentId;
    //const ticketId = ticket.id;
    const url = `http://localhost:1338/api/formal-tickets/${documentId}`;
    //check url
    //const token = user.toke;
    console.log("this is the value of token passed to the delete function: ", token);
    console.log("and here is the ticketID passed: ", documentId);
    
    try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

    })

   // Check if the deletion was successful
   if (response.status === 204) {
    console.log(`Ticket ${documentId} successfully deleted.`);
    
    // Update state to reflect deletion
    setUserData(prevUserData => ({
      ...prevUserData,
      myTicketsListed: prevUserData.myTicketsListed.filter(t => t.id !== ticket.id),
    }));

    alert('Ticket successfully cancelled.');
  } else {
    // Handle unexpected responses
    const responseBody = await response.json();
    console.error('Failed to delete the ticket:', responseBody);
    throw new Error(responseBody.error || 'Failed to delete the ticket.');
  }
} catch (error) {
  console.error('Error deleting the ticket:', error);
  alert('Failed to cancel the ticket listing. Please try again.');
}
    //then will need to check that ticket has actually been deleted. 
    //and will need a general state that enables/disables cancel and change buttons if end time has already passed
    // { formalEventTime > date.now() ? 'true' : 'false'} //that kind of thing, though get chatgpt to give you the code
    // and use same enable/disabled state to gray out ticket visually if past end time. 
  }

  async function changeTicketPriceHandler(ticket) {

    //need an input box to become visible, with an accompaning button, so they can click and update
    //setNewPriceVisibility(ticket.id);
    setNewPriceVisibility(newPriceVisibility === ticket.id ? null : ticket.id);
  }

  async function newPriceHandler(ticket) {
    const documentId = ticket.documentId;
    console.log("this is what documentId is being passed to change function: ", documentId);
    const updatedPrice = newPrice;  // Get the updated price from the state (which was set by the input field)
    
    if (!updatedPrice) {
      alert('Please enter a valid price.');
      return;
    }
  
    const url = `http://localhost:1338/api/formal-tickets/${documentId}`;
  
    try {
      // Send PUT request to update ticket price
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Assuming the price field is called 'price' in your ticket schema
          data: { formalTicketPrice: updatedPrice },
        }),
      });
  
      if (response.ok) {
        // Update was successful
        const updatedTicket = await response.json();
  
        // Update local state or userData to reflect the new price
        // Assuming the 'myTicketsListed' array in userData holds the ticket listings
        setUserData((prevUserData) => ({
          ...prevUserData,
          myTicketsListed: prevUserData.myTicketsListed.map((ticketItem) => {
            if (ticketItem.id === ticket.id) {
              return { ...ticketItem, formalTicketPrice: updatedPrice }; // Update the price
            }
            return ticketItem;
          }),
        }));
  
        // Optionally, you can update other parts of your UI, like resetting the input visibility
        setNewPriceVisibility(null); // Hide the input field after update
  
        alert('Ticket price updated successfully!');
      } else {
        // Handle failure response
        const error = await response.json();
        alert(`Failed to update price: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error updating price:', error);
      alert('Failed to update ticket price. Please try again later.');
    }
  }

  console.log("here are the ticketsToDisplayForBoughtTickets, ", ticketsToDisplayForBoughtTicket);
  const myTicketsBought = userData?.myTicketsBought; /*ticketsToDisplayForBoughtTicket;*/
  const myTicketsListed = userData?.myTicketsListed; /*ticketsToDisplayForListedTickets;*/
  console.log("your my TicketsBought are: ", myTicketsBought);


  //if current time is after end of formalEventtime and date, then need to disable ability to change price or remove listing

  function testEmail(e) {

    e.preventDefault();

    const email = userData.email;
    console.log("email is: ", email);
    const name = userData.username;
    console.log("name is:", name);

    emailFunctionTest(email, name)
  }

  async function stripeOnboardingHandler() {
    if (!userData.connectedAccountId) {
    const response = await createStripeAccount(setError, setAccountCreatePending, setAccountLinkCreatePending, setConnectedAccountId); 
    console.log("this is what the response returned from createStripeAccount is:", response);
    //function to add connectedAccountId to user's account/profile in database
    //then would need to make sure useEffect for fetching user through api call triggers
    console.log("connectedAccountId:", connectedAccountId);
    console.log("userData.connectedAccountId:", userData.connectedAccountId);
    if (response && !userData.connectedAccountId) {
      const updateResponse = await addConnectedAccountIdToUser(userData, response, token);
      console.log("Updated user profile with connectedAccountId:", updateResponse);
    }
    
    const nextResponse = await addInfoForStripe(response, setError, setAccountLinkCreatePending);
    //connectedAccountId may not be updated quick enough, so using response instead as param
    //response being the returned connectedAccountId from the function directly
    }
  }

  async function editStripeAccountHandler() {
    const nextResponse = await addInfoForStripe(userData.connectedAccountId, setError, setAccountLinkCreatePending);
  }
  //there's a problem, where the function sometimes doesn't work when called first time
  //but does work when called secodn time

    return (
      <>
        <div className={styles.topContainer}>
          { connectedAccountId && (
            <p>{connectedAccountId}</p>
          )}
          <button onClick={handleLogOut}>Log Out</button>
          <button onClick={testEmail}>send test email - when gmail email </button>
          
          {!userData?.connectedAccountId ? (
        <button onClick={stripeOnboardingHandler}>Add Stripe Account</button>
      ) : (
        // Only show Edit Stripe Account button if connectedAccountId exists
        <button onClick={editStripeAccountHandler}>Edit Stripe Account</button>
      )}
        </div>
        <div>
          <button>
            <Link to="/uploadTicket"><p>Sell your Ticket</p></Link>
          </button>
        </div>
        <div className={styles.ticketsBought}>
          { /*userData*/ user && userData ? (
          <>
            <p>data has been returned</p>
            <p>{/*userData.email*/ userData.email}</p>
            <div className={styles.boughtAndListedTickets}>
              <div className={styles.boughtListedBox}>
                <p>Your bought ticket are: </p>
                { myTicketsBought && myTicketsBought.map((ticket) => (
    <>
      <div className={styles.ticketsBoughtCard} key={ticket.id}>
        <div className={styles.imageAndTextBox}>
          <div>
            {/* need to have <Img /> here, for formalTicketBackgroundImage*/ } 
            <div
              style={{
              backgroundImage: `url(http://localhost:1338${ticket.formalTicketCollegeBackgroundImage?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '200px', // Adjust height based on your design needs
            }}
            className={styles.ticketImage}
            />
          </div>
          <p>{ticket.formalEventName}</p>
          <p>{ticket.formalTicketCollege}</p>
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={() => handleDownload(`http://localhost:1338${ticket.formalTicketQRCode.url}`, ticket.formalTicketQRCode.url.split('/').pop())}>
            download ticket
          </button>
          <button onClick={() => handleOpenModal(ticket.documentId)}>View Ticket</button>
          {isModalOpen === ticket.documentId && (
<div className={styles.overlay} onClick={handleCloseModal}>
<div
className={styles.modal}
onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
>
<button className={styles.closeBtn} onClick={handleCloseModal}>
  X
</button>
<img
  src={`http://localhost:1338${ticket.formalTicketQRCode?.url}`}
  alt="Ticket QR Code"
  className={styles.qrImage}
/>
</div>
</div>
)}
          <button>report problem</button>
        </div>
      </div>
    </>
  ))} 
              </div> 
              <div>
                <p>Your listed tickets are</p>
                { myTicketsListed && myTicketsListed.map((ticket) => (
                  <>
                    <div key={ticket.id} className={styles.ticketsListedCard}>
                      <p>{ticket.formalEventName}</p>
                      <p>{ticket.formalTicketCollege}</p>
                      <p>£{ticket.formalTicketPrice}</p>
                      <div
                            style={{
                            backgroundImage: `url(http://localhost:1338${ticket.formalTicketCollegeBackgroundImage?.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '200px', // Adjust height based on your design needs
                      }}
                      className={styles.ticketImage} 
                       />
                      <button onClick={() => changeTicketPriceHandler(ticket)}>change price</button>
                      {newPriceVisibility === ticket.id && (
                        <div className={styles.updatePriceVisible}>
                          <input className={styles.changePriceBox} value={newPrice || ''} onChange={(e) => setNewPrice(e.target.value)}/>
                          <button onClick={() => newPriceHandler(ticket)}>Update Price</button>
                        </div>
                        )}
                      <button onClick={() => cancelTicketHandler(ticket)}>cancel ticket listing</button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </>
        ) : (
          <p>no user data</p>
        )}
      </div>
      </>
    )
}

//and whatever other categories are needed, like resetting user details and stuff
export default UserPage;

/*  */