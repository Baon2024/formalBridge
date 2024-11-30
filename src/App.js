import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, MemoryRouter, Route, Router, RouterProvider } from 'react-router-dom';
import Header from './components/headerComponent/header';
import Home from './components/homeComponent/home';
import UploadTicket from './components/uploadTicketComponent/uploadTicket';
import TicketCollectionPage from './components/ticketCollectionPage/ticketCollectionPage';
import TicketPage from './components/ticketPageComponent/ticketPage';
import { loadTicketsInventoryFromDatabase, addTicket, removeTicket } from './reduxStateComponents/TicketInventorySlice/ticketInventorySlice';
import { useEffect, useState } from 'react';
import CartFooter from './components/cartFooterComponent/cartFooterComponent';
import store from './reduxStateComponents/store';
import { Provider, useSelector } from 'react-redux';
import { addTicketToCart, removeTicketFromCart, resetCart } from './reduxStateComponents/TicketInventorySlice/cartInventorySlice';
import { selectCartInventory } from './reduxStateComponents/TicketInventorySlice/cartInventorySlice';
import SignUpLogIn from './components/userPage/login/signUpLogIn';
import UserPage from './components/userPage/userPage';
import SuccessPage from './components/thankYouPurchasePage/successPage';
import FAQPage from './components/faqPageFolder/faqPage';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
//import { LocalizationProvider } from '@mui/x-date-pickers';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//const state = store.getState();
//const dispatch = store.dispatch;
//had to manually recreate state and dispatch here, as it wouldn't let me pass them down for some reason
//which ones do i pass down the various states and action creators too??


function App() {

  const [ ticketsInventory, setTicketsInventory ] = useState([]);
  //const [ cart, setCart ] = useState([]);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  //const dispatch = store.getState;
  const cart = useSelector(selectCartInventory);
  //const tickets = state.tickets;
  const [ user, setUser ] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem('jwt');
    const userData = JSON.parse(localStorage.getItem('user'));
    if (token && userData) {
      const dataToSet = {token: token, user: userData};
      console.log("thsi is the value of dataToSet: ", dataToSet);
      setUser(dataToSet);
    }
  }, [])

  useEffect(() => {
    console.log("the user is: ", user);
  }, [user])
  

  const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Header cart={cart} user={user}/*setCart={setCart}*/ removeTicketFromCart={removeTicketFromCart} />}
    /*Cart={state.Cart}*/
    >
    <Route index element={ <Home user={user} />} />
    <Route path="uploadTicket" element={ <UploadTicket user={user} />} />
    <Route path="FAQPage" element={ <FAQPage /> } />
    <Route path="/successPage/:ids" element={ <SuccessPage ticketsInventory={ticketsInventory} />} />
    <Route path="userPage/:id" element={ <UserPage user={user} setUser={setUser} /> } />
    <Route path="signUpLogIn" element={ <SignUpLogIn user={user} setUser={setUser} />} />
    <Route path="ticketCollectionPage" element={ <TicketCollectionPage ticketsInventory={ticketsInventory} setTicketsInventory={setTicketsInventory} cart={cart} />} 
      /*ticketsInventory={state.ticketsInventory}*/
      /*dispatch={dispatch}*/ //can't pass down react hooks in react router: also true of redux stuff???
    />
    <Route path="ticketPage/:id" element={ <TicketPage ticketsInventory={ticketsInventory} user={user}
      setTicketsInventory={setTicketsInventory}
      cart={cart}
      addTicketToCart={addTicketToCart}
      /*setCart={setCart}*/ />} />
  </Route>
  ))

  //<Route path="logInSignUp" element={ <logInSignUp /> } />

  return (
    <div className="App">
     {/*<LocalizationProvider dateAdapter={AdapterDayjs}> */}
      <RouterProvider router={router} />
     {/*</LocalizationProvider>*/}
        
    </div>
  );
}

export default App;

// <LocalizationProvider dateAdapter={AdapterDayjs}> -  </LocalizationProvider>