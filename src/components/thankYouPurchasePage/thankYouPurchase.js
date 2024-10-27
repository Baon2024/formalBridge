//code for teh thank you page after ticket purchase

//this page will thank the user, and have a button allowing the user to download their formalTicket PDF
//it will do this by the previous checkout page sending the user here with a dynamic url '/checkout/thankyou/:name' in react router
//which the final bit in the checkout page being '/checkout/thankyou/${formalTicketName}
//so, when page will get the name using useParams(), and then use the name in ticketsInventory[name] to retrive the correct
//ticket in order to get the right url. then, when button is clicked, -- not sure whether file is downloaded from strapi media or ticket's property

function ThankYouAfterPurchase() {

    const {name} = useParams(); //or the get----byParams one.
    const ticketToDownload = ticketsInventory[name] //need to pass the ticketsInventory state down

    //then for JSX
    //onClick={eventHandlerToDownload}
    return (
        <>
        <div>
            <button>Download {ticketToDownload.name}</button>
        </div>
        </>
    )
}















//on eccomerce checkout page before this, will need code that adds the ticket to the ticketsIBought database of the user
//and deletes the ticket form the general ticketsData database.

//- once you've impleneted that feature, the buyer will then have a second way to download their ticket
//as an alternatiev to this download page