//code for teh thank you page after ticket purchase
import { useParams } from "react-router-dom";
import styles from './successPage.module.css';
import { useSelector, useDispatch } from "react-redux";
import { selectTicketsInventory } from "../../reduxStateComponents/TicketInventorySlice/ticketInventorySlice";
import { useEffect, useState } from "react";
import loadTicketsForInventory from "../../reduxStateComponents/TicketInventorySlice/loadTicketsForInventory";
import { setTicketBought } from "../APIFunctions/APIFunctions";
import { updateBuyerUser } from "../APIFunctions/APIFunctions";
//this page will thank the user, and have a button allowing the user to download their formalTicket PDF
//it will do this by the previous checkout page sending the user here with a dynamic url '/checkout/thankyou/:name' in react router
//which the final bit in the checkout page being '/checkout/thankyou/${formalTicketName}
//so, when page will get the name using useParams(), and then use the name in ticketsInventory[name] to retrive the correct
//ticket in order to get the right url. then, when button is clicked, -- not sure whether file is downloaded from strapi media or ticket's property

function SuccessPage({ticketsInventory}) {

    const { ids } = useParams(); //or the get----byParams one.
    console.log("the ids are: ", ids);
    //const numberId = Number(id);
    const ticketIds = ids.split(',').map(id => id);
    //const ticketIds = ids.split(',').map(id => Number(id));
    console.log("these are your ticket ids: ", ticketIds);
    const dispatch = useDispatch();
    const ticketsInventory2 = useSelector(selectTicketsInventory);
    const [ ticketUpdatesCompleted, setTicketUpdatesCompleted ] = useState(false);

    //I've changed it to use documentId for both single ticjets and multiupel ticjets
    //as just seems safer

    useEffect(() => {
      const fetchTickets = async () => {
        dispatch(loadTicketsForInventory()); // Dispatch the async thunk
        console.log("Tickets loaded and stored in Redux: ", ticketsInventory2);
      };
  
      fetchTickets();

    },[])
    
    //const ticketIdsDenumbered = Number(ticketIds);
    //const ticketsInventory2 = useSelector(selectTicketsInventory);
    console.log("ticketsInventory form useSelector is:", ticketsInventory2);

    const ticketsToDisplay = ticketsInventory2.filter(ticket => ticketIds.includes(ticket.documentId));
    console.log("Tickets to display: ", ticketsToDisplay);

    console.log("thsi is ticketsInventory passed down to successPage:", ticketsInventory);

    //shoukld be able to use id return from stripe purchase, to still display ticket qr
    //and also update ticket for buyerUser and bought properties?
    //just borrow functions to update ticketToDisplay on the database?
    const jwtToken = localStorage.getItem('jwt');
    console.log("token in successPage is:", jwtToken);
    const user1 = localStorage.getItem('user');
    const user = JSON.parse(user1);
    console.log("user in successPage is:", user);
    //const jwtToken = user.token;
    const userId = user.id;
    console.log("userId is:", userId);

   

    /*useEffect(() => {
      if (ticketsToDisplay.length && jwtToken && user && !ticketUpdatesCompleted) {
        // Update each ticket
        ticketsToDisplay.forEach(async (ticket) => {
          try {
            await setTicketBought(ticket, jwtToken);
            await updateBuyerUser(ticket, user, jwtToken);
            console.log(`Successfully updated ticket ${ticket.id}`);
          } catch (error) {
            console.error(`Error updating ticket ${ticket.id}:`, error);
          }
        });
  
        // Mark updates as completed
        setTicketUpdatesCompleted(true);
      }
    }, [ticketsToDisplay, jwtToken, user, ticketUpdatesCompleted]);*/ // - commented out whilst i tets webhook version
    
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
    //if you look at the ticketsToDisplay fields in the console, their .bought and .buyerUser fields aren't updated
    //because ticketsInventory has been passed down from the version fetched on ticketsCollection page
    //rather than after purchase - and that's fine, only need to access the QR code img, so it saves the lag of a new API call

    //need to make sure that multiple tickets from checkout can be retrived form id params.

    /*
    ticketsDownloadNew = idCollection.filter(ticketId => ticketsInventory.find(ticket => ticket.id === ticketId));
    console.log("These are the tickets to display: ", ticketsDownloadNew);
    */ // - will that work??
    //and would need to change returned jsx below, to map every ticket in collection



    /*const ticketToDownload = ticketsInventory.find(ticket => ticket.id === numberId);
    console.log("This is the ticket you have bought: ", ticketToDownload);*/

    //change this to retrieve tickets by their documentID?? strapi 5, and less possible confusion?

    //in order to provide QR codes for multiple tickets, probably need to push each ticket
    //retriveed using id fromt ticketsInventory to an array, and then map that array with ticketCard for each ticket to display

    //for checkout of multiple tickets, need to map every ticket, in order to display each QR code
    //http://localhost:1337/uploads/trinity_a89c430ef9.jpeg
    return (
  <>
    <div className={styles.pageStyling}>
      <p>Your transaction was a success!</p>
      <p>{ticketsToDisplay.length > 1 ? 'Your tickets are:' : 'Your ticket is:'}</p>
      {ticketsToDisplay.length > 0 ? (
        ticketsToDisplay.map(ticket => (
          <div key={ticket.id} className={styles.ticketContainer}>
            <div className={styles.ticketCard}>
              <p>{ticket.formalEventName}</p>
              {ticket.formalTicketQRCode && ticket.formalTicketQRCode.url ? (
                <>
                  <img 
                    src={`http://localhost:1338${ticket.formalTicketQRCode.url}`} 
                    alt="Ticket QR Code" 
                  />
                 <button 
                      className={styles.downloadButton}
                      onClick={() => handleDownload(`http://localhost:1338${ticket.formalTicketQRCode.url}`, ticket.formalTicketQRCode.url.split('/').pop())}
                    >
                      Download QR Code
                  </button>
                </>
              ) : (
                <p>No QR Code available for this ticket.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>No tickets found.</p>
      )}
    </div>
  </>
);
} //need to dynamically display the QR code on the page, is easiest option.

export default SuccessPage;

/*<div>
<img src={`localhost/1337/uploads/${ticketToDownload.formalTicketQR}`} /> 
</div>*/ 











//on eccomerce checkout page before this, will need code that adds the ticket to the ticketsIBought database of the user
//and deletes the ticket form the general ticketsData database.

//- once you've impleneted that feature, the buyer will then have a second way to download their ticket
//as an alternatiev to this download page 