//the page for individual tickets
import TicketPageItem from "./ticketPageCentralComponent/ticketPageCentralComponent";
//import { ticketsData } from "../ticketCollectionPage/ticketCollectionPage";
import { Navigate, useParams } from "react-router-dom";
import { fetchTicketsData, updateBuyerUser, updateUserTicketsBought } from "../APIFunctions/APIFunctions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailToNotifySeller } from "../userPage/emailFunctionTest";
import { setTicketBought, fetchTicketIdByFilter } from "../APIFunctions/APIFunctions";
import stripeCreateCheckoutSession from "../APIFunctions/stripeCreateCheckoutSession";
import { selectCartInventory, addTicketToCart } from "../../reduxStateComponents/TicketInventorySlice/cartInventorySlice";


function TicketPage({ ticketsInventory, setTicketsInventory, cart, addTicketToCart, user }) {
    

    //const cart = useSelector(selectCartInventory);
    const dispatch = useDispatch();
    const [ ticketsData, setTicketsData] = useState([]);
    const [ isInCart, setIsInCart ] = useState(false);
    //Navigate = useNavigate();
    const Navigate = useNavigate();
    //need to use useParams() or getParams.id to get dynamic item from URL
    const { id } = useParams()
    console.log("The id of the ticket you clicked on is: ", id);

    //should be easier now

    /*useEffect(() => {
        console.log("The id of the ticket you clicked on is: ", id);
        if (id) {
            console.log("Fetching tickets data...");
            fetchTicketsData()
                .then((tickets) => {
                    console.log("Fetched tickets: ", tickets);
                    setTicketsData(tickets);
                })
                .catch((error) => {
                    console.error("Error fetching tickets: ", error);
                });
        }
    }, [id]);*/
   
    
    console.log("the ticketsData is: ", ticketsData);
    const ticketToDisplay = ticketsInventory.find((ticket) => ticket.formalTicketID === id) // and check this works - should be okay as its the index/key
    console.log("The ticket you have selected is: ", ticketToDisplay);


    useEffect(() => {
        const isInCart = cart.some(cartItem => cartItem.id === ticketToDisplay.id);
        setIsInCart(isInCart);
        console.log("isInCart is currently: ", isInCart);
    }, [cart])

    function addTicketToCartHandler(ticket) {
        //const ticket = e.target.value;
        const isInCart = cart.some(cartItem => cartItem.id === ticket.id);
        if (!isInCart) {
          /*setCart(prevCart => [...prevCart, ticket])*/
          dispatch(addTicketToCart(ticket));
          console.log("Now your cart is: ", cart);
        } else {
            console.log("This ticket is already in your cart: ", ticket)
        }
        //dispatch(addToCart(ticket));
      }
    
      useEffect(() => {
        console.log("Updated cart:", cart);
      }, [cart]);

    async function buyTicket(ticket) {
        //add the minimum I can before integrating Stripe Connect/Checkout
        /* if (stripe checkout API returns success code) {
          Navigate(`/successPage/${ticket.id}`); - //this should send the ticket details to the page, so png can be retrieved?
          
          //need to actually make the success page first
        
        }*/
       //API fetch call to add ticket to user's tickets: using user.id and posting it to a property 'myTickets'
       //API fetch call to add 'bought' property to ticket, so its not displayed in ticketsInventory anymore
       //will need to play around and see whcih order works best, if any order causes bugs
       console.log("user currently is: ", user);
       if (user) {
       //Navigate(`/successPage/${ticket.id}`);
       const jwtToken = user.token;
       console.log("the jwtToken being inputted into function is: ", jwtToken);
       console.log("the ticket.id you clicked on is: ", ticket.id);
       console.log("the documentId for this ticket is: ", ticket.documentId);
       const response = await stripeCreateCheckoutSession(ticket, user)
       console.log("response from updateUserTicketsBought is:", response);
       //setTicketBought(ticket, jwtToken) // - works
       //updateBuyerUser(ticket, user); // works
       updateUserTicketsBought(user, ticket); //- need to fix this next
       
       //here add the function to send email to seller notifying of sale - need user of ticketSeller
       console.log("Before checking sellerUser email");
       console.log("email is:", ticket.sellerUser.email);
       if (ticket.sellerUser.email == 'joejoeboyes2013@gmail.com') { //here as placeholder, til you have a resend sub
          sendEmailToNotifySeller(ticket)
         console.log("ready for the email function");
       }
       console.log("current user is: ", user);
       //updateBuyerUser()
       //updateMyTicketsBought();
       //then should have created the actual purchase workflow - ticket will be removed from display, and accessible to user
       //will then need to do this for checkout method of purchasing
       //Navigate(`/successPage/${ticket.id}`); - temporarily disbaled to see if strip function pushes success page
       } else if (!user) {
        //need to alert user that they aren't logged in - through pop-up box??
       }
    }
    

    return (
      <>
        <div>
          <TicketPageItem
           ticket={ticketToDisplay}
           addTicketToCart={addTicketToCartHandler}
           cart={cart}
           buyTicket={buyTicket}
           isInCart={isInCart}
          />
        </div>
      </>
    )
    
}

export default TicketPage;