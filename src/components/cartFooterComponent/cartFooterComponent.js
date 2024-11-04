//component for footer for showing cart
import styles from './cartFooterComponent.module.css'
import CartTicket from './cartTicket';
import { useEffect } from 'react';
import { selectCartInventory, addTicketToCart, removeTicketFromCart } from '../../reduxStateComponents/TicketInventorySlice/cartInventorySlice';
import { useSelector, useDispatch } from 'react-redux';

//will need to import the action creator for removeTicket to be used below



function CartFooter({cart, removeTicketFromCart, resetCart}) {

    //const cart = useSelector(selectCartInventory);
    const dispatch = useDispatch();

    //create function to calculate total ticket price
  function calculateTotalPrice(cart) {
    if (!cart || cart.length === undefined) {
        return null
    }
    let summedCart = 0;
    for (const ticket of cart) {
      summedCart+=ticket.formalTicketPrice;
    }
    return summedCart;
   }

  function removeTicketFromCartHandler(ticket) {

    /*setCart((prevCart) => prevCart.filter((item) => item.id !== ticket.id));*/ //correct?
    dispatch(removeTicketFromCart({ id: ticket.id}));
    console.log("Cart state now is: ", cart);
  }

  const cartTotal = calculateTotalPrice(cart);

  useEffect(() => {
    console.log('Cart state now is: ', cart);
  }, [cart]); // Only runs when cart changes

  function checkout() {
    //this function is to allow user to buy a single or multiple tickets that are in their cart
    //will need to map the id of every ticket item in the cart, in order to pass the params, so tickets (and their qr pngs
    // can be retrieved from the 'success page' url params.

    /* 
    first, checkout should only active if user is logged in:
    if (loggedIn) {

      function to map every ticket and combine their Ids into a single variable - see chatgpt suggestion 


      Navigate(/successPage/${totalTicketIDs})
    }
    
    */
    function checkoutTickets(cart) {
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


       const totalCartIds = cart.map(ticket => ticket.id).join(',');
       console.log(totalCartIds);

       const urlEndpoint = totalCartIds;

       Navigate(`/successPage/${urlEndpoint}`);
       const jwtToken = user.token;
       console.log("the jwtToken being inputted into function is: ", jwtToken);
       console.log("the ticket.id you clicked on is: ", ticket.id);
       console.log("the documentId for this ticket is: ", ticket.documentId);
       setCheckoutTicketBought(ticket, jwtToken) // - this needs to be change to pass down cart to the functiom
       //updateBuyerUser(ticket, user);
       updateUserTicketsBought(user, ticket); //- need to fix this next
       console.log("current user is: ", user);
       //updateBuyerUser()
       //updateMyTicketsBought();
       //then should have created the actual purchase workflow - ticket will be removed from display, and accessible to user
       //will then need to do this for checkout method of purchasing
       dispatch(resetCart()); //-need to clear cart to prevent the tickets remaining there after being removed from displayed tickets
       } else if (!user) {
        //need to alert user that they aren't logged in - through pop-up box??
       }
    }
  }

    return (
      <>
        <div className={styles.container}>
          <div className={styles.totalAndNumSum}>
            <div className={styles.total}>
                <span className={styles.cartTotalLabel}>Total</span>
                <span className={styles.cartTotalAmount}>£{cartTotal}</span>
            </div>
            <div className={styles.tickets}>
                <span className={styles.cartTicketsLabel}>Tickets</span>
                <span className={styles.cartTicketsAmount}>{cart.length}</span>
            </div>
          </div>
          <div className={styles.cartTicketsContainer}>
            {cart.map((ticket) => (
                  < CartTicket ticket={ticket} removeTicketFromCartHandler={removeTicketFromCartHandler} key={ticket.id} />
            ))}
          </div>
          <div className={styles.checkoutButtonContainer}>
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        </div>
      </>
    )
}

export default CartFooter;

//create cartTicket component, to feed each cart ticket into - design what info it should show
//make each ticket cart item into a button, so when clicked it can remove from cart?
//change background-color of ticket cart in cart list when hovered over, and change to pointer, to indicate clickability?

//need to decide what design of cart footer looks like?
//need to map each cart item out, some small card, with 'x' button






