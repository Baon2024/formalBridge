//component for footer for showing cart
import styles from './cartFooterComponent.module.css'
import CartTicket from './cartTicket';
import { useEffect } from 'react';

//will need to import the action creator for removeTicket to be used below



function CartFooter({cart, setCart}) {

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

    setCart((prevCart) => prevCart.filter((item) => item.id !== ticket.id)); //correct?
    console.log("Cart state now is: ", cart);
  }

  const cartTotal = calculateTotalPrice(cart);

  useEffect(() => {
    console.log('Cart state now is: ', cart);
  }, [cart]); // Only runs when cart changes

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






