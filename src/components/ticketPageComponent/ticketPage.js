//the page for individual tickets
import TicketPageItem from "./ticketPageCentralComponent/ticketPageCentralComponent";
//import { ticketsData } from "../ticketCollectionPage/ticketCollectionPage";
import { Navigate, useParams } from "react-router-dom";
import { fetchTicketsData } from "../APIFunctions/APIFunctions";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TicketPage({ ticketsInventory, setTicketsInventory, cart, setCart }) {

    const [ ticketsData, setTicketsData] = useState([]);
    const [ isInCart, setIsInCart ] = useState(false);
    //Navigate = useNavigate();
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

    function addTicketToCart(ticket) {
        //const ticket = e.target.value;
        //const isInCart = cart.some(cartItem => cartItem.id === ticket.formalTicketID);
        if (!isInCart) {
          setCart(prevCart => [...prevCart, ticket])
          console.log("Now your cart is: ", cart);
        } else {
            console.log("This ticket is already in your cart: ", ticket)
        }
        //dispatch(addToCart(ticket));
      }
    
      useEffect(() => {
        console.log("Updated cart:", cart);
      }, [cart]);

    function buyTicket(ticket) {
        //add the minimum I can before integrating Stripe Connect/Checkout
        /* if (stripe checkout API returns success code) {
          Navigate(`/successPage/${ticket.id}`); - //this should send the ticket details to the page, so png can be retrieved?
          
          //need to actually make the success page first
        
        }*/
    }
    

    return (
      <>
        <div>
          <TicketPageItem
           ticket={ticketToDisplay}
           addTicketToCart={addTicketToCart}
           cart={cart}
           isInCart={isInCart}
          />
        </div>
      </>
    )
    
}

export default TicketPage;