import React from "react"
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export default function Home({user}) {
  
  console.log("user in Home page is:", user);
  //console.log("user.connectedAccountId in Home page is:", user.user.connectedAccountId);

  let connectedAccountId;

  const quickerUser = localStorage.getItem('user'); // This retrieves a string
  if (quickerUser) {
      const parsedUser = JSON.parse(quickerUser); // Parse the string back into an object
      connectedAccountId = parsedUser?.connectedAccountId; // Now you can access the property
      console.log("connectedAccountId from localStorage is:", connectedAccountId);
  }
    
  let redirectPath = 'uploadTicket';
  if (!user) {
    redirectPath = 'signUpLogIn';
  }
  if (user && !connectedAccountId) {
    redirectPath = 'userPage/undefined';
  }

  

    return (
      <div className={styles.componentHeight}>
        <button className={styles.buttonWrapper} id={styles.sellTicket}>
          <Link to={redirectPath}><p className={styles.buttonText}>Sell your Ticket</p></Link>
        </button>
        <button className={styles.buttonWrapper} id={styles.buyTicket}>
          <Link to="ticketCollectionPage"><p className={styles.buttonText}>Buy a Ticket</p></Link>
        </button>
      </div>
    )
}

//make url destination of sell your ticket conditional on whether locked in or not

//style the Home component by making .componentHeight a grid, and then making many 1fr for grid-template-row and grid-template-columns
//then style the button's position by reference to these
//style the font, size, color etc - import font