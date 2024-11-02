//code for teh thank you page after ticket purchase
import { useParams } from "react-router-dom";
import styles from './successPage.module.css';
//this page will thank the user, and have a button allowing the user to download their formalTicket PDF
//it will do this by the previous checkout page sending the user here with a dynamic url '/checkout/thankyou/:name' in react router
//which the final bit in the checkout page being '/checkout/thankyou/${formalTicketName}
//so, when page will get the name using useParams(), and then use the name in ticketsInventory[name] to retrive the correct
//ticket in order to get the right url. then, when button is clicked, -- not sure whether file is downloaded from strapi media or ticket's property

function SuccessPage({ticketsInventory}) {

    const { id } = useParams(); //or the get----byParams one.
    console.log("the id is: ", id, "and ticketsInventory is: ", ticketsInventory);
    const numerId = Number(id);
    const ticketToDownload = ticketsInventory.find(ticket => ticket.id === numerId);
    console.log("This is the ticket you have bought: ", ticketToDownload);

    //in order to provide QR codes for multiple tickets, probably need to push each ticket
    //retriveed using id fromt ticketsInventory to an array, and then map that array with ticketCard for each ticket to display

    //for checkout of multiple tickets, need to map every ticket, in order to display each QR code
    //http://localhost:1337/uploads/trinity_a89c430ef9.jpeg
    return (
        <>
        <div className={styles.pageStyling}>
            <p>Your transaction was a success!</p>
            <p>Your ticket is {ticketToDownload.formalEventName}</p>
            {ticketToDownload.formalTicketQRCode && ticketToDownload.formalTicketQRCode.url ? (
              <div className={styles.ticketContainer}>
                <div className={styles.ticketCard}>
                  <img 
                    src={`http://localhost:1337${ticketToDownload.formalTicketQRCode.url}`} 
                    alt="Ticket QR Code" 
                  />
                </div>
              </div>
            ) : (
                <p>No QR Code available for this ticket.</p>
            )}
        </div>
        </>
    )
} //need to dynamically display the QR code on the page, is easiest option.

export default SuccessPage;

/*<div>
<img src={`localhost/1337/uploads/${ticketToDownload.formalTicketQR}`} /> 
</div>*/












//on eccomerce checkout page before this, will need code that adds the ticket to the ticketsIBought database of the user
//and deletes the ticket form the general ticketsData database.

//- once you've impleneted that feature, the buyer will then have a second way to download their ticket
//as an alternatiev to this download page