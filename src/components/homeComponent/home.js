import React from "react"
import { Link } from 'react-router-dom';
import styles from './home.module.css';

export default function Home() {

    return (
      <div className={styles.componentHeight}>
        <button className={styles.buttonWrapper} id={styles.sellTicket}>
          <Link to="uploadTicket"><p className={styles.buttonText}>Sell your Ticket</p></Link>
        </button>
        <button className={styles.buttonWrapper} id={styles.buyTicket}>
          <Link to="ticketCollectionPage"><p className={styles.buttonText}>Buy a Ticket</p></Link>
        </button>
      </div>
    )
}

//style the Home component by making .componentHeight a grid, and then making many 1fr for grid-template-row and grid-template-columns
//then style the button's position by reference to these
//style the font, size, color etc - import font