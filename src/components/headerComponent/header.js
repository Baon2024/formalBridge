import { Outlet } from "react-router-dom";
import styles from './header.module.css';
import React from "react";
import NavigationBar from "./navigationBar/navigationBar";
import CartFooter from "../cartFooterComponent/cartFooterComponent";
import { selectCartInventory } from "../../reduxStateComponents/TicketInventorySlice/cartInventorySlice";
import { useSelector } from "react-redux";
import { removeTicketFromCart, resetCart } from "../../reduxStateComponents/TicketInventorySlice/cartInventorySlice";

function Header({cart, removeTicketFromCart, user}) {

  //const cart = useSelector(selectCartInventory);

  const cartLength = cart?.length || 0;

    return (
      <div className={styles.componentHeight}>
        <NavigationBar user={user} />
        <div className={styles.mainContent}>
            <Outlet />
        </div>
        {cartLength > 0 && <CartFooter
           cart={cart}
           removeTicketFromCart={removeTicketFromCart}
           resetCart={resetCart} 
           user={user}
          />}
      </div>
    )
}
//the cart bar should be a footer element
//and css styling makes it only visible when cart slice of state is truthy
//that seems the obvious way to do it??
//and it needs to move with wherever the bottom of the page is?

//need to make CartFooter only exist/visible if Cart is truthy 

export default Header;