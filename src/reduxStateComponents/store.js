//need to add all the slices here together, to create the state
//inventory and cart slices
//and create store from the slices
import { configureStore } from "@reduxjs/toolkit";
import ticketInventorySlice from "./TicketInventorySlice/ticketInventorySlice";
import cartInventorySlice from "./TicketInventorySlice/cartInventorySlice";



const store = configureStore({
    reducer: {
      tickets: ticketInventorySlice,
      cart: cartInventorySlice
    },
  });

export default store;  

//then import store to app.js, and pass it down to the relevant components