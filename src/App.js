import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom';
import Header from './components/headerComponent/header';
import Home from './components/homeComponent/home';
import UploadTicket from './components/uploadTicketComponent/uploadTicket';
import TicketCollectionPage from './components/ticketCollectionPage/ticketCollectionPage';
import TicketPage from './components/ticketPageComponent/ticketPage';
import { loadTicketsInventoryFromDatabase, addTicket, removeTicket } from './reduxStateComponents/TicketInventorySlice/ticketInventorySlice';
import { useState } from 'react';
import CartFooter from './components/cartFooterComponent/cartFooterComponent';
import store from './reduxStateComponents/store';
import { Provider } from 'react-redux';

//const state = store.getState();
//const dispatch = store.dispatch;
//had to manually recreate state and dispatch here, as it wouldn't let me pass them down for some reason
//which ones do i pass down the various states and action creators too??


function App() {

  const [ ticketsInventory, setTicketsInventory ] = useState([]);
  const [ cart, setCart ] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Header cart={cart} setCart={setCart} />}
    /*Cart={state.Cart}*/
    >
    <Route index element={ <Home />} />
    <Route path="uploadTicket" element={ <UploadTicket />} />
    <Route path="ticketCollectionPage" element={ <TicketCollectionPage ticketsInventory={ticketsInventory} setTicketsInventory={setTicketsInventory} cart={cart} />} 
      /*ticketsInventory={state.ticketsInventory}*/
      /*dispatch={dispatch}*/ //can't pass down react hooks in react router: also true of redux stuff???
    />
    <Route path="ticketPage/:id" element={ <TicketPage ticketsInventory={ticketsInventory}
      setTicketsInventory={setTicketsInventory}
      cart={cart}
      setCart={setCart} />} />
  </Route>
  ))

  //<Route path="logInSignUp" element={ <logInSignUp /> } />

  return (
    <div className="App">
      <RouterProvider router={router} />
      {cart.length > 0 && <CartFooter cart={cart} setCart={setCart} />}
    </div>
  );
}

export default App;
