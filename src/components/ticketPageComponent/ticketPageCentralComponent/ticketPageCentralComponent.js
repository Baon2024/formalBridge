import styles from './ticketPageCentralComponent.module.css';
import { useEffect } from 'react';
//import { useDispatch } from 'redux'; //is this how??

//need to change styling to {style.----} and change to camelCase in the css file
function TicketPageItem({ticket, addTicketToCart, cart, isInCart}) {
  //probably ideal to use the useDispatch() hook to save having to filter it down from app.js??

  //const dispatch = useDispatch();

  

  console.log("Here's the ticket that will be displayed: ", ticket);
  
  //const isInCart = cart.some(cartItem => cartItem.id === ticket.formalTicketID);
  
  /*
  useEffect(() => {
    
    //function to check whether cart contains ticket. if it does, #cartButton is inactive with different styling
    //if it isn't, #cartButton is active with different styling

    const cartContainsTicket = cart.find((item) => item.id === ticket.formalTicketID )

    then applying in the jsx below: className={ cartContainsTicket ? style1 : style 2}
    and in terms fo code to deactivate button?

    const isInCart = cart.some(cartItem => cartItem.id === ticket.formalTicketID);
    
    }, [cart])
  */


  console.log("this is the value of isInCart in child: ", isInCart);
  return (
    <>
      {ticket ? ( // Use a conditional (ternary) operator for clearer renderin
      <>
      <div className={styles.container}>
        <img src={`http://localhost:1337/${ticket.formalTicketCollegeBackgroundImage.url}`} id={styles.backgroundImage} />
        <div className={styles.ticketPageItem} value={ticket}>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.EventName}>{ticket.formalEventName}</span>
              <span className={styles.collegeName}>{ticket.formalTicketCollege}</span>
            </div>
            <div className={styles.info}>
              <span className={styles.ticketTime}>{ticket.formalTicketTime}</span>
              <span className={styles.ticketDate}>{ticket.formalTicketDate}</span>
            </div>
            <div className={styles.info}>
              <span className={styles.ticketPrice}>{ticket.formalTicketPrice}</span>
              <span className={styles.dietary}>{ticket.formalTicketDietary}</span>
            </div>
            <div className={styles.buttonContainer}>
              <button className={ isInCart ? styles.addedToCartButton : styles.addToCartButton} disabled={isInCart} onClick={() => addTicketToCart(ticket)}>
              {isInCart ? "Added to Basket" : "Add to Basket"} <img src="./assets/container.svg" className={styles.icon} />
              </button>
              <button className={styles.buyButton}>buy</button>
            </div>
          </div>
        </div>
      </div>
      </>
      ) : (
        <div>No ticket found.</div> // Optional: You can show a message if the ticket doesn't exist
      )}
    </>
  );
}

 export default TicketPageItem;