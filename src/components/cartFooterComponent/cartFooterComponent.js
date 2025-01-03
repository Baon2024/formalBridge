//component for footer for showing cart
import styles from './cartFooterComponent.module.css'
import CartTicket from './cartTicket';
import { useEffect } from 'react';
import { selectCartInventory, addTicketToCart, removeTicketFromCart } from '../../reduxStateComponents/TicketInventorySlice/cartInventorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { updateBuyerUser, setTicketBought } from '../APIFunctions/APIFunctions';
import { useNavigate } from 'react-router-dom'; 
import stripeCreateCheckoutSessionDestinationMultiple from '../APIFunctions/stripeCreateCheckoutSessionDestinationMultiple';
//import { stripeCreateCheckoutSessionMultiple } from '../APIFunctions/stripeCreateCheckoutSession';

//will need to import the action creator for removeTicket to be used below



function CartFooter({cart, removeTicketFromCart, resetCart, user}) {

    //const cart = useSelector(selectCartInventory);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

  
    async function checkoutTicketsMultipleStripeHosted(cart) {
       
       console.log("user currently is: ", user);
       if (user) {


       const totalCartIds = cart.map(ticket => ticket.documentId).join(',');
       console.log("this is totalCartIds:", totalCartIds);

       const urlEndpoint = totalCartIds;

       //Navigate(`/successPage/${urlEndpoint}`);
       const jwtToken = user.token;
       console.log("here's the user it will add the ticket to", user);
       console.log("the jwtToken being inputted into function is: ", jwtToken);
       const response = await stripeCreateCheckoutSessionDestinationMultiple(cart, totalCartIds, user) //here, and pass whole cart I think
       //navigate('/successPage?${CHECKOUT_SESSION_ID}', { state: { clientSecret } });

       // - i've commented out the rest of the function, so i can test it in isolation
      /*
       //console.log("the ticket.id you clicked on is: ", ticket.id);
       //console.log("the documentId for this ticket is: ", ticket.documentId);
       cart.map((ticket) => {
        setTicketBought(ticket, jwtToken) // - this needs to be change to pass down cart to the functiom
        //need a console log to check that each ticket has been set to bought
        updateBuyerUser(ticket, user);
        //need a console log to check that each ticket has been added to user: console.log("user now has tickets: , user.myTicketsBought");
       })
       console.log("current user is: ", user);
       //then should have created the actual purchase workflow - ticket will be removed from display, and accessible to user
       //will then need to do this for checkout method of purchasing
       console.log("Navigating to success page...");
       navigate(`/successPage/${urlEndpoint}`);
       dispatch(resetCart()); //-need to clear cart to prevent the tickets remaining there after being removed from displayed tickets
    */
       } else if (!user) {
        //need to alert user that they aren't logged in - through pop-up box??
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
            <button className={styles.checkoutButton} onClick={() => checkoutTicketsMultipleStripeHosted(cart)}>Checkout</button>
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






